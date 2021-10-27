import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Conversation } from "./Conversation";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserConversation extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  conversationId: number;

  @ManyToOne(() => User, (u) => u.conversationConnection, { primary: true })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;

  @ManyToOne(() => Conversation, (c) => c.userConnection, { primary: true })
  @JoinColumn({ name: "conversationId" })
  conversation: Promise<Conversation>;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
