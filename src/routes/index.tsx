import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Sparkles, Layers, Package, Printer, Shield, Truck, Award,
  Leaf, Clock, Users, Building2, Factory, Phone, Mail, MapPin, MessageCircle,
  CheckCircle2, Zap, Box, FileText, Tag, BookOpen, Calendar, Newspaper,
  PaintBucket, Cpu, Scissors, Maximize2,
} from "lucide-react";

const img16 = { url: "/facility/production-floor.jpg" };
const img17 = { url: "/facility/six-color-mitsubishi.jpeg" };
const img18 = { url: "/facility/ctp-unit.jpeg" };
const img19 = { url: "/facility/designing-unit.jpeg" };
const img20 = { url: "/facility/folding-machine.jpeg" };
const img20a = { url: "/facility/pasting-machine.jpeg" };
const img20b = { url: "/facility/die-cutting-machine.jpeg" };
const img21 = { url: "/facility/quality-control.jpeg" };
const img22 = { url: "/facility/single-color-unit.jpeg" };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sri Ambal Print Pack — Premium Printing & Packaging Solutions" },
      { name: "description", content: "16+ years of excellence in commercial printing, packaging, cartons, brochures and brand communication. 20,000+ sq ft facility in Tamil Nadu." },
      { property: "og:title", content: "Sri Ambal Print Pack" },
      { property: "og:description", content: "Transforming ideas into premium print experiences." },
      { property: "og:image", content: img16.url },
    ],
  }),
  component: Home,
});

/* ---------- shared bits ---------- */

function useMagnetic() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
  return ref;
}

function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / (duration * 1000), 1);
        setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono uppercase tracking-[0.2em] text-cyan">
      <span className="size-1.5 rounded-full bg-cyan animate-pulse-glow" />
      {children}
    </div>
  );
}

