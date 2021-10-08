import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";

import { User } from "./entities/User";
import { UserResolver } from "./resolvers/User";

dotenv.config();

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    database: process.env.PG_DATABASE_NAME,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [User],
  });

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: "/",
  });

  app.listen(4000, () => {
    console.log("Server started on port 4000");
  });
};

main().catch((error) => {
  console.log(error);
});
