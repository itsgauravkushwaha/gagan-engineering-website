import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { BUSINESS } from "@/lib/business";
import SectionHeader from "@/components/SectionHeader";

const PRODUCT_OPTIONS = [
  "Double Head Electric Bra Cup Moulding Machine",
  "Bra Cup Fabric Moulding Machine",
  "Foam Bra Cup Moulding Machine",
  "Padded Bra Cup Moulding Machine",
  "10 Tons Hydraulic Decoiler",
  "Automatic Roofing Sheet Crimping Machine",
  "C / Z Purlin Roll Forming Machine",
  "Corrugated Sheets Making Machine",
  "Other / Custom Enquiry",
];

export default function Contact() {
  const [params] = useSearchParams();
  const preset = params.get("product") || "";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    product_interest: preset,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (preset) setForm((f) => ({ ...f, product_interest: preset }));
  }, [preset]);

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.message) {
      toast.error("Please fill in name, email, phone and message.");
      return;
    }
    setSubmitting(true);
    try {
      const r = await api.post("/contact", form);
      toast.success(r.data.message || "Enquiry submitted!");
      setDone(true);
      setForm({ name: "", email: "", phone: "", product_interest: "", message: "" });
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not submit. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-28 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          overline="// Get In Touch"
          title="Let's Build Your Production Line"
          description="Tell us what you need to manufacture, your monthly target, and your floor constraints. We'll come back with a machinery proposal within 24 hours."
        />

        <div className="mt-16 grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={submit} className="industrial-card p-8 lg:p-10 space-y-6" data-testid="contact-form">
              {done && (
                <div className="flex items-start gap-3 bg-[#FF5722]/10 border border-[#FF5722]/40 p-4">
                  <CheckCircle2 className="w-5 h-5 text-[#FF5722] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Enquiry received.</div>
                    <div className="text-sm text-white/60 mt-1">Our team will contact you within 24 hours. For urgent needs, call {BUSINESS.phone}.</div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Full Name" required>
                  <input
                    data-testid="contact-input-name"
                    value={form.name}
                    onChange={handle("name")}
                    type="text"
                    className="industrial-input"
                    placeholder="Rakesh Sharma"
                  />
                </Field>
                <Field label="Phone" required>
                  <input
                    data-testid="contact-input-phone"
                    value={form.phone}
                    onChange={handle("phone")}
                    type="tel"
                    className="industrial-input"
                    placeholder="+91 ..."
                  />
                </Field>
              </div>

              <Field label="Email" required>
                <input
                  data-testid="contact-input-email"
                  value={form.email}
                  onChange={handle("email")}
                  type="email"
                  className="industrial-input"
                  placeholder="you@company.com"
                />
              </Field>

              <Field label="Product Interest">
                <select
                  data-testid="contact-input-product"
                  value={form.product_interest}
                  onChange={handle("product_interest")}
                  className="industrial-input"
                >
                  <option value="">Select a machine (optional)</option>
                  {PRODUCT_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </Field>

              <Field label="Message / Requirements" required>
                <textarea
                  data-testid="contact-input-message"
                  value={form.message}
                  onChange={handle("message")}
                  rows={5}
                  className="industrial-input resize-none"
                  placeholder="Tell us about your factory, monthly target, materials, and any constraints..."
                />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                data-testid="contact-submit-btn"
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : <>Send Enquiry <Send className="w-4 h-4" /></>}
              </button>
              <p className="mono text-[10px] tracking-[0.2em] uppercase text-white/40 text-center">
                Your details stay confidential. No spam, ever.
              </p>
            </form>
          </div>

          {/* Direct contact */}
          <div className="lg:col-span-2 space-y-5">
            <ContactCard
              icon={Phone}
              label="Phone"
              value={BUSINESS.phone}
              href={`tel:${BUSINESS.phone}`}
              testid="contact-direct-phone"
            />
            <ContactCard
              icon={MessageCircle}
              label="WhatsApp"
              value={`Chat: ${BUSINESS.phone}`}
              href={`https://wa.me/${BUSINESS.phoneRaw}`}
              external
              testid="contact-direct-whatsapp"
            />
            <ContactCard
              icon={Mail}
              label="Email"
              value={BUSINESS.email}
              href={`mailto:${BUSINESS.email}`}
              testid="contact-direct-email"
            />
            <ContactCard
              icon={MapPin}
              label="Visit Our Works"
              value={BUSINESS.address}
              testid="contact-direct-address"
            />

            <div className="industrial-card overflow-hidden">
              <iframe
                title="Gagan Engineering Works Location"
                src="https://maps.google.com/maps?q=Khopoli%2C%20Maharashtra%20410203&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-64 grayscale contrast-125"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mono text-[10px] tracking-[0.25em] uppercase text-[#FF5722]">
        {label} {required && <span className="text-white/60">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ContactCard({ icon: Icon, label, value, href, external, testid }) {
  const inner = (
    <div className="industrial-card p-5 flex items-start gap-4 group">
      <div className="w-11 h-11 bg-[#FF5722]/10 border border-[#FF5722]/30 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#FF5722]" />
      </div>
      <div>
        <div className="mono text-[10px] tracking-[0.25em] uppercase text-white/50">{label}</div>
        <div className="text-white mt-1 group-hover:text-[#FF5722] transition-colors text-sm leading-relaxed">{value}</div>
      </div>
    </div>
  );
  if (!href) return <div data-testid={testid}>{inner}</div>;
  return (
    <a
      href={href}
      data-testid={testid}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}
