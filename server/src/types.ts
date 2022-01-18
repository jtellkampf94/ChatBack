import { Request, Response } from "express";
import { ExecutionParams } from "subscriptions-transport-ws";
import { Session } from "express-session";
import { Redis } from "ioredis";

import { chatMemberLoader } from "./loaders/ChatMemberLoader";
import { userLoader } from "./loaders/UserLoader";
import { messageLoader } from "./loaders/MessageLoader";

export type SessionWithUserId = Session & { userId: string | {} };

export type MyContext = {
  req: Request & {
    session?: SessionWithUserId;
  };
  res: Response;
  connection: ExecutionParams<any>;
  redis: Redis;
  chatMemberLoader: ReturnType<typeof chatMemberLoader>;
  userLoader: ReturnType<typeof userLoader>;
  messageLoader: ReturnType<typeof messageLoader>;
};
