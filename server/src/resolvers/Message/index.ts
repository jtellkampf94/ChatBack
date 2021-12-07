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

import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";
import { Message } from "../../entities/Message";
import { Chat } from "../../entities/Chat";

@Resolver()
export class MessageResolver {
  @UseMiddleware(isAuth)
  @Subscription({ topics: "NEW_MESSAGE" })
  async newMessage(
    @Root() newMessagePayload: Message,
    @Arg("chatId", () => Int) chatId: number,
    @Ctx() { req }: MyContext
  ): Promise<Message> {
    const userId = Number(req.session.userId);
    const chat = await Chat.findOne({ id: chatId });

    if (!chat) throw new Error("chat does not exist");

    const isChatMember =
      chat.members.filter((user) => Number(user.id) === userId).length > 0;

    if (!isChatMember) throw new Error("not authorized");

    if (newMessagePayload.chatId !== chatId) throw new Error("not authorized");

    return newMessagePayload;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Message)
  async sendMessage(
    @Arg("text") text: string,
    @Arg("chatId", () => Int) chatId: number,
    @Ctx() { req }: MyContext
  ) {
    const chat = await Chat.findOne(chatId);

    if (!chat) throw new Error("chat does not exist");

    return Message.create({
      text,
      chatId,
      userId: Number(req.session.userId),
    }).save();
  }
}
