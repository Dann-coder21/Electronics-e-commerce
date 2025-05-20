"use client";

import React from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import Link from 'next/link';  
import { useSearchParams } from 'next/navigation';



// app/search/page.tsx


export default function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
  const results = products.filter(p => 
    p.name.toLowerCase().includes(searchParams.query?.toLowerCase() || '')
  );
  
  return (
    <div className="container mx-auto p-4">
      <h1>Search Results for: {searchParams.query}</h1> 
      {results.length > 0 ? (   
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}