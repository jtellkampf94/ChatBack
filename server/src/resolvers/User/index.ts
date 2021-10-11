import { MyContext } from "./../../types";
import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import argon2 from "argon2";

import { RegisterInput } from "./RegisterInput";
import { User } from "../../entities/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  @Mutation(() => User)
  async register(
    @Arg("options", { validate: true }) options: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const hashedPassword = await argon2.hash(options.password);

    const user = await User.create({
      ...options,
      password: hashedPassword,
    }).save();

    req.session.userId = user.id;

    return user;
  }
}
