"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function WishlistLink({
  closeMenu,
  isMobile,
  productId, // optional - if you want to show filled heart when product is in wishlist
}: {
  closeMenu: () => void;
  isMobile: boolean;
  productId?: string;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { wishlist, toggleWishlist, isInWishlist } = useWishlistStore();
  const [isInList, setIsInList] = useState(false);

  // Sync with server on mount
  useEffect(() => {
    if (productId) {
      setIsInList(isInWishlist(productId));
    }
  }, [productId, wishlist]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (productId) {
      setIsLoading(true);
      try {
        await toggleWishlist(productId);
      } finally {
        setIsLoading(false);
      }
    } else {
      closeMenu();
      router.push('/wishlist');
    }
  };

  return (
    <Link
      href={productId ? '#' : '/wishlist'}
      onClick={handleClick}
      className={isMobile ? 
        'block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-900 text-sm font-medium flex items-center gap-2' : 
        'text-white hover:text-amber-300 transition-colors text-sm font-medium flex items-center gap-1'}
      aria-label={productId ? 
        (isInList ? 'Remove from wishlist' : 'Add to wishlist') : 
        'View your wishlist'}
    >
      <Heart 
        className={`h-5 w-5 ${isInList ? 'fill-red-500 stroke-red-500' : ''}`}
        size={isMobile ? 20 : 16}
      />
      <span>
        {productId ? 
          (isLoading ? 'Processing...' : (isInList ? 'In Wishlist' : 'Wishlist')) : 
          'Wishlist'}
      </span>
      {!productId && (
        <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">
          {wishlist.length}
        </span>
      )}
    </Link>
  );
}