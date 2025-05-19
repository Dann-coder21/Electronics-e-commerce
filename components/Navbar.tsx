"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const cartCount = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        padding: "1rem 2rem",
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#111",
          textDecoration: "none",
          transition: "color 0.2s ease",
        }}
      >
        Electro<span style={{ color: "#2563eb" }}>Hub</span>
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link
          href="/"
          style={{
            color: "#374151",
            textDecoration: "none",
            fontWeight: 500,
            transition: "color 0.2s ease",
          }}
        >
          Home
        </Link>

        <Link
          href="/cart"
          style={{
            color: "#374151",
            textDecoration: "none",
            fontWeight: 500,
            transition: "color 0.2s ease",
            position: "relative",
          }}
        >
          Cart
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-12px",
                backgroundColor: "#2563eb",
                color: "white",
                fontSize: "0.75rem",
                fontWeight: "bold",
                borderRadius: "50%",
                height: "20px",
                width: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}