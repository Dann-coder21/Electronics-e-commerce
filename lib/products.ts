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
    price: 49999,
    image: "/tv1.jpg",
    category: "televisions", // Add this
    onSale: true,
    originalPrice: 59999,
  },
  {
    id: "2",
    name: "Laptop",
    description: "A powerful laptop for work and play.",
    price: 58999,
    image: "/XPS17.png",
    category: "laptops",
    onSale: true,
    originalPrice: 48999,
  },
  {
    id: "3",
    name: "Wireless Headphones",
    description: "Noise-cancelling headphones with superior sound quality.",
    price: 29999,
    image: "/ubl.png",
    category: "audio",
    onSale: true,
    originalPrice: 34999,
  },
   {
    id: "4",
    name: "washing machine",
    description: "A high-efficiency washing machine with smart features.",
    price: 29999,
    image: "/washing machine.png",
    category: "home-appliances",
    onSale: true,
    originalPrice: 34999,
  },
   {
    id: "5",
    name: "microwave",
    description: "A compact microwave oven for quick meals.",
    price: 18_999,
    image: "/rm-684.jpg",
    category: "home-appliances",
    onSale: true,
    originalPrice: 24_999,
  },

];
