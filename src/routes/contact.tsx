import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CONTACT, waLink } from "@/lib/contact";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { CustomizationBlock } from "@/components/site/CustomizationBlock";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Corporate Giftings" },
      { name: "description", content: "Connect with Corporate Giftings on WhatsApp for bulk corporate gift hamper orders, custom samples, and festive quotations." },
      { property: "og:title", content: "Contact Corporate Giftings — WhatsApp Concierge" },
      { property: "og:description", content: "Instant quotes, custom hampers, and festive curation on WhatsApp." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [f, setF] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const buildBody = () => {
    return [
      "Hello Corporate Giftings,",
      "",
      f.name && `Name: ${f.name}`,
      f.phone && `Phone: ${f.phone}`,
      "",
      "Requirement / Message:",
      f.message,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const body = buildBody();
    window.open(waLink(body), "_blank");
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Direct Concierge"
        title="Let's plan your gifting"
        sub="Chat directly with our team on WhatsApp for catalogue, custom samples, and festive bulk quotes."
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        {/* Left Column: Direct WhatsApp Concierge Hub */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="rounded-xl border border-gold/30 bg-card p-8 shadow-card">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp/15 text-whatsapp">
              <MessageCircle className="h-8 w-8 text-whatsapp" />
            </div>
            <p className="eyebrow mt-5 text-whatsapp">Instant WhatsApp Concierge</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Chat directly with our gifting specialists</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              For fastest replies, sample requests, and custom box discussions, our team is available directly on WhatsApp.
            </p>

            <div className="mt-6">
              <a
                href={waLink("Hello Corporate Giftings! I would like to know more about your gift hampers.")}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp w-full !py-3.5 !text-base"
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gold/20 bg-card p-5 shadow-card">
              <Truck className="h-6 w-6 text-gold" />
              <h3 className="mt-3 font-serif text-xl">Pan-India Delivery</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Safe bulk dispatches to corporate offices or direct-to-home delivery across all pin codes.
              </p>
            </div>
            <div className="rounded-lg border border-gold/20 bg-card p-5 shadow-card">
              <ShieldCheck className="h-6 w-6 text-gold" />
              <h3 className="mt-3 font-serif text-xl">Quality Guaranteed</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                100% Grade-A dry fruits, airtight sealed jars, and premium artisanal finishes.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Send via WhatsApp Form */}
        <form onSubmit={submit} className="rounded-xl border border-gold/20 bg-card p-8 shadow-card">
          <h2 className="font-serif text-3xl">Send us your requirement</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill in your details and click below to send your enquiry directly to our WhatsApp chat.
          </p>

          {sent && (
            <div className="mt-4 rounded-md border border-whatsapp/30 bg-whatsapp/10 p-4 text-sm text-foreground">
              Opening WhatsApp with your message! If it did not open automatically,{" "}
              <a
                className="font-bold text-whatsapp underline"
                href={waLink(buildBody())}
                target="_blank"
                rel="noreferrer"
              >
                click here to open WhatsApp
              </a>
              .
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Name *</label>
              <input
                required
                placeholder="Enter your name"
                aria-label="Name"
                className="field"
                maxLength={100}
                value={f.name}
                onChange={(e) => setF({ ...f, name: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone / WhatsApp Number *</label>
              <input
                required
                type="tel"
                placeholder="Enter your phone or WhatsApp number"
                aria-label="Phone"
                className="field"
                value={f.phone}
                onChange={(e) => setF({ ...f, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Requirement / Message *</label>
              <textarea
                required
                rows={5}
                placeholder="Tell us about the hampers you need, approximate quantity, or occasion..."
                aria-label="Message"
                className="field"
                maxLength={1000}
                value={f.message}
                onChange={(e) => setF({ ...f, message: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-whatsapp w-full !py-3.5 !text-base">
              <MessageCircle className="h-5 w-5" /> Send via WhatsApp
            </button>
          </div>
        </form>
      </div>

      <section className="bg-secondary/60 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Customization & bulk orders" title="Tailored for your requirements" />
          <CustomizationBlock />
        </div>
      </section>
    </>
  );
}
