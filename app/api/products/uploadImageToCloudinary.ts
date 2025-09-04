import { v2 as cloudinary } from 'cloudinary';

// Setup Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadImageToCloud = async (file: File): Promise<string> => {
  const buffer = Buffer.from(await file.arrayBuffer()); // Convert to Node Buffer

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || '');
      }
    );

    stream.end(buffer); // Send the buffer instead of ReadableStream
  });
};
