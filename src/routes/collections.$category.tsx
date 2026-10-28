import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getCategory, PRICE_NOTE, productsIn, type CategorySlug, type Subcategory } from "@/data/products";
import { PageHero } from "@/components/site/Section";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/collections/$category")({
  loader: ({ params }) => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.name} — Corporate Giftings` },
          { name: "description", content: loaderData.cat.description },
          { property: "og:title", content: `${loaderData.cat.name} — Corporate Giftings` },
          { property: "og:description", content: loaderData.cat.description },
        ]
      : [{ title: "Collection not found — Corporate Giftings" }, { name: "robots", content: "noindex" }],
  }),
  component: CategoryPage,
});

type Sort = "newest" | "asc" | "desc";

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const all = productsIn(cat.slug as CategorySlug);
  const isDry = cat.slug === "dryfruit-boxes";

  const [tab, setTab] = useState<Subcategory>("dryfruit");
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [cap, setCap] = useState("all");
  const [mat, setMat] = useState("all");
  const [sort, setSort] = useState<Sort>("newest");

  const base = isDry ? all.filter((p) => p.subcategory === tab) : all;
  const capOptions = useMemo(() => [...new Set(base.map((p) => (p.jars ? `${p.jars} jars` : p.capacity)))], [base]);
  const matOptions = useMemo(() => [...new Set(base.map((p) => p.packaging && isDry ? p.packaging : p.material))], [base, isDry]);
  const prices = base.map((p) => p.price);
  const lo = Math.min(...prices), hi = Math.max(...prices);
  const limit = Math.min(maxPrice, hi);

  const list = base
    .filter((p) => p.price <= limit)
    .filter((p) => cap === "all" || (p.jars ? `${p.jars} jars` : p.capacity) === cap)
    .filter((p) => mat === "all" || (isDry ? p.packaging : p.material) === mat)
    .sort((a, b) => (sort === "asc" ? a.price - b.price : sort === "desc" ? b.price - a.price : b.order - a.order));

  const reset = () => { setMaxPrice(Infinity); setCap("all"); setMat("all"); };

  return (
    <>
      <PageHero eyebrow="Collection" title={cat.name} sub={cat.description} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {isDry && (
          <div role="tablist" className="mx-auto mb-8 flex w-fit rounded-md border border-gold/40 bg-card p-1">
            {(["dryfruit", "chocolate"] as const).map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} onClick={() => { setTab(t); reset(); }}
                className={`rounded px-5 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${tab === t ? "bg-gold-gradient text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {t === "dryfruit" ? "Dry Fruit Boxes" : "Chocolate Boxes"}
              </button>
            ))}
          </div>
        )}

        <div className="mb-8 grid gap-4 rounded-lg bg-card p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm">
            <span className="eyebrow">Max price: ₹{limit.toLocaleString("en-IN")}</span>
            <input type="range" min={lo} max={hi} step={50} value={limit} onChange={(e) => setMaxPrice(+e.target.value)}
              className="mt-3 w-full accent-gold" disabled={lo === hi} />
          </label>
          <label className="text-sm">
            <span className="eyebrow">{isDry ? "Capacity" : "Jars"}</span>
            <select value={cap} onChange={(e) => setCap(e.target.value)} className="field mt-2">
              <option value="all">All</option>
              {capOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="eyebrow">{isDry ? "Finish" : "Material"}</span>
            <select value={mat} onChange={(e) => setMat(e.target.value)} className="field mt-2">
              <option value="all">All</option>
              {matOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="eyebrow">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field mt-2">
              <option value="newest">Newest</option>
              <option value="asc">Price: low to high</option>
              <option value="desc">Price: high to low</option>
            </select>
          </label>
        </div>

        <p className="mb-6 text-sm text-muted-foreground">{list.length} products · {PRICE_NOTE}</p>

        {list.length ? (
          <div className="grid grid-cols-1 gap-5 min-[460px]:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {list.map((p) => <ProductCard key={p.code} product={p} />)}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">No products match these filters.</p>
            <button onClick={reset} className="btn-outline-gold mt-4">Clear filters</button>
          </div>
        )}
      </div>
    </>
  );
}
