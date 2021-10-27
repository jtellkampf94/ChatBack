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
import { Conversation } from "../../entities/Conversation";

import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class MessageResolver {
  @Mutation(() => Message)
  @UseMiddleware(isAuth)
  createMessage(
    @Arg("text") text: string,
    @Arg("conversationId", () => Int) conversationId: number,
    @Ctx() { req }: MyContext
  ): Promise<Message> {
    return Message.create({
      text,
      userId: Number(req.session.userId),
      conversationId,
    }).save();
  }

  @Query(() => [Message])
  @UseMiddleware(isAuth)
  getMessages(
    @Arg("conversationId") conversationId: number
  ): Promise<Message[]> {
    return Message.find({
      where: { conversationId },
      order: { createdAt: "DESC" },
    });
  }
}
