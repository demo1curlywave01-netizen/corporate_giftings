import { Link } from "@tanstack/react-router";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { formatINR, getProductImages, type Product } from "@/data/products";
import { useEnquiry } from "@/lib/enquiry";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product }: { product: Product }) {
  const { add, has } = useEnquiry();
  const inList = has(product.code);
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg bg-card shadow-card transition-shadow duration-300 hover:shadow-lift">
      <Link to="/product/$code" params={{ code: product.code }} className="relative block aspect-square overflow-hidden bg-white">
        <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
          <ProductImage src={getProductImages(product.code)[0]} code={product.code} alt={`${product.name} (${product.code})`} />
        </div>
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-sm bg-ink px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-gold-light">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="eyebrow">{product.code}</span>
        <Link to="/product/$code" params={{ code: product.code }} className="mt-1 font-serif text-xl leading-tight hover:text-gold-dark">
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{product.capacity}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="font-serif text-2xl font-semibold">{formatINR(product.price)}</span>
          <button
            onClick={() => { add(product.code); toast.success(`${product.name} added to enquiry list`); }}
            className="inline-flex items-center gap-1 rounded-md border border-gold px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-gold hover:text-primary-foreground"
            aria-label={`Add ${product.name} to enquiry list`}
          >
            {inList ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {inList ? "Added" : "Enquire"}
          </button>
        </div>
      </div>
    </article>
  );
}
