import DataLoader from "dataloader";
import { User } from "../entities/User";

type BatchUser = (userIds: readonly number[]) => Promise<User[]>;

const batchUsers: BatchUser = async (userIds) => {
  const users = await User.findByIds([...userIds]);
  console.log("!!!!!!!!!!!!!!!!!!!!USERS!!!!!!!!!!!!!!!!!!!!!!!!!!");

  const userMap: { [key: number]: User } = {};

  users.forEach((user) => {
    userMap[user.id] = user;
  });

  return userIds.map((userId) => userMap[userId]);
};

export const userLoader = () => new DataLoader<number, User>(batchUsers);
