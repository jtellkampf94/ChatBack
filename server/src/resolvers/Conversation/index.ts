import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Int,
  UseMiddleware,
} from "type-graphql";
import { getConnection, getRepository } from "typeorm";

import { MyContext } from "../../types";
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

  @Query(() => Conversation)
  @UseMiddleware(isAuth)
  async getConversation(
    @Arg("conversationId") conversationId: number
  ): Promise<Conversation> {
    const conversation = await Conversation.findOne(conversationId);

    if (!conversation) throw new Error("conversation not found");

    return conversation;
  }

  @Query(() => [Conversation])
  @UseMiddleware(isAuth)
  async getConversations(@Ctx() { req }: MyContext): Promise<Conversation[]> {
    const userConversation = await UserConversation.find({
      where: { userId: Number(req.session.userId) },
    });

    const conversationIds = userConversation.map((cid) => cid.conversationId);

    const conversations = await getRepository(Conversation)
      .createQueryBuilder("conversation")
      .where("conversation.id IN (:...ids)", { ids: conversationIds })
      .orderBy("conversation.createdAt", "DESC")
      .getMany();

    return conversations;
  }
}
