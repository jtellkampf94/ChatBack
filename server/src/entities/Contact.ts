import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from "typeorm";

import { User } from "./User";

@ObjectType()
@Entity()
export class Contact extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  contactId!: number;

  @ManyToOne(() => User, (user) => user.id)
  contact: User;

  @Field()
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
