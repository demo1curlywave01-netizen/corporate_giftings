import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ExternalLink, Image as ImageIcon, MessageCircle, Minus, Plus, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { formatINR, getProduct, getProductImages } from "@/data/products";
import { useEnquiry } from "@/lib/enquiry";
import { waLink } from "@/lib/contact";
import { PageHero } from "@/components/site/Section";
import { ProductImage } from "@/components/site/ProductImage";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Enquiry List & Bulk Quote — Corporate Giftings" },
      { name: "description", content: "Review your selected gift hampers and request a bulk corporate quote directly via WhatsApp with product images and links." },
      { property: "og:title", content: "Request a Bulk Quote — Corporate Giftings" },
      { property: "og:description", content: "Send your gifting list and get a quote with custom mockup on WhatsApp." },
    ],
  }),
  component: EnquiryPage,
});

interface FormState {
  name: string;
  company: string;
  phone: string;
  city: string;
  date: string;
  totalQty: string;
  customization: "standard" | "custom_card" | "bespoke";
  message: string;
}

const empty: FormState = {
  name: "",
  company: "",
  phone: "",
  city: "",
  date: "",
  totalQty: "",
  customization: "standard",
  message: "",
};

function EnquiryPage() {
  const { items, setQty, remove, clear } = useEnquiry();
  const [form, setForm] = useState<FormState>(empty);
  const [done, setDone] = useState<{ msg: string; rows: { p: NonNullable<ReturnType<typeof getProduct>>; qty: number }[] } | null>(null);

  const rows = items.map((i) => ({ ...i, p: getProduct(i.code)! })).filter((r) => r.p);
  const subtotal = rows.reduce((s, r) => s + r.p.price * r.qty, 0);
  const totalPieces = rows.reduce((s, r) => s + r.qty, 0);
  const set = (k: keyof FormState) => (e: { target: { value: string } }) =>
    setForm({ ...form, [k]: e.target.value });

  const customizationLabels: Record<FormState["customization"], string> = {
    standard: "Standard Curated Packaging",
    custom_card: "Personalized Greeting Card & Ribbon",
    bespoke: "Full Bespoke Box Curation",
  };

  const buildMessage = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const lines = [
      "🎁 *Hello Corporate Giftings, I'd like a bulk quote.*",
      "",
      ...(rows.length
        ? [
            "📦 *Selected Products:*",
            ...rows.flatMap((r, i) => [
              `${i + 1}. *${r.p.name}* (${r.p.code}) × ${r.qty} pcs @ ${formatINR(r.p.price)}`,
              `   🔗 Product Link: ${origin}/product/${r.p.code}`,
              "",
            ]),
            `💰 *Estimated Subtotal:* ${formatINR(subtotal)} (${totalPieces} pcs)`,
            "",
          ]
        : []),
      "👤 *Client Details:*",
      form.name && `• Name: ${form.name}`,
      form.company && `• Company: ${form.company}`,
      form.phone && `• Phone / WhatsApp: ${form.phone}`,
      form.city && `• City: ${form.city}`,
      form.date && `• Required by date: ${form.date}`,
      `• Total Quantity: ${form.totalQty || totalPieces} pcs`,
      `• Customization: ${customizationLabels[form.customization]}`,
      form.message && `\n📝 *Special Requirements / Message:*\n${form.message}`,
    ];
    return lines.filter(Boolean).join("\n");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = buildMessage();
    window.open(waLink(msg), "_blank");
    setDone({ msg, rows: [...rows] });
  };

  if (done) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return (
      <>
        <PageHero eyebrow="Enquiry Submitted" title="WhatsApp Enquiry Ready" />
        <div className="mx-auto max-w-2xl px-4 py-14">
          <div className="rounded-xl border border-gold/30 bg-card p-6 text-center shadow-lift sm:p-8">
            <CheckCircle2 className="mx-auto h-14 w-14 text-whatsapp" />
            <h2 className="mt-4 font-serif text-3xl">Opening WhatsApp with your Enquiry</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your product links, images, quantities, and requirements have been formatted into your WhatsApp chat.
            </p>

            {/* Products with links and images included */}
            {done.rows.length > 0 && (
              <div className="mt-6 border-t border-border pt-6 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Included Products & Links:</p>
                <div className="mt-3 space-y-3">
                  {done.rows.map(({ p, qty }) => {
                    const imgSrc = getProductImages(p.code)[0];
                    const prodLink = `${origin}/product/${p.code}`;
                    const imgFullUrl = `${origin}${imgSrc}`;
                    return (
                      <div key={p.code} className="flex items-center gap-3 rounded-lg border border-gold/20 bg-background p-3">
                        <img src={imgSrc} alt={p.name} className="h-14 w-14 rounded object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-serif text-base font-semibold">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.code} · Qty: {qty}</p>
                          <div className="mt-1 text-xs">
                            <a href={prodLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-gold-dark hover:underline">
                              <ExternalLink className="h-3 w-3" /> View Product Page
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={waLink(done.msg)} target="_blank" rel="noreferrer" className="btn-whatsapp w-full sm:w-auto">
                <MessageCircle className="h-5 w-5" /> Open WhatsApp Chat
              </a>
              <button
                onClick={() => {
                  clear();
                  setForm(empty);
                  setDone(null);
                }}
                className="btn-outline-gold w-full sm:w-auto"
              >
                Start a New Enquiry
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Enquiry list"
        title="Request a bulk quote"
        sub="Review your selection, specify your requirements, and send directly via WhatsApp with product images and links."
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <h2 className="text-3xl">Selected products</h2>
          {rows.length === 0 ? (
            <div className="mt-6 rounded-lg border border-dashed border-gold/50 bg-card p-10 text-center">
              <p className="text-muted-foreground">
                Your enquiry list is empty. You can still send a general enquiry below.
              </p>
              <Link to="/collections" className="btn-gold mt-5">
                Browse collections
              </Link>
            </div>
          ) : (
            <ul className="mt-6 space-y-4">
              {rows.map(({ p, qty }) => (
                <li key={p.code} className="flex gap-4 rounded-lg bg-card p-3 shadow-card sm:p-4">
                  <Link
                    to="/product/$code"
                    params={{ code: p.code }}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-md sm:h-24 sm:w-24"
                  >
                    <ProductImage src={getProductImages(p.code)[0]} code={p.code} alt={p.name} />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="eyebrow">{p.code}</p>
                        <p className="truncate font-serif text-xl">{p.name}</p>
                      </div>
                      <button
                        onClick={() => remove(p.code)}
                        aria-label={`Remove ${p.name}`}
                        className="p-1 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
                      <div className="flex items-center rounded-md border border-input">
                        <button
                          onClick={() => setQty(p.code, qty - 1)}
                          aria-label="Decrease"
                          className="p-2 hover:text-gold-dark"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={qty}
                          onChange={(e) => setQty(p.code, +e.target.value || 1)}
                          aria-label={`Quantity for ${p.name}`}
                          className="w-16 bg-transparent text-center text-sm focus:outline-none"
                        />
                        <button
                          onClick={() => setQty(p.code, qty + 1)}
                          aria-label="Increase"
                          className="p-2 hover:text-gold-dark"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatINR(p.price)} × {qty} ={" "}
                        <strong className="text-foreground">{formatINR(p.price * qty)}</strong>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
              <li className="rounded-lg bg-ink p-5 text-ink-foreground">
                <div className="flex items-center justify-between">
                  <span>Estimated subtotal ({totalPieces} pcs)</span>
                  <span className="font-serif text-3xl text-gold-light">{formatINR(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-ink-foreground/60">
                  Final quote may vary with quantity discounts, festive customization, GST and delivery.
                </p>
              </li>
            </ul>
          )}
        </section>

        <section className="lg:col-span-2">
          <form onSubmit={onSubmit} className="rounded-lg bg-card p-6 shadow-card">
            <h2 className="text-3xl">Your details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Name *">
                <input
                  required
                  className="field"
                  value={form.name}
                  onChange={set("name")}
                  maxLength={100}
                />
              </Field>
              <Field label="Company">
                <input
                  className="field"
                  value={form.company}
                  onChange={set("company")}
                  maxLength={120}
                />
              </Field>
              <Field label="Phone / WhatsApp *">
                <input
                  required
                  type="tel"
                  placeholder="+91..."
                  pattern="[0-9+\s-]{7,15}"
                  className="field"
                  value={form.phone}
                  onChange={set("phone")}
                />
              </Field>
              <Field label="City">
                <input
                  className="field"
                  value={form.city}
                  onChange={set("city")}
                  maxLength={80}
                />
              </Field>
              <Field label="Required by date">
                <input
                  type="date"
                  className="field"
                  value={form.date}
                  onChange={set("date")}
                />
              </Field>
              <Field label="Total quantity">
                <input
                  type="number"
                  min={1}
                  placeholder={String(totalPieces || "")}
                  className="field"
                  value={form.totalQty}
                  onChange={set("totalQty")}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Customization preference">
                  <select
                    className="field"
                    value={form.customization}
                    onChange={set("customization")}
                  >
                    <option value="standard">Standard Curated Packaging</option>
                    <option value="custom_card">Personalized Greeting Card & Ribbon</option>
                    <option value="bespoke">Full Bespoke Box Curation</option>
                  </select>
                </Field>
              </div>
            </div>

            <div className="mt-4">
              <Field label="Message / Special instructions">
                <textarea
                  rows={4}
                  placeholder="Any specific dry fruit preferences, custom branding requirements, etc."
                  className="field"
                  value={form.message}
                  onChange={set("message")}
                  maxLength={1000}
                />
              </Field>
            </div>

            <div className="mt-6">
              <button type="submit" className="btn-whatsapp w-full !py-3.5 !text-base">
                <MessageCircle className="h-5 w-5" /> Send Enquiry via WhatsApp
              </button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Opens directly in WhatsApp with product images, live links, and requirements.
              </p>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
