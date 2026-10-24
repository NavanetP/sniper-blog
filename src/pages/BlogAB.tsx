import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Share2,
  Tag,
  User,
  Layers,
  Cpu,
  Users,
  Shield,
  Settings,
  RefreshCw,
  GraduationCap,
  HeartHandshake,
  Palette,
  Video,
  Image,
  FileText,
} from "lucide-react";
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────────────────
// READING PROGRESS
// ─────────────────────────────────────────────────────────
const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#1d1d1f] z-[9999] origin-left"
    />
  );
};

// ─────────────────────────────────────────────────────────
// WHITE CURTAIN
// ─────────────────────────────────────────────────────────
const WhiteScreenTransition = ({ onComplete }: { onComplete: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(ref.current, { yPercent: -105, duration: 0.9, ease: "power3.inOut", delay: 0.2, onComplete });
  }, []);
  return <div ref={ref} className="fixed inset-0 bg-white z-[9998] will-change-transform" />;
};

// ─────────────────────────────────────────────────────────
// FADE UP
// ─────────────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease, delay }}>
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────
// PROSE
// ─────────────────────────────────────────────────────────
const Prose = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`text-[17px] leading-[1.78] text-[#3d3d3f] ${className}`}>{children}</div>
);

// ─────────────────────────────────────────────────────────
// CALLOUT
// ─────────────────────────────────────────────────────────
const Callout = ({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "tip" | "warning" }) => {
  const styles = {
    info:    "bg-[#f5f5f7] border-l-4 border-[#1d1d1f] text-[#1d1d1f]",
    tip:     "bg-[#f0fdf4] border-l-4 border-[#16a34a] text-[#15803d]",
    warning: "bg-[#fffbeb] border-l-4 border-[#d97706] text-[#92400e]",
  };
  return (
    <div className={`rounded-r-xl px-6 py-5 my-8 ${styles[type]}`}>
      <div className="text-[15px] leading-relaxed font-medium">{children}</div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// SECTION HEADING
// ─────────────────────────────────────────────────────────
const SectionHeading = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <FadeUp>
    <h2 id={id} className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#1d1d1f] leading-tight mt-16 mb-6 scroll-mt-24">
      {children}
    </h2>
  </FadeUp>
);

// ─────────────────────────────────────────────────────────
// CHECK ITEM
// ─────────────────────────────────────────────────────────
const CheckItem = ({ children, inView, delay = 0 }: { children: React.ReactNode; inView: boolean; delay?: number }) => (
  <motion.li
    className="flex items-start gap-3 text-[15px] sm:text-[16px] text-[#3d3d3f]"
    initial={{ opacity: 0, x: -12 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.45, ease, delay }}
  >
    <CheckCircle2 className="w-[18px] h-[18px] text-[#1d1d1f] mt-0.5 flex-shrink-0" />
    <span>{children}</span>
  </motion.li>
);

// ─────────────────────────────────────────────────────────
// COMPARISON TABLE
// ─────────────────────────────────────────────────────────
const ComparisonTable = ({ inView }: { inView: boolean }) => {
  const rows = [
    { feature: "Creative applications",                   standard: "20+ apps",     pro: "20+ apps" },
    { feature: "Desktop, web and mobile access",          standard: "✓",             pro: "✓" },
    { feature: "Monthly generative credits",              standard: "200",           pro: "4,000" },
    { feature: "Standard generative AI features",         standard: "Metered",       pro: "Unlimited" },
    { feature: "Cloud storage per user",                  standard: "100 GB",        pro: "1 TB" },
    { feature: "Centralized Admin Console",               standard: "✓",             pro: "✓" },
    { feature: "Team libraries & collaboration",          standard: "✓",             pro: "✓" },
    { feature: "180-day version history",                 standard: "✓",             pro: "✓" },
    { feature: "Recover company assets",                  standard: "✓",             pro: "✓" },
    { feature: "Premium AI video & audio features",       standard: "—",             pro: "✓" },
    { feature: "Enhanced support & expert sessions",      standard: "Plan-dependent",pro: "Included" },
  ];
  return (
    <motion.div
      className="overflow-x-auto rounded-2xl border border-[#e5e5ea] my-8"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay: 0.1 }}
    >
      <table className="w-full text-[14px] sm:text-[15px]">
        <thead>
          <tr className="bg-[#1d1d1f] text-white">
            <th className="text-left px-5 sm:px-6 py-4 font-semibold w-[46%]">Feature</th>
            <th className="text-center px-4 py-4 font-semibold w-[27%] border-l border-gray-700">Standard</th>
            <th className="text-center px-4 py-4 font-semibold w-[27%] border-l border-gray-700 bg-[#16a34a]/20">Pro</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ feature, standard, pro }, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f9f9fb]"}>
              <td className="px-5 sm:px-6 py-3.5 text-[#3d3d3f] border-t border-[#e5e5ea] font-medium text-[14px]">{feature}</td>
              <td className="text-center px-4 py-3.5 border-t border-[#e5e5ea] border-l border-l-[#e5e5ea] text-[14px] text-[#6e6e73]">
                {standard === "✓"
                  ? <CheckCircle2 className="w-4 h-4 text-[#8e8e93] mx-auto" />
                  : standard === "—"
                  ? <span className="text-[#c7c7cc]">—</span>
                  : standard}
              </td>
              <td className="text-center px-4 py-3.5 border-t border-[#e5e5ea] border-l border-l-[#e5e5ea] text-[14px] text-[#1d1d1f] font-medium">
                {pro === "✓"
                  ? <CheckCircle2 className="w-4 h-4 text-[#16a34a] mx-auto" />
                  : pro === "—"
                  ? <span className="text-[#c7c7cc]">—</span>
                  : pro}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[12px] text-[#8e8e93] px-5 sm:px-6 py-3 border-t border-[#e5e5ea]">
        Source: Adobe's official Creative Cloud for Teams comparison. Confirm exact inclusions and current terms before purchasing.
      </p>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────
// BUSINESS FEATURE CARD
// ─────────────────────────────────────────────────────────
const BusinessCard = ({ icon: Icon, title, description, index, inView }: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
}) => (
  <motion.div
    className="flex gap-4 p-5 sm:p-6 rounded-xl border border-[#e5e5ea] bg-white hover:shadow-md transition-shadow duration-300"
    initial={{ opacity: 0, y: 24 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.55, ease, delay: 0.05 + index * 0.07 }}
  >
    <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <h4 className="text-[15px] font-bold text-[#1d1d1f] mb-1 leading-snug">{title}</h4>
      <p className="text-[14px] text-[#6e6e73] leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────────────────
// WHO CARD
// ─────────────────────────────────────────────────────────
const WhoCard = ({ icon: Icon, title, description, index, inView }: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
}) => (
  <motion.div
    className="p-5 sm:p-6 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb]"
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, ease, delay: 0.04 + index * 0.07 }}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea] flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-[#1d1d1f]" />
      </div>
      <h4 className="text-[14px] font-bold text-[#1d1d1f]">{title}</h4>
    </div>
    <p className="text-[13px] text-[#6e6e73] leading-relaxed">{description}</p>
  </motion.div>
);

