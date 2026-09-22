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
  Smartphone,
  Zap,
  RefreshCw,
  GraduationCap,
  HeartHandshake,
  Search,
  Settings,
  Key,
  Lock,
  Layers,
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
// CONSIDERATION CARD — key deployment questions
// ─────────────────────────────────────────────────────────
const ConsiderationCard = ({ icon: Icon, label, question, index, inView }: {
  icon: React.ElementType; label: string; question: string; index: number; inView: boolean;
}) => (
  <motion.div
    className="p-5 sm:p-6 rounded-2xl border border-[#e5e5ea] bg-white hover:shadow-md transition-shadow duration-300"
    initial={{ opacity: 0, y: 24 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.55, ease, delay: 0.05 + index * 0.07 }}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 rounded-xl bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-[#1d1d1f]" />
      </div>
      <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#1d1d1f]">{label}</span>
    </div>
    <p className="text-[14px] text-[#6e6e73] leading-relaxed">{question}</p>
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
  { id: "why-it-teams",       label: "Why IT Teams Should Consider It" },
  { id: "device-management",  label: "Enterprise Device Management" },
  { id: "ade",                label: "Automated Device Enrollment" },
  { id: "security",           label: "Enterprise Security" },
  { id: "mobile-employees",   label: "Supporting Mobile Employees" },
  { id: "deployment",         label: "Deployment Considerations" },
  { id: "smartepp",           label: "SmartEPP & Device Refresh" },
  { id: "sniper-support",     label: "How Sniper Can Help" },
];

const SidebarTOC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.getElementById("blog-article-body-w");
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
const BlogW = () => {
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
      headline: "iPhone 18 Pro for Business: What IT and Enterprise Teams Should Know",
      description: "A guide for IT and enterprise teams on deploying iPhone 18 Pro — covering device management, ADE, security, SmartEPP and how Sniper supports enterprise Apple deployments.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=80",
      author: { "@type": "Organization", name: "Sniper Systems & Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Sniper Systems & Solutions",
        logo: { "@type": "ImageObject", url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png" },
      },
      datePublished: "2026-08-13",
      dateModified: "2026-08-13",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sniperindia.com/blog/iphone-18-pro-enterprise-it-guide" },
      keywords: "iPhone 18 Pro enterprise, iPhone 18 Pro IT deployment, Apple enterprise mobility, Apple Business Manager, Automated Device Enrollment, enterprise iPhone security, SmartEPP, iPhone 18 Pro India enterprise",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ────────────────────────────────────────────────
  useSEO({
    title: "iPhone 18 Pro for Business: What IT and Enterprise Teams Should Know | Sniper",
    description: "A guide for IT and enterprise teams on deploying iPhone 18 Pro — covering device management, ADE, security, SmartEPP and how Sniper supports enterprise Apple deployments.",
    keywords: "iPhone 18 Pro enterprise, iPhone 18 Pro IT deployment, Apple enterprise mobility, Apple Business Manager, Automated Device Enrollment ADE, enterprise iPhone security, iPhone 18 Pro enterprise India, SmartEPP Apple, enterprise Apple deployment India, iPhone refresh enterprise",
    ogTitle: "iPhone 18 Pro for Business: What IT and Enterprise Teams Should Know",
    ogDescription: "Device management, ADE, security frameworks, SmartEPP and enterprise deployment — a practical guide for IT teams evaluating the iPhone 18 Pro.",
    ogImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=80",
    ogUrl: "https://sniperindia.com/blog/iphone-18-pro-enterprise-it-guide",
    canonicalUrl: "https://sniperindia.com/blog/iphone-18-pro-enterprise-it-guide",
    twitterTitle: "iPhone 18 Pro for Business: What IT and Enterprise Teams Should Know",
    twitterDescription: "IT guide for iPhone 18 Pro enterprise deployment — ADE, device management, security, SmartEPP and Sniper's Apple lifecycle services.",
    twitterImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=80",
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
      { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.06, delay: 1.1 }
    );
    return () => { t.kill(); };
  }, []);

  // ── SECTION REFS ──────────────────────────────────────
  const securityRef      = useRef(null);
  const considerationsRef = useRef(null);
  const servicesRef      = useRef(null);

  const securityInView       = useInView(securityRef,       { once: true, margin: "-60px" });
  const considerationsInView = useInView(considerationsRef, { once: true, margin: "-60px" });
  const servicesInView       = useInView(servicesRef,       { once: true, margin: "-60px" });

  // ── DATA ──────────────────────────────────────────────
  const securityAreas = [
    "Device configuration",
    "Identity and access",
    "Application management",
    "Data protection",
    "Network access",
    "Device compliance",
    "Lost or replaced devices",
    "Employee offboarding",
    "Ongoing software updates",
  ];

  const deploymentConsiderations = [
    { icon: Layers,     label: "Existing Fleet",  question: "Which devices are currently in use, and where are they in their lifecycle?" },
    { icon: Settings,   label: "Applications",    question: "Do business-critical applications support the new device and operating system environment?" },
    { icon: Smartphone, label: "Management",      question: "Is the organisation using an appropriate device management platform and enrollment process?" },
    { icon: Key,        label: "Identity",        question: "How are employees authenticated and provisioned?" },
    { icon: Lock,       label: "Security",        question: "Are device policies aligned with organisational security requirements?" },
    { icon: RefreshCw,  label: "Procurement",     question: "How will devices be purchased, allocated and tracked?" },
    { icon: HeartHandshake, label: "Support",     question: "Who will support users throughout the device lifecycle?" },
  ];

  const sniperServices = [
    { icon: Search,         title: "Apple Business Enablement",              description: "Set up and configure Apple Business Manager to connect devices with your organisation's management environment." },
    { icon: Zap,            title: "Automated Device Enrollment",             description: "Configure ADE so enrolled iPhones are enterprise-ready from first activation without manual IT preparation." },
    { icon: Settings,       title: "Deployment Planning & MDM Evaluation",   description: "Assess your existing MDM setup, identify gaps and plan the right deployment approach for your fleet." },
    { icon: Shield,         title: "Apple Ecosystem & Network Readiness",    description: "Ensure your network, identity and security environment is fully prepared to support Apple devices at scale." },
    { icon: Key,            title: "Identity & Authentication Guidance",     description: "Align Apple device access with your organisation's identity infrastructure and authentication policies." },
    { icon: GraduationCap,  title: "IT & End-User Training",                 description: "Build Apple knowledge across IT administrators and employees for a smooth transition and productive adoption." },
    { icon: Smartphone,     title: "Zero-Touch Deployment",                  description: "Enable devices to be enterprise-ready from first power-on — delivered directly to employees without manual IT handling." },
    { icon: HeartHandshake, title: "Ongoing Technical Support",              description: "Post-deployment support covering troubleshooting, updates, management changes and device refresh planning." },
  ];

  const faqs = [
    {
      q: "Why should IT teams evaluate the iPhone 18 Pro now?",
      a: "A new iPhone generation is an opportunity for IT teams to review device standards, deployment processes, security policies and lifecycle plans — not just choose a new handset. Evaluating it early gives organisations time to plan a structured rollout.",
    },
    {
      q: "What is Automated Device Enrollment and why does it matter for enterprises?",
      a: "Automated Device Enrollment (ADE) allows IT teams to establish predefined device configurations so that iPhones can be enrolled into management automatically during setup. This reduces manual IT effort, creates consistency across the fleet and supports a lifecycle approach to device management.",
    },
    {
      q: "What security controls should IT teams configure for iPhone 18 Pro?",
      a: "IT teams should consider device configuration, identity and access management, application controls, data protection, network access policies, device compliance monitoring, lost device procedures, employee offboarding processes and ongoing software updates.",
    },
    {
      q: "What is SmartEPP and how does it help with an iPhone refresh?",
      a: "SmartEPP is Sniper's programme that combines demo unit access, buy-back options for existing devices and commercial support. It lets IT teams evaluate the iPhone 18 Pro against real workflows before deployment and helps offset the cost of new devices through trade-in value.",
    },
    {
      q: "Can Sniper support organisations that are new to Apple devices?",
      a: "Yes. Sniper can support organisations deploying Apple for the first time or expanding an existing Apple environment, covering everything from Apple Business setup and ADE configuration through deployment, training and ongoing support.",
    },
  ];

  const relatedPosts = [
    {
      title: "What Does the New iPhone 18 Pro Mean for Businesses?",
      category: "Apple Devices",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      readTime: "10 min read",
      href: "/blog/iphone-18-pro-for-business",
    },
    {
      title: "How to Deploy Apple Devices at Scale in an Enterprise: A Complete Guide",
      category: "Apple Deployment",
      image: "/blog/apple-enterprise-devices.png",
      readTime: "14 min read",
      href: "/blog/enterprise-apple-device-deployment-guide",
    },
    {
      title: "How Microsoft Intune Is Helping Enterprises Secure Hybrid Work and Simplify Endpoint Management",
      category: "Endpoint Security",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      readTime: "9 min read",
      href: "/blog/how-microsoft-intune-is-helping-enterprises-secure-hybrid-work-and-simplify-endpoint-management",
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
              <span className="text-[#1d1d1f]">Apple Devices · Enterprise</span>
            </div>
          </FadeUp>

          {/* Series badge */}
          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc] bg-[#e8f0fe] px-3 py-1.5 rounded-full mb-6">
              <Smartphone className="w-3.5 h-3.5" />
              iPhone 18 Pro for Business · Part 2
            </span>
          </FadeUp>

          {/* Headline */}
          <h1
            ref={heroHeadingRef}
            className="text-[36px] sm:text-[52px] md:text-[62px] lg:text-[72px] font-black text-[#1d1d1f] leading-[1.04] tracking-tight mb-6"
            aria-label="iPhone 18 Pro for Business: What IT and Enterprise Teams Should Know"
          >
            {["iPhone", "18", "Pro", "for"].map((w, i) => (
              <span key={i} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br />
            {["Business"].map((w, i) => (
              <span key={i + 4} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
          </h1>

          {/* Standfirst */}
          <FadeUp delay={0.15}>
            <p className="text-[18px] sm:text-[21px] text-[#6e6e73] leading-relaxed max-w-3xl mb-10 font-normal">
              What IT and Enterprise Teams Should Know — device management, ADE, security,
              deployment planning, SmartEPP and Sniper's lifecycle support.
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
                <Calendar className="w-4 h-4" /> August 13, 2026
              </span>
              <span className="flex items-center gap-1.5 text-[#8e8e93]">
                <Clock className="w-4 h-4" /> 12 min read
              </span>
              <span className="flex items-center gap-1.5 text-[#0066cc] bg-[#e8f0fe] px-2.5 py-1 rounded-full font-medium">
                <Tag className="w-3.5 h-3.5" /> Enterprise IT
              </span>
            </div>
          </FadeUp>
        </div>

        {/* Hero image */}
        <FadeUp delay={0.25} className="max-w-5xl mx-auto pt-8">
          <div className="relative rounded-t-3xl overflow-hidden h-[240px] sm:h-[400px] md:h-[500px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=80"
              alt="iPhone 18 Pro enterprise deployment — IT team managing Apple devices"
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

            {/* Sidebar TOC */}
            <SidebarTOC />

            {/* Article */}
            <article id="blog-article-body-w" className="flex-1 min-w-0">

              {/* TL;DR */}
              <FadeUp>
                <Callout type="tip">
                  <strong>TL;DR:</strong> The iPhone 18 Pro can fit into enterprise mobility
                  strategies where organisations need capable, secure and manageable mobile devices.
                  IT teams should evaluate the new generation alongside their existing Apple
                  environment, device management strategy, applications, identity infrastructure,
                  deployment processes and lifecycle plans. Businesses planning an enterprise iPhone
                  deployment or refresh can contact Sniper for enterprise pricing, demo units through
                  SmartEPP, buy-back options, procurement and deployment support.
                </Callout>
              </FadeUp>

              {/* ── INTRO ─────────────────────────────────────────────── */}
              <FadeUp>
                <Prose>
                  <p>
                    The introduction of a new iPhone generation is not just a product update for
                    organisations managing a mobile workforce. For IT and enterprise teams, it can
                    also be an opportunity to review device standards, employee requirements,
                    deployment processes, security policies and lifecycle plans.
                  </p>
                  <p className="mt-4">
                    The iPhone 18 Pro and iPhone 18 Pro Max bring Apple's latest A20 Pro chip,
                    advanced camera capabilities, Apple Intelligence experiences, improved thermal
                    performance and connectivity to the iPhone platform. For enterprise teams, the
                    important question is how these capabilities fit into the organisation's
                    existing Apple environment.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 1 ─────────────────────────────────────────── */}
              <SectionHeading id="why-it-teams">Why Should IT Teams Consider the iPhone 18 Pro?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Modern enterprise users increasingly depend on smartphones for communication,
                    collaboration, business applications and customer-facing activities. The iPhone
                    18 Pro provides a combination of performance, connectivity, camera capabilities
                    and intelligent features that can support demanding mobile workflows.
                  </p>
                  <p className="mt-4">
                    For IT teams, the key consideration is how these capabilities align with
                    different employee profiles:
                  </p>
                </Prose>
              </FadeUp>

              {/* Employee profiles grid */}
              <FadeUp delay={0.05} className="my-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { role: "Executive",            need: "Communication, productivity and premium mobility" },
                    { role: "Sales Representative", need: "Applications, connectivity and camera capabilities" },
                    { role: "Marketing Professional",need: "High-quality photography, video and content creation" },
                    { role: "Field Employee",        need: "Reliability, connectivity and business application access" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease, delay: 0.05 + i * 0.07 }}
                    >
                      <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#1d1d1f] mb-1.5">{item.role}</p>
                      <p className="text-[14px] text-[#6e6e73] leading-relaxed">{item.need}</p>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp>
                <Prose>
                  <p>A device strategy should account for these differences.</p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 2 ─────────────────────────────────────────── */}
              <SectionHeading id="device-management">How Does iPhone 18 Pro Fit Into Enterprise Device Management?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Managing an enterprise iPhone fleet requires more than configuring devices
                    individually. Apple provides technologies that allow organisations to establish
                    structured deployment and management processes.{" "}
                    <strong>Apple Business Manager</strong> and{" "}
                    <strong>Automated Device Enrollment</strong> can support automated
                    provisioning, while device management solutions provide controls for
                    configuration, applications, policies and ongoing management.
                  </p>
                  <p className="mt-4">
                    This becomes particularly important as the number of devices grows. A business
                    managing a small number of devices may handle some processes manually. At
                    enterprise scale, automation and standardisation become increasingly valuable.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 3 ─────────────────────────────────────────── */}
              <SectionHeading id="ade">What Role Does Automated Device Enrollment Play?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Automated Device Enrollment can help organisations streamline the process of
                    preparing Apple devices for employees. Rather than treating every iPhone as an
                    individual deployment, organisations can establish predefined configurations
                    and management workflows so that devices can be enrolled as part of the
                    deployment process.
                  </p>
                  <p className="mt-4">
                    For IT teams, this can help reduce repetitive manual configuration and create
                    a more consistent employee experience. It also supports a lifecycle approach
                    in which devices remain connected to the organisation's management environment
                    throughout their business use.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="mt-2">
                <Callout type="info">
                  <strong>Key benefit:</strong> With ADE, iPhones can arrive preconfigured and
                  management-enrolled — reducing IT workload per device from minutes to near zero.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 4 ─────────────────────────────────────────── */}
              <SectionHeading id="security">How Can the iPhone 18 Pro Support Enterprise Security?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Security is an important consideration when employees access company information
                    from mobile devices. Apple's approach combines hardware security, operating
                    system controls, account and identity technologies, application controls and
                    device management capabilities.
                  </p>
                  <p className="mt-4">
                    For businesses, the focus should be on configuring these capabilities
                    appropriately within the organisation's own security framework.
                    IT teams should consider:
                  </p>
                </Prose>
              </FadeUp>

              <div ref={securityRef} className="my-8 bg-[#f9f9fb] rounded-2xl border border-[#e5e5ea] p-6 sm:p-8">
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#8e8e93] mb-5">Security framework checklist</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {securityAreas.map((item, i) => (
                    <CheckItem key={i} inView={securityInView} delay={0.03 + i * 0.04}>{item}</CheckItem>
                  ))}
                </ul>
              </div>

              <FadeUp>
                <Prose>
                  <p>
                    The objective is to establish a consistent security and management framework
                    across the entire device fleet.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 5 ─────────────────────────────────────────── */}
              <SectionHeading id="mobile-employees">How Can the iPhone 18 Pro Support Mobile Employees?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    The iPhone 18 Pro is designed for demanding everyday use, making it relevant
                    to employees who spend a significant portion of their working day away from a
                    traditional desktop environment. Its performance can support business
                    applications and multitasking, while camera improvements benefit teams that
                    use visual content as part of their work.
                  </p>
                  <p className="mt-4">
                    Apple Intelligence and Siri AI also introduce new ways for users to interact
                    with information and complete supported tasks. For organisations, these
                    capabilities should be assessed according to actual employee workflows rather
                    than introduced simply because they are available.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 6 ─────────────────────────────────────────── */}
              <SectionHeading id="deployment">What Should Businesses Consider When Deploying iPhone 18 Pro?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Before introducing a new iPhone generation across an organisation, IT teams
                    should review the complete deployment environment. This creates a more
                    predictable deployment experience and helps organisations plan upgrades
                    systematically.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={considerationsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {deploymentConsiderations.map((c, i) => (
                  <ConsiderationCard key={i} {...c} index={i} inView={considerationsInView} />
                ))}
              </div>

              {/* ══ SECTION 7 ─────────────────────────────────────────── */}
              <SectionHeading id="smartepp">How Can Businesses Make an iPhone Refresh More Practical?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    A device refresh is not only an IT decision. Organisations also need to
                    consider how employees will use the new devices and how the investment can be
                    managed across the lifecycle.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="my-8">
                <div className="rounded-2xl bg-[#1d1d1f] text-white p-7 sm:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-[18px] sm:text-[20px] font-bold text-white">Sniper SmartEPP</h3>
                  </div>
                  <p className="text-[15px] text-[#aeaeb2] leading-relaxed mb-6">
                    SmartEPP gives IT and business teams an opportunity to evaluate new Apple
                    devices through <strong className="text-white">demo units</strong> before
                    moving ahead with a larger deployment — assessing the device against relevant
                    workflows in their own environment.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[
                      { label: "Demo evaluation",    detail: "Test iPhone 18 Pro against real business use cases before committing" },
                      { label: "Buy-back options",   detail: "Trade in existing devices to help offset the cost of the refresh" },
                      { label: "Commercial support", detail: "Procurement, enterprise pricing and deployment planning in one place" },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-[13px] font-bold text-white mb-1">{item.label}</p>
                        <p className="text-[13px] text-[#8e8e93] leading-snug">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1d1d1f] font-semibold text-[14px] rounded-full hover:bg-[#f5f5f7] transition-colors"
                  >
                    Get Enterprise Pricing <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </FadeUp>

              {/* ══ SECTION 8 ─────────────────────────────────────────── */}
              <SectionHeading id="sniper-support">How Can Sniper Support an Enterprise iPhone Deployment?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Sniper works with businesses across the Apple device lifecycle, helping
                    organisations move from device selection and procurement through deployment,
                    implementation, management and ongoing support.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={servicesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {sniperServices.map((s, i) => (
                  <ServiceCard key={i} {...s} index={i} inView={servicesInView} />
                ))}
              </div>

              <FadeUp>
                <Prose>
                  <p>
                    Sniper can also support the wider business technology environment where
                    required, including{" "}
                    <a href="/partners/microsoft" className="text-[#0066cc] underline underline-offset-2 hover:no-underline">Microsoft</a>,{" "}
                    <a href="/partners/lenovo"    className="text-[#0066cc] underline underline-offset-2 hover:no-underline">Lenovo</a>,{" "}
                    <a href="/partners/adobe"     className="text-[#0066cc] underline underline-offset-2 hover:no-underline">Adobe</a>,
                    software solutions, managed services and IT lifecycle management.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ CLOSING ───────────────────────────────────────────── */}
              <SectionHeading id="faq">Frequently Asked Questions</SectionHeading>

              <FadeUp className="border-t border-[#e5e5ea] divide-y divide-transparent my-4">
                {faqs.map((f, i) => (
                  <FaqItem key={i} {...f} index={i} />
                ))}
              </FadeUp>

              {/* ══ INLINE CTA ────────────────────────────────────────── */}
              <FadeUp delay={0.1} className="mt-16">
                <div className="rounded-2xl bg-[#1d1d1f] text-white px-8 sm:px-12 py-10 sm:py-14 text-center">
                  <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-4">
                    Ready to deploy
                  </p>
                  <h2 className="text-[28px] sm:text-[36px] font-black leading-tight mb-4">
                    Get Enterprise Pricing for iPhone 18 Pro
                  </h2>
                  <p className="text-[16px] text-[#aeaeb2] max-w-xl mx-auto mb-8 leading-relaxed">
                    Planning an enterprise iPhone deployment or device refresh? Share your
                    organisation's requirements with Sniper to explore iPhone 18 Pro pricing,
                    procurement and deployment options.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#1d1d1f] font-semibold rounded-full hover:bg-[#f5f5f7] transition-colors text-[15px]"
                    >
                      Get in touch <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="/partners/apple"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#3d3d3f] text-white font-semibold rounded-full hover:border-white transition-colors text-[15px]"
                    >
                      Explore Apple solutions
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

export default BlogW;
