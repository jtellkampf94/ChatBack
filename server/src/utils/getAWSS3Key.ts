import dotenv from "dotenv";

dotenv.config();

export const getAWSS3Key = (profilePictureUrl: string): string => {
  return profilePictureUrl.slice(
    process.env.AWS_S3_BUCKET_URL?.length,
    profilePictureUrl.length
  );
};
