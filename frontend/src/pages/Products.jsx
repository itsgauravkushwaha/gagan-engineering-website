import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/products"), api.get("/categories")]).then(([p, c]) => {
      setProducts(p.data.products || []);
      setCategories([{ id: "all", name: "All" }, ...(c.data.categories || [])]);
      setLoading(false);
    });
  }, []);

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          overline="// Product Catalogue"
          title="Machinery That Earns Its Keep"
          description="Every machine listed below is built in-house at our Khopoli works — engineered for continuous shift operations and easy serviceability."
        />

        {/* Category filter */}
        <div className="mt-12 flex flex-wrap gap-3" data-testid="products-filter">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.name)}
              data-testid={`filter-${c.id}`}
              className={`mono text-xs tracking-[0.2em] uppercase px-4 py-2 border transition-all ${
                active === c.name
                  ? "bg-[#FF5722] border-[#FF5722] text-white"
                  : "bg-transparent border-white/20 text-white/70 hover:border-[#FF5722] hover:text-[#FF5722]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="mt-20 text-center text-white/40 mono tracking-widest uppercase text-sm">Loading machinery...</div>
        ) : (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="products-grid">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="mt-20 text-center text-white/40 mono tracking-widest uppercase text-sm">No machines in this category yet.</div>
        )}
      </div>
    </div>
  );
}
