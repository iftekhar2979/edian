"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const productSchema = z.object({
  title: z.string().min(2, "Title is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  description: z.string().min(5, "Description is too short"),
  image: z.string().url("Image must be a valid URL"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: ProductFormData) => {
    setSubmitting(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to upload");

      setSuccess(true);
    } catch (err) {
      alert("Error uploading product.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md space-y-6 max-w-xl mx-auto mt-16">
      <h2 className="text-2xl font-bold text-black">Upload Product</h2>

      <div>
        <label className="block text-black mb-1">Title</label>
        <input
          {...register("title")}
          className="w-full h-12 px-4 border border-black rounded focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-black mb-1">Price (TK)</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          className="w-full h-12 px-4 border border-black rounded focus:ring-2 focus:ring-blue-500"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block text-black mb-1">Image URL</label>
        <input
          {...register("image")}
          className="w-full h-12 px-4 border border-black rounded focus:ring-2 focus:ring-blue-500"
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
      </div>

      <div>
        <label className="block text-black mb-1">Description</label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full px-4 py-2 border border-black rounded focus:ring-2 focus:ring-blue-500"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
      >
        {submitting ? "Uploading..." : "Upload Product"}
      </button>

      {success && <p className="text-green-600 text-sm mt-2">Product uploaded successfully!</p>}
    </form>
  );
}
