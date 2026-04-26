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

    const { title, category, classLevel, subject, icon, size, fileUrl } = await request.json();

    if (!title || !category || !classLevel || !subject || !size || !fileUrl) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();
    
    const material = await Material.create({
      title,
      category,
      class: classLevel,
      subject,
      size,
      url: fileUrl,
      icon: icon || '📘',
    });

    return NextResponse.json({ success: true, data: material });
  } catch (error: any) {
    console.error('Error saving material:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to save material' }, { status: 500 });
  }
}