/* ---------- Nav ---------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    ["About", "#about"], ["Services", "#services"], ["Facility", "#facility"],
    ["Machinery", "#machinery"], ["Products", "#products"], ["Contact", "#contact"],
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-7xl px-6 ${scrolled ? "glass-strong rounded-2xl" : ""} transition-all`}>
        <div className="flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="relative size-9 rounded-lg bg-gradient-to-br from-cyan to-purple flex items-center justify-center">
              <Sparkles className="size-4 text-background" strokeWidth={2.5} />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan to-purple blur-lg opacity-50 group-hover:opacity-80 transition" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-sm tracking-tight">SRI AMBAL</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Print Pack</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {links.map(([l, h]) => (
              <a key={h} href={h} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
            ))}
          </nav>
          <a href="#contact" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:scale-[1.03] transition">
            Get a Quote <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-background)_80%)]" />

      {/* floating orbs */}
      <motion.div style={{ y }} className="absolute top-1/4 right-[10%] size-72 rounded-full bg-cyan/20 blur-3xl animate-float" />
      <motion.div style={{ y }} className="absolute bottom-1/4 left-[8%] size-96 rounded-full bg-purple/20 blur-3xl animate-float" />

      <motion.div style={{ opacity }} className="relative mx-auto max-w-7xl px-6 w-full">
        <Reveal>
          <SectionLabel>Est. 2009 · Tamil Nadu, India</SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.02] tracking-tight max-w-5xl">
            Transforming ideas into{" "}
            <span className="text-gradient">premium print</span>{" "}
            experiences.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            16+ years of excellence in commercial printing, packaging & brand communication —
            engineered inside a 20,000 sq ft precision manufacturing facility.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-cyan to-purple text-background font-semibold hover:shadow-[var(--shadow-glow)] transition-all">
              Request a Quote
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass-strong font-medium hover:bg-white/10 transition">
              Explore Services
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden glass">
            {[
              { v: 16, s: "+", l: "Years of Excellence" },
              { v: 20000, s: "+", l: "Sq Ft Facility" },
              { v: 70, s: "+", l: "Skilled Professionals" },
              { v: 5000, s: "+", l: "Projects Delivered" },
            ].map((s) => (
              <div key={s.l} className="bg-background/60 backdrop-blur p-6 lg:p-8">
                <div className="text-3xl lg:text-5xl font-display font-bold text-gradient">
                  <Counter to={s.v} suffix={s.s} />
                </div>
                <div className="mt-2 text-xs lg:text-sm font-mono uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}

/* ---------- Marquee ---------- */

function Marquee() {
  const items = ["Banking", "Corporate", "Government", "Healthcare", "Education", "Retail", "Export Houses", "Textile", "Manufacturing"];
  const row = [...items, ...items];
  return (
    <section className="border-y border-border py-8 overflow-hidden bg-card/30">
      <div className="flex gap-14 animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-14 text-2xl font-display font-medium text-muted-foreground">
            {t}
            <span className="size-1.5 rounded-full bg-cyan" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- About / Timeline ---------- */

function About() {
  const milestones = [
    { y: "2009", t: "Founded", d: "Sri Ambal Print Pack established with a vision for premium print quality." },
    { y: "2013", t: "Facility Expansion", d: "Moved into a dedicated manufacturing unit, scaling output 4×." },
    { y: "2017", t: "Six-Color Press", d: "Installed Mitsubishi six-color offset for export-grade colour fidelity." },
    { y: "2020", t: "Digital CTP", d: "Adopted Computer-to-Plate workflow for zero-defect pre-press." },
    { y: "2024", t: "20,000+ Sq Ft", d: "Full-stack facility — printing, packaging, finishing, logistics under one roof." },
  ];

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>The Story</SectionLabel>
          <h2 className="mt-6 text-4xl lg:text-6xl font-bold max-w-3xl leading-[1.05]">
            A craft refined over <span className="text-gradient-gold">sixteen years</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            From a single press to a fully integrated industrial facility — every chapter has been
            written in ink, paper and precision engineering.
          </p>
        </Reveal>

        <div className="mt-20 relative">
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan/40 to-transparent" />
          {milestones.map((m, i) => (
            <Reveal key={m.y} delay={i * 0.08}>
              <div className={`relative grid lg:grid-cols-2 gap-8 py-10 ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
                <div className={`pl-12 lg:pl-0 ${i % 2 ? "lg:pr-16 lg:text-right" : "lg:pl-16"} [direction:ltr]`}>
                  <div className="font-mono text-sm text-cyan tracking-widest">{m.y}</div>
                  <div className="mt-2 text-2xl font-display font-semibold">{m.t}</div>
                  <p className="mt-3 text-muted-foreground max-w-md">{m.d}</p>
                </div>
                <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 top-12 size-4 rounded-full bg-background border-2 border-cyan glow-cyan" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

function Services() {
  const cats = [
    { icon: Package, t: "Packaging Solutions", d: "Cartons, medicine boxes, food packaging, garment boxes & paper bags.", tags: ["Cartons", "Medicine Boxes", "Garment", "Paper Bags"] },
    { icon: BookOpen, t: "Commercial Printing", d: "Brochures, catalogues, annual reports, manuals & directories.", tags: ["Brochures", "Catalogues", "Reports", "Books"] },
    { icon: Tag, t: "Labels & Identity", d: "Wash care labels, stickers, price tags, barcodes & certificates.", tags: ["Labels", "Stickers", "Barcodes", "Tags"] },
    { icon: FileText, t: "Business Stationery", d: "Letterheads, visiting cards, business forms & invitations.", tags: ["Letterheads", "Cards", "Forms"] },
    { icon: Newspaper, t: "Marketing Material", d: "Flyers, folders, posters & full advertising collateral.", tags: ["Flyers", "Posters", "Folders"] },
    { icon: Calendar, t: "Calendars & Specials", d: "Wall and desk calendars, premium gifting print collateral.", tags: ["Calendars", "Premium"] },
  ];
  return (
    <section id="services" className="relative py-32 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Capabilities</SectionLabel>
              <h2 className="mt-6 text-4xl lg:text-6xl font-bold max-w-2xl leading-[1.05]">
                Every surface. Every format. <span className="text-gradient">Print, mastered.</span>
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Six core verticals running on industrial-grade equipment — built for both
              boutique runs and bulk export volumes.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cats.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.06}>
              <div className="group relative h-full p-8 rounded-2xl glass hover-lift overflow-hidden">
                <div className="absolute -top-20 -right-20 size-48 rounded-full bg-gradient-to-br from-cyan/20 to-purple/20 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
                <div className="relative">
                  <div className="size-12 rounded-xl bg-gradient-to-br from-cyan/20 to-purple/20 flex items-center justify-center border border-white/10">
                    <c.icon className="size-5 text-cyan" />
                  </div>
                  <h3 className="mt-6 text-2xl font-display font-semibold">{c.t}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{c.d}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-muted-foreground border border-white/5">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Facility / Departments ---------- */

function Facility() {
  const depts = [
  { img: img16.url, t: "Production Floor", d: "20,000 sq ft of integrated manufacturing." },

  { img: img17.url, t: "Six Color Mitsubishi", d: "Export-grade offset colour fidelity." },

  { img: img18.url, t: "CTP Unit", d: "Computer-to-Plate digital pre-press." },

  { img: img19.url, t: "Designing Unit", d: "In-house creative & artwork team." },

  { img: img20.url, t: "Folding Machine", d: "High-speed Pratham folding line." },

  { img: img20a.url, t: "Pasting Machine", d: "Automated carton & box pasting." },

  { img: img20b.url, t: "Die Cutting", d: "Protek precision cutting systems." },

{ img: img21.url, t: "Quality Control", d: "Every sheet, every batch, inspected." },

{ img: img22.url, t: "Single Color Unit", d: "Ikegai Color Metal Perle 127 press." },
];
return (
    <section id="facility" className="relative py-32 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>The Facility</SectionLabel>
          <h2 className="mt-6 text-4xl lg:text-6xl font-bold max-w-3xl leading-[1.05]">
            Behind every print is <span className="text-gradient">precision engineering</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {depts.map((d, i) => (
            <Reveal key={d.t} delay={(i % 3) * 0.08}>
              <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden glass">
                <img src={d.img} alt={d.t} loading="lazy" className="absolute inset-0 size-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-[1.2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="font-mono text-xs text-cyan tracking-widest">DEPT · 0{i + 1}</div>
                  <h3 className="mt-2 text-2xl font-display font-semibold">{d.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d.d}</p>
                </div>
                <div className="absolute top-4 right-4 size-10 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Maximize2 className="size-4" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Machinery ---------- */

function Machinery() {
  const machines = [
    { img: img20b.url, name: "Mitsubishi Six-Color Offset", spec: "Up to 16,000 sheets/hr · CMYK + 2 special", icon: Printer },
    { img: img21.url, name: "Ikegai Single-Color Press", spec: "Perle 127 · spot colour precision", icon: Layers },
    { img: img22.url, name: "Computer-to-Plate", spec: "Thermal CTP · zero-defect pre-press", icon: Cpu },
    { img: img17.url, name: "Pratham Folding Line", spec: "Automatic high-speed folder", icon: Box },
    { img: img18.url, name: "Auto Pasting Machine", spec: "Carton & box folder-gluer", icon: PaintBucket },
    { img: img20.url, name: "Proteck Die Cutter", spec: "Precision die cutting · XC series", icon: Scissors },
  ];
  return (
    <section id="machinery" className="relative py-32 px-6 border-t border-border bg-card/20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Machinery</SectionLabel>
          <h2 className="mt-6 text-4xl lg:text-6xl font-bold max-w-3xl leading-[1.05]">
            Industrial-grade hardware. <span className="text-gradient-gold">Operator-level craft.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-5">
          {machines.map((m, i) => (
            <Reveal key={m.name} delay={(i % 2) * 0.1}>
              <div className="group relative grid sm:grid-cols-5 gap-0 rounded-2xl glass overflow-hidden hover-lift">
                <div className="sm:col-span-2 relative aspect-[4/3] sm:aspect-auto overflow-hidden">
                  <img src={m.img} alt={m.name} loading="lazy" className="absolute inset-0 size-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/40" />
                </div>
                <div className="sm:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 font-mono text-xs text-cyan tracking-widest">
                    <m.icon className="size-3.5" />
                    UNIT · 0{i + 1}
                  </div>
                  <h3 className="mt-3 text-xl lg:text-2xl font-display font-semibold leading-tight">{m.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{m.spec}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Products gallery ---------- */

function Products() {
  const items = [
  { img: "/facility/premium-cartons.png", t: "Premium Cartons" },
  { img: "/facility/visiting-cards.jpg", t: "Visiting Cards" },
  { img: "/facility/brochures.png", t: "Brochures" },
  { img: "/facility/labels-tags.png", t: "Labels & Tags" },
  { img: "/facility/catalogues.avif", t: "Catalogues" },
  { img: "/facility/calendars.webp", t: "Calendars" },
  { img: "/facility/folders.jpg", t: "Folders" },
  { img: "/facility/posters.webp", t: "Posters" },
  ];
  return (
    <section id="products" className="relative py-32 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Product Showcase</SectionLabel>
          <h2 className="mt-6 text-4xl lg:text-6xl font-bold max-w-3xl leading-[1.05]">
            What we deliver, by the millions.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className={`group relative size-full rounded-2xl overflow-hidden ${it.span}`}>
                <img src={it.img} alt={it.t} loading="lazy" className="absolute inset-0 size-full object-cover group-hover:scale-110 transition duration-[1.2s]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-display text-lg font-semibold">{it.t}</div>
                </div>
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why us ---------- */

function WhyUs() {
  const features = [
    { i: Clock, t: "16+ Years Experience", d: "Decades of refined process & client trust." },
    { i: Cpu, t: "Advanced Technology", d: "CTP, six-color offset, automated finishing." },
    { i: Leaf, t: "Green Printing", d: "Soy-based inks & responsible material sourcing." },
    { i: Shield, t: "Quality Assurance", d: "Multi-stage QC on every job, every batch." },
    { i: Zap, t: "Fast Turnaround", d: "Same-week dispatch on most commercial runs." },
    { i: Factory, t: "Bulk Capacity", d: "Built for high-volume corporate & export jobs." },
    { i: Award, t: "Custom Packaging", d: "Structural design + premium finishing in-house." },
    { i: Users, t: "Design Team", d: "Creative direction from concept to dispatch." },
    { i: Truck, t: "Nationwide Delivery", d: "Logistics partners across India." },
  ];
  return (
    <section className="relative py-32 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Why Sri Ambal</SectionLabel>
          <h2 className="mt-6 text-4xl lg:text-6xl font-bold max-w-3xl leading-[1.05]">
            Nine reasons brands stay <span className="text-gradient">for decades</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden">
          {features.map((f, i) => (
            <div key={f.t} className="bg-background p-8 group hover:bg-card transition-colors">
              <div className="size-11 rounded-xl glass flex items-center justify-center">
                <f.i className="size-5 text-cyan" />
              </div>
              <div className="mt-5 flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h3 className="mt-3 text-xl font-display font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

function Process() {
  const steps = ["Consultation", "Design", "Pre-Press", "Printing", "Finishing", "Quality Control", "Packaging", "Delivery"];
  return (
    <section className="relative py-32 px-6 border-t border-border bg-card/20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>The Process</SectionLabel>
          <h2 className="mt-6 text-4xl lg:text-6xl font-bold max-w-3xl leading-[1.05]">
            Eight stages. One uncompromising standard.
          </h2>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s} delay={i * 0.05}>
              <div className="relative p-6 rounded-2xl glass hover-lift">
                <div className="text-5xl font-display font-bold text-gradient">0{i + 1}</div>
                <div className="mt-4 text-lg font-semibold">{s}</div>
                <div className="mt-4 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan to-purple" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Clients ---------- */

function Clients() {
  const logos = ["BANKING CO.", "TEXTRA EXPORTS", "MEDIPAK", "FORMARK", "AGRITEX", "URBAN RETAIL", "GOV. INDIA", "EDUWORLD", "PHARMACORE", "WEAVE & CO"];
  const row = [...logos, ...logos];
  return (
    <section className="relative py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl text-center">
        <Reveal>
          <SectionLabel>Clients</SectionLabel>
          <h2 className="mt-6 text-3xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight">
            Trusted by leading brands across India.
          </h2>
        </Reveal>
      </div>
      <div className="mt-14 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {row.map((l, i) => (
            <div key={i} className="px-8 py-5 rounded-xl glass font-display font-semibold text-muted-foreground hover:text-foreground transition">
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

function Testimonials() {
  const t = [
    { q: "Sri Ambal delivered our entire annual report run two days ahead of schedule. The colour fidelity was the best we've seen.", n: "Procurement Head", c: "Leading Bank, Coimbatore" },
    { q: "Their packaging unit handled our medicine box rollout across three states. Zero rejections. That speaks for itself.", n: "Operations Director", c: "Pharma Group" },
    { q: "From design consultation to final dispatch, everything felt engineered. Easily our most reliable print partner.", n: "Marketing Lead", c: "Export House, Tirupur" },
  ];
  return (
    <section className="relative py-32 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-6 text-4xl lg:text-6xl font-bold max-w-3xl leading-[1.05]">
            Words from the people we print for.
          </h2>
        </Reveal>
        <div className="mt-16 grid lg:grid-cols-3 gap-5">
          {t.map((x, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="h-full p-8 rounded-2xl glass-strong relative overflow-hidden">
                <div className="absolute -top-10 -left-6 text-[140px] font-display text-cyan/20 leading-none">"</div>
                <p className="relative text-lg leading-relaxed">{x.q}</p>
                <div className="relative mt-8 pt-6 border-t border-border">
                  <div className="font-semibold">{x.n}</div>
                  <div className="text-sm text-muted-foreground">{x.c}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  const btnRef = useMagnetic();
  return (
    <section id="contact" className="relative py-32 px-6 border-t border-border overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] rounded-full bg-gradient-to-br from-cyan/10 to-purple/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-12">
        <div>
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="mt-6 text-4xl lg:text-6xl font-bold leading-[1.05]">
            Let's print <span className="text-gradient">something remarkable</span>.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">
            Tell us about your project. Our team responds within one business day with a tailored quote and timeline.
          </p>

          <div className="mt-10 space-y-5">
            {[
              { i: Building2, t: "Coimbatore Office", d: "Tamil Nadu, India" },
              { i: Factory, t: "Factory", d: "Sathyamangalam, Erode District" },
              { i: Phone, t: "Call", d: "+91 83000 52222  ·  +91 83000 62222" },
              { i: Mail, t: "Email", d: "sriambalprinpack52222@gmail.com" },
            ].map((c) => (
              <div key={c.t} className="flex items-start gap-4">
                <div className="size-11 rounded-xl glass flex items-center justify-center shrink-0">
                  <c.i className="size-5 text-cyan" />
                </div>
                <div>
                  <div className="text-sm font-mono uppercase tracking-wider text-muted-foreground">{c.t}</div>
                  <div className="mt-1 font-medium">{c.d}</div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/918300052222"
            target="_blank" rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-black font-semibold hover:scale-[1.03] transition"
          >
            <MessageCircle className="size-4" /> WhatsApp Us
          </a>
        </div>

        <div className="p-8 lg:p-10 rounded-3xl glass-strong">
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Thanks — we'll reach out within 1 business day."); }}>
            {[
              { l: "Name", t: "text", p: "Your name" },
              { l: "Email", t: "email", p: "you@company.com" },
              { l: "Phone", t: "tel", p: "+91 ..." },
            ].map((f) => (
              <div key={f.l}>
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{f.l}</label>
                <input required type={f.t} placeholder={f.p}
                  className="mt-2 w-full px-4 py-3.5 rounded-xl bg-background/60 border border-border focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20 transition" />
              </div>
            ))}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Service</label>
              <select className="mt-2 w-full px-4 py-3.5 rounded-xl bg-background/60 border border-border focus:border-cyan focus:outline-none transition">
                <option>Packaging</option><option>Commercial Printing</option><option>Labels</option>
                <option>Brochures & Catalogues</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Project Details</label>
              <textarea rows={4} placeholder="Tell us about your project, quantities, timeline..."
                className="mt-2 w-full px-4 py-3.5 rounded-xl bg-background/60 border border-border focus:border-cyan focus:outline-none transition resize-none" />
            </div>
            <div ref={btnRef}>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-cyan to-purple text-background font-semibold hover:shadow-[var(--shadow-glow)] transition">
                Send Inquiry <ArrowRight className="size-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center inline-flex items-center justify-center gap-1.5 w-full">
              <CheckCircle2 className="size-3.5 text-cyan" /> We reply within 1 business day.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-16 bg-card/30">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-lg bg-gradient-to-br from-cyan to-purple flex items-center justify-center">
                <Sparkles className="size-4 text-background" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <div className="font-display font-bold tracking-tight">SRI AMBAL PRINT PACK</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Est. 2009</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground max-w-sm">
              Premium printing, packaging and brand communication solutions —
              engineered in Tamil Nadu, shipped across India.
            </p>
          </div>

          {[
            { t: "Services", l: ["Packaging", "Commercial Print", "Labels", "Brochures", "Calendars"] },
            { t: "Industries", l: ["Banking", "Healthcare", "Government", "Textile", "Export"] },
            { t: "Company", l: ["About", "Facility", "Machinery", "Contact"] },
          ].map((g) => (
            <div key={g.t}>
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{g.t}</div>
              <ul className="mt-4 space-y-2.5">
                {g.l.map((x) => (
                  <li key={x}><a href="#" className="text-sm hover:text-cyan transition-colors">{x}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Sri Ambal Print Pack. All rights reserved.</div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="size-3.5 text-cyan" /> Coimbatore · Sathyamangalam · Erode
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

function Home() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Facility />
      <Machinery />
      <Products />
      <WhyUs />
      <Process />
      <Clients />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
