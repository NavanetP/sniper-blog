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
  Cloud,
  Server,
  Database,
  Shield,
  BarChart2,
  AlertTriangle,
  Settings,
  RefreshCw,
  Activity,
  Layers,
  Globe,
  IndianRupee,
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
// NUMBERED STEP
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
// WASTE CARD
// ─────────────────────────────────────────────────────────
const WasteCard = ({ icon: Icon, title, description, index, inView }: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
}) => (
  <motion.div
    className="flex gap-4 p-5 rounded-xl border border-[#e5e5ea] bg-[#f9f9fb]"
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, ease, delay: 0.04 + index * 0.06 }}
  >
    <div className="w-9 h-9 rounded-xl bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div>
      <p className="text-[14px] font-bold text-[#1d1d1f] mb-0.5">{title}</p>
      <p className="text-[13px] text-[#6e6e73] leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────────────────
// INDIA CONSIDERATION CARD
// ─────────────────────────────────────────────────────────
const IndiaCard = ({ icon: Icon, title, description, index, inView }: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
}) => (
  <motion.div
    className="flex gap-4 p-5 sm:p-6 rounded-2xl border border-[#e5e5ea] bg-white hover:shadow-md transition-shadow duration-300"
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
  { id: "why-costs-rise",    label: "Why Cloud Costs Increase" },
  { id: "what-is-optim",    label: "What Is Cloud Optimisation?" },
  { id: "what-is-finops",   label: "What Is FinOps?" },
  { id: "strategies",       label: "8 Practical Strategies" },
  { id: "india-factors",    label: "India-Specific Factors" },
  { id: "ongoing-process",  label: "Ongoing Optimisation" },
  { id: "managed-cloud",    label: "Managed Cloud Services" },
  { id: "sniper",           label: "How Sniper Can Help" },
  { id: "faq",              label: "FAQ" },
];

