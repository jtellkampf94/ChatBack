import { IsEmail, Length } from "class-validator";
import { InputType, Field } from "type-graphql";

import { IsUserAlreadyExists } from "../../validators/isUserAlreadyExists";

@InputType()
export class RegisterInput {
  @Field()
  @Length(5, 25, {
    message: "username must be between 5 and 25 characters long",
  })
  @IsUserAlreadyExists({ message: "username already in use" })
  username!: string;

  @Field()
  @IsEmail()
  @IsUserAlreadyExists({ message: "email already in use" })
  email!: string;

  @Field()
  @Length(5, 25, {
    message: "password must be between 5 and 25 characters long",
  })
  password!: string;
}
