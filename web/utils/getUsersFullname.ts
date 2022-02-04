import { User } from "../generated/graphql";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

export const getUsersFullname = (users: User[], userId: Number) => {
  const user = users.filter((user) => Number(user.id) !== userId)[0];
  return `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(
    user.lastName
  )}`;
};
