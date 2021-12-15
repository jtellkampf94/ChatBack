import DataLoader from "dataloader";
import { Message } from "../entities/Message";

type BatchMessage = (chatIds: readonly number[]) => Promise<Message[]>;

const batchMessages: BatchMessage = async (chatIds) => {
  const latestMessages = await Message.findOne({
    where: { chatId: chat.id },
    order: { createdAt: "DESC" },
  });
  console.log("!!!!!!!!!!!!!!!!!!!!MESSAGES!!!!!!!!!!!!!!!!!!!!!!!!!!");
};

export const userLoader = () => new DataLoader<number, User>(batchUsers);
