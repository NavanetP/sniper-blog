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
  FileText,
  Cpu,
  Users,
  Shield,
  Settings,
  RefreshCw,
  GraduationCap,
  HeartHandshake,
  Layers,
  Zap,
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
// COMPARISON TABLE
// ─────────────────────────────────────────────────────────
const ComparisonTable = ({ inView }: { inView: boolean }) => {
  const rows = [
    { feature: "Advanced PDF editing",         pro: true,  studio: true },
    { feature: "PDF security and redaction",   pro: true,  studio: true },
    { feature: "E-signatures",                 pro: true,  studio: true },
    { feature: "PDF comparison & management",  pro: true,  studio: true },
    { feature: "AI-powered document insights", pro: false, studio: true },
    { feature: "PDF Spaces",                   pro: false, studio: true },
    { feature: "Acrobat AI Assistant",         pro: false, studio: true },
    { feature: "Adobe Express Premium",        pro: false, studio: true },
    { feature: "AI-assisted content creation", pro: false, studio: true },
    { feature: "Team administration",          pro: true,  studio: true },
  ];
  return (
    <motion.div
      className="overflow-hidden rounded-2xl border border-[#e5e5ea] my-8"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay: 0.1 }}
    >
      <table className="w-full text-[14px] sm:text-[15px]">
        <thead>
          <tr className="bg-[#1d1d1f] text-white">
            <th className="text-left px-5 sm:px-6 py-4 font-semibold w-[52%]">Capability</th>
            <th className="text-center px-4 py-4 font-semibold w-[24%] border-l border-gray-700">Acrobat Pro</th>
            <th className="text-center px-4 py-4 font-semibold w-[24%] border-l border-gray-700">Acrobat Studio</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ feature, pro, studio }, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f9f9fb]"}>
              <td className="px-5 sm:px-6 py-3.5 text-[#3d3d3f] border-t border-[#e5e5ea] font-medium">{feature}</td>
              <td className="text-center px-4 py-3.5 border-t border-[#e5e5ea] border-l border-l-[#e5e5ea]">
                {pro
                  ? <CheckCircle2 className="w-4 h-4 text-[#1d1d1f] mx-auto" />
                  : <span className="text-[#c7c7cc] text-lg leading-none">—</span>}
              </td>
              <td className="text-center px-4 py-3.5 border-t border-[#e5e5ea] border-l border-l-[#e5e5ea]">
                {studio
                  ? <CheckCircle2 className="w-4 h-4 text-[#16a34a] mx-auto" />
                  : <span className="text-[#c7c7cc] text-lg leading-none">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

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
  { id: "what-is",         label: "What Is Acrobat Studio?" },
  { id: "vs-pro",          label: "Acrobat Pro vs Studio" },
  { id: "how-businesses",  label: "How Businesses Can Use It" },
  { id: "beyond-licence",  label: "Beyond the Licence" },
  { id: "india",           label: "Acrobat Studio in India" },
  { id: "sniper-adobe",    label: "Why Work With Sniper" },
  { id: "faq",             label: "FAQ" },
];

