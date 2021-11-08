import { Arg, Ctx, Mutation, Resolver, Int } from "type-graphql";

import { MyContext } from "../../types";
import { Message } from "../../entities/Message";

@Resolver()
export class MessageResolver {
  @Mutation(() => Message)
  sendMessage(
    @Arg("text") text: string,
    @Arg("chatId", () => Int) chatId: number,
    @Ctx() { req }: MyContext
  ) {
    return Message.create({
      text,
      chatId,
      userId: Number(req.session.userId),
    }).save();
  }
}
