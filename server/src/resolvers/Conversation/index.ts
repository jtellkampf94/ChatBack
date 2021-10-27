import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Int,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";

import { MyContext } from "../../types";
import { COOKIE_NAME } from "../../constants";
import { User } from "../../entities/User";
import { Message } from "../../entities/Message";
import { Conversation } from "../../entities/Conversation";

import { isAuth } from "../../middleware/isAuth";
import { UserConversation } from "../../entities/UserConversation";

@Resolver()
export class ConversationResolver {
  @Mutation(() => Conversation)
  @UseMiddleware(isAuth)
  async createConversation(
    @Arg("userIds", () => [Int!]!) userIds: [number],
    @Ctx() { req }: MyContext
  ): Promise<Conversation> {
    const conversation = await Conversation.create().save();

    const entries = [...userIds, Number(req.session.userId)].map((userId) => {
      return { userId, conversationId: conversation.id };
    });

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(UserConversation)
      .values(entries)
      .execute();

    return conversation;
  }
}
