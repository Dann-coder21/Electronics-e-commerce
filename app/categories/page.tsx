// app/categories/page.tsx
import Link from "next/link";
import { categories } from "@/lib/categories"; // Assuming this is your categories data source
import { ArrowLeft, ChevronRight } from "lucide-react"; // For navigation icons
import { motion } from "framer-motion"; // For animations

// Animation variants
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const categoryItemVariant = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function CategoriesPage() {
  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 sm:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Shop by Category
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-base">
              Explore our wide range of product categories.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold
                       text-indigo-600 hover:text-indigo-700 dark:text-amber-400 dark:hover:text-amber-300 
                       py-2.5 px-5 rounded-lg hover:bg-indigo-100 dark:hover:bg-slate-800 transition-all duration-200 group border border-indigo-200 dark:border-slate-700 hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
            Back to Home
          </Link>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-20 sm:py-28 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
            {/* You might need a different icon here, like a folder or tag icon */}
            <ChevronRight size={80} className="mx-auto text-slate-300 dark:text-slate-600 mb-8" /> 
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-3">
              No Categories Available
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
              It seems we haven't set up any product categories yet. Please check back soon!
            </p>
            <Link 
              href="/products" 
              className="inline-block bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-500 dark:hover:bg-amber-600 
                         text-white px-8 py-3 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              View All Products
            </Link>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {categories.map((category) => {
              const IconComponent = category.icon; // Assuming category.icon is a React component (e.g., from Lucide)
              return (
                <motion.div
                  key={category.slug}
                  variants={categoryItemVariant}
                  whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
                  className="h-full" // Ensures cards in a row take equal height if content varies
                >
                  <Link
                    href={`/products?category=${category.slug}`} // CRITICAL: Should be /products (plural)
                    className="group relative flex flex-col items-center justify-center text-center 
                               bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 h-full
                               border border-slate-200 dark:border-slate-700 
                               hover:border-indigo-300 dark:hover:border-amber-400
                               shadow-lg hover:shadow-xl transition-all duration-300 ease-out"
                  >
                    {/* Optional subtle background pattern or gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-amber-50/30 dark:from-indigo-900/20 dark:to-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-xl" />
                    
                    <div className="mb-5 sm:mb-6 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 
                                    bg-indigo-100 dark:bg-slate-700 text-indigo-600 dark:text-amber-400 
                                    rounded-full group-hover:bg-indigo-600 dark:group-hover:bg-amber-500 
                                    group-hover:text-white dark:group-hover:text-slate-900
                                    transition-all duration-300 ease-out transform group-hover:scale-110 shadow-md">
                      {IconComponent ? <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" /> : <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" /> /* Fallback icon */}
                    </div>

                    <h2 className="font-semibold text-lg sm:text-xl text-slate-800 dark:text-slate-100 
                                   group-hover:text-indigo-700 dark:group-hover:text-amber-400 
                                   transition-colors duration-300">
                      {category.name}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                      {category.count} {category.count === 1 ? "product" : "products"}
                    </p>
                    <div className="absolute bottom-5 right-5 text-indigo-500 dark:text-amber-400 opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </main>
  );
}