import {
  Resolver,
  Mutation,
  UseMiddleware,
  Ctx,
  Arg,
  Int,
  Query,
  FieldResolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";

import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";
import { Chat } from "../../entities/Chat";
import { ChatMember } from "../../entities/ChatMember";
import { Message } from "../../entities/Message";
import { User } from "../../entities/User";

@Resolver((of) => Chat)
export class ChatResolver {
  @FieldResolver(() => Message, { nullable: true })
  async latestMessage(
    @Root() chat: Chat,
    @Ctx() { latestMessageLoader }: MyContext
  ): Promise<Message | null> {
    const message = await latestMessageLoader.load(chat.id);
    if (!message) return null;
    return message;
  }

  @FieldResolver(() => [User])
  async members(
    @Root() chat: Chat,
    @Ctx() { chatMemberLoader, userLoader }: MyContext
  ): Promise<(User | Error)[]> {
    const chatMembers = await chatMemberLoader.load(chat.id);
    const memberIds = chatMembers.map((cm) => cm.userId);

    return userLoader.loadMany(memberIds);
  }

  @Mutation(() => Chat)
  @UseMiddleware(isAuth)
  async createChat(
    @Arg("userIds", () => [Int!]!) userIds: [number],
    @Arg("groupName", { nullable: true }) groupName: string,
    @Ctx() { req }: MyContext
  ): Promise<Chat> {
    const createdById = Number(req.session.userId);
    const chat = await Chat.create({
      createdById,
      groupName,
    }).save();

    userIds.push(createdById);

    for (let userId of userIds) {
      await ChatMember.create({ userId, chatId: chat.id }).save();
    }

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

  @Query(() => Chat)
  @UseMiddleware(isAuth)
  async getChat(
    @Arg("chatId", () => Int) chatId: number,
    @Ctx() { req }: MyContext
  ): Promise<Chat> {
    const chat = await Chat.findOne({
      where: { id: chatId },
      relations: ["chatMembers", "messages"],
      order: { createdAt: "DESC" },
    });

    if (!chat) throw new Error("no chat has this Id");

    let isChatMember = false;

    const userId = Number(req.session.userId);

    for (let member of chat.chatMembers) {
      if (member.userId === userId) {
        isChatMember = true;
        break;
      }
    }

    if (!isChatMember) {
      throw new Error("you are not authorized to view chat");
    }

    return chat;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async exitChat(
    @Arg("chatId", () => Int) chatId: number,
    @Ctx() { req }: MyContext
  ) {
    const userId = Number(req.session.userId);

    const chat = await Chat.findOne(chatId);

    if (!chat) throw new Error("chat does not exist");

    const chatMember = await ChatMember.findOne({ chatId, userId });

    if (!chatMember) throw new Error("unauthorized");

    chatMember.isActive = false;
    await chatMember.save();

    return true;
  }
}
