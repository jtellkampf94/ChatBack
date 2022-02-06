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
    topics: NEW_MESSAGE,
    //@ts-ignore
    filter: async ({ chatId }: Message, _: any, { connection }: any) => {
      const chatMembers = await ChatMember.find({
        where: { chatId },
      });

      const userId = Number(connection.context.req.session.userId);

      if (chatMembers.filter((cm) => cm.userId === userId).length === 1) {
        console.log("ppppppppppp");

        return false;
      }

      console.log("ooooooooooooooooooo");

      return true;
    },
    //@ts-ignore
    subscribe: async (_, __, { connection }) => {
      if (!connection.context.req.session.userId) {
        throw new Error("not authenticated");
      }

      return pubSub.asyncIterator(NEW_MESSAGE);
    },
  })
  async newMessage(
    @Root() newMessagePayload: Message,
    @Ctx() ctx: any
  ): Promise<Message | undefined> {
    const userId = Number(ctx.connection.context.req.session.userId);

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
