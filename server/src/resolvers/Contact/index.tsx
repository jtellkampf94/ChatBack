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
import { Chat } from "../../entities/Chat";
import { isAuth } from "../../middleware/isAuth";
import { UserChat } from "../../entities/UserChat";
import { Contact } from "../../entities/Contact";

@Resolver()
export class ContactResolver {
  @Mutation(() => Contact)
  @UseMiddleware(isAuth)
  async addContact(
    @Arg("contactId", () => Int) contactId: number,
    @Ctx() { req }: MyContext
  ): Promise<Contact> {
    return Contact.create({ userId: Number(req.session.userId), contactId });
  }

  @Query(() => [Contact])
  @UseMiddleware(isAuth)
  async getContacts(@Ctx() { req }: MyContext): Promise<Contact[]> {
    return Contact.find({
      where: { userId: Number(req.session.userId) },
    });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteContact(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number
  ): Promise<boolean> {
    const contact = await Contact.findOne(id);

    if (!contact) return false;

    if (contact.userId !== Number(req.session.userId)) {
      throw new Error("not authorized");
    }

    await Contact.delete({ id });

    return true;
  }
}