// ─────────────────────────────────────────────────────────
// SERVICE CARD (Sniper)
// ─────────────────────────────────────────────────────────
const ServiceCard = ({ icon: Icon, title, description, index, inView }: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
}) => (
  <motion.div
    className="flex gap-4 p-5 sm:p-6 rounded-xl border border-[#e5e5ea] bg-white hover:shadow-md transition-shadow duration-300"
    initial={{ opacity: 0, y: 24 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.55, ease, delay: 0.05 + index * 0.07 }}
  >
    <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-[#1d1d1f]" />
    </div>
    <div>
      <h4 className="text-[15px] font-bold text-[#1d1d1f] mb-1 leading-snug">{title}</h4>
      <p className="text-[14px] text-[#6e6e73] leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────────────────
// FAQ ACCORDION
// ─────────────────────────────────────────────────────────
const FaqItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-b border-[#e5e5ea] last:border-b-0"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay: index * 0.06 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-[16px] sm:text-[17px] font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors leading-snug">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease }}>
          <ChevronDown className="w-5 h-5 text-[#8e8e93] flex-shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[15px] sm:text-[16px] text-[#6e6e73] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────
// RELATED CARD
// ─────────────────────────────────────────────────────────
const RelatedCard = ({ post }: {
  post: { title: string; category: string; image: string; readTime: string; href: string };
}) => (
  <a href={post.href} className="group block bg-white rounded-xl overflow-hidden border border-[#e5e5ea] hover:shadow-lg transition-shadow duration-300">
    <div className="relative h-44 sm:h-48 overflow-hidden">
      <img src={post.image} alt={post.title} loading="lazy" decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute top-3 left-3">
        <span className="bg-black/70 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
          {post.category}
        </span>
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-2 leading-snug group-hover:text-[#0066cc] transition-colors line-clamp-2">{post.title}</h3>
      <span className="text-xs text-[#8e8e93] flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" /> {post.readTime}
      </span>
    </div>
  </a>
);

// ─────────────────────────────────────────────────────────
// STICKY SIDEBAR TOC
// ─────────────────────────────────────────────────────────
const TOC_LINKS = [
  { id: "what-is",         label: "What Is CC for Teams?" },
  { id: "standard-vs-pro", label: "Standard vs Pro" },
  { id: "firefly-ai",      label: "Adobe Firefly AI" },
  { id: "business-features", label: "Business Features" },
  { id: "who-should",      label: "Who Should Consider It" },
  { id: "partner",         label: "Why Work With a Partner" },
  { id: "faq",             label: "FAQ" },
];

const SidebarTOC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.getElementById("blog-article-body-ab");
    if (!article) return;
    const onScroll = () => {
      const rect = article.getBoundingClientRect();
      setVisible(rect.top < 140 && rect.bottom > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    TOC_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-15% 0px -70% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div
        className={`hidden xl:block fixed top-28 z-40 transition-all duration-300 ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
        }`}
        style={{ left: "max(1.5rem, calc(50% - 40rem - 1rem))", width: "13rem" }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-[#e5e5ea] shadow-sm p-4 space-y-0.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-3 px-2">On this page</p>
          {TOC_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`w-full text-left text-[13px] px-2 py-2 rounded-lg transition-all duration-200 leading-snug flex items-center gap-2 group ${
                activeId === id ? "text-[#1d1d1f] font-semibold" : "text-[#8e8e93] hover:text-[#1d1d1f]"
              }`}
            >
              <span className={`flex-shrink-0 h-4 rounded-full transition-all duration-200 ${
                activeId === id ? "w-[3px] bg-[#1d1d1f]" : "w-[2px] bg-[#e5e5ea] group-hover:bg-[#c7c7cc]"
              }`} />
              {label}
            </button>
          ))}
          <div className="pt-3 mt-1 border-t border-[#e5e5ea]">
            <button
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              className="flex items-center gap-2 text-[13px] text-[#8e8e93] hover:text-[#1d1d1f] px-2 py-2 rounded-lg hover:bg-[#f5f5f7] transition-all w-full"
            >
              <Share2 className="w-3.5 h-3.5 flex-shrink-0" /> Copy link
            </button>
          </div>
        </div>
      </div>
      <aside className="hidden xl:block w-52 flex-shrink-0" aria-hidden="true" />
    </>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════
const BlogAB = () => {
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ── GEO META ──────────────────────────────────────────
  useEffect(() => {
    const tags: [string, string][] = [
      ["geo.region", "IN"], ["geo.placename", "India"],
      ["geo.position", "20.5937;78.9629"], ["ICBM", "20.5937, 78.9629"],
    ];
    const added: HTMLMetaElement[] = [];
    tags.forEach(([name, content]) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); added.push(el); }
      el.content = content;
    });
    return () => added.forEach(el => el.remove());
  }, []);

  // ── JSON-LD ────────────────────────────────────────────
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Adobe Creative Cloud for Teams in India: Features, Pricing, AI Tools & Business Benefits",
      description: "A business guide to Adobe Creative Cloud plans, Firefly AI, team collaboration, licence management and creative workflow productivity for Indian businesses.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80",
      author: { "@type": "Organization", name: "Sniper Systems & Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Sniper Systems & Solutions",
        logo: { "@type": "ImageObject", url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png" },
      },
      datePublished: "2026-09-23",
      dateModified: "2026-09-23",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sniperindia.com/blog/adobe-creative-cloud-for-teams-india" },
      keywords: "Adobe Creative Cloud for Teams India, Adobe CC Standard vs Pro, Adobe Firefly AI India, Adobe Creative Cloud business India, Adobe licensing India, Sniper Adobe Gold Partner",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ────────────────────────────────────────────────
  useSEO({
    title: "Adobe Creative Cloud for Teams in India: Features, Pricing, AI Tools & Business Benefits",
    description: "A business guide to Adobe Creative Cloud Standard vs Pro for Teams — Firefly AI, generative credits, storage, collaboration, Admin Console and Sniper's Adobe licensing support for Indian businesses.",
    keywords: "Adobe Creative Cloud for Teams India, Adobe CC Standard vs Pro Teams, Adobe Firefly AI business India, Adobe Creative Cloud licensing India, Adobe CC for Teams pricing India, Sniper Adobe Gold Partner India, Adobe team collaboration India",
    ogTitle: "Adobe Creative Cloud for Teams in India: Features, Pricing, AI Tools & Business Benefits",
    ogDescription: "Standard vs Pro for Teams, Adobe Firefly AI, generative credits, storage, collaboration and Admin Console — a complete business guide for Indian organisations.",
    ogImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80",
    ogUrl: "https://sniperindia.com/blog/adobe-creative-cloud-for-teams-india",
    canonicalUrl: "https://sniperindia.com/blog/adobe-creative-cloud-for-teams-india",
    twitterTitle: "Adobe Creative Cloud for Teams India: Features, AI Tools & Business Benefits",
    twitterDescription: "Standard vs Pro, Firefly AI, 200 vs 4,000 generative credits, 100 GB vs 1 TB storage — the Adobe CC for Teams guide for Indian businesses.",
    twitterImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80",
  });

  useEffect(() => {
    const fn = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── HERO GSAP ──────────────────────────────────────────
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = heroHeadingRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".hw");
    const t = gsap.fromTo(words,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.055, delay: 1.1 }
    );
    return () => { t.kill(); };
  }, []);

  // ── SECTION REFS ──────────────────────────────────────
  const tableRef     = useRef(null);
  const bizRef       = useRef(null);
  const whoRef       = useRef(null);
  const partnerRef   = useRef(null);

  const tableInView   = useInView(tableRef,   { once: true, margin: "-60px" });
  const bizInView     = useInView(bizRef,     { once: true, margin: "-60px" });
  const whoInView     = useInView(whoRef,     { once: true, margin: "-60px" });
  const partnerInView = useInView(partnerRef, { once: true, margin: "-60px" });

  // ── DATA ──────────────────────────────────────────────
  const creativeUseCases = [
    "Graphic design: logos, branding, illustrations and marketing materials",
    "Photo editing: image enhancement, retouching and visual content production",
    "Video production: promotional videos, social media content and corporate communications",
    "Digital publishing: creative assets and content for digital channels",
    "Document workflows: PDF creation and editing through relevant Adobe applications",
  ];

  const fireflyExamples = [
    { icon: Image,    label: "Generative Fill",       detail: "Add, remove or modify visual elements within supported Photoshop workflows." },
    { icon: Cpu,      label: "Text to Image",         detail: "Explore visual concepts from written prompts using AI-powered generation." },
    { icon: Video,    label: "AI-Assisted Video",     detail: "Generate or extend video content using eligible features and available credits." },
    { icon: Palette,  label: "Creative Exploration",  detail: "Develop visual ideas and refine content before final production." },
  ];

  const businessFeatures = [
    { icon: Settings,      title: "Centralized Licence Management",     description: "The Admin Console lets IT administrators manage licences, assign access and reassign seats as team requirements change." },
    { icon: Shield,        title: "Company Asset Protection",           description: "Adobe's team features support the recovery of eligible company assets when employees or projects change." },
    { icon: RefreshCw,     title: "180-Day Version History",            description: "Retrieve earlier versions of supported cloud documents when reviewing changes or restoring previous work." },
    { icon: Users,         title: "Shared Libraries & Collaboration",   description: "Creative Cloud Libraries help teams share and reuse assets across supported applications with collaborative review workflows." },
    { icon: Layers,        title: "Additional Team Benefits",           description: "Adobe Express for company employees and additional talent-recruitment features, subject to plan terms." },
  ];

  const whoShouldUse = [
    { icon: Palette,    title: "Marketing Departments",      description: "Campaign graphics, digital advertisements, presentations, social media assets and video content." },
    { icon: Users,      title: "Creative Agencies",          description: "Shared creative libraries, organized licences and consistent application access across multiple clients." },
    { icon: Video,      title: "Media & Entertainment",      description: "Image editing, illustration, video editing and collaboration tools for production teams." },
    { icon: FileText,   title: "Corporate Design Teams",     description: "Brand assets, presentations and internal communications with shared resources and centralized control." },
    { icon: Settings,   title: "Growing Businesses",         description: "Centralized administration to assign licences and manage access as employee requirements change." },
  ];

  const sniperServices = [
    { icon: Layers,        title: "Licensing Consultation",     description: "Identify suitable Adobe plans and licence types for different teams and business requirements." },
    { icon: Settings,      title: "Deployment & Onboarding",    description: "Plan licence assignment, Admin Console setup and application deployment across the organisation." },
    { icon: FileText,      title: "Workflow Consulting",        description: "Review existing creative workflows and align Adobe tools to how teams actually work." },
    { icon: Cpu,           title: "Enterprise Integration",     description: "Evaluate integration with the wider IT environment, identity platforms and business applications." },
    { icon: GraduationCap, title: "Training & Adoption",        description: "Help employees adopt new features, Firefly AI capabilities and creative workflows through structured onboarding." },
    { icon: HeartHandshake,title: "Renewal & Ongoing Support",  description: "Coordinate subscriptions, manage renewals and provide ongoing technical support." },
  ];

  const partnerItems = [
    "Identify suitable Adobe plans for different teams",
    "Plan licence assignment and deployment",
    "Review existing creative workflows",
    "Support onboarding and adoption",
    "Coordinate subscriptions and renewals",
    "Evaluate integration with the wider IT environment",
  ];

  const faqs = [
    { q: "What is Adobe Creative Cloud for Teams?",              a: "Adobe Creative Cloud for Teams provides business users with 20+ creative applications and team features such as centralized licence management, shared libraries, cloud storage and file version history." },
    { q: "What is the difference between Creative Cloud Standard and Pro for Teams?", a: "Standard provides 20+ creative apps, 200 monthly generative credits and 100 GB storage. Pro adds 4,000 monthly generative credits, 1 TB storage, unlimited standard generative AI access and premium AI video and audio capabilities." },
    { q: "How many users can use Creative Cloud for Teams?",     a: "Adobe lists Standard for Teams for 2–9 licences and Pro for Teams for 1–9 licences under current small-business plans. Organisations with larger requirements should review Adobe's enterprise offering or consult its sales team." },
    { q: "Can Adobe Creative Cloud for Teams help protect company files?", a: "Yes. Team features include company asset recovery when eligible users leave, centralized administration, shared libraries and extended 180-day version history for supported cloud documents." },
    { q: "How many computers can use one Adobe Creative Cloud licence?", a: "Adobe states that one user can activate and remain signed in on up to two computers, but use the applications on only one computer at a time. Review Adobe's official Teams FAQ and product terms for the details applicable to your licence." },
    { q: "Can Sniper help with Adobe Creative Cloud licensing?",  a: "Yes. Sniper's Adobe offering as an Adobe Gold Partner includes licensing guidance, deployment and onboarding, workflow consulting, enterprise integration, training and subscription renewal support." },
  ];

  const relatedPosts = [
    { title: "Adobe Acrobat Studio for Business: AI-Powered PDF & Content Creation",                    category: "Adobe Solutions",  image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80",   readTime: "11 min read", href: "/blog/adobe-acrobat-studio-for-business" },
    { title: "How AI-Powered Document Collaboration Is Transforming Modern Business Workflows",          category: "Document AI",      image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80",   readTime: "9 min read",  href: "/blog/how-ai-powered-document-collaboration-is-transforming-modern-business-workflows" },
    { title: "A Smarter Way to Document Work",                                                          category: "Adobe Acrobat",    image: "https://i.postimg.cc/PrX7vbNy/adobe-acrobat-logo-on-background-(1).jpg",   readTime: "8 min read",  href: "/blog/bloga" },
  ];

  return (
    <Layout>
      {showWhiteScreen && <WhiteScreenTransition onComplete={() => setShowWhiteScreen(false)} />}
      <ReadingProgressBar />

      {/* ═══ HERO ════════════════════════════════════════════════════════ */}
      <section className="bg-[#fbfbfd] pt-28 sm:pt-32 pb-0 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">

          <FadeUp>
            <div className="flex items-center gap-2 text-[13px] text-[#8e8e93] mb-8">
              <a href="/blog" className="hover:text-[#1d1d1f] transition-colors">Blog</a>
              <span>/</span>
              <span className="text-[#1d1d1f]">Adobe Solutions</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc] bg-[#e8f0fe] px-3 py-1.5 rounded-full mb-6">
              <Palette className="w-3.5 h-3.5" />
              Adobe Creative Cloud · Teams
            </span>
          </FadeUp>

          <h1
            ref={heroHeadingRef}
            className="text-[36px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-black text-[#1d1d1f] leading-[1.04] tracking-tight mb-6"
            aria-label="Adobe Creative Cloud for Teams in India"
          >
            {["Adobe", "Creative"].map((w, i) => (
              <span key={i} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br />
            {["Cloud", "for", "Teams"].map((w, i) => (
              <span key={i + 2} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
          </h1>

          <FadeUp delay={0.15}>
            <p className="text-[18px] sm:text-[21px] text-[#6e6e73] leading-relaxed max-w-3xl mb-10 font-normal">
              Features, pricing, Firefly AI tools and business benefits — a guide for
              Indian businesses comparing Creative Cloud Standard vs Pro for Teams.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pb-8 border-b border-[#e5e5ea] text-[13px] sm:text-[14px]">
              <span className="flex items-center gap-2 text-[#3d3d3f]">
                <div className="w-8 h-8 rounded-full bg-[#1d1d1f] flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                Sniper Systems
              </span>
              <span className="flex items-center gap-1.5 text-[#8e8e93]">
                <Calendar className="w-4 h-4" /> September 23, 2026
              </span>
              <span className="flex items-center gap-1.5 text-[#8e8e93]">
                <Clock className="w-4 h-4" /> 12 min read
              </span>
              <span className="flex items-center gap-1.5 text-[#0066cc] bg-[#e8f0fe] px-2.5 py-1 rounded-full font-medium">
                <Tag className="w-3.5 h-3.5" /> Adobe Solutions
              </span>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.25} className="max-w-5xl mx-auto pt-8">
          <div className="relative rounded-t-3xl overflow-hidden h-[240px] sm:h-[400px] md:h-[500px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80"
              alt="Adobe Creative Cloud for Teams — design, video, AI tools for Indian businesses"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </FadeUp>
      </section>

      {/* ═══ BODY ════════════════════════════════════════════════════════ */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="flex gap-12 xl:gap-16 items-start">

            <SidebarTOC />

            <article id="blog-article-body-ab" className="flex-1 min-w-0">

              {/* TL;DR */}
              <FadeUp>
                <Callout type="tip">
                  <strong>TL;DR:</strong> Adobe Creative Cloud for Teams gives businesses
                  access to 20+ professional creative applications, AI-powered Firefly tools
                  and collaboration features. For Indian businesses comparing Standard vs Pro
                  for Teams, the main considerations are generative AI usage (200 vs 4,000
                  monthly credits), storage (100 GB vs 1 TB), premium AI video features and
                  support. Choosing the right plan helps establish a consistent creative
                  workflow while keeping licences and company assets under centralized control.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 1 ─────────────────────────────────────────── */}
              <SectionHeading id="what-is">What Is Adobe Creative Cloud for Teams?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Adobe Creative Cloud for Teams is a collection of creative software and
                    business features designed for organisations that need multiple users to
                    create, edit, manage and share digital content. Rather than purchasing
                    separate software licences without central oversight, businesses can manage
                    team access through Adobe's web-based Admin Console.
                  </p>
                  <p className="mt-4">The suite supports a wide range of creative work:</p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="my-6">
                <div className="bg-[#f9f9fb] rounded-2xl border border-[#e5e5ea] p-5 sm:p-6">
                  <ul className="space-y-3">
                    {creativeUseCases.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-[15px] text-[#3d3d3f]"
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease, delay: 0.03 + i * 0.05 }}
                      >
                        <CheckCircle2 className="w-[18px] h-[18px] text-[#1d1d1f] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              <FadeUp>
                <Prose>
                  <p>
                    Adobe's Creative Cloud portfolio includes applications such as Photoshop,
                    Illustrator, Premiere Pro, Lightroom and Adobe Express. Specific application
                    inclusions should be confirmed against the selected plan.
                  </p>
                  <p className="mt-4">
                    For businesses in India,{" "}
                    <a href="/partners/adobe" className="text-[#0066cc] underline underline-offset-2 hover:no-underline">
                      Sniper's Adobe Solutions
                    </a>{" "}
                    provides access to Adobe products alongside licensing guidance, deployment,
                    workflow consulting and ongoing support.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 2 ─────────────────────────────────────────── */}
              <SectionHeading id="standard-vs-pro">Adobe Creative Cloud Standard vs Pro for Teams</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    One of the most important decisions is choosing between{" "}
                    <strong>Creative Cloud Standard for Teams</strong> and{" "}
                    <strong>Creative Cloud Pro for Teams</strong>. Both plans provide access to
                    creative applications and team administration features. Pro is positioned for
                    users who need more extensive generative AI capabilities, greater storage and
                    enhanced support.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={tableRef}>
                <ComparisonTable inView={tableInView} />
              </div>

              <FadeUp>
                <Callout type="info">
                  <strong>Which plan should your business choose?</strong>
                  <br /><br />
                  <strong>Standard for Teams</strong> may suit smaller creative teams that
                  primarily need professional design applications, standard AI features and
                  essential collaboration tools.
                  <br /><br />
                  <strong>Pro for Teams</strong> may be a better fit for organisations
                  producing high volumes of creative content or regularly using AI-generated
                  video, audio and imagery. The best choice depends on how your team works —
                  not simply how many applications are included.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 3 ─────────────────────────────────────────── */}
              <SectionHeading id="firefly-ai">How Adobe Firefly AI Helps Creative Teams</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Adobe Firefly brings generative AI capabilities into supported Adobe
                    applications and workflows. Depending on the selected plan and feature,
                    teams can use AI to assist with image creation, editing and other creative
                    tasks.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="my-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fireflyExamples.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-4 p-5 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease, delay: 0.04 + i * 0.07 }}
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#1d1d1f] mb-1">{item.label}</p>
                        <p className="text-[13px] text-[#6e6e73] leading-relaxed">{item.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp>
                <Callout type="warning">
                  These tools support faster creative iteration — they do not remove the need
                  for design expertise, brand review, quality control or human approval. When
                  selecting a plan, distinguish between{" "}
                  <strong>standard generative features</strong> and{" "}
                  <strong>premium video or audio features</strong> that consume monthly
                  generative credits differently.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 4 ─────────────────────────────────────────── */}
              <SectionHeading id="business-features">Business Features Beyond Creative Applications</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Adobe Creative Cloud for Teams is not only about the software installed on
                    individual computers. Its business features help organisations maintain
                    continuity and control over creative work.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={bizRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {businessFeatures.map((f, i) => (
                  <BusinessCard key={i} {...f} index={i} inView={bizInView} />
                ))}
              </div>

              <FadeUp>
                <Prose>
                  <p>
                    Together, these capabilities make team licensing relevant to businesses that
                    need more than individual creative software subscriptions.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 5 ─────────────────────────────────────────── */}
              <SectionHeading id="who-should">Who Should Consider Adobe Creative Cloud for Teams?</SectionHeading>

              <div ref={whoRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
                {whoShouldUse.map((item, i) => (
                  <WhoCard key={i} {...item} index={i} inView={whoInView} />
                ))}
              </div>

              {/* ══ SECTION 6 ─────────────────────────────────────────── */}
              <SectionHeading id="partner">Why Businesses Need an Adobe Licensing and Deployment Partner</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Selecting an Adobe plan is only one part of implementation. Organisations
                    may also need to coordinate licence allocation, application deployment,
                    user onboarding, workflow planning, renewals and support. An experienced
                    partner can help businesses:
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="my-8">
                <div ref={partnerRef} className="bg-[#f9f9fb] rounded-2xl border border-[#e5e5ea] p-6 sm:p-8">
                  <ul className="space-y-3">
                    {partnerItems.map((item, i) => (
                      <CheckItem key={i} inView={partnerInView} delay={0.03 + i * 0.05}>{item}</CheckItem>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              <FadeUp>
                <Prose>
                  <p>
                    Sniper Systems &amp; Solutions is an{" "}
                    <strong>Adobe Gold Partner</strong> with published services covering Adobe
                    licensing guidance, deployment and onboarding, workflow consulting,
                    enterprise integration, training and subscription renewal support.
                  </p>
                </Prose>
              </FadeUp>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {sniperServices.map((s, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-4 p-5 sm:p-6 rounded-xl border border-[#e5e5ea] bg-white hover:shadow-md transition-shadow duration-300"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease, delay: 0.05 + i * 0.07 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-5 h-5 text-[#1d1d1f]" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-[#1d1d1f] mb-1 leading-snug">{s.title}</h4>
                      <p className="text-[14px] text-[#6e6e73] leading-relaxed">{s.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Adobe link card */}
              <FadeUp delay={0.05} className="my-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb]">
                  <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#1d1d1f] mb-0.5">Adobe Gold Partner · India</p>
                    <p className="text-[13px] text-[#6e6e73]">Licensing, deployment, onboarding, workflow consulting and renewal support for Adobe products across India.</p>
                  </div>
                  <a
                    href="/partners/adobe"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0066cc] hover:underline underline-offset-2 whitespace-nowrap flex-shrink-0"
                  >
                    Explore Adobe Solutions <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </FadeUp>

              {/* ══ FAQ ═══════════════════════════════════════════════════ */}
              <SectionHeading id="faq">Frequently Asked Questions</SectionHeading>

              <FadeUp className="border-t border-[#e5e5ea] divide-y divide-transparent my-4">
                {faqs.map((f, i) => (
                  <FaqItem key={i} {...f} index={i} />
                ))}
              </FadeUp>

              {/* ══ INLINE CTA ════════════════════════════════════════════ */}
              <FadeUp delay={0.1} className="mt-16">
                <div className="rounded-2xl bg-[#1d1d1f] text-white px-8 sm:px-12 py-10 sm:py-14 text-center">
                  <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-4">
                    Choose the right plan
                  </p>
                  <h2 className="text-[28px] sm:text-[36px] font-black leading-tight mb-4">
                    Need Adobe Creative Cloud Licences for Your Business?
                  </h2>
                  <p className="text-[16px] text-[#aeaeb2] max-w-xl mx-auto mb-8 leading-relaxed">
                    Contact Sniper's Adobe team to discuss plan selection, licensing and
                    deployment support for your organisation in India.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#1d1d1f] font-semibold rounded-full hover:bg-[#f5f5f7] transition-colors text-[15px]"
                    >
                      Get in touch <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="/partners/adobe"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#3d3d3f] text-white font-semibold rounded-full hover:border-white transition-colors text-[15px]"
                    >
                      Explore Adobe Solutions
                    </a>
                  </div>
                </div>
              </FadeUp>

            </article>
          </div>
        </div>
      </div>

      {/* ═══ RELATED POSTS ═══════════════════════════════════════════════ */}
      <section className="bg-[#f5f5f7] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-2">Keep reading</p>
                <h2 className="text-[28px] sm:text-[34px] font-black text-[#1d1d1f] leading-tight">More from the blog</h2>
              </div>
              <a href="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0066cc] hover:underline">
                View all <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {relatedPosts.map((post, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <RelatedCard post={post} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SCROLL TO TOP ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-11 h-11 bg-[#1d1d1f] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <ArrowRight className="w-5 h-5 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default BlogAB;
