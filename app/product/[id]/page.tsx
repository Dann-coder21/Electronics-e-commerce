import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { useCartStore } from "@/lib/store";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Product Image */}
      <div className="aspect-square bg-gray-50 relative">
        <Link href={`/product/${product.id}`} className="block h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain w-full h-full p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>
        
        {/* Quick Add to Cart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="absolute bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md hover:bg-blue-700"
          aria-label={`Add ${product.name} to cart`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
            <h3 className="font-medium text-gray-900 line-clamp-2" title={product.name}>
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
            )}
          </div>
          
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? 'fill-current' : 'fill-gray-300'}`} // Assuming 4/5 rating for demo
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">(24)</span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          href={`/product/${product.id}`}
          className="mt-4 inline-block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-center py-2 px-4 rounded-lg font-medium transition-colors"
        >
          View Details
        </Link>
      </div>

      {/* Sale Badge */}
      {product.onSale && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          SALE
        </div>
      )}
    </div>
  );
}