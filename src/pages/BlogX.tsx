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
  Shield,
  Tag,
  User,
  Wifi,
  Cloud,
  Cpu,
  Server,
  Globe,
  Layers,
  Activity,
  Network,
  Building2,
  HeartHandshake,
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
// NUMBERED STEP — large numeral Prismic style
// ─────────────────────────────────────────────────────────
const NumberedStep = ({ number, title, children, inView }: {
  number: number; title: string; children: React.ReactNode; inView: boolean;
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
      <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1d1d1f] mb-3 leading-snug">{title}</h3>
      <div className="text-[15px] sm:text-[16px] leading-relaxed text-[#3d3d3f] space-y-3">{children}</div>
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
        <span className="text-[16px] sm:text-[17px] font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors leading-snug">
          {q}
        </span>
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
// PILLAR CARD (dark)
// ─────────────────────────────────────────────────────────
const PillarCard = ({ icon: Icon, title, description, index, inView }: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
}) => (
  <motion.div
    className="flex gap-4 p-5 sm:p-6 rounded-2xl border border-[#e5e5ea] bg-white hover:shadow-md transition-shadow duration-300"
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
      <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-2 leading-snug group-hover:text-[#0066cc] transition-colors line-clamp-2">
        {post.title}
      </h3>
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
  { id: "bigger-shift",     label: "A Bigger Shift" },
  { id: "gcc-needs",        label: "What GCCs Need from IT" },
  { id: "deployment-model", label: "GCC Deployment Model" },
  { id: "end-to-end",       label: "End-to-End IT Partner" },
  { id: "chennai-ecosystem",label: "Chennai GCC Ecosystem" },
  { id: "sniper-role",      label: "Sniper's Role" },
  { id: "faq",              label: "FAQ" },
];

const SidebarTOC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.getElementById("blog-article-body-x");
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
const BlogX = () => {
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ── GEO META ──────────────────────────────────────────
  useEffect(() => {
    const tags: [string, string][] = [
      ["geo.region", "IN-TN"], ["geo.placename", "Chennai"],
      ["geo.position", "13.0827;80.2707"], ["ICBM", "13.0827, 80.2707"],
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
      headline: "Starbucks' Chennai GCC: What Global Capability Centres Need From Modern IT Infrastructure",
      description: "How the growth of GCCs in Chennai is changing enterprise networking, cloud, cybersecurity, deployment and managed IT — and how Sniper supports GCC infrastructure from day one.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
      author: { "@type": "Organization", name: "Sniper Systems & Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Sniper Systems & Solutions",
        logo: { "@type": "ImageObject", url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png" },
      },
      datePublished: "2026-09-23",
      dateModified: "2026-09-23",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sniperindia.com/blog/starbucks-chennai-gcc-it-infrastructure" },
      keywords: "GCC IT infrastructure Chennai, GCC infrastructure India, Global Capability Centre IT, GCC networking Chennai, GCC cloud infrastructure, GCC cybersecurity, managed IT for GCC, Sniper GCC IT partner",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ────────────────────────────────────────────────
  useSEO({
    title: "Starbucks' Chennai GCC: What Global Capability Centres Need From Modern IT Infrastructure",
    description: "How the growth of GCCs in Chennai is changing enterprise networking, cloud, cybersecurity, deployment and managed IT — and how Sniper supports GCC infrastructure from day one.",
    keywords: "GCC IT infrastructure Chennai, GCC infrastructure India, Global Capability Centre IT, GCC networking Chennai, GCC cloud infrastructure India, GCC cybersecurity, managed IT for GCC, Sniper GCC IT partner, GCC deployment India, enterprise IT for GCC, Chennai GCC setup",
    ogTitle: "Starbucks' Chennai GCC: What Global Capability Centres Need From Modern IT Infrastructure",
    ogDescription: "Starbucks picks Chennai for its new technology hub. Here's what GCCs need from networking, cloud, cybersecurity, devices and managed IT — and how Sniper can help.",
    ogImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    ogUrl: "https://sniperindia.com/blog/starbucks-chennai-gcc-it-infrastructure",
    canonicalUrl: "https://sniperindia.com/blog/starbucks-chennai-gcc-it-infrastructure",
    twitterTitle: "Starbucks' Chennai GCC: What GCCs Need From Modern IT Infrastructure",
    twitterDescription: "GCC IT infrastructure in Chennai — networking, cloud, cybersecurity, devices and managed services, designed as one connected strategy.",
    twitterImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
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
  const pillarsRef = useRef(null);
  const lifecycleRef = useRef(null);

  const stepsInView    = useInView(stepsRef,    { once: true, margin: "-60px" });
  const pillarsInView  = useInView(pillarsRef,  { once: true, margin: "-60px" });
  const lifecycleInView = useInView(lifecycleRef, { once: true, margin: "-60px" });

  // ── DATA ──────────────────────────────────────────────
  const gccRequirements = [
    { icon: Network,   title: "Enterprise Networking",        description: "Enterprise LAN, Wi-Fi, WAN, SD-WAN, segmentation, network security and proactive monitoring — designed around business workloads before technology is selected." },
    { icon: Cloud,     title: "Cloud Infrastructure",         description: "Assessment, planning, migration, deployment, infrastructure management, monitoring, security, optimisation and support — covering public, hybrid and multi-cloud environments." },
    { icon: Shield,    title: "Cybersecurity",                description: "Identity and access, endpoint protection, network security, secure remote access, data protection, backup and monitoring — built into the architecture from day one." },
    { icon: Cpu,       title: "Devices & Digital Workplace",  description: "End-user computing, enterprise mobility and AV/collaboration — procurement, configuration, deployment, user readiness and ongoing support under one coordinated model." },
  ];

  const deploymentStages = [
    "Assessment — understanding users, workloads, applications and existing infrastructure",
    "Solution design — developing the network, cloud, endpoint, security and workplace architecture",
    "Procurement — identifying and sourcing hardware, software and technology platforms",
    "Deployment — implementing and configuring infrastructure across the new environment",
    "Integration — connecting new systems with enterprise applications, identity platforms and workflows",
    "Support — providing technical assistance after go-live",
    "Managed IT — continuously monitoring, maintaining and optimising as the GCC grows",
  ];

  const partnerCapabilities = [
    { icon: Building2,     title: "IT Infrastructure & End-User Computing",  description: "Servers, storage, networking, end-user devices, enterprise mobility and AV/collaboration designed for GCC scale." },
    { icon: Cloud,         title: "Cloud Assessment & Migration",             description: "End-to-end cloud practice covering assessment, migration, deployment, infrastructure management, monitoring, security and optimisation." },
    { icon: Shield,        title: "Cybersecurity Architecture",               description: "Security designed as part of the infrastructure — not added after the fact. Identity, endpoint, network and data protection in one framework." },
    { icon: Wifi,          title: "Enterprise Networking Solutions",          description: "Network architecture, campus networking, data centre networking, SD-WAN and managed network services for demanding GCC environments." },
    { icon: Activity,      title: "Managed IT Services",                     description: "Proactive monitoring, incident management, updates and ongoing optimisation — keeping the GCC environment stable as it grows." },
    { icon: HeartHandshake,title: "Pan-India Deployment & Support",           description: "On-site deployment, post-deployment support and long-term managed IT across multiple locations and teams." },
  ];

  const faqs = [
    {
      q: "What IT infrastructure does a GCC need?",
      a: "A modern GCC may require enterprise networking, cloud or hybrid infrastructure, cybersecurity, employee devices, collaboration systems, compute, storage and ongoing IT support — all designed to scale alongside the centre.",
    },
    {
      q: "Why is deployment planning important for a GCC?",
      a: "A GCC rollout can involve large numbers of users, devices and systems going live simultaneously. Planning ensures infrastructure, endpoints, connectivity, security and workplace technology are ready when employees begin operations.",
    },
    {
      q: "What services should businesses look for in a GCC IT partner?",
      a: "Businesses should consider capabilities across assessment, consulting, solution design, procurement, deployment, integration, support and managed IT — ideally from a single partner that can manage the full lifecycle.",
    },
    {
      q: "Can Sniper support GCC infrastructure deployment in Chennai?",
      a: "Yes. Sniper's IT infrastructure offering includes design, deployment and management, along with Pan-India deployment and support. Its services span networking, cloud, cybersecurity, end-user computing and managed IT.",
    },
    {
      q: "Why are more global companies choosing Chennai for their GCC?",
      a: "Chennai offers access to a large technology talent pool, talent retention advantages and established infrastructure for global operations. Starbucks and Walgreens are among recent companies to announce Chennai GCCs.",
    },
  ];

  const relatedPosts = [
    {
      title: "From GCC Setup to AI-Ready Operations: Why India's GCCs Need a New IT Infrastructure Strategy",
      category: "GCC Infrastructure",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      readTime: "12 min read",
      href: "/blog/gcc-it-infrastructure-ai-ready-operations-india",
    },
    {
      title: "The Hidden Technology Behind India's GCC Boom: Why IT Infrastructure Is the Biggest Investment",
      category: "Enterprise IT",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      readTime: "10 min read",
      href: "/blog/the-hidden-technology-behind-indias-gcc-boom-why-it-infrastructure-matters",
    },
    {
      title: "AI Is Changing Enterprise Networking: Is Your Business Network Ready for What's Next?",
      category: "Enterprise Networking",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      readTime: "13 min read",
      href: "/blog/ai-ready-enterprise-networking",
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
              <a href="https://blog.sniperindia.com/" className="hover:text-[#1d1d1f] transition-colors">Blog</a>
              <span>/</span>
              <span className="text-[#1d1d1f]">GCC Infrastructure</span>
            </div>
          </FadeUp>

          {/* Category badge */}
          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc] bg-[#e8f0fe] px-3 py-1.5 rounded-full mb-6">
              <Globe className="w-3.5 h-3.5" />
              GCC Infrastructure · Chennai
            </span>
          </FadeUp>

          {/* Headline */}
          <h1
            ref={heroHeadingRef}
            className="text-[36px] sm:text-[52px] md:text-[62px] lg:text-[68px] font-black text-[#1d1d1f] leading-[1.04] tracking-tight mb-6"
            aria-label="Starbucks' Chennai GCC: What Global Capability Centres Need From Modern IT Infrastructure"
          >
            {["Starbucks'", "Chennai", "GCC"].map((w, i) => (
              <span key={i} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br />
            {["What", "GCCs", "Need"].map((w, i) => (
              <span key={i + 3} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br className="hidden sm:block" />
            {["From", "Modern", "IT"].map((w, i) => (
              <span key={i + 6} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
          </h1>

          {/* Standfirst */}
          <FadeUp delay={0.15}>
            <p className="text-[18px] sm:text-[21px] text-[#6e6e73] leading-relaxed max-w-3xl mb-10 font-normal">
              How the growth of GCCs in Chennai is changing enterprise networking, cloud,
              cybersecurity, deployment and managed IT.
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
                <Clock className="w-4 h-4" /> 11 min read
              </span>
              <span className="flex items-center gap-1.5 text-[#0066cc] bg-[#e8f0fe] px-2.5 py-1 rounded-full font-medium">
                <Tag className="w-3.5 h-3.5" /> GCC Infrastructure
              </span>
            </div>
          </FadeUp>
        </div>

        {/* Hero image */}
        <FadeUp delay={0.25} className="max-w-5xl mx-auto pt-8">
          <div className="relative rounded-t-3xl overflow-hidden h-[240px] sm:h-[400px] md:h-[500px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
              alt="Modern GCC office environment — Chennai enterprise IT infrastructure"
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

            <article id="blog-article-body-x" className="flex-1 min-w-0">

              {/* TL;DR */}
              <FadeUp>
                <Callout type="tip">
                  <strong>TL;DR:</strong> Starbucks has selected Chennai for a new India Technology
                  Hub supporting its global Technology organisation, with an initial target of
                  around 800 technology roles. For organisations establishing a GCC in Chennai,
                  the technology environment needs to be designed, deployed and managed around
                  networking, cloud, cybersecurity, devices, collaboration and future growth.
                  That is where an end-to-end IT services approach becomes important.
                </Callout>
              </FadeUp>

              {/* ── INTRO ─────────────────────────────────────────────── */}
              <FadeUp>
                <Prose>
                  <p>
                    Starbucks' Chennai announcement is part of a wider GCC story in India. Its
                    new hub is intended to become part of Starbucks' broader global Technology
                    footprint, with the Chennai team working closely with technology and business
                    teams across multiple global locations.
                  </p>
                  <p className="mt-4">
                    That model changes what businesses need from their technology infrastructure.
                    A GCC supporting global teams needs dependable connectivity, secure access to
                    applications and data, scalable cloud infrastructure and an employee technology
                    environment that can be expanded as the centre grows.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="mt-4">
                <Callout type="info">
                  The real question is no longer just <strong>where to set up a GCC</strong>.
                  It is <strong>how to build the IT environment</strong> that allows the GCC to
                  operate effectively from day one.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 1 ─────────────────────────────────────────── */}
              <SectionHeading id="bigger-shift">Starbucks' Chennai GCC Signals a Bigger Shift</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Starbucks' choice of Chennai was influenced by access to technology talent,
                    talent retention and the city's ability to support long-term business
                    requirements. Recent reporting puts the initial employment target at around{" "}
                    <strong>800 technology roles</strong>.
                  </p>
                  <p className="mt-4">
                    This follows Walgreens also announcing a Chennai GCC, while the city already
                    hosts technology operations of several global enterprises. Recent reporting
                    describes GCCs as increasingly supporting higher-value functions such as
                    software development, finance and research and development.
                  </p>
                  <p className="mt-4">
                    As this ecosystem develops, the demand for GCC infrastructure solutions in
                    Chennai is likely to involve more than hardware. Organisations will need
                    partners that can bring together IT infrastructure, networking, cloud,
                    cybersecurity, workplace technology, deployment and managed IT as one
                    integrated requirement.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 2 — 4 Infrastructure Needs ═══════════════════ */}
              <SectionHeading id="gcc-needs">What Does a Modern GCC Need From IT Infrastructure?</SectionHeading>

              {/* 4 numbered steps */}
              <div ref={stepsRef} className="divide-y divide-[#e5e5ea] border-t border-[#e5e5ea] my-8">

                <NumberedStep number={1} title="Enterprise Networking That Can Scale" inView={stepsInView}>
                  <p>
                    Networking is the foundation of a GCC IT environment. Employees may
                    simultaneously use cloud applications, enterprise systems, development
                    platforms, collaboration tools and global corporate resources. As teams grow,
                    the network must support higher traffic without compromising reliability
                    or security.
                  </p>
                  <p>
                    A GCC network infrastructure can include enterprise LAN and Wi-Fi, WAN,
                    SD-WAN, segmentation, network security and proactive monitoring. For a new
                    GCC, this starts with understanding business and workload requirements before
                    selecting technology.
                  </p>
                  <a
                    href="https://sniperindia.com/solutions/networking-solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-[14px] font-semibold text-[#0066cc] hover:underline underline-offset-2"
                  >
                    Explore Sniper Networking Solutions <ArrowRight className="w-4 h-4" />
                  </a>
                </NumberedStep>

                <NumberedStep number={2} title="Cloud Infrastructure Designed Around Business Workloads" inView={stepsInView}>
                  <p>
                    Cloud is another major part of modern GCC environments. Development,
                    applications, collaboration, data and other workloads may require different
                    infrastructure models — public cloud, hybrid environments or connections
                    between cloud platforms and existing infrastructure.
                  </p>
                  <p>
                    Sniper's cloud services cover cloud assessment, planning, migration and
                    deployment, infrastructure management, monitoring, security, optimisation
                    and support — creating a practical model:
                  </p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 p-5 bg-[#f5f5f7] rounded-xl">
                    {["Assess", "Design", "Migrate", "Deploy", "Manage", "Optimise"].map((label, i, arr) => (
                      <div key={i} className="flex items-center gap-2 sm:gap-3">
                        <span className="text-[13px] font-bold text-[#1d1d1f] bg-white px-3 py-1.5 rounded-lg border border-[#e5e5ea] whitespace-nowrap">
                          {label}
                        </span>
                        {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-[#8e8e93] flex-shrink-0" />}
                      </div>
                    ))}
                  </div>
                </NumberedStep>

                <NumberedStep number={3} title="Cybersecurity Built Into the Architecture" inView={stepsInView}>
                  <p>
                    A GCC can connect users, applications, devices and data across multiple
                    locations. Security needs to be considered before infrastructure is deployed,
                    not added as an afterthought. Depending on the environment, organisations may
                    need identity and access controls, endpoint protection, network security,
                    secure remote access, data protection, backup and monitoring.
                  </p>
                  <p>
                    For a growing GCC in Chennai, the objective is to create security controls
                    that can scale alongside users, applications and locations — from initial
                    setup through long-term operations.
                  </p>
                </NumberedStep>

                <NumberedStep number={4} title="Devices and Digital Workplace Technology" inView={stepsInView}>
                  <p>
                    A new GCC has an immediate employee technology requirement. Hundreds of
                    employees may need laptops, desktops, mobile devices, collaboration platforms
                    and meeting-room systems within a defined rollout window.
                  </p>
                  <p>
                    The challenge is not simply procurement — it is{" "}
                    <strong>procurement + configuration + deployment + user readiness + support</strong>.
                    Bringing these requirements under one coordinated delivery model simplifies
                    large-scale GCC rollouts significantly.
                  </p>
                </NumberedStep>

              </div>

              {/* ══ SECTION 3 ─────────────────────────────────────────── */}
              <SectionHeading id="deployment-model">GCC Deployment Is More Than an Installation Project</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    This is where the difference between an IT supplier and an IT services
                    partner becomes visible. A GCC deployment involves multiple interconnected
                    stages that need to be planned and delivered in sequence:
                  </p>
                </Prose>
              </FadeUp>

              <div ref={lifecycleRef} className="my-8 bg-[#f9f9fb] rounded-2xl border border-[#e5e5ea] p-6 sm:p-8">
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#8e8e93] mb-5">GCC deployment lifecycle</p>
                <ul className="space-y-3">
                  {deploymentStages.map((item, i) => (
                    <CheckItem key={i} inView={lifecycleInView} delay={0.04 + i * 0.05}>{item}</CheckItem>
                  ))}
                </ul>
              </div>

              <FadeUp>
                <Prose>
                  <p>
                    Sniper's IT infrastructure proposition is built around design, deployment and
                    management, with a consultative approach and Pan-India deployment and support.
                    For companies establishing a new GCC, that end-to-end model can reduce the
                    complexity of coordinating multiple technology vendors.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 4 ─────────────────────────────────────────── */}
              <SectionHeading id="end-to-end">Why GCCs Need an End-to-End IT Partner</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Setting up a GCC usually involves multiple stakeholders — business leaders,
                    facilities teams, HR, procurement, security teams and IT. Technology needs
                    to connect all of those requirements. A partner involved early in the process
                    can help translate business plans into an infrastructure roadmap and carry
                    that roadmap through implementation and operations.
                  </p>
                </Prose>
              </FadeUp>

              {/* Business plan → go-live flow */}
              <FadeUp delay={0.05} className="my-8">
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-center gap-2 p-6 sm:p-8 bg-[#1d1d1f] rounded-2xl text-white">
                  {[
                    "Business plan",
                    "IT assessment",
                    "Architecture & design",
                    "Technology procurement",
                    "Deployment & integration",
                    "Go-live",
                    "Managed IT & optimisation",
                  ].map((label, i, arr) => (
                    <div key={i} className="flex items-center gap-2">
                      <motion.span
                        className="text-[13px] font-semibold text-white bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg whitespace-nowrap"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease, delay: 0.05 + i * 0.07 }}
                      >
                        {label}
                      </motion.span>
                      {i < arr.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-white/40 flex-shrink-0 hidden sm:block" />
                      )}
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp>
                <Prose>
                  <p>
                    That is a more sustainable approach than treating infrastructure as a
                    one-time purchase. It gives IT and business teams a consistent point of
                    contact across the entire lifecycle.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 5 ─────────────────────────────────────────── */}
              <SectionHeading id="chennai-ecosystem">Why This Matters for Chennai's GCC Ecosystem</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    As Chennai's GCC ecosystem develops, the demand for GCC infrastructure
                    solutions will involve more than hardware supply. Organisations will need
                    partners that can bring together:
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="my-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    "IT Infrastructure", "Networking", "Cloud", "Cybersecurity",
                    "Workplace Technology", "Deployment", "Managed IT", "Pan-India Support",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="p-4 rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease, delay: 0.04 + i * 0.05 }}
                    >
                      <p className="text-[13px] font-semibold text-[#1d1d1f]">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp>
                <Prose>
                  <p>
                    That integrated requirement is increasingly important for GCCs that need to
                    scale quickly while maintaining secure and reliable operations.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 6 — Sniper's Role ═════════════════════════════ */}
              <SectionHeading id="sniper-role">Sniper's Role in a GCC Technology Journey</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    For a new or expanding Global Capability Centre, Sniper can contribute across
                    the technology lifecycle rather than at only the procurement stage. Its
                    enterprise IT infrastructure services span end-user computing, networking,
                    data centre and virtualisation, enterprise mobility, AV and collaboration,
                    HPC and managed services.
                  </p>
                  <p className="mt-4">
                    Its cloud practice adds assessment, migration, deployment, infrastructure
                    management, monitoring, security, optimisation and support. Combined, this
                    supports a more complete GCC journey:
                  </p>
                </Prose>
              </FadeUp>

              {/* Plan → Manage flow */}
              <FadeUp delay={0.05} className="my-8">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-6 px-6 bg-[#f5f5f7] rounded-2xl">
                  {["Plan", "Procure", "Deploy", "Integrate", "Support", "Manage"].map((label, i, arr) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3">
                      <motion.span
                        className="text-[13px] sm:text-[14px] font-bold text-[#1d1d1f] bg-white px-3 sm:px-4 py-2 rounded-xl shadow-sm border border-[#e5e5ea] whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease, delay: 0.05 + i * 0.08 }}
                      >
                        {label}
                      </motion.span>
                      {i < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-[#8e8e93] flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </FadeUp>

              {/* Partner capability cards */}
              <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {partnerCapabilities.map((p, i) => (
                  <PillarCard key={i} {...p} index={i} inView={pillarsInView} />
                ))}
              </div>

              {/* Internal networking link */}
              <FadeUp delay={0.05} className="my-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb]">
                  <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
                    <Network className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#1d1d1f] mb-0.5">Enterprise Networking for GCCs</p>
                    <p className="text-[13px] text-[#6e6e73]">LAN, Wi-Fi, SD-WAN, network security and managed network services designed for GCC scale.</p>
                  </div>
                  <a
                    href="https://sniperindia.com/solutions/networking-solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0066cc] hover:underline underline-offset-2 whitespace-nowrap flex-shrink-0"
                  >
                    Explore Networking Solutions <ArrowRight className="w-3.5 h-3.5" />
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
                    Building a GCC?
                  </p>
                  <h2 className="text-[28px] sm:text-[36px] font-black leading-tight mb-4">
                    Start With the IT Foundation
                  </h2>
                  <p className="text-[16px] text-[#aeaeb2] max-w-xl mx-auto mb-8 leading-relaxed">
                    A successful GCC needs an IT environment that is secure, scalable, connected
                    and manageable from day one. Talk to Sniper about networking, cloud, devices,
                    cybersecurity and managed IT for your Chennai GCC.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#1d1d1f] font-semibold rounded-full hover:bg-[#f5f5f7] transition-colors text-[15px]"
                    >
                      Get in touch <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="https://sniperindia.com/solutions/networking-solutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#3d3d3f] text-white font-semibold rounded-full hover:border-white transition-colors text-[15px]"
                    >
                      Networking Solutions
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

export default BlogX;
