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

  @Field(() => [User!]!)
  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable({
    name: "public.chat_member",
    joinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "chatId",
      referencedColumnName: "id",
    },
  })
  members!: User[];

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  groupName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  groupAvatarUrl?: string;
}
