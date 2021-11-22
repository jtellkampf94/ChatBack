import {
  Resolver,
  Mutation,
  Ctx,
  Arg,
  UseMiddleware,
  Query,
} from "type-graphql";

import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";
import { Contact } from "../../entities/Contact";

@Resolver()
export class ContactResolver {
  @Mutation(() => Contact)
  @UseMiddleware(isAuth)
  createContact(
    @Arg("contactId") contactId: number,
    @Ctx() { req }: MyContext
  ): Promise<Contact> {
    return Contact.create({
      contactId,
      userId: Number(req.session.userId),
    }).save();
  }

  @Query(() => [Contact])
  @UseMiddleware(isAuth)
  getContacts(@Ctx() { req }: MyContext): Promise<Contact[]> {
    return Contact.find({ contactId: Number(req.session.userId) });
  }
}
