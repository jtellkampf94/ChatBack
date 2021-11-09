import { ObjectType, Field } from "type-graphql";
import { Entity, Column, ManyToOne } from "typeorm";

import { Model } from "./Model";
import { Chat } from "./Chat";
import { User } from "./User";

@ObjectType()
@Entity()
export class Message extends Model {
  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  userId!: number;

  @ManyToOne(() => User)
  user!: User;

  @Field()
  @Column()
  chatId!: number;

  @ManyToOne(() => Chat)
  chat!: Chat;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  imageUrl: string;
}
