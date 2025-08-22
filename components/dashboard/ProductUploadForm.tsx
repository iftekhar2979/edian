"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Quill (without SSR, as it uses the DOM)
// const Quill = dynamic(() => import("quill"), { ssr: false });
import Quill from "quill";

import "quill/dist/quill.snow.css"; // Import Quill styles

export default function ProductUploadForm() {
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    description: "",
    images: [] as File[], // This will hold the files selected for image uploads
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const editorRef = useRef(null); // Reference to the editor container

  // Initialize Quill editor on component mount
  useEffect(() => {
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

      // Sync Quill content with the state
      quill.on("text-change", function () {
        setProductData((prevData) => ({
          ...prevData,
          description: quill.root.innerHTML, // Save rich HTML content to state
        }));
      });
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setProductData({
        ...productData,
        images: Array.from(files),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("price", productData.price.toString());
    formData.append("description", productData.description);

    productData.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Product creation failed");
      }

      const createdProduct = await res.json();
      alert("Product created successfully!");
    } catch (error:any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mt-10 bg-white p-8 rounded-lg shadow-md text-black">
      <h1 className="text-3xl font-bold text-center mb-6">Upload New Product</h1>
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

        {/* Description (Quill Editor) */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium ">
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

        {/* Image Upload */}
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Product Images (Select Multiple)
          </label>
          <input
            type="file"
            id="images"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            You can select multiple images (JPG, PNG, etc.).
          </p>
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
            {loading ? "Uploading..." : "Upload Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
