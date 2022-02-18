import { Ctx, Resolver, UseMiddleware, Query } from "type-graphql";
import { v4 as uuid } from "uuid";

import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";
import { Image } from "../../entities/Image";
import { s3 } from "../../config/amazonS3Config";

@Resolver((of) => Image)
export class ImageResolver {
  @UseMiddleware(isAuth)
  @Query(() => Image)
  async getPresignedUrl(@Ctx() { req }: MyContext): Promise<Image> {
    const key = `${req.session.userId}/${uuid()}.jpg`;
    const presignedUrl = await s3.getSignedUrl("putObject", {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ContentType: "image/jpeg",
      Expires: 60,
      Key: key,
    });

    return { key, presignedUrl };
  }
}
