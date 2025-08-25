
"use client"
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles

export default function ProductUpdateForm({id}) {
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    quantity: 1,
    hasStock: true,
    description: "",
    images: [] as File[],
    existingImages: [] as string[], // To store the existing image URLs
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const editorRef = useRef(null); // Reference to the editor container
// Product ID from URL

  useEffect(() => {
    if (id) {
      fetchProductDetails(id as string); // Fetch product details on mount
    }
  }, [id]);

  // Fetch product details by ID
  const fetchProductDetails = async (productId: string) => {
    try {
      const res = await axios.get(`/api/products/${productId}`);
      const product = res.data;
      setProductData({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        hasStock: product.hasStock,
        description: product.description,
        images: [],
        existingImages: product.images,
      });

      // Initialize Quill editor with the existing description
      if (editorRef.current) {
        const quill = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Type your product description...",
          modules: {
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
              ["link", "image"],
              [{ align: [] }],
              ["clean"],
            ],
          },
        });
        quill.root.innerHTML = product.description; // Set the existing description in the editor
        quill.on("text-change", function () {
          setProductData((prevData) => ({
            ...prevData,
            description: quill.root.innerHTML, // Save rich HTML content to state
          }));
        });
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  // Handle image change (add new images)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setProductData({
        ...productData,
        images: Array.from(files), // Add new images to the array
      });
    }
  };

  // Handle image removal
  const handleImageRemove = (index: number) => {
    setProductData({
      ...productData,
      existingImages: productData.existingImages.filter((_, i) => i !== index), // Remove selected image
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("id",id)
    formData.append("name", productData.name);
    formData.append("price", productData.price.toString());
    formData.append("quantity", productData.quantity.toString());
    formData.append("hasStock", productData.hasStock.toString());
    formData.append("description", productData.description);

    // Add existing images (URLs) to the form data
    productData.existingImages.forEach((image) => {
      formData.append("existingImages", image);
    });

    // Add new images to the form data
    productData.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
        console.log(formData)
      const res = await axios.put(`/api/products/${id}`, formData);
      if (res.status === 200) {
        alert("Product updated successfully!");
        // router.push("/products"); // Redirect to the products page after success
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 bg-white p-8 rounded-lg shadow-md text-black">
      <h1 className="text-3xl font-bold text-center mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productData.name}
            onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: parseFloat(e.target.value) })
            }
            required
            min={0}
          />
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productData.quantity}
            onChange={(e) => setProductData({ ...productData, quantity: parseInt(e.target.value) })}
            required
            min={1}
          />
        </div>

        {/* Stock Availability */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasStock"
            checked={productData.hasStock}
            onChange={(e) =>
              setProductData({ ...productData, hasStock: e.target.checked })
            }
            className="h-4 w-4 text-blue-600"
          />
          <label htmlFor="hasStock" className="ml-2 text-sm font-medium text-gray-700">
            Has Stock
          </label>
        </div>

        {/* Description (Quill Editor) */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Product Description
          </label>
          <div
            ref={editorRef}
            className="quill-editor-container"
            style={{
              height: "500px", // Make the height larger
              width: "100%",   // Ensure it spans the full width
              border: "1px solid #ccc", // Border for the editor container
            }}
          ></div>
        </div>

        {/* Existing Product Images */}
        <div>
          <label htmlFor="existingImages" className="block text-sm font-medium text-gray-700">
            Existing Product Images
          </label>
          <div className="flex space-x-2">
            {productData.existingImages.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`Product Image ${index}`} className="w-20 h-20 object-cover" />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Add New Images
          </label>
          <input
            type="file"
            id="images"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
