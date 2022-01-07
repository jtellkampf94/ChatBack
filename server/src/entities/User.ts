import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { Chat } from "./Chat";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  username!: string;

  @Field()
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  profilePictureUrl?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  about?: string;

  @Field(() => [User!], { nullable: true })
  contacts?: [User];

  @Field(() => [Chat!], { nullable: true })
  chats?: [Chat];

  @Field(() => [Message!], { nullable: true })
  messages?: [Message];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
