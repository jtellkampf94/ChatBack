import { ObjectType, Field } from "type-graphql";
import { Entity, ManyToOne, Column } from "typeorm";

import { Model } from "./Model";
import { Chat } from "./Chat";
import { User } from "./User";

@ObjectType()
@Entity()
export class ChatMember extends Model {
  @ManyToOne(() => Chat)
  chat: Chat;

  @Field()
  @Column()
  chatId!: number;

  @ManyToOne(() => User)
  user: User;

  @Field()
  @Column()
  userId!: number;
}
