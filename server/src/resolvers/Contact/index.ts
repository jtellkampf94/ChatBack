import {
  Resolver,
  Mutation,
  Ctx,
  Arg,
  UseMiddleware,
  Query,
  Int,
} from "type-graphql";

import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";
import { Contact } from "../../entities/Contact";
import { User } from "../../entities/User";

@Resolver()
export class ContactResolver {
  @Mutation(() => Contact)
  @UseMiddleware(isAuth)
  createContact(
    @Arg("contactId", () => Int) contactId: number,
    @Ctx() { req }: MyContext
  ): Promise<Contact> {
    return Contact.create({
      contactId,
      userId: Number(req.session.userId),
    }).save();
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async getContacts(@Ctx() { req }: MyContext): Promise<User[]> {
    const contactIds = await Contact.find({
      where: { userId: Number(req.session.userId) },
      relations: ["contact"],
    });

    if (contactIds.length === 0) return [];

    const contacts = contactIds.map((contact) => contact.contact);

    return contacts;
  }
}
