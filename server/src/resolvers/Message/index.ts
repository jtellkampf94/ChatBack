import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  Int,
  Subscription,
  Root,
  UseMiddleware,
} from "type-graphql";
import { PubSub } from "apollo-server-express";

import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";
import { Message } from "../../entities/Message";
import { Chat } from "../../entities/Chat";
import { NEW_MESSAGE } from "../../constants";

const pubSub = new PubSub();

@Resolver()
export class MessageResolver {
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
    @Ctx() { req }: MyContext
  ): Promise<Message> {
    const chat = await Chat.findOne(chatId);

    if (!chat) throw new Error("chat does not exist");

    const message = await Message.create({
      text,
      chatId,
      userId: Number(req.session.userId),
    }).save();

    await pubSub.publish(NEW_MESSAGE, message);

    return message;
  }
}
