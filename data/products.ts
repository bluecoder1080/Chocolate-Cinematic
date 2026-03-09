export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  description: string;
  folderPath: string;
  themeColor: string;
  gradient: string;
  features: string[];
  stats: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    id: "dark-chocolate",
    name: "Dark Chocolate",
    subtitle: "Pure cocoa intensity",
    price: "₹180",
    description:
      "Experience the pure, unadulterated taste of premium cocoa. Our Dark Chocolate is crafted from the finest beans, delivering a rich and intense flavor profile that true chocolate connoisseurs appreciate. With 80% cocoa content, each piece is a journey into the depths of chocolate excellence.",
    folderPath: "/All THe Images/Dark-Chocolate",
    themeColor: "#3E2723",
    gradient: "linear-gradient(135deg, #3E2723, #1B1B1B)",
    features: ["80% Cocoa", "Rich Antioxidants", "Vegan Friendly"],
    stats: [
      { label: "Cocoa", value: "80%" },
      { label: "Sugar", value: "Low" },
      { label: "Texture", value: "Velvet" },
    ],
  },
  {
    id: "lemon",
    name: "Lemon White Chocolate",
    subtitle: "Citrus meets cream",
    price: "₹160",
    description:
      "A harmonious blend where zesty lemon meets creamy white chocolate. This innovative creation brings together the brightness of fresh citrus with the smooth, buttery notes of premium white chocolate. Each bite delivers a refreshing burst of flavor that dances on your palate.",
    folderPath: "/All THe Images/Lemon-jpg",
    themeColor: "#FDD835",
    gradient: "linear-gradient(135deg, #FFF176, #FDD835)",
    features: ["White Chocolate", "Lemon Zest", "Creamy Texture"],
    stats: [
      { label: "Citrus", value: "100%" },
      { label: "Sweetness", value: "Medium" },
      { label: "Freshness", value: "High" },
    ],
  },
  {
    id: "strawberry",
    name: "Strawberry Chocolate",
    subtitle: "Berry sweet delight",
    price: "₹170",
    description:
      "Indulge in the perfect marriage of ripe strawberries and smooth milk chocolate. Made with real strawberry pieces, this chocolate delivers an authentic fruit flavor that complements the creamy chocolate base. A delightful treat that captures the essence of summer in every bite.",
    folderPath: "/All THe Images/Strawberry",
    themeColor: "#E53935",
    gradient: "linear-gradient(135deg, #EF5350, #C62828)",
    features: ["Real Strawberry", "Creamy Chocolate", "Natural Flavor"],
    stats: [
      { label: "Fruit", value: "100%" },
      { label: "Texture", value: "Creamy" },
      { label: "Aroma", value: "Fruity" },
    ],
  },
];
