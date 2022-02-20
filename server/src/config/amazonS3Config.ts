import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  signatureVersion: "v4",
  endpoint: process.env.AWS_S3_ENDPOINT,
  region: process.env.AWS_S3_REGION,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
