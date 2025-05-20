"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Link
        href={`/product/${product.id}`}
        className="group relative flex flex-col h-full bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        {/* Image Container - Reduced padding on mobile */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain w-full h-full p-2 sm:p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={false}
          />

          {/* Sale Badge - Smaller on mobile */}
          {product.onSale && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-sm sm:shadow-md">
              SALE
            </div>
          )}

          {/* Add to Cart Button - Smaller on mobile */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-indigo-600 text-white p-1.5 sm:p-2 rounded-full opacity-0 
                       group-hover:opacity-100 transition-all duration-300 shadow-md hover:bg-indigo-700"
            aria-label={`Add ${product.name} to cart`}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
          </motion.button>
          <div className="absolute bottom-14 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-xl shadow-md 
                opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-10">
            Add to Cart
          </div>

        </div>

        {/* Product Info - Compact on mobile */}
        <div className="flex flex-col flex-grow p-2 sm:p-3 space-y-1 sm:space-y-2">
          <h3 
            className="font-medium text-gray-900 text-xs sm:text-sm line-clamp-2 group-hover:text-indigo-600 transition-colors" 
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Pricing - Smaller text on mobile */}
          <div className="mt-auto">
            <div className="flex items-center gap-1 sm:gap-2">
              <p className="text-sm sm:text-base font-bold text-gray-900">
                KSh {product.price.toFixed(2)}
              </p>
              {product.originalPrice && (
                <p className="text-[10px] sm:text-xs text-gray-400 line-through">
                  KSh {product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>

            {/* Ratings - Smaller on mobile */}
            <div className="flex items-center mt-0.5 sm:mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < 4 ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-0.5 sm:ml-1 text-[10px] sm:text-xs text-gray-500">(24)</span>
            </div>

            {/* View Details CTA - Compact on mobile */}
            <motion.div
              className="flex items-center justify-center gap-1 w-full mt-2 sm:mt-3 py-1.5 sm:py-2 text-[10px] sm:text-xs bg-gray-50 hover:bg-gray-100 
                         rounded-md sm:rounded-lg font-medium text-gray-700 transition-colors group/cta"
              whileHover={{ backgroundColor: "#f3f4f6" }}
            >
              View Details
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform group-hover/cta:translate-x-0.5 sm:group-hover/cta:translate-x-1" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}