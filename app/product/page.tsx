"use client";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SearchParams {
  category?: string;
}

export default function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const filteredProducts = searchParams.category
    ? products.filter(p => p.category?.toLowerCase() === searchParams.category?.toLowerCase())
    : products;

  const categoryName = searchParams.category
    ? searchParams.category.split('-')
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ')
    : 'All';

  return (
    <main className="container mx-auto px-0 sm:px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 px-4 sm:px-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {categoryName} Products
          </h1>
          {searchParams.category && (
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </p>
          )}
        </div>
        <Link href="/" className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-5 py-2.5 rounded-lg font-semibold shadow transition-colors border border-blue-200">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500 mb-4">No products found in this category</p>
          <Link href="/product" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            View All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}