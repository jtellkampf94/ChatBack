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
export class ConversationResolver {
  @Mutation(() => Conversation)
  @UseMiddleware(isAuth)
  async createConversation(
    @Arg("userIds", () => [Int!]!) userIds: [number],
    @Ctx() { req }: MyContext
  ): Promise<Conversation> {}
}
