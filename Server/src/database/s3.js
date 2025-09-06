import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '../config/env.js';

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION
});

const uploadFile = (file) => {
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: `${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  return s3.upload(params).promise();
};

export default uploadFile;
