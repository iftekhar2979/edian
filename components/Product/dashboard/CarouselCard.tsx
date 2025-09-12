import Image from 'next/image';
import React from 'react';

interface CarouselCardProps {
  id: string;
  imageUrl: string;
  heading: string;
  subHeading: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  id,
  imageUrl,
  heading,
  subHeading,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <Image
        src={imageUrl}
        alt={heading}
        height={1000}
        width={1000}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-bold">{heading}</h3>
      <p className="text-sm text-gray-600 mb-4">{subHeading}</p>
      <div className="flex gap-4">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
          onClick={() => onDelete(id)}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default CarouselCard;
