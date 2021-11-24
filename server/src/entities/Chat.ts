import { ObjectType, Field } from "type-graphql";
import { Column, Entity, OneToMany, ManyToOne } from "typeorm";

import { Model } from "./Model";
import { ChatMember } from "./ChatMember";
import { Message } from "./Message";
import { User } from "./User";

@ObjectType()
@Entity()
export class Chat extends Model {
  @ManyToOne(() => User)
  createdBy: User;

  @Field()
  @Column()
  createdById: number;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @OneToMany(() => ChatMember, (chatMember) => chatMember.chat, {
    onDelete: "CASCADE",
  })
  chatMembers: ChatMember[];

  @Field(() => Message)
  latestMessage: Message;
}
