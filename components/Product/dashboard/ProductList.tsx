'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  hasStock: boolean;
  description: string;
};

const ProductTable = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProductList(res.data); // Set the products data to state
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  // Handle click for editing a product
  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true); // Show modal for editing
  };

  // Handle click for deleting a product
  const handleDeleteClick = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await axios.delete(`/api/products/${id}`);
        fetchProducts(); // Refetch the list after deletion
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  // Close the edit modal
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Save the edited product
  const handleSaveChanges = async () => {
    if (selectedProduct) {
      try {
        await axios.put(`/api/products/${selectedProduct._id}`, selectedProduct);
        fetchProducts();
        handleModalClose();
      } catch (error) {
        console.error('Failed to update product:', error);
      }
    }
  };

  return (
    <div className="p-6 mt-16">
      <h1 className="text-2xl text-black font-bold mb-6">Product List</h1>
      <Link href="/dashboard"><p className="text-2xl  text-green-300 underline font-bold mb-6"> Add Product</p></Link>

      {/* Table */}
      <div className="overflow-x-auto text-black">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">In Stock</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">${product.price.toFixed(2)}</td>
                <td className="px-4 py-2 border">{product.quantity}</td>
                <td className="px-4 py-2 border">{product.hasStock ? 'In Stock' : 'Out of Stock'}</td>
                <td className="px-4 py-2 border">
                  <Link href={`products/${product._id}`}
                    // onClick={() => handleEditClick(product)}
                    className="px-2 py-1 bg-blue-600 text-white rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(product._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
    </div>
  );
};

export default ProductTable;
