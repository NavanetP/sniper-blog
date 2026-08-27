import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Tag,
  User,
  CheckCircle2,
  Cloud,
  Shield,
  Server,
  Cpu,
  Wifi,
  Database,
  Building2,
  Layers,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

// ─── Shared easing ─────────────────────────────────────
const ease = [0.16, 1, 0.3, 1] as const;

// ========================================================
// ✦ WHITE SCREEN TRANSITION
// ========================================================
const WhiteScreenTransition = ({ onComplete }: { onComplete: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(ref.current, {
      yPercent: -105,
      duration: 0.9,
      ease: "power3.inOut",
      delay: 0.2,
      onComplete,
    });
  }, []);
  return <div ref={ref} className="fixed inset-0 bg-white z-[9999] will-change-transform" />;
};

// ========================================================
// ✦ FADE-UP WRAPPER
// ========================================================
const FadeUp = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
};

// ========================================================
// ✦ MARQUEE TICKER
// ========================================================
const MarqueeTicker = ({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-gray-950 py-3 sm:py-4 border-y border-gray-800">
      <div
        className="flex gap-8 sm:gap-10 whitespace-nowrap"
        style={{
          animation: `marqueeR${reverse ? "Rev" : ""} 28s linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((text, i) => (
          <span
            key={i}
            className="flex items-center gap-8 sm:gap-10 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500"
          >
            {text}
            <span className="w-1.5 h-1.5 rounded-full bg-gray-700 inline-block flex-shrink-0" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marqueeR    { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marqueeRRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>
    </div>
  );
};

// ========================================================
// ✦ PARALLAX IMAGE
// ========================================================
const ParallaxImage = ({
  src,
  alt,
  className,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    const tween = gsap.fromTo(
      img,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 1 },
      }
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return (
    <div ref={wrapRef} className={`overflow-hidden ${className ?? ""}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover scale-110"
        style={{ willChange: "transform" }}
      />
      {children}
    </div>
  );
};

// ========================================================
// ✦ META PILL
// ========================================================
const MetaPill = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium">
    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
    <span>{label}</span>
  </div>
);

// ========================================================
// ✦ RELATED POST CARD
// ========================================================
const RelatedCard = ({
  post,
}: {
  post: { title: string; category: string; image: string; readTime: string; href: string };
}) => (
  <a
    href={post.href}
    className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 h-full block"
  >
    <div className="relative h-44 sm:h-56 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute top-3 left-3">
        <span className="bg-black/70 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
          {post.category}
        </span>
      </div>
    </div>
    <div className="p-5 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 leading-snug group-hover:underline underline-offset-2">
        {post.title}
      </h3>
      <span className="text-xs text-gray-500 flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" /> {post.readTime}
      </span>
    </div>
  </a>
);

// ========================================================
// ✦ TABLE OF CONTENTS ITEM
// ========================================================
const TocItem = ({ index, title, inView }: { index: number; title: string; inView: boolean }) => {
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!inView || !lineRef.current) return;
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1, ease: "power3.out", delay: 0.3 + index * 0.1 }
    );
  }, [inView, index]);
  return (
    <motion.div
      className="relative pb-5 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease, delay: 0.2 + index * 0.08 }}
    >
      <div className="flex items-start gap-4">
        <span className="text-gray-500 text-xs font-mono mt-1 flex-shrink-0">0{index + 1}</span>
        <span className="text-white text-sm sm:text-base font-medium leading-relaxed">{title}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-700 overflow-hidden">
        <div
          ref={lineRef}
          className="h-full bg-gradient-to-r from-transparent via-gray-400 to-transparent"
          style={{ transform: "scaleX(0)", willChange: "transform" }}
        />
      </div>
    </motion.div>
  );
};

