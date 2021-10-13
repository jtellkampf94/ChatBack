import { MyContext } from "./../../types";
import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import argon2 from "argon2";

import { RegisterInput } from "./RegisterInput";
import { LoginInput } from "./LoginInput";
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

  @Mutation(() => User)
  async login(
    @Arg("options", { validate: true }) options: LoginInput,
    @Ctx() { req }: MyContext
  ) {
    const { emailOrUsername, password } = options;
    const user = await User.findOne(
      emailOrUsername.includes("@")
        ? { email: emailOrUsername }
        : { username: emailOrUsername }
    );

    if (!user) throw new Error("user doesn't exist");

    const isPasswordCorrect = await argon2.verify(user.password, password);

    if (!isPasswordCorrect) throw new Error("password incorrect");

    req.session.userId = user.id;

    return user;
  }
}
