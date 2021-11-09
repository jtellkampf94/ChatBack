import { ObjectType, Field } from "type-graphql";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

import { Model } from "./Model";
import { ChatMember } from "./ChatMember";
import { Message } from "./Message";
import { User } from "./User";

@ObjectType()
@Entity()
export class Chat extends Model {
  @OneToOne(() => User)
  @JoinColumn()
  createdBy: User;

  @Field()
  @Column()
  createdById: number;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @OneToMany(() => ChatMember, (chatMember) => chatMember.chat)
  chatMembers: ChatMember[];

  @Field(() => Message)
  latestMessage: Message;
}
