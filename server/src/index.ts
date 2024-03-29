import "reflect-metadata";
import http from "http";
import { createConnection } from "typeorm";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cors from "cors";
import path from "path";

import { User } from "./entities/User";
import { Message } from "./entities/Message";
import { Chat } from "./entities/Chat";
import { ChatMember } from "./entities/ChatMember";
import { Contact } from "./entities/Contact";
import { Image } from "./entities/Image";

import { UserResolver } from "./resolvers/User";
import { MessageResolver } from "./resolvers/Message";
import { ChatResolver } from "./resolvers/Chat";
import { ContactResolver } from "./resolvers/Contact";
import { ImageResolver } from "./resolvers/Image";

import { COOKIE_NAME } from "./constants";
import { userLoader } from "./loaders/UserLoader";
import { chatMemberLoader } from "./loaders/ChatMemberLoader";
import { messageLoader } from "./loaders/MessageLoader";

dotenv.config();

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    url: process.env.PG_DATABASE_URL,
    logging: true,
    synchronize: true,
    // migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Chat, ChatMember, Message, Contact, Image],
  });

  // await connection.runMigrations();

  const app = express();
  const httpServer = http.createServer(app);

  const RedisStore = connectRedis(session);
  const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  });
  const sessionMiddleware = session({
    store: new RedisStore({
      client: redis,
      disableTouch: true,
    }),
    name: COOKIE_NAME,
    secret: process.env.REDIS_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      sameSite: "lax",
    },
  });

  app.set("proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(sessionMiddleware);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        MessageResolver,
        ChatResolver,
        ContactResolver,
        ImageResolver,
      ],
      validate: false,
    }),
    subscriptions: {
      path: "/",
      onConnect: (_, ws: any) => {
        return new Promise((res) =>
          sessionMiddleware(ws.upgradeReq, {} as any, () => {
            res({ req: ws.upgradeReq });
          })
        );
      },
    },
    context: ({ req, res, connection }) => ({
      req,
      res,
      redis,
      connection,
      chatMemberLoader: chatMemberLoader(),
      userLoader: userLoader(),
      messageLoader: messageLoader(),
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: "/",
    cors: false,
  });
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(Number(process.env.PORT), () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
};

main().catch((error) => {
  console.log(error);
});
