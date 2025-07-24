// app/api/upload-images/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getSession } from '../../../lib/session';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload single image to Cloudinary
const uploadToCloudinary = async (file: File, userId: string, listingId?: string): Promise<string> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Create folder structure: room-listings/userId/listingId_timestamp (if listingId provided)
  const timestamp = Date.now();
  const folderPath = listingId 
    ? `room-listings/${userId}/${listingId}_${timestamp}`
    : `room-listings/${userId}/${timestamp}`;
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: folderPath,
        transformation: [
          { width: 1200, height: 800, crop: 'fill' },
          { quality: 'auto' },
          { format: 'webp' }
        ]
      },
      (error: any, result: any) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve(result?.secure_url || '');
        }
      }
    ).end(buffer);
  });
};

export async function POST(request: NextRequest) {
  try {
    // Get user session for folder organization
    const session = await getSession();
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized - Please log in to upload images' 
      }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    
    // Optional: Get listing ID for better organization
    const listingId = formData.get('listingId') as string || undefined;
    
    if (!files || files.length === 0) {
      return NextResponse.json({ 
        success: false,
        error: 'No files uploaded' 
      }, { status: 400 });
    }

    const userId = session.user.id;
    console.log(`Uploading ${files.length} photos to Cloudinary for user: ${userId}${listingId ? `, listing: ${listingId}` : ''}...`);

    // Upload all images to Cloudinary in parallel with user-specific folder
    const uploadPromises = files.map((file) => uploadToCloudinary(file, userId, listingId));
    const photoUrls = await Promise.all(uploadPromises);
    
    console.log('Photos uploaded successfully to user folder:');

    return NextResponse.json({ 
      success: true, 
      urls: photoUrls,
      userId: userId,
      listingId: listingId || null
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload images' 
      },
      { status: 500 }
    );
  }
}