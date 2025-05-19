"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const cartCount = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      {/* Promo Banner */}
      <div style={{ backgroundColor: "#f59e42", color: "#1e1b4b", padding: "0.5rem", textAlign: "center", fontWeight: "bold" }}>
        🎉 Summer Sale! Up to 50% Off on Selected Electronics!
      </div>

      <nav
        style={{
          backgroundColor: darkMode ? "#111827" : "#1e1b4b",
          color: "#fff",
          padding: "1rem 2rem",
          position: "sticky",
          top: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff", textDecoration: "none" }}>
          Electro<span style={{ color: "#f59e42" }}>Hub</span>
        </Link>

        {/* Hamburger for Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ fontSize: "1.5rem", background: "none", border: "none", color: "#fff", display: "none", cursor: "pointer" }}
          className="hamburger-button"
        >
          ☰
        </button>

        <div style={{ display: mobileMenuOpen ? "flex" : "none", flexDirection: "column", gap: "1rem", width: "100%", marginTop: "1rem" }} className="mobile-menu">
          <SearchBar />
          <NavLinks cartCount={cartCount} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }} className="desktop-menu">
          <SearchBar />
          <NavLinks cartCount={cartCount} />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{ background: "#f59e42", color: "#1e1b4b", padding: "0.4rem 0.8rem", borderRadius: "4px", fontWeight: "bold", marginLeft: "1rem" }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
    </>
  );
}

function SearchBar() {
  return (
    <input
      type="text"
      placeholder="Search products..."
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        border: "none",
        minWidth: "200px",
      }}
    />
  );
}

function NavLinks({ cartCount }: { cartCount: number }) {
  return (
    <>
      <Link href="/" style={linkStyle}>Home</Link>

      {/* Category Dropdown */}
      <select style={linkStyle}>
        <option>All Categories</option>
        <option>Phones</option>
        <option>Laptops</option>
        <option>Accessories</option>
      </select>

      {/* Wishlist */}
      <Link href="/wishlist" style={linkStyle}>❤️ Wishlist</Link>

      {/* User Profile */}
      <Link href="/account" style={linkStyle}>👤 Account</Link>

      {/* Cart */}
      <Link href="/cart" style={{ ...linkStyle, position: "relative" }}>
        🛒 Cart
        {cartCount > 0 && (
          <span style={{
            position: "absolute",
            top: "-8px",
            right: "-12px",
            backgroundColor: "#f59e42",
            color: "white",
            fontSize: "0.75rem",
            fontWeight: "bold",
            borderRadius: "50%",
            height: "20px",
            width: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {cartCount}
          </span>
        )}
      </Link>
    </>
  );
}

const linkStyle: React.CSSProperties = {
  color: "#e0e7ef",
  textDecoration: "none",
  fontWeight: 500,
  transition: "color 0.2s ease",
  display: "inline-block"
};
