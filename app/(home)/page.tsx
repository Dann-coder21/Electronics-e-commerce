
"use client";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HomePage() {
  const featuredProducts = products.slice(0, 8);
  const [email, setEmail] = useState("");

  const categories = [
    { name: "Televisions", icon: "📺", count: products.filter(p => p.category === "televisions").length },
    { name: "Audio", icon: "🔊", count: products.filter(p => p.category === "audio").length },
    { name: "Smart Home", icon: "🏠", count: products.filter(p => p.category === "smart-home").length },
    { name: "Gaming", icon: "🎮", count: products.filter(p => p.category === "gaming").length },
  ];

  const testimonials = [
    {
      quote: "The TV I bought exceeded my expectations. Amazing quality!",
      author: "Alex Johnson",
      rating: 5,
    },
    {
      quote: "Fast delivery and excellent customer service. Will shop again!",
      author: "Sarah Miller",
      rating: 5,
    },
    {
      quote: "Great prices for premium electronics. Highly recommend!",
      author: "Michael Chen",
      rating: 4,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-16 rounded-2xl overflow-hidden h-[500px]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
        <Image
          src="/shopping-for-tvs.png"
          alt="Electronics Collection"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-sm bg-black/40 rounded-2xl p-8 md:p-12 max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              <span className="text-blue-400">Electro</span>
              <span className="text-white">Mart</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Discover cutting-edge electronics with <span className="text-orange-300 font-semibold">unbeatable prices</span> and exclusive deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/product"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg shadow-lg hover:shadow-xl"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/deals"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
              >
                <span>View Deals</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-gray-600">Curated selection of our best products</p>
          </div>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group"
          >
            View all products
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Categories Banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our wide range of electronic categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Link
                href={`/product?category=${category.name.toLowerCase().replace(' ', '-')}`}
                className="group relative flex flex-col items-center bg-white rounded-xl p-8 overflow-hidden transition-all duration-300 
                           border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-lg h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                
                <div className="text-5xl mb-6 w-20 h-20 flex items-center justify-center 
                                bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 
                                group-hover:text-white transition-colors duration-300">
                  {category.icon}
                </div>

                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors text-center">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  <span className="font-medium text-blue-600">{category.count}</span>{" "}
                  {category.count === 1 ? "item" : "items"}
                </p>

                <div className="mt-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Promotional Banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white overflow-hidden"
      >
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Summer Tech Sale!
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Enjoy up to <span className="font-bold text-yellow-300">30% off</span> on select items. Limited time offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sale"
                className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                View Deals
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 z-0" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white/10 z-0" />
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
          Trusted by Thousands
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Don't just take our word for it - hear what our customers say
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className="mb-6">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic text-lg">"{testimonial.quote}"</p>
              </div>
              <p className="text-gray-900 font-semibold mt-auto">— {testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for the latest deals, product releases and exclusive offers
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </motion.section>
    </main>
  );
}