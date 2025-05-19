import React from "react";

export default function CartPage() {
  // In a real app, cart items would come from context or state
  const cartItems = []; // Placeholder

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {/* Map cart items here */}
        </ul>
      )}
      <button style={{ marginTop: "2rem", padding: "0.5rem 1.5rem" }}>
        Checkout
      </button>
    </main>
  );
}