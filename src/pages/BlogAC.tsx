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
  Shield,
  Settings,
  Users,
  FileText,
  Lock,
  Search,
  BarChart2,
  AlertTriangle,
  Key,
  Database,
  Cpu,
  HeartHandshake,
  GraduationCap,
  RefreshCw,
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
// RISK CARD — readiness gaps
// ─────────────────────────────────────────────────────────
const RiskCard = ({ icon: Icon, title, description, index, inView }: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
}) => (
  <motion.div
    className="flex gap-4 p-5 rounded-xl border border-[#e5e5ea] bg-[#f9f9fb]"
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, ease, delay: 0.04 + index * 0.07 }}
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
// SERVICE CARD
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
  { id: "what-is",         label: "What Is M365 Copilot?" },
  { id: "why-assess",      label: "Why a Readiness Assessment?" },
  { id: "checklist",       label: "6-Step Adoption Checklist" },
  { id: "sniper-support",  label: "How Sniper Can Help" },
  { id: "faq",             label: "FAQ" },
];

const SidebarTOC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.getElementById("blog-article-body-ac");
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
const BlogAC = () => {
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
      headline: "Microsoft 365 Copilot for Business: Security, Data Governance & Adoption Checklist",
      description: "How businesses can prepare their Microsoft 365 environment for AI-powered productivity, secure data access and responsible Copilot adoption.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1600&q=80",
      author: { "@type": "Organization", name: "Sniper Systems & Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Sniper Systems & Solutions",
        logo: { "@type": "ImageObject", url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png" },
      },
      datePublished: "2026-09-23",
      dateModified: "2026-09-23",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sniperindia.com/blog/microsoft-365-copilot-security-governance-adoption" },
      keywords: "Microsoft 365 Copilot business India, Copilot security governance, M365 Copilot readiness, SharePoint permissions Copilot, Microsoft Copilot adoption checklist, Sniper Microsoft partner India",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ────────────────────────────────────────────────
  useSEO({
    title: "Microsoft 365 Copilot for Business: Security, Data Governance & Adoption Checklist",
    description: "How businesses can prepare their Microsoft 365 environment for AI-powered productivity, secure data access and responsible Copilot adoption — a practical readiness guide for India.",
    keywords: "Microsoft 365 Copilot business India, Copilot security governance India, M365 Copilot readiness checklist, SharePoint permissions Copilot, Microsoft Copilot adoption, Copilot data governance, Sniper Microsoft partner India, Microsoft 365 Copilot implementation India",
    ogTitle: "Microsoft 365 Copilot for Business: Security, Data Governance & Adoption Checklist",
    ogDescription: "Data permissions, SharePoint cleanup, identity controls, governance policies and pilot rollout — a practical Copilot readiness guide for Indian businesses.",
    ogImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1600&q=80",
    ogUrl: "https://sniperindia.com/blog/microsoft-365-copilot-security-governance-adoption",
    canonicalUrl: "https://sniperindia.com/blog/microsoft-365-copilot-security-governance-adoption",
    twitterTitle: "Microsoft 365 Copilot: Security, Data Governance & Adoption Checklist",
    twitterDescription: "Before deploying Copilot — SharePoint permissions, identity controls, data governance and pilot rollout. A practical checklist for Indian businesses.",
    twitterImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1600&q=80",
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
  const riskRef     = useRef(null);
  const servicesRef = useRef(null);

  const stepsInView    = useInView(stepsRef,    { once: true, margin: "-60px" });
  const riskInView     = useInView(riskRef,     { once: true, margin: "-60px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-60px" });

  // ── DATA ──────────────────────────────────────────────
  const readinessGaps = [
    { icon: AlertTriangle, title: "Excessive Permissions",       description: "Files, folders and SharePoint sites shared more broadly than business needs require." },
    { icon: Database,      title: "Unprotected Sensitive Data",  description: "Confidential documents stored without suitable access controls or classification." },
    { icon: Key,           title: "Inconsistent Identity Controls", description: "Authentication and access policies not consistently applied across users and apps." },
    { icon: FileText,      title: "Unclear Data Ownership",      description: "No defined owner for business-critical files, retention policies or data-handling rules." },
    { icon: Settings,      title: "Licensing Prerequisites",     description: "Subscriptions, compatible applications or admin configuration not yet in place." },
    { icon: Users,         title: "Employee Readiness Gaps",     description: "Teams not yet prepared for responsible AI-assisted workflows or prompt guidance." },
  ];

  const sharepointItems = [
    "SharePoint site and document-library permissions",
    "OneDrive sharing practices",
    "Broad or outdated access groups",
    "Sensitive documents with unnecessary access",
    "External sharing settings",
    "Ownership of business-critical files",
  ];

  const identityItems = [
    "Multi-factor authentication",
    "Appropriate role-based access",
    "Conditional access policies where supported",
    "Privileged-account controls",
    "Endpoint and application security",
    "Monitoring and incident-response procedures",
  ];

  const governanceItems = [
    "Data classification standards",
    "Sharing and retention policies",
    "Auditability and access management",
    "Responsibilities for access approval",
    "Sensitive information ownership",
    "Incident investigation procedures",
    "Policy review cadence",
  ];

  const pilotGuidance = [
    "Writing useful prompts for supported tasks",
    "Checking and verifying AI-generated information",
    "Handling confidential data in AI-assisted workflows",
    "Reviewing and approving generated content",
    "Reporting unexpected behaviour or access concerns",
  ];

  const sniperServices = [
    { icon: Settings,      title: "Microsoft 365 Licensing",          description: "Licensing guidance, plan selection and eligibility for Microsoft 365 Copilot and related subscriptions." },
    { icon: Shield,        title: "Security & Governance Review",      description: "Assess identity controls, access policies, data classification and security configuration for Copilot readiness." },
    { icon: Search,        title: "SharePoint & Permissions Audit",    description: "Review SharePoint sites, document libraries and OneDrive sharing to identify oversharing before deployment." },
    { icon: Database,      title: "Microsoft Purview & Compliance",    description: "Evaluate Microsoft Purview capabilities against regulatory obligations, data classification and governance requirements." },
    { icon: Cpu,           title: "Copilot & Copilot Studio",          description: "Deployment, configuration and rollout support for Microsoft 365 Copilot and Copilot Studio." },
    { icon: GraduationCap, title: "Employee Adoption & Training",      description: "Onboarding guidance, prompt training and change management to support responsible Copilot adoption." },
    { icon: BarChart2,     title: "Migration & SharePoint Planning",    description: "Migration planning, SharePoint and Teams implementation, configuration and structure optimisation." },
    { icon: HeartHandshake,title: "Ongoing Support",                   description: "Post-deployment technical support, monitoring, updates and continuous improvement for the Microsoft 365 environment." },
  ];

  const faqs = [
    { q: "What should businesses check before deploying Microsoft 365 Copilot?",  a: "Businesses should review licensing, user permissions, SharePoint and OneDrive sharing, identity controls, data governance, security policies, employee readiness and the business use cases they want to support." },
    { q: "Is Microsoft 365 Copilot secure for business use?",                     a: "Security depends on the configuration of the Microsoft environment, the permissions users have, the controls applied to business data and the organisation's governance practices. A readiness assessment should identify and address risks before deployment." },
    { q: "Why is SharePoint permission cleanup important for Copilot?",            a: "Copilot can work with information a user is permitted to access. If sensitive SharePoint content has been shared too broadly, that content may become easier for unintended audiences within the organisation to find. Reviewing permissions helps reduce this risk." },
    { q: "What is a Microsoft 365 Copilot readiness assessment?",                 a: "It is a review of an organisation's Microsoft 365 environment, data permissions, security, licensing, workflows and adoption requirements to identify what should be addressed before deploying Copilot." },
    { q: "Can Sniper help with Microsoft 365 Copilot deployment?",                a: "Sniper's published Microsoft services include Microsoft 365 solutions, Copilot and Copilot Studio, security and governance, licensing guidance, deployment and support. Businesses can contact Sniper to discuss their specific requirements." },
  ];

  const relatedPosts = [
    { title: "Microsoft Security Copilot: The Future of AI-Powered Enterprise Cybersecurity in 2026",           category: "Cybersecurity",     image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",    readTime: "10 min read", href: "/blog/microsoft-security-copilot-ai-powered-enterprise-cybersecurity-2026" },
    { title: "How Microsoft Intune Is Helping Enterprises Secure Hybrid Work and Simplify Endpoint Management", category: "Endpoint Security",  image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80", readTime: "9 min read",  href: "/blog/how-microsoft-intune-is-helping-enterprises-secure-hybrid-work-and-simplify-endpoint-management" },
    { title: "Microsoft Threat Protection: Strengthening Enterprise Security Against Modern Cyber Threats",      category: "Cybersecurity",     image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",  readTime: "9 min read",  href: "/blog/microsoft-threat-protection-strengthening-enterprise-security" },
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
              <span className="text-[#1d1d1f]">Microsoft Solutions</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc] bg-[#e8f0fe] px-3 py-1.5 rounded-full mb-6">
              <Shield className="w-3.5 h-3.5" />
              Microsoft 365 Copilot · Security &amp; Governance
            </span>
          </FadeUp>

          <h1
            ref={heroHeadingRef}
            className="text-[36px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-black text-[#1d1d1f] leading-[1.04] tracking-tight mb-6"
            aria-label="Microsoft 365 Copilot for Business: Security, Data Governance & Adoption Checklist"
          >
            {["Microsoft", "365"].map((w, i) => (
              <span key={i} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br />
            {["Copilot", "for"].map((w, i) => (
              <span key={i + 2} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br className="hidden sm:block" />
            {["Business"].map((w, i) => (
              <span key={i + 4} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
          </h1>

          <FadeUp delay={0.15}>
            <p className="text-[18px] sm:text-[21px] text-[#6e6e73] leading-relaxed max-w-3xl mb-10 font-normal">
              Security, data governance and adoption checklist — how businesses can prepare
              their Microsoft 365 environment for responsible AI-powered productivity.
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
                <Clock className="w-4 h-4" /> 13 min read
              </span>
              <span className="flex items-center gap-1.5 text-[#0066cc] bg-[#e8f0fe] px-2.5 py-1 rounded-full font-medium">
                <Tag className="w-3.5 h-3.5" /> Microsoft Solutions
              </span>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.25} className="max-w-5xl mx-auto pt-8">
          <div className="relative rounded-t-3xl overflow-hidden h-[240px] sm:h-[400px] md:h-[500px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1600&q=80"
              alt="Microsoft 365 Copilot for business — security, data governance and adoption checklist"
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

            <article id="blog-article-body-ac" className="flex-1 min-w-0">

              {/* TL;DR */}
              <FadeUp>
                <Callout type="tip">
                  <strong>TL;DR:</strong> Microsoft 365 Copilot helps employees work with
                  information across supported Microsoft 365 applications — but successful
                  adoption requires more than enabling the product. Businesses should assess
                  data permissions, information-sharing practices, identity controls, security
                  policies, licensing and employee readiness before rolling out Copilot. A
                  structured readiness plan helps reduce unnecessary data exposure, establish
                  governance and introduce AI in a controlled way.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 1 ─────────────────────────────────────────── */}
              <SectionHeading id="what-is">What Is Microsoft 365 Copilot for Business?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Microsoft 365 Copilot is an AI-powered productivity assistant that works
                    with supported Microsoft 365 applications and business information to help
                    users complete work. Depending on the applications, configuration and
                    licence, employees can use Copilot to summarise information, draft content,
                    analyse documents, prepare meeting summaries and assist with everyday tasks.
                  </p>
                  <p className="mt-4">
                    For businesses, the opportunity is to help employees work with existing
                    business information more efficiently while maintaining appropriate access
                    controls.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="mt-4">
                <Callout type="warning">
                  Copilot's ability to surface information makes existing data permissions
                  especially important. If an employee already has access to information
                  that should not have been broadly shared,{" "}
                  <strong>AI-powered search and summarisation may make that information
                  easier to discover</strong>. This is why Copilot readiness, security and
                  data governance must be considered together.
                </Callout>
              </FadeUp>

              <FadeUp>
                <Prose>
                  <p>
                    Microsoft's official{" "}
                    <strong>Secure and Govern Microsoft Copilot</strong> deployment guidance
                    specifically highlights oversharing remediation, guardrails and regulatory
                    obligations as important parts of a secure deployment.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 2 ─────────────────────────────────────────── */}
              <SectionHeading id="why-assess">Why Businesses Need a Copilot Readiness Assessment</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Before deploying Microsoft 365 Copilot, IT teams should understand how
                    Microsoft 365 is currently configured, how employees access business
                    information and which workflows would benefit most from AI assistance. A
                    readiness assessment helps identify:
                  </p>
                </Prose>
              </FadeUp>

              <div ref={riskRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {readinessGaps.map((item, i) => (
                  <RiskCard key={i} {...item} index={i} inView={riskInView} />
                ))}
              </div>

              <FadeUp>
                <Callout type="info">
                  Addressing these issues early can reduce implementation friction and give
                  business leaders a clearer view of how Copilot can be introduced responsibly.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 3 — 6-Step Checklist ════════════════════════ */}
              <SectionHeading id="checklist">Microsoft 365 Copilot Adoption Checklist</SectionHeading>

              <div ref={stepsRef} className="divide-y divide-[#e5e5ea] border-t border-[#e5e5ea] my-8">

                {/* Step 1 */}
                <NumberedStep number={1} title="Identify the Right Business Use Cases" inView={stepsInView}>
                  <p>
                    Start by identifying the work employees spend time on and the tasks
                    Copilot could realistically support — summarising meetings, preparing
                    first drafts, finding information in authorised content, organising
                    material for reports.
                  </p>
                  <p>
                    Prioritise based on business value, information sensitivity and workflow
                    complexity. A sales team might benefit from drafting proposals using
                    approved materials; a management team might use Copilot to summarise
                    meetings and documents they are authorised to access.
                  </p>
                  <Callout type="info">
                    The objective is to identify practical opportunities — not to enable AI
                    features without a clear purpose.
                  </Callout>
                </NumberedStep>

                {/* Step 2 */}
                <NumberedStep number={2} title="Review SharePoint, OneDrive and Information Permissions" inView={stepsInView}>
                  <p>
                    Data governance is one of the most important steps. Before deployment,
                    examine how information is stored and shared across Microsoft 365. Review:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {sharepointItems.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.05}>{item}</CheckItem>
                    ))}
                  </ul>
                  <Callout type="warning">
                    Microsoft recommends addressing oversharing and establishing enforceable
                    controls as part of its Copilot security and governance blueprint. The
                    goal is not to restrict all sharing — it is to make sure employees access
                    what they need and nothing more.
                  </Callout>
                </NumberedStep>

                {/* Step 3 */}
                <NumberedStep number={3} title="Strengthen Identity and Security Controls" inView={stepsInView}>
                  <p>
                    Copilot readiness should include a review of the controls protecting user
                    identities and access to business applications. Depending on the existing
                    environment, this can involve:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {identityItems.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.05}>{item}</CheckItem>
                    ))}
                  </ul>
                  <Callout type="info">
                    These controls are part of a wider Microsoft 365 security strategy.
                    Copilot should not be treated as a replacement for them.
                  </Callout>
                </NumberedStep>

                {/* Step 4 */}
                <NumberedStep number={4} title="Establish Data Governance and Compliance Requirements" inView={stepsInView}>
                  <p>
                    Organisations in regulated or data-sensitive industries may need clear
                    rules for handling personal information, confidential business records and
                    other protected content. Before deployment, establish policies for:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {governanceItems.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.05}>{item}</CheckItem>
                    ))}
                  </ul>
                  <p>
                    Where appropriate, evaluate{" "}
                    <strong>Microsoft Purview</strong> and other Microsoft security and
                    compliance capabilities against your organisation's requirements, licence
                    entitlements and regulatory obligations.
                  </p>
                </NumberedStep>

                {/* Step 5 */}
                <NumberedStep number={5} title="Confirm Licensing and Technical Readiness" inView={stepsInView}>
                  <p>
                    A successful rollout requires the correct Microsoft subscriptions,
                    supported applications, identity configuration and administrative setup.
                    Review current licences, eligibility for Microsoft 365 Copilot,
                    application compatibility, user accounts and relevant security requirements
                    before assigning users.
                  </p>
                  <Callout type="warning">
                    Do not assume that every Microsoft 365 subscription automatically includes
                    the same Copilot features or entitlements. Confirm the current plan
                    details and prerequisites with Microsoft. For larger organisations, a
                    phased rollout may help IT teams identify issues before expanding access.
                  </Callout>
                </NumberedStep>

                {/* Step 6 */}
                <NumberedStep number={6} title="Run a Controlled Pilot and Support Employee Adoption" inView={stepsInView}>
                  <p>
                    Start with a defined group of users and a small number of approved use
                    cases. Collect feedback on usefulness, response quality and the time
                    required to review AI-generated content. Provide guidance on:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {pilotGuidance.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.05}>{item}</CheckItem>
                    ))}
                  </ul>
                  <Callout type="warning">
                    AI-generated results should be reviewed before they are used in important
                    business decisions, external communications or regulated workflows.
                  </Callout>
                  <p>
                    Define how success will be measured: task completion time, employee
                    adoption, user feedback, quality of outputs and number of workflows
                    improved.
                  </p>
                </NumberedStep>

              </div>

              {/* Visual checklist summary */}
              <FadeUp delay={0.05} className="my-8">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-6 px-6 bg-[#f5f5f7] rounded-2xl">
                  {["Use Cases", "Permissions", "Identity", "Governance", "Licensing", "Pilot"].map((label, i, arr) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3">
                      <motion.span
                        className="text-[12px] sm:text-[13px] font-bold text-[#1d1d1f] bg-white px-3 sm:px-4 py-2 rounded-xl shadow-sm border border-[#e5e5ea] whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease, delay: 0.05 + i * 0.07 }}
                      >
                        {String(i + 1).padStart(2, "0")} {label}
                      </motion.span>
                      {i < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-[#8e8e93] flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </FadeUp>

              {/* ══ SECTION 4 — Sniper ════════════════════════════════════ */}
              <SectionHeading id="sniper-support">How Sniper Can Support Microsoft 365 Copilot Adoption</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Implementing Microsoft 365 Copilot involves licensing, Microsoft 365
                    configuration, data access, security, deployment and change management.
                    Sniper's published Microsoft solutions include Microsoft 365, Copilot and
                    Copilot Studio, Teams and SharePoint implementation, security and
                    governance, licensing recommendations, migration planning, deployment and
                    ongoing support.
                  </p>
                  <p className="mt-4">
                    For businesses considering Microsoft 365 Copilot implementation in India,
                    Sniper can help assess the broader Microsoft environment and discuss the
                    technology and deployment requirements before adoption.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={servicesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {sniperServices.map((s, i) => (
                  <ServiceCard key={i} {...s} index={i} inView={servicesInView} />
                ))}
              </div>

              <FadeUp delay={0.05} className="my-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb]">
                  <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#1d1d1f] mb-0.5">Sniper Microsoft Solutions · India</p>
                    <p className="text-[13px] text-[#6e6e73]">Microsoft 365, Copilot, Teams, SharePoint, security, governance, licensing and deployment support for Indian businesses.</p>
                  </div>
                  <a
                    href="/partners/microsoft"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0066cc] hover:underline underline-offset-2 whitespace-nowrap flex-shrink-0"
                  >
                    Explore Microsoft Solutions <ArrowRight className="w-3.5 h-3.5" />
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
                    Planning a Copilot rollout?
                  </p>
                  <h2 className="text-[28px] sm:text-[36px] font-black leading-tight mb-4">
                    Prepare Your Business for Microsoft 365 Copilot
                  </h2>
                  <p className="text-[16px] text-[#aeaeb2] max-w-xl mx-auto mb-8 leading-relaxed">
                    Contact Sniper Systems &amp; Solutions to discuss your Microsoft environment,
                    readiness and deployment requirements.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#1d1d1f] font-semibold rounded-full hover:bg-[#f5f5f7] transition-colors text-[15px]"
                    >
                      Get in touch <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="/partners/microsoft"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#3d3d3f] text-white font-semibold rounded-full hover:border-white transition-colors text-[15px]"
                    >
                      Explore Microsoft Solutions
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

export default BlogAC;
