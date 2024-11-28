export interface ProductType {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}
export const products: ProductType[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    description:
      "High-quality Bluetooth headphones with noise cancellation and 20 hours of playtime.",
    imageUrl: "https://fakeimg.pl/220x200?text=Headphones",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 699.99,
    description:
      "Latest model with 128GB storage, AMOLED display, and advanced camera system.",
    imageUrl: "https://fakeimg.pl/220x200?text=Smartphone",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 49.99,
    description:
      "Ergonomic gaming mouse with customizable RGB lighting and 6 programmable buttons.",
    imageUrl: "https://fakeimg.pl/220x200?text=Gaming+Mouse",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 89.99,
    description:
      "Compact mechanical keyboard with blue switches and adjustable backlighting.",
    imageUrl: "https://fakeimg.pl/220x200?text=Keyboard",
  },
  {
    id: 5,
    name: "4K UHD Monitor",
    price: 399.99,
    description:
      "27-inch 4K UHD monitor with HDR support and ultra-slim bezels.",
    imageUrl: "https://fakeimg.pl/220x200?text=Monitor",
  },
  {
    id: 6,
    name: "Portable Power Bank",
    price: 29.99,
    description:
      "10,000mAh portable power bank with fast charging and dual USB ports.",
    imageUrl: "https://fakeimg.pl/220x200?text=Power+Bank",
  },
  {
    id: 7,
    name: "Fitness Tracker",
    price: 59.99,
    description:
      "Waterproof fitness tracker with heart rate monitor and sleep tracking.",
    imageUrl: "https://fakeimg.pl/220x200?text=Fitness+Tracker",
  },
  {
    id: 8,
    name: "Wireless Charger",
    price: 19.99,
    description: "Fast wireless charger compatible with Qi-enabled devices.",
    imageUrl: "https://fakeimg.pl/220x200?text=Charger",
  },
  {
    id: 9,
    name: "Smart Home Speaker",
    price: 129.99,
    description: "Voice-controlled smart home speaker with high-quality audio.",
    imageUrl: "https://fakeimg.pl/220x200?text=Speaker",
  },
  {
    id: 10,
    name: "Laptop Stand",
    price: 34.99,
    description:
      "Adjustable laptop stand with aluminum build and heat dissipation design.",
    imageUrl: "https://fakeimg.pl/220x200?text=Laptop+Stand",
  },
];
