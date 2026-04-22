import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Material from '@/models/Material';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    await dbConnect();
    const materials = await Material.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: materials });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch materials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // SECURITY: Ensure the user is authenticated before allowing an upload
    const token = request.headers.get('cookie')?.includes('admin_token');
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const title = data.get('title') as string;
    const category = data.get('category') as string;
    const classLevel = data.get('class') as string;
    const subject = data.get('subject') as string;
    const icon = data.get('icon') as string;

    if (!file || !title || !category || !classLevel || !subject) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;

    // Upload to Cloudflare R2
    const bucketName = process.env.R2_BUCKET_NAME!;
    const publicDomain = process.env.R2_PUBLIC_DOMAIN!;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: buffer,
        ContentType: file.type || 'application/pdf',
      })
    );

    // Create Public R2 URL
    const fileUrl = `${publicDomain}/${filename}`;
    
    // Calculate Size (MB)
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

    await dbConnect();
    
    const material = await Material.create({
      title,
      category,
      class: classLevel,
      subject,
      size: sizeInMB,
      url: fileUrl,
      icon: icon || '📘',
    });

    return NextResponse.json({ success: true, data: material });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to upload material' }, { status: 500 });
  }
}
