import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Cog, Factory, Star } from "lucide-react";
import { api } from "@/lib/api";
import { BUSINESS } from "@/lib/business";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";

const HERO_IMG =
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwyfHx3ZWxkaW5nJTIwd29ya2VyJTIwbWFudWZhY3R1cmluZ3xlbnwwfHx8fDE3ODIyNzk0Mzh8MA&ixlib=rb-4.1.0&q=85";

const stats = [
  { value: "19+", label: "Years of Engineering" },
  { value: "08", label: "Machine Models" },
  { value: "11–25", label: "Skilled Workforce" },
  { value: "4.0★", label: "IndiaMART Rating" },
];

const capabilities = [
  { icon: Cog, title: "Custom Engineering", desc: "Machines tuned to your factory's exact production specs." },
  { icon: ShieldCheck, title: "Heavy-Duty Build", desc: "Hardened steel, industrial PLC controls, multi-year service life." },
  { icon: Factory, title: "On-Site Support", desc: "Pan-India installation, training, AMC, and spare parts." },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get("/products/featured").then((r) => setFeatured(r.data.products || []));
  }, []);

  return (
    <div className="bg-[#050505] text-white">
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-end overflow-hidden grain-overlay" data-testid="hero-section">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/30" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-32 w-full">
          <div className="mono text-[11px] tracking-[0.3em] uppercase text-[#FF5722] mb-6 reveal-up">
            ── Khopoli, Maharashtra · Estd. 2006
          </div>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white tracking-wider uppercase leading-[0.95] reveal-up max-w-5xl" style={{ animationDelay: "0.1s" }}>
            Heavy<br />
            <span className="text-[#FF5722]">Machinery.</span><br />
            Precision Built.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/70 leading-relaxed reveal-up" style={{ animationDelay: "0.2s" }}>
            Gagan Engineering Works manufactures industrial moulding, decoiling, and roll-forming machinery
            trusted by lingerie OEMs, roofing fabricators, and pre-engineered building firms across India.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 reveal-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/products" className="btn-primary" data-testid="hero-cta-products">
              Explore Machines <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-ghost" data-testid="hero-cta-quote">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((s) => (
            <div key={s.label} className="py-10 px-6 first:pl-0">
              <div className="font-display text-4xl md:text-5xl text-[#FF5722] tracking-wider">{s.value}</div>
              <div className="mono text-[10px] tracking-[0.25em] uppercase text-white/60 mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="// What We Deliver"
            title="Engineering For The Factory Floor"
            description="Three commitments that have anchored our work for the last 19 years."
          />
          <div className="mt-16 grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-[#050505] p-10 hover:bg-[#0a0a0a] transition-colors" data-testid={`capability-${c.title.toLowerCase().replace(/ /g, '-')}`}>
                <c.icon className="w-10 h-10 text-[#FF5722]" strokeWidth={1.5} />
                <h3 className="font-display text-2xl tracking-wider uppercase text-white mt-6">{c.title}</h3>
                <p className="text-white/60 mt-3 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 lg:py-32 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <SectionHeader
              overline="// Our Machinery"
              title="Built To Run. Built To Last."
              description="From moulding presses for lingerie production to roll-forming lines for steel buildings — every machine is engineered for non-stop industrial duty."
            />
            <Link to="/products" className="btn-ghost shrink-0" data-testid="home-view-all-products">
              All Machines <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-8 bg-[#FF5722] overflow-hidden border-y border-[#E64A19]">
        <div className="marquee-track flex gap-12 whitespace-nowrap font-display text-3xl tracking-wider uppercase text-white">
          {Array(2).fill(null).map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              <span>Bra Cup Moulding</span><span>·</span>
              <span>Roll Forming</span><span>·</span>
              <span>Hydraulic Decoilers</span><span>·</span>
              <span>Crimping Machines</span><span>·</span>
              <span>Made In India</span><span>·</span>
              <span>Since 2006</span><span>·</span>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL / TRUST */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="industrial-card p-10 lg:p-16">
            <div className="flex items-center gap-1 mb-6">
              {Array(5).fill(null).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FF5722] text-[#FF5722]" />
              ))}
              <span className="mono text-xs tracking-[0.2em] uppercase text-white/60 ml-3">
                {BUSINESS.rating} / 5 on IndiaMART · {BUSINESS.reviewCount} reviews
              </span>
            </div>
            <blockquote className="font-display text-2xl md:text-4xl text-white tracking-wider leading-[1.2] uppercase">
              "The machines we received exceeded expectations. Solid build, sharp tolerances,
              and the after-sales support has been outstanding."
            </blockquote>
            <div className="mt-8 mono text-xs tracking-[0.2em] uppercase text-white/40">
              — Verified buyer · Mumbai
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-[#080808] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <div className="tech-label mb-4">// Ready When You Are</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase">
            Tell us what you need to build.
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            Share your production target, material specs, and floor plan. Our engineers will quote a machine that fits — no jargon, no inflated promises.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary" data-testid="home-cta-contact">
              Request Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`tel:${BUSINESS.phone}`} className="btn-ghost" data-testid="home-cta-call">
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
