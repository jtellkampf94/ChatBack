import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Root,
  UseMiddleware,
  FieldResolver,
} from "type-graphql";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";

import { MyContext } from "../../types";
import { COOKIE_NAME } from "../../constants";
import { RegisterInput } from "./RegisterInput";
import { LoginInput } from "./LoginInput";
import { User } from "../../entities/User";
import { Chat } from "../../entities/Chat";
import { Contact } from "../../entities/Contact";
import { ChatMember } from "../../entities/ChatMember";
import { isAuth } from "../../middleware/isAuth";
import { getAWSS3Key } from "../../utils/getAWSS3Key";
import { s3 } from "../../config/amazonS3Config";

@Resolver((of) => User)
export class UserResolver {
  @FieldResolver(() => [User!], { nullable: true })
  @UseMiddleware(isAuth)
  async contacts(
    @Root() user: User,
    @Ctx() { req }: MyContext
  ): Promise<User[] | null> {
    const userId = Number(req.session.userId);

    if (userId !== user.id)
      throw new Error("You are unauthorized to view contacts of this user");

    const contacts = await Contact.find({
      where: { userId },
      relations: ["contact"],
    });

    if (contacts.length === 0) return null;

    return contacts.map((contact) => contact.contact);
  }

  @FieldResolver(() => [Chat!], { nullable: true })
  @UseMiddleware(isAuth)
  async chats(
    @Root() user: User,
    @Ctx() { req }: MyContext
  ): Promise<Chat[] | null> {
    const userId = Number(req.session.userId);

    if (userId !== user.id)
      throw new Error("You are unauthorized to view chat of this user");

    return getRepository(Chat)
      .createQueryBuilder("chat")
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select("chatMember.chatId")
          .from(ChatMember, "chatMember")
          .where("chatMember.userId = :userId")
          .getQuery();
        return "chat.id IN " + subQuery;
      })
      .setParameter("userId", userId)
      .orderBy("chat.updatedAt", "DESC")
      .getMany();
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
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

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async editProfile(
    @Arg("username") username: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("about", { nullable: true }) about: string,
    @Arg("profilePictureUrl", { nullable: true }) profilePictureUrl: string,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await User.findOne(Number(req.session.userId));

    if (!user) throw new Error("user not found");

    user.username = username;
    user.firstName = firstName;
    user.lastName = lastName;

    if (profilePictureUrl) {
      if (user.profilePictureUrl) {
        const key = getAWSS3Key(user.profilePictureUrl);

        s3.deleteObject(
          { Bucket: process.env.AWS_S3_BUCKET_NAME as string, Key: key },
          (err, data) => {
            if (err) console.log(err);
          }
        );
      }

      user.profilePictureUrl = profilePictureUrl;
    }

    if (about) user.about = about;

    await user.save();

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
