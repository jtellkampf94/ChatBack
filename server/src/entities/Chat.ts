import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Message } from "./Message";
import { UserChat } from "./UserChat";

@ObjectType()
@Entity()
export class Chat extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => UserChat, (uc) => uc.chat)
  userConnection: Promise<UserChat[]>;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @Field(() => Message)
  latestMessage: Message;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
