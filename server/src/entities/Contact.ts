import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { User } from "./User";

@ObjectType()
@Entity()
export class Contact extends BaseEntity {
  @Field()
  @ManyToOne(() => User)
  contact!: User;

  @PrimaryColumn()
  contactId!: number;

  @Field()
  @ManyToOne(() => User)
  user!: User;

  @PrimaryColumn()
  userId!: number;
}
