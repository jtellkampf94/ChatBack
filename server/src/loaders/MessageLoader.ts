import { getConnection } from "typeorm";
import DataLoader from "dataloader";
import { Message } from "../entities/Message";

interface getMessagesArg {
  limit: number;
  cursor: string | null;
}

export const messageLoader = () => {
  let limit: number;
  let cursor: string | null;

  const messageLoader = new DataLoader<number, Message[]>(async (chatIds) => {
    const latestMessages: Message[] = await getConnection().query(`
      SELECT * FROM (
        SELECT m.*,
        ROW_NUMBER() OVER(PARTITION BY "chatId" ORDER BY "createdAt" DESC) as rn
        FROM 
        public.message m
        WHERE ${
          cursor ? `"createdAt" < '${cursor}'::timestamp AND` : ""
        } "chatId" IN(${chatIds})
      ) x
      WHERE 
      x.rn < ${limit + 1}
      `);

    const messagesMap: { [key: number]: Message[] } = {};
    latestMessages.forEach((message) => {
      messagesMap[message.chatId] = messagesMap[message.chatId]
        ? messagesMap[message.chatId].concat([message])
        : [message];
    });

    return chatIds.map((chatId) => messagesMap[chatId]);
  });

  return {
    getMessages({
      limit: messageLimit,
      cursor: messageCursor,
    }: getMessagesArg) {
      limit = messageLimit;
      cursor = messageCursor;

      const maxLimit = 20;
      limit >= 20 ? (limit = maxLimit) : limit;
      return messageLoader;
    },
  };
};
