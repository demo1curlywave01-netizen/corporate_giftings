import { createFileRoute, Link } from "@tanstack/react-router";
import { Box, Gift, MessageCircle, Package, Sparkles, Truck, Nut } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { categories, featuredProducts, formatINR, getProductImages, productsIn, startingPrice } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductImage } from "@/components/site/ProductImage";
import { SectionHeading } from "@/components/site/Section";
import { CustomizationBlock } from "@/components/site/CustomizationBlock";
import { CONTACT, waLink } from "@/lib/contact";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Corporate Giftings — Premium Diwali & Corporate Gift Hampers" },
      { name: "description", content: "Luxury gift hampers, dry fruit boxes and chocolate boxes for Diwali, festivals, employee and client gifting. Bulk orders with logo branding." },
      { property: "og:title", content: "Corporate Giftings — Premium Gift Hampers" },
      { property: "og:description", content: "Gifts that make every business relationship special. Bulk & custom corporate hampers." },
    ],
  }),
  component: Index,
});

const why = [
  { icon: Package, title: "Premium packaging", text: "MDF, Scodix, laser cut and golden leaf work." },
  { icon: Box, title: "Bulk & custom orders", text: "From a few dozen to large festive volumes." },
  { icon: Sparkles, title: "Bespoke curation", text: "Personalized themes, keepsake boxes and message cards." },
  { icon: Truck, title: CONTACT.delivery, text: "Delivered safely to offices and homes." },
  { icon: Nut, title: "Quality dry fruits", text: "Hand-picked, fresh and premium grade." },
];

const steps = ["Choose hampers", "Send enquiry", "Get quote & mockup", "Approve & delivery"];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img src={hero} alt="Black and gold corporate gift hamper with dry fruit jars and diyas" width={1920} height={1088}
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-60 sm:opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-36">
          <div className="max-w-xl animate-fade-up">
            <p className="eyebrow mb-5">Diwali · Festive · Corporate</p>
            <h1 className="text-5xl leading-[1.05] sm:text-7xl">
              Gifts That Make Every <span className="text-gold-gradient">Business Relationship</span> Special
            </h1>
            <p className="mt-6 text-lg text-ink-foreground/75">
              Premium hampers, dry fruit and chocolate boxes, crafted for Diwali and every corporate occasion.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/collections" className="btn-gold">Explore Collections</Link>
              <Link to="/enquiry" className="btn-outline-gold text-ink-foreground">Get Bulk Quote</Link>
            </div>
          </div>
        </div>
        <div className="gold-divider relative" />
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Our collections" title="Curated for every occasion" />
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((c) => {
            const first = productsIn(c.slug)[0]!;
            return (
              <Link key={c.slug} to="/collections/$category" params={{ category: c.slug }}
                className="group overflow-hidden rounded-lg bg-card shadow-card transition-shadow hover:shadow-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <div className="h-full transition-transform duration-700 group-hover:scale-105">
                    <ProductImage src={getProductImages(first.code)[0]} code={first.code} alt={c.name} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-3xl">{c.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                  <p className="mt-4 text-sm">Starting from <span className="font-serif text-xl font-semibold text-gold-dark">{formatINR(startingPrice(c.slug))}</span></p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Bestsellers" title="Featured products" />
          <Carousel opts={{ align: "start", loop: true }} className="px-1 sm:px-10">
            <CarouselContent>
              {featuredProducts().map((p) => (
                <CarouselItem key={p.code} className="basis-[80%] sm:basis-1/2 lg:basis-1/3">
                  <ProductCard product={p} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden border-gold text-gold-dark sm:flex" />
            <CarouselNext className="hidden border-gold text-gold-dark sm:flex" />
          </Carousel>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Why choose us" title="Crafted with care, delivered with pride" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          {why.map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-card">
                <Icon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="mt-4 text-xl">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-divider mx-auto max-w-5xl" />

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="How it works" title="Four simple steps" />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className="rounded-lg bg-card p-6 shadow-card">
              <span className="font-serif text-5xl text-gold-gradient">0{i + 1}</span>
              <h3 className="mt-2 text-2xl">{s}</h3>
            </li>
          ))}
        </ol>
      </section>

      {/* Customization */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Customization & bulk orders" title="Make it unmistakably yours" />
          <CustomizationBlock />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-ink-foreground">
        <div className="gold-divider" />
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center">
          <Gift className="h-10 w-10 text-gold" />
          <h2 className="mt-4 text-4xl sm:text-5xl">Planning festive gifting for your team?</h2>
          <p className="mt-4 max-w-xl text-ink-foreground/70">Share your quantity and budget — we'll send a quote and mockup quickly.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={waLink("Hello! I'd like a bulk quote for corporate gift hampers.")} target="_blank" rel="noreferrer" className="btn-whatsapp">
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <Link to="/enquiry" className="btn-gold">Get Bulk Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
