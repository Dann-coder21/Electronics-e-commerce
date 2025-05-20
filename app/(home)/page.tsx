import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const featuredProducts = products.slice(0, 8); // Show first 8 as featured
  const categories = [
    { name: "Televisions", icon: "📺", count: products.filter(p => p.category === "televisions").length },
    { name: "Audio", icon: "🔊", count: products.filter(p => p.category === "audio").length },
    { name: "Smart Home", icon: "🏠", count: products.filter(p => p.category === "smart-home").length },
    { name: "Gaming", icon: "🎮", count: products.filter(p => p.category === "gaming").length },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section with Background Image */}
      <section className="relative mb-16 rounded-xl overflow-hidden h-96">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="/shopping-for-tvs.png"
          alt="Electronics Collection"
          fill
          className="object-cover"
          priority
        />
       <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
  {/* Optional: Add a subtle glass effect */}
  <div className="backdrop-blur-sm bg-black/40 rounded-xl p-8 md:p-12">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
      <span role="img" aria-label="bolt" className="mr-2">⚡</span>
      Welcome to <span className="text-blue-400">ElectroMart</span>
    </h1>
    <p className="text-xl text-blue-100 max-w-2xl mb-8 drop-shadow">
      Discover cutting-edge electronics with <span className="text-orange-300 font-semibold">unbeatable prices</span>
    </p>
    <Link
      href="/product"
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg shadow-lg"
    >
      <span>Shop Now</span>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  </div>
</div>
      </section>

      {/* Featured Products */}
<section className="mb-12 rounded-lg bg-blue-100 shadow-inner px-1 py-4">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
    <h2 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight drop-shadow">
      Featured Products
    </h2>
    <Link
      href="/product"
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium shadow transition-all group"
    >
      View All
      <svg
        aria-hidden="true"
        className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
    {featuredProducts.map((product) => (
      <div
        key={product.id}
        className="bg-white/90 backdrop-blur-sm rounded-md shadow hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-blue-200 p-1"
      >
        <ProductCard product={product} />
      </div>
    ))}
  </div>
</section>



      {/* Categories Banner */}
      <section className="mb-16">
  <div className="text-center mb-12">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
      Shop by Category
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto">
      Discover our wide range of electronic categories
    </p>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
    {categories.map((category) => (
      <Link
        href={`/product?category=${category.name.toLowerCase().replace(' ', '-')}`}
        key={category.name}
        className="group relative bg-white rounded-xl p-6 overflow-hidden transition-all duration-300 
                   border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-lg
                   hover:-translate-y-1 transform"
      >
        {/* Gradient background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        
        {/* Category Icon */}
        <div className="text-4xl mb-4 w-16 h-16 flex items-center justify-center 
                        bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 
                        group-hover:text-white transition-colors duration-300 mx-auto">
          {category.icon}
        </div>

        {/* Category Info */}
       <div className="relative group p-6 bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
  <div className="text-center">
    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors">
      {category.name}
    </h3>
    <p className="text-sm text-gray-500 mt-2">
      <span className="font-medium text-indigo-600">{category.count}</span>{" "}
      {category.count === 1 ? "item" : "items"}
    </p>
  </div>

  {/* Hover arrow indicator */}
  <div
    className="absolute bottom-4 right-4 text-indigo-600 opacity-0 
               group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 
               transition-all duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </div>
</div>

      </Link>
    ))}
  </div>

  {/* View All Button */}
  <div className="text-center mt-10">
  <Link 
    href="/categories" 
    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
  >
    Browse All Categories
    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </Link>
</div>
</section>

      {/* Promotional Banner */}
      <section className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 md:p-12 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Summer Tech Sale!
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            Enjoy up to 30% off on select items. Limited time offer.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/sale"
              className="bg-white text-blue-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Deals
            </Link>
            <Link
              href="/about"
              className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-20 px-4">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
    What Our Customers Say
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[
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
    ].map((testimonial, index) => (
      <div
        key={index}
        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div className="mb-4">
          <svg
            className="w-8 h-8 text-indigo-500 mb-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7.17 6A5.992 5.992 0 001 12c0 2.21 1.2 4.15 3 5.2V22l5.3-3.1c.27.03.54.05.82.05 3.31 0 6-2.69 6-6S13.31 6 10 6H7.17zm13 0A5.992 5.992 0 0014 12c0 2.21 1.2 4.15 3 5.2V22l5.3-3.1c.27.03.54.05.82.05 3.31 0 6-2.69 6-6s-2.69-6-6-6h-2.83z" />
          </svg>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 transition-colors duration-200 ${
                  i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
        <p className="text-gray-900 font-semibold">– {testimonial.author}</p>
      </div>
    ))}
  </div>
</section>


      {/* Newsletter */}
      <section className="bg-gray-50 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
          Stay Updated
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest deals and product releases
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}