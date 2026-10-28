import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, MessageCircle, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatINR, getCategory, getProduct, getProductImages, PRICE_NOTE, products } from "@/data/products";
import { useEnquiry } from "@/lib/enquiry";
import { waLink } from "@/lib/contact";
import { ProductImage } from "@/components/site/ProductImage";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/product/$code")({
  loader: ({ params }) => {
    const product = getProduct(params.code);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} (${loaderData.product.code}) — Corporate Giftings` },
          { name: "description", content: `${loaderData.product.name}: ${loaderData.product.capacity}, ${loaderData.product.material}. ${formatINR(loaderData.product.price)} per piece. Bulk corporate orders.` },
          { property: "og:title", content: `${loaderData.product.name} — Corporate Giftings` },
          { property: "og:description", content: `${loaderData.product.capacity} · ${formatINR(loaderData.product.price)} per piece` },
        ]
      : [{ title: "Product unavailable — Corporate Giftings" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const cat = getCategory(p.category)!;
  const images = getProductImages(p.code);
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [qty, setQty] = useState(10);
  const { add } = useEnquiry();

  const related = products.filter((x) => x.category === p.category && x.code !== p.code && (!p.subcategory || x.subcategory === p.subcategory)).slice(0, 3);
  const specs: [string, string | undefined][] = [
    ["Product code", p.code],
    ["Capacity", p.capacity],
    ["Jars", p.jars ? String(p.jars) : undefined],
    ["Material", p.material],
    ["Size", p.size],
    ["Packaging / finish", p.packaging],
    ["Contents", p.details.join(", ")],
  ];
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const wa = waLink(
    `Hello Corporate Giftings! I'm interested in:\n\n*${p.name}* (${p.code})\n• Quantity: approx. ${qty} pcs\n• Price: ${formatINR(p.price)} / piece\n\n🔗 Product Link: ${origin}/product/${p.code}\n\nPlease share a bulk quote.`
  );
  const go = (d: number) => setIdx((i) => (i + d + images.length) % images.length);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/collections" className="hover:text-gold-dark">Collections</Link> /{" "}
        <Link to="/collections/$category" params={{ category: cat.slug }} className="hover:text-gold-dark">{cat.name}</Link> /{" "}
        <span className="text-foreground">{p.code}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <button onClick={() => setLightbox(true)} className="block aspect-square w-full overflow-hidden rounded-lg bg-white shadow-card" aria-label="Open image">
            <ProductImage key={images[idx]} src={images[idx]} code={p.code} alt={`${p.name} image ${idx + 1}`} eager />
          </button>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {images.map((src, i) => (
              <button key={src} onClick={() => setIdx(i)} aria-label={`Show image ${i + 1}`}
                className={`aspect-square overflow-hidden rounded-md border-2 bg-white ${i === idx ? "border-gold" : "border-transparent"}`}>
                <ProductImage src={src} code={p.code} alt={`${p.name} thumbnail ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">{cat.name} · {p.code}</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">{p.name}</h1>
          {p.badge && <span className="mt-3 inline-block rounded-sm bg-ink px-2 py-1 text-xs font-bold uppercase tracking-wider text-gold-light">{p.badge}</span>}
          <p className="mt-5 font-serif text-4xl font-semibold text-gold-dark">{formatINR(p.price)} <span className="font-sans text-sm font-normal text-muted-foreground">/ piece</span></p>
          <p className="mt-1 text-xs text-muted-foreground">{PRICE_NOTE}</p>
          <div className="gold-divider my-6" />

          <table className="w-full text-sm">
            <tbody>
              {specs.filter(([, v]) => v).map(([k, v]) => (
                <tr key={k} className="border-b border-border">
                  <th className="w-40 py-2.5 pr-4 text-left font-semibold text-muted-foreground">{k}</th>
                  <td className="py-2.5">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex items-center gap-3">
            <label htmlFor="qty" className="text-sm font-semibold">Quantity</label>
            <input id="qty" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 1))} className="field !w-28" />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="btn-gold" onClick={() => { add(p.code, qty); toast.success(`Added ${qty} × ${p.name} to enquiry list`); }}>
              <Plus className="h-4 w-4" /> Add to Enquiry List
            </button>
            <a href={wa} target="_blank" rel="noreferrer" className="btn-whatsapp"><MessageCircle className="h-4 w-4" /> Enquire on WhatsApp</a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <SectionHeading eyebrow="You may also like" title="Related products" />
          <div className="grid grid-cols-1 gap-6 min-[460px]:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <ProductCard key={r.code} product={r} />)}
          </div>
        </section>
      )}

      {lightbox && (
        <div role="dialog" aria-modal className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4" onClick={() => setLightbox(false)}
          onKeyDown={(e) => { if (e.key === "Escape") setLightbox(false); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }} tabIndex={-1}>
          <button className="absolute right-4 top-4 text-ink-foreground" aria-label="Close" autoFocus><X className="h-8 w-8" /></button>
          <button className="absolute left-2 text-ink-foreground sm:left-6" aria-label="Previous" onClick={(e) => { e.stopPropagation(); go(-1); }}><ChevronLeft className="h-10 w-10" /></button>
          <div className="aspect-square w-full max-w-3xl overflow-hidden rounded-lg bg-white" onClick={(e) => e.stopPropagation()}>
            <ProductImage key={images[idx]} src={images[idx]} code={p.code} alt={`${p.name} large image`} eager className="object-contain" />
          </div>
          <button className="absolute right-2 text-ink-foreground sm:right-6" aria-label="Next" onClick={(e) => { e.stopPropagation(); go(1); }}><ChevronRight className="h-10 w-10" /></button>
        </div>
      )}
    </div>
  );
}
