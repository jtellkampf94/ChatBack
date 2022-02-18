import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Image {
  @Field()
  presignedUrl!: string;

  @Field()
  key!: string;
}
