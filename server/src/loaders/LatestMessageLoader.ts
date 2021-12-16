import { getConnection } from "typeorm";
import DataLoader from "dataloader";
import { Message } from "../entities/Message";

type BatchMessage = (chatIds: readonly number[]) => Promise<Message[]>;

const batchMessages: BatchMessage = async (chatIds) => {
  const latestMessages: Message[] = await getConnection().query(`
  SELECT t1.*
  FROM public.message t1
  INNER JOIN
  (
    SELECT "chatId", MAX("createdAt") AS "max_createdAt"
    FROM public.message
    WHERE "chatId" IN (${chatIds})
    GROUP BY "chatId"
  ) t2
    ON t1."chatId" = t2."chatId" AND t1."createdAt" = t2."max_createdAt"
  WHERE
    t1."chatId" IN (${chatIds})
  `);

  const messagesMap: { [key: number]: Message } = {};
  latestMessages.forEach((message) => {
    messagesMap[message.chatId] = message;
  });

  return chatIds.map((chatId) => messagesMap[chatId]);
};

export const latestMessageLoader = () =>
  new DataLoader<number, Message>(batchMessages);
