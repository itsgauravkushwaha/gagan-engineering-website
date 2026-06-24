import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/85 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <Link to="/" data-testid="navbar-logo" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#FF5722] flex items-center justify-center font-display text-2xl text-white">
            G
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl text-white tracking-wider">GAGAN</div>
            <div className="mono text-[10px] tracking-[0.25em] text-[#FF5722] uppercase">Engineering Works</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `relative text-sm tracking-wider uppercase font-medium transition-colors ${
                  isActive ? "text-[#FF5722]" : "text-white/80 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${BUSINESS.phone}`}
            data-testid="navbar-call-btn"
            className="btn-primary"
          >
            <Phone className="w-4 h-4" /> Call Now
          </a>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          data-testid="navbar-mobile-toggle"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div data-testid="navbar-mobile-menu" className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-base tracking-wider uppercase font-medium ${
                    isActive ? "text-[#FF5722]" : "text-white/80"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a href={`tel:${BUSINESS.phone}`} className="btn-primary justify-center mt-2" data-testid="navbar-mobile-call">
              <Phone className="w-4 h-4" /> Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