const SidebarTOC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.getElementById("blog-article-body-y");
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
const BlogY = () => {
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
      headline: "Adobe Acrobat Studio for Business: AI-Powered PDF & Content Creation",
      description: "How businesses can combine PDF productivity, AI document insights, collaboration and content creation in one Adobe solution — and what Acrobat Studio adds over Acrobat Pro.",
      image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1600&q=80",
      author: { "@type": "Organization", name: "Sniper Systems & Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Sniper Systems & Solutions",
        logo: { "@type": "ImageObject", url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png" },
      },
      datePublished: "2026-09-23",
      dateModified: "2026-09-23",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sniperindia.com/blog/adobe-acrobat-studio-for-business" },
      keywords: "Adobe Acrobat Studio, Acrobat Studio business, Acrobat Pro vs Studio, Adobe AI Assistant, PDF Spaces, Adobe Express Premium, Adobe for business India, Adobe licensing India, Sniper Adobe partner",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ────────────────────────────────────────────────
  useSEO({
    title: "Adobe Acrobat Studio for Business: AI-Powered PDF & Content Creation | Sniper",
    description: "How businesses can combine PDF productivity, AI document insights, collaboration and content creation in one Adobe solution — and what Acrobat Studio adds over Acrobat Pro.",
    keywords: "Adobe Acrobat Studio, Acrobat Studio for business, Acrobat Pro vs Acrobat Studio, Adobe AI Assistant business, PDF Spaces, Adobe Express Premium, Adobe for business India, Adobe licensing India, Sniper Adobe Gold Partner, Adobe Acrobat Studio India",
    ogTitle: "Adobe Acrobat Studio for Business: AI-Powered PDF & Content Creation",
    ogDescription: "Acrobat Pro vs Acrobat Studio — what's different, how businesses can use AI document insights, PDF Spaces and Adobe Express Premium, and how Sniper supports Adobe in India.",
    ogImage: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1600&q=80",
    ogUrl: "https://sniperindia.com/blog/adobe-acrobat-studio-for-business",
    canonicalUrl: "https://sniperindia.com/blog/adobe-acrobat-studio-for-business",
    twitterTitle: "Adobe Acrobat Studio for Business: AI-Powered PDF & Content Creation",
    twitterDescription: "What Acrobat Studio adds over Acrobat Pro — AI Assistant, PDF Spaces, Adobe Express Premium — and how to deploy it for your business in India.",
    twitterImage: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1600&q=80",
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
  const stepsRef    = useRef(null);
  const tableRef    = useRef(null);
  const servicesRef = useRef(null);
  const itRef       = useRef(null);

  const stepsInView    = useInView(stepsRef,    { once: true, margin: "-60px" });
  const tableInView    = useInView(tableRef,    { once: true, margin: "-60px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-60px" });
  const itInView       = useInView(itRef,       { once: true, margin: "-60px" });

  // ── DATA ──────────────────────────────────────────────
  const pdfSpacesUseCases = [
    "Sales: Organise proposals, product documents and competitive information",
    "Marketing: Combine campaign documents, research and brand resources",
    "Legal and compliance: Review multiple documents and identify relevant information",
    "Management teams: Bring reports and presentations together to accelerate reviews",
  ];

  const documentTransforms = [
    { from: "Research report",       to: "Presentation" },
    { from: "Product information",   to: "Marketing content" },
    { from: "Business document",     to: "Client-facing communication" },
    { from: "Report",                to: "Branded visual material" },
  ];

  const itLifecycle = [
    "Licensing — identify the appropriate Adobe plans and licence requirements",
    "Deployment planning — plan installation, user provisioning and rollout",
    "Workflow consulting — understand how teams currently create, review, sign and share documents",
    "Integration — align Adobe workflows with existing IT environment and applications",
    "User onboarding — help employees adopt new features and AI-powered workflows",
    "Renewal and ongoing support — maintain continuity and manage the Adobe subscription lifecycle",
  ];

  const sniperServices = [
    { icon: FileText,      title: "Licensing Consultation",     description: "Identify the right Adobe plans and licence types for your organisation's size and workflows." },
    { icon: Settings,      title: "Deployment Planning",        description: "Plan installation, user provisioning, Admin Console setup and rollout across departments or locations." },
    { icon: Layers,        title: "Workflow Consulting",        description: "Understand how teams create, review, sign and share documents — then align Adobe to those workflows." },
    { icon: Cpu,           title: "Enterprise Integration",     description: "Connect Adobe workflows with the organisation's existing IT environment, identity platforms and applications." },
    { icon: GraduationCap, title: "User Onboarding & Training", description: "Help employees adopt AI-powered features and new workflows through structured onboarding." },
    { icon: RefreshCw,     title: "Renewal & Ongoing Support",  description: "Maintain Adobe subscription continuity, manage renewals and provide ongoing technical support." },
  ];

  const faqs = [
    {
      q: "What is Adobe Acrobat Studio?",
      a: "Adobe Acrobat Studio is an AI-powered PDF and design solution that combines Acrobat Pro, Acrobat AI Assistant, PDF Spaces and Adobe Express Premium in one offering.",
    },
    {
      q: "What is included in Acrobat Studio?",
      a: "Acrobat Studio includes Acrobat Pro's PDF editing, conversion, protection, comparison and e-signature capabilities, plus AI Assistant for document insights, PDF Spaces for multi-document collaboration, and Adobe Express Premium for content creation.",
    },
    {
      q: "What is the difference between Acrobat Pro and Acrobat Studio?",
      a: "Acrobat Studio builds on Acrobat Pro by adding AI-powered document insights via AI Assistant, PDF Spaces for multi-document workspace collaboration, and Adobe Express Premium for creating presentations, flyers and branded content.",
    },
    {
      q: "Can Acrobat Studio be used by businesses?",
      a: "Yes. Adobe offers Acrobat Studio for teams and enterprise organisations, with business administration via Admin Console and licence-management capabilities for IT teams.",
    },
    {
      q: "Can Sniper help with Adobe Acrobat Studio licensing and deployment?",
      a: "Yes. Sniper's Adobe offering includes licensing guidance, deployment and onboarding, workflow consulting, renewal support and enterprise integration as an Adobe Gold Partner.",
    },
  ];

  const relatedPosts = [
    {
      title: "How AI-Powered Document Collaboration Is Transforming Modern Business Workflows",
      category: "Document AI",
      image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80",
      readTime: "9 min read",
      href: "/blog/how-ai-powered-document-collaboration-is-transforming-modern-business-workflows",
    },
    {
      title: "A Smarter Way to Document Work",
      category: "Adobe Acrobat",
      image: "https://i.postimg.cc/PrX7vbNy/adobe-acrobat-logo-on-background-(1).jpg",
      readTime: "8 min read",
      href: "/blog/bloga",
    },
    {
      title: "Microsoft Security Copilot: The Future of AI-Powered Enterprise Cybersecurity in 2026",
      category: "Cybersecurity",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      readTime: "10 min read",
      href: "/blog/microsoft-security-copilot-ai-powered-enterprise-cybersecurity-2026",
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
              <span className="text-[#1d1d1f]">Adobe Solutions</span>
            </div>
          </FadeUp>

          {/* Category badge */}
          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc] bg-[#e8f0fe] px-3 py-1.5 rounded-full mb-6">
              <FileText className="w-3.5 h-3.5" />
              Adobe Solutions · Document AI
            </span>
          </FadeUp>

          {/* Headline */}
          <h1
            ref={heroHeadingRef}
            className="text-[36px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-black text-[#1d1d1f] leading-[1.04] tracking-tight mb-6"
            aria-label="Adobe Acrobat Studio for Business: AI-Powered PDF & Content Creation"
          >
            {["Adobe", "Acrobat", "Studio"].map((w, i) => (
              <span key={i} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br />
            {["for", "Business"].map((w, i) => (
              <span key={i + 3} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
          </h1>

          {/* Standfirst */}
          <FadeUp delay={0.15}>
            <p className="text-[18px] sm:text-[21px] text-[#6e6e73] leading-relaxed max-w-3xl mb-10 font-normal">
              AI-Powered PDF &amp; Content Creation — how businesses can combine PDF
              productivity, AI document insights, collaboration and content creation in one
              Adobe solution.
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
                <Tag className="w-3.5 h-3.5" /> Adobe Solutions
              </span>
            </div>
          </FadeUp>
        </div>

        {/* Hero image */}
        <FadeUp delay={0.25} className="max-w-5xl mx-auto pt-8">
          <div className="relative rounded-t-3xl overflow-hidden h-[240px] sm:h-[400px] md:h-[500px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1600&q=80"
              alt="Adobe Acrobat Studio for business — AI-powered PDF and content creation workflows"
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

            <article id="blog-article-body-y" className="flex-1 min-w-0">

              {/* TL;DR */}
              <FadeUp>
                <Callout type="tip">
                  <strong>TL;DR:</strong> Adobe Acrobat Studio brings together Acrobat Pro,
                  Acrobat AI Assistant, PDF Spaces and Adobe Express Premium in one AI-powered
                  solution. For businesses, this means fewer disconnected workflows between
                  document management, analysis, collaboration and content creation. For
                  organisations in India, the right licensing, deployment and user onboarding
                  strategy is just as important as the software — and that is where an
                  experienced Adobe partner can help.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 1 ─────────────────────────────────────────── */}
              <SectionHeading id="what-is">What Is Adobe Acrobat Studio?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Adobe Acrobat Studio is an AI-powered PDF and design solution for business
                    workflows. Adobe describes it as a combination of four capabilities:
                  </p>
                </Prose>
              </FadeUp>

              {/* 4 components grid */}
              <FadeUp delay={0.05} className="my-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: FileText, label: "Acrobat Pro",          detail: "Advanced PDF editing, conversion, protection, comparison and e-signature workflows." },
                    { icon: Cpu,      label: "Acrobat AI Assistant",  detail: "Summaries, answers and document insights with citations linking back to source content." },
                    { icon: Users,    label: "PDF Spaces",            detail: "An AI-powered workspace for bringing multiple documents together, asking questions and collaborating." },
                    { icon: Zap,      label: "Adobe Express Premium", detail: "Create presentations, social content, flyers and branded materials from document insights." },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-4 p-5 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease, delay: 0.05 + i * 0.07 }}
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
                <Prose>
                  <p>
                    The result is a broader workflow than traditional PDF editing. Instead of
                    moving between separate tools to read documents, extract information,
                    collaborate and create content, teams can perform these activities within a
                    connected Adobe environment.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 2 ─────────────────────────────────────────── */}
              <SectionHeading id="vs-pro">Acrobat Pro vs Acrobat Studio: What's the Difference?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    A common question businesses ask is: <em>"What is the difference between
                    Acrobat Pro and Acrobat Studio?"</em>
                  </p>
                  <p className="mt-4">
                    Acrobat Pro provides advanced PDF editing, conversion, protection, comparison
                    and e-signature capabilities. Acrobat Studio includes those Acrobat Pro
                    capabilities and adds AI Assistant, PDF Spaces and Adobe Express Premium,
                    along with business administration capabilities in its teams offering.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={tableRef}>
                <ComparisonTable inView={tableInView} />
              </div>

              <FadeUp>
                <Callout type="info">
                  Adobe's current business comparison confirms that Acrobat Studio adds PDF
                  Spaces, Acrobat AI Assistant and Adobe Express Premium to the Acrobat Pro
                  foundation.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 3 ─────────────────────────────────────────── */}
              <SectionHeading id="how-businesses">How Businesses Can Use Acrobat Studio</SectionHeading>

              <div ref={stepsRef} className="divide-y divide-[#e5e5ea] border-t border-[#e5e5ea] my-8">

                <NumberedStep number={1} title="Understand Complex Documents Faster" inView={stepsInView}>
                  <p>
                    Business teams regularly deal with contracts, reports, policies, proposals,
                    research documents and presentations. Acrobat AI Assistant can help users
                    ask questions about documents, generate summaries and surface information
                    with citations that link back to source content.
                  </p>
                  <p>
                    For teams handling large volumes of information, this can reduce the time
                    spent manually searching through lengthy files.
                  </p>
                </NumberedStep>

                <NumberedStep number={2} title="Bring Multiple Documents Together With PDF Spaces" inView={stepsInView}>
                  <p>
                    PDF Spaces creates an AI-powered workspace where users can bring together
                    documents, links and other source material, ask questions and generate
                    insights. Adobe says PDF Spaces can summarise and analyse multiple files,
                    create content and share an interactive experience with other users.
                  </p>
                  <p>Potential business applications include:</p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {pdfSpacesUseCases.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.04 + i * 0.05}>{item}</CheckItem>
                    ))}
                  </ul>
                </NumberedStep>

                <NumberedStep number={3} title="Turn Business Documents Into Professional Content" inView={stepsInView}>
                  <p>
                    One of the major differences between Acrobat Pro and Acrobat Studio is the
                    addition of Adobe Express Premium. Teams can transform existing documents
                    into presentations, flyers, social content and other polished materials
                    using design tools and templates.
                  </p>
                  <p>Rather than starting from scratch, teams can use existing information as the basis for new content:</p>
                  {/* Document transform grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {documentTransforms.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea]">
                        <span className="text-[13px] text-[#6e6e73] flex-1">{item.from}</span>
                        <ArrowRight className="w-4 h-4 text-[#8e8e93] flex-shrink-0" />
                        <span className="text-[13px] font-semibold text-[#1d1d1f] flex-1 text-right">{item.to}</span>
                      </div>
                    ))}
                  </div>
                </NumberedStep>

                <NumberedStep number={4} title="Support More Secure PDF Workflows" inView={stepsInView}>
                  <p>
                    Acrobat Studio retains all the PDF capabilities businesses already expect
                    from Acrobat Pro — editing and organising PDFs, converting documents,
                    collecting signatures, password protection, redaction and document
                    management. Adobe also highlights security, access controls and
                    accessibility capabilities within its business offering.
                  </p>
                  <p>
                    For organisations handling business-sensitive documents, these capabilities
                    help bring document creation, sharing and protection into a more consistent
                    workflow.
                  </p>
                </NumberedStep>

                <NumberedStep number={5} title="Make Adobe Licensing Easier for IT Teams" inView={stepsInView}>
                  <div ref={itRef}>
                    <p>
                      For businesses, choosing the right software is only one part of the
                      implementation. IT teams also have to manage:
                    </p>
                    <div className="mt-4 bg-[#f9f9fb] rounded-xl border border-[#e5e5ea] p-5 sm:p-6">
                      <ul className="space-y-3">
                        {itLifecycle.map((item, i) => (
                          <CheckItem key={i} inView={itInView} delay={0.03 + i * 0.05}>{item}</CheckItem>
                        ))}
                      </ul>
                    </div>
                    <p className="mt-4">
                      Adobe's Acrobat for teams offering includes an Admin Console for managing
                      and assigning licences. Acrobat Studio is also available as an enterprise
                      offering for larger organisations. This is where working with an Adobe
                      partner in India can be particularly useful.
                    </p>
                  </div>
                </NumberedStep>

              </div>

              {/* ══ SECTION 4 ─────────────────────────────────────────── */}
              <SectionHeading id="beyond-licence">Why Businesses Need More Than an Adobe Licence</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Buying Adobe Acrobat Studio is only the starting point. A successful
                    business deployment also requires the software to fit into the organisation's
                    existing technology environment — from licensing and deployment through
                    workflow integration, onboarding and ongoing support.
                  </p>
                  <p className="mt-4">
                    For larger organisations, these activities become particularly important
                    when Adobe is being deployed across departments or locations.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 5 ─────────────────────────────────────────── */}
              <SectionHeading id="india">Adobe Acrobat Studio for Business in India</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    For businesses in India, the decision between Acrobat Pro and Acrobat Studio
                    should be based on how employees actually work.
                  </p>
                  <p className="mt-4">
                    <strong>Acrobat Pro</strong> can remain suitable for organisations primarily
                    focused on PDF creation, editing, protection and e-signatures.
                  </p>
                  <p className="mt-4">
                    <strong>Acrobat Studio</strong> becomes particularly relevant when teams
                    also need AI document analysis, multi-document collaboration and content
                    creation within the same workflow. Adobe's current business plans position
                    Studio as the broader solution, with enterprise options available for larger
                    organisations.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="mt-4">
                <Callout type="info">
                  The business case extends beyond PDF editing — it becomes a question of how
                  efficiently teams can <strong>understand information, collaborate and turn
                  documents into business-ready content</strong>.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 6 — Sniper ════════════════════════════════════ */}
              <SectionHeading id="sniper-adobe">Why Work With Sniper for Adobe Solutions?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Sniper Systems &amp; Solutions is an{" "}
                    <strong>Adobe Gold Partner</strong> supporting organisations with Adobe
                    products and solutions. Its published Adobe services include licensing
                    guidance, deployment and onboarding, workflow consulting, subscription
                    renewal support and enterprise integration.
                  </p>
                  <p className="mt-4">
                    For businesses evaluating Adobe Acrobat Studio in India, Sniper can support
                    the technology lifecycle from selecting the appropriate solution through
                    deployment and ongoing assistance.
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
                    <p className="text-[14px] font-bold text-[#1d1d1f] mb-0.5">Adobe Gold Partner · India</p>
                    <p className="text-[13px] text-[#6e6e73]">Licensing, deployment, onboarding, workflow consulting and renewal support for Adobe solutions across India.</p>
                  </div>
                  <a
                    href="https://sniperindia.com/partners/adobe/index.html"
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
                    Ready to move beyond traditional PDF workflows?
                  </p>
                  <h2 className="text-[28px] sm:text-[36px] font-black leading-tight mb-4">
                    Talk to Sniper About Adobe Acrobat Studio
                  </h2>
                  <p className="text-[16px] text-[#aeaeb2] max-w-xl mx-auto mb-8 leading-relaxed">
                    Adobe licensing, deployment and business solution support in India.
                    Find out which licences, deployment approach and workflows best fit
                    your organisation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://sniperindia.com/contact/"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#1d1d1f] font-semibold rounded-full hover:bg-[#f5f5f7] transition-colors text-[15px]"
                    >
                      Get in touch <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="https://sniperindia.com/partners/adobe/index.html"
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

export default BlogY;
