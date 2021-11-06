import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { ChatMember } from "./ChatMember";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class Chat extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @OneToMany(() => ChatMember, (chatMember) => chatMember.chat)
  chatMembers: ChatMember[];

  @Field(() => Message)
  latestMessage: Message;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
