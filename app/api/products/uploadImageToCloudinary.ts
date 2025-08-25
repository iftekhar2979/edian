import { v2 as cloudinary } from 'cloudinary';

// Setup Cloudinary configuration (make sure you've set up environment variables for Cloudinary credentials)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloud = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || ''); // Return the URL of the uploaded image
      }
    ).end(file.stream());
  });
};
