import { Arg, Ctx, Mutation, Resolver, Int } from "type-graphql";

import { MyContext } from "../../types";
import { Message } from "../../entities/Message";
import { Chat } from "../../entities/Chat";

@Resolver()
export class MessageResolver {
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
