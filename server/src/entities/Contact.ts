import { ObjectType, Field } from "type-graphql";
import { Entity, ManyToOne, Column, OneToOne, JoinColumn } from "typeorm";

import { User } from "./User";
import { Model } from "./Model";

@ObjectType()
@Entity()
export class Contact extends Model {
  @ManyToOne(() => User)
  contact: User;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
