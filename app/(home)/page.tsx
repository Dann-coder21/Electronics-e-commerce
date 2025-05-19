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
          src="/electronics-hero.jpg"
          alt="Electronics Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to <span className="text-blue-400">ElectroHub</span>
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mb-8">
            Discover cutting-edge electronics with unbeatable prices
          </p>
          <Link
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            View All <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
  {featuredProducts.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
      </section>

      {/* Categories Banner */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              href={`/products?category=${category.name.toLowerCase().replace(' ', '-')}`}
              key={category.name}
              className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-blue-100"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-medium text-lg group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {category.count} {category.count === 1 ? 'product' : 'products'}
              </p>
            </Link>
          ))}
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
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800 text-center">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <p className="font-medium text-gray-900">- {testimonial.author}</p>
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