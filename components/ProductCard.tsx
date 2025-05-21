"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products"; // Assuming Product type is defined here
import { useCartStore } from "@/lib/store"; // Assuming Zustand store
import { ShoppingCart, Star, ArrowRight, Eye } from "lucide-react"; // Added Eye icon
import { motion, AnimatePresence } from "framer-motion";

// A simple rating stars component (optional, but nice)
const RatingStars = ({ rating, starSize = "w-3.5 h-3.5" }: { rating: number, starSize?: string }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          className={`${starSize} ${
            i < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-300"
          }`}
        />
      ))}
      <span className="ml-1.5 text-xs text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );
};


export default function ProductCardModern({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  // Placeholder rating if not available in product data
  const displayRating = product.rating || 4.5; 

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      whileHover="hover" // Define a hover state for children to use
      className="h-full w-full group/card" // Added group/card for more specific hover targeting
    >
      <div className="relative flex flex-col h-full bg-white border border-slate-200 rounded-xl
                      shadow-sm hover:shadow-xl transition-all duration-300 ease-out overflow-hidden
                      dark:bg-slate-800 dark:border-slate-700">
        
        {/* Image Section */}
        <Link href={`/product/${product.id}`} className="block relative">
          <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain w-full h-full p-4 transition-transform duration-500 ease-in-out group-hover/card:scale-105"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
              priority={false} // Set to true for above-the-fold images on initial load
            />

            {/* Sale Badge */}
            {product.onSale && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white 
                            text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md tracking-wide">
                SALE
              </div>
            )}

            {/* Quick Actions - Appear on Image Hover */}
            <motion.div 
              className="absolute inset-0 bg-black/20 flex items-center justify-center gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
              variants={{
                hover: { opacity: 1 }
              }}
            >
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                  // Add some feedback, e.g., toast notification
                }}
                className="bg-white text-indigo-600 p-2.5 rounded-full shadow-lg hover:bg-indigo-50 transition-colors"
                aria-label={`Add ${product.name} to cart`}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <ShoppingCart className="h-5 w-5" />
              </motion.button>
              <Link 
                href={`/product/${product.id}`}
                className="bg-white text-slate-700 p-2.5 rounded-full shadow-lg hover:bg-slate-50 transition-colors"
                aria-label={`View ${product.name} details`}
                onClick={(e) => e.stopPropagation()} // Prevent card link navigation if already going
              >
                <motion.div whileHover={{ scale: 1.1, rotate: -5 }}>
                  <Eye className="h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </Link>

        {/* Product Info Section */}
        <div className="p-4 flex flex-col flex-grow"> {/* flex-grow to push actions to bottom if needed */}
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-semibold text-base text-slate-800 dark:text-slate-100 line-clamp-2 mb-1
                           group-hover/card:text-indigo-600 dark:group-hover/card:text-indigo-400 transition-colors">
              {product.name}
            </h3>
          </Link>

          {product.category && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              {product.category} {/* Assuming product has a category */}
            </p>
          )}

          {/* Rating */}
          <div className="mb-3">
            <RatingStars rating={displayRating} />
          </div>
          
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              KSh {product.price.toFixed(2)}
            </p>
            {product.originalPrice && product.onSale && (
              <p className="text-sm text-slate-400 dark:text-slate-500 line-through">
                KSh {product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Action Buttons / More Info - Pushed to bottom */}
          <div className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-700">
            <motion.button
              onClick={(e) => {
                e.preventDefault(); // If it's inside a Link or another button
                addToCart(product);
              }}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg
                         text-sm font-medium hover:bg-indigo-700 transition-colors duration-300
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                         dark:bg-indigo-500 dark:hover:bg-indigo-600"
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </motion.button>
            {/* 
            // Alternative "View Details" button if not using hover action on image
            <Link href={`/product/${product.id}`}
              className="mt-2 w-full block text-center text-indigo-600 dark:text-indigo-400 text-sm font-medium 
                         hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              View Details <ArrowRight className="inline h-4 w-4 -mt-0.5" />
            </Link>
            */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}