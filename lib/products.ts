// filepath: /home/dann-maina/Desktop/PROJECT/NEXT JS/Ecommerce/Electronics-e-commerce/lib/products.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  onSale?: boolean;         // <-- Add this line
  originalPrice?: number;   // <-- Add this line if you want to show original price
}

export const products: Product[] = [
  {
    id: "1",
    name: "Smart TV",
    description: "A high-definition smart television with vibrant colors.",
    price: 499,
    image: "/tv1.jpg",
    category: "televisions", // Add this
    onSale: true,
    originalPrice: 599,
  },
  {
    id: "2",
    name: "Laptop",
    description: "A powerful laptop for work and play.",
    price: 899,
    image: "/laptop1.jpg",
    category: "laptops",
    onSale: false,
  },
  {
    id: "3",
    name: "Wireless Headphones",
    description: "Noise-cancelling headphones with superior sound quality.",
    price: 299,
    image: "/headphones1.jpg",
    category: "audio",
    onSale: true,
    originalPrice: 349,
  },
];