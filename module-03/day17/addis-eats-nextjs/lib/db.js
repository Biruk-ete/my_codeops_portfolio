const mockDishes = [
  {
    id: "special-doro-wat",
    name: "Special Doro Wat",
    amharic: "",
    description: "Slow-cooked tender chicken drumette simmered for 12 hours with caramelized red onions, aged berbere gravy, and whole spices.",
    price: 650,
    image: "/FullMenu/DoroWat.webp",
    category: "Traditional Stews & Wat",
    tag: "HIGHLAND CLASSIC",
    spiceLevel: "Medium Hot",
    theme: "red",
  },
  {
    id: "prime-beef-kitfo",
    name: "Prime Beef Kitfo",
    amharic: "",
    description: "Minced lean beef tossed in fiery mitmita, kibbeh, and clarified butter, served with ayib.",
    price: 720,
    image: "/FullMenu/Kitfo.webp",
    category: "Tibs & Grills",
    tag: "CHEF'S HERITAGE",
    spiceLevel: "Spicy (Mitmita)",
    theme: "red",
  },
  {
    id: "siga-tibs",
    name: "Siga Tibs",
    amharic: "",
    description: "Tender prime beef cubes flash-sauteed with fresh rosemary, sweet onions, garlic cloves, and sliced mild jalapeño.",
    price: 620,
    image: "/FullMenu/Tibs.webp",
    category: "Tibs & Grills",
    tag: "PAN-SEARED",
    spiceLevel: "Mild / Savory",
    theme: "red",
  },
  {
    id: "clay-pot-shiro-bozena",
    name: "Clay-pot Shiro Bozena",
    amharic: "",
    description: "Silky spiced chickpea flour stew simmered slowly with diced dried beef bits and served bubbling hot in a clay pot.",
    price: 450,
    image: "/FullMenu/Shiro.webp",
    category: "Traditional Stews & Wat",
    tag: "CLAY-POT",
    spiceLevel: "Medium",
    theme: "red",
  },
  {
    id: "full-vegan-beyaynetu",
    name: "Full Vegan Beyaynetu",
    amharic: "",
    description: "Grand rainbow tasting platter composed of Misir Wat, Kik Alicha, braised gomen, sweet potato with carrots, Atakilt Wat.",
    price: 480,
    image: "/FullMenu/Beyaynet.webp",
    category: "Vegan & Vegetarian",
    tag: "100% VEGAN / TSOM",
    spiceLevel: "Varied Spices",
    theme: "green",
  },
  {
    id: "awaze-lamb-tibs",
    name: "Awaze Lamb Tibs",
    amharic: "",
    description: "Marinated grass-fed highland lamb cubes pan-seared with house-made fiery awaze pepper paste, garlic.",
    price: 680,
    image: "/FullMenu/AwazeTibs.webp",
    category: "Tibs & Grills",
    tag: "AWAZE GLAZE",
    spiceLevel: "Hot Awaze",
    theme: "red",
  },
  {
    id: "gored-gored",
    name: "Gored Gored",
    amharic: "",
    description: "Succulent cubed raw tenderloin rolled in fiery mitmita chili blend and infused with melted herbal niter kibbeh.",
    price: 750,
    image: "/FullMenu/GoredGoredTibs.webp",
    category: "Tibs & Grills",
    tag: "PURIST'S FAVORITE",
    spiceLevel: "Extra Hot",
    theme: "red",
  },
  {
    id: "house-tej",
    name: "House Tej (Carafe)",
    amharic: "",
    description: "Traditional golden mead naturally fermented for 21 days with pure highland wildflower honey and bitter gesho wood.",
    price: 350,
    image: "/FullMenu/Tej.webp",
    category: "Beverages & Tej",
    tag: "FERMENTED IN-HOUSE",
    spiceLevel: "Pure Honey",
    theme: "yellow",
  }
];

// In-memory orders store
const mockOrders = [];

// Mock authenticated user session
const mockSessionUser = {
  id: "user_addis_101",
  name: "Abebe Bikila",
  email: "abebe@example.com",
};

/**
 * ORM-style database query interface
 */
export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((d) => d.id === where.id) || null,
  },
  order: {
    findMany: async () => [...mockOrders],
  },
};

/**
 * Fetch a single dish by ID
 */
export async function getDish(id) {
  const dish = mockDishes.find((d) => d.id === id);
  return dish || null;
}

/**
 * Create a new order in memory
 */
export async function createOrder(data) {
  const newOrder = {
    id: `ord_${Math.floor(100 + Math.random() * 900)}`,
    ...data,
    status: "PENDING",
    userId: mockSessionUser.id,
    createdAt: new Date().toISOString(),
  };

  mockOrders.push(newOrder);
  return newOrder;
}

/**
 * Retrieve a specific order by ID
 */
export async function getOrder(id) {
  const order = mockOrders.find((o) => o.id === id);
  return order || null;
}

/**
 * Mark an order as cancelled
 */
export async function markCancelled(id) {
  const order = mockOrders.find((o) => o.id === id);
  if (!order) {
    throw new Error("Order not found");
  }

  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();
  return order;
}

/**
 * Read current authenticated user session
 */
export async function getSession() {
  return mockSessionUser;
}