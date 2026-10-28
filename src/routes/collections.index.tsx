import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories, formatINR, getProductImages, productsIn, startingPrice } from "@/data/products";
import { PageHero } from "@/components/site/Section";
import { ProductImage } from "@/components/site/ProductImage";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — Corporate Giftings" },
      { name: "description", content: "Browse premium hampers, hamper box collection, and dry fruit & chocolate boxes for corporate gifting." },
      { property: "og:title", content: "Gift Collections — Corporate Giftings" },
      { property: "og:description", content: "Premium hampers, hamper boxes, dry fruit and chocolate boxes." },
    ],
  }),
  component: Collections,
});

function Collections() {
  return (
    <>
      <PageHero eyebrow="Collections" title="Our gifting collections" sub="Three curated ranges, each crafted with premium packaging and quality dry fruits." />
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-16 sm:px-6">
        {categories.map((c, i) => {
          const list = productsIn(c.slug); const first = list[0]!;
          return (
            <Link key={c.slug} to="/collections/$category" params={{ category: c.slug }}
              className={`group grid overflow-hidden rounded-lg bg-card shadow-card transition-shadow hover:shadow-lift md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-80">
                <div className="h-full transition-transform duration-700 group-hover:scale-105">
                  <ProductImage src={getProductImages(first.code)[0]} code={first.code} alt={c.name} />
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="eyebrow">{list.length} designs</p>
                <h2 className="mt-2 text-4xl sm:text-5xl">{c.name}</h2>
                <p className="mt-4 text-muted-foreground">{c.description}</p>
                <p className="mt-4">From <span className="font-serif text-2xl font-semibold text-gold-dark">{formatINR(startingPrice(c.slug))}</span></p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold-dark">
                  View collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
