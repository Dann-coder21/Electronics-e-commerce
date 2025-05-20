"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { ShoppingCart, X, ChevronDown, ChevronUp } from "lucide-react";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate checkout processing
    setTimeout(() => {
      setIsProcessing(false);
      // Add actual checkout logic here
    }, 1500);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-xl">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-lg text-gray-500">Your cart is empty</p>
          <p className="text-gray-400 mb-6">Start adding some items to your cart</p>
          <Link
            href="/product"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
                <Link href={`/products/${item.id}`} className="flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    width={96} 
                    height={96} 
                    className="rounded-lg object-cover w-24 h-24"
                  />
                </Link>
                
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/products/${item.id}`}>
                      <h2 className="font-semibold text-gray-800 hover:text-blue-600">{item.name}</h2>
                    </Link>
                    <p className="text-gray-500 text-sm">KSh {item.price.toLocaleString('en-KE')}</p>
                  </div>
                        <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <ChevronDown size={16} />
                      </button>
                      <span className="px-4 py-1 text-center w-12">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <ChevronUp size={16} />
                      </button>
                    </div>
                        <p className="font-medium text-gray-800">
                          KSh {(item.price * item.quantity).toLocaleString('en-KE')}
                        </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
                  <span className="font-medium">KSh {total.toLocaleString('en-KE')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-600">Estimated Tax</span>
                <span className="font-medium">KSh {(total * 0.1).toLocaleString('en-KE')}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t pt-4 mb-6">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="font-medium">KSh {(total * 1.1).toLocaleString('en-KE')}</span>
              </div>
              
              <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center ${
                  isProcessing 
                    ? "bg-blue-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : "Proceed to Checkout"}
              </button>
              
              <div className="mt-4 text-center">
                <Link href="/products" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}