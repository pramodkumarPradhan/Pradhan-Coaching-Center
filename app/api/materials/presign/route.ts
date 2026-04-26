import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    // SECURITY: Ensure the user is authenticated before allowing upload
    const token = request.headers.get('cookie')?.includes('admin_token');
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const { filename, contentType } = await request.json();

    if (!filename || !contentType) {
      return NextResponse.json({ success: false, error: 'Missing filename or contentType' }, { status: 400 });
    }

    const bucketName = process.env.R2_BUCKET_NAME!;

    // Generate unique filename to avoid overwrites
    const uniqueFilename = `${Date.now()}-${filename.replace(/\s+/g, '_')}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueFilename,
      ContentType: contentType,
    });

    // Create Presigned URL (valid for 10 minutes)
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });
    const publicDomain = process.env.R2_PUBLIC_DOMAIN!;
    const fileUrl = `${publicDomain}/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      data: {
        signedUrl,
        fileUrl,
      },
    });
  } catch (error: any) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate presigned URL' },
      { status: 500 }
    );
  }
}
