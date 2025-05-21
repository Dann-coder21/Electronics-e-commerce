// lib/categories.ts
import { products, Product } from "./products"; // Assuming Product interface is exported from products.ts
import { 
  MdTv,
  MdHeadphones,
  MdHome,
  MdVideogameAsset,
  MdKitchen 
} from "react-icons/md";
import React from 'react'; // Import React if not already globally available for React.ComponentType

export interface Category {
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>; // Icon component type
  count: number;
}

export const categories: Category[] = [
  {
    name: "Televisions",
    slug: "televisions",
    icon: MdTv,
    // Make count dynamic and case-insensitive
    count: products.filter(p => p.category?.toLowerCase() === "televisions").length,
  },
  {
    name: "Audio",
    slug: "audio",
    icon: MdHeadphones,
    // Make count dynamic and case-insensitive
    count: products.filter(p => p.category?.toLowerCase() === "audio").length,
  },
  {
    name: "Smart Home",
    slug: "smart-home",
    icon: MdHome,
    // Make count dynamic and case-insensitive
    count: products.filter(p => p.category?.toLowerCase() === "smart-home").length,
  },
  {
    name: "Gaming",
    slug: "gaming",
    icon: MdVideogameAsset,
    // Make count dynamic and case-insensitive
    count: products.filter(p => p.category?.toLowerCase() === "gaming").length,
  },
  {
    name: "Home Appliances",
    slug: "home-appliances",
    icon: MdKitchen,
    // Make count dynamic and case-insensitive
    count: products.filter(p => p.category?.toLowerCase() === "home-appliances").length,
  }
];