'use client';

import React, { useState } from 'react';
import axios from 'axios';

const CarouselUploader: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [heading, setHeading] = useState('');
  const [subHeading, setSubHeading] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setImage(null);
    setHeading('');
    setSubHeading('');
  };

  const handleSubmit = async () => {
    if (!image || !heading || !subHeading) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('heading', heading);
    formData.append('subHeading', subHeading);

    try {
      await axios.post('/api/carousels', formData);
      setSuccess(true);
      resetForm();
    } catch (error) {
      console.error('Upload failed', error);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Upload Carousel Content</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Heading</label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Enter heading"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Subheading</label>
        <input
          type="text"
          value={subHeading}
          onChange={(e) => setSubHeading(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Enter subheading"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Carousel Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        {image && (
          <div className="mt-2 text-sm text-gray-600">
            Selected image: {image.name}
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? 'Uploading...' : 'Submit'}
      </button>

      {success && (
        <p className="mt-4 text-green-600 font-medium">
          Carousel data uploaded successfully!
        </p>
      )}
    </div>
  );
};

export default CarouselUploader;
