export type CategorySlug = "premium-hampers" | "hamper-box" | "dryfruit-boxes";
export type Subcategory = "dryfruit" | "chocolate";

export interface Product {
  code: string;
  name: string;
  category: CategorySlug;
  subcategory?: Subcategory;
  price: number;
  material: string;
  capacity: string;
  size: string;
  jars?: number;
  packaging?: string;
  details: string[];
  badge?: string | undefined;
  featured?: boolean;
  /** Higher = newer. Used for "Newest" sort. */
  order: number;
}

/** Single editable pricing note shown across the site. */
export const PRICE_NOTE = "Prices are per piece, exclusive of GST and customization.";

export const categories: {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
}[] = [
  {
    slug: "premium-hampers",
    name: "Premium Hampers",
    short: "Premium Hampers",
    description: "Laser-cut MDF hampers with jars of dry fruits and sweet cavities, presented in a golden-leaf SBS bag.",
  },
  {
    slug: "hamper-box",
    name: "Hamper Box Collection",
    short: "Hamper Boxes",
    description: "Scodix-finished MDF hamper boxes with 2, 3 or 4 jars of hand-picked dry fruits.",
  },
  {
    slug: "dryfruit-boxes",
    name: "Dry Fruit & Chocolate Boxes",
    short: "Dry Fruit & Chocolate",
    description: "Elegant golden-leaf dry fruit and chocolate boxes, ideal for large employee gifting.",
  },
];

let n = 0;
const premiumCommon = {
  category: "premium-hampers" as const,
  material: "MDF dryfruit box (laser)",
  packaging: "SBS paper bag (golden leaf work) included",
  size: "L10.5 × W15 × H4 in",
};

const premium: Product[] = [
  { ...premiumCommon, code: "CGPG01", name: "The Rajwadi Hamper", price: 2499, capacity: "200 gms × 4 jars = 800 gms", jars: 4, details: ["10 pc bites cavity"], featured: true, order: ++n },
  { ...premiumCommon, code: "CGPG02", name: "The Luxe Hamper", price: 2499, capacity: "100 gms × 4 jars = 400 gms", jars: 4, size: "L9 × W20 × H3 in", details: ["1/2 kg sweet cavity"], featured: true, order: ++n },
  { ...premiumCommon, code: "CGPG03", name: "The Wooden Engraved Box", price: 2499, capacity: "200 gms × 3 jars = 600 gms", jars: 3, details: ["12 pc bites cavity"], order: ++n },
  { ...premiumCommon, code: "CGPG04", name: "The Granite Gold Box", price: 2299, capacity: "200 gms × 2 jars = 400 gms", jars: 2, details: ["12 pc bites cavity"], order: ++n },
  { ...premiumCommon, code: "CGPG05", name: "The Royal Tile Hamper", price: 2299, capacity: "100 gms × 4 jars = 400 gms", jars: 4, details: ["12 pc bites cavity"], order: ++n },
  { ...premiumCommon, code: "CGPG06", name: "The Marble Hamper", price: 2399, capacity: "150 gms × 3 jars = 450 gms", jars: 3, details: ["12 pc bites cavity"], order: ++n },
];

const hb = (code: string, name: string, price: number, jars: number, material: string, size: string, featured = false): Product => ({
  code, name, price, jars, material, size: `${size} in`, featured,
  category: "hamper-box",
  capacity: `200 gms × ${jars} = ${200 * jars} gms`,
  packaging: "SBS paper bag (golden leaf work)",
  details: ["Each jar holds 200 gms dry fruits"],
  order: ++n,
});
const S2 = "MDF (Golden Scodix work)";
const S3 = "MDF with MGI Scodix work";
const S4 = "MDF dryfruit box (MGI Scodix work)";
const hamperBox: Product[] = [
  hb("HB-01", "Mayur Hamper", 999, 2, S2, "L10 × W5 × H4", true),
  hb("HB-02", "Green Jharokha Peacock Hamper", 999, 2, S2, "L10 × W5 × H4"),
  hb("HB-03", "Golden Jharokha Peacock Hamper", 999, 2, S2, "L10 × W5 × H4"),
  hb("HB-04", "Wooden Hamper, Premium Laser 2 Jar", 1099, 2, S2, "L10 × W5 × H4"),
  hb("HB-05", "Natural Grain Hamper, Premium Laser 2 Jar", 1099, 2, S2, "L10 × W5 × H4"),
  hb("HB-06", "Golden Peacock Hamper", 1499, 3, S3, "L13 × W5 × H4", true),
  hb("HB-07", "Regal Feather Hamper", 1499, 3, S3, "L13 × W5 × H4"),
  hb("HB-08", "Heritage Hamper", 1499, 3, S3, "L13 × W5 × H4"),
  hb("HB-09", "Wooden Hamper, Premium Laser 3 Jar", 1599, 3, S3, "L13 × W5 × H4"),
  hb("HB-10", "Natural Grain Hamper, Premium Laser 3 Jar", 1599, 3, S3, "L13 × W5 × H4"),
  hb("HB-11", "Nandi Hamper", 1899, 4, S4, "L10 × W10 × H4"),
  hb("HB-12", "Spring Palace Hamper", 1899, 4, S4, "L10 × W10 × H4"),
  hb("HB-13", "Elephant Heritage Hamper", 1999, 4, S4, "L10 × W10 × H4", true),
  hb("HB-14", "Natural Grain Hamper, Premium Laser 4 Jar", 1999, 4, "MDF dryfruit box", "L10 × W10 × H4"),
  hb("HB-15", "Wooden Hamper, Premium Laser 4 Jar", 1999, 4, "MDF dryfruit box", "L10 × W10 × H4"),
];

