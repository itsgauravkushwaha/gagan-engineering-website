import { Phone, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3" data-testid="floating-cta">
      <a
        href={`https://wa.me/${BUSINESS.phoneRaw}?text=Hi%20Gagan%20Engineering%2C%20I%20would%20like%20to%20enquire%20about%20your%20machinery.`}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="floating-whatsapp"
        className="w-14 h-14 bg-[#25D366] flex items-center justify-center text-white pulse-whatsapp hover:scale-110 transition-transform shadow-xl rounded-sm"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
      <a
        href={`tel:${BUSINESS.phone}`}
        data-testid="floating-call"
        className="w-14 h-14 bg-[#FF5722] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-xl rounded-sm"
        aria-label="Call"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
