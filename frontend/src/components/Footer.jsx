import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Factory } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#FF5722] flex items-center justify-center font-display text-3xl text-white">G</div>
              <div>
                <div className="font-display text-2xl text-white tracking-wider">GAGAN ENGINEERING</div>
                <div className="mono text-[10px] tracking-[0.25em] text-[#FF5722] uppercase">Works · Est. 2006</div>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed max-w-md">
              Designing & manufacturing precision industrial machinery for bra cup moulding, roll forming,
              decoiling, and sheet metal applications since 2006. Made in Khopoli, India.
            </p>
            <div className="mt-6 flex items-center gap-4 mono text-[11px] tracking-[0.2em] uppercase text-white/40">
              <span className="flex items-center gap-2"><Factory className="w-3.5 h-3.5 text-[#FF5722]" /> ISO Standards</span>
              <span>·</span>
              <span>GST Registered</span>
            </div>
          </div>

          <div>
            <h4 className="mono text-[11px] tracking-[0.3em] uppercase text-[#FF5722] mb-5">Navigate</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link to="/" className="hover:text-[#FF5722] transition-colors" data-testid="footer-link-home">Home</Link></li>
              <li><Link to="/products" className="hover:text-[#FF5722] transition-colors" data-testid="footer-link-products">Products</Link></li>
              <li><Link to="/about" className="hover:text-[#FF5722] transition-colors" data-testid="footer-link-about">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#FF5722] transition-colors" data-testid="footer-link-contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mono text-[11px] tracking-[0.3em] uppercase text-[#FF5722] mb-5">Reach Out</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-[#FF5722] shrink-0" />
                <a href={`tel:${BUSINESS.phone}`} className="hover:text-white" data-testid="footer-phone">{BUSINESS.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-[#FF5722] shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-white break-all" data-testid="footer-email">{BUSINESS.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-[#FF5722] shrink-0" />
                <span data-testid="footer-address">{BUSINESS.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 mono text-[11px] tracking-[0.2em] uppercase text-white/40">
          <span>© {new Date().getFullYear()} Gagan Engineering Works. All Rights Reserved.</span>
          <span>Built in Khopoli · Maharashtra · India</span>
        </div>
      </div>
    </footer>
  );
}
