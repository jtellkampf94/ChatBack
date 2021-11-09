import { Resolver, Mutation, UseMiddleware, Ctx, Arg, Int } from "type-graphql";

import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";
import { Chat } from "../../entities/Chat";
import { ChatMember } from "../../entities/ChatMember";

@Resolver()
export class ChatResolver {
  @Mutation(() => Chat)
  @UseMiddleware(isAuth)
  async createChat(
    @Arg("userIds", () => [Int!]!) userIds: [number],
    @Ctx() { req }: MyContext
  ): Promise<Chat> {
    const chat = await Chat.create({
      createdById: Number(req.session.userId),
    }).save();

    userIds.forEach(async (userId) => {
      await ChatMember.create({ userId, chatId: chat.id }).save();
    });

    return chat;
  }
}
