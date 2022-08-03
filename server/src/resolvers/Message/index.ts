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
  PubSub,
  PubSubEngine,
  ObjectType,
  Field,
} from "type-graphql";
import { getConnection } from "typeorm";

import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";
import { Message } from "../../entities/Message";
import { ChatMember } from "../../entities/ChatMember";
import { User } from "../../entities/User";
import { NEW_MESSAGE } from "../../constants";

@ObjectType()
export class PaginatedMessages {
  @Field(() => [Message])
  messages: Message[];

  @Field()
  hasMore: boolean;
}

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
    filter: async ({ payload, context: { connection } }) => {
      if (!connection.context.req.session.userId) {
        return false;
      }

      const userId = Number(connection.context.req.session.userId);

      const isChatMember = await ChatMember.findOne({
        where: { userId, chatId: payload.chatId },
      });

      if (!isChatMember) return false;

      return true;
    },
  })
  async newMessage(@Root() newMessagePayload: Message): Promise<Message> {
    return newMessagePayload;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Message)
  async sendMessage(
    @Arg("text") text: string,
    @Arg("chatId", () => Int) chatId: number,
    @Arg("imageUrl", { nullable: true }) imageUrl: string,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Message> {
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
  @Query(() => PaginatedMessages, { nullable: true })
  async getMessages(
    @Arg("chatId", () => Int) chatId: number,
    @Arg("cursor", { nullable: true }) cursor: string,
    @Arg("limit", () => Int) limit: number,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedMessages> {
    const chatMember = await ChatMember.findOne({
      where: { chatId, userId: Number(req.session.userId) },
    });

    if (!chatMember)
      throw new Error("you are not authorized to view messages of this chat");

    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;

    const messages = await getConnection().query(`
      SELECT m.*
      FROM public.message m
      WHERE "chatId" = ${chatId}
      ${cursor ? `AND "createdAt" < '${cursor}'::timestamp` : ""}  
      ORDER BY "createdAt" DESC
      LIMIT ${realLimitPlusOne}`);

    return {
      messages: messages.slice(0, realLimit),
      hasMore: messages.length === realLimitPlusOne,
    };
  }
}
