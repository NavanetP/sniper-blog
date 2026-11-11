import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Share2,
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
  Wifi,
  Shield,
  Layers,
  Users,
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
// CONSIDERATION CARD
// ─────────────────────────────────────────────────────────
const ConsiderationCard = ({ icon: Icon, title, description, index, inView }: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
}) => (
  <motion.div
    className="p-5 sm:p-6 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb]"
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, ease, delay: 0.04 + index * 0.07 }}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 rounded-xl bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <h4 className="text-[14px] font-bold text-[#1d1d1f]">{title}</h4>
    </div>
    <p className="text-[13px] text-[#6e6e73] leading-relaxed">{description}</p>
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
  { id: "what-is",         label: "What Is Apple Business?" },
  { id: "why-enterprises", label: "Why Enterprises Need It" },
  { id: "how-it-works",    label: "How It Works" },
  { id: "mdm-relationship",label: "Apple Business & MDM" },
  { id: "ade",             label: "Automated Device Enrollment" },
  { id: "it-workload",     label: "Reducing IT Workload" },
  { id: "before-impl",     label: "Before Implementation" },
  { id: "challenges",      label: "Common Challenges" },
  { id: "sniper",          label: "How Sniper Can Help" },
  { id: "faq",             label: "FAQ" },
];

const SidebarTOC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.getElementById("blog-article-body-ae");
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
const BlogAE = () => {
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
      headline: "Apple Business: What It Is, How It Works and Why Enterprises Need It",
      description: "Apple Business helps organisations manage Apple devices, users and deployment workflows from a central platform. Learn how it works with MDM, Automated Device Enrollment and why enterprises need it.",
      image: "/blog/apple-enterprise-devices.png",
      author: { "@type": "Organization", name: "Sniper Systems & Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Sniper Systems & Solutions",
        logo: { "@type": "ImageObject", url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png" },
      },
      datePublished: "2026-09-23",
      dateModified: "2026-09-23",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sniperindia.com/blog/apple-business-enterprise-guide" },
      keywords: "Apple Business enterprise India, Apple Business Manager MDM, Automated Device Enrollment ADE India, enterprise Apple deployment India, Apple MDM India, Sniper Apple partner India",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ────────────────────────────────────────────────
  useSEO({
    title: "Apple Business: What It Is, How It Works and Why Enterprises Need It | Sniper",
    description: "Apple Business helps organisations manage Apple devices, users and deployment workflows from a central platform. Learn how it works with MDM, Automated Device Enrollment and how Sniper supports enterprise Apple deployments in India.",
    keywords: "Apple Business enterprise India, Apple Business Manager, Apple Business MDM, Automated Device Enrollment ADE India, enterprise Apple deployment India, Apple device management India, Sniper Apple Gold Partner India",
    ogTitle: "Apple Business: What It Is, How It Works and Why Enterprises Need It",
    ogDescription: "How Apple Business connects device procurement with MDM and ADE, reduces IT workload and what enterprises need to plan before implementation — with Sniper support.",
    ogImage: "/blog/apple-enterprise-devices.png",
    ogUrl: "https://sniperindia.com/blog/apple-business-enterprise-guide",
    canonicalUrl: "https://sniperindia.com/blog/apple-business-enterprise-guide",
    twitterTitle: "Apple Business: What It Is, How It Works and Why Enterprises Need It",
    twitterDescription: "Apple Business + MDM + ADE — how it all connects, what to plan before implementation, and how Sniper helps enterprises in India.",
    twitterImage: "/blog/apple-enterprise-devices.png",
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
  const benefitsRef      = useRef(null);
  const considerationsRef = useRef(null);
  const challengesRef    = useRef(null);
  const servicesRef      = useRef(null);

  const benefitsInView       = useInView(benefitsRef,       { once: true, margin: "-60px" });
  const considerationsInView = useInView(considerationsRef, { once: true, margin: "-60px" });
  const challengesInView     = useInView(challengesRef,     { once: true, margin: "-60px" });
  const servicesInView       = useInView(servicesRef,       { once: true, margin: "-60px" });

  // ── DATA ──────────────────────────────────────────────
  const benefits = [
    "Centralise device assignment",
    "Connect devices with device management",
    "Support automated enrollment",
    "Simplify provisioning",
    "Reduce manual configuration",
    "Improve deployment consistency",
    "Manage organisational users and roles",
    "Support large-scale device rollouts",
  ];

  const withoutProcess = [
    "Receive devices",
    "Unbox them",
    "Configure settings",
    "Install applications",
    "Create or configure accounts",
    "Apply security settings",
    "Hand devices to users",
  ];

  const considerations = [
    { icon: Smartphone,    title: "Device Procurement",         description: "Determine how devices will be purchased and how they will be associated with the organisation's Apple Business environment." },
    { icon: Settings,      title: "Device Management",          description: "Select and prepare the appropriate MDM solution before connecting it to Apple Business." },
    { icon: Zap,           title: "Enrollment Strategy",        description: "Determine how different device types and ownership models should be enrolled." },
    { icon: Key,           title: "Identity & Authentication",  description: "Consider how users will authenticate and how Apple services will fit into the organisation's identity environment." },
    { icon: Wifi,          title: "Network Readiness",          description: "Ensure required network services are available for activation, enrollment and ongoing device management." },
    { icon: Shield,        title: "Security & Compliance",      description: "Define the policies and controls that need to be applied to managed devices." },
    { icon: Users,         title: "User Onboarding",            description: "Plan how users will receive their devices and what training or guidance they require." },
  ];

  const challenges = [
    "Incorrect device assignments",
    "Device management configuration problems",
    "Enrollment failures",
    "Identity integration issues",
    "Network configuration gaps",
    "Application deployment problems",
    "Lack of Apple-specific IT expertise",
    "Inconsistent processes between locations",
  ];

  const sniperServices = [
    { icon: Layers,        title: "Apple Business Enablement",             description: "Set up and prepare the Apple Business environment so devices can be correctly associated with the organisation and integrated into the deployment workflow." },
    { icon: Zap,           title: "Automated Device Enrollment",           description: "Configure and streamline ADE so eligible devices can be enrolled into the organisation's device management environment with minimal manual intervention." },
    { icon: Search,        title: "Apple Ecosystem Readiness",             description: "Assess the existing Apple environment and identify configuration, infrastructure or management requirements that should be addressed before deployment." },
    { icon: Settings,      title: "Device Management Evaluation",          description: "Review existing MDM configurations, identify gaps and help align them with the organisation's deployment and management requirements." },
    { icon: Wifi,          title: "Apple Ecosystem & Network Services",    description: "Prepare the network and Apple-specific services required for reliable device activation, enrollment and ongoing management." },
    { icon: Key,           title: "Federated Authentication Guidance",     description: "Connect organisational identity and authentication workflows with the Apple environment to support a smoother user experience." },
    { icon: Smartphone,    title: "Deployment Planning",                   description: "Plan the rollout — from pilot deployments and configuration to user onboarding — so the process is repeatable and scalable." },
    { icon: GraduationCap, title: "IT & End-User Training",                description: "Practical training for IT teams and users to help them confidently manage and work with Apple devices after deployment." },
    { icon: RefreshCw,     title: "Zero-Touch Deployment",                 description: "Design deployment workflows where devices can be configured and enrolled with minimal physical intervention from IT." },
    { icon: HeartHandshake,title: "Ongoing Technical Support",             description: "Post-deployment support covering deployment issues, troubleshooting and day-to-day Apple environment requirements." },
  ];

  const faqs = [
    { q: "Is Apple Business the same as MDM?",                 a: "No. Apple Business helps organisations manage device assignments and deployment workflows, while MDM provides the capabilities used to configure and manage the devices." },
    { q: "Do I need MDM with Apple Business?",                 a: "Apple Business and MDM work together for enterprise device deployment. Organisations typically connect Apple Business with a device management solution to manage and configure devices at scale." },
    { q: "Can Apple Business automate Mac deployment?",        a: "Yes. When configured with a compatible device management solution, Apple Business can support Automated Device Enrollment for eligible organisation-owned devices." },
    { q: "Is Apple Business suitable for large organisations?",a: "Yes. Apple Business is designed to support organisational Apple device deployment and management workflows, making it particularly useful for organisations managing larger Apple fleets." },
    { q: "How does Sniper help with Apple Business setup?",    a: "Sniper Professional Services helps organisations with Apple Business enablement, Automated Device Enrollment configuration, ecosystem readiness, MDM evaluation, network services, authentication guidance, deployment planning, training and ongoing support." },
  ];

  const relatedPosts = [
    { title: "How to Deploy Apple Devices at Scale in an Enterprise: A Complete Guide",        category: "Apple Deployment",  image: "/blog/apple-enterprise-devices.png",                                                      readTime: "14 min read", href: "/blog/enterprise-apple-device-deployment-guide" },
    { title: "What Does the New iPhone 18 Pro Mean for Businesses?",                          category: "Apple Devices",     image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",   readTime: "10 min read", href: "/blog/iphone-18-pro-for-business" },
    { title: "iPhone 18 Pro for Business: What IT and Enterprise Teams Should Know",           category: "Enterprise IT",     image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",   readTime: "12 min read", href: "/blog/iphone-18-pro-enterprise-it-guide" },
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
              <span className="text-[#1d1d1f]">Apple Deployment</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc] bg-[#e8f0fe] px-3 py-1.5 rounded-full mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              Blog Series: Apple Enterprise Deployment · Part 2
            </span>
          </FadeUp>

          <h1
            ref={heroHeadingRef}
            className="text-[36px] sm:text-[52px] md:text-[62px] lg:text-[72px] font-black text-[#1d1d1f] leading-[1.04] tracking-tight mb-6"
            aria-label="Apple Business: What It Is, How It Works and Why Enterprises Need It"
          >
            {["Apple", "Business"].map((w, i) => (
              <span key={i} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
          </h1>

          <FadeUp delay={0.15}>
            <p className="text-[18px] sm:text-[21px] text-[#6e6e73] leading-relaxed max-w-3xl mb-10 font-normal">
              What it is, how it works and why enterprises need it — a practical guide to
              Apple Business, MDM integration and Automated Device Enrollment for IT teams.
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
                <Clock className="w-4 h-4" /> 11 min read
              </span>
              <span className="flex items-center gap-1.5 text-[#0066cc] bg-[#e8f0fe] px-2.5 py-1 rounded-full font-medium">
                <Tag className="w-3.5 h-3.5" /> Apple Deployment
              </span>
            </div>
          </FadeUp>
        </div>

        {/* Hero image */}
        <FadeUp delay={0.25} className="max-w-5xl mx-auto pt-8">
          <div className="relative rounded-t-3xl overflow-hidden h-[240px] sm:h-[400px] md:h-[500px] shadow-2xl bg-white border border-[#e5e5ea]">
            <img
              src="/blog/apple-enterprise-devices.png"
              alt="Apple Business — enterprise device deployment lineup"
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain py-6 sm:py-10 px-4 sm:px-8"
            />
          </div>
        </FadeUp>
      </section>

      {/* ═══ BODY ════════════════════════════════════════════════════════ */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="flex gap-12 xl:gap-16 items-start">

            <SidebarTOC />

            <article id="blog-article-body-ae" className="flex-1 min-w-0">

              {/* TL;DR */}
              <FadeUp>
                <Callout type="tip">
                  <strong>TL;DR:</strong> Apple Business helps organisations manage Apple
                  devices, users and deployment workflows from a central platform. When
                  integrated with a device management solution, it can simplify device
                  provisioning, support Automated Device Enrollment and reduce manual work
                  for IT teams.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 1 ─────────────────────────────────────────── */}
              <SectionHeading id="what-is">What Is Apple Business?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Apple Business is a web-based service designed for organisations to manage
                    Apple devices, users and related deployment capabilities. For IT teams,
                    one of its most important functions is connecting organisation-owned Apple
                    devices with a device management solution.
                  </p>
                  <p className="mt-4">
                    This allows organisations to build a more structured deployment process
                    instead of configuring each device individually. Apple Business can be
                    particularly useful for organisations managing multiple Macs, iPhones or
                    iPads across departments, locations or user groups.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 2 ─────────────────────────────────────────── */}
              <SectionHeading id="why-enterprises">Why Do Enterprises Need Apple Business?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Managing a small number of Apple devices manually may be practical. As
                    the fleet grows, manual provisioning becomes time-consuming and difficult
                    to standardise. Apple Business can help organisations:
                  </p>
                </Prose>
              </FadeUp>

              <div ref={benefitsRef} className="my-8 bg-[#f9f9fb] rounded-2xl border border-[#e5e5ea] p-6 sm:p-8">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefits.map((item, i) => (
                    <CheckItem key={i} inView={benefitsInView} delay={0.03 + i * 0.04}>{item}</CheckItem>
                  ))}
                </ul>
              </div>

              <FadeUp>
                <Callout type="info">
                  The main benefit is not simply having another management portal. It is
                  creating a <strong>connection between device procurement and device
                  management</strong>.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 3 ─────────────────────────────────────────── */}
              <SectionHeading id="how-it-works">How Does Apple Business Work?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>A typical enterprise workflow looks like this:</p>
                </Prose>
              </FadeUp>

              {/* Workflow timeline */}
              <FadeUp delay={0.05} className="my-8">
                <div className="relative pl-8 border-l-2 border-[#e5e5ea] space-y-0">
                  {[
                    { step: "Purchase Apple devices",                              detail: "Through Apple or an authorised reseller such as Sniper." },
                    { step: "Add or associate devices with Apple Business",         detail: "Devices registered to the organisation's Apple Business environment." },
                    { step: "Connect a device management solution",                detail: "MDM linked to Apple Business for configuration and policy management." },
                    { step: "Assign devices to the management service",            detail: "Specific device management profile assigned before shipping." },
                    { step: "User activates the device",                           detail: "Employee turns on the device for the first time." },
                    { step: "Device enrolls into management",                      detail: "Automatic enrollment triggered during setup." },
                    { step: "Organisation's policies and configurations are applied", detail: "Settings, apps and security controls applied without manual IT preparation." },
                  ].map(({ step, detail }, i) => (
                    <motion.div key={i} className="relative pb-7 last:pb-0"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, ease, delay: i * 0.06 }}>
                      <div className="absolute -left-[calc(2rem+5px)] top-1 w-3 h-3 rounded-full bg-[#1d1d1f] border-2 border-white ring-1 ring-[#1d1d1f]" />
                      <p className="text-[15px] sm:text-[16px] leading-snug">
                        <strong className="font-semibold text-[#1d1d1f]">{step}</strong>
                        <span className="text-[#6e6e73] ml-2 text-[14px]">— {detail}</span>
                      </p>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp>
                <Prose>
                  <p>
                    This workflow reduces the need for IT teams to manually prepare every
                    device before handing it to the user.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 4 ─────────────────────────────────────────── */}
              <SectionHeading id="mdm-relationship">What Is the Relationship Between Apple Business and MDM?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Apple Business and Mobile Device Management (MDM) serve different
                    purposes and work together rather than replacing each other.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="my-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Apple Business",                 colour: "bg-[#f5f5f7]", points: ["Organisational framework for managing Apple devices", "Connects devices with a management service", "Supports device assignment and deployment workflows", "Central place for device procurement and registration"] },
                    { title: "Mobile Device Management (MDM)", colour: "bg-[#f0fdf4]", points: ["Actual device management capabilities", "Configure settings and enforce policies", "Deploy applications and profiles", "Monitor device health and compliance"] },
                  ].map((col, i) => (
                    <div key={i} className={`${col.colour} rounded-2xl border border-[#e5e5ea] p-5 sm:p-6`}>
                      <p className="text-[14px] font-bold text-[#1d1d1f] mb-4">{col.title}</p>
                      <ul className="space-y-2.5">
                        {col.points.map((pt, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-[13px] text-[#3d3d3f]">
                            <CheckCircle2 className="w-4 h-4 text-[#1d1d1f] mt-0.5 flex-shrink-0" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp>
                <Callout type="info">
                  For an enterprise deployment, understanding this distinction is important
                  when designing the overall architecture.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 5 ─────────────────────────────────────────── */}
              <SectionHeading id="ade">How Does Apple Business Support Automated Device Enrollment?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    One of the major advantages of Apple Business is its role in Automated
                    Device Enrollment (ADE). When an organisation's eligible devices are
                    correctly associated with Apple Business and assigned to its device
                    management service, the enrollment process can be configured before the
                    device reaches the user.
                  </p>
                  <p className="mt-4">
                    The user can then activate the device and go through the setup process
                    while the organisation's management configuration is applied automatically.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="mt-4">
                <Callout type="tip">
                  This is particularly valuable when deploying large numbers of devices
                  because <strong>IT teams don't need to manually configure every device</strong>
                  — the organisation's configuration is applied during the user's first
                  setup experience.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 6 ─────────────────────────────────────────── */}
              <SectionHeading id="it-workload">Can Apple Business Reduce IT Workload?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    It can significantly reduce repetitive deployment work when properly
                    configured with device management. Without a structured deployment
                    process, IT teams may need to handle each device manually:
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="my-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Without */}
                  <div className="bg-[#fff8f8] rounded-2xl border border-[#fee2e2] p-5 sm:p-6">
                    <p className="text-[13px] font-bold text-[#dc2626] uppercase tracking-[0.1em] mb-4">Without Apple Business setup</p>
                    <ul className="space-y-2.5">
                      {withoutProcess.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#3d3d3f]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* With */}
                  <div className="bg-[#f0fdf4] rounded-2xl border border-[#bbf7d0] p-5 sm:p-6">
                    <p className="text-[13px] font-bold text-[#16a34a] uppercase tracking-[0.1em] mb-4">With Apple Business + MDM</p>
                    <ul className="space-y-2.5">
                      {[
                        "Configuration prepared centrally in advance",
                        "Devices enrolled automatically during first setup",
                        "Applications deployed through MDM",
                        "Security policies applied without manual steps",
                        "IT team focuses on planning and exceptions",
                        "Consistent experience across all users",
                        "Scalable to any fleet size",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#3d3d3f]">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>

              {/* ══ SECTION 7 ─────────────────────────────────────────── */}
              <SectionHeading id="before-impl">What Should IT Teams Consider Before Implementing Apple Business?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Apple Business implementation should be planned rather than treated as a
                    simple account setup. Before deployment, IT teams should consider:
                  </p>
                </Prose>
              </FadeUp>

              <div ref={considerationsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {considerations.map((item, i) => (
                  <ConsiderationCard key={i} {...item} index={i} inView={considerationsInView} />
                ))}
              </div>

              {/* ══ SECTION 8 ─────────────────────────────────────────── */}
              <SectionHeading id="challenges">What Are Common Apple Business Challenges?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Apple Business itself is only one component of the deployment environment.
                    Organisations can still encounter challenges when connecting it with their
                    wider IT infrastructure. Common issues include:
                  </p>
                </Prose>
              </FadeUp>

              <div ref={challengesRef} className="my-8 bg-[#f9f9fb] rounded-2xl border border-[#e5e5ea] p-6 sm:p-8">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenges.map((item, i) => (
                    <CheckItem key={i} inView={challengesInView} delay={0.03 + i * 0.05}>{item}</CheckItem>
                  ))}
                </ul>
              </div>

              <FadeUp>
                <Callout type="warning">
                  Organisations should plan the complete Apple deployment workflow, rather
                  than implementing Apple Business in isolation. The surrounding ecosystem —
                  MDM, identity, network and user readiness — matters as much as the
                  Apple Business setup itself.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 9 — Sniper ════════════════════════════════════ */}
              <SectionHeading id="sniper">How Can Sniper Help With Apple Business?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Sniper Professional Services helps organisations prepare their Apple
                    environment and build a structured deployment process. From Apple Business
                    enablement to device enrollment, deployment and ongoing support, Sniper
                    helps IT teams reduce complexity and manage Apple devices more efficiently.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={servicesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {sniperServices.map((s, i) => (
                  <ServiceCard key={i} {...s} index={i} inView={servicesInView} />
                ))}
              </div>

              <FadeUp>
                <Callout type="tip">
                  The approach is designed to <strong>connect Apple Business with the broader
                  deployment lifecycle</strong> rather than treating it as a standalone setup
                  activity. For organisations that need additional expertise, Sniper can
                  support the journey from readiness and onboarding through deployment,
                  training, support and refresh planning.
                </Callout>
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
                    Ready to deploy?
                  </p>
                  <h2 className="text-[28px] sm:text-[36px] font-black leading-tight mb-4">
                    Need Help Setting Up Apple Business?
                  </h2>
                  <p className="text-[16px] text-[#aeaeb2] max-w-xl mx-auto mb-8 leading-relaxed">
                    Sniper Professional Services can help organisations with Apple ecosystem
                    readiness, Apple Business enablement, enrollment, deployment, training and
                    ongoing support.
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
                      Explore Apple Solutions
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

export default BlogAE;
