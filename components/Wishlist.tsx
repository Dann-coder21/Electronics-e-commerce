"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next 13 app router navigation
import { useSession } from "next-auth/react"; // assuming next-auth for session handling

interface WishlistLinkProps {
  closeMenu: () => void;
  isMobile: boolean;
  productId?: string; // optional: show filled heart if product is in wishlist
}

export function WishlistLink({ closeMenu, isMobile, productId }: WishlistLinkProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlistStore();

  const [isInList, setIsInList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update whether product is in wishlist whenever wishlist or productId changes
  useEffect(() => {
    if (productId) {
      setIsInList(isInWishlist(productId));
    }
  }, [productId, wishlist, isInWishlist]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Redirect to sign-in if not authenticated
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    if (productId) {
      setIsLoading(true);
      try {
        await toggleWishlist(productId);
      } catch (error) {
        console.error("Failed to toggle wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      closeMenu();
      router.push("/wishlist");
    }
  };

  // Determine styles based on mobile or desktop
  const baseStyles = isMobile
    ? "block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-900 text-sm font-medium flex items-center gap-2"
    : "text-white hover:text-amber-300 transition-colors text-sm font-medium flex items-center gap-1";

  return (
    <Link
      href={productId ? "#" : "/wishlist"}
      onClick={handleClick}
      className={baseStyles}
      aria-label={
        productId
          ? isInList
            ? "Remove from wishlist"
            : "Add to wishlist"
          : "View your wishlist"
      }
    >
      <Heart
        className={`h-5 w-5 ${isInList ? "fill-red-500 stroke-red-500" : "stroke-current"}`}
        size={isMobile ? 20 : 16}
      />
      <span>
        {productId ? (isLoading ? "Processing..." : isInList ? "In Wishlist" : "Wishlist") : "Wishlist"}
      </span>
      {!productId && wishlist.length > 0 && (
        <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full ml-1 select-none">
          {wishlist.length}
        </span>
      )}
    </Link>
  );
}
   