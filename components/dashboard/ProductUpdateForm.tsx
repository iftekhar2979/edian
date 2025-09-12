"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";


export default function ProductUpdateForm({ id }: { id: string }) {
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    quantity: 1,
    hasStock: true,
    description: "",
    images: [] as File[],
    existingImages: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [editorLoaded, setEditorLoaded] = useState(false);

  const router = useRouter();

  // Fetch product data on mount
  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);
const editorRef = useRef(null); // Reference to the editor container

 useEffect(() => {
    // Only run on client
    import("quill").then((QuillModule) => {
      const Quill = QuillModule.default;
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
            description: quill.root.innerHTML,
          }));
        });
      }
    });
  }, []);
  // Set description and mark editor as ready
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

      // setEditorLoaded(true); // Load editor *after* data is set
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setProductData((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    }
  };

  const handleImageRemove = (index: number) => {
    setProductData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", productData.name);
    formData.append("price", productData.price.toString());
    formData.append("quantity", productData.quantity.toString());
    formData.append("hasStock", productData.hasStock.toString());
    formData.append("description", productData.description);

    productData.existingImages.forEach((img) => formData.append("existingImages", img));
    productData.images.forEach((img) => formData.append("images", img));

    try {
      const res = await axios.put(`/api/products/${id}`, formData);
      if (res.status === 200) {
        alert("Product updated successfully!");
        router.push("/products");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred.");
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
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
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
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            value={productData.price}
            onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) })}
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
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            value={productData.quantity}
            onChange={(e) => setProductData({ ...productData, quantity: parseInt(e.target.value) })}
            required
            min={1}
          />
        </div>

        {/* Has Stock */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasStock"
            checked={productData.hasStock}
            onChange={(e) => setProductData({ ...productData, hasStock: e.target.checked })}
            className="h-4 w-4 text-blue-600"
          />
          <label htmlFor="hasStock" className="ml-2 text-sm font-medium text-gray-700">
            Has Stock
          </label>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
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

        {/* Existing Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Existing Product Images
          </label>
          <div className="flex flex-wrap gap-2">
            {productData.existingImages.map((image, index) => (
              <div key={index} className="relative w-20 h-20">
                <Image src={image} alt={`Product ${index}`} fill className="object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upload New Images */}
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Add New Images
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
