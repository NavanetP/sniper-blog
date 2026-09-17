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
  Camera,
  Cpu,
  Zap,
  RefreshCw,
  HeartHandshake,
  GraduationCap,
  Search,
  Settings,
} from "lucide-react";
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────────────────
// READING PROGRESS BAR
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
// WHITE SCREEN CURTAIN
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
// CALLOUT BOX
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
// FEATURE CARD (spec highlights)
// ─────────────────────────────────────────────────────────
const FeatureCard = ({ icon: Icon, title, description, index, inView }: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
}) => (
  <motion.div
    className="flex gap-4 p-5 sm:p-6 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb] hover:bg-white hover:shadow-md transition-all duration-300"
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
// SERVICE CARD (Sniper services)
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
  { id: "whats-new",        label: "What's New with iPhone 18 Pro" },
  { id: "productivity",     label: "Business Productivity" },
  { id: "enterprise-mobility", label: "Enterprise Mobility" },
  { id: "content-creation", label: "Professional Content Creation" },
  { id: "apple-intelligence", label: "Apple Intelligence" },
  { id: "before-deploy",    label: "Before You Deploy" },
  { id: "evaluate",         label: "Evaluating with SmartEPP" },
  { id: "sniper-apple",     label: "How Sniper Can Help" },
];