const FOUR = ["Pistachios 75g", "Cashew 75g", "Raisins 75g", "Almonds 75g"];
const SIX = [...FOUR, "Dried Apricots 75g", "Dried Figs 75g"];
const dfRows: [number, 4 | 6, string][] = [
  [599, 4, "Golden leaf work"], [799, 6, "Golden leaf work"], [599, 4, "Golden leaf work"],
  [799, 6, "Golden leaf work"], [599, 4, "Golden leaf work"],
  [599, 4, "Golden leaf + laser-cut window"], [799, 6, "Golden leaf + laser-cut window"],
  [599, 4, "Golden leaf + laser-cut window"], [799, 6, "Golden leaf + laser-cut window"],
  [599, 4, "Golden leaf + laser-cut window"],
  [599, 4, "Laser-cut artwork"], [599, 4, "Laser-cut artwork"], [799, 6, "Laser-cut artwork"],
];
const dryfruit: Product[] = dfRows.map(([price, parts, finish], i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    code: `CGDB-${num}`,
    name: `Royal Dry Fruit Box ${num}`,
    category: "dryfruit-boxes",
    subcategory: "dryfruit",
    price,
    material: "Kappa cardboard",
    capacity: parts === 4 ? "4 part, 300 gms" : "6 part, 450 gms",
    size: parts === 4 ? "L10 × W10 × H1.5 in" : "L10 × W16 × H1.5 in",
    packaging: finish,
    details: parts === 4 ? FOUR : SIX,
    badge: finish.includes("window") ? "Window design" : undefined,
    featured: i === 6,
    order: ++n,
  };
});

const choc = (code: string, name: string, price: number, pcs: number, size: string, featured = false): Product => ({
  code, name, price, featured,
  category: "dryfruit-boxes",
  subcategory: "chocolate",
  material: "Golden leaf work box",
  capacity: `${pcs} pc bites`,
  size: `${size} in`,
  packaging: "Golden leaf work",
  details: [`${pcs} pc chocolate bites cavity`],
  order: ++n,
});
const chocolate: Product[] = [
  choc("CGSB-01", "Royal Chocolate Box", 499, 12, "L9.25 × W7.25 × H3"),
  choc("CGSB-02", "Royal Chocolate Box", 599, 16, "L10 × W10 × H2.5", true),
  choc("CGSB-03", "Royal Chocolate Box", 399, 9, "L7.5 × W7.5 × H2.5"),
  choc("CGSB-04", "Floral Chocolate Box", 599, 16, "L10 × W10 × H2.5"),
  choc("CGSB-05", "Floral Chocolate Box", 499, 12, "L9.25 × W7.25 × H3"),
  choc("CGSB-06", "Floral Chocolate Box", 399, 9, "L7.5 × W7.5 × H2.5"),
];

export const products: Product[] = [...premium, ...hamperBox, ...dryfruit, ...chocolate];

export const getProduct = (code: string) =>
  products.find(
    (p) =>
      p.code.toLowerCase() === code.toLowerCase() ||
      (p.code.startsWith("CGDB-") && code.toLowerCase() === p.code.toLowerCase().replace("cgdb", "dcgb")) ||
      (code.toLowerCase().startsWith("dcgb-") && p.code.toLowerCase() === code.toLowerCase().replace("dcgb", "cgdb"))
  );
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsIn = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const featuredProducts = () => products.filter((p) => p.featured).slice(0, 6);
export const startingPrice = (slug: CategorySlug) => Math.min(...productsIn(slug).map((p) => p.price));

export const formatINR = (v: number) => "₹" + v.toLocaleString("en-IN");

/** Images live in /public/images/products/<code>.jpg, <code>-2.jpg, <code>-3.jpg … */
export const getProductImages = (code: string, count = 3) =>
  Array.from({ length: count }, (_, i) => `/images/products/${code}${i === 0 ? "" : `-${i + 1}`}.jpg`);
