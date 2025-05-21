"use client";
import ProductCard from "@/components/ProductCard"; // Assuming this is the modernized ProductCard
import { products, Product } from "@/lib/products"; // Assuming products array and Product type
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Star, ChevronRight, Tv, Volume2, Home, Gamepad2 } from "lucide-react"; // Updated icons
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

// Helper for Framer Motion variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "circOut" } },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "circOut" } },
};

// Simple Rating Component
const RatingStars = ({ rating, size = "w-5 h-5" }: { rating: number; size?: string }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < Math.round(rating)
            ? "text-amber-400 fill-amber-400"
            : "text-slate-300 dark:text-slate-600 fill-slate-300 dark:fill-slate-600"
        }`}
      />
    ))}
  </div>
);

// Category Icon Mapping
const categoryIcons: { [key: string]: React.ReactNode } = {
  televisions: <Tv className="w-8 h-8" />,
  audio: <Volume2 className="w-8 h-8" />,
  "smart-home": <Home className="w-8 h-8" />,
  gaming: <Gamepad2 className="w-8 h-8" />,
  default: <ShoppingBag className="w-8 h-8" />, // Fallback icon
};

export default function ModernHomePage() {
  const featuredProducts = useMemo(() => products.slice(0, 4), []); // Show 4 for cleaner layout

  const categories = useMemo(() => [
    { name: "Televisions", slug: "televisions", count: products.filter(p => p.category?.toLowerCase() === "televisions").length },
    { name: "Audio", slug: "audio", count: products.filter(p => p.category?.toLowerCase() === "audio").length },
    { name: "Smart Home", slug: "smart-home", count: products.filter(p => p.category?.toLowerCase() === "smart-home").length },
    { name: "Gaming", slug: "gaming", count: products.filter(p => p.category?.toLowerCase() === "gaming").length },
  ].filter(c => c.count > 0), []); // Only show categories with products

  const testimonials = useMemo(() => [
    {
      quote: "The TV I bought exceeded my expectations. Crystal clear picture and amazing sound quality!",
      author: "Alex Johnson",
      location: "New York, USA",
      rating: 5,
    },
    {
      quote: "Seamless shopping experience and incredibly fast delivery. Their customer service is top-notch.",
      author: "Sarah Miller",
      location: "London, UK",
      rating: 5,
    },
    {
      quote: "Found the best prices for premium electronics here. This is my go-to store now. Highly recommend!",
      author: "Michael Chen",
      location: "Sydney, AU",
      rating: 4,
    },
  ], []);

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Newsletter subscription:", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000); // Reset after 3 seconds
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="relative min-h-[calc(100vh-80px)] sm:min-h-[600px] lg:min-h-[700px] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-600"
      >
        <div className="absolute inset-0 opacity-20">
           {/* Optional: Subtle pattern or abstract background image */}
           {/* <Image src="/path/to/abstract-bg.svg" alt="" layout="fill" objectFit="cover" /> */}
        </div>
        <Image
          src="/shopping-for-tvs.png" // Replace with a high-quality, modern hero image
          alt="Modern electronics on display"
          fill
          className="object-cover opacity-30 dark:opacity-20"
          priority
          quality={85}
        />
        <div className="relative z-10 p-6 sm:p-8 max-w-3xl mx-auto">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 !leading-tight shadow-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <span className="block">Discover Next-Gen</span>
            <span className="block text-sky-300 dark:text-sky-400">Electronics Today</span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-indigo-100 dark:text-indigo-200 max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            Explore top-tier tech, innovative gadgets, and unbeatable deals. Elevate your lifestyle with ElectroMart.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          >
            <Link
              href="/product" // Consistent link
              className="inline-flex items-center justify-center gap-2.5 bg-white text-indigo-700 hover:bg-slate-100 dark:bg-sky-400 dark:text-slate-900 dark:hover:bg-sky-300 px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop All Products</span>
            </Link>
            <Link
              href="/deals"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-indigo-300 hover:bg-white/20 dark:border-sky-400 dark:hover:bg-sky-400/20 text-white px-8 py-3.5 rounded-lg font-semibold transition-colors duration-300 text-base"
            >
              <span>View Special Deals</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 space-y-20 sm:space-y-24 lg:space-y-32">

        {/* Featured Products Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 md:mb-12">
            <div>
              <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Featured Products
              </motion.h2>
              <motion.p variants={staggerItem} className="text-lg text-slate-600 dark:text-slate-400">
                Handpicked selection of our best and trending items.
              </motion.p>
            </div>
            <motion.div variants={staggerItem}>
              <Link
                href="/product"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors group text-base"
              >
                <span>View All</span>
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={staggerContainer}
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={staggerItem}
                // whileHover={{ y: -5 }} // This can be part of ProductCardModern
              >
                {/* Use the Modernized ProductCard you created earlier */}
                <ProductCard product={product as Product} /> 
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Categories Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center mb-10 md:mb-12">
            <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Shop by Category
            </motion.h2>
            <motion.p variants={staggerItem} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Find exactly what you're looking for in our curated collections.
            </motion.p>
          </div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={staggerContainer}
          >
            {categories.map((category) => (
              <motion.div
                key={category.name}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Link
                  href={`/product?category=${category.slug}`}
                  className="group relative flex flex-col items-center justify-center text-center bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 h-full
                             border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 
                             shadow-sm hover:shadow-lg transition-all duration-300 ease-out"
                >
                  <div className="mb-5 sm:mb-6 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 
                                  rounded-full group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white 
                                  transition-all duration-300 ease-out transform group-hover:scale-110">
                    {categoryIcons[category.slug] || categoryIcons.default}
                  </div>
                  <h3 className="font-semibold text-lg sm:text-xl text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                    {category.count} {category.count === 1 ? "product" : "products"}
                  </p>
                  <div className="absolute bottom-4 right-4 text-indigo-500 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Promotional Banner Section */}
        <motion.section
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 dark:from-purple-700 dark:via-pink-600 dark:to-orange-600 rounded-2xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full opacity-50 dark:opacity-30 transform rotate-45"></div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full opacity-50 dark:opacity-30 transform rotate-12"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 !leading-tight"
              initial={{ opacity:0, y:10 }} animate={{opacity:1, y:0}} transition={{delay:0.2}}
            >
              Seasonal Tech Spectacular!
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-purple-100 dark:text-purple-200 mb-8 leading-relaxed"
              initial={{ opacity:0, y:10 }} animate={{opacity:1, y:0}} transition={{delay:0.3}}
            >
              Grab <span className="font-bold text-yellow-300 dark:text-yellow-400">up to 40% OFF</span> on selected gadgets. Offers valid while stocks last!
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity:0, y:10 }} animate={{opacity:1, y:0}} transition={{delay:0.4}}
            >
              <Link
                href="/deals" // Link to a specific sale page
                className="bg-white text-purple-700 hover:bg-slate-100 dark:bg-yellow-400 dark:text-slate-900 dark:hover:bg-yellow-300 px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Shop Sale Now
              </Link>
              <Link
                href="/new-arrivals"
                className="border-2 border-purple-300 text-white hover:bg-white/20 dark:border-yellow-400 dark:hover:bg-yellow-400/20 px-8 py-3.5 rounded-lg font-semibold transition-colors duration-300 text-base"
              >
                Explore New Arrivals
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center mb-10 md:mb-12">
            <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              What Our Customers Say
            </motion.h2>
            <motion.p variants={staggerItem} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Real stories from satisfied shoppers who love ElectroMart.
            </motion.p>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-out flex flex-col h-full"
              >
                <div className="mb-4">
                  <RatingStars rating={testimonial.rating} />
                </div>
                <blockquote className="text-slate-700 dark:text-slate-300 italic text-base sm:text-lg leading-relaxed mb-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-slate-900 dark:text-slate-100 font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-gradient-to-br from-slate-100 to-indigo-50 dark:from-slate-800 dark:to-indigo-900/30 rounded-2xl p-8 sm:p-12 lg:p-16"
        >
          <div className="max-w-xl mx-auto text-center">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3"
              initial={{ opacity:0, y:10 }} animate={{opacity:1, y:0}} transition={{delay:0.2}}
            >
              Stay Ahead of the Curve
            </motion.h2>
            <motion.p 
              className="text-lg text-slate-600 dark:text-slate-400 mb-8"
              initial={{ opacity:0, y:10 }} animate={{opacity:1, y:0}} transition={{delay:0.3}}
            >
              Subscribe for exclusive access to new arrivals, special promotions, and tech insights.
            </motion.p>
            {!subscribed ? (
              <motion.form 
                onSubmit={handleNewsletterSubmit} 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                initial={{ opacity:0, y:10 }} animate={{opacity:1, y:0}} transition={{delay:0.4}}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-grow px-5 py-3.5 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm placeholder-slate-400 dark:placeholder-slate-500"
                  required
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 sm:px-8 py-3.5 rounded-lg font-semibold transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </motion.form>
            ) : (
              <motion.p 
                className="text-lg text-green-600 dark:text-green-400 font-semibold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                Thanks for subscribing! Check your inbox.
              </motion.p>
            )}
            <motion.p 
              className="text-xs text-slate-500 dark:text-slate-400 mt-4"
              initial={{ opacity:0, y:10 }} animate={{opacity:1, y:0}} transition={{delay:0.5}}
            >
              We value your privacy. No spam, ever.
            </motion.p>
          </div>
        </motion.section>

      </div>
    </div>
  );
}