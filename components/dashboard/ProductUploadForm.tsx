"use client";

import { useState, useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles

export default function ProductUploadForm() {
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    quantity: 1, // Add quantity
    hasStock: true, // Add hasStock (checkbox)
    description: "",
    images: [] as File[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const editorRef = useRef(null); // Reference to the editor container

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
    formData.append("quantity", productData.quantity.toString());
    formData.append("hasStock", productData.hasStock.toString());
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

      await res.json();
      alert("Product created successfully!");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 bg-white p-8 rounded-lg shadow-md text-black">
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
          <label htmlFor="description" className="block text-sm font-medium ">
            Product Description
          </label>
          <div
            ref={editorRef}
            className="quill-editor-container"
            style={{
              height: "500px",
              width: "100%",
              border: "1px solid #ccc",
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
