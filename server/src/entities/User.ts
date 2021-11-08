import { ObjectType, Field } from "type-graphql";
import { Entity, Column } from "typeorm";
import { Model } from "./Model";

@ObjectType()
@Entity()
export class User extends Model {
  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  profilePictureUrl: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  about: string;
}
