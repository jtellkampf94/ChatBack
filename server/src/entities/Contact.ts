import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";

import { User } from "./User";
import { Model } from "./Model";

@ObjectType()
@Entity()
export class Contact extends Model {
  @ManyToOne(() => User)
  contact: User;

  @Field()
  @Column()
  contactId: number;

  @ManyToOne(() => User)
  user: User;

  @Field()
  @Column()
  userId: number;
}
