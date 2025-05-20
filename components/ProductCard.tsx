"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { useCartStore } from "@/lib/store";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
   <Link
  href={`/product/${product.id}`}
  className="group relative bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden block"
>
  {/* Product Image */}
  <div className="aspect-square bg-gray-50 relative">
    <Image
      src={product.image}
      alt={product.name}
      fill
      className="object-contain w-full h-full p-2 transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    />

    {/* Add to Cart */}
    <button
      onClick={(e) => {
        e.preventDefault();
        addToCart(product);
      }}
      className="absolute bottom-2 right-2 bg-indigo-600 text-white p-1.5 rounded-full opacity-0 
                 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-indigo-700"
      aria-label={`Add ${product.name} to cart`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </button>

    {/* Sale Badge */}
    {product.onSale && (
      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-sm">
        SALE
      </div>
    )}
  </div>

  {/* Product Info */}
  <div className="p-2 space-y-1">
    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-indigo-600 transition-colors" title={product.name}>
      {product.name}
    </h3>

    {/* Pricing */}
    <div>
      <p className="text-base font-bold text-gray-900">KSh {product.price.toFixed(2)}</p>
      {product.originalPrice && (
        <p className="text-xs text-gray-400 line-through">KSh {product.originalPrice.toFixed(2)}</p>
      )}
    </div>

    {/* Ratings */}
    <div className="flex items-center text-yellow-400 text-xs">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i < 4 ? 'fill-current' : 'text-gray-200'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-gray-500">(24)</span>
    </div>

    {/* View Details */}
    <div
      className="block w-full mt-2 text-center py-1 text-xs bg-gray-100 hover:bg-gray-200 
                 rounded font-medium text-gray-800 transition-colors"
    >
      View Details
    </div>
  </div>
</Link>
  );
}