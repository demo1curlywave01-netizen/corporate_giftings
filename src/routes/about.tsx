import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Crown,
  HeartHandshake,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { waLink } from "@/lib/contact";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — The Art of Memorable Corporate Gifting" },
      {
        name: "description",
        content:
          "Discover Corporate Giftings. We handcraft luxury wooden keepsakes, royal miniature dry fruit hampers, and bespoke festive gifts designed to build enduring corporate relationships.",
      },
      { property: "og:title", content: "About Corporate Giftings — Heritage & Craftsmanship" },
      {
        property: "og:description",
        content: "Where timeless Indian artistry meets refined corporate sophistication.",
      },
    ],
  }),
  component: AboutPage,
});

const processSteps = [
  {
    step: "01",
    title: "Consultation & Curation",
    desc: "Share your budget, recipient profile, and quantity. We recommend tailored configurations from our royal and contemporary collections.",
  },
  {
    step: "02",
    title: "Branding & Custom Presentation",
    desc: "Our design team produces realistic mockups incorporating custom greeting cards, bespoke ribbons, and personalized festive packaging.",
  },
  {
    step: "03",
    title: "Artisanal Packing & QA",
    desc: "Fresh dry fruits and artisan confections are vacuum/airtight sealed in food-grade brass-capped jars and nestled in padded luxury trays.",
  },
  {
    step: "04",
    title: "White-Glove Multi-Point Dispatch",
    desc: "Carefully boxed with shock-absorbent cushioning and dispatched with real-time tracking to ensure pristine, on-schedule arrival.",
  },
];

function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-28">
          <p className="eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1">
            <Crown className="h-3.5 w-3.5 text-gold-light" />
            Heritage · Craftsmanship · Excellence
          </p>
          <h1 className="mx-auto max-w-4xl font-serif text-4xl leading-tight sm:text-6xl sm:leading-tight lg:text-7xl">
            The Art of <span className="text-gold-gradient">Memorable Giving</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-ink-foreground/75 sm:text-lg sm:leading-relaxed">
            We believe a corporate gift should never end in discarded packaging. We craft royal
            keepsake boxes, gourmet dry fruit hampers, and bespoke festive hampers designed to deepen
            every business relationship.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/collections" className="btn-gold">
              Explore Collections
            </Link>
            <Link to="/enquiry" className="btn-outline-gold text-ink-foreground">
              Request Bulk Quote
            </Link>
          </div>
        </div>
        <div className="gold-divider" />
      </section>

      {/* 2. THE SIGNATURE SHOWCASE (USER IMAGE FEATURE) */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Image Column */}
          <div className="relative lg:col-span-7">
            {/* Decorative Gold Glow Frame */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-gold/30 via-gold/10 to-transparent blur-lg opacity-70" />
            <div className="relative overflow-hidden rounded-xl border border-gold/40 bg-card shadow-lift">
              <img
                src="/images/about-collection.jpg"
                alt="Exquisite corporate gift hampers including hand-carved wooden boxes, royal peacock inlays, and gold filigree hampers"
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                width={1200}
                height={900}
                loading="eager"
              />

              {/* Floating Quality Badge */}
              <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-gold/40 bg-ink/90 p-4 text-ink-foreground backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-light">
                  <Sparkles className="h-4 w-4" />
                  Signature Artisan Series
                </div>
                <p className="mt-1 text-xs text-ink-foreground/80 sm:text-sm">
                  MDF wood, laser-cut jali, brass latches & Mughal miniature art designed to be treasured for years.
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-2">Our Philosophy</p>
            <h2 className="font-serif text-3xl leading-snug sm:text-4xl lg:text-5xl">
              Gifts That Demand <span className="text-gold-gradient">To Be Kept</span>
            </h2>
            <div className="my-5 h-px w-20 bg-gold-gradient" />
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              In a world flooded with generic executive giveaways, true distinction lies in
              authenticity. We founded Corporate Giftings with a single guiding vision: to revive the
              princely Indian tradition of handcrafted gifting for modern business leaders.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every hamper we create begins with structural permanence. Instead of paper cartons that
              end up in recycling, our hampers are heirloom wooden chests, laser-carved jali boxes,
              and foil-stamped keepsake organizers that live on desks and in homes long after the
              sweets are shared.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Sustainable keepsakes that reduce festive waste",
                "Heirloom aesthetic that keeps your brand top-of-mind all year",
                "Ethically sourced, certified Grade-A dry fruit selections",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm font-medium text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link to="/collections" className="btn-gold">
                View Catalogue
              </Link>
              <a
                href={waLink("Hello! I saw your signature collection on the website and would like to know more.")}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                Talk on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE GIFTING JOURNEY / PROCESS */}
      <section className="border-t border-gold/20 bg-ink py-16 text-ink-foreground sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-2">Seamless Workflow</p>
            <h2 className="font-serif text-3xl sm:text-5xl">From Concept to Delivery</h2>
            <p className="mt-3 text-ink-foreground/70">
              We handle every detail from design to doorstep so your team can focus on relationships.
            </p>
            <div className="mx-auto mt-4 h-px w-20 bg-gold-gradient" />
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((p) => (
              <div key={p.step} className="relative rounded-lg border border-gold/20 bg-ink-foreground/5 p-6 backdrop-blur-sm">
                <div className="font-serif text-4xl font-bold text-gold-light/40">{p.step}</div>
                <h3 className="mt-2 font-serif text-2xl text-ink-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/75">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent p-8 text-center sm:p-12">
            <h3 className="font-serif text-3xl text-ink-foreground sm:text-4xl">
              Planning Festive or Corporate Milestones?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-foreground/75 sm:text-base">
              Connect with us directly on WhatsApp for customized curation, samples, and volume discounts.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link to="/enquiry" className="btn-gold">
                Start Your Enquiry
              </Link>
              <a
                href={waLink("Hello! We are planning corporate hampers and want to discuss custom options.")}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Our Concierge
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ETHOS QUOTE */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <HeartHandshake className="mx-auto h-10 w-10 text-gold" />
        <blockquote className="mt-6 font-serif text-2xl font-normal italic leading-relaxed text-foreground sm:text-3xl">
          "A business gift is not merely a gesture; it is an enduring reflection of your standards,
          your gratitude, and the value you place on your partners."
        </blockquote>
        <div className="mt-4 font-sans text-xs uppercase tracking-widest text-gold-dark">
          Corporate Giftings Philosophy
        </div>
      </section>
    </div>
  );
}
