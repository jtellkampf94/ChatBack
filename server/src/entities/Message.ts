import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Chat } from "./Chat";
import { User } from "./User";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user)
  user!: User;

  @Field()
  @Column()
  chatId!: number;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat!: Chat;

  @Field()
  @Column()
  imageUrl: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
