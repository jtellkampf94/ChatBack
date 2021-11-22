import {
  Resolver,
  Mutation,
  UseMiddleware,
  Ctx,
  Arg,
  Int,
  Query,
} from "type-graphql";
import { getConnection } from "typeorm";

import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";
import { Chat } from "../../entities/Chat";
import { ChatMember } from "../../entities/ChatMember";

@Resolver()
export class ChatResolver {
  @Mutation(() => Chat)
  @UseMiddleware(isAuth)
  async createChat(
    @Arg("userIds", () => [Int!]!) userIds: [number],
    @Ctx() { req }: MyContext
  ): Promise<Chat> {
    const createdById = Number(req.session.userId);
    const chat = await Chat.create({
      createdById,
    }).save();

    userIds.forEach(async (userId) => {
      await ChatMember.create({ userId, chatId: chat.id }).save();
    });

    return chat;
  }

  @Query(() => [Chat])
  @UseMiddleware(isAuth)
  getChats(@Ctx() { req }: MyContext): Promise<Chat[]> {
    const userId = Number(req.session.userId);
    return getConnection()
      .createQueryBuilder()
      .select("chat")
      .from(Chat, "chat")
      .leftJoin("chat.chatMembers", "chatMember")
      .where("chat.createdById = :createdById", { createdById: userId })
      .orWhere("chatMember.userId = :userId", { userId })
      .orderBy("chat.updatedAt", "DESC")
      .getMany();
  }
}
