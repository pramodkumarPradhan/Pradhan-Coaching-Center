import { S3Client, PutBucketCorsCommand, GetBucketCorsCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

// Parse .env.local manually
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const s3Client = new S3Client({
  region: 'auto',
  endpoint: env.R2_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

const bucketName = env.R2_BUCKET_NAME;

async function setupCors() {
  try {
    const corsParams = {
      Bucket: bucketName,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ["*"],
            AllowedMethods: ["PUT", "POST", "GET", "HEAD"],
            AllowedOrigins: ["*"],
            ExposeHeaders: ["ETag"],
            MaxAgeSeconds: 3000
          }
        ]
      }
    };

    console.log('Setting CORS policy on bucket:', bucketName);
    const result = await s3Client.send(new PutBucketCorsCommand(corsParams));
    console.log('Successfully set CORS:', result);
    
    console.log('Verifying...');
    const verify = await s3Client.send(new GetBucketCorsCommand({ Bucket: bucketName }));
    console.log('Current CORS:', JSON.stringify(verify.CORSRules, null, 2));

  } catch (error) {
    console.error('Error setting CORS:', error);
  }
}

setupCors();
