"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store"; // Assuming your Zustand store
import { ShoppingCart, Trash2, Minus, Plus, Loader2 } from "lucide-react"; // Updated icons

// Define ProductInCart type if not already defined elsewhere
interface ProductInCart {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  // Add any other relevant product properties
}

export default function ModernCartPage() {
  const cart = useCartStore((state) => state.cart as ProductInCart[]); // Cast to ProductInCart[]
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart); // Assuming you have a clearCart action

  const [isProcessing, setIsProcessing] = useState(false);

  const { subtotal, totalItems, estimatedTax, grandTotal } = useMemo(() => {
    const currentSubtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const currentTotalItems = cart.reduce(
      (count, item) => count + item.quantity,
      0
    );
    // Example: 10% tax, adjust as needed
    const taxRate = 0.10; 
    const currentEstimatedTax = currentSubtotal * taxRate;
    const currentGrandTotal = currentSubtotal + currentEstimatedTax; // Assuming shipping is free for now

    return {
      subtotal: currentSubtotal,
      totalItems: currentTotalItems,
      estimatedTax: currentEstimatedTax,
      grandTotal: currentGrandTotal,
    };
  }, [cart]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    // Replace with actual checkout logic:
    // e.g., call an API endpoint, redirect to payment gateway
    console.log("Proceeding to checkout with:", cart);
    setIsProcessing(false);
    // clearCart(); // Optionally clear cart after successful checkout
    alert("Checkout successful (simulated)!");
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    } else if (newQuantity === 0) {
      // Optional: Remove item if quantity becomes 0, or just disable decrementing below 1
      removeFromCart(productId);
    }
  };

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <ShoppingCart className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Your Cart
            </h1>
          </div>
          {cart.length > 0 && (
             <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full self-start sm:self-center dark:bg-indigo-900 dark:text-indigo-300">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <ShoppingCart className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500" />
            <p className="mt-6 text-xl font-semibold text-slate-700 dark:text-slate-300">
              Your cart is empty
            </p>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/product" // Assuming your products page is at /products
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors dark:focus:ring-offset-slate-800"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
            {/* Cart Items Section */}
            <section className="lg:col-span-8 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6"
                >
                  <Link href={`/product/${item.id}`} className="flex-shrink-0 self-center sm:self-start">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={120} // Increased size
                      height={120}
                      className="rounded-lg object-contain w-24 h-24 sm:w-28 sm:h-28 border border-slate-200 dark:border-slate-700"
                    />
                  </Link>

                  <div className="flex-1 min-w-0"> {/* min-w-0 for text ellipsis */}
                    <div className="flex justify-between items-start mb-1">
                      <Link href={`/product/${item.id}`} className="min-w-0">
                        <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 truncate transition-colors">
                          {item.name}
                        </h2>
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 p-1 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-slate-700"
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                      Unit Price: KSh {item.price.toLocaleString("en-KE")}
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-md overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1.5 text-center w-12 font-medium text-slate-700 dark:text-slate-200 select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="font-semibold text-lg text-slate-800 dark:text-slate-100">
                        KSh {(item.price * item.quantity).toLocaleString("en-KE")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {cart.length > 0 && (
                <div className="mt-6 text-right">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to clear your cart?")) {
                        clearCart();
                      }
                    }}
                    className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </section>

            {/* Order Summary Section */}
            <aside className="lg:col-span-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 sticky top-6"> {/* Increased shadow, sticky */}
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Subtotal ({totalItems} items)</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      KSh {subtotal.toLocaleString("en-KE")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Shipping</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Estimated Tax (10%)</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      KSh {estimatedTax.toLocaleString("en-KE")}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-6 mb-6">
                  <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Grand Total
                  </span>
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    KSh {grandTotal.toLocaleString("en-KE")}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || totalItems === 0}
                  className={`w-full py-3.5 px-4 rounded-lg font-semibold text-base transition-all duration-300 ease-in-out flex items-center justify-center
                            ${isProcessing || totalItems === 0
                              ? "bg-slate-400 dark:bg-slate-600 text-slate-100 dark:text-slate-400 cursor-not-allowed"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      Processing...
                    </>
                  ) : "Proceed to Checkout"}
                </button>

                <div className="mt-6 text-center">
                  <Link
                    href="/products" // Link to your main products page
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline transition-colors"
                  >
                    or Continue Shopping
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}