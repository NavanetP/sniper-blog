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
  Cpu,
  Zap,
  Globe,
  Layers,
  Activity,
  Server,
  Wifi,
  Database,
  Monitor,
  Sparkles,
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
// NUMBERED STEP — large Prismic numeral
// ─────────────────────────────────────────────────────────
const NumberedStep = ({ number, title, badge, children, inView }: {
  number: number; title: string; badge?: string; children: React.ReactNode; inView: boolean;
}) => (
  <motion.div
    className="flex gap-6 sm:gap-8 py-8 border-b border-[#e5e5ea] last:border-b-0"
    initial={{ opacity: 0, x: -20 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, ease, delay: 0.05 + (number - 1) * 0.07 }}
  >
    <div className="flex-shrink-0 w-14 sm:w-16">
      <span className="text-[56px] sm:text-[72px] font-black leading-none text-[#e5e5ea] select-none" aria-hidden="true">
        {String(number).padStart(2, "0")}
      </span>
    </div>
    <div className="flex-1 pt-2">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1d1d1f] leading-snug">{title}</h3>
        {badge && (
          <span className={`text-[11px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full ${
            badge === "Production-Ready"
              ? "bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]"
              : "bg-[#fffbeb] text-[#d97706] border border-[#fde68a]"
          }`}>
            {badge}
          </span>
        )}
      </div>
      <div className="text-[15px] sm:text-[16px] leading-relaxed text-[#3d3d3f] space-y-3">{children}</div>
    </div>
  </motion.div>
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
// FEATURE TAG CHIP
// ─────────────────────────────────────────────────────────
const FeatureChip = ({ label, badge, index, inView }: { label: string; badge?: string; index: number; inView: boolean }) => (
  <motion.div
    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#e5e5ea] bg-white"
    initial={{ opacity: 0, scale: 0.92 }}
    animate={inView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.4, ease, delay: 0.04 + index * 0.04 }}
  >
    <span className="text-[13px] font-semibold text-[#1d1d1f]">{label}</span>
    {badge && (
      <span className={`text-[11px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full flex-shrink-0 ${
        badge === "Production-Ready"
          ? "bg-[#f0fdf4] text-[#16a34a]"
          : "bg-[#fffbeb] text-[#d97706]"
      }`}>
        {badge}
      </span>
    )}
  </motion.div>
);

