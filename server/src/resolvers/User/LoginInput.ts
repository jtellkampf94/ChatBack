import { InputType, Field } from "type-graphql";

InputType();
export class LoginInput {
  @Field()
  emailOrUsername!: string;

  @Field()
  password!: string;
}
