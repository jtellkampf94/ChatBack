import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Chat } from "./Chat";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserChat extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  chatId: number;

  @ManyToOne(() => User, (u) => u.chatConnection, { primary: true })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;

  @ManyToOne(() => Chat, (c) => c.userConnection, { primary: true })
  @JoinColumn({ name: "chatId" })
  chat: Promise<Chat>;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