// ─────────────────────────────────────────────────────────
// INFRA CARD
// ─────────────────────────────────────────────────────────
const InfraCard = ({ icon: Icon, title, description, index, inView }: {
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
  { id: "whats-new",       label: "What's New in UE 5.8" },
  { id: "key-features",    label: "7 Key Features" },
  { id: "for-business",    label: "What It Means for Business" },
  { id: "infrastructure",  label: "Infrastructure Requirements" },
  { id: "sniper-ue",       label: "How Sniper Can Help" },
  { id: "faq",             label: "FAQ" },
];

const SidebarTOC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.getElementById("blog-article-body-z");
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
const BlogZ = () => {
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
      headline: "What's New in Unreal Engine 5.8? Key Features for AI, MetaHuman, Virtual Production & Real-Time 3D",
      description: "Explore the latest Unreal Engine 5.8 features — Mesh Terrain, MegaLights, MetaHuman Collections, MCP plugin for LLMs, markerless motion capture and more.",
      image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1600&q=80",
      author: { "@type": "Organization", name: "Sniper Systems & Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Sniper Systems & Solutions",
        logo: { "@type": "ImageObject", url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png" },
      },
      datePublished: "2026-09-23",
      dateModified: "2026-09-23",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sniperindia.com/blog/unreal-engine-5-8-new-features" },
      keywords: "Unreal Engine 5.8, UE 5.8 features, Mesh Terrain, MegaLights, MetaHuman Collections, MCP plugin LLM, markerless motion capture, virtual production UE5, real-time 3D India, Unreal Engine India",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ────────────────────────────────────────────────
  useSEO({
    title: "What's New in Unreal Engine 5.8? Features for AI, MetaHuman, Virtual Production & Real-Time 3D",
    description: "Explore Unreal Engine 5.8 key features — Mesh Terrain, MegaLights, Lumen Lite, MetaHuman Collections, MCP plugin for LLMs, markerless motion capture and what it means for businesses in India.",
    keywords: "Unreal Engine 5.8, UE 5.8 new features, Mesh Terrain UE5, MegaLights Unreal Engine, MetaHuman Collections, MCP plugin LLM Unreal Engine, markerless motion capture UE5, Lumen Lite, virtual production Unreal Engine, real-time 3D India, Unreal Engine for business India",
    ogTitle: "What's New in Unreal Engine 5.8? Key Features for AI, MetaHuman, Virtual Production & Real-Time 3D",
    ogDescription: "Mesh Terrain, MegaLights, MetaHuman Collections, MCP plugin for LLMs and markerless motion capture — what Unreal Engine 5.8 means for game developers, virtual production and enterprise real-time 3D.",
    ogImage: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1600&q=80",
    ogUrl: "https://sniperindia.com/blog/unreal-engine-5-8-new-features",
    canonicalUrl: "https://sniperindia.com/blog/unreal-engine-5-8-new-features",
    twitterTitle: "What's New in Unreal Engine 5.8?",
    twitterDescription: "Mesh Terrain, MegaLights, MetaHuman Collections, LLM MCP plugin, markerless mocap — UE 5.8 feature breakdown for game devs and enterprise real-time 3D.",
    twitterImage: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1600&q=80",
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
  const stepsRef   = useRef(null);
  const chipsRef   = useRef(null);
  const infraRef   = useRef(null);
  const bizRef     = useRef(null);

  const stepsInView = useInView(stepsRef,  { once: true, margin: "-60px" });
  const chipsInView = useInView(chipsRef,  { once: true, margin: "-60px" });
  const infraInView = useInView(infraRef,  { once: true, margin: "-60px" });
  const bizInView   = useInView(bizRef,    { once: true, margin: "-60px" });

  // ── DATA ──────────────────────────────────────────────
  const featureChips = [
    { label: "Mesh Terrain",                   badge: "Experimental" },
    { label: "PCG & Procedural Vegetation",    badge: undefined },
    { label: "MegaLights",                     badge: "Production-Ready" },
    { label: "Lumen Lite",                     badge: undefined },
    { label: "MCP Plugin for LLMs",            badge: "Experimental" },
    { label: "MetaHuman Collections",          badge: undefined },
    { label: "Mesh to MetaHuman",              badge: undefined },
    { label: "Markerless Motion Capture",      badge: undefined },
    { label: "Live Link Hub",                  badge: "Production-Ready" },
    { label: "Movie Render Graph",             badge: "Production-Ready" },
    { label: "Dataflow",                       badge: "Production-Ready" },
    { label: "Editor Gizmo System",            badge: undefined },
  ];

  const mcpCapabilities = [
    "Asset creation",
    "Building systems",
    "Extending engine functionality",
    "Testing and optimisation",
    "Workflow automation",
  ];

  const businessUseCases = [
    { icon: Monitor,   title: "Real-Time Visualisation",        description: "Create interactive environments and high-fidelity visual experiences for architectural, automotive and product visualisation." },
    { icon: Sparkles,  title: "Digital Humans",                 description: "Develop realistic characters and scalable digital experiences using MetaHuman Collections, Mesh to MetaHuman and markerless mocap." },
    { icon: Activity,  title: "Virtual Production",             description: "Support cinematic production and performance-capture workflows with Live Link Hub and Movie Render Graph." },
    { icon: Globe,     title: "Simulation & Training",          description: "Build interactive environments where realistic visualisation, physics and procedural content are important requirements." },
    { icon: Layers,    title: "Interactive Experiences",        description: "Develop immersive applications across supported platforms, from enterprise training to consumer experiences." },
    { icon: Zap,       title: "AI-Assisted Development",        description: "Explore LLM-connected workflows via the MCP plugin to accelerate asset creation, testing and optimisation." },
  ];

  const infraRequirements = [
    { icon: Cpu,      title: "High-Performance Workstations",    description: "For artists, developers and technical teams working with large assets, real-time rendering and demanding creative workflows." },
    { icon: Server,   title: "GPU-Accelerated Infrastructure",   description: "For demanding rendering, MegaLights, Lumen, MetaHuman and compute-intensive workloads in studio or data-centre environments." },
    { icon: Database, title: "High Performance Computing (HPC)", description: "Sniper's HPC offering covers simulation, analytics, AI/ML and scientific computing — relevant for intensive UE workloads." },
    { icon: Wifi,     title: "High-Speed Networking & Storage",  description: "For large project files, collaborative team workflows and fast data access across shared assets and environments." },
  ];

  const faqs = [
    {
      q: "What is new in Unreal Engine 5.8?",
      a: "UE 5.8 introduces Mesh Terrain for complex 3D worldbuilding, MegaLights (Production-Ready), Lumen Lite, expanded PCG and Procedural Vegetation, the MCP plugin for LLM integration, MetaHuman Collections, Mesh to MetaHuman, markerless motion capture, Live Link Hub (Production-Ready) and Movie Render Graph (Production-Ready).",
    },
    {
      q: "What is the MCP plugin for LLMs in Unreal Engine 5.8?",
      a: "The MCP plugin is an Experimental feature that allows LLM models to connect directly with Unreal Engine projects. It exposes core engine systems including Blueprints, assets, levels, materials and meshes — enabling AI-assisted workflows for asset creation, testing, optimisation and automation.",
    },
    {
      q: "What is MetaHuman Collections in UE 5.8?",
      a: "MetaHuman Collections enables creators to populate real-time environments with scalable crowds of MetaHumans — supporting hundreds of characters on mobile and thousands on higher-end platforms, according to Epic's material.",
    },
    {
      q: "What is markerless motion capture in Unreal Engine 5.8?",
      a: "The MetaHuman Animator Markerless Motion Capture Plugin adds full-body and facial performance capture using a single off-actor camera. According to Epic, a webcam can be used to capture head-to-toe animation without traditional mocap rigs, helmet cameras or markers.",
    },
    {
      q: "What infrastructure does Unreal Engine 5.8 require?",
      a: "Demanding UE 5.8 projects may require high-performance workstations, GPU-accelerated infrastructure for rendering and compute workloads, high-speed networking and storage for collaborative workflows, and HPC infrastructure for simulation or intensive processing. Sniper's IT infrastructure portfolio covers these requirements.",
    },
  ];

  const relatedPosts = [
    {
      title: "How Real-Time 3D and XR Are Transforming Automotive Product Development",
      category: "Automotive XR",
      image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&q=80",
      readTime: "10 min read",
      href: "/blog/how-real-time-3d-and-xr-are-transforming-automotive-product-development-unity",
    },
    {
      title: "Why AI Is Reshaping Enterprise Server and Storage Infrastructure",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      readTime: "8 min read",
      href: "/blog/why-ai-is-reshaping-enterprise-server-and-storage-infrastructure",
    },
    {
      title: "Digital Twins in Manufacturing: How AI and Real-Time 3D Are Creating the Intelligent Factory",
      category: "Digital Manufacturing",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
      readTime: "11 min read",
      href: "/blog/digital-twins-manufacturing-ai-real-time-3d-intelligent-factory",
    },
  ];

  return (
    <Layout>
      {showWhiteScreen && <WhiteScreenTransition onComplete={() => setShowWhiteScreen(false)} />}
      <ReadingProgressBar />

      {/* ═══ HERO ════════════════════════════════════════════════════════ */}
      <section className="bg-[#fbfbfd] pt-28 sm:pt-32 pb-0 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <FadeUp>
            <div className="flex items-center gap-2 text-[13px] text-[#8e8e93] mb-8">
              <a href="/blog" className="hover:text-[#1d1d1f] transition-colors">Blog</a>
              <span>/</span>
              <span className="text-[#1d1d1f]">Real-Time 3D</span>
            </div>
          </FadeUp>

          {/* Category badge */}
          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc] bg-[#e8f0fe] px-3 py-1.5 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5" />
              Unreal Engine · Real-Time 3D
            </span>
          </FadeUp>

          {/* Headline */}
          <h1
            ref={heroHeadingRef}
            className="text-[36px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-black text-[#1d1d1f] leading-[1.04] tracking-tight mb-6"
            aria-label="What's New in Unreal Engine 5.8?"
          >
            {["What's", "New", "in"].map((w, i) => (
              <span key={i} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br />
            {["Unreal", "Engine", "5.8?"].map((w, i) => (
              <span key={i + 3} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
          </h1>

          {/* Standfirst */}
          <FadeUp delay={0.15}>
            <p className="text-[18px] sm:text-[21px] text-[#6e6e73] leading-relaxed max-w-3xl mb-10 font-normal">
              Key features for AI, MetaHuman, virtual production and real-time 3D — explore
              what UE 5.8 brings to creators, studios and businesses.
            </p>
          </FadeUp>

          {/* Meta row */}
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
                <Clock className="w-4 h-4" /> 13 min read
              </span>
              <span className="flex items-center gap-1.5 text-[#0066cc] bg-[#e8f0fe] px-2.5 py-1 rounded-full font-medium">
                <Tag className="w-3.5 h-3.5" /> Real-Time 3D
              </span>
            </div>
          </FadeUp>
        </div>

        {/* Hero image */}
        <FadeUp delay={0.25} className="max-w-5xl mx-auto pt-8">
          <div className="relative rounded-t-3xl overflow-hidden h-[240px] sm:h-[400px] md:h-[500px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1600&q=80"
              alt="Unreal Engine 5.8 — real-time 3D rendering and virtual production"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          </div>
        </FadeUp>
      </section>

      {/* ═══ BODY ════════════════════════════════════════════════════════ */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="flex gap-12 xl:gap-16 items-start">

            <SidebarTOC />

            <article id="blog-article-body-z" className="flex-1 min-w-0">

              {/* TL;DR */}
              <FadeUp>
                <Callout type="tip">
                  <strong>TL;DR:</strong> Unreal Engine 5.8 brings improvements across
                  worldbuilding (Mesh Terrain, PCG), rendering (MegaLights, Lumen Lite),
                  digital humans (MetaHuman Collections, Mesh to MetaHuman, markerless mocap),
                  virtual production (Live Link Hub, Movie Render Graph) and AI-assisted workflows
                  (MCP plugin for LLMs). For game developers, animation teams, virtual production
                  studios and organisations exploring real-time 3D, UE 5.8 is about improving
                  the workflow across every major area of creation.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 1 ─────────────────────────────────────────── */}
              <SectionHeading id="whats-new">What Is New in Unreal Engine 5.8?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Unreal Engine 5.8 focuses on making real-time 3D creation faster and more
                    flexible. Epic Games describes the release around advanced worldbuilding and
                    terrain creation, real-time vegetation authoring, streamlined lighting,
                    improved character and animation workflows, virtual production, full-body
                    performance capture and accelerated content creation through LLM workflows.
                  </p>
                  <p className="mt-4">
                    For teams already using Unreal Engine, the update offers new ways to approach
                    complex environments, character creation and performance — while improving
                    workflows across different platforms.
                  </p>
                </Prose>
              </FadeUp>

              {/* Feature chips grid */}
              <div ref={chipsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-8">
                {featureChips.map((chip, i) => (
                  <FeatureChip key={i} {...chip} index={i} inView={chipsInView} />
                ))}
              </div>

              <FadeUp>
                <div className="flex flex-wrap gap-3 text-[13px] text-[#6e6e73]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] inline-block" />
                    Production-Ready
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#fffbeb] border border-[#fde68a] inline-block" />
                    Experimental
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] inline-block" />
                    Released
                  </span>
                </div>
              </FadeUp>

              {/* ══ SECTION 2 — 7 Features ════════════════════════════════ */}
              <SectionHeading id="key-features">7 Key Features That Deserve Attention</SectionHeading>

              <div ref={stepsRef} className="divide-y divide-[#e5e5ea] border-t border-[#e5e5ea] my-8">

                <NumberedStep number={1} title="Mesh Terrain — More Flexible 3D Worldbuilding" badge="Experimental" inView={stepsInView}>
                  <p>
                    Unlike traditional heightfield-based terrain workflows, Mesh Terrain is a
                    3D-mesh-based system designed for creating more complex landscapes — supporting
                    overhangs, floating islands, cliffs and tunnels.
                  </p>
                  <p>
                    The system works with World Partition and Procedural Content Generation (PCG),
                    connecting terrain authoring with larger worldbuilding workflows. For teams
                    working on large-scale real-time 3D environments, this can provide more
                    flexibility when conventional terrain approaches become restrictive.
                  </p>
                </NumberedStep>

                <NumberedStep number={2} title="PCG and Procedural Vegetation" inView={stepsInView}>
                  <p>
                    UE 5.8 expands the Procedural Content Generation framework to allow manual
                    edits to procedurally generated content without breaking the underlying
                    procedural setup. The Procedural Vegetation Editor (PVE) has also been
                    significantly improved — creators can build Nanite-ready vegetation and work
                    with imported tree assets, 2D references and other sources.
                  </p>
                  <p>
                    Together, PCG and PVE help teams create detailed environments while reducing
                    repetitive manual work.
                  </p>
                </NumberedStep>

                <NumberedStep number={3} title="MegaLights and Lumen Lite" badge="Production-Ready" inView={stepsInView}>
                  <p>
                    <strong>MegaLights</strong> is now Production-Ready, allowing creators to use
                    large numbers of dynamic, shadowed area lights while reducing noise and improving
                    visual quality. Epic says it is engineered around 60 FPS targets on
                    current-generation consoles.
                  </p>
                  <p>
                    <strong>Lumen Lite</strong> is a new lower-cost global illumination mode that
                    retains artistic lighting while reducing GPU requirements — highlighted for
                    handheld platforms and PCs. For developers balancing visual fidelity and
                    performance across different hardware, these changes are important.
                  </p>
                </NumberedStep>

                <NumberedStep number={4} title="MCP Plugin for LLM Models" badge="Experimental" inView={stepsInView}>
                  <p>
                    Perhaps the most forward-looking addition in UE 5.8 is the MCP plugin, which
                    allows LLM systems to connect directly with Unreal Engine projects. According
                    to Epic's material, these models can assist with:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {mcpCapabilities.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.04 + i * 0.05}>{item}</CheckItem>
                    ))}
                  </ul>
                  <p>
                    The plugin exposes core UE systems including Blueprints, assets, levels,
                    materials and meshes. Rather than using AI only as an external content-generation
                    tool, developers can explore AI-assisted workflows closer to the engine and
                    project environment.
                  </p>
                  <Callout type="warning">
                    The MCP plugin is still Experimental. Organisations should evaluate where it
                    fits into their development processes rather than treating it as a finished
                    replacement for existing workflows.
                  </Callout>
                </NumberedStep>

                <NumberedStep number={5} title="MetaHuman Features — Scalable Digital Humans" inView={stepsInView}>
                  <p>
                    UE 5.8 significantly expands digital human capabilities across three related
                    features:
                  </p>
                  <p>
                    <strong>MetaHuman Collections</strong> enables creators to populate real-time
                    environments with scalable crowds — supporting hundreds of characters on mobile
                    and thousands on higher-end platforms.
                  </p>
                  <p>
                    <strong>Mesh to MetaHuman</strong> turns human meshes into fully rigged
                    MetaHumans, with support for arbitrary body and head topology and assets from
                    external GenAI or digital content creation tools.
                  </p>
                  <p>
                    <strong>Markerless Motion Capture</strong> adds full-body and facial performance
                    capture using a single off-actor camera — Epic notes that a webcam can be used
                    to capture head-to-toe animation without traditional mocap rigs or markers.
                  </p>
                </NumberedStep>

                <NumberedStep number={6} title="Virtual Production — Live Link Hub & Movie Render Graph" badge="Production-Ready" inView={stepsInView}>
                  <p>
                    The <strong>Live Link Hub</strong> is now Production-Ready, providing a central
                    interface for monitoring live video feeds, controlling devices over IP and
                    synchronising Live Link data, Unreal Editor clients and recording equipment.
                  </p>
                  <p>
                    <strong>Movie Render Graph</strong> is also Production-Ready, providing a
                    graph-based approach to cinematic rendering and giving artists more control over
                    render settings and layers. For virtual production studios and media and
                    entertainment teams, these changes simplify complex production pipelines.
                  </p>
                </NumberedStep>

                <NumberedStep number={7} title="Physics, Mobile Development and Editor Improvements" inView={stepsInView}>
                  <p>
                    <strong>Dataflow</strong> is now Production-Ready, supporting procedural
                    nondestructive workflows for physics-based assets including Cloth and
                    Destruction pipelines.
                  </p>
                  <p>
                    For mobile developers, <strong>Automated Android SDK setup</strong> simplifies
                    workstation configuration, while <strong>Unreal Engine Remote</strong> allows
                    teams to preview and test mobile input without building and deploying to a
                    physical device.
                  </p>
                  <p>
                    An updated <strong>Editor Gizmo System</strong> creates more consistent and
                    predictable viewport manipulation. These improvements contribute to the broader
                    goal of UE 5.8: faster workflows and more efficient iteration.
                  </p>
                </NumberedStep>

              </div>

              {/* ══ SECTION 3 — Business Uses ═════════════════════════════ */}
              <SectionHeading id="for-business">What Does Unreal Engine 5.8 Mean for Businesses?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    The value of Unreal Engine 5.8 is not limited to game development. Its
                    capabilities around real-time rendering, digital humans, virtual production,
                    simulation, mobile development and AI-assisted workflows are also relevant to
                    organisations exploring immersive and real-time 3D applications.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={bizRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {businessUseCases.map((item, i) => (
                  <InfraCard key={i} icon={item.icon} title={item.title} description={item.description} index={i} inView={bizInView} />
                ))}
              </div>

              <FadeUp>
                <Prose>
                  <p>
                    Epic's current Unreal Engine ecosystem includes applications across games,
                    architecture, automotive and transportation, broadcast and live events, film
                    and television, and simulation.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 4 — Infrastructure ════════════════════════════ */}
              <SectionHeading id="infrastructure">Choosing the Right Infrastructure for Unreal Engine Workloads</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Unreal Engine projects can involve demanding graphics, large assets, real-time
                    rendering and compute-intensive workflows. That makes the underlying technology
                    environment important.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={infraRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {infraRequirements.map((item, i) => (
                  <InfraCard key={i} {...item} index={i} inView={infraInView} />
                ))}
              </div>

              <FadeUp delay={0.05} className="my-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb]">
                  <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
                    <Server className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#1d1d1f] mb-0.5">Sniper IT Infrastructure Portfolio</p>
                    <p className="text-[13px] text-[#6e6e73]">End-User Computing, Networking, Data Center &amp; Virtualisation, Enterprise Mobility and HPC — covering simulation, analytics, AI/ML and scientific computing workloads.</p>
                  </div>
                  <a
                    href="/solutions/it-infrastructure"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0066cc] hover:underline underline-offset-2 whitespace-nowrap flex-shrink-0"
                  >
                    Explore IT Infrastructure <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </FadeUp>

              {/* ══ SECTION 5 — Sniper ════════════════════════════════════ */}
              <SectionHeading id="sniper-ue">How Sniper Can Help With Unreal Engine Technology Requirements</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Adopting a professional real-time 3D platform involves more than installing
                    software. Organisations may need to consider licensing, workstation
                    requirements, graphics performance, storage, networking, deployment and
                    technical support.
                  </p>
                  <p className="mt-4">
                    Sniper can help businesses evaluate the broader technology environment around
                    their creative and engineering workflows — including high-performance computing,
                    end-user computing, networking and enterprise infrastructure.
                  </p>
                  <p className="mt-4">
                    For teams evaluating Unreal Engine for gaming, digital humans, virtual
                    production, simulation or real-time 3D applications, the right combination of
                    software and infrastructure provides a stronger foundation for development
                    and deployment.
                  </p>
                </Prose>
              </FadeUp>

              {/* UE solutions link card */}
              <FadeUp delay={0.05} className="my-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb]">
                  <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#1d1d1f] mb-0.5">Sniper Unreal Engine Solutions</p>
                    <p className="text-[13px] text-[#6e6e73]">Software licensing, workstation configuration, GPU infrastructure, HPC and enterprise IT for Unreal Engine and real-time 3D workflows.</p>
                  </div>
                  <a
                    href="/partners/unreal-engine"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0066cc] hover:underline underline-offset-2 whitespace-nowrap flex-shrink-0"
                  >
                    Explore UE Solutions <ArrowRight className="w-3.5 h-3.5" />
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
                    Planning a real-time 3D project?
                  </p>
                  <h2 className="text-[28px] sm:text-[36px] font-black leading-tight mb-4">
                    Talk to Sniper About Unreal Engine and Real-Time 3D
                  </h2>
                  <p className="text-[16px] text-[#aeaeb2] max-w-xl mx-auto mb-8 leading-relaxed">
                    Software, infrastructure and technology environment for Unreal Engine, real-time
                    3D, simulation and immersive technology projects in India.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#1d1d1f] font-semibold rounded-full hover:bg-[#f5f5f7] transition-colors text-[15px]"
                    >
                      Get in touch <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="/partners/unreal-engine"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#3d3d3f] text-white font-semibold rounded-full hover:border-white transition-colors text-[15px]"
                    >
                      Explore UE Solutions
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

export default BlogZ;
