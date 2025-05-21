"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { products, Product } from "@/lib/products"; // Ensure Product type is exported
import { useCartStore } from "@/lib/store";
import { Star, ShoppingCart, ChevronLeft, Tag ,ShoppingBag } from "lucide-react"; // Added icons
import { motion } from "framer-motion";

interface ProductPageProps {
  params: { id: string };
}

// Helper function to format category name for display and URL
const formatCategory = (categoryName: string | undefined) => {
  if (!categoryName) return { display: "Category", slug: "unknown" };
  const slug = categoryName.toLowerCase().replace(/\s+/g, "-");
  const display = categoryName
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  return { display, slug };
};

// Rating Stars Component (reusable)
const RatingDisplay = ({ rating, reviewCount }: { rating: number; reviewCount?: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 text-amber-400 fill-amber-400" />
      ))}
      {halfStar && <Star key="half" className="w-5 h-5 text-amber-400 fill-amber-200" /> /* Or use a half-star icon */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-slate-300 dark:text-slate-600 fill-slate-300 dark:fill-slate-600" />
      ))}
      {reviewCount && (
         <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">({reviewCount} reviews)</span>
      )}
    </div>
  );
};


export default function ProductPage({ params }: ProductPageProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center p-8 bg-slate-50 dark:bg-slate-900">
        <ShoppingBag className="w-20 h-20 text-slate-300 dark:text-slate-600 mb-6" />
        <h1 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-3">
          Product Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
          We're sorry, but the product you are looking for does not exist or may have been removed.
        </p>
        <Link
          href="/product"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white text-sm font-medium rounded-lg shadow-md transition-colors"
        >
          <ChevronLeft size={18} />
          Browse All Products
        </Link>
      </div>
    );
  }

  const { display: categoryDisplayName, slug: categorySlug } = formatCategory(product.category);
  const productRating = product.rating || 4.2; // Example: use product.rating or a default
  const reviewCount = product.reviews || 24; // Example: use product.reviews or a default

  return (
    <main className="bg-slate-50 dark:bg-slate-900 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs / Back Navigation */}
        <div className="mb-6 sm:mb-8 flex items-center text-sm">
          <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors">
            Home
          </Link>
          <ChevronLeft size={16} className="mx-1.5 transform rotate-180 text-slate-400 dark:text-slate-500" />
          {product.category && (
            <>
              <Link 
                href={`/products?category=${categorySlug}`} 
                className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors"
              >
                {categoryDisplayName}
              </Link>
              <ChevronLeft size={16} className="mx-1.5 transform rotate-180 text-slate-400 dark:text-slate-500" />
            </>
          )}
          <span className="text-slate-700 dark:text-slate-200 font-medium truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Product Image Gallery (Simplified) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative aspect-[4/3] bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-6 sm:p-8 transition-transform duration-500 ease-out group-hover:scale-105" // Added group-hover for parent hover effect
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              priority // This image is likely LCP
            />
            {product.onSale && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg tracking-wide">
                <Tag size={14} className="inline -mt-0.5 mr-1" /> SALE
              </div>
            )}
             {/* You could add thumbnail navigation here if product has multiple images */}
          </motion.div>

          {/* Product Information */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay:0.1, ease: "easeOut" }}
            className="flex flex-col space-y-6"
          >
            <div>
              {product.category && (
                 <Link 
                    href={`/products?category=${categorySlug}`}
                    className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-amber-400 hover:underline mb-1 inline-block"
                  >
                  {categoryDisplayName}
                </Link>
              )}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white !leading-tight">
                {product.name}
              </h1>
              {/* Short description or tagline could go here */}
            </div>

            <RatingDisplay rating={productRating} reviewCount={reviewCount} />

            <div>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                {product.description || "No description available for this product."}
              </p>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-bold text-indigo-700 dark:text-amber-400">
                KSh {product.price.toLocaleString("en-KE")}
              </p>
              {product.originalPrice && product.onSale && (
                <p className="text-lg text-slate-400 dark:text-slate-500 line-through">
                  KSh {product.originalPrice.toLocaleString("en-KE")}
                </p>
              )}
            </div>
            
            {/* Quantity Selector (Placeholder) */}
            {/* <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="text-sm font-medium text-slate-700 dark:text-slate-300">Quantity:</label>
              <select id="quantity" className="py-2 px-3 border border-slate-300 rounded-md text-sm">
                {[...Array(5)].map((_,i) => <option key={i+1} value={i+1}>{i+1}</option>)}
              </select>
            </div> */}

            {/* Add to Cart Button & Wishlist */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  addToCart(product as Product); // Ensure product is cast if needed by store
                  // Optionally show a toast/notification
                }}
                className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2.5 py-3.5 px-8 
                           bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-500 dark:hover:bg-amber-600
                           text-white text-base font-semibold rounded-lg shadow-md hover:shadow-lg
                           transition-all duration-300 ease-in-out
                           focus:outline-none focus:ring-2 focus:ring-offset-2 
                           focus:ring-indigo-500 dark:focus:ring-amber-500 dark:focus:ring-offset-slate-900
                           transform hover:-translate-y-0.5"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              {/* <button 
                className="w-full sm:w-auto p-3.5 border border-slate-300 dark:border-slate-600 rounded-lg 
                           text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 
                           transition-colors shadow-sm"
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
              </button> */}
            </div>

            {/* Additional Info / Meta */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {product.sku && <p><strong>SKU:</strong> {product.sku}</p>}
              {product.availability && <p><strong>Availability:</strong> <span className={product.availability === 'In Stock' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>{product.availability}</span></p>}
              {/* Add more meta like brand, material, etc. */}
            </div>
          </motion.div>
        </div>

        {/* Related Products Section (Placeholder) */}
        {/* <section className="mt-16 sm:mt-20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            { products.slice(0,4).map(p => p.id !== product.id && <ProductCard key={p.id} product={p} />) }
          </div>
        </section> */}
      </div>
    </main>
  );
}