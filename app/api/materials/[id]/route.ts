import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Material from '@/models/Material';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // SECURITY: Ensure the user is authenticated before allowing deletion
    const token = request.headers.get('cookie')?.includes('admin_token');
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    await dbConnect();
    
    const material = await Material.findById(id);
    if (!material) {
      return NextResponse.json({ success: false, error: 'Material not found' }, { status: 404 });
    }

    // Delete from Cloudflare R2 if it's an R2 URL
    const publicDomain = process.env.R2_PUBLIC_DOMAIN || '';
    if (material.url.startsWith(publicDomain)) {
      const filename = material.url.replace(`${publicDomain}/`, '');
      try {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: filename,
          })
        );
      } catch (err) {
        console.warn('Failed to delete file from R2:', err);
      }
    }

    await Material.findByIdAndDelete(id);

    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to delete material' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('cookie')?.includes('admin_token');
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    const { title, category, classLevel, subject, icon, size, url } = await request.json();

    if (!title || !category || !classLevel || !subject) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();
    
    const material = await Material.findById(id);
    if (!material) {
      return NextResponse.json({ success: false, error: 'Material not found' }, { status: 404 });
    }

    // If URL is provided and it's different, delete old R2 object
    if (url && url !== material.url) {
      const publicDomain = process.env.R2_PUBLIC_DOMAIN || '';
      if (material.url.startsWith(publicDomain)) {
        const filename = material.url.replace(`${publicDomain}/`, '');
        try {
          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.R2_BUCKET_NAME!,
              Key: filename,
            })
          );
        } catch (err) {
          console.warn('Failed to delete old file from R2:', err);
        }
      }
      material.url = url;
      if (size) material.size = size;
    }

    material.title = title;
    material.category = category;
    material.class = classLevel;
    material.subject = subject;
    material.icon = icon || '📘';

    await material.save();

    return NextResponse.json({ success: true, data: material });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to update material' }, { status: 500 });
  }
}
