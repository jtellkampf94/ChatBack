import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ChatMember } from "./ChatMember";
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
  contacts?: User[];

  @Field(() => [Chat!], { nullable: true })
  chats?: Chat[];

  @OneToMany(() => ChatMember, (chatMember) => chatMember.user)
  chatMember?: ChatMember[];

  @Field(() => [Message!], { nullable: true })
  messages?: [Message];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
