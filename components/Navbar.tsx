"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { products } from "@/lib/products";
import { Product } from "@/lib/products";
import { motion, AnimatePresence } from 'framer-motion'; 
import Image from "next/image";
import { categories } from "@/lib/categories"; // <-- Add this import at the top// Make sure to import your Product type

export default function Navbar() {
  const cartCount = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Product[]>([]); // Added type here
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

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
    // Navigate to the first matching product
    router.push(`/product/${filtered[0].id}`);
    setSearch('');
    setFiltered([]);
    setShowDropdown(false);
    setMobileMenuOpen(false);
  } else if (search.trim()) {
    // Fallback to search page if no matches
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
        !target.closest(".hamburger-button")
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Promo Banner */}
        <div className="bg-[#f59e42] text-[#1e1b4b] py-2 text-center font-bold">
        🎉 Summer Sale! Up to 50% Off on Selected Electronics!
      </div>
      <nav
        className={`
          ${darkMode ? "bg-gray-900" : "bg-[#1e1b4b]"}
          text-white py-4 px-4 md:px-8 sticky top-0 z-30
          flex flex-col md:flex-row md:items-center gap-4 md:gap-0
        `}
      >
        <div className="w-full md:w-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-white no-underline"
          >
            Electro<span className="text-[#f59e42]">Mart</span>
          </Link>

          {/* Hamburger for Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hamburger-button md:hidden text-2xl bg-transparent border-none text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Desktop SearchBar in Center */}
      <div className="hidden md:flex md:flex-1 justify-center relative">
          <form onSubmit={handleSubmit} className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearch}
              onFocus={() => search && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
              className="
                px-4 py-2 rounded-md 
                text-sm text-gray-900 placeholder-gray-500
                bg-white focus:outline-none focus:ring-2 focus:ring-[#f59e42]
                w-full transition
              "
            />
          {showDropdown && filtered.length > 0 && (
  <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-50 max-h-60 overflow-y-auto">
    {filtered.map((p) => (
      <button
        key={p.id}
        type="button"
        className="block w-full text-left px-4 py-2 hover:bg-indigo-50 text-gray-900"
        onMouseDown={() => handleSearchItemClick(p.id)}
      >
        {p.name}
      </button>
    ))}
  </div>
)}
  </form>
</div>

        {/* Desktop Menu */}
        
        <div className="hidden md:flex flex-row items-center gap-6">
  <NavLinks cartCount={cartCount} closeMenu={() => {}} />
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="flex items-center gap-2 px-3 py-1 rounded font-bold transition bg-transparent text-[#f59e42]"
    aria-label="Toggle dark mode"
  >
    {darkMode ? (
      // Sun icon (for switching to light mode)
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 15a5 5 0 100-10 5 5 0 000 10zm0 2a7 7 0 110-14 7 7 0 010 14zm0-16a1 1 0 011 1v1a1 1 0 11-2 0V2a1 1 0 011-1zm0 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm8-7a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-16 0a1 1 0 01-1 1H1a1 1 0 110-2h1a1 1 0 011 1zm12.071-5.071a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zm-10.142 0a1 1 0 010 1.414l-.707.707A1 1 0 113.808 5.636l.707-.707a1 1 0 011.414 0zm10.142 10.142a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zm-10.142 0a1 1 0 010 1.414l-.707.707A1 1 0 113.808 15.778l.707-.707a1 1 0 011.414 0z"/>
      </svg>
    ) : (
      // Moon icon (for switching to dark mode)
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
      </svg>
    )}
  </button>
</div>
      </nav>

      {/* Mobile Menu Overlay */}
     {/* Backdrop with smooth fade animation */}
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
      onClick={() => setMobileMenuOpen(false)}
    />
  )}
</AnimatePresence>

