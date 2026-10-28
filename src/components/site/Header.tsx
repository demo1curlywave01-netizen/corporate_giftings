import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/products";
import { useEnquiry } from "@/lib/enquiry";

const navCls = "text-sm font-semibold uppercase tracking-[0.14em] text-ink-foreground/80 transition-colors hover:text-gold-light";
const active = { className: "text-gold-light" };

export function Header() {
  const { count } = useEnquiry();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Corporate Giftings home">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gold/40 bg-background shadow-xs sm:h-12 sm:w-12">
            <img src="/images/logo-icon.png" alt="Corporate Giftings logo" className="h-full w-full object-contain p-1 sm:p-1.5" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold text-ink-foreground sm:text-xl">Corporate Giftings</span>
            <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-gold-light">Premium Gift Hampers</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          <Link to="/" className={navCls} activeProps={active} activeOptions={{ exact: true }}>Home</Link>
          <div className="group relative">
            <Link to="/collections" className={`${navCls} inline-flex items-center gap-1`} activeProps={active}>
              Collections <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="rounded-md border border-gold/30 bg-ink p-2 shadow-lift">
                {categories.map((c) => (
                  <Link key={c.slug} to="/collections/$category" params={{ category: c.slug }}
                    className="block rounded px-3 py-2.5 text-sm text-ink-foreground/85 hover:bg-gold/15 hover:text-gold-light">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/about" className={navCls} activeProps={active}>About</Link>
          <Link to="/contact" className={navCls} activeProps={active}>Contact</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/enquiry" className="relative rounded-full p-2 text-ink-foreground hover:text-gold-light" aria-label={`Enquiry list, ${count} items`}>
            <ShoppingBag className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-gradient px-1 text-[0.7rem] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <Link to="/enquiry" className="btn-gold hidden !px-4 !py-2.5 sm:inline-flex">Get Quote</Link>
          <button className="p-2 text-ink-foreground lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gold/20 bg-ink px-4 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {[
            { to: "/", label: "Home" },
            { to: "/collections", label: "All Collections" },
          ].map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block border-b border-gold/10 py-3 text-ink-foreground">{l.label}</Link>
          ))}
          {categories.map((c) => (
            <Link key={c.slug} to="/collections/$category" params={{ category: c.slug }} onClick={() => setOpen(false)}
              className="block border-b border-gold/10 py-3 pl-4 text-sm text-ink-foreground/75">{c.name}</Link>
          ))}
          <Link to="/about" onClick={() => setOpen(false)} className="block border-b border-gold/10 py-3 text-ink-foreground">About</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="block border-b border-gold/10 py-3 text-ink-foreground">Contact</Link>
          <Link to="/enquiry" onClick={() => setOpen(false)} className="btn-gold mt-5 w-full">Get Quote</Link>
        </nav>
      )}
    </header>
  );
}
