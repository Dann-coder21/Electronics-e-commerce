'use client';
import { create } from "zustand";
import { Product } from "./products";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  
  // Add product to cart or increment quantity if already exists
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { 
        cart: [...state.cart, { ...product, quantity: 1 }] 
      };
    }),
  
  // Remove item completely from cart
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  
  // Update specific item's quantity
  updateQuantity: (id, quantity) =>
    set((state) => {
      if (quantity < 1) return state; // Prevent quantities less than 1
      
      const existingItem = state.cart.find((item) => item.id === id);
      if (!existingItem) return state;
      
      return {
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }),
  
  // Clear all items from cart
  clearCart: () => set({ cart: [] }),
  
  // Get total number of items in cart (sum of quantities)
  getTotalItems: () => get().cart.reduce((total, item) => total + item.quantity, 0),
  
  // Get total price of all items in cart
  getTotalPrice: () => 
    get().cart.reduce((total, item) => total + (item.price * item.quantity), 0),
}));