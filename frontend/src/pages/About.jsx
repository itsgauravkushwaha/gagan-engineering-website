import { Link } from "react-router-dom";
import { Award, Users, Wrench, Building2, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { BUSINESS } from "@/lib/business";

const ABOUT_IMG =
  "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwyfHxtZXRhbCUyMHN0ZWVsJTIwbWFudWZhY3R1cmluZyUyMG1hY2hpbmVyeXxlbnwwfHx8fDE3ODIyNzk0Mzh8MA&ixlib=rb-4.1.0&q=85";

const facts = [
  { label: "Established", value: "2006" },
  { label: "Years in Business", value: "19+" },
  { label: "Nature of Firm", value: "Proprietorship" },
  { label: "Annual Turnover", value: "₹40L – ₹1.5 Cr" },
  { label: "Team Size", value: "11–25" },
  { label: "Registration", value: "GST · Sep 2017" },
];

const values = [
  { icon: Wrench, title: "Build It Right", desc: "Hardened steel, true tolerances, and machinery that holds calibration shift after shift." },
  { icon: Users, title: "Know The Customer", desc: "Visit the factory floor first. Specs follow the operator's reality — not a brochure." },
  { icon: Award, title: "Stand Behind It", desc: "If a machine we built ever underperforms, we are the first call — not the last." },
  { icon: Building2, title: "Make In India", desc: "Entirely manufactured in Khopoli, sourcing local steel and supporting Indian fabricators." },
];

export default function About() {
  return (
    <div className="bg-[#050505] min-h-screen pt-28 pb-24 text-white">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/10 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="tech-label mb-4">// About Us</div>
            <h1 className="font-display text-5xl lg:text-7xl text-white tracking-wider uppercase leading-[0.95]">
              Forged in <span className="text-[#FF5722]">Khopoli.</span>
              <br />Trusted across India.
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">
              {BUSINESS.name} began in 2006 as a small workshop on the Mumbai-Pune highway. Today we manufacture
              precision bra cup moulding presses, hydraulic decoilers, and full roll-forming lines used by textile
              factories and steel-building fabricators across the country.
            </p>
            <Link to="/contact" className="btn-primary mt-10" data-testid="about-cta">
              Visit Our Works <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] border border-white/10 overflow-hidden bg-[#0a0a0a]">
              <img src={ABOUT_IMG} alt="Factory floor" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#FF5722] p-6 hidden md:block">
              <div className="font-display text-5xl tracking-wider text-white">19+</div>
              <div className="mono text-[10px] tracking-[0.25em] uppercase text-white/90 mt-1">Years of Engineering</div>
            </div>
          </div>
        </div>
      </section>

      {/* Spec sheet style company facts */}
      <section className="py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader overline="// Company Spec Sheet" title="The Numbers Behind The Workshop" />
          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {facts.map((f) => (
              <div key={f.label} className="bg-[#050505] p-8" data-testid={`about-fact-${f.label.toLowerCase().replace(/ /g, '-')}`}>
                <div className="mono text-[10px] tracking-[0.25em] uppercase text-[#FF5722]">{f.label}</div>
                <div className="mt-3 font-display text-3xl text-white tracking-wider uppercase">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            overline="// How We Work"
            title="Four Rules We Don't Break"
            description="Built over 19 years, these are the operating principles that decide every design choice on the shop floor."
          />
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="industrial-card p-8 lg:p-10" data-testid={`about-value-${v.title.toLowerCase().replace(/ /g, '-')}`}>
                <v.icon className="w-9 h-9 text-[#FF5722]" strokeWidth={1.5} />
                <h3 className="font-display text-2xl tracking-wider uppercase text-white mt-6">{v.title}</h3>
                <p className="text-white/60 leading-relaxed mt-3">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
