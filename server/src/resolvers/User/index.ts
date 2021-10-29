import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import bcrypt from "bcryptjs";

import { MyContext } from "../../types";
import { COOKIE_NAME } from "../../constants";
import { RegisterInput } from "./RegisterInput";
import { LoginInput } from "./LoginInput";
import { User } from "../../entities/User";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  @UseMiddleware(isAuth)
  users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    const user = await User.findOne({ id: Number(req.session.userId) });

    if (!user) {
      return null;
    }

    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg("options", { validate: true }) options: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(options.password, 10);

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

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) throw new Error("password incorrect");

    req.session.userId = user.id;

    return user;
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
