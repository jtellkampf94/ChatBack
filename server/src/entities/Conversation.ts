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
import { UserConversation } from "./UserConversation";

@ObjectType()
@Entity()
export class Conversation extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => UserConversation, (uc) => uc.conversation)
  userConnection: Promise<UserConversation[]>;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
