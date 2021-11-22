import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { User } from "./User";

@ObjectType()
@Entity()
export class Contact extends BaseEntity {
  @ManyToOne(() => User)
  contact: User;

  @Field()
  @PrimaryColumn()
  contactId: number;

  @ManyToOne(() => User)
  user: User;

  @Field()
  @PrimaryColumn()
  userId: number;
}
