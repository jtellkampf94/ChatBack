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
import { Conversation } from "./Conversation";
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
  conversationId!: number;

  @ManyToOne(() => Conversation, (conversation) => conversation)
  conversation!: Conversation;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