// ========================================================
// ✦ PILLAR CARD (dark)
// ========================================================
const PillarCard = ({
  icon: Icon,
  title,
  description,
  index,
  inView,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  inView: boolean;
}) => (
  <motion.div
    className="border border-gray-700 rounded-2xl p-6 sm:p-8 bg-gray-900 hover:border-gray-500 transition-colors duration-300"
    initial={{ opacity: 0, y: 40 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease, delay: 0.1 + index * 0.08 }}
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-4 sm:mb-5">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
    </div>
    <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 leading-snug">{title}</h4>
    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

// ========================================================
// ✦ BENEFIT CARD (light)
// ========================================================
const BenefitCard = ({
  icon: Icon,
  title,
  description,
  index,
  inView,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  inView: boolean;
}) => (
  <motion.div
    className="border border-gray-200 rounded-2xl p-6 sm:p-8 bg-white hover:shadow-lg transition-shadow duration-300"
    initial={{ opacity: 0, y: 40 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease, delay: 0.1 + index * 0.08 }}
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 sm:mb-5">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
    </div>
    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 leading-snug">{title}</h4>
    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

// ========================================================
// ✦ CHECKLIST ROW
// ========================================================
const CheckRow = ({ items, inView }: { items: string[]; inView: boolean }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <motion.li
        key={i}
        className="flex items-start gap-3 text-sm sm:text-base text-gray-700"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.06 }}
      >
        <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
        {item}
      </motion.li>
    ))}
  </ul>
);

