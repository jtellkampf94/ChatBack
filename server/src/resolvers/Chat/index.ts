import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Int,
  UseMiddleware,
} from "type-graphql";
import { getConnection, getRepository } from "typeorm";

import { MyContext } from "../../types";
import { Chat } from "../../entities/Chat";
import { isAuth } from "../../middleware/isAuth";
import { UserChat } from "../../entities/UserChat";

@Resolver()
export class ChatResolver {
  @Mutation(() => Chat)
  @UseMiddleware(isAuth)
  async createChat(
    @Arg("userIds", () => [Int!]!) userIds: [number],
    @Ctx() { req }: MyContext
  ): Promise<Chat> {
    const chat = await Chat.create().save();

    const entries = [...userIds, Number(req.session.userId)].map((userId) => {
      return { userId, chatId: chat.id };
    });

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(UserChat)
      .values(entries)
      .execute();

    return chat;
  }

  @Query(() => Chat)
  @UseMiddleware(isAuth)
  async getChat(@Arg("chatId") chatId: number): Promise<Chat> {
    const chat = await Chat.findOne(chatId);

    if (!chat) throw new Error("chat not found");

    return chat;
  }

  @Query(() => [Chat])
  @UseMiddleware(isAuth)
  async getChats(@Ctx() { req }: MyContext): Promise<Chat[]> {
    const userChat = await UserChat.find({
      where: { userId: Number(req.session.userId) },
    });

    if (userChat.length === 0) throw new Error("no chat");

    const chatIds = userChat.map((cid) => cid.chatId);

    const chats = await getRepository(Chat)
      .createQueryBuilder("chat")
      .where("chat.id IN (:...ids)", { ids: chatIds })
      .orderBy("chat.updatedAt", "DESC")
      .getMany();

    return chats;
  }
}
