import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";

import { Message } from "./Message";
import { User } from "./User";

@ObjectType()
@Entity()
export class Conversation extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => User, (user) => user.conversations)
  users!: User[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
