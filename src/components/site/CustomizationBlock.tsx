import { BadgePercent, Gift, Mail } from "lucide-react";

const items = [
  { icon: Gift, title: "Bespoke Hamper Curation", text: "Custom combinations of dry fruits, sweets and keepsakes tailored to your budget." },
  { icon: Mail, title: "Custom greeting cards", text: "Personalised messages for every recipient." },
  { icon: BadgePercent, title: "Bulk discounts", text: "Volume savings and tiered pricing available on festive orders." },
];

export function CustomizationBlock() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {items.map(({ icon: Icon, title, text }) => (
        <div key={title} className="rounded-lg border border-gold/30 bg-card p-6 text-center shadow-card">
          <Icon className="mx-auto h-8 w-8 text-gold" />
          <h3 className="mt-3 text-2xl">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{text}</p>
        </div>
      ))}
    </div>
  );
}