const SidebarTOC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.getElementById("blog-article-body-v");
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
const BlogV = () => {
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ── GEO META ─────────────────────────────────────────
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

  // ── JSON-LD ───────────────────────────────────────────
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "What Does the New iPhone 18 Pro Mean for Businesses?",
      description: "Apple iPhone 18 Pro brings the A20 Pro chip, 48MP variable aperture camera and Apple Intelligence. Here's what it means for enterprise mobility, content creation and Apple deployment.",
      image: "https://i.postimg.cc/YSFy3014/Screenshot-2026-09-16-at-3-42-06-PM-(2).png",
      author: { "@type": "Person", name: "Likith Singh" },
      publisher: {
        "@type": "Organization",
        name: "Sniper Systems & Solutions",
        logo: { "@type": "ImageObject", url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png" },
      },
      datePublished: "2026-08-13",
      dateModified: "2026-08-13",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sniperindia.com/blog/iphone-18-pro-for-business" },
      keywords: "iPhone 18 Pro business, iPhone 18 Pro enterprise, Apple enterprise mobility, Apple deployment India, SmartEPP, iPhone for business India, Apple Intelligence enterprise",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ───────────────────────────────────────────────
  useSEO({
    title: "What Does the New iPhone 18 Pro Mean for Businesses? | Sniper Systems",
    description: "Apple iPhone 18 Pro brings the A20 Pro chip, 48MP variable aperture camera and Apple Intelligence. Here's what it means for enterprise mobility, content creation and Apple deployment.",
    keywords: "iPhone 18 Pro business, iPhone 18 Pro enterprise, Apple enterprise mobility, iPhone 18 Pro India, Apple deployment India, SmartEPP iPhone, iPhone for business, Apple Intelligence enterprise, enterprise iPhone deployment, iPhone 18 Pro pricing India, Apple device lifecycle",
    ogTitle: "What Does the New iPhone 18 Pro Mean for Businesses?",
    ogDescription: "A20 Pro chip, 48MP variable aperture camera, Apple Intelligence — here's how the iPhone 18 Pro fits into enterprise mobility, content creation and Apple deployment.",
    ogImage: "https://i.postimg.cc/YSFy3014/Screenshot-2026-09-16-at-3-42-06-PM-(2).png",
    ogUrl: "https://sniperindia.com/blog/iphone-18-pro-for-business",
    canonicalUrl: "https://sniperindia.com/blog/iphone-18-pro-for-business",
    twitterTitle: "What Does the New iPhone 18 Pro Mean for Businesses?",
    twitterDescription: "iPhone 18 Pro for enterprise — what the A20 Pro, Apple Intelligence and new camera mean for mobile productivity and deployment.",
    twitterImage: "https://i.postimg.cc/YSFy3014/Screenshot-2026-09-16-at-3-42-06-PM-(2).png",
  });

  useEffect(() => {
    const fn = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── HERO GSAP ────────────────────────────────────────
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

  // ── SECTION REFS ─────────────────────────────────────
  const featuresRef  = useRef(null);
  const checklistRef = useRef(null);
  const servicesRef  = useRef(null);

  const featuresInView  = useInView(featuresRef,  { once: true, margin: "-60px" });
  const checklistInView = useInView(checklistRef, { once: true, margin: "-60px" });
  const servicesInView  = useInView(servicesRef,  { once: true, margin: "-60px" });

  // ── DATA ──────────────────────────────────────────────
  const iPhoneFeatures = [
    { icon: Cpu,        title: "A20 Pro Chip",             description: "Apple's latest chip delivers higher performance and supports demanding AI workloads and professional applications." },
    { icon: Camera,     title: "48MP Variable Aperture",   description: "The 48MP Fusion Main camera with variable aperture gives professionals greater control over photography and video." },
    { icon: Zap,        title: "Apple Intelligence",       description: "On-device AI with Private Cloud Compute support for intelligent experiences across writing, communication and daily tasks." },
    { icon: Shield,     title: "Thermal Management",       description: "Improved thermal system designed to support sustained performance during demanding applications and extended workloads." },
    { icon: Smartphone, title: "Connectivity",             description: "Latest generation connectivity for faster data, cloud access and communication across mobile and enterprise networks." },
    { icon: RefreshCw,  title: "Battery Life",             description: "Extended battery improvements to keep professionals productive throughout a full business day and beyond." },
  ];

  const deploymentChecklist = [
    "Employee roles and device requirements",
    "Existing iPhone fleet and upgrade cycles",
    "Business application compatibility",
    "Device management and enrollment",
    "Identity and access requirements",
    "Security and organisational policies",
    "Procurement and deployment requirements",
    "User enablement and support",
    "Device lifecycle and replacement planning",
  ];

  const sniperServices = [
    { icon: Search,         title: "Apple Business Enablement",         description: "Set up and configure Apple Business Manager to connect devices with your organisation's management environment." },
    { icon: Zap,            title: "Automated Device Enrollment",        description: "Configure ADE so enrolled devices are enterprise-ready from first activation — without manual IT preparation." },
    { icon: Settings,       title: "Device Management Evaluation",       description: "Assess and select the right MDM solution for your fleet size, security requirements and management workflows." },
    { icon: Shield,         title: "Network & Ecosystem Readiness",      description: "Ensure your network, identity and security environment is prepared to support Apple devices at scale." },
    { icon: GraduationCap,  title: "IT & End-User Training",             description: "Build Apple knowledge across your IT team and employees for a smooth transition and productive adoption." },
    { icon: HeartHandshake, title: "Ongoing Technical Support",          description: "Post-deployment support covering troubleshooting, updates, management changes and device refresh planning." },
  ];

  const faqs = [
    {
      q: "What is new with the iPhone 18 Pro?",
      a: "The iPhone 18 Pro introduces the A20 Pro chip, a 48MP Fusion Main camera with variable aperture, expanded Apple Intelligence capabilities, improved thermal management and battery improvements — designed for demanding everyday and professional use.",
    },
    {
      q: "How can businesses evaluate iPhone 18 Pro before purchasing?",
      a: "Through Sniper's SmartEPP offering, businesses can access demo units of the latest iPhone options to test against real business workflows before committing to a wider deployment.",
    },
    {
      q: "What is SmartEPP?",
      a: "SmartEPP is Sniper's programme that brings together new device options, demo evaluation and commercial support — including buy-back options for existing devices to help offset the cost of a refresh.",
    },
    {
      q: "Does the iPhone 18 Pro support enterprise device management?",
      a: "Yes. Apple's platform supports enterprise deployment through Apple Business Manager, Automated Device Enrollment and device management solutions that allow IT teams to provision and manage devices centrally.",
    },
    {
      q: "How does Apple Intelligence work for businesses?",
      a: "Apple Intelligence combines on-device processing with Private Cloud Compute for supported requests. For businesses, organisations should evaluate how AI capabilities fit within their existing application, security and data policies before introducing them into business workflows.",
    },
    {
      q: "Can buy-back options help offset the cost of an iPhone 18 Pro refresh?",
      a: "Yes. Through SmartEPP, Sniper offers buy-back options for existing devices, helping organisations reduce the overall investment required for a device refresh.",
    },
  ];

  const relatedPosts = [
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
    {
      title: "Don't Just Dispose: How IT Asset Buyback Helps Businesses Recover Value and Protect Data",
      category: "IT Asset Management",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      readTime: "9 min read",
      href: "/blog/it-asset-buyback-recover-value-protect-data",
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
              <span className="text-[#1d1d1f]">Apple Devices</span>
            </div>
          </FadeUp>

          {/* Category badge */}
          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc] bg-[#e8f0fe] px-3 py-1.5 rounded-full mb-6">
              <Smartphone className="w-3.5 h-3.5" />
              Apple Devices · iPhone 18 Pro
            </span>
          </FadeUp>

          {/* Headline */}
          <h1
            ref={heroHeadingRef}
            className="text-[36px] sm:text-[52px] md:text-[62px] lg:text-[72px] font-black text-[#1d1d1f] leading-[1.04] tracking-tight mb-6"
            aria-label="What Does the New iPhone 18 Pro Mean for Businesses?"
          >
            {["What", "Does", "the", "New"].map((w, i) => (
              <span key={i} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br />
            {["iPhone", "18", "Pro", "Mean"].map((w, i) => (
              <span key={i + 4} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br className="hidden sm:block" />
            {["for", "Businesses?"].map((w, i) => (
              <span key={i + 8} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
          </h1>

          {/* Standfirst */}
          <FadeUp delay={0.15}>
            <p className="text-[18px] sm:text-[21px] text-[#6e6e73] leading-relaxed max-w-3xl mb-10 font-normal">
              Apple's latest iPhone brings together new performance, camera, AI and connectivity
              capabilities. Here's how to evaluate what it means for your business.
            </p>
          </FadeUp>

          {/* Meta row */}
          <FadeUp delay={0.2}>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pb-8 border-b border-[#e5e5ea] text-[13px] sm:text-[14px]">
              <span className="flex items-center gap-2 text-[#3d3d3f]">
                <div className="w-8 h-8 rounded-full bg-[#1d1d1f] flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
               Jahara Bee
              </span>
              <span className="flex items-center gap-1.5 text-[#8e8e93]">
                <Calendar className="w-4 h-4" /> August 13, 2026
              </span>
              <span className="flex items-center gap-1.5 text-[#8e8e93]">
                <Clock className="w-4 h-4" /> 10 min read
              </span>
              <span className="flex items-center gap-1.5 text-[#0066cc] bg-[#e8f0fe] px-2.5 py-1 rounded-full font-medium">
                <Tag className="w-3.5 h-3.5" /> Apple Devices
              </span>
            </div>
          </FadeUp>
        </div>

        {/* Hero image */}
        <FadeUp delay={0.25} className="max-w-5xl mx-auto pt-8">
          <div className="relative rounded-t-3xl overflow-hidden h-[240px] sm:h-[400px] md:h-[500px] shadow-2xl">
            <img
              src="https://i.postimg.cc/YSFy3014/Screenshot-2026-09-16-at-3-42-06-PM-(2).png"
              alt="iPhone 18 Pro for enterprise — mobile productivity and business workflows"
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
            <article id="blog-article-body-v" className="flex-1 min-w-0">

              {/* TL;DR */}
              <FadeUp>
                <Callout type="tip">
                  <strong>TL;DR:</strong> The iPhone 18 Pro combines Apple's latest performance,
                  camera, AI and connectivity capabilities in a device designed for demanding
                  everyday and professional use. For businesses, evaluating the iPhone 18 Pro
                  should go beyond the hardware to consider employee requirements, deployment,
                  device management, security and the overall device lifecycle. Businesses
                  evaluating the iPhone 18 Pro can contact Sniper for pricing, demo evaluation
                  through SmartEPP, procurement options and deployment support.
                </Callout>
              </FadeUp>

              {/* ── INTRO ─────────────────────────────────────────────── */}
              <FadeUp>
                <Prose>
                  <p>
                    Apple's latest iPhone 18 Pro and iPhone 18 Pro Max bring together a new
                    generation of performance, camera capabilities, AI experiences, connectivity
                    and battery improvements. For businesses, however, the value of a new iPhone
                    goes beyond individual specifications.
                  </p>
                  <p className="mt-4">
                    The bigger question is how these capabilities can support employees, business
                    workflows and the wider technology environment. For organisations already using
                    Apple devices or considering expanding their Apple footprint, the iPhone 18 Pro
                    provides an opportunity to evaluate what the latest generation can bring to
                    mobile productivity, communication, content creation and enterprise workflows.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 1 ─ What's New ════════════════════════════ */}
              <SectionHeading id="whats-new">What Is New with the iPhone 18 Pro?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    The iPhone 18 Pro and iPhone 18 Pro Max introduce several updates across
                    performance, photography, battery life and intelligent features. At the centre
                    of the new generation is Apple's <strong>A20 Pro chip</strong>, designed to
                    deliver higher performance and support demanding workloads and AI experiences.
                  </p>
                  <p className="mt-4">
                    The new generation also introduces improvements to the camera system, including
                    a <strong>48MP Fusion Main camera with variable aperture</strong>, giving users
                    greater control over photography and professional content creation. Apple has
                    also expanded the role of AI through Apple Intelligence and the latest Siri AI
                    capabilities, while improvements to the thermal system support sustained
                    performance.
                  </p>
                </Prose>
              </FadeUp>

              {/* Feature cards grid */}
              <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {iPhoneFeatures.map((f, i) => (
                  <FeatureCard key={i} {...f} index={i} inView={featuresInView} />
                ))}
              </div>

              {/* ══ SECTION 2 ─ Productivity ══════════════════════════ */}
              <SectionHeading id="productivity">How Can the iPhone 18 Pro Support Business Productivity?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Employees today use smartphones for much more than calls and email. They may
                    review documents, participate in meetings, capture and share content, access
                    business applications, communicate with customers and work while travelling
                    between locations.
                  </p>
                  <p className="mt-4">
                    The iPhone 18 Pro's combination of performance, connectivity, camera capabilities
                    and intelligent features can support these different workflows from a single
                    device. For mobile and customer-facing teams, an advanced camera can support
                    professional content creation, documentation and visual communication. For
                    executives and knowledge workers, strong performance and connectivity supports
                    communication and access to business applications while working away from
                    the office.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="mt-4">
                <Callout type="info">
                  The value comes from how the device fits into the employee's wider workflow —
                  not from the specification sheet alone.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 3 ─ Enterprise Mobility ══════════════════ */}
              <SectionHeading id="enterprise-mobility">What Does the iPhone 18 Pro Mean for Enterprise Mobility?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Enterprise mobility is increasingly about providing employees with secure,
                    capable devices while giving IT teams the tools to manage them effectively.
                    Apple's platform supports organisations through technologies such as{" "}
                    <strong>Apple Business Manager, Automated Device Enrollment</strong> and device
                    management solutions. These capabilities help organisations establish a structured
                    approach to provisioning and managing Apple devices across their workforce.
                  </p>
                  <p className="mt-4">
                    For businesses with an existing Apple environment, the introduction of a new
                    iPhone generation is also an opportunity to review device standards, deployment
                    processes and lifecycle plans.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 4 ─ Content Creation ═════════════════════ */}
              <SectionHeading id="content-creation">Can the iPhone 18 Pro Support Professional Content Creation?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    The camera system is one of the areas where the iPhone 18 Pro can be
                    particularly relevant to businesses. Marketing teams, media teams, sales
                    professionals, real estate organisations, retail businesses and other
                    customer-facing functions can use mobile photography and video as part of
                    their daily workflows.
                  </p>
                  <p className="mt-4">
                    The new <strong>48MP Fusion Main camera with variable aperture</strong> gives
                    professionals greater control over image capture. Combined with the processing
                    capabilities of the A20 Pro, this creates a powerful mobile platform for
                    organisations where high-quality visual content is part of business
                    communication. Rather than requiring employees to rely on multiple devices for
                    everyday content workflows, businesses can evaluate whether the iPhone 18 Pro
                    can consolidate more of those activities into a single managed device.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 5 ─ Apple Intelligence ═══════════════════ */}
              <SectionHeading id="apple-intelligence">How Does Apple Intelligence Fit Into the Business Experience?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    AI is becoming an increasingly important part of workplace technology. The
                    iPhone 18 Pro brings Apple's latest <strong>Apple Intelligence</strong>{" "}
                    capabilities and Siri AI experience to the device. Apple's approach combines
                    on-device processing with <strong>Private Cloud Compute</strong> for supported
                    requests, with privacy remaining an important part of the platform.
                  </p>
                  <p className="mt-4">
                    For businesses, the opportunity is to consider where intelligent features can
                    support everyday work — from interacting with information to communicating and
                    completing tasks across supported experiences.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="mt-2">
                <Callout type="warning">
                  Organisations should evaluate how AI capabilities fit within their existing
                  application, security and data policies before introducing them into business
                  workflows.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 6 ─ Before Deploy ═════════════════════════ */}
              <SectionHeading id="before-deploy">What Should Businesses Consider Before Deploying iPhone 18 Pro?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    The decision to introduce a new device generation should be considered as part
                    of the broader IT environment. This approach helps organisations evaluate the
                    iPhone 18 Pro based on business requirements rather than simply upgrading
                    because a new model is available.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={checklistRef} className="my-8 bg-[#f9f9fb] rounded-2xl border border-[#e5e5ea] p-6 sm:p-8">
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#8e8e93] mb-5">Deployment evaluation checklist</p>
                <ul className="space-y-3">
                  {deploymentChecklist.map((item, i) => (
                    <CheckItem key={i} inView={checklistInView} delay={0.04 + i * 0.05}>{item}</CheckItem>
                  ))}
                </ul>
              </div>

              {/* ══ SECTION 7 ─ SmartEPP ═════════════════════════════ */}
              <SectionHeading id="evaluate">Can Businesses Evaluate the iPhone 18 Pro Before Making a Purchase?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    For organisations considering a new device rollout, evaluating the device
                    against real business workflows can be an important part of the decision-making
                    process.
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
                    Through Sniper's SmartEPP offering, businesses can explore the latest iPhone
                    options with access to <strong className="text-white">demo units</strong> for
                    testing relevant business use cases — assessing the device in their own working
                    environment before planning a wider deployment.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { label: "Demo units", detail: "Test against your real business workflows before committing" },
                      { label: "Buy-back options", detail: "Offset the cost of new devices by trading in existing fleet" },
                      { label: "Commercial support", detail: "Procurement, pricing and deployment planning in one place" },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-[13px] font-bold text-white mb-1">{item.label}</p>
                        <p className="text-[13px] text-[#8e8e93] leading-snug">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://sniperindia.com/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1d1d1f] font-semibold text-[14px] rounded-full hover:bg-[#f5f5f7] transition-colors"
                  >
                    Get iPhone 18 Pro Pricing <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </FadeUp>

              {/* ══ SECTION 8 ─ Sniper Services ══════════════════════ */}
              <SectionHeading id="sniper-apple">How Can Sniper Help Businesses with Apple Devices?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Bringing Apple devices into an enterprise environment involves more than
                    procurement. Sniper helps businesses across the Apple device lifecycle — from
                    understanding requirements and selecting appropriate devices through procurement,
                    deployment, implementation, management and ongoing support.
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
                    Sniper can also help businesses align Apple with their wider technology
                    environment, including solutions and services across{" "}
                    <a href="https://sniperindia.com/partners/microsoft/index.html" className="text-[#0066cc] underline underline-offset-2 hover:no-underline">Microsoft</a>,{" "}
                    <a href="https://sniperindia.com/partners/lenovo/index.html" className="text-[#0066cc] underline underline-offset-2 hover:no-underline">Lenovo</a>,{" "}
                    <a href="https://sniperindia.com/partners/adobe" className="text-[#0066cc] underline underline-offset-2 hover:no-underline">Adobe</a>,
                    managed services and IT lifecycle management where relevant to the
                    organisation's requirements.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ FAQ ═══════════════════════════════════════════════ */}
              <SectionHeading id="faq">Frequently Asked Questions</SectionHeading>

              <FadeUp className="border-t border-[#e5e5ea] divide-y divide-transparent my-4">
                {faqs.map((f, i) => (
                  <FaqItem key={i} {...f} index={i} />
                ))}
              </FadeUp>

              {/* ══ INLINE CTA ════════════════════════════════════════ */}
              <FadeUp delay={0.1} className="mt-16">
                <div className="rounded-2xl bg-[#1d1d1f] text-white px-8 sm:px-12 py-10 sm:py-14 text-center">
                  <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-4">
                    Get started
                  </p>
                  <h2 className="text-[28px] sm:text-[36px] font-black leading-tight mb-4">
                    Get iPhone 18 Pro Pricing for Your Business
                  </h2>
                  <p className="text-[16px] text-[#aeaeb2] max-w-xl mx-auto mb-8 leading-relaxed">
                    Planning an iPhone refresh or evaluating Apple devices for your organisation?
                    Talk to Sniper about iPhone 18 Pro pricing, procurement and deployment options.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://sniperindia.com/contact"
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
              <a href="https://blog.sniperindia.com/" className="hidden sm:inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0066cc] hover:underline">
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

export default BlogV;
