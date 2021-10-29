import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Int,
  UseMiddleware,
} from "type-graphql";

import { MyContext } from "../../types";
import { COOKIE_NAME } from "../../constants";
import { User } from "../../entities/User";
import { Message } from "../../entities/Message";
import { Chat } from "../../entities/Chat";

import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class MessageResolver {
  @Mutation(() => Message)
  @UseMiddleware(isAuth)
  createMessage(
    @Arg("text") text: string,
    @Arg("chatId", () => Int) chatId: number,
    @Ctx() { req }: MyContext
  ): Promise<Message> {
    return Message.create({
      text,
      userId: Number(req.session.userId),
      chatId,
    }).save();
  }

  @Query(() => [Message])
  @UseMiddleware(isAuth)
  getMessages(@Arg("chatId") chatId: number): Promise<Message[]> {
    return Message.find({
      where: { chatId },
      order: { createdAt: "DESC" },
    });
  }
}
