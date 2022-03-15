import {
  Resolver,
  Mutation,
  Ctx,
  Arg,
  UseMiddleware,
  Query,
  Int,
} from "type-graphql";
import { getConnection } from "typeorm";

import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";
import { Contact } from "../../entities/Contact";
import { User } from "../../entities/User";

@Resolver()
export class ContactResolver {
  @Mutation(() => Contact)
  @UseMiddleware(isAuth)
  addToContacts(
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
    const userId = Number(req.session.userId);

    const contactIds = await getConnection()
      .createQueryBuilder(Contact, "contactInfo")
      .leftJoinAndSelect("contactInfo.contact", "contact")
      .where("contactInfo.userId = :userId", { userId })
      .orderBy("contact.firstName", "ASC")
      .getMany();

    if (contactIds.length === 0) return [];

    const contacts = contactIds.map((contact) => contact.contact);

    return contacts;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteContact(
    @Arg("contactId", () => Int) contactId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const userId = Number(req.session.userId);

    const contact = await Contact.findOne({ userId, contactId });

    if (!contact) throw new Error("Contact not found");

    await contact.remove();

    return true;
  }
}
