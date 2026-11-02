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
  Server,
  Database,
  Wifi,
  Cloud,
  Shield,
  Activity,
  BarChart2,
  Layers,
  Globe,
  Settings,
  HeartHandshake,
  AlertTriangle,
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
// PILLAR CARD
// ─────────────────────────────────────────────────────────
const PillarCard = ({ icon: Icon, title, description, index, inView }: {
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
  { id: "what-is",       label: "What Is AI-Ready Infrastructure?" },
  { id: "compute",       label: "1. Compute" },
  { id: "storage",       label: "2. Storage" },
  { id: "networking",    label: "3. Networking" },
  { id: "deployment",    label: "4. Deployment Model" },
  { id: "security",      label: "5. Security" },
  { id: "scalability",   label: "6. Scalability & Cost" },
  { id: "operations",    label: "7. Operations" },
  { id: "checklist",     label: "Readiness Checklist" },
  { id: "sniper",        label: "How Sniper Can Help" },
  { id: "faq",           label: "FAQ" },
];

const SidebarTOC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.getElementById("blog-article-body-ad");
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
              className={`w-full text-left text-[12px] px-2 py-1.5 rounded-lg transition-all duration-200 leading-snug flex items-center gap-2 group ${
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
const BlogAD = () => {
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
      headline: "AI-Ready IT Infrastructure: How Enterprises Should Plan Servers, Storage, Networking & HPC",
      description: "A practical guide to compute, storage, networking, hybrid cloud and HPC for enterprise AI workloads — with a readiness checklist and guidance on workload-first infrastructure planning.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
      author: { "@type": "Organization", name: "Sniper Systems & Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Sniper Systems & Solutions",
        logo: { "@type": "ImageObject", url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png" },
      },
      datePublished: "2026-09-23",
      dateModified: "2026-09-23",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sniperindia.com/blog/ai-ready-it-infrastructure-enterprise-guide" },
      keywords: "AI-ready IT infrastructure, enterprise AI infrastructure India, HPC infrastructure India, GPU servers India, AI storage infrastructure, hybrid cloud AI workloads, Sniper IT infrastructure India",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ────────────────────────────────────────────────
  useSEO({
    title: "AI-Ready IT Infrastructure: How Enterprises Should Plan Servers, Storage, Networking & HPC",
    description: "A practical guide to compute, storage, networking, hybrid cloud and HPC for enterprise AI workloads — with a readiness checklist and workload-first infrastructure planning advice for Indian businesses.",
    keywords: "AI-ready IT infrastructure India, enterprise AI infrastructure, HPC infrastructure India, GPU server India, AI storage infrastructure, hybrid cloud AI workloads, enterprise networking AI, Sniper IT infrastructure India, AI compute infrastructure India",
    ogTitle: "AI-Ready IT Infrastructure: How Enterprises Should Plan Servers, Storage, Networking & HPC",
    ogDescription: "Compute, storage, networking, hybrid cloud, HPC, security and operations — a practical enterprise AI infrastructure guide with readiness checklist.",
    ogImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
    ogUrl: "https://sniperindia.com/blog/ai-ready-it-infrastructure-enterprise-guide",
    canonicalUrl: "https://sniperindia.com/blog/ai-ready-it-infrastructure-enterprise-guide",
    twitterTitle: "AI-Ready IT Infrastructure: Servers, Storage, Networking & HPC for Enterprise AI",
    twitterDescription: "7-step guide to planning AI infrastructure — compute, storage, networking, hybrid cloud, HPC, security and operations for Indian enterprises.",
    twitterImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
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
  const stepsRef    = useRef(null);
  const pillarsRef  = useRef(null);
  const checkRef    = useRef(null);

  const stepsInView   = useInView(stepsRef,   { once: true, margin: "-60px" });
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-60px" });
  const checkInView   = useInView(checkRef,   { once: true, margin: "-60px" });

  // ── DATA ──────────────────────────────────────────────
  const computeItems = [
    "The type of AI or analytics workload",
    "Processing and memory requirements",
    "Expected concurrency and workload demand",
    "Performance and response-time targets",
    "Compatibility with existing applications and software",
    "Whether the workload will run locally, in a data centre or in the cloud",
  ];

  const storageItems = [
    "Data volume and expected growth",
    "Read/write performance requirements",
    "Connections between compute and storage",
    "Access controls and sensitive-data handling",
    "Backup, retention and recovery requirements",
    "Storage costs and lifecycle management",
  ];

  const placementItems = [
    "Data sensitivity and access requirements",
    "Performance and latency",
    "Integration with existing applications",
    "Availability and recovery needs",
    "Operating costs and resource utilization",
    "Governance and operational ownership",
  ];

  const scalabilityItems = [
    "Capacity planning: estimate requirements based on realistic workloads",
    "Utilization monitoring: track how effectively resources are being used",
    "Architecture reviews: check alignment of compute, storage and networking",
    "Scaling strategy: define how capacity will expand or contract as demand changes",
    "Operational visibility: collect metrics, alerts and logs for performance issues",
    "Lifecycle planning: review hardware, software, support and expansion over time",
  ];

  const sniperCapabilities = [
    { icon: Server,       title: "Data Centre & Virtualisation",    description: "Server, storage and virtualisation infrastructure for enterprise workloads, AI/ML environments and data centre deployments." },
    { icon: Cpu,          title: "High-Performance Computing (HPC)", description: "HPC solutions for simulation, analytics, AI/ML and scientific computing — combining CPU/GPU compute, storage and networking." },
    { icon: Wifi,         title: "Networking & Connectivity",        description: "Enterprise networking, data centre networking, SD-WAN, wireless and managed network services." },
    { icon: Cloud,        title: "Azure Cloud & Migration",          description: "Microsoft Azure cloud architecture, migration planning, AI and analytics solutions, security and cost optimisation." },
    { icon: Shield,       title: "Security & Governance",            description: "Identity, access controls, endpoint and workload security, data protection and compliance across hybrid environments." },
    { icon: Activity,     title: "Managed IT Services",              description: "Proactive monitoring, maintenance, capacity management, issue resolution and performance reporting." },
    { icon: Database,     title: "Enterprise Storage",               description: "Storage solutions designed around AI data pipelines — performance, capacity, tiering and backup." },
    { icon: HeartHandshake,title: "End-User Computing & Mobility",  description: "Workstations, enterprise mobility and collaboration infrastructure for distributed engineering and AI teams." },
  ];

  const checklistItems = [
    { label: "Workload",        question: "What business problem will the AI application solve?" },
    { label: "Compute",         question: "Which CPU, GPU or other compute resources are appropriate?" },
    { label: "Data",            question: "What storage capacity, performance and protection are required?" },
    { label: "Networking",      question: "How will data move between users, applications, storage and compute?" },
    { label: "Deployment Model",question: "Should the workload run in public cloud, private infrastructure or a hybrid environment?" },
    { label: "Security",        question: "How will identity, access, sensitive data and workloads be protected?" },
    { label: "Operations",      question: "Who will monitor, maintain and optimise the environment?" },
    { label: "Growth",          question: "How will the infrastructure change when workload demand increases?" },
  ];

  const faqs = [
    { q: "What is AI-ready IT infrastructure?",                   a: "AI-ready IT infrastructure is an environment designed to support AI workloads through appropriate compute, memory, storage, networking, security and operational management. Requirements depend on the use case and scale of the application." },
    { q: "Does AI infrastructure always require GPUs?",           a: "No. Some AI workloads can run on CPUs or managed cloud services, while other workloads benefit from GPU or specialised accelerators. The selection depends on the model, workload, performance targets and economics." },
    { q: "Why is networking important for AI infrastructure?",    a: "Networking connects compute resources, storage, data sources, cloud platforms and users. Poor network design can restrict data movement, reduce system efficiency or affect application performance." },
    { q: "Should businesses use cloud or on-premises for AI?",   a: "The choice depends on data sensitivity, performance, scaling requirements, existing infrastructure, operating costs and control requirements. Some businesses benefit from a hybrid model that uses cloud and customer-controlled infrastructure for different workloads." },
    { q: "What is HPC in AI infrastructure?",                    a: "High-performance computing uses coordinated compute, storage and networking resources to handle demanding workloads such as simulation, scientific computing, intensive analytics and some AI/ML tasks." },
    { q: "Can Sniper help businesses plan AI-ready IT infrastructure?", a: "Sniper's published infrastructure services include HPC, networking, data centre and virtualisation, end-user computing and managed services. Its Microsoft offering includes Azure architecture, migration, security and optimisation. Businesses can contact Sniper to discuss project-specific requirements." },
  ];

  const relatedPosts = [
    { title: "Why AI Is Reshaping Enterprise Server and Storage Infrastructure",                               category: "Infrastructure",    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",    readTime: "8 min read",  href: "/blog/why-ai-is-reshaping-enterprise-server-and-storage-infrastructure" },
    { title: "AI Is Changing Enterprise Networking: Is Your Business Network Ready for What's Next?",         category: "Enterprise Networking", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", readTime: "13 min read", href: "/blog/ai-ready-enterprise-networking" },
    { title: "How to Reduce Cloud Costs in 2026: FinOps Strategies for Indian Businesses",                    category: "Cloud Solutions",   image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",  readTime: "14 min read", href: "/blog/reduce-cloud-costs-finops-india" },
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
              <a href="https://sniperindia.com/" className="hover:text-[#1d1d1f] transition-colors">Blog</a>
              <span>/</span>
              <span className="text-[#1d1d1f]">IT Infrastructure</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc] bg-[#e8f0fe] px-3 py-1.5 rounded-full mb-6">
              <Cpu className="w-3.5 h-3.5" />
              AI Infrastructure · HPC · Enterprise IT
            </span>
          </FadeUp>

          <h1
            ref={heroHeadingRef}
            className="text-[36px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-black text-[#1d1d1f] leading-[1.04] tracking-tight mb-6"
            aria-label="AI-Ready IT Infrastructure: How Enterprises Should Plan Servers, Storage, Networking & HPC"
          >
            {["AI-Ready", "IT"].map((w, i) => (
              <span key={i} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br />
            {["Infrastructure"].map((w, i) => (
              <span key={i + 2} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
          </h1>

          <FadeUp delay={0.15}>
            <p className="text-[18px] sm:text-[21px] text-[#6e6e73] leading-relaxed max-w-3xl mb-10 font-normal">
              How enterprises should plan servers, storage, networking and HPC — a practical
              guide to compute, hybrid cloud and high-performance computing for AI workloads.
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
                <Tag className="w-3.5 h-3.5" /> IT Infrastructure
              </span>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.25} className="max-w-5xl mx-auto pt-8">
          <div className="relative rounded-t-3xl overflow-hidden h-[240px] sm:h-[400px] md:h-[500px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80"
              alt="AI-ready IT infrastructure — enterprise servers, storage, networking and HPC"
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

            <article id="blog-article-body-ad" className="flex-1 min-w-0">

              {/* TL;DR */}
              <FadeUp>
                <Callout type="tip">
                  <strong>TL;DR:</strong> AI projects depend on infrastructure that processes
                  data, moves information between systems and keeps applications running reliably.
                  AI-ready IT infrastructure combines suitable compute, memory, storage,
                  networking, security and operational management around specific workload needs.
                  The starting point is the workload — not simply the decision to buy more
                  powerful hardware.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 1 ─────────────────────────────────────────── */}
              <SectionHeading id="what-is">What Is AI-Ready IT Infrastructure?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    AI-ready IT infrastructure is an IT environment designed to support the
                    computing, data, networking, security and operational requirements of AI
                    applications. Requirements differ between use cases.
                  </p>
                  <p className="mt-4">
                    A business deploying an internal AI assistant may need secure access to
                    enterprise data and scalable cloud services. An organisation running
                    large-scale inference, simulation or AI/ML workloads may require
                    specialised compute, high-throughput storage and high-performance
                    networking.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="mt-4">
                <Callout type="info">
                  There is no single configuration ideal for every organisation. Microsoft's
                  Azure guidance on building a cloud-native AI foundation highlights the
                  importance of infrastructure that can adapt to changing demand while
                  maintaining reliability, visibility and control.{" "}
                  <strong>For IT leaders, the starting point should be the workload.</strong>
                </Callout>
              </FadeUp>

              {/* ══ SECTION 2 — 7 Steps ══════════════════════════════════ */}
              <SectionHeading id="compute">7 Key Considerations for AI-Ready Infrastructure</SectionHeading>

              <div ref={stepsRef} className="divide-y divide-[#e5e5ea] border-t border-[#e5e5ea] my-8">

                {/* 1 — Compute */}
                <NumberedStep number={1} title="Choose the Right Compute Infrastructure" inView={stepsInView}>
                  <div id="compute-inner">
                    <p>
                      Different workloads have different compute requirements. Traditional
                      enterprise applications may run on CPU-based servers. Workloads involving
                      parallel processing, model training, inference, simulation or intensive
                      analytics may benefit from GPU-accelerated or specialised compute.
                    </p>
                    <p>Before choosing servers or accelerators, evaluate:</p>
                    <ul className="mt-3 space-y-2.5 list-none">
                      {computeItems.map((item, i) => (
                        <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.04}>{item}</CheckItem>
                      ))}
                    </ul>
                    <Callout type="warning">
                      Avoid selecting infrastructure solely because it offers the highest
                      available performance. The goal is to select compute that matches the
                      workload and can be used efficiently.
                    </Callout>
                    <p>
                      Sniper's IT infrastructure portfolio includes{" "}
                      <strong>high-performance computing</strong> for simulation, analytics,
                      AI/ML workloads and scientific computing, combining CPU/GPU compute with
                      storage and networking.{" "}
                      <a href="/solutions/it-infrastructure" className="text-[#0066cc] underline underline-offset-2 hover:no-underline">
                        Explore Sniper's IT infrastructure solutions
                      </a>.
                    </p>
                  </div>
                </NumberedStep>

                {/* 2 — Storage */}
                <NumberedStep number={2} title="Plan Storage Around the Data Pipeline" inView={stepsInView}>
                  <div id="storage">
                    <p>
                      AI applications rely on data being available in the right format, at the
                      right time and with appropriate access controls. Storage requirements can
                      include source datasets, application files, models, logs, processed data
                      and backup copies. A practical AI storage assessment should consider:
                    </p>
                    <ul className="mt-3 space-y-2.5 list-none">
                      {storageItems.map((item, i) => (
                        <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.04}>{item}</CheckItem>
                      ))}
                    </ul>
                    <Callout type="info">
                      A storage environment that cannot supply data quickly enough becomes a
                      bottleneck even when powerful compute is available.{" "}
                      <strong>Compute and storage should be designed together</strong> rather
                      than purchased as unrelated components.
                    </Callout>
                  </div>
                </NumberedStep>

                {/* 3 — Networking */}
                <NumberedStep number={3} title="Design Networking for Data Movement and Reliability" inView={stepsInView}>
                  <div id="networking">
                    <p>
                      AI infrastructure involves moving information between users, storage,
                      compute resources, cloud services and other applications. The network
                      must be considered as part of the overall system architecture.
                    </p>
                    <p>
                      Enterprises should evaluate bandwidth, latency, network segmentation,
                      connectivity between sites, cloud access and network performance
                      monitoring. For larger compute environments, network design affects how
                      effectively resources can work together.
                    </p>
                    <Callout type="info">
                      Network requirements should be based on workload behaviour, data
                      movement, availability and security — not on headline hardware
                      specifications.
                    </Callout>
                    <p>
                      <a href="/solutions/networking-solutions" className="text-[#0066cc] underline underline-offset-2 hover:no-underline">
                        Sniper's Networking Solutions
                      </a>{" "}
                      cover enterprise networking, wireless connectivity, data centre
                      networking, network security, SD-WAN and managed network services.
                    </p>
                  </div>
                </NumberedStep>

                {/* 4 — Deployment Model */}
                <NumberedStep number={4} title="Decide Where AI Workloads Should Run" inView={stepsInView}>
                  <div id="deployment">
                    <p>
                      AI workloads do not all need to run in the same location. Depending on
                      business requirements, an organisation may use public cloud, private
                      cloud, on-premises infrastructure or a hybrid model. When evaluating
                      workload placement, consider:
                    </p>
                    <ul className="mt-3 space-y-2.5 list-none">
                      {placementItems.map((item, i) => (
                        <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.04}>{item}</CheckItem>
                      ))}
                    </ul>
                    <p>
                      A well-designed hybrid infrastructure strategy lets organisations make
                      these decisions per workload instead of forcing every application into
                      one environment. Sniper's Microsoft offering includes{" "}
                      <a href="/partners/microsoft" className="text-[#0066cc] underline underline-offset-2 hover:no-underline">
                        Azure cloud migration, architecture and cost optimisation
                      </a>.
                    </p>
                  </div>
                </NumberedStep>

                {/* 5 — Security */}
                <NumberedStep number={5} title="Build Security Into the Infrastructure" inView={stepsInView}>
                  <div id="security">
                    <p>
                      An AI-ready environment needs core security discipline with additional
                      attention to data flows, model access and the applications using AI
                      services. The security architecture should address identity, privileged
                      access, network controls, data protection, workload security, logging
                      and incident response.
                    </p>
                    <p>
                      For AI workloads, organisations should also review which data sources
                      applications can retrieve, what outputs users can share and how access
                      is monitored.
                    </p>
                    <Callout type="warning">
                      Security controls should be designed alongside compute, storage and
                      networking — not introduced only after deployment. This is especially
                      important when AI applications access business-critical information or
                      operate across hybrid environments.
                    </Callout>
                  </div>
                </NumberedStep>

                {/* 6 — Scalability */}
                <NumberedStep number={6} title="Plan for Scalability, Utilization and Cost" inView={stepsInView}>
                  <div id="scalability">
                    <p>
                      AI infrastructure can be expensive to operate if capacity is poorly
                      matched to demand. Oversized servers, underused accelerators and
                      workloads placed in unsuitable environments reduce the value of
                      infrastructure investment. A sustainable approach includes:
                    </p>
                    <ul className="mt-3 space-y-2.5 list-none">
                      {scalabilityItems.map((item, i) => (
                        <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.04}>{item}</CheckItem>
                      ))}
                    </ul>
                  </div>
                </NumberedStep>

                {/* 7 — Operations */}
                <NumberedStep number={7} title="Make Infrastructure Operations Part of the Plan" inView={stepsInView}>
                  <div id="operations">
                    <p>
                      Infrastructure readiness does not end when equipment is installed or
                      cloud resources are provisioned. Enterprise environments require ongoing
                      monitoring, maintenance, capacity management, issue resolution and
                      performance reviews.
                    </p>
                    <p>
                      Operational responsibilities may include monitoring servers and storage,
                      managing network availability, maintaining infrastructure configurations,
                      reviewing security alerts and coordinating backup and recovery — whether
                      in-house or through a managed services partner.
                    </p>
                  </div>
                </NumberedStep>

              </div>

              {/* ══ READINESS CHECKLIST ═══════════════════════════════════ */}
              <SectionHeading id="checklist">AI Infrastructure Readiness Checklist</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Before committing to an AI infrastructure project, IT leaders should
                    work through these eight questions to identify dependencies and avoid
                    expensive architectural changes later:
                  </p>
                </Prose>
              </FadeUp>

              <div ref={checkRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-8">
                {checklistItems.map((item, i) => (
                  <motion.div
                    key={i}
                    className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={checkInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease, delay: 0.04 + i * 0.06 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-[#1d1d1f] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-[13px] font-bold text-[#1d1d1f] uppercase tracking-[0.08em]">{item.label}</span>
                    </div>
                    <p className="text-[13px] text-[#6e6e73] leading-relaxed">{item.question}</p>
                  </motion.div>
                ))}
              </div>

              {/* ══ SNIPER CAPABILITIES ═══════════════════════════════════ */}
              <SectionHeading id="sniper">How Sniper Can Support AI-Ready Infrastructure Planning</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Building AI-ready infrastructure requires coordination across compute,
                    storage, networking, cloud, security and operational support. Sniper's
                    IT infrastructure portfolio and Microsoft offering can help organisations
                    evaluate the wider technology environment needed for AI/ML workloads,
                    real-time applications, analytics and advanced computing.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {sniperCapabilities.map((item, i) => (
                  <PillarCard key={i} {...item} index={i} inView={pillarsInView} />
                ))}
              </div>

              <FadeUp delay={0.05} className="my-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  {[
                    { label: "IT Infrastructure Solutions", href: "/solutions/it-infrastructure" },
                    { label: "Networking Solutions",        href: "/solutions/networking-solutions" },
                    { label: "Microsoft Azure Services",    href: "/partners/microsoft" },
                    { label: "Cloud Solutions",             href: "/solutions/cloud-solutions" },
                  ].map((link, i) => (
                    <motion.a
                      key={i}
                      href={link.href}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-[#1d1d1f] border border-[#e5e5ea] rounded-full hover:bg-[#1d1d1f] hover:text-white hover:border-[#1d1d1f] transition-all duration-200"
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease, delay: 0.05 + i * 0.07 }}
                    >
                      {link.label} <ArrowRight className="w-3.5 h-3.5" />
                    </motion.a>
                  ))}
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
                    Build on the right foundation
                  </p>
                  <h2 className="text-[28px] sm:text-[36px] font-black leading-tight mb-4">
                    Planning an AI Infrastructure or HPC Project?
                  </h2>
                  <p className="text-[16px] text-[#aeaeb2] max-w-xl mx-auto mb-8 leading-relaxed">
                    Talk to Sniper Systems &amp; Solutions about your compute, storage,
                    networking and infrastructure requirements.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#1d1d1f] font-semibold rounded-full hover:bg-[#f5f5f7] transition-colors text-[15px]"
                    >
                      Get in touch <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="/solutions/it-infrastructure"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#3d3d3f] text-white font-semibold rounded-full hover:border-white transition-colors text-[15px]"
                    >
                      Explore IT Infrastructure
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
              <a href="https://sniperindia.com/" className="hidden sm:inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0066cc] hover:underline">
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

export default BlogAD;
