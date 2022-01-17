import { getConnection } from "typeorm";
import DataLoader from "dataloader";
import { Message } from "../entities/Message";

export const messageLoader = (limit: number) => {
  return new DataLoader<number, Message[]>(async (chatIds) => {
    const latestMessages: Message[] = await getConnection().query(`
      SELECT * FROM (
        SELECT m.*,
        ROW_NUMBER() OVER(PARTITION BY "chatId" ORDER BY "createdAt" DESC) as rn
        FROM 
        public.message m
        WHERE "chatId" IN(${chatIds})
      ) x
      WHERE x.rn < ${limit + 1}
    `);

    const messagesMap: { [key: number]: Message[] } = {};
    latestMessages.forEach((message) => {
      messagesMap[message.chatId] = messagesMap[message.chatId]
        ? messagesMap[message.chatId].concat([message])
        : [message];
    });

    return chatIds.map((chatId) => messagesMap[chatId]);
  });
};
