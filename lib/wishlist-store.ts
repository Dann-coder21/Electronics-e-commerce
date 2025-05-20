// lib/wishlist-store.ts
import { create } from 'zustand';

interface WishlistState {
  wishlist: string[]; // array of product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],
  toggleWishlist: (productId) => {
    const current = get().wishlist;
    if (current.includes(productId)) {
      set({ wishlist: current.filter(id => id !== productId) });
    } else {
      set({ wishlist: [...current, productId] });
    }
    // In a real app, you'd call your API here
  },
  isInWishlist: (productId) => get().wishlist.includes(productId),
}));