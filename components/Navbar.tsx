"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { useCartStore } from "@/lib/store";
import { useRouter, usePathname } from "next/navigation";
import { products, Product } from "@/lib/products"; 
import { categories as appCategories } from "@/lib/categories"; 
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import {
  Search, ShoppingCart, User, Heart, Menu, X, Moon, Sun, ChevronDown, LogOut, Settings, PackageSearch, UserPlus, Info
} from "lucide-react";

// Helper: Dark Mode (assuming it's globally managed, or adjust as needed)
const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' ||
                   (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return [darkMode, setDarkMode] as const;
};

// Helper: Click Outside
function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}


export default function ModernNavbar() {
  const cartCount = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode(); // Using the dark mode hook
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useClickOutside(searchDropdownRef, () => {
    if (document.activeElement !== searchInputRef.current) {
      setShowSearchDropdown(false);
    }
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 1) {
      const results = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.category?.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setFilteredProducts(results);
      setShowSearchDropdown(true);
    } else {
      setFilteredProducts([]);
      setShowSearchDropdown(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setFilteredProducts([]);
      setShowSearchDropdown(false);
      setMobileMenuOpen(false);
    }
  };

  const handleSearchItemClick = (productId: string) => {
    router.push(`/product/${productId}`);
    setSearchQuery('');
    setFilteredProducts([]);
    setShowSearchDropdown(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSearchDropdown(false);
  }, [pathname]);

  return (
    <>
      {/* Promo Banner */}
      <AnimatePresence>
        {showPromoBanner && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-900 dark:text-white" // Kept original promo colors
          >
            <div className="container mx-auto px-4 h-10 flex items-center justify-between text-sm font-medium">
              <span>🎉 Summer Sale! Up to 50% Off on Selected Electronics!</span>
              <button 
                onClick={() => setShowPromoBanner(false)} 
                aria-label="Dismiss promotional banner"
                className="p-1 rounded-full hover:bg-black/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      {/* REVERTED: Using indigo-900 for navbar background */}
      <header className="bg-indigo-900 dark:bg-indigo-950 text-white sticky top-0 z-[49] shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
              <Image src="/logo.png" alt="ElectroMart Logo" width={32} height={32} className="mr-2 h-8 w-auto" />
              <span className="text-xl font-bold tracking-tight">
                Electro<span className="text-amber-400">Mart</span> {/* REVERTED: Amber accent */}
              </span>
            </Link>

            {/* Desktop Navigation & Search */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {/* Desktop Search Bar */}
              <div className="relative" ref={searchDropdownRef}>
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    {/* REVERTED: Adjusted icon color and input background/placeholder */}
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-300 dark:text-indigo-400 pointer-events-none" />
                    <input
                      ref={searchInputRef}
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => searchQuery && setShowSearchDropdown(true)}
                      className="pl-10 pr-4 py-2 w-64 lg:w-80 rounded-md text-sm 
                                 bg-indigo-800 dark:bg-indigo-900 text-white 
                                 placeholder-indigo-300 dark:placeholder-indigo-400
                                 focus:ring-2 focus:ring-amber-400 focus:outline-none border-transparent focus:border-transparent"
                    />
                  </div>
                </form>
                <AnimatePresence>
                  {showSearchDropdown && filteredProducts.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      // REVERTED: Using original white/slate-800 for dropdown, amber accent on hover
                      className="absolute z-50 mt-2 w-full bg-white dark:bg-slate-800 rounded-md shadow-xl border border-slate-200 dark:border-slate-700 max-h-80 overflow-y-auto"
                    >
                      {filteredProducts.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleSearchItemClick(product.id)}
                          className="w-full flex items-center p-3 hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors text-left"
                        >
                          <div className="flex-shrink-0 h-10 w-10 bg-slate-100 dark:bg-slate-700 rounded-md overflow-hidden">
                            <Image
                              src={product.image} alt={product.name} width={40} height={40}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div className="ml-3 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{product.name}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">KSh {product.price.toLocaleString()}</p>
                          </div>
                        </button>
                      ))}
                       {searchQuery.length > 1 && (
                        <button
                            onClick={handleSearchSubmit}
                            className="w-full p-3 text-sm font-medium text-center text-indigo-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            View all results for "{searchQuery}"
                        </button>
                        )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Navigation Links */}
              <DesktopNavLinks cartCount={cartCount} pathname={pathname} />
            </div>
            
            {/* Right side icons (Desktop) & Mobile Menu Trigger */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                 // REVERTED: Colors for dark mode toggle
                className="p-2 rounded-full text-indigo-200 hover:bg-indigo-800 dark:hover:bg-indigo-900 hover:text-white transition-colors hidden md:block"
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-indigo-300" />}
              </button>

              <Link href="/cart" 
                // REVERTED: Icon and badge colors
                className="relative p-2 rounded-full text-indigo-200 hover:bg-indigo-800 dark:hover:bg-indigo-900 hover:text-white transition-colors">
                 <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white
                                   text-[10px] font-bold rounded-full h-4 w-4 min-w-[1rem]
                                   flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">View Cart</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                // REVERTED: Mobile menu trigger colors
                className="md:hidden p-2 rounded-md text-indigo-200 hover:bg-indigo-800 dark:hover:bg-indigo-900 hover:text-white transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div // Overlay
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div // Menu Panel
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              // REVERTED: Mobile menu background to white/slate-900
              className="fixed top-0 left-0 z-50 h-full w-[calc(100%-4rem)] max-w-sm bg-white dark:bg-slate-900 shadow-2xl md:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                    <Image src="/logo.png" alt="ElectroMart Logo" width={28} height={28} className="mr-2 h-7 w-auto" />
                    {/* REVERTED: Mobile logo text colors */}
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                    Electro<span className="text-amber-500">Mart</span>
                    </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Search */}
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => searchQuery && setShowSearchDropdown(true)}
                    // REVERTED: Mobile search input colors
                    className="pl-10 pr-4 py-2.5 w-full rounded-md text-sm text-slate-900 dark:text-slate-100 
                               border border-slate-300 dark:border-slate-600 
                               bg-white dark:bg-slate-800
                               focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </form>

                <MobileNavLinks 
                    cartCount={cartCount} 
                    closeMenu={() => setMobileMenuOpen(false)} 
                    pathname={pathname}
                />
              </div>

              {/* Footer / Actions */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                 <button
                      onClick={() => { setDarkMode(!darkMode); }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium 
                                 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        {darkMode ? <Sun size={18} className="text-amber-500"/> : <Moon size={18} className="text-slate-500"/>}
                        Switch to {darkMode ? 'Light' : 'Dark'} Mode
                      </span>
                      {/* REVERTED: Theme toggle switch color */}
                      <div className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${darkMode ? 'bg-amber-500' : 'bg-slate-300'}`}>
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${darkMode ? 'translate-x-[1.125rem]' : ''}`}></div>
                      </div>
                 </button>
                 <p className="text-xs text-center text-slate-500 dark:text-slate-400 pt-2">
                    © {new Date().getFullYear()} ElectroMart. All rights reserved.
                 </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Desktop Navigation Links ---
function DesktopNavLinks({ cartCount, pathname }: { cartCount: number; pathname: string }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  const navItemClass = (href?: string, exact = false) => {
    const isActive = href && (exact ? pathname === href : pathname.startsWith(href));
    // REVERTED: Desktop nav link colors to match indigo-900 background
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
            ${isActive 
              ? 'bg-indigo-800 dark:bg-indigo-950 text-amber-400' // Active state with amber accent
              : 'text-indigo-100 hover:bg-indigo-800 dark:hover:bg-indigo-950 hover:text-amber-300'
            }`;
  };
  
  const handleDropdownNavigation = (path: string) => {
    router.push(path);
    setOpenDropdown(null);
  }

  const accountLinks = [
    { label: "Sign In", href: "/account", icon: User },
    { label: "Create Account", href: "/signup", icon: UserPlus },
    { label: "My Orders", href: "/account/orders", icon: PackageSearch, auth: true },
    { label: "Settings", href: "/account/settings", icon: Settings, auth: true },
    { label: "Logout", action: () => console.log("Logout"), icon: LogOut, auth: true },
  ];
  const isAuthenticated = false; 
  const visibleAccountLinks = accountLinks.filter(link => !link.auth || isAuthenticated);

  return (
    <nav className="flex items-center space-x-1 lg:space-x-2">
      <Link href="/" className={navItemClass("/", true)}>Home</Link>
      
      <div className="relative" 
           onMouseEnter={() => setOpenDropdown("categories")} 
           onMouseLeave={() => setOpenDropdown(null)}
      >
        <button className={`${navItemClass()} flex items-center gap-1`}>
          Categories <ChevronDown size={16} className={`transition-transform ${openDropdown === 'categories' ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {openDropdown === "categories" && (
            <motion.div
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
              // REVERTED: Dropdown background and hover colors for categories
              className="absolute left-0 mt-1 w-64 bg-white dark:bg-slate-800 rounded-md shadow-xl z-50 border border-slate-200 dark:border-slate-700 py-1"
            >
              {appCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.slug}
                    onClick={() => handleDropdownNavigation(`/category/${category.slug}`)}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700 
                               hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-3 transition-colors"
                  >
                    <Icon size={18} className="text-slate-500 dark:text-slate-400" />
                    <span>{category.name} <span className="text-xs text-slate-400 dark:text-slate-500">({category.count})</span></span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link href="/wishlist" className={`${navItemClass("/wishlist")} flex items-center gap-1.5`}>
        <Heart size={18} /> Wishlist
      </Link>

      <div className="relative" 
           onMouseEnter={() => setOpenDropdown("account")} 
           onMouseLeave={() => setOpenDropdown(null)}
      >
        <button className={`${navItemClass()} flex items-center gap-1`}>
          <User size={18} /> Account <ChevronDown size={16} className={`transition-transform ${openDropdown === 'account' ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {openDropdown === "account" && (
            <motion.div
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
              // REVERTED: Dropdown background and hover colors for account
              className="absolute right-0 mt-1 w-56 bg-white dark:bg-slate-800 rounded-md shadow-xl z-50 border border-slate-200 dark:border-slate-700 py-1"
            >
              {visibleAccountLinks.map((link) => {
                const Icon = link.icon;
                return (
                    <button
                      key={link.label}
                      onClick={() => link.href ? handleDropdownNavigation(link.href) : link.action?.()}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700 
                                 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-3 transition-colors"
                    >
                      <Icon size={18} className="text-slate-500 dark:text-slate-400" />
                      <span>{link.label}</span>
                    </button>
                );
              })}
               {!isAuthenticated && accountLinks.find(l => l.auth) && (
                    <div className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 mt-1 pt-2">
                        Sign in to access more options.
                    </div>
                )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// --- Mobile Navigation Links ---
function MobileNavLinks({ cartCount, closeMenu, pathname }: { cartCount: number; closeMenu: () => void; pathname: string }) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const router = useRouter();

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };
  
  const handleNavigation = (path: string) => {
    router.push(path);
    closeMenu();
  }

  const mobileLinkClass = (href?: string, exact = false) => {
    const isActive = href && (exact ? pathname === href : pathname.startsWith(href));
    // REVERTED: Mobile link colors
    return `flex items-center w-full gap-3 px-3 py-3 rounded-md text-base font-medium transition-colors
            ${isActive 
              ? 'bg-amber-100 dark:bg-slate-700 text-amber-700 dark:text-amber-400' 
              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-700 dark:hover:text-amber-400'
            }`;
  };

  const accountLinks = [
    { label: "Sign In", href: "/signin", icon: User },
    { label: "Create Account", href: "/signup", icon: UserPlus },
    { label: "My Orders", href: "/account/orders", icon: PackageSearch, auth: true },
    { label: "Wishlist", href: "/wishlist", icon: Heart, auth: true },
    { label: "Settings", href: "/account/settings", icon: Settings, auth: true },
    { label: "About Us", href: "/about", icon: Info },
    { label: "Logout", action: () => console.log("Logout"), icon: LogOut, auth: true },
  ];
  const isAuthenticated = false; 
  const visibleAccountLinks = accountLinks.filter(link => !link.auth || isAuthenticated);

  return (
    <nav className="space-y-1">
      <Link href="/" className={mobileLinkClass("/", true)} onClick={closeMenu}><Home size={20}/> Home</Link>
      
      <div>
        <button 
          onClick={() => toggleAccordion("categories")}
          className={`${mobileLinkClass()} justify-between`}
        >
          <span className="flex items-center gap-3"><Menu size={20}/> Categories</span>
          <ChevronDown size={20} className={`transition-transform ${openAccordion === 'categories' ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {openAccordion === "categories" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-6 mt-1 space-y-1 overflow-hidden"
            >
              {appCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.slug}
                    onClick={() => handleNavigation(`/category/${category.slug}`)}
                    className={`${mobileLinkClass(`/category/${category.slug}`)} text-sm`}
                  >
                    <Icon size={18} className="opacity-80" />
                    <span>{category.name} <span className="text-xs opacity-70">({category.count})</span></span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <button 
          onClick={() => toggleAccordion("account")}
          className={`${mobileLinkClass()} justify-between`}
        >
          <span className="flex items-center gap-3"><User size={20}/> Account</span>
          <ChevronDown size={20} className={`transition-transform ${openAccordion === 'account' ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {openAccordion === "account" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-6 mt-1 space-y-1 overflow-hidden"
            >
              {visibleAccountLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.label}
                    onClick={() => link.href ? handleNavigation(link.href) : link.action?.()}
                    className={`${mobileLinkClass(link.href)} text-sm`}
                  >
                    <Icon size={18} className="opacity-80" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link href="/deals" className={mobileLinkClass("/deals")} onClick={closeMenu}><Info size={20}/> Special Deals</Link>
    </nav>
  );
}

const Home = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);