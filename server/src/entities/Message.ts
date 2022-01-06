import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
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

  @Column()
  userId!: number;

  @Field(() => Chat)
  @ManyToOne(() => User)
  user!: User;

  @Column()
  chatId!: number;

  @Field(() => Chat)
  @ManyToOne(() => Chat)
  chat!: Chat;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  imageUrl: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;
}
