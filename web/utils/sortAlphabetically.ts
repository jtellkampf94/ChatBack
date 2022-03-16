import { GetContactsQuery } from "../generated/graphql";

export const sortAlphabetically = (
  contacts: GetContactsQuery["getContacts"]
) => {
  return contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
};
