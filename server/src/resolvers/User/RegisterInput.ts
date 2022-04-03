import { InputType, Field } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field({ nullable: true })
  profilePictureUrl: string;

  @Field()
  password!: string;
}
