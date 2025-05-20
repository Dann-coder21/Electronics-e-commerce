"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { products } from "@/lib/products";
import { Product } from "@/lib/products";
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { categories } from "@/lib/categories";
import { Search, ShoppingCart, User, Heart, Menu, X, Moon, Sun, ChevronDown } from "lucide-react";

export default function Navbar() {
  const cartCount = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 0) {
      const results = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(results);
      setShowDropdown(true);
    } else {
      setFiltered([]);
      setShowDropdown(false);
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() && filtered.length > 0) {
      router.push(`/product/${filtered[0].id}`);
      setSearch('');
      setFiltered([]);
      setShowDropdown(false);
      setMobileMenuOpen(false);
    } else if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  const handleSearchItemClick = (productId: string) => {
    router.push(`/product/${productId}`);
    setSearch('');
    setFiltered([]);
    setShowDropdown(false);
    setMobileMenuOpen(false);
  };
useEffect(() => {
  setMounted(true);
}, []);


  // Prevent background scroll when mobile menu is open
  useEffect(() => {
  if (mobileMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => {
    document.body.style.overflow = "";
  };
}, [mobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        mobileMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  

  // Close mobile menu on route change
  
  useEffect(() => {
  setMobileMenuOpen(false);
}, [pathname]);
    
  

  return (
    <>
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 text-center text-sm font-medium">
        🎉 Summer Sale! Up to 50% Off on Selected Electronics!
      </div>

      {/* Main Navbar */}
      <nav className="bg-indigo-900 text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">
                Electro<span className="text-amber-400">Mart</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Search Bar */}
              <div className="relative w-64">
             <form onSubmit={handleSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={handleSearch}
                  onFocus={() => search && setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                  className="pl-10 pr-4 py-2 w-full rounded-md text-sm text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder-white bg-transparent"
                />
              </div>
            </form>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showDropdown && filtered.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto"
                    >
                      {filtered.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          className="flex items-center p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setShowDropdown(false);
                            setSearch('');
                          }}
                        >
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600">KSh {product.price.toLocaleString()}</p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Links */}
              <NavLinks 
                cartCount={cartCount} 
                closeMenu={() => {}} 
                className="flex items-center space-x-6" 
              />

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-indigo-800 transition-colors"
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-amber-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-300" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-indigo-800 transition-colors mobile-menu-button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 z-50 h-full w-80 max-w-full bg-white shadow-xl mobile-menu"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <Link
                    href="/"
                    className="text-xl font-bold text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Electro<span className="text-amber-500">Mart</span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {/* Search */}
                  <div className="mb-6">
                    <form onSubmit={handleSubmit} className="relative">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={search}
                          onChange={handleSearch}
                          onFocus={() => search && setShowDropdown(true)}
                          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                          className="pl-10 pr-4 py-2 w-full rounded-md text-sm text-gray-900 border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                        />
                      </div>
                    </form>

                    {/* Search Results */}
                    <AnimatePresence>
                      {showDropdown && filtered.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 bg-white rounded-md shadow-md border border-gray-200 overflow-hidden"
                        >
                          {filtered.map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.id}`}
                              className="flex items-center p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                              onClick={() => {
                                setShowDropdown(false);
                                setMobileMenuOpen(false);
                                setSearch('');
                              }}
                            >
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                <p className="text-sm text-gray-600">KSh {product.price.toLocaleString()}</p>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Links */}
                  <NavLinks 
                    cartCount={cartCount} 
                    closeMenu={() => setMobileMenuOpen(false)} 
                    className="space-y-2" 
                    isMobile
                  />

                  {/* Dark Mode Toggle */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-900">Theme</span>
                      <div className="flex items-center">
                        {darkMode ? (
                          <>
                            <span className="text-sm text-gray-500 mr-2">Light</span>
                            <Sun className="h-5 w-5 text-amber-500" />
                          </>
                        ) : (
                          <>
                            <span className="text-sm text-gray-500 mr-2">Dark</span>
                            <Moon className="h-5 w-5 text-gray-500" />
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200">
  <p>© {mounted ? new Date().getFullYear() : ''} ElectroMart. All rights reserved.</p>
</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLinks({
  cartCount,
  closeMenu,
  className = "",
  isMobile = false
}: {
  cartCount: number;
  closeMenu: () => void;
  className?: string;
  isMobile?: boolean;
}) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const router = useRouter();

  const navigateToCategory = (slug: string) => {
    router.push(`/category/${slug}`);
    closeMenu();
    setOpenCategory(null);
  };

  return (
    <div className={`${className}`}>
      {!isMobile && (
        <Link href="/" className="text-white hover:text-amber-300 transition-colors text-sm font-medium">
          Home
        </Link>
      )}

      {/* Categories Dropdown */}
      <div 
        className="relative"
        onMouseEnter={!isMobile ? () => setOpenCategory("categories") : undefined}
        onMouseLeave={!isMobile ? () => setOpenCategory(null) : undefined}
      >
        <button 
          onClick={() => setOpenCategory(openCategory === "categories" ? null : "categories")}
          className={`flex items-center gap-1 ${isMobile ? 
            'w-full px-3 py-2 rounded-md hover:bg-gray-100 text-gray-900 text-sm font-medium' : 
            'text-white hover:text-amber-300 text-sm font-medium'}`}
        >
          <span>Categories</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${openCategory === "categories" ? 'rotate-180' : ''}`} />
        </button>

        {/* Desktop Dropdown */}
        {!isMobile && (
          <AnimatePresence>
            {openCategory === "categories" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50"
              >
                <div className="p-1 space-y-1">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.slug}
                        onClick={() => navigateToCategory(category.slug)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded flex items-center gap-3"
                      >
                        <IconComponent className="h-5 w-5 text-gray-500" />
                        <div className="flex-1">
                          <span>{category.name}</span>
                          <span className="text-xs text-gray-500 ml-2">({category.count})</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Mobile Dropdown */}
        {isMobile && (
          <AnimatePresence>
            {openCategory === "categories" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pl-4 overflow-hidden"
              >
                <div className="space-y-1 py-1">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.slug}
                        onClick={() => navigateToCategory(category.slug)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-3"
                      >
                        <IconComponent className="h-5 w-5 text-gray-500" />
                        <div className="flex-1">
                          <span>{category.name}</span>
                          <span className="text-xs text-gray-500 ml-2">({category.count})</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {isMobile && (
        <Link 
          href="/" 
          onClick={closeMenu}
          className="block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-900 text-sm font-medium"
        >
          Home
        </Link>
      )}

      <Link 
        href="/wishlist" 
        onClick={closeMenu}
        className={isMobile ? 
          'block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-900 text-sm font-medium flex items-center gap-2' : 
          'text-white hover:text-amber-300 transition-colors text-sm font-medium flex items-center gap-1'}
      >
        <Heart className="h-5 w-5" />
        <span>Wishlist</span>
      </Link>

      <Link 
        href="/account" 
        onClick={closeMenu}
        className={isMobile ? 
          'block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-900 text-sm font-medium flex items-center gap-2' : 
          'text-white hover:text-amber-300 transition-colors text-sm font-medium flex items-center gap-1'}
      >
        <User className="h-5 w-5" />
        <span>Account</span>
      </Link>

      <Link 
        href="/cart" 
        onClick={closeMenu}
        className={`relative ${isMobile ? 
          'block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-900 text-sm font-medium flex items-center gap-2' : 
          'text-white hover:text-amber-300 transition-colors text-sm font-medium flex items-center gap-1'}`}
      >
        <ShoppingCart className="h-5 w-5" />
        <span>Cart</span>
        {cartCount > 0 && (
          <span className="
            absolute -top-2 -right-2 bg-amber-500 text-white
            text-xs font-bold rounded-full h-5 w-5
            flex items-center justify-center
          ">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
}