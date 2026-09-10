import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Clock,
  Share2,
  Tag,
  User,
  CheckCircle2,
  XCircle,
  Smartphone,
  Shield,
  Settings,
  RefreshCw,
  GraduationCap,
  HeartHandshake,
  Zap,
  Search,
  BookOpen,
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
    gsap.to(ref.current, {
      yPercent: -105, duration: 0.9, ease: "power3.inOut", delay: 0.2, onComplete,
    });
  }, []);
  return <div ref={ref} className="fixed inset-0 bg-white z-[9998] will-change-transform" />;
};

// ─────────────────────────────────────────────────────────
// FADE UP
// ─────────────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
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
// PROSE SECTION — editorial body block
// ─────────────────────────────────────────────────────────
const Prose = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`prose-block text-[17px] leading-[1.75] text-[#3d3d3f] ${className}`}>
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────
// CALLOUT BOX
// ─────────────────────────────────────────────────────────
const Callout = ({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "tip" | "warning" }) => {
  const styles = {
    info: "bg-[#f5f5f7] border-l-4 border-[#1d1d1f] text-[#1d1d1f]",
    tip: "bg-[#f0fdf4] border-l-4 border-[#16a34a] text-[#15803d]",
    warning: "bg-[#fffbeb] border-l-4 border-[#d97706] text-[#92400e]",
  };
  return (
    <div className={`rounded-r-xl px-6 py-5 my-8 ${styles[type]}`}>
      <div className="text-[15px] leading-relaxed font-medium">{children}</div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// SECTION HEADING (H2 editorial)
// ─────────────────────────────────────────────────────────
const SectionHeading = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <FadeUp>
    <h2
      id={id}
      className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#1d1d1f] leading-tight mt-16 mb-6 scroll-mt-24 font-sans"
    >
      {children}
    </h2>
  </FadeUp>
);

// ─────────────────────────────────────────────────────────
// NUMBERED STEP — large numeral Prismic style
// ─────────────────────────────────────────────────────────
const NumberedStep = ({
  number, title, children, inView,
}: { number: number; title: string; children: React.ReactNode; inView: boolean }) => (
  <motion.div
    className="flex gap-6 sm:gap-8 py-8 border-b border-[#e5e5ea] last:border-b-0"
    initial={{ opacity: 0, x: -20 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, ease, delay: 0.05 + (number - 1) * 0.07 }}
  >
    {/* Large numeral */}
    <div className="flex-shrink-0 w-14 sm:w-16">
      <span
        className="text-[56px] sm:text-[72px] font-black leading-none text-[#e5e5ea] select-none"
        aria-hidden="true"
      >
        {String(number).padStart(2, "0")}
      </span>
    </div>
    {/* Content */}
    <div className="flex-1 pt-2">
      <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1d1d1f] mb-3 leading-snug">{title}</h3>
      <div className="text-[15px] sm:text-[16px] leading-relaxed text-[#3d3d3f] space-y-3">
        {children}
      </div>
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────────────────
// CHECKLIST ITEM
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
// COMPARISON TABLE
// ─────────────────────────────────────────────────────────
const ComparisonTable = ({ inView }: { inView: boolean }) => {
  const rows = [
    ["More hands-on IT involvement", "Less manual preparation"],
    ["Individual device configuration", "Centralised configuration"],
    ["Harder to standardise at scale", "More consistent deployment"],
    ["More physical device handling", "Can reduce physical handling"],
    ["Less efficient for large rollouts", "Better suited to scalable deployments"],
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
            <th className="text-left px-5 sm:px-6 py-4 font-semibold tracking-wide w-1/2">
              Manual Setup
            </th>
            <th className="text-left px-5 sm:px-6 py-4 font-semibold tracking-wide w-1/2 border-l border-gray-700">
              Automated Device Enrollment
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([manual, ade], i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f9f9fb]"}>
              <td className="px-5 sm:px-6 py-4 text-[#3d3d3f] border-t border-[#e5e5ea]">
                <span className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-[#8e8e93] flex-shrink-0 mt-0.5" />
                  {manual}
                </span>
              </td>
              <td className="px-5 sm:px-6 py-4 text-[#1d1d1f] border-t border-[#e5e5ea] border-l border-l-[#e5e5ea]">
                <span className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1d1d1f] flex-shrink-0 mt-0.5" />
                  {ade}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────
// FAQ ACCORDION ITEM
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
// SERVICE CARD — SPS framework
// ─────────────────────────────────────────────────────────
const ServiceCard = ({
  icon: Icon, title, description, index, inView,
}: { icon: React.ElementType; title: string; description: string; index: number; inView: boolean }) => (
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
// CHALLENGE CARD
// ─────────────────────────────────────────────────────────
const ChallengeCard = ({ title, description, index, inView }: { title: string; description: string; index: number; inView: boolean }) => (
  <motion.div
    className="p-6 rounded-xl border border-[#e5e5ea] bg-[#f9f9fb]"
    initial={{ opacity: 0, y: 24 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.55, ease, delay: 0.05 + index * 0.08 }}
  >
    <div className="w-8 h-8 rounded-full bg-[#1d1d1f] text-white text-xs font-bold flex items-center justify-center mb-3 flex-shrink-0">
      {index + 1}
    </div>
    <h4 className="text-[16px] font-bold text-[#1d1d1f] mb-2 leading-snug">{title}</h4>
    <p className="text-[14px] text-[#6e6e73] leading-relaxed">{description}</p>
  </motion.div>
);

// ─────────────────────────────────────────────────────────
// STICKY SIDEBAR TOC
// ─────────────────────────────────────────────────────────
const TOC_LINKS = [
  { id: "what-it-involves", label: "What Deployment Involves" },
  { id: "how-to-deploy", label: "How to Deploy at Scale" },
  { id: "common-challenges", label: "Common Challenges" },
  { id: "sniper-services", label: "How Sniper Can Help" },
  { id: "deployment-strategy", label: "Deployment Strategy" },
  { id: "faq", label: "FAQ" },
];

const SidebarTOC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);

  // Show TOC only while the article body is in the viewport
  useEffect(() => {
    const article = document.getElementById("blog-article-body");
    if (!article) return;
    articleRef.current = article as HTMLElement;

    const onScroll = () => {
      const rect = article.getBoundingClientRect();
      // visible when article top has scrolled past ~140px from top of viewport
      // and article bottom hasn't yet left the viewport
      setVisible(rect.top < 140 && rect.bottom > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
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
      {/* ── Fixed TOC panel — only renders on xl+ screens ── */}
      <div
        className={`
          hidden xl:block
          fixed top-28 left-0 z-40
          transition-all duration-300
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
        `}
        style={{
          // Position it just to the left of the max-w-5xl (80rem = 1280px) container.
          // We use a CSS calc that centres the 5xl container then subtracts the
          // article offset so the TOC sits flush in the left gutter.
          left: "max(1.5rem, calc(50% - 40rem - 1rem))",
          width: "13rem",
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-[#e5e5ea] shadow-sm p-4 space-y-0.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-3 px-2">
            On this page
          </p>

          {TOC_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`w-full text-left text-[13px] px-2 py-2 rounded-lg transition-all duration-200 leading-snug flex items-center gap-2 group ${
                activeId === id
                  ? "text-[#1d1d1f] font-semibold"
                  : "text-[#8e8e93] hover:text-[#1d1d1f]"
              }`}
            >
              {/* Active indicator bar */}
              <span
                className={`flex-shrink-0 h-4 rounded-full transition-all duration-200 ${
                  activeId === id
                    ? "w-[3px] bg-[#1d1d1f]"
                    : "w-[2px] bg-[#e5e5ea] group-hover:bg-[#c7c7cc]"
                }`}
              />
              {label}
            </button>
          ))}

          {/* Share */}
          <div className="pt-3 mt-1 border-t border-[#e5e5ea]">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
              }}
              className="flex items-center gap-2 text-[13px] text-[#8e8e93] hover:text-[#1d1d1f] px-2 py-2 rounded-lg hover:bg-[#f5f5f7] transition-all w-full"
            >
              <Share2 className="w-3.5 h-3.5 flex-shrink-0" /> Copy link
            </button>
          </div>
        </div>
      </div>

      {/* ── Invisible spacer so the flex layout still reserves left column space ── */}
      <aside className="hidden xl:block w-52 flex-shrink-0" aria-hidden="true" />
    </>
  );
};

// ─────────────────────────────────────────────────────────
// RELATED CARD
// ─────────────────────────────────────────────────────────
const RelatedCard = ({ post }: { post: { title: string; category: string; image: string; readTime: string; href: string } }) => (
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

// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════
const BlogT = () => {
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
      headline: "How to Deploy Apple Devices at Scale in an Enterprise: A Complete Guide",
      description: "A complete enterprise guide to deploying Apple devices at scale — covering Apple Business, Automated Device Enrollment, MDM, pilot testing, user training and lifecycle management.",
      image: "https://sniperindia.com/blog/apple-enterprise-devices.png",
      author: { "@type": "Organization", name: "Sniper Systems & Solutions" },
      publisher: { "@type": "Organization", name: "Sniper Systems & Solutions", logo: { "@type": "ImageObject", url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png" } },
      datePublished: "2026-08-13",
      dateModified: "2026-08-13",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sniperindia.com/blog/enterprise-apple-device-deployment-guide" },
      keywords: "Apple enterprise deployment, Apple Business Manager, MDM Apple devices, Automated Device Enrollment, enterprise Apple rollout, Apple device management India, Sniper Apple partner",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ───────────────────────────────────────────────
  useSEO({
    title: "How to Deploy Apple Devices at Scale in an Enterprise: A Complete Guide",
    description: "A complete enterprise guide to deploying Apple devices at scale — covering Apple Business, Automated Device Enrollment, MDM, pilot testing, user training and lifecycle management.",
    keywords: "Apple enterprise deployment, Apple Business Manager, MDM Apple devices, Automated Device Enrollment ADE, enterprise Apple rollout India, Apple device management, iPhone iPad Mac enterprise, zero-touch deployment Apple, Apple MDM India, Sniper Apple partner, enterprise iOS deployment, Apple device lifecycle",
    ogTitle: "Enterprise Apple Device Deployment: A Complete Guide",
    ogDescription: "Everything IT teams need to know about deploying Apple devices at scale — from Apple Business and ADE to MDM, pilot testing and lifecycle planning.",
    ogImage: "/blog/apple-enterprise-devices.png",
    ogUrl: "https://sniperindia.com/blog/enterprise-apple-device-deployment-guide",
    canonicalUrl: "https://sniperindia.com/blog/enterprise-apple-device-deployment-guide",
    twitterTitle: "Enterprise Apple Device Deployment: A Complete Guide",
    twitterDescription: "Apple Business, ADE, MDM, zero-touch deployment — everything you need for a scalable enterprise Apple rollout.",
    twitterImage: "/blog/apple-enterprise-devices.png",
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
    const t = gsap.fromTo(words, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.06, delay: 1.1 });
    return () => { t.kill(); };
  }, []);

  // ── SECTION REFS ─────────────────────────────────────
  const stepsRef = useRef(null);
  const challengesRef = useRef(null);
  const servicesRef = useRef(null);
  const tableRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });
  const challengesInView = useInView(challengesRef, { once: true, margin: "-60px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-60px" });
  const tableInView = useInView(tableRef, { once: true, margin: "-60px" });

  // ── DATA ──────────────────────────────────────────────
  const spsServices = [
    { icon: Search, title: "Apple Ecosystem Readiness", description: "Assess and prepare your Apple environment before deployment begins." },
    { icon: Smartphone, title: "Apple Business & Enrollment Support", description: "Assistance with Apple Business Manager, DEP/ADE and related deployment requirements." },
    { icon: Settings, title: "Professional Services", description: "Support for Apple ecosystem setup, network services, federated authentication and deployment planning." },
    { icon: Zap, title: "Zero-Touch Deployment", description: "Enable a more streamlined device provisioning experience — devices ready on first power-on." },
    { icon: RefreshCw, title: "Migration & Digital Transformation", description: "Device evaluation, migration workshops and application/use-case planning." },
    { icon: GraduationCap, title: "IT & User Training", description: "Build Apple skills across IT administrators and end users from day one." },
    { icon: HeartHandshake, title: "Resident Engineer Support", description: "Embedded technical expertise for ongoing deployment, troubleshooting and day-to-day management." },
    { icon: Shield, title: "Device Wellness & Refresh Planning", description: "Periodic health checks and structured device replacement planning across the lifecycle." },
  ];

  const challenges = [
    { title: "Fragmented Deployment Processes", description: "Procurement, enrollment, configuration and support handled by different teams or vendors can create gaps in ownership and communication." },
    { title: "Limited Apple Expertise", description: "IT teams familiar primarily with other platforms may need additional expertise when managing Apple-specific services, enrollment and workflows." },
    { title: "Application Compatibility", description: "Existing business applications may not always work as expected in a new environment. Testing and migration planning can reduce deployment risks." },
    { title: "Lack of Post-Deployment Visibility", description: "Once devices reach users, organisations still need to monitor device health, compliance and support requirements." },
    { title: "No Lifecycle Plan", description: "A device deployment should also consider what happens when devices age, require replacement or need to be refreshed." },
  ];

  const faqs = [
    { q: "How do enterprises deploy Apple devices at scale?", a: "Enterprises typically combine Apple Business Manager, a device management (MDM) solution and an appropriate enrollment method. Automated Device Enrollment can help streamline the setup of eligible organisation-owned devices, allowing them to enroll automatically during first-time setup." },
    { q: "What is Automated Device Enrollment (ADE)?", a: "Automated Device Enrollment is an Apple deployment method that allows eligible organisation-owned devices to enroll into device management during the setup process. This reduces the need for manual preparation by IT teams and enables a more consistent, scalable deployment experience." },
    { q: "Do enterprises need an MDM solution for Apple devices?", a: "The requirement depends on the organisation's deployment and management needs. For larger fleets, centralised device management helps IT teams configure policies, applications and security settings consistently across the entire device fleet." },
    { q: "How can organisations make Apple deployment easier?", a: "Start with clear requirements, connect procurement with device management planning, test the deployment with a pilot group and plan user training and post-deployment support from the beginning. Working with an authorised Apple partner like Sniper can also reduce risk and accelerate timelines." },
    { q: "What is zero-touch deployment for Apple devices?", a: "Zero-touch deployment means devices can be delivered directly to users and be enterprise-ready on first activation — without IT needing to physically prepare each device. This is enabled through Apple Business Manager and an MDM solution configured in advance." },
  ];

  const relatedPosts = [
    { title: "Microsoft Security Copilot: The Future of AI-Powered Enterprise Cybersecurity in 2026", category: "Cybersecurity", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", readTime: "10 min read", href: "/blog/microsoft-security-copilot-ai-powered-enterprise-cybersecurity-2026" },
    { title: "How Microsoft Intune Is Helping Enterprises Secure Hybrid Work and Simplify Endpoint Management", category: "Endpoint Security", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80", readTime: "9 min read", href: "/blog/how-microsoft-intune-is-helping-enterprises-secure-hybrid-work-and-simplify-endpoint-management" },
    { title: "Don't Just Dispose: How IT Asset Buyback Helps Businesses Recover Value and Protect Data", category: "IT Asset Management", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", readTime: "9 min read", href: "/blog/it-asset-buyback-recover-value-protect-data" },
  ];

  const considerItems = ["User roles and workloads", "Required applications", "Existing IT infrastructure", "Network requirements", "Security and compliance requirements", "Device management capabilities", "Training and support requirements"];
  const pilotItems = ["Device enrollment", "Application compatibility", "Network connectivity", "Authentication", "Security policies", "User workflows", "Support procedures"];
  const trainingItems = ["Basic macOS or iPadOS usage", "Organisation-specific applications", "Security practices and policies", "Collaboration workflows", "File management", "Common troubleshooting steps"];
  const mgmtItems = ["Security policies", "Device restrictions", "Wi-Fi and network settings", "Applications", "User accounts", "Configuration profiles", "Compliance requirements"];

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
              <span className="text-[#1d1d1f]">Apple Enterprise Deployment</span>
            </div>
          </FadeUp>

          {/* Series badge */}
          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc] bg-[#e8f0fe] px-3 py-1.5 rounded-full mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              Blog Series: Apple Enterprise Deployment · Part 1
            </span>
          </FadeUp>

          {/* Headline */}
          <h1
            ref={heroHeadingRef}
            className="text-[36px] sm:text-[52px] md:text-[62px] lg:text-[72px] font-black text-[#1d1d1f] leading-[1.04] tracking-tight mb-6"
            style={{ fontFamily: "'SF Pro Display', 'Inter', 'Helvetica Neue', sans-serif" }}
            aria-label="How to Deploy Apple Devices at Scale in an Enterprise"
          >
            {["How", "to", "Deploy"].map((w, i) => (
              <span key={i} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br />
            {["Apple", "Devices"].map((w, i) => (
              <span key={i + 3} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br className="hidden sm:block" />
            {["at", "Scale"].map((w, i) => (
              <span key={i + 5} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
          </h1>

          {/* Standfirst */}
          <FadeUp delay={0.15}>
            <p className="text-[18px] sm:text-[21px] text-[#6e6e73] leading-relaxed max-w-3xl mb-10 font-normal">
              A complete IT guide — from procurement and Apple Business to MDM,
              Automated Device Enrollment, user onboarding and lifecycle management.
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
                <Clock className="w-4 h-4" /> 14 min read
              </span>
              <span className="flex items-center gap-1.5 text-[#0066cc] bg-[#e8f0fe] px-2.5 py-1 rounded-full font-medium">
                <Tag className="w-3.5 h-3.5" /> Apple Deployment
              </span>
            </div>
          </FadeUp>
        </div>

        {/* Hero image — Apple device lineup */}
        <FadeUp delay={0.25} className="max-w-5xl mx-auto pt-8">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-[#e5e5ea] shadow-xl py-6 sm:py-10 px-4 sm:px-8">
            <img
              src="/blog/apple-enterprise-devices.png"
              alt="Apple enterprise device lineup — Mac, iPad, iPhone, Apple Watch, Apple TV and Vision Pro showing Device Management enrollment screens"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain max-h-[300px] sm:max-h-[420px] md:max-h-[500px]"
            />
          </div>
        </FadeUp>
      </section>

      {/* ═══ BODY — two-column with sticky TOC ═══════════════════════════ */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="flex gap-12 xl:gap-16 items-start">

            {/* ── Sidebar TOC ── */}
            <SidebarTOC />

            {/* ── Main content ── */}
            <article id="blog-article-body" className="flex-1 min-w-0">

              {/* TL;DR callout */}
              <FadeUp>
                <Callout type="tip">
                  <strong>TL;DR:</strong> Enterprise Apple deployment works best when procurement,
                  Apple Business, device management, automated enrollment, configuration and support
                  are planned as one connected process. A structured approach helps IT teams reduce
                  manual work, improve consistency and provide a smoother experience for users.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 1 ══════════════════════════════════════════════ */}
              <SectionHeading id="what-it-involves">What Does Enterprise Apple Device Deployment Involve?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    At a basic level, enterprise Apple deployment covers the complete journey from
                    selecting the right device to managing it throughout its lifecycle. It is not
                    simply a procurement exercise — it requires a connected approach across multiple
                    stages, from initial requirements discovery through to device refresh.
                  </p>
                </Prose>
              </FadeUp>

              {/* Lifecycle steps — timeline */}
              <FadeUp delay={0.1} className="my-10">
                <div className="relative pl-8 border-l-2 border-[#e5e5ea] space-y-0">
                  {[
                    { step: "Discovery", detail: "Understand users, workloads and IT requirements." },
                    { step: "Procurement", detail: "Select and purchase the appropriate devices." },
                    { step: "Apple Business Setup", detail: "Connect organisational devices and services." },
                    { step: "Device Management", detail: "Configure policies, applications and security settings." },
                    { step: "Enrollment", detail: "Enroll devices into the organisation's management environment." },
                    { step: "Deployment", detail: "Deliver devices and onboard users." },
                    { step: "Support & Lifecycle", detail: "Monitor, maintain and plan for device refresh." },
                  ].map(({ step, detail }, i) => (
                    <motion.div key={i} className="relative pb-7 last:pb-0"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, ease, delay: i * 0.06 }}>
                      {/* dot */}
                      <div className="absolute -left-[calc(2rem+5px)] top-1 w-3 h-3 rounded-full bg-[#1d1d1f] border-2 border-white ring-1 ring-[#1d1d1f]" />
                      <p className="text-[15px] sm:text-[16px] leading-snug">
                        <strong className="font-semibold text-[#1d1d1f]">{step}</strong>
                        <span className="text-[#6e6e73] ml-2">— {detail}</span>
                      </p>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp>
                <Prose>
                  <p>
                    Planning these stages together becomes increasingly important when deploying
                    devices across multiple teams or locations. Treating them as separate activities
                    often leads to gaps, delays and inconsistencies that surface only after devices
                    are already in users' hands.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 2 ══════════════════════════════════════════════ */}
              <SectionHeading id="how-to-deploy">How Do You Deploy Apple Devices at Scale?</SectionHeading>

              <div ref={stepsRef} className="divide-y divide-[#e5e5ea] border-t border-[#e5e5ea] my-8">

                <NumberedStep number={1} title="Start With Requirements and Device Planning" inView={stepsInView}>
                  <p>Before purchasing devices, IT teams should identify who will use them and what they need to accomplish.</p>
                  <ul className="mt-4 space-y-2.5 list-none">
                    {considerItems.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.05 + i * 0.05}>{item}</CheckItem>
                    ))}
                  </ul>
                  <p className="mt-4">
                    This helps organisations avoid choosing hardware without considering the
                    environment in which it will operate.
                  </p>
                </NumberedStep>

                <NumberedStep number={2} title="Set Up Apple Business" inView={stepsInView}>
                  <p>
                    Apple Business provides organisations with tools to manage Apple devices and users.
                    For enterprise deployments, it can connect purchased devices with the
                    organisation's device management environment.
                  </p>
                  <p className="mt-3">
                    Devices purchased through Apple Business Partners like Sniper can also be added
                    to the organisation's Apple Business environment — creating the foundation for
                    a more structured deployment process.
                  </p>
                </NumberedStep>

                <NumberedStep number={3} title="Connect a Device Management Solution" inView={stepsInView}>
                  <p>
                    A device management (MDM) solution allows IT teams to configure and manage
                    devices centrally. Depending on requirements, teams may configure:
                  </p>
                  <ul className="mt-4 space-y-2.5 list-none">
                    {mgmtItems.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.05 + i * 0.04}>{item}</CheckItem>
                    ))}
                  </ul>
                  <p className="mt-4">
                    Centralised management becomes increasingly important as the number of managed
                    devices grows across teams and locations.
                  </p>
                </NumberedStep>

                <NumberedStep number={4} title="Use Automated Device Enrollment Where Appropriate" inView={stepsInView}>
                  <p>
                    For eligible organisation-owned devices, Automated Device Enrollment (ADE) can
                    significantly reduce the amount of manual preparation required from IT teams.
                  </p>
                  <p className="mt-3">
                    Instead of preparing every Mac or iPad individually, the organisation configures
                    the enrollment process in advance. When users activate their devices, they
                    automatically enroll into the organisation's management environment.
                  </p>
                  <div ref={tableRef} className="mt-6">
                    <ComparisonTable inView={tableInView} />
                  </div>
                  <p className="mt-4 text-[14px] text-[#6e6e73] italic">
                    The appropriate enrollment method depends on the organisation's ownership
                    model and requirements.
                  </p>
                </NumberedStep>

                <NumberedStep number={5} title="Test Before the Full Rollout" inView={stepsInView}>
                  <p>
                    A pilot deployment can help identify problems before they affect the entire
                    organisation. Test with a representative group of users and check:
                  </p>
                  <ul className="mt-4 space-y-2.5 list-none">
                    {pilotItems.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.05 + i * 0.04}>{item}</CheckItem>
                    ))}
                  </ul>
                  <Callout type="info">
                    A successful pilot gives IT teams an opportunity to resolve issues and refine
                    the deployment process before moving to a larger rollout. Skipping this stage
                    is one of the most common sources of avoidable deployment problems.
                  </Callout>
                </NumberedStep>

                <NumberedStep number={6} title="Plan User Onboarding and Support" inView={stepsInView}>
                  <p>
                    Technical deployment is only one part of the process. Users may need guidance
                    when moving to Apple devices, particularly when transitioning from another
                    operating system. Training can cover:
                  </p>
                  <ul className="mt-4 space-y-2.5 list-none">
                    {trainingItems.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.05 + i * 0.04}>{item}</CheckItem>
                    ))}
                  </ul>
                  <p className="mt-4">
                    IT teams may also require deeper training on Apple Business, device management
                    and administration — not just end-user orientation.
                  </p>
                </NumberedStep>

              </div>

              {/* ══ SECTION 3 ══════════════════════════════════════════════ */}
              <SectionHeading id="common-challenges">What Are the Common Challenges?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Even with a defined process, enterprise deployments can run into challenges.
                    Understanding these in advance helps IT teams plan mitigations before they
                    become blockers.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={challengesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {challenges.map((c, i) => (
                  <ChallengeCard key={i} {...c} index={i} inView={challengesInView} />
                ))}
              </div>

              {/* ══ SECTION 4 ══════════════════════════════════════════════ */}
              <SectionHeading id="sniper-services">How Can Sniper Help With Enterprise Apple Deployment?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Deploying Apple devices at scale often requires expertise across multiple
                    stages — not just device delivery. Sniper Professional Services (SPS) provides
                    a lifecycle-focused approach, helping organisations address requirements from
                    planning and readiness through deployment, training, support and refresh.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="my-8">
                <Callout type="tip">
                  <strong>One partner, every stage.</strong> Rather than treating procurement,
                  deployment and support as separate activities, Sniper's lifecycle model connects
                  Discovery → Pre-Sales → POC → Sales → Logistics → Deployment → Support → Refresh.
                </Callout>
              </FadeUp>

              <div ref={servicesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {spsServices.map((s, i) => (
                  <ServiceCard key={i} {...s} index={i} inView={servicesInView} />
                ))}
              </div>

              {/* ══ SECTION 5 ══════════════════════════════════════════════ */}
              <SectionHeading id="deployment-strategy">What Should a Scalable Apple Deployment Strategy Look Like?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    A simple way to approach enterprise deployment is to think in connected
                    stages — each with clear ownership, documentation and measurable outcomes.
                  </p>
                </Prose>
              </FadeUp>

              {/* Process flow */}
              <FadeUp delay={0.1} className="my-8">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-8 px-6 bg-[#f5f5f7] rounded-2xl">
                  {["Plan", "Procure", "Configure", "Enroll", "Deploy", "Support", "Refresh"].map((label, i, arr) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3">
                      <motion.span
                        className="text-[13px] sm:text-[14px] font-bold text-[#1d1d1f] bg-white px-3 sm:px-4 py-2 rounded-xl shadow-sm border border-[#e5e5ea] whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease, delay: 0.05 + i * 0.07 }}
                      >
                        {label}
                      </motion.span>
                      {i < arr.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-[#8e8e93] flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp>
                <Prose>
                  <p>
                    The goal isn't simply to deploy devices quickly. It is to create a{" "}
                    <strong>repeatable process</strong> that can be used for future deployments,
                    new employees and device refresh cycles. Every step should be documented so
                    the next rollout takes less time and involves fewer decisions from scratch.
                  </p>
                </Prose>
              </FadeUp>

              {/* ══ SECTION 6 — FAQ ════════════════════════════════════════ */}
              <SectionHeading id="faq">Frequently Asked Questions</SectionHeading>

              <FadeUp className="border-t border-[#e5e5ea] divide-y divide-transparent my-4">
                {faqs.map((f, i) => (
                  <FaqItem key={i} {...f} index={i} />
                ))}
              </FadeUp>

              {/* ══ CTA INLINE ════════════════════════════════════════════ */}
              <FadeUp delay={0.1} className="mt-16">
                <div className="rounded-2xl bg-[#1d1d1f] text-white px-8 sm:px-12 py-10 sm:py-14 text-center">
                  <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-4">
                    Ready to deploy?
                  </p>
                  <h2 className="text-[28px] sm:text-[36px] font-black leading-tight mb-4">
                    Need help with your Apple deployment?
                  </h2>
                  <p className="text-[16px] text-[#aeaeb2] max-w-xl mx-auto mb-8 leading-relaxed">
                    Sniper Professional Services can help your organisation plan, deploy and manage
                    its Apple environment across the full device lifecycle.
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

export default BlogT;
