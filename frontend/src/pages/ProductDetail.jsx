import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { BUSINESS } from "@/lib/business";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${id}`)
      .then((r) => { setData(r.data); setLoading(false); window.scrollTo(0, 0); })
      .catch(() => { setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#050505] min-h-screen pt-32 flex items-center justify-center text-white/50 mono uppercase tracking-widest text-sm">
        Loading product...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-[#050505] min-h-screen pt-32 px-6 text-center">
        <p className="text-white/60 mb-6">Product not found.</p>
        <Link to="/products" className="btn-primary inline-flex">Back to Products</Link>
      </div>
    );
  }

  const { product, related } = data;

  return (
    <div className="bg-[#050505] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <button
          onClick={() => navigate(-1)}
          data-testid="product-back-btn"
          className="mono text-xs tracking-[0.2em] uppercase text-white/60 hover:text-[#FF5722] flex items-center gap-2 mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative border border-white/10 bg-[#0a0a0a] aspect-square overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" data-testid="product-image" />
            <div className="absolute top-4 left-4 mono text-[10px] tracking-[0.25em] uppercase bg-black/70 backdrop-blur px-3 py-1.5 text-[#FF5722] border border-[#FF5722]/40">
              {product.category}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="tech-label mb-4">// Industrial Machinery</div>
            <h1 className="font-display text-4xl lg:text-6xl text-white tracking-wider uppercase leading-[1.05]" data-testid="product-name">
              {product.name}
            </h1>
            <p className="text-lg text-[#FF5722] mt-4 mono uppercase tracking-wide text-sm" data-testid="product-tagline">{product.tagline}</p>
            <p className="text-white/70 leading-relaxed mt-6 text-base" data-testid="product-description">{product.description}</p>

            {/* Spec Sheet */}
            <div className="mt-10 border border-white/10">
              <div className="bg-[#0a0a0a] px-5 py-3 border-b border-white/10 mono text-[11px] tracking-[0.25em] uppercase text-[#FF5722]">
                ── Specification Sheet
              </div>
              <div className="divide-y divide-white/5" data-testid="product-specs">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-2 px-5 py-3 text-sm">
                    <span className="text-white/50 mono tracking-wider uppercase text-xs">{k}</span>
                    <span className="text-white">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to={`/contact?product=${encodeURIComponent(product.name)}`} className="btn-primary" data-testid="product-quote-btn">
                Request Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={`tel:${BUSINESS.phone}`} className="btn-ghost" data-testid="product-call-btn">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a
                href={`https://wa.me/${BUSINESS.phoneRaw}?text=${encodeURIComponent(`Hi, I'm interested in: ${product.name}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="btn-ghost"
                data-testid="product-whatsapp-btn"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              {["Pan-India delivery", "Installation & training", "1-year warranty", "AMC available"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5722]" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related && related.length > 0 && (
          <div className="mt-32">
            <div className="tech-label mb-4">// Related Machinery</div>
            <h3 className="font-display text-3xl md:text-4xl text-white tracking-wider uppercase mb-10">You may also need</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
