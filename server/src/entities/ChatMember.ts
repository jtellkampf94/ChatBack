import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from "typeorm";

import { Chat } from "./Chat";
import { User } from "./User";

@ObjectType()
@Entity()
export class ChatMember extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Chat, (chat) => chat)
  chat: Chat;

  @Field()
  @Column()
  chatId: number;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @Field()
  @Column()
  userId: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