const SidebarTOC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.getElementById("blog-article-body-aa");
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
const BlogAA = () => {
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
      headline: "How to Reduce Cloud Costs in 2026: FinOps Strategies for Indian Businesses",
      description: "A practical guide to cloud cost optimisation, FinOps, rightsizing, governance and managed cloud services for Indian enterprises.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
      author: { "@type": "Organization", name: "Sniper Systems & Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Sniper Systems & Solutions",
        logo: { "@type": "ImageObject", url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png" },
      },
      datePublished: "2026-09-23",
      dateModified: "2026-09-23",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sniperindia.com/blog/reduce-cloud-costs-finops-india" },
      keywords: "cloud cost optimisation India, FinOps India, reduce cloud costs, cloud rightsizing, AWS cost optimisation India, Azure cost optimisation India, cloud governance India, managed cloud services India",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ────────────────────────────────────────────────
  useSEO({
    title: "How to Reduce Cloud Costs in 2026: FinOps Strategies for Indian Businesses | Sniper",
    description: "A practical guide to cloud cost optimisation, FinOps, rightsizing, storage optimisation, governance and managed cloud services for Indian enterprises using AWS or Azure.",
    keywords: "cloud cost optimisation India, FinOps India 2026, reduce cloud costs, cloud rightsizing India, AWS cost optimisation India, Azure cost optimisation India, cloud governance India, managed cloud services India, cloud waste reduction, cloud FinOps strategies",
    ogTitle: "How to Reduce Cloud Costs in 2026: FinOps Strategies for Indian Businesses",
    ogDescription: "Rightsizing, storage optimisation, idle resource removal, FinOps, governance, pricing models and India-specific factors — a practical cloud cost guide for 2026.",
    ogImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
    ogUrl: "https://sniperindia.com/blog/reduce-cloud-costs-finops-india",
    canonicalUrl: "https://sniperindia.com/blog/reduce-cloud-costs-finops-india",
    twitterTitle: "How to Reduce Cloud Costs in 2026: FinOps Strategies for Indian Businesses",
    twitterDescription: "Cloud cost optimisation for India — FinOps, rightsizing, governance, pricing models and what Indian businesses need to consider that global guides miss.",
    twitterImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
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
  const wasteRef   = useRef(null);
  const indiaRef   = useRef(null);
  const cycleRef   = useRef(null);
  const managedRef = useRef(null);

  const stepsInView   = useInView(stepsRef,   { once: true, margin: "-60px" });
  const wasteInView   = useInView(wasteRef,   { once: true, margin: "-60px" });
  const indiaInView   = useInView(indiaRef,   { once: true, margin: "-60px" });
  const cycleInView   = useInView(cycleRef,   { once: true, margin: "-60px" });
  const managedInView = useInView(managedRef, { once: true, margin: "-60px" });

  // ── DATA ──────────────────────────────────────────────
  const wasteDrivers = [
    { icon: Server,        title: "Oversized Compute",        description: "Virtual machines provisioned for peak demand that rarely occurs, or for workloads that have since changed." },
    { icon: AlertTriangle, title: "Idle Resources",           description: "Unattached disks, unused IP addresses and forgotten test environments that keep generating charges." },
    { icon: Database,      title: "Bloated Storage",          description: "Application data, backups, snapshots and duplicate copies accumulating without review." },
    { icon: Activity,      title: "24/7 Non-Production",      description: "Dev, test and staging environments running around the clock when they are only needed during working hours." },
    { icon: BarChart2,     title: "Limited Visibility",       description: "Unclear resource ownership and no department- or workload-level cost breakdown." },
    { icon: Globe,         title: "Unplanned Egress",         description: "Data-transfer charges between regions, availability zones and the internet that were never modelled." },
  ];

  const rightsizeChecks = [
    "CPU and memory utilisation over a representative period",
    "Application performance and response times",
    "Demand patterns and scaling requirements",
    "Unused or underutilised instances",
  ];

  const storageActions = [
    "Move infrequently accessed data to lower-cost tiers using lifecycle policies",
    "Review retention and archival policies",
    "Remove obsolete data where retention rules permit",
    "Clean up old snapshots and duplicate copies",
    "Choose storage tiers by performance and recovery requirements",
  ];

  const governanceItems = [
    "Tagging and ownership standards",
    "Cost allocation by department or project",
    "Budgets and spending alerts",
    "Approval processes for new resources",
    "Periodic usage and cost reviews",
    "Reporting that links spend to business workloads",
  ];

  const pricingOptions = [
    { label: "Savings Plans",         detail: "Commitment-based discounts for steady, predictable workloads on AWS and Azure." },
    { label: "Reserved Instances",    detail: "1- or 3-year reservations for stable compute workloads with predictable usage." },
    { label: "Spot / Low-Priority",   detail: "AWS Spot and Azure Spot VMs for fault-tolerant, interruptible batch workloads." },
    { label: "Hybrid Benefit",        detail: "Azure Hybrid Benefit for organisations with eligible Windows Server or SQL Server licences." },
    { label: "On-Demand",             detail: "Pay-as-you-go for unpredictable or short-lived workloads where commitments would be wasteful." },
  ];

  const indiaFactors = [
    { icon: Globe,         title: "Region Choice & Latency",        description: "AWS in Mumbai and Hyderabad, Azure in Pune, Chennai and Mumbai. Pricing varies by region and service availability differs — compare before choosing." },
    { icon: Shield,        title: "Data Residency & Regulation",     description: "DPDPA 2023, RBI requirements for regulated financial entities and SEBI rules can govern where data is stored. Confirm before moving workloads purely for cost." },
    { icon: IndianRupee,   title: "INR Billing & GST",               description: "Check whether your provider offers INR billing, how FX movements affect USD-priced services, and how GST applies. Confirm with your finance or tax adviser." },
    { icon: Layers,        title: "Cross-Border Data Transfer",      description: "Moving data between Indian and overseas regions adds both egress charges and potential compliance questions." },
    { icon: Settings,      title: "Skills & Operating Capacity",     description: "Many organisations lack in-house FinOps expertise, making governance and regular reviews harder to sustain without a partner." },
  ];

  const optimisationCycle = [
    { step: "Assess",    detail: "Understand current spending, workloads and dependencies." },
    { step: "Prioritise",detail: "Identify the biggest opportunities and their business impact." },
    { step: "Optimise",  detail: "Adjust sizing, storage, pricing, governance and workload placement." },
    { step: "Validate",  detail: "Confirm changes have not harmed performance, security or availability." },
    { step: "Monitor",   detail: "Track usage, incidents, cost trends and utilisation, then repeat." },
  ];

  const managedItems = [
    "Monitoring infrastructure and workload health",
    "Reviewing utilisation and identifying savings opportunities",
    "Managing alerts and investigating operational issues",
    "Checking backup jobs and recovery readiness",
    "Supporting planned patching and maintenance",
    "Reporting on performance, capacity and improvements",
  ];

  const faqs = [
    { q: "How can businesses reduce cloud costs?",               a: "By rightsizing compute, removing idle resources, optimising storage, choosing suitable pricing models, controlling data transfer, clarifying ownership and monitoring usage regularly — while maintaining required performance, security and availability." },
    { q: "What is FinOps in cloud computing?",                   a: "FinOps is a collaborative practice that helps engineering, finance and business teams understand, allocate, forecast and manage technology spending, linking cloud usage to financial accountability and business value." },
    { q: "What is cloud rightsizing?",                           a: "Adjusting compute and other resource configurations to match actual workload needs, so you avoid paying for unused capacity without hurting performance." },
    { q: "How can businesses optimise AWS and Azure costs?",     a: "Review utilisation, storage tiers, unused services, Savings Plans and Reservations, budgets and alerts, and architecture. Both providers publish cost guidance and tools — AWS Cost Explorer and Microsoft Cost Management." },
    { q: "Why is cloud cost governance important?",              a: "It establishes ownership, tagging standards, budgets, reporting and approvals, helping organisations see which teams and workloads drive spending and catch unexpected costs earlier." },
    { q: "Does hosting in an Indian cloud region reduce costs?", a: "Not automatically. Pricing differs by region and service, so compare costs against latency, availability and compliance needs. Data residency rules may also decide where certain data must be stored." },
    { q: "Can managed cloud services help reduce costs?",        a: "They can support ongoing monitoring, reviews, maintenance and optimisation. The benefit depends on the provider's scope, your internal capabilities and whether improvements are validated over time." },
    { q: "Does optimisation mean moving to the cheapest platform?", a: "No. The right platform depends on performance, security, compliance, availability, licensing, data-transfer needs and operations. Cost must be balanced against business requirements." },
  ];

  const relatedPosts = [
    { title: "How Enterprises Are Using Azure OpenAI to Drive Productivity and Innovation in 2026", category: "Cloud AI", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80", readTime: "11 min read", href: "/blog/how-enterprises-are-using-azure-openai-to-drive-productivity-and-innovation-in-2026" },
    { title: "The Future of Business Transformation: How Cloud Solutions Are Empowering Indian Enterprises", category: "Cloud Solutions", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", readTime: "15 min read", href: "/blog/blogd" },
    { title: "From GCC Setup to AI-Ready Operations: Why India's GCCs Need a New IT Infrastructure Strategy", category: "GCC Infrastructure", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", readTime: "12 min read", href: "/blog/gcc-it-infrastructure-ai-ready-operations-india" },
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
              <span className="text-[#1d1d1f]">Cloud Solutions</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc] bg-[#e8f0fe] px-3 py-1.5 rounded-full mb-6">
              <Cloud className="w-3.5 h-3.5" />
              Cloud Cost Optimisation · FinOps
            </span>
          </FadeUp>

          <h1
            ref={heroHeadingRef}
            className="text-[36px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-black text-[#1d1d1f] leading-[1.04] tracking-tight mb-6"
            aria-label="How to Reduce Cloud Costs in 2026: FinOps Strategies for Indian Businesses"
          >
            {["How", "to", "Reduce"].map((w, i) => (
              <span key={i} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br />
            {["Cloud", "Costs"].map((w, i) => (
              <span key={i + 3} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br className="hidden sm:block" />
            {["in", "2026"].map((w, i) => (
              <span key={i + 5} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
          </h1>

          <FadeUp delay={0.15}>
            <p className="text-[18px] sm:text-[21px] text-[#6e6e73] leading-relaxed max-w-3xl mb-10 font-normal">
              FinOps strategies for Indian businesses — rightsizing, governance, pricing
              models and the India-specific factors that global guides overlook.
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
                <Clock className="w-4 h-4" /> 14 min read
              </span>
              <span className="flex items-center gap-1.5 text-[#0066cc] bg-[#e8f0fe] px-2.5 py-1 rounded-full font-medium">
                <Tag className="w-3.5 h-3.5" /> Cloud Solutions
              </span>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.25} className="max-w-5xl mx-auto pt-8">
          <div className="relative rounded-t-3xl overflow-hidden h-[240px] sm:h-[400px] md:h-[500px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
              alt="Cloud cost optimisation for Indian businesses — FinOps strategies 2026"
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

            <article id="blog-article-body-aa" className="flex-1 min-w-0">

              {/* TL;DR */}
              <FadeUp>
                <Callout type="tip">
                  <strong>TL;DR:</strong> Cloud cost optimisation means reducing waste and
                  aligning cloud spending with business needs — without compromising performance,
                  security, reliability or compliance. For Indian businesses, an effective
                  strategy combines FinOps practices, rightsizing, storage optimisation, smart
                  purchasing (Savings Plans, Reservations, Spot), data-transfer control,
                  governance and continuous monitoring, while keeping data residency and
                  regulatory requirements in view.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 1 ─────────────────────────────────────────── */}
              <SectionHeading id="why-costs-rise">Why Are Cloud Costs Increasing for Businesses?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Cloud bills are shaped by more than usage. Architecture decisions, resource
                    configuration, data storage, data transfer, software licensing and operating
                    requirements all affect the final amount. Common causes of unnecessary
                    spending include:
                  </p>
                </Prose>
              </FadeUp>

              <div ref={wasteRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {wasteDrivers.map((item, i) => (
                  <WasteCard key={i} {...item} index={i} inView={wasteInView} />
                ))}
              </div>

              <FadeUp>
                <Callout type="info">
                  Cloud cost management is an <strong>ongoing operational responsibility</strong>,
                  not a one-time cost-cutting exercise. Both the AWS Well-Architected Framework and
                  Microsoft Azure Well-Architected Framework recommend a structured approach:
                  understand spending, use resources efficiently, choose suitable pricing, and
                  monitor continuously.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 2 ─────────────────────────────────────────── */}
              <SectionHeading id="what-is-optim">What Is Cloud Cost Optimisation?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Cloud cost optimisation is the practice of matching cloud resources and
                    spending to actual business requirements. It involves understanding where
                    money is going, finding inefficiencies, selecting appropriate resources and
                    checking that each change delivers the intended result.
                  </p>
                  <p className="mt-4">
                    For example, an application may run on a virtual machine larger than it
                    needs. Reviewing utilisation data can show whether a smaller configuration
                    meets performance goals. Reviewing storage access patterns can reveal data
                    that belongs in a cheaper tier.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="mt-4">
                <Callout type="info">
                  The goal is not to pick the cheapest option. It is to{" "}
                  <strong>balance cost, performance, security, availability and scalability</strong>.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 3 ─────────────────────────────────────────── */}
              <SectionHeading id="what-is-finops">What Is FinOps and How Does It Help?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    FinOps is a collaborative practice for managing the financial value of cloud
                    and technology investments. It brings engineering, finance and business teams
                    together so that spending is visible, ownership is clear and decisions weigh
                    both cost and business value.
                  </p>
                  <p className="mt-4">
                    Instead of leaving the cloud bill to IT or finance alone, FinOps helps every
                    team understand how its technical decisions affect spending. A practical
                    FinOps approach includes:
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="my-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { label: "Cost visibility",         detail: "Know which services, workloads and business units generate spend." },
                    { label: "Ownership & accountability", detail: "Assign every resource to a responsible team." },
                    { label: "Budgeting & forecasting", detail: "Set expectations and flag unusual changes early." },
                    { label: "Optimisation",            detail: "Review resource usage, architecture and pricing options." },
                    { label: "Continuous improvement",  detail: "Measure whether changes improve efficiency without hurting operations." },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="p-4 rounded-xl border border-[#e5e5ea] bg-[#f9f9fb]"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, ease, delay: 0.04 + i * 0.06 }}
                    >
                      <p className="text-[13px] font-bold text-[#1d1d1f] mb-1">{item.label}</p>
                      <p className="text-[13px] text-[#6e6e73] leading-relaxed">{item.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp>
                <Prose>
                  <p>
                    The FinOps Foundation's annual State of FinOps report shows the discipline
                    expanding beyond cloud billing into wider technology value management,
                    including AI, software licensing and data centre spending. For businesses on
                    multiple clouds or hybrid environments, this connects cloud spending to the
                    total cost of running enterprise technology.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 4 — 8 Strategies ═════════════════════════════ */}
              <SectionHeading id="strategies">8 Practical Strategies to Reduce Cloud Costs</SectionHeading>

              <div ref={stepsRef} className="divide-y divide-[#e5e5ea] border-t border-[#e5e5ea] my-8">

                <NumberedStep number={1} title="Rightsize Compute Resources" inView={stepsInView}>
                  <p>
                    Rightsizing means matching compute capacity to what the workload actually
                    needs. Resources are often provisioned for peak demand that rarely occurs,
                    or for an earlier workload that has since changed. Review:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {rightsizeChecks.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.05}>{item}</CheckItem>
                    ))}
                  </ul>
                  <Callout type="warning">
                    Assess performance before changing anything. Cutting capacity without
                    understanding the workload can cause slow applications or outages.
                  </Callout>
                </NumberedStep>

                <NumberedStep number={2} title="Optimise Cloud Storage" inView={stepsInView}>
                  <p>
                    Storage costs grow quietly as organisations retain application data, backups,
                    snapshots, archives and duplicate copies. A structured review should examine
                    how often data is accessed, how long it must be kept and how quickly it must
                    be recoverable.
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {storageActions.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.05}>{item}</CheckItem>
                    ))}
                  </ul>
                  <Callout type="warning">
                    Compliance, data-protection policy and recovery objectives must be respected.
                    The cheapest tier is not always right for business-critical data.
                  </Callout>
                </NumberedStep>

                <NumberedStep number={3} title="Eliminate Idle and Unnecessary Resources" inView={stepsInView}>
                  <p>
                    Unused resources keep billing even when they deliver no value — abandoned
                    test environments, unattached volumes and services left running after a
                    project ends are common examples. Run regular reviews, define a clear process
                    for approval and removal, and use automation to start and stop non-production
                    environments during working hours only.
                  </p>
                  <Callout type="info">
                    Before deleting anything, verify ownership, dependencies, backup requirements
                    and whether the resource is needed for recovery.
                  </Callout>
                </NumberedStep>

                <NumberedStep number={4} title="Improve Governance and Cost Visibility" inView={stepsInView}>
                  <p>
                    Spending is hard to control when resources are deployed without consistent
                    naming, tagging, ownership or budgets. Establish:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {governanceItems.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.05}>{item}</CheckItem>
                    ))}
                  </ul>
                  <p>
                    Use native tools: <strong>AWS Budgets</strong>, <strong>AWS Cost Explorer</strong>{" "}
                    and the AWS Cost and Usage Report on AWS;{" "}
                    <strong>Microsoft Cost Management</strong> on Azure. Third-party FinOps
                    platforms add multi-cloud reporting where needed.
                  </p>
                </NumberedStep>

                <NumberedStep number={5} title="Use the Right Pricing Models" inView={stepsInView}>
                  <p>
                    How you buy cloud services matters as much as how much you use. Evaluate
                    the right model for each workload:
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    {pricingOptions.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-[#e5e5ea] bg-[#f9f9fb]">
                        <CheckCircle2 className="w-4 h-4 text-[#1d1d1f] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[14px] font-bold text-[#1d1d1f]">{item.label} — </span>
                          <span className="text-[14px] text-[#6e6e73]">{item.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Callout type="warning">
                    Commitments reduce flexibility. Base them on measured, stable usage rather
                    than estimates.
                  </Callout>
                </NumberedStep>

                <NumberedStep number={6} title="Control Data Transfer (Egress) Costs" inView={stepsInView}>
                  <p>
                    Data leaving a cloud region or the provider's network is billed, and these
                    charges are often a surprise. Review traffic between regions and availability
                    zones, traffic to the internet and on-premises systems, and whether a CDN,
                    caching or co-locating dependent services could reduce transfers.
                  </p>
                </NumberedStep>

                <NumberedStep number={7} title="Manage Containers, Kubernetes and AI/GPU Workloads" inView={stepsInView}>
                  <p>
                    Shared Kubernetes clusters make it hard to attribute cost to teams, and
                    over-requested CPU and memory are a common source of waste. Use namespace-
                    or label-based cost allocation, right-size resource requests and limits, and
                    scale clusters down when idle.
                  </p>
                  <p>
                    AI and GPU workloads can be among the most expensive in a cloud estate.
                    Track GPU utilisation, shut down idle training or experimentation
                    environments, and schedule non-urgent jobs on cheaper capacity where possible.
                  </p>
                </NumberedStep>

                <NumberedStep number={8} title="Review Workload Placement" inView={stepsInView}>
                  <p>
                    Assess whether each workload belongs in public cloud, private cloud or a
                    hybrid setup. For some workloads, a carefully designed hybrid architecture
                    balances operating cost, performance, compliance and control better than a
                    single-environment approach.
                  </p>
                  <Callout type="info">
                    Avoid assuming every application should move to the same place. Cost must
                    be balanced against performance, security, compliance and control requirements.
                  </Callout>
                </NumberedStep>

              </div>

              {/* ══ SECTION 5 — India ═════════════════════════════════════ */}
              <SectionHeading id="india-factors">Considerations Specific to Indian Businesses</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Cloud cost decisions in India come with local factors that a global checklist
                    overlooks. These must be considered alongside standard optimisation strategies.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={indiaRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {indiaFactors.map((item, i) => (
                  <IndiaCard key={i} {...item} index={i} inView={indiaInView} />
                ))}
              </div>

              {/* ══ SECTION 6 — Ongoing ═══════════════════════════════════ */}
              <SectionHeading id="ongoing-process">Cloud Cost Optimisation Is an Ongoing Process</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Cutting waste is only the start. Environments keep changing as applications
                    launch, workloads grow and data accumulates. A sustainable programme follows
                    a repeating cycle:
                  </p>
                </Prose>
              </FadeUp>

              <div ref={cycleRef} className="my-8">
                <div className="flex flex-col gap-3">
                  {optimisationCycle.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-4 p-5 rounded-2xl border border-[#e5e5ea] bg-white"
                      initial={{ opacity: 0, x: -16 }}
                      animate={cycleInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, ease, delay: 0.05 + i * 0.08 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#1d1d1f] text-white text-[13px] font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <span className="text-[15px] font-bold text-[#1d1d1f]">{item.step} — </span>
                        <span className="text-[15px] text-[#6e6e73]">{item.detail}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ══ SECTION 7 — Managed Cloud ═════════════════════════════ */}
              <SectionHeading id="managed-cloud">How Managed Cloud Services Support Cost Optimisation</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Cost reviews need visibility, technical knowledge and regular follow-through,
                    while teams also handle security, patching, backups, incidents and
                    performance. Managed cloud services can help coordinate these
                    responsibilities, typically including:
                  </p>
                </Prose>
              </FadeUp>

              <div ref={managedRef} className="my-8 bg-[#f9f9fb] rounded-2xl border border-[#e5e5ea] p-6 sm:p-8">
                <ul className="space-y-3">
                  {managedItems.map((item, i) => (
                    <CheckItem key={i} inView={managedInView} delay={0.03 + i * 0.05}>{item}</CheckItem>
                  ))}
                </ul>
              </div>

              <FadeUp>
                <Prose>
                  <p>
                    The value depends on the provider's scope, your existing in-house capabilities
                    and whether improvements are validated over time.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 8 — Sniper ════════════════════════════════════ */}
              <SectionHeading id="sniper">How Sniper Can Help</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Sniper Systems and Solutions provides cloud and data centre services covering
                    assessment, migration, infrastructure management, monitoring, security, cost
                    optimisation and ongoing support. Its approach includes reviewing resource
                    utilisation, aligning infrastructure with workload requirements and improving
                    cost visibility.
                  </p>
                  <p className="mt-4">
                    Its wider portfolio spans public, private and hybrid cloud, along with
                    compute, storage, virtualisation and networking — so cost decisions can be
                    made in the context of the full architecture.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="my-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb]">
                  <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
                    <Cloud className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#1d1d1f] mb-0.5">Sniper Cloud &amp; IT Infrastructure Solutions</p>
                    <p className="text-[13px] text-[#6e6e73]">Assessment, migration, infrastructure management, monitoring, security, cost optimisation and support across public, private and hybrid cloud environments.</p>
                  </div>
                  <a
                    href="/solutions/cloud-solutions"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0066cc] hover:underline underline-offset-2 whitespace-nowrap flex-shrink-0"
                  >
                    Explore Cloud Solutions <ArrowRight className="w-3.5 h-3.5" />
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
                    Planning a cloud cost review?
                  </p>
                  <h2 className="text-[28px] sm:text-[36px] font-black leading-tight mb-4">
                    Talk to Sniper About Cloud Optimisation
                  </h2>
                  <p className="text-[16px] text-[#aeaeb2] max-w-xl mx-auto mb-8 leading-relaxed">
                    Contact Sniper to discuss your cloud infrastructure and optimisation
                    requirements, or explore Sniper's cloud and IT infrastructure solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#1d1d1f] font-semibold rounded-full hover:bg-[#f5f5f7] transition-colors text-[15px]"
                    >
                      Get in touch <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="/solutions/cloud-solutions"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#3d3d3f] text-white font-semibold rounded-full hover:border-white transition-colors text-[15px]"
                    >
                      Explore Cloud Solutions
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

export default BlogAA;
