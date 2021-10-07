import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";

import { User } from "./entities/User";

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

  const users = await User.find();
  console.log(users);
};

main().catch((error) => {
  console.log(error);
});
