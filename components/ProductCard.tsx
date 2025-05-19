import React from "react";
import Link from "next/link";
import { Product } from "../lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      padding: "1rem",
      width: 220,
      textAlign: "center"
    }}>
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} width={180} style={{ cursor: "pointer" }} />
      </Link>
      <h3>{product.name}</h3>
      <p style={{ fontWeight: "bold" }}>${product.price}</p>
      <Link href={`/product/${product.id}`}>View Details</Link>
    </div>
  );
}