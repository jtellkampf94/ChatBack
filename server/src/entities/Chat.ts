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

  @OneToMany(() => ChatMember, (chatMember) => chatMember.chat)
  chatMembers: ChatMember[];

  @Field(() => [User])
  members: User[];

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  groupName: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  groupAvatarUrl: string;

  @Field(() => Message, { nullable: true })
  latestMessage: Message;
}
