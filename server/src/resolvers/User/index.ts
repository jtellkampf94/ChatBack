import { Query, Resolver, Mutation, Arg } from "type-graphql";
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
    @Arg("options", { validate: true }) options: RegisterInput
  ): Promise<User> {
    const hashedPassword = await argon2.hash(options.password);
    return User.create({ ...options, password: hashedPassword }).save();
  }
}
