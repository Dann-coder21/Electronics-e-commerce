// app/categories/page.tsx
import Link from "next/link";
import { categories } from "@/lib/categories";

export default function CategoriesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">All Categories</h1>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-5 py-2.5 rounded-lg font-semibold shadow transition-colors border border-blue-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/product?category=${category.slug}`}
            className="group relative bg-white rounded-xl p-6 overflow-hidden transition-all duration-300 
                       border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-lg
                       hover:-translate-y-1 transform"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            
            <div className="text-4xl mb-4 w-16 h-16 flex items-center justify-center 
  bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 
  group-hover:text-white transition-colors duration-300 mx-auto">
  <category.icon />
</div>

            <div className="text-center">
              <h2 className="font-semibold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors">
                {category.name}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-medium text-indigo-600">{category.count}</span>{" "}
                {category.count === 1 ? "item" : "items"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}