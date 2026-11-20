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
  Shield,
  Database,
  Cloud,
  Wifi,
  Monitor,
  Settings,
  HeartHandshake,
  Globe,
  BarChart2,
  Layers,
  Activity,
  Building2,
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
    transition={{ duration: 0.6, ease, delay: 0.05 + (number - 1) * 0.06 }}
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
  { id: "gcc-evolution",   label: "How GCCs Are Evolving" },
  { id: "eight-pillars",   label: "8 Technology Pillars" },
  { id: "checklist",       label: "GCC IT Readiness Checklist" },
  { id: "sniper-gcc",      label: "How Sniper Can Help" },
  { id: "faq",             label: "FAQ" },
];

const SidebarTOC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.getElementById("blog-article-body-ag");
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
const BlogAG = () => {
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
      headline: "AI, Data & Cybersecurity Trends in India's GCCs: What IT Leaders Must Prepare for",
      description: "How AI, enterprise data and cybersecurity are changing GCC technology requirements and the IT infrastructure needed to support global operations in India.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
      author: { "@type": "Organization", name: "Sniper Systems & Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Sniper Systems & Solutions",
        logo: { "@type": "ImageObject", url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png" },
      },
      datePublished: "2026-11-05",
      dateModified: "2026-11-05",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sniperindia.com/blog/ai-data-cybersecurity-gcc-india-it-trends" },
      keywords: "GCC AI infrastructure India, GCC cybersecurity India, GCC data infrastructure, India GCC IT trends, GCC technology requirements, Sniper GCC solutions India, Global Capability Centre IT India",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ────────────────────────────────────────────────
  useSEO({
    title: "AI, Data & Cybersecurity Trends in India's GCCs: What IT Leaders Must Prepare for",
    description: "How AI adoption, enterprise data infrastructure, cybersecurity, cloud, networking and workplace technology are changing GCC requirements in India — and what IT leaders should prepare.",
    keywords: "GCC AI infrastructure India, GCC cybersecurity India, GCC data infrastructure, India GCC IT trends 2026, GCC technology requirements, Sniper GCC solutions India, Global Capability Centre IT infrastructure India, GCC hybrid cloud India",
    ogTitle: "AI, Data & Cybersecurity Trends in India's GCCs: What IT Leaders Must Prepare for",
    ogDescription: "AI, data, cybersecurity, cloud, networking and managed IT — the 8 technology pillars India's GCCs need and a readiness checklist for IT leaders.",
    ogImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    ogUrl: "https://sniperindia.com/blog/ai-data-cybersecurity-gcc-india-it-trends",
    canonicalUrl: "https://sniperindia.com/blog/ai-data-cybersecurity-gcc-india-it-trends",
    twitterTitle: "AI, Data & Cybersecurity Trends in India's GCCs: What IT Leaders Must Prepare for",
    twitterDescription: "8 technology pillars for India's GCCs — AI infrastructure, data governance, cybersecurity, cloud, networking, workplace, deployment and managed IT.",
    twitterImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
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
  const checkRef   = useRef(null);

  const stepsInView   = useInView(stepsRef,   { once: true, margin: "-60px" });
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-60px" });
  const checkInView   = useInView(checkRef,   { once: true, margin: "-60px" });

  // ── DATA ──────────────────────────────────────────────
  const aiInfraItems = [
    "Suitable CPU and GPU-enabled computing resources",
    "High-performance storage",
    "Reliable enterprise networking",
    "Cloud and hybrid infrastructure",
    "Secure access to enterprise data",
    "Monitoring and resource management",
  ];

  const dataInfraItems = [
    "Data availability — make relevant business information accessible to authorised users and applications",
    "Storage architecture — select storage based on performance, capacity, retention and recovery requirements",
    "Data integration — connect relevant systems and information sources through appropriate approaches",
    "Access governance — establish permissions and controls around sensitive information",
    "Backup and recovery — protect important business information and plan for operational disruptions",
  ];

  const cyberLayers = [
    { icon: Shield,    title: "Identity & Access Management", description: "Control access to business systems and information through identity management, authentication and privileged-access controls." },
    { icon: Monitor,   title: "Endpoint Security",            description: "Protect employee laptops, desktops and mobile devices, especially where teams access business systems across multiple locations." },
    { icon: Wifi,      title: "Network Security",             description: "Use segmentation, firewalls, secure connectivity and access controls to protect communication between users, applications and infrastructure." },
    { icon: Cloud,     title: "Cloud Security",               description: "Establish controls for cloud workloads, identities, storage, applications and external connectivity." },
    { icon: Database,  title: "Data Protection",              description: "Protect sensitive business information through encryption, access management, backup and suitable retention policies." },
    { icon: Activity,  title: "Security Monitoring",          description: "Maintain visibility into infrastructure activity, security alerts and potential incidents." },
  ];

  const cloudItems = [
    "Which workloads should move to cloud",
    "Which applications should remain on existing infrastructure",
    "How cloud and data centres will connect securely",
    "How identities and access policies will be managed",
    "How infrastructure performance and availability will be monitored",
    "How cloud resources and operational costs will be controlled",
  ];

  const networkItems = [
    "Enterprise LAN and wireless networks",
    "Secure WAN connectivity",
    "SD-WAN for distributed locations",
    "Data centre networking",
    "Network segmentation and access controls",
    "Monitoring and network management",
  ];

  const workplaceItems = [
    "Business laptops and desktops",
    "Automated device deployment",
    "Mobile device management (MDM)",
    "Endpoint security and configuration",
    "Microsoft 365 and collaboration platforms",
    "Enterprise mobility",
    "Video conferencing and meeting-room systems",
    "IT helpdesk and employee support",
  ];

  const deploymentSteps = [
    { step: "Assessment",          detail: "Understand business requirements, workloads and existing technology dependencies." },
    { step: "Solution design",     detail: "Develop the infrastructure, networking, cloud and security architecture." },
    { step: "Multi-OEM procurement",detail: "Identify appropriate technology products and coordinate vendors." },
    { step: "Deployment",          detail: "Configure and install infrastructure, devices and network environments." },
    { step: "Integration",         detail: "Connect systems, applications and security controls." },
    { step: "Operational readiness",detail: "Validate the environment before employees begin using it." },
  ];

  const managedServices = [
    "Infrastructure monitoring",
    "Network monitoring and maintenance",
    "Onsite and remote technical support",
    "Incident management",
    "Asset and device lifecycle management",
    "Preventive maintenance and AMC",
    "Technology refresh and expansion support",
  ];

  const checklistRows = [
    { area: "AI infrastructure",   question: "Can the environment support the planned AI and analytics workloads?" },
    { area: "Data",                question: "Are data access, storage, governance and backup policies established?" },
    { area: "Cybersecurity",       question: "Are identity, endpoint, network and cloud security controls in place?" },
    { area: "Cloud",               question: "Is the workload placement and hybrid architecture strategy defined?" },
    { area: "Networking",          question: "Can the network support global applications and future locations?" },
    { area: "Workplace",           question: "Are employee devices, collaboration systems and MDM ready?" },
    { area: "Deployment",          question: "Are procurement, integration and implementation responsibilities clear?" },
    { area: "Managed IT",          question: "Is post-deployment monitoring, helpdesk and infrastructure support planned?" },
  ];

  const sniperCapabilities = [
    { icon: Cpu,          title: "Enterprise IT Infrastructure",      description: "Servers, storage, virtualisation, data centres and compute — designed around GCC workload requirements." },
    { icon: Cloud,        title: "Cloud & AI Infrastructure",         description: "Cloud migration, hybrid cloud, AI infrastructure and cloud optimisation across AWS, Azure and Google Cloud." },
    { icon: Wifi,         title: "Enterprise Networking",             description: "Campus networks, wireless, SD-WAN, data centre connectivity and managed network services." },
    { icon: Shield,       title: "Cybersecurity",                     description: "Endpoint, identity, cloud security, access controls and data protection built into the GCC architecture." },
    { icon: Monitor,      title: "Digital Workplace",                 description: "Microsoft, Apple, enterprise mobility, collaboration and meeting-room solutions for GCC teams." },
    { icon: Settings,     title: "Professional Services & Deployment",description: "Solution design, presales, multi-OEM procurement coordination, configuration, deployment and integration." },
    { icon: HeartHandshake,title: "Managed IT",                      description: "Monitoring, AMC, onsite and remote support, infrastructure management and technology lifecycle services." },
    { icon: Building2,    title: "GCC Lifecycle Partnership",         description: "One partner across the full GCC technology lifecycle — from initial setup through operational growth and expansion." },
  ];

  const faqs = [
    { q: "What are the major technology trends shaping GCCs in India?",          a: "AI adoption, data analytics, cybersecurity, cloud infrastructure, enterprise networking, automation and managed IT operations are important technology themes influencing the evolution of India's GCC ecosystem." },
    { q: "Why is AI-ready infrastructure important for a GCC?",                   a: "AI applications may require suitable compute resources, data storage, secure connectivity, cloud platforms and monitoring. Infrastructure planning helps ensure workloads can operate reliably as they expand." },
    { q: "What IT infrastructure does a new GCC require?",                        a: "A GCC typically requires enterprise networking, servers, storage, cloud infrastructure, cybersecurity, employee devices, collaboration technology, backup and ongoing IT support. The exact architecture depends on the centre's business functions." },
    { q: "Why is cybersecurity important for Global Capability Centres?",         a: "GCCs may manage sensitive business information, global applications and enterprise technology systems. Identity management, endpoint protection, network security, cloud protection and data governance help establish a more secure operating environment." },
    { q: "Should GCCs use public cloud or hybrid cloud?",                         a: "The decision depends on workload requirements, performance, data protection, compliance, integration and operational costs. Hybrid cloud can connect public-cloud services with private and on-premises environments where appropriate." },
    { q: "What are managed IT services for GCCs?",                               a: "Managed IT services support the ongoing operation of GCC technology environments through monitoring, maintenance, helpdesk, incident management, infrastructure support and technology lifecycle services." },
    { q: "Why should businesses consider a multi-OEM IT partner for GCC setup?",  a: "An integrated IT partner can coordinate technology selection, solution design, procurement, deployment and integration across multiple vendors, reducing the complexity of managing disconnected technology projects." },
    { q: "Can Sniper support GCC setup and IT infrastructure in India?",          a: "Sniper's GCC offering covers IT infrastructure, cloud, networking, cybersecurity, digital workplace, multi-OEM solutions, deployment and managed IT support. Businesses can discuss their requirements through Sniper's GCC Solutions page." },
  ];

  const relatedPosts = [
    { title: "From GCC Setup to AI-Ready Operations: Why India's GCCs Need a New IT Infrastructure Strategy", category: "GCC Infrastructure", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", readTime: "12 min read", href: "/blog/gcc-it-infrastructure-ai-ready-operations-india" },
    { title: "Starbucks' Chennai GCC: What Global Capability Centres Need From Modern IT Infrastructure",      category: "GCC Infrastructure", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", readTime: "11 min read", href: "/blog/starbucks-chennai-gcc-it-infrastructure" },
    { title: "AI Is Changing Enterprise Networking: Is Your Business Network Ready for What's Next?",         category: "Enterprise Networking", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", readTime: "13 min read", href: "/blog/ai-ready-enterprise-networking" },
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
              <span className="text-[#1d1d1f]">GCC Infrastructure</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc] bg-[#e8f0fe] px-3 py-1.5 rounded-full mb-6">
              <Globe className="w-3.5 h-3.5" />
              India GCCs · AI · Cybersecurity · IT Trends
            </span>
          </FadeUp>

          <h1
            ref={heroHeadingRef}
            className="text-[36px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-black text-[#1d1d1f] leading-[1.04] tracking-tight mb-6"
            aria-label="AI, Data & Cybersecurity Trends in India's GCCs: What IT Leaders Must Prepare for"
          >
            {["AI,", "Data", "&"].map((w, i) => (
              <span key={i} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br />
            {["Cybersecurity", "in"].map((w, i) => (
              <span key={i + 3} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br className="hidden sm:block" />
            {["India's", "GCCs"].map((w, i) => (
              <span key={i + 5} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
          </h1>

          <FadeUp delay={0.15}>
            <p className="text-[18px] sm:text-[21px] text-[#6e6e73] leading-relaxed max-w-3xl mb-10 font-normal">
              What IT leaders must prepare for — how AI adoption, enterprise data and
              cybersecurity are changing GCC technology requirements and the infrastructure
              needed to support global operations.
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
                <Calendar className="w-4 h-4" /> November 5, 2026
              </span>
              <span className="flex items-center gap-1.5 text-[#8e8e93]">
                <Clock className="w-4 h-4" /> 16 min read
              </span>
              <span className="flex items-center gap-1.5 text-[#0066cc] bg-[#e8f0fe] px-2.5 py-1 rounded-full font-medium">
                <Tag className="w-3.5 h-3.5" /> GCC Infrastructure
              </span>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.25} className="max-w-5xl mx-auto pt-8">
          <div className="relative rounded-t-3xl overflow-hidden h-[240px] sm:h-[400px] md:h-[500px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
              alt="India GCC AI data and cybersecurity trends — enterprise IT infrastructure"
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

            <article id="blog-article-body-ag" className="flex-1 min-w-0">

              {/* TL;DR */}
              <FadeUp>
                <Callout type="tip">
                  <strong>TL;DR:</strong> India's GCCs are evolving beyond traditional IT
                  support. They are increasingly involved in AI adoption, data analytics,
                  software engineering, product development and global cybersecurity operations.
                  Organisations need AI-ready computing, secure data environments, enterprise
                  networking, cloud infrastructure, endpoint management and reliable IT
                  operations — and preparing these technology foundations early can reduce
                  deployment complexity and support long-term operational growth.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 1 — GCC Evolution ════════════════════════════ */}
              <SectionHeading id="gcc-evolution">How Are AI, Data and Cybersecurity Changing India's GCC Ecosystem?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    The role of Global Capability Centres is changing. Traditionally, many
                    GCCs supported global organisations through IT services, finance, business
                    processes and operational functions. Today, more centres are taking
                    responsibility for technology development, product engineering, analytics,
                    AI initiatives and enterprise platforms.
                  </p>
                  <p className="mt-4">
                    The Zinnov–NASSCOM GCC Landscape in India 2026 report describes this
                    evolution as a shift from delivery-focused centres towards greater
                    ownership of products, platforms and enterprise outcomes. Recent industry
                    analysis from Quess Corp also identifies increasing demand for specialised
                    AI, data, analytics and cybersecurity capabilities across Indian GCCs.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="mt-4">
                <Callout type="info">
                  For IT leaders, this creates an important challenge:{" "}
                  <strong>How can the technology environment support increasingly complex
                  global workloads while remaining secure, scalable and manageable?</strong>{" "}
                  The answer begins with rethinking GCC IT infrastructure.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 2 — 8 Technology Pillars ════════════════════ */}
              <SectionHeading id="eight-pillars">8 Technology Areas IT Leaders Must Prepare For</SectionHeading>

              <div ref={stepsRef} className="divide-y divide-[#e5e5ea] border-t border-[#e5e5ea] my-8">

                {/* 1 — AI */}
                <NumberedStep number={1} title="AI Adoption Is Increasing the Need for Infrastructure Readiness" inView={stepsInView}>
                  <p>
                    AI is becoming part of how GCCs approach software development, analytics,
                    automation and business operations. However, implementing AI is not simply
                    about choosing an AI application — businesses also need infrastructure
                    capable of supporting the underlying workloads. Depending on the use case,
                    an AI-ready GCC infrastructure may require:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {aiInfraItems.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.04}>{item}</CheckItem>
                    ))}
                  </ul>
                  <Callout type="info">
                    <strong>What IT leaders should prepare:</strong> Assess compute, storage,
                    networking and cloud requirements before scaling AI projects from
                    experimentation into production environments. Sniper supports enterprise
                    infrastructure requirements through its{" "}
                    <a href="/solutions/it-infrastructure" className="text-[#15803d] underline underline-offset-2 hover:no-underline">IT Infrastructure Solutions</a>,
                    including computing, data centre, networking, end-user computing and
                    high-performance computing.
                  </Callout>
                </NumberedStep>

                {/* 2 — Data */}
                <NumberedStep number={2} title="Data Infrastructure and Governance Are Becoming Strategic Priorities" inView={stepsInView}>
                  <p>
                    AI and advanced analytics depend on access to reliable, organised and
                    appropriately governed business data. For GCCs supporting global operations,
                    data may be distributed across applications, cloud platforms, enterprise
                    databases and on-premises infrastructure. A strong GCC data infrastructure
                    strategy should consider:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {dataInfraItems.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.04}>{item}</CheckItem>
                    ))}
                  </ul>
                  <Callout type="warning">
                    Data governance is especially important when AI applications use enterprise
                    information. Organisations should understand which information can be
                    accessed, how it is processed and who is responsible for managing it.
                    Zinnov–NASSCOM's 2026 GCC research and the Zinnov–Dell GCC 2030
                    whitepaper both highlight data readiness as a critical AI scaling foundation.
                  </Callout>
                </NumberedStep>

                {/* 3 — Cybersecurity */}
                <NumberedStep number={3} title="Cybersecurity Must Evolve Alongside GCC Technology" inView={stepsInView}>
                  <p>
                    As GCCs take on more responsibility for global applications, sensitive
                    information and enterprise technology operations, cybersecurity becomes a
                    core infrastructure requirement. KPMG's{" "}
                    <em>Secure in India 2026: Cyber GCCs in the Age of AI</em> highlights
                    the growing importance of AI security, cloud security, data protection,
                    cyber resilience and security governance.
                  </p>
                  <p>Modern GCC environments should consider security across multiple layers:</p>
                </NumberedStep>

                {/* 4 — Cloud */}
                <NumberedStep number={4} title="Cloud and Hybrid Infrastructure Need a Clear Strategy" inView={stepsInView}>
                  <p>
                    A modern GCC may use a combination of public cloud services, private
                    infrastructure and existing enterprise data centres. Different workloads
                    have different requirements, making hybrid cloud infrastructure an
                    important architectural consideration. An effective strategy should evaluate:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {cloudItems.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.04}>{item}</CheckItem>
                    ))}
                  </ul>
                  <Callout type="info">
                    The aim is not to move everything to the cloud. It is to select the
                    appropriate environment for each workload.{" "}
                    <a href="/solutions/cloud-solutions" className="text-[#1d1d1f] underline underline-offset-2 hover:no-underline">
                      Sniper's Cloud Solutions
                    </a>{" "}
                    cover cloud assessment, migration, AWS, Microsoft Azure, Google Cloud,
                    hybrid cloud, security, optimisation and managed cloud operations.
                  </Callout>
                </NumberedStep>

                {/* 5 — Networking */}
                <NumberedStep number={5} title="Enterprise Networking Must Support Global Collaboration" inView={stepsInView}>
                  <p>
                    GCCs operate as part of wider international organisations. Employees may
                    need continuous access to headquarters, regional offices, cloud applications,
                    data centres and collaboration platforms. The network architecture should
                    consider:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {networkItems.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.04}>{item}</CheckItem>
                    ))}
                  </ul>
                  <p>
                    <a href="/solutions/networking-solutions" className="text-[#0066cc] underline underline-offset-2 hover:no-underline">
                      Sniper provides Enterprise Networking Solutions
                    </a>{" "}
                    including network architecture, campus networking, data centre networking,
                    wireless, SD-WAN, network security and managed network services.
                  </p>
                </NumberedStep>

                {/* 6 — Workplace */}
                <NumberedStep number={6} title="Digital Workplace and Device Management Must Scale With the GCC" inView={stepsInView}>
                  <p>
                    As organisations recruit and expand teams, they need a consistent approach
                    to device procurement, configuration, deployment, security and ongoing
                    support. A modern GCC digital workplace may include:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {workplaceItems.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.04}>{item}</CheckItem>
                    ))}
                  </ul>
                </NumberedStep>

                {/* 7 — Deployment */}
                <NumberedStep number={7} title="Professional Services and Deployment Are Critical to GCC Readiness" inView={stepsInView}>
                  <p>
                    Setting up a GCC involves more than purchasing servers, devices and
                    software. Different technology platforms must work together and their
                    deployment needs to align with the organisation's operational requirements.
                    An integrated IT delivery approach involves:
                  </p>
                  <div className="relative pl-8 border-l-2 border-[#e5e5ea] mt-5 space-y-0">
                    {deploymentSteps.map(({ step, detail }, i) => (
                      <motion.div key={i} className="relative pb-6 last:pb-0"
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease, delay: i * 0.06 }}>
                        <div className="absolute -left-[calc(2rem+5px)] top-1 w-3 h-3 rounded-full bg-[#1d1d1f] border-2 border-white ring-1 ring-[#1d1d1f]" />
                        <p className="text-[15px] leading-snug">
                          <strong className="font-semibold text-[#1d1d1f]">{step}</strong>
                          <span className="text-[#6e6e73] ml-2 text-[14px]">— {detail}</span>
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </NumberedStep>

                {/* 8 — Managed IT */}
                <NumberedStep number={8} title="Managed IT Services Support Long-Term GCC Operations" inView={stepsInView}>
                  <p>
                    GCC technology requirements continue after the initial office and
                    infrastructure setup. As the organisation expands, it needs ongoing
                    support for infrastructure, networks, endpoints, applications and
                    business-critical systems. Managed IT services for GCCs can help maintain
                    operational continuity through:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {managedServices.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.04}>{item}</CheckItem>
                    ))}
                  </ul>
                  <Callout type="info">
                    The important distinction is between completing an installation project
                    and <strong>supporting the IT environment throughout its operational
                    lifecycle</strong>.
                  </Callout>
                </NumberedStep>

              </div>

              {/* Cybersecurity layers grid (after Step 3) */}
              <SectionHeading id="cyber-layers">Cybersecurity Layers for Modern GCC Environments</SectionHeading>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {cyberLayers.map((item, i) => (
                  <motion.div key={i}
                    className="flex gap-4 p-5 rounded-xl border border-[#e5e5ea] bg-[#f9f9fb]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease, delay: 0.04 + i * 0.07 }}>
                    <div className="w-9 h-9 rounded-xl bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#1d1d1f] mb-1">{item.title}</p>
                      <p className="text-[13px] text-[#6e6e73] leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <FadeUp>
                <Callout type="warning">
                  AI also introduces additional considerations — data exposure, model access,
                  third-party dependencies and the governance of AI-enabled applications.{" "}
                  <strong>Treat cybersecurity as part of infrastructure architecture, not as
                  a separate project to be introduced after deployment.</strong>
                </Callout>
              </FadeUp>

              {/* ══ CHECKLIST ════════════════════════════════════════════ */}
              <SectionHeading id="checklist">GCC IT Readiness Checklist for Business Leaders</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Before establishing or expanding a Global Capability Centre in India, IT
                    leaders should evaluate the following areas together — not as disconnected
                    procurement projects:
                  </p>
                </Prose>
              </FadeUp>

              <div ref={checkRef} className="overflow-hidden rounded-2xl border border-[#e5e5ea] my-8">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="bg-[#1d1d1f] text-white">
                      <th className="text-left px-5 py-3.5 font-semibold w-[32%]">Area</th>
                      <th className="text-left px-5 py-3.5 font-semibold border-l border-gray-700">Key question</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checklistRows.map(({ area, question }, i) => (
                      <motion.tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f9f9fb]"}
                        initial={{ opacity: 0, x: -12 }}
                        animate={checkInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, ease, delay: 0.04 + i * 0.06 }}>
                        <td className="px-5 py-3.5 text-[#1d1d1f] font-semibold border-t border-[#e5e5ea] text-[13px]">{area}</td>
                        <td className="px-5 py-3.5 text-[#6e6e73] border-t border-[#e5e5ea] border-l border-l-[#e5e5ea] text-[13px]">{question}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ══ SNIPER GCC ═══════════════════════════════════════════ */}
              <SectionHeading id="sniper-gcc">How Sniper Supports the Technology Lifecycle of a GCC in India</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    For global enterprises setting up or expanding a GCC, Sniper provides a
                    coordinated technology approach covering infrastructure, cloud, cybersecurity,
                    networking, workplace solutions, deployment and managed support.
                  </p>
                </Prose>
              </FadeUp>

              {/* GCC lifecycle flow */}
              <FadeUp delay={0.05} className="my-8">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-6 px-6 bg-[#f5f5f7] rounded-2xl">
                  {["Define Requirements", "Design Solution", "Procure Technology", "Deploy", "Integrate", "Manage Operations", "Support Expansion"].map((label, i, arr) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3">
                      <motion.span
                        className="text-[12px] sm:text-[13px] font-bold text-[#1d1d1f] bg-white px-3 sm:px-4 py-2 rounded-xl shadow-sm border border-[#e5e5ea] whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease, delay: 0.05 + i * 0.07 }}
                      >
                        {label}
                      </motion.span>
                      {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-[#8e8e93] flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </FadeUp>

              <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {sniperCapabilities.map((item, i) => (
                  <PillarCard key={i} {...item} index={i} inView={pillarsInView} />
                ))}
              </div>

              <FadeUp delay={0.05} className="my-8">
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                  {[
                    { label: "GCC Infrastructure Solutions", href: "/solutions/it-infrastructure" },
                    { label: "Cloud Solutions",              href: "/solutions/cloud-solutions" },
                    { label: "Networking Solutions",         href: "/solutions/networking-solutions" },
                  ].map((link, i) => (
                    <motion.a key={i} href={link.href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-[#1d1d1f] border border-[#e5e5ea] rounded-full hover:bg-[#1d1d1f] hover:text-white hover:border-[#1d1d1f] transition-all duration-200"
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease, delay: 0.05 + i * 0.08 }}>
                      {link.label} <ArrowRight className="w-3.5 h-3.5" />
                    </motion.a>
                  ))}
                </div>
              </FadeUp>

              {/* ══ SOURCES ═══════════════════════════════════════════════ */}
              <FadeUp className="mt-12">
                <div className="bg-[#f9f9fb] rounded-2xl border border-[#e5e5ea] p-5 sm:p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-4">Sources & Further Reading</p>
                  <ul className="space-y-2">
                    {[
                      "Business Standard – AI, Data and Cybersecurity Drive GCC Technology Hiring Demand, November 5, 2026",
                      "KPMG – Secure in India 2026: Cyber GCCs in the Age of AI",
                      "Zinnov–NASSCOM – GCC Landscape in India 2026",
                      "Zinnov–Dell – India GCC 2030: From Capability Centers to Agentic Transformation Engines",
                      "DSCI – Secure in India 2026",
                    ].map((source, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-[#6e6e73]">
                        <span className="text-[#8e8e93] font-mono flex-shrink-0">[{i + 1}]</span>
                        {source}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              {/* ══ FAQ ═══════════════════════════════════════════════════ */}
              <SectionHeading id="faq">Frequently Asked Questions</SectionHeading>

              <FadeUp className="border-t border-[#e5e5ea] divide-y divide-transparent my-4">
                {faqs.map((f, i) => (
                  <FaqItem key={i} {...f} index={i} />
                ))}
              </FadeUp>

              {/* ══ CTA ═══════════════════════════════════════════════════ */}
              <FadeUp delay={0.1} className="mt-16">
                <div className="rounded-2xl bg-[#1d1d1f] text-white px-8 sm:px-12 py-10 sm:py-14 text-center">
                  <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-4">
                    Building or expanding a GCC?
                  </p>
                  <h2 className="text-[28px] sm:text-[36px] font-black leading-tight mb-4">
                    Talk to Sniper's GCC Team
                  </h2>
                  <p className="text-[16px] text-[#aeaeb2] max-w-xl mx-auto mb-8 leading-relaxed">
                    Talk to Sniper about your infrastructure, deployment and managed IT
                    requirements for your Global Capability Centre in India.
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
                      Explore GCC Solutions
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

export default BlogAG;
