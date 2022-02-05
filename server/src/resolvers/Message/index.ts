import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  Int,
  Subscription,
  Root,
  UseMiddleware,
  Query,
  FieldResolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { PubSub } from "apollo-server-express";

import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";
import { Message } from "../../entities/Message";
import { ChatMember } from "../../entities/ChatMember";
import { Chat } from "../../entities/Chat";
import { User } from "../../entities/User";
import { NEW_MESSAGE } from "../../constants";

const pubSub = new PubSub();

@Resolver((of) => Message)
export class MessageResolver {
  @FieldResolver(() => User!)
  async user(
    @Root() message: Message,
    @Ctx() { userLoader }: MyContext
  ): Promise<User> {
    return userLoader.load(message.userId);
  }

  @Subscription(() => Message, {
    //@ts-ignore
    subscribe: async (_, { chatId }, { connection }) => {
      if (!connection.context.req.session.userId) {
        throw new Error("not authenticated");
      }
      const userId = Number(connection.context.req.session.userId);
      const chat = await Chat.findOne({
        where: { id: chatId },
        relations: ["chatMembers"],
      });

      if (!chat) throw new Error("chat does not exist");

      const isChatMember =
        chat.chatMembers.filter(
          (chatMember) =>
            Number(chatMember.userId) === userId && chatMember.isActive
        ).length > 0;

      if (!isChatMember) throw new Error("not authorized");

      return pubSub.asyncIterator(NEW_MESSAGE);
    },
  })
  async newMessage(
    @Root() newMessagePayload: Message,
    @Arg("chatId", () => Int) chatId: number
  ): Promise<Message> {
    if (newMessagePayload.chatId !== chatId) throw new Error("not authorized");

    return newMessagePayload;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Message)
  async sendMessage(
    @Arg("text") text: string,
    @Arg("chatId", () => Int) chatId: number,
    @Arg("imageUrl", { nullable: true }) imageUrl: string,
    @Ctx() { req }: MyContext
  ): Promise<Message> {
    const chat = await Chat.findOne(chatId);

    if (!chat) throw new Error("chat does not exist");

    const message = await Message.create({
      text,
      chatId,
      userId: Number(req.session.userId),
      imageUrl: imageUrl ? imageUrl : undefined,
    }).save();

    await pubSub.publish(NEW_MESSAGE, message);

    return message;
  }

  @UseMiddleware(isAuth)
  @Query(() => [Message], { nullable: true })
  async getMessages(
    @Arg("chatId", () => Int) chatId: number,
    @Arg("cursor", { nullable: true }) cursor: string,
    @Arg("limit", () => Int) limit: number,
    @Ctx() { req }: MyContext
  ): Promise<Message[]> {
    const chatMember = await ChatMember.findOne({
      where: { chatId, userId: Number(req.session.userId) },
    });

    if (!chatMember)
      throw new Error("you are not authorized to view messages of this chat");

    return await getConnection().query(`
      SELECT m.*
      FROM public.message m
      WHERE "chatId" = ${chatId}
      ${cursor ? `AND "createdAt" < '${cursor}'::timestamp` : ""}  
      ORDER BY "createdAt" DESC
      LIMIT ${limit + 1}`);
  }
}
