import { ObjectType, Field, ID } from "type-graphql";
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

import { Message } from "./Message";
import { User } from "./User";
import { ChatMember } from "./ChatMember";

@ObjectType()
@Entity()
export class Chat extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => User)
  @ManyToOne(() => User)
  createdBy!: User;

  @Column()
  createdById!: number;

  @Field(() => [Message!], { nullable: true })
  @OneToMany(() => Message, (message) => message.chat)
  messages?: Message[];

  @Field(() => Message, { nullable: true })
  latestMessage?: Message;

  @Field(() => [User!]!)
  members!: User[];

  @OneToMany(() => ChatMember, (chatMember) => chatMember.chat)
  chatMembers!: ChatMember[];

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  groupName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  groupAvatarUrl?: string;
}
