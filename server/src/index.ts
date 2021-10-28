import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cors from "cors";

import { User } from "./entities/User";
import { Message } from "./entities/Message";
import { Conversation } from "./entities/Conversation";
import { UserConversation } from "./entities/UserConversation";
import { UserResolver } from "./resolvers/User";
import { MessageResolver } from "./resolvers/Message";
import { ConversationResolver } from "./resolvers/Conversation";

import { COOKIE_NAME } from "./constants";

dotenv.config();

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    database: process.env.PG_DATABASE_NAME,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    // logging: true,
    synchronize: true,
    entities: [User, Conversation, Message, UserConversation],
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: COOKIE_NAME,
      secret: String(process.env.REDIS_SECRET),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, MessageResolver, ConversationResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: "/",
    cors: false,
  });

  app.listen(4000, () => {
    console.log("Server started on port 4000");
  });
};

main().catch((error) => {
  console.log(error);
});
