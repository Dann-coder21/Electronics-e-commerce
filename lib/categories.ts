// lib/categories.ts
import { products } from "./products";
import { 
  MdTv,           // Televisions
  MdHeadphones,    // Audio
  MdHome,          // Smart Home
  MdVideogameAsset, // Gaming
  MdKitchen       // Home Appliances
} from "react-icons/md";

export interface Category {
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}
export const categories: Category[] = [
  {
     name: "Televisions",
    slug: "televisions",
    icon: MdTv,
    count: 3,
  },
  {
    name: "Audio",
    slug: "audio",
    icon: MdHeadphones,
    count: products.filter(p => p.category === "audio").length
  },
  {
    name: "Smart Home",
    slug: "smart-home",
    icon: MdHome,
    count: products.filter(p => p.category === "smart-home").length
  },
  {
    name: "Gaming",
    slug: "gaming",
    icon: MdVideogameAsset,
    count: products.filter(p => p.category === "gaming").length
  },
   {
    name: "Home Appliances",
    slug: "home-appliances",
    icon: MdKitchen,
    count: products.filter(p => p.category === "home-appliances").length
  }
];