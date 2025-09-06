'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarouselCard from './CarouselCard';

interface CarouselItem {
  _id: string;
  image: string;
  heading: string;
  subHeading: string;
}

const CarouselList: React.FC = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get('/api/carousels');
      setCarouselItems(res.data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this carousel item?')) return;
    setDeletingId(id);
    try {
      await axios.delete(`/api/carousels/${id}`);
      setCarouselItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert('Failed to delete');
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id: string) => {
    // You can route to /edit/[id] or open a modal
    alert(`Edit carousel item with id: ${id}`);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {carouselItems.length > 0 ? (
        carouselItems.map((item) => (
          <CarouselCard
            key={item._id}
            id={item._id}
            imageUrl={item.image}
            heading={item.heading}
            subHeading={item.subHeading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={deletingId === item._id}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No carousel items found.</p>
      )}
    </div>
  );
};

export default CarouselList;