{/* Modern mobile menu drawer */}
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
  initial={{ x: '-100%' }}
  animate={{ x: 0 }}
  exit={{ x: '-100%' }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  className="mobile-menu fixed top-0 left-0 z-50 h-full w-80 max-w-full bg-white text-[#1e1b4b] shadow-xl"
  aria-modal="true"
  role="dialog"
>
      <div className="flex flex-col h-full">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-[#f59e42] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Electro<span className="text-[#f59e42]">Mart</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Search with modern styling */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearch}
                onFocus={() => search && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#f59e42] focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Search dropdown with modern card styling */}
            {showDropdown && filtered.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
              >
                {filtered.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setShowDropdown(false);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{p.name}</p>
                      <p className="text-sm text-gray-500">KSh {p.price.toLocaleString('en-KE')}</p>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </form>

          {/* Navigation links with modern spacing */}
          <NavLinks 
            cartCount={cartCount} 
            closeMenu={() => setMobileMenuOpen(false)} 
            className="space-y-2" 
          />

          {/* Dark mode toggle with better styling */}
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium">Theme</span>
            <div className="flex items-center">
              {darkMode ? (
                <>
                  <span className="mr-2">Light</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </>
              ) : (
                <>
                  <span className="mr-2">Dark</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Footer area if needed */}
        <div className="p-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} ElectroMart</p>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}

function SearchBar() {
  return (
    <input
      type="text"
      placeholder="Search products..."
      className="
        px-4 py-2 rounded-md 
        text-sm text-gray-900 placeholder-gray-500
        bg-white focus:outline-none focus:ring-2 focus:ring-[#f59e42]
        w-full md:w-80 transition
      "
    />
  );
}
function NavLinks({
  cartCount,
  closeMenu,
  className = ""
}: {
  cartCount: number;
  closeMenu: () => void;
  className?: string;
}) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const router = useRouter();

  const navigateToCategory = (slug: string) => {
    router.push(`/category/${slug}`);
    closeMenu();
    setOpenCategory(null);
  };

  return (
    <div className={`flex flex-col md:flex-row items-center gap-4 w-full md:w-auto ${className}`}>
      <Link href="/" className="nav-link" onClick={closeMenu}>
        Home
      </Link>
      
      {/* Enhanced Categories Dropdown */}
      <div 
        className="relative group"
        onMouseEnter={() => setOpenCategory("categories")}
        onMouseLeave={() => setOpenCategory(null)}
      >
        <button 
          className="nav-link bg-transparent border-none text-[#1e1b4b] md:text-white cursor-pointer flex items-center gap-1"
          onClick={() => setOpenCategory(openCategory === "categories" ? null : "categories")}
        >
          <span>All Categories</span>
          <svg 
            className={`w-4 h-4 transition-transform ${openCategory === "categories" ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Desktop Dropdown */}
         <AnimatePresence>
          {openCategory === "categories" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 md:block hidden"
            >
              <div className="p-2 space-y-1">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.slug}
                      onClick={() => navigateToCategory(category.slug)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded flex items-center gap-3"
                    >
                      <IconComponent className="w-5 h-5 text-gray-500" />
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

        {/* Mobile Dropdown */}
       <div className="md:hidden">
          {openCategory === "categories" && (
            <div className="pl-4 mt-2 space-y-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.slug}
                    onClick={() => navigateToCategory(category.slug)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded flex items-center gap-3"
                  >
                    <IconComponent className="w-5 h-5 text-gray-500" />
                    <div className="flex-1">
                      <span>{category.name}</span>
                      <span className="text-xs text-gray-500 ml-2">({category.count})</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Link href="/wishlist" className="nav-link" onClick={closeMenu}>
        ❤️ Wishlist
      </Link>
      <Link href="/account" className="nav-link" onClick={closeMenu}>
        👤 Account
      </Link>
      <Link href="/cart" className="nav-link relative" onClick={closeMenu}>
        🛒 Cart
        {cartCount > 0 && (
          <span className="
            absolute -top-2 -right-3 bg-[#f59e42] text-white
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