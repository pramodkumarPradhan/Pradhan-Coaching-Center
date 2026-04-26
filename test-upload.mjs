import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';

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

async function testUpload() {
  try {
    const bucketName = env.R2_BUCKET_NAME;
    const uniqueFilename = `test-${Date.now()}.txt`;
    
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueFilename,
      ContentType: 'text/plain',
    });

    console.log('Generating presigned URL...');
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });
    console.log('Got signed URL:', signedUrl);
    
    console.log('Attempting to PUT to signed URL...');
    const res = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: 'Hello from presigned URL test!',
    });
    
    if (res.ok) {
      console.log('Upload SUCCESS!');
    } else {
      console.error('Upload FAILED:', res.status, res.statusText);
      const text = await res.text();
      console.error('Response text:', text);
    }
  } catch (err) {
    console.error('Exception during test:', err);
  }
}

testUpload();
