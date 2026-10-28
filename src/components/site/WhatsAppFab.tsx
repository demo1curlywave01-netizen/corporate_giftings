import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/contact";

export function WhatsAppFab() {
  return (
    <a
      href={waLink("Hello Corporate Giftings, I'm interested in bulk corporate gifting.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-ink shadow-lift transition-transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
