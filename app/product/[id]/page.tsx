"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { useCartStore } from "@/lib/store";

export default function ProductPage({ params }: { params: { id: string } }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="p-8 text-center text-red-500 text-xl font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-md">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-6 transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {product.onSale && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
            SALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-center space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-gray-700 text-lg">{product.description}</p>
        </div>

        {/* Ratings */}
        <div className="flex items-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-gray-500">(24 reviews)</span>
        </div>

        {/* Pricing */}
        <div>
          <p className="text-2xl font-bold text-indigo-600">KSh {product.price.toLocaleString("en-KE")}</p>
          {product.originalPrice && (
            <p className="text-md text-gray-400 line-through">KSh {product.originalPrice.toLocaleString("en-KE")}</p>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => addToCart(product)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-3 px-6 rounded-lg shadow transition"
        >
          Add to Cart
        </button>

        {/* Navigation */}
    <Link
  href="/product"
  className="inline-flex items-center gap-1 bg-indigo-200 hover:bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md font-semibold text-xs mt-4 transition"
  style={{ width: "fit-content" }}
>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
  Back to Products
</Link>
      </div>
    </div>
  );
}
