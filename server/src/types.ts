import { Request, Response } from "express";
import { ExecutionParams } from "subscriptions-transport-ws";
import { Session } from "express-session";
import { Redis } from "ioredis";

export type SessionWithUserId = Session & { userId: string | {} };

export type MyContext = {
  req: Request & {
    session?: SessionWithUserId;
  };
  res: Response;
  connection: ExecutionParams<any>;
  redis: Redis;
};
