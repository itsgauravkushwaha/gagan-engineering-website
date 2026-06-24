import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product, index = 0 }) {
  return (
    <Link
      to={`/products/${product.id}`}
      data-testid={`product-card-${product.id}`}
      className="industrial-card group flex flex-col overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0f0f0f]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
        <div className="absolute top-3 left-3 mono text-[10px] tracking-[0.2em] uppercase bg-black/70 backdrop-blur px-2 py-1 text-[#FF5722] border border-[#FF5722]/30">
          {product.category}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display text-xl text-white tracking-wider leading-tight uppercase">
          {product.name}
        </h3>
        <p className="text-sm text-white/60 mt-2 leading-relaxed line-clamp-2">{product.tagline}</p>
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="mono text-[11px] tracking-[0.25em] uppercase text-[#FF5722]">View Specs</span>
          <ArrowRight className="w-4 h-4 text-[#FF5722] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
