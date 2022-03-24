import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
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

export enum Status {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
}

registerEnumType(Status, {
  name: "Status",
});

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

  @Field(() => User)
  @ManyToOne(() => User)
  user!: User;

  @Field()
  @Column()
  chatId!: number;

  @Field(() => Chat)
  @ManyToOne(() => Chat, {
    onDelete: "CASCADE",
  })
  chat!: Chat;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  imageUrl: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Status)
  @Column()
  status!: Status;
}
