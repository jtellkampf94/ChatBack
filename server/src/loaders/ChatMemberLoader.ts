import { In } from "typeorm";
import DataLoader from "dataloader";
import { ChatMember } from "../entities/ChatMember";

type BatchChatMember = (chatIds: readonly number[]) => Promise<ChatMember[][]>;

const batchChatMembers: BatchChatMember = async (chatIds) => {
  const chatMembers = await ChatMember.find({
    where: { chatId: In([...chatIds]) },
    relations: ["user"],
  });

  const chatMemberMap: { [key: number]: ChatMember[] } = {};
  chatMembers.forEach((cm) => {
    if (chatMemberMap[cm.chatId]) {
      chatMemberMap[cm.chatId].push(cm);
    } else {
      chatMemberMap[cm.chatId] = [cm];
    }
  });

  return chatIds.map((chatId) => chatMemberMap[chatId]);
};

export const chatMemberLoader = () =>
  new DataLoader<number, ChatMember[]>(batchChatMembers);