// ========================================================
// MAIN BLOG-R PAGE
// ========================================================
const BlogR = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);

  // ── GEO meta tags (India) ─────────────────────────────
  useEffect(() => {
    const geoTags: Array<[string, string]> = [
      ["geo.region", "IN"],
      ["geo.placename", "India"],
      ["geo.position", "20.5937;78.9629"],
      ["ICBM", "20.5937, 78.9629"],
    ];
    const added: HTMLMetaElement[] = [];
    geoTags.forEach(([name, content]) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
        added.push(el);
      }
      el.content = content;
    });
    return () => added.forEach((el) => el.remove());
  }, []);

  // ── JSON-LD Article Schema ────────────────────────────
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "From GCC Setup to AI-Ready Operations: Why India's GCCs Need a New IT Infrastructure Strategy",
      description:
        "Discover why India's GCCs are modernising IT infrastructure for AI, cloud and cybersecurity and what enterprises need to build scalable, secure GCC operations.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
      author: { "@type": "Organization", name: "Sniper Systems & Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Sniper Systems & Solutions",
        logo: {
          "@type": "ImageObject",
          url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png",
        },
      },
      datePublished: "2026-08-13",
      dateModified: "2026-08-13",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id":
          "https://sniperindia.com/blog/gcc-it-infrastructure-ai-ready-operations-india",
      },
      keywords:
        "GCC IT infrastructure, GCC in India, Global Capability Centers India, AI infrastructure, AI-ready infrastructure, GCC cloud infrastructure, GCC cybersecurity, enterprise IT infrastructure, IT infrastructure for GCCs",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ───────────────────────────────────────────────
  useSEO({
    title:
      "GCC IT Infrastructure: Building AI-Ready GCCs in India | Sniper Systems",
    description:
      "Discover why India's GCCs are modernising IT infrastructure for AI, cloud and cybersecurity and what enterprises need to build scalable, secure GCC operations.",
    keywords:
      "GCC IT infrastructure, GCC in India, Global Capability Centers in India, AI infrastructure, AI-ready infrastructure, GCC cloud infrastructure, GCC cybersecurity, enterprise IT infrastructure, GCC technology infrastructure, IT infrastructure for GCCs, IT infrastructure for Global Capability Centers, GCC infrastructure solutions in India, AI infrastructure for GCC, cloud infrastructure for GCC, cybersecurity solutions for GCCs, enterprise IT infrastructure for GCC",
    ogTitle:
      "GCC IT Infrastructure: Building AI-Ready GCCs in India",
    ogDescription:
      "Discover why India's GCCs are modernising IT infrastructure for AI, cloud and cybersecurity and what enterprises need to build scalable, secure GCC operations.",
    ogImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    ogUrl:
      "https://sniperindia.com/blog/gcc-it-infrastructure-ai-ready-operations-india",
    canonicalUrl:
      "https://sniperindia.com/blog/gcc-it-infrastructure-ai-ready-operations-india",
    twitterTitle:
      "GCC IT Infrastructure: Building AI-Ready GCCs in India",
    twitterDescription:
      "Why India's GCCs need a new IT infrastructure strategy — AI, cloud, cybersecurity and integrated enterprise tech explained.",
    twitterImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
  });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── GSAP: hero word-stagger ────────────────────────────
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = heroHeadingRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".hero-word");
    const tween = gsap.fromTo(
      words,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.07, delay: 1.2 }
    );
    return () => { tween.kill(); };
  }, []);

  // ── GSAP: hero image scale-on-scroll ──────────────────
  const heroImgWrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heroImgWrapRef.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { scale: 0.82, borderRadius: "2.5rem" },
      {
        scale: 1,
        borderRadius: "1.5rem",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 95%", end: "top 10%", scrub: 1.4 },
      }
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  // ── GSAP: CTA word stagger ────────────────────────────
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  useEffect(() => {
    if (!ctaInView) return;
    const el = ctaHeadingRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".cta-word");
    gsap.fromTo(words,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.06, delay: 0.2 }
    );
  }, [ctaInView]);

  // ── Related posts stagger ─────────────────────────────
  const relatedGridRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef(null);
  const relatedInView = useInView(relatedRef, { once: true, margin: "-60px" });
  const relatedTriggered = useRef(false);
  useEffect(() => {
    if (!relatedInView || relatedTriggered.current) return;
    relatedTriggered.current = true;
    const cards = relatedGridRef.current?.querySelectorAll(".related-card");
    if (!cards) return;
    gsap.fromTo(cards, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.12 });
  }, [relatedInView]);

  // ── Section inView refs ───────────────────────────────
  const heroRef = useRef(null);
  const tocRef = useRef(null);
  const pillarsRef = useRef(null);
  const aiRef = useRef(null);
  const securityRef = useRef(null);
  const checklistRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const tocInView = useInView(tocRef, { once: true, margin: "-60px" });
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-60px" });
  const aiInView = useInView(aiRef, { once: true, margin: "-60px" });
  const securityInView = useInView(securityRef, { once: true, margin: "-60px" });
  const checklistInView = useInView(checklistRef, { once: true, margin: "-60px" });

  // ── Data ──────────────────────────────────────────────
  const tocItems = [
    "India's GCC Story Is No Longer Just About Setting Up a Centre",
    "Why the Next GCC Investment Will Be Infrastructure",
    "AI Is Changing the Definition of 'Ready' Infrastructure",
    "Cloud Is Moving From Migration Project to Operating Model",
    "Cybersecurity Has to Scale With GCC Responsibility",
    "The Real Infrastructure Challenge Is Integration",
    "What Should GCC Leaders Get Right From the Beginning?",
    "How Sniper India Supports the Technology Behind Modern GCCs",
  ];

  const infrastructurePillars = [
    {
      icon: Cpu,
      title: "AI Infrastructure",
      description:
        "GPU-accelerated computing, high-performance enterprise servers and scalable storage to take AI projects from experimentation to production.",
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description:
        "Public cloud, private infrastructure and hybrid environments that align with workload requirements — built for development, data and global access.",
    },
    {
      icon: Server,
      title: "Servers & Storage",
      description:
        "High-performance compute and enterprise storage designed to support AI workloads, data platforms and demanding engineering environments.",
    },
    {
      icon: Wifi,
      title: "Enterprise Networking",
      description:
        "High-speed connectivity that keeps globally distributed teams in sync and ensures data can flow securely across the GCC environment.",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description:
        "Zero Trust, identity management, endpoint security and continuous monitoring designed as architecture, not an afterthought.",
    },
    {
      icon: Database,
      title: "Managed IT Services",
      description:
        "Ongoing infrastructure support covering management, monitoring and optimisation so GCC teams can focus on their core objectives.",
    },
  ];

  const aiRequirements = [
    "GPU-accelerated computing",
    "High-performance enterprise servers",
    "Scalable storage",
    "High-speed networking",
    "Data platforms",
    "Secure development environments",
    "Cloud resources",
  ];

  const securityLayers = [
    "Identity management",
    "Endpoint security",
    "Network security",
    "Cloud security",
    "Data protection",
    "Continuous monitoring",
    "Zero Trust architecture",
    "Third-party access controls",
  ];

  const gccChecklist = [
    {
      title: "Think beyond today's employee count",
      description:
        "Infrastructure should be designed around expected applications, data growth, AI workloads and global connectivity — not just the number of desks.",
    },
    {
      title: "Design security into the architecture",
      description:
        "Identity, endpoints, cloud, networks and data should be considered together rather than secured independently.",
    },
    {
      title: "Plan for AI before AI becomes urgent",
      description:
        "Even if every team is not using AI today, the infrastructure roadmap should account for future compute, storage and data requirements.",
    },
    {
      title: "Avoid creating technology silos",
      description:
        "Cloud, servers, networking, security and workplace technologies should fit into one operational model.",
    },
  ];

  const relatedPosts = [
    {
      title: "The Hidden Technology Behind India's GCC Boom: Why IT Infrastructure Is Becoming the Biggest Investment",
      category: "Enterprise IT",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      readTime: "10 min read",
      href: "/blog/the-hidden-technology-behind-indias-gcc-boom-why-it-infrastructure-matters",
    },
    {
      title: "How Enterprises Are Using Azure OpenAI to Drive Productivity and Innovation in 2026",
      category: "Cloud AI",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      readTime: "11 min read",
      href: "/blog/how-enterprises-are-using-azure-openai-to-drive-productivity-and-innovation-in-2026",
    },
    {
      title: "Microsoft Security Copilot: The Future of AI-Powered Enterprise Cybersecurity in 2026",
      category: "Cybersecurity",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      readTime: "10 min read",
      href: "/blog/microsoft-security-copilot-ai-powered-enterprise-cybersecurity-2026",
    },
  ];

  const marqueeItems1 = [
    "Sniper Systems Blog",
    "GCC IT Infrastructure",
    "AI-Ready GCCs",
    "Global Capability Centers",
    "India GCC",
    "Enterprise IT",
  ];
  const marqueeItems2 = [
    "Cloud Infrastructure",
    "Cybersecurity for GCCs",
    "AI Infrastructure",
    "Zero Trust",
    "Managed IT Services",
    "Server & Storage",
    "GCC Technology",
  ];
  const marqueeItems3 = [
    "Stay Informed",
    "Technology Insights",
    "Sniper Systems",
    "GCC Strategy",
    "Read More",
  ];

  return (
    <Layout>
      {showWhiteScreen && (
        <WhiteScreenTransition onComplete={() => setShowWhiteScreen(false)} />
      )}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16" ref={heroRef}>

            {/* Meta pills */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.9 }}
            >
              <MetaPill icon={Tag} label="GCC IT Infrastructure" />
              <MetaPill icon={Calendar} label="August 13, 2026" />
              <MetaPill icon={Clock} label="12 min read" />
              <MetaPill icon={User} label="Sniper Systems" />
            </motion.div>

            {/* Headline */}
            <h1
              ref={heroHeadingRef}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight"
              aria-label="From GCC Setup to AI-Ready Operations"
            >
              {["From", "GCC", "Setup"].map((word, i) => (
                <span key={i} className="hero-word inline-block opacity-0 mr-[0.22em]">
                  {word}
                </span>
              ))}
              <br className="hidden sm:block" />
              {["to", "AI-Ready", "Operations"].map((word, i) => (
                <span key={i + 3} className="hero-word inline-block opacity-0 mr-[0.22em]">
                  {word}
                </span>
              ))}
            </h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 1.55 }}
            >
              Why India's GCCs Need a New IT Infrastructure Strategy
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 1.7 }}
            >
              India's GCCs are taking ownership of AI, product engineering and global technology
              operations. That transition creates a very different infrastructure challenge — one
              that can no longer be answered with the same setup playbook that established the
              centres in the first place.
            </motion.p>
          </div>

          {/* Hero image */}
          <motion.div
            className="max-w-6xl mx-auto pt-6 sm:pt-8 lg:pt-12"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            <div
              ref={heroImgWrapRef}
              className="relative shadow-2xl overflow-hidden h-56 sm:h-96 md:h-[500px] lg:h-[600px]"
              style={{ borderRadius: "2.5rem", willChange: "transform, border-radius", transformOrigin: "center center" }}
            >
              <ParallaxImage
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
                alt="Global Capability Center IT infrastructure — India GCC technology strategy"
                className="w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 z-10">
                  <div className="bg-black/50 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                    <span className="text-[10px] sm:text-sm font-medium uppercase tracking-widest">
                      GCC IT INFRASTRUCTURE
                    </span>
                  </div>
                </div>
              </ParallaxImage>
            </div>
          </motion.div>
        </div>
      </section>

      <MarqueeTicker items={marqueeItems1} />

      {/* ── Table of Contents ────────────────────────────────────────────── */}
      <FadeUp className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-6 my-8 sm:my-12">
        <div ref={tocRef} className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-white flex-shrink-0" />
            <FadeUp>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                In This Article
              </h2>
            </FadeUp>
          </div>
          <div className="space-y-5">
            {tocItems.map((item, i) => (
              <TocItem key={i} index={i} title={item} inView={tocInView} />
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ── Section 1: GCC Story ─────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                No Longer Just<br />About Setting Up
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-16">
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION ONE<br />THE CHANGING GCC MANDATE
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                For years, the conversation around Global Capability Centers in India revolved
                around talent, operating costs and location. That conversation is changing.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                GCCs are increasingly taking ownership of product engineering, AI initiatives,
                cloud platforms, cybersecurity, data and global technology operations. Industry
                research describes this transition as a move from execution-focused centres
                toward strategic technology and innovation hubs.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                That creates a very different infrastructure challenge. A GCC developing AI
                solutions does not have the same technology requirements as a centre handling
                routine business operations. Engineering teams need high-performance computing.
                AI workloads need scalable compute and data infrastructure. Global teams need
                dependable connectivity. And as GCCs take responsibility for increasingly
                valuable information, cybersecurity needs to be embedded into the operating model.
              </p>
              <div className="border-l-4 border-gray-900 pl-6 py-2">
                <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed">
                  The question is no longer simply: <em>How quickly can we establish a GCC?</em>
                  <br />It is: <strong>Can the technology foundation scale as the GCC's role expands?</strong>
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Mid image */}
          <FadeUp delay={0.1} className="mb-10 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
                alt="Modern GCC office environment with enterprise IT infrastructure"
                className="w-full h-full"
              />
            </div>
          </FadeUp>

          {/* Section 2 — Infrastructure Investment */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Why the Next GCC<br />Investment Will Be<br />Infrastructure
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-14">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION TWO<br />BUILDING FOR THE FUTURE OPERATING MODEL
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  A modern GCC is becoming part of the enterprise's core technology strategy.
                  That means infrastructure has to support more than employees logging into
                  business applications. It may need to support AI development, software
                  engineering, analytics, cloud-native applications, cybersecurity operations
                  and global product development.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  This is why infrastructure decisions increasingly need to be made alongside
                  the GCC's business strategy. A useful way to think about it is:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <p className="text-sm sm:text-base text-gray-700 font-semibold leading-relaxed text-center">
                    GCC growth → more complex workloads → greater infrastructure demands → stronger need for integration
                  </p>
                </div>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Building infrastructure after the GCC has already scaled can create
                  unnecessary complexity. Designing it around the future operating model
                  gives IT teams more room to grow.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <MarqueeTicker items={marqueeItems2} reverse />

      {/* ── Pull Quote ───────────────────────────────────────────────────── */}
      <FadeUp className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-6 my-8 sm:my-12">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 sm:mb-10">
              "It will not be enough to have the right people in the right location. The centre also needs the technology foundation to let those people build, test, secure, deploy and scale their work."
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-gray-400 text-sm sm:text-base uppercase tracking-widest font-medium">
              Sniper Systems &amp; Solutions — GCC Infrastructure Strategy
            </p>
          </FadeUp>
        </div>
      </FadeUp>

      {/* ── Section 3: AI Infrastructure ─────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                AI Is Changing the<br />Definition of "Ready"
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-16" ref={aiRef}>
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION THREE<br />AI INFRASTRUCTURE FOR GCCS
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                GCCs are increasingly becoming locations for AI engineering, product
                development and enterprise automation. Industry research highlights
                deeper AI capabilities across products, platforms and infrastructure,
                while recent discussions point toward agentic AI and AI-native operating models.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                But AI adoption is not simply about purchasing an AI application.
                The underlying environment may need:
              </p>
              <CheckRow items={aiRequirements} inView={aiInView} />
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                This creates a new infrastructure question for GCC leaders:{" "}
                <strong>Is the current environment capable of taking an AI project
                from experimentation to production?</strong>
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                The goal isn't to build the largest possible infrastructure environment.
                It is to create an architecture that can scale as AI workloads become
                more demanding.
              </p>
            </FadeUp>
          </div>

          {/* Mid image */}
          <FadeUp delay={0.1} className="mb-10 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80"
                alt="AI infrastructure for GCC — GPU computing and enterprise servers"
                className="w-full h-full"
              />
            </div>
          </FadeUp>

          {/* Section 4 — Cloud */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Cloud as an<br />Operating Model
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION FOUR<br />GCC CLOUD INFRASTRUCTURE
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Cloud adoption used to be discussed primarily as a migration exercise.
                  For modern GCCs, that is too narrow. Cloud is becoming part of how
                  development teams build applications, how data is processed, how AI
                  workloads scale and how global teams access technology resources.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  A GCC may therefore use a combination of public cloud, private
                  infrastructure and hybrid environments depending on workload
                  requirements. The important decision is not simply where infrastructure
                  sits. It is how{" "}
                  <strong>cloud, data, security and on-premises systems work together</strong>.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  This is particularly relevant as India's technology ecosystem invests
                  in greater AI compute and cloud capacity, with infrastructure readiness
                  becoming an increasingly important part of the AI growth story.
                  For organisations planning or modernising their GCC cloud environment,{" "}
                  <a
                    href="/solutions/cloud-solutions"
                    className="text-gray-900 font-semibold underline underline-offset-2 hover:no-underline"
                  >
                    Sniper Cloud Solutions
                  </a>{" "}
                  can support assessment, migration, management and optimisation.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Cybersecurity (dark panel) ───────────────────────── */}
      <FadeUp className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-6 my-8 sm:my-12">
        <div className="max-w-4xl mx-auto" ref={securityRef}>
          <FadeUp>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-white mb-4 sm:mb-6">
              Cybersecurity Must<br />Scale With GCC<br />Responsibility
            </h2>
          </FadeUp>
          <div className="w-full h-px bg-gray-700 mb-10 sm:mb-14" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-14">
            <FadeUp>
              <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider leading-relaxed">
                SECTION FIVE<br />GCC CYBERSECURITY
              </p>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                The more strategic a GCC becomes, the more sensitive the information it
                is likely to handle. Source code, product information, customer data,
                intellectual property, financial information and AI-related data can all
                become part of the GCC's technology environment.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                That makes cybersecurity an architectural consideration, not a final
                layer added after deployment. Modern GCC security needs to connect:
              </p>
              <div className="bg-gray-900 rounded-xl p-5 sm:p-6 border border-gray-700">
                <p className="text-white font-semibold text-base sm:text-lg text-center">
                  Identity + Endpoint + Network + Cloud + Data + Applications
                </p>
              </div>
            </FadeUp>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {securityLayers.map((layer, i) => (
              <motion.div
                key={i}
                className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center"
                initial={{ opacity: 0, y: 24 }}
                animate={securityInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.07 }}
              >
                <Shield className="w-4 h-4 text-gray-400 mx-auto mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gray-300 leading-snug">{layer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ── Section 6: Integration + Infrastructure Pillars ──────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                The Real Challenge<br />Is Integration
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-16 sm:mb-20">
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION SIX<br />INTEGRATED ENTERPRISE IT
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                A GCC can have powerful servers, a sophisticated cloud platform and strong
                security tools and still struggle if those technologies are disconnected.
                Consider an AI engineering team: it needs computing resources, those
                resources need access to data, that data needs scalable storage, the
                environment needs high-speed connectivity, access needs to be controlled,
                and the entire stack needs to be monitored and managed.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                That makes <strong>integrated enterprise IT infrastructure</strong> more
                valuable than isolated technology purchases. The competitive advantage
                comes from making these layers work together:
              </p>
              <div className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-200">
                <p className="text-sm sm:text-base text-gray-700 font-semibold leading-relaxed text-center">
                  AI Infrastructure + Cloud + Servers &amp; Storage + Networking + Cybersecurity + Digital Workplace
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Infrastructure pillars grid */}
          <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {infrastructurePillars.map((p, i) => (
              <PillarCard key={i} {...p} index={i} inView={pillarsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: GCC Checklist ─────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                What GCC Leaders<br />Should Get Right<br />From the Start
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div
            ref={checklistRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-16 sm:mb-20"
          >
            {gccChecklist.map((item, i) => (
              <BenefitCard
                key={i}
                icon={Building2}
                title={item.title}
                description={item.description}
                index={i}
                inView={checklistInView}
              />
            ))}
          </div>

          {/* Final image */}
          <FadeUp delay={0.1} className="mb-10 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80"
                alt="Enterprise IT infrastructure supporting GCC operations in India"
                className="w-full h-full"
              />
            </div>
          </FadeUp>

          {/* Section 8 — Sniper India */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  How Sniper India<br />Supports Modern GCCs
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION EIGHT<br />SNIPER INDIA GCC SOLUTIONS
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Building a GCC is not simply an exercise in technology procurement.
                  It requires an infrastructure partner that can understand how{" "}
                  <strong>AI, cloud, cybersecurity, servers, storage, networking and
                  workplace technologies</strong> fit together.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Sniper Systems &amp; Solutions supports enterprise technology
                  environments for GCCs across Enterprise IT Infrastructure, AI
                  Infrastructure, Cloud Solutions (Microsoft Azure, AWS), Server &amp;
                  Storage, Enterprise Networking, Cybersecurity and Managed IT Services.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  India's GCC ecosystem is moving toward greater ownership of AI,
                  products, engineering and strategic technology decisions. The GCCs
                  that bring these infrastructure pieces together will be better
                  positioned to move from execution to innovation.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { label: "Cloud Solutions", href: "/solutions/cloud-solutions" },
                    { label: "IT Infrastructure", href: "/solutions/it-infrastructure" },
                    { label: "Cybersecurity", href: "/solutions/cybersecurity" },
                    { label: "Managed IT Services", href: "/solutions/managed-it-services" },
                    { label: "Microsoft Solutions", href: "/partners/microsoft" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
                    >
                      {link.label} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Closing statement */}
          <FadeUp className="bg-gray-950 text-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 mt-4 sm:mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {[
                { label: "AI needs", value: "Compute" },
                { label: "Data needs", value: "Infrastructure" },
                { label: "Cloud needs", value: "Architecture" },
                { label: "Innovation needs", value: "Security" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="border-b border-gray-700 pb-4 sm:pb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                >
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-2xl sm:text-3xl font-semibold text-white">{item.value}</p>
                </motion.div>
              ))}
            </div>
            <FadeUp delay={0.2}>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                For enterprises establishing or expanding a{" "}
                <strong className="text-white">Global Capability Center in India</strong>,
                IT infrastructure should be planned as a strategic capability from the start.
                The next GCC advantage will be technology readiness.
              </p>
            </FadeUp>
          </FadeUp>

        </div>
      </section>

      <MarqueeTicker items={marqueeItems3} />

      {/* ── Source Attribution ───────────────────────────────────────────── */}
      <section className="bg-gray-50 py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Sources &amp; References
            </h3>
            <ul className="space-y-2">
              {[
                "EY India — India's GCCs are leading the shift to intelligent, AI-native enterprises",
                "EY India — Why India is winning the cloud investment race",
                "Yitro Global — GCC Setup in India for Modern Enterprises",
                "Team Computers — India's GCC Boom and Technology Hiring",
              ].map((source, i) => (
                <li key={i} className="text-xs sm:text-sm text-gray-500 flex items-start gap-2">
                  <span className="text-gray-400 font-mono flex-shrink-0">[{i + 1}]</span>
                  {source}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* ── Related Posts ────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto" ref={relatedRef}>
          <FadeUp className="mb-10 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 leading-tight">
              Continue<br />Reading
            </h2>
          </FadeUp>

          <div ref={relatedGridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
            {relatedPosts.map((post, index) => (
              <div key={index} className="related-card opacity-0">
                <RelatedCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <FadeUp className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-6 my-8 sm:my-12 overflow-hidden">
        <div ref={ctaRef} className="max-w-4xl mx-auto text-center">
          <div className="mb-8 sm:mb-12 overflow-hidden">
            <h2
              ref={ctaHeadingRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-4 sm:mb-6 leading-tight"
              aria-label="Ready to build AI-ready GCC infrastructure?"
            >
              {["Ready", "to", "build", "AI-ready", "infrastructure?"].map((word, i) => (
                <span key={i} className="cta-word inline-block opacity-0 mr-[0.22em] last:mr-0">
                  {word}
                  {word === "build" && <br className="hidden sm:block" />}
                </span>
              ))}
            </h2>
          </div>
          <FadeUp delay={0.3}>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Talk to our team about IT infrastructure strategy for your Global Capability
              Center — AI, cloud, cybersecurity and managed services, integrated.
            </p>
          </FadeUp>
          <FadeUp delay={0.45}>
            <a
              href="/contact"
              className="inline-flex items-center px-8 sm:px-12 py-3 sm:py-4 border-2 border-white rounded-full text-white font-medium text-base sm:text-lg hover:bg-white hover:text-black transition-colors duration-300"
            >
              GET IN TOUCH
            </a>
          </FadeUp>
        </div>
      </FadeUp>

      {/* ── Scroll to Top ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 w-12 h-12 sm:w-14 sm:h-14 bg-white border-2 border-gray-900 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 z-50 shadow-lg"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default BlogR;
