import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { categories } from "@/data/products";
import { CONTACT, waLink } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="gold-divider" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/images/logo.png" alt="Corporate Giftings logo" className="w-36 rounded-md" loading="lazy" />
          <p className="mt-4 max-w-xs text-sm text-ink-foreground/70">
            Premium gift hampers, dry fruit and chocolate boxes for Diwali, festivals and corporate occasions.
          </p>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Quick links</h3>
          <ul className="space-y-2 text-sm text-ink-foreground/80">
            <li><Link to="/" className="hover:text-gold-light">Home</Link></li>
            <li><Link to="/collections" className="hover:text-gold-light">Collections</Link></li>
            <li><Link to="/about" className="hover:text-gold-light">About</Link></li>
            <li><Link to="/contact" className="hover:text-gold-light">Contact</Link></li>
            <li><Link to="/enquiry" className="hover:text-gold-light">Enquiry List</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Categories</h3>
          <ul className="space-y-2 text-sm text-ink-foreground/80">
            {categories.map((c) => (
              <li key={c.slug}><Link to="/collections/$category" params={{ category: c.slug }} className="hover:text-gold-light">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Direct Contact</h3>
          <ul className="space-y-3 text-sm text-ink-foreground/80">
            <li>
              <a href={waLink("Hello Corporate Giftings, I'd like to know more about your hampers.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gold-light">
                <MessageCircle className="h-4 w-4 text-whatsapp" />WhatsApp: {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="text-xs text-ink-foreground/65">
              Available on WhatsApp for instant catalog requests, sample inquiries, and bulk quotes.
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/15 py-5 text-center text-xs text-ink-foreground/50">
        © {new Date().getFullYear()} Corporate Giftings. All rights reserved.
      </div>
    </footer>
  );
}
