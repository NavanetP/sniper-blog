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
  Database,
  Layers,
  Cpu,
  Users,
  BarChart2,
  GitBranch,
  Workflow,
  Boxes,
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
          animation: `marqueeS${reverse ? "Rev" : ""} 28s linear infinite`,
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
        @keyframes marqueeS    { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marqueeSRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
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
// ✦ NUMBERED STEP CARD (dark)
// ========================================================
const StepCard = ({
  number,
  title,
  description,
  index,
  inView,
}: {
  number: string;
  title: string;
  description: string;
  index: number;
  inView: boolean;
}) => (
  <motion.div
    className="border border-gray-700 rounded-2xl p-6 sm:p-8 bg-gray-900 hover:border-gray-500 transition-colors duration-300"
    initial={{ opacity: 0, y: 40 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease, delay: 0.1 + index * 0.1 }}
  >
    <span className="text-gray-600 font-mono text-xs mb-4 block">{number}</span>
    <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 leading-snug">{title}</h4>
    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{description}</p>
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
// MAIN BLOG-S PAGE
// ========================================================
const BlogS = () => {
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
        "AI in Engineering Data Management: How Autodesk Vault Is Changing Manufacturing Workflows",
      description:
        "Discover how Autodesk Vault 2027.1 and AI-powered PDM are transforming engineering data management for manufacturing teams — faster access, reduced repetitive work and connected workflows.",
      image:
        "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1600&q=80",
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
          "https://sniperindia.com/blog/ai-engineering-data-management-autodesk-vault-manufacturing",
      },
      keywords:
        "Autodesk Vault, engineering data management, PDM, product data management, Autodesk Vault 2027.1, AI PDM, manufacturing workflows, CAD data management, Autodesk Vault India",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ───────────────────────────────────────────────
  useSEO({
    title:
      "AI in Engineering Data Management: How Autodesk Vault Is Changing Manufacturing Workflows",
    description:
      "Discover how Autodesk Vault 2027.1 and AI-powered PDM are transforming engineering data management for manufacturing teams — faster access, reduced repetitive work and connected workflows.",
    keywords:
      "Autodesk Vault, engineering data management, PDM, product data management, Autodesk Vault 2027.1, AI PDM, manufacturing workflows, CAD data management, Autodesk Vault India, AI engineering data management, Autodesk Vault Professional, Autodesk Assistant, Fusion Manage, Autodesk Forma, PDM software India, manufacturing data management",
    ogTitle:
      "AI in Engineering Data Management: How Autodesk Vault Is Changing Manufacturing Workflows",
    ogDescription:
      "Discover how Autodesk Vault 2027.1 and AI-powered PDM are transforming engineering data management for manufacturing teams — faster access, reduced repetitive work and connected workflows.",
    ogImage:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1600&q=80",
    ogUrl:
      "https://sniperindia.com/blog/ai-engineering-data-management-autodesk-vault-manufacturing",
    canonicalUrl:
      "https://sniperindia.com/blog/ai-engineering-data-management-autodesk-vault-manufacturing",
    twitterTitle:
      "AI in Engineering Data Management: How Autodesk Vault Is Changing Manufacturing Workflows",
    twitterDescription:
      "How Autodesk Vault 2027.1 brings AI, natural-language interaction and connected workflows to engineering data management.",
    twitterImage:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1600&q=80",
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
  const heroRef       = useRef(null);
  const tocRef        = useRef(null);
  const whyRef        = useRef(null);
  const aiRef         = useRef(null);
  const benefitsRef   = useRef(null);
  const stepsRef      = useRef(null);
  const flowRef       = useRef(null);

  const heroInView     = useInView(heroRef,     { once: true, margin: "-60px" });
  const tocInView      = useInView(tocRef,      { once: true, margin: "-60px" });
  const whyInView      = useInView(whyRef,      { once: true, margin: "-60px" });
  const aiInView       = useInView(aiRef,       { once: true, margin: "-60px" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-60px" });
  const stepsInView    = useInView(stepsRef,    { once: true, margin: "-60px" });
  const flowInView     = useInView(flowRef,     { once: true, margin: "-60px" });

  // ── Data ──────────────────────────────────────────────
  const tocItems = [
    "Why Engineering Data Management Matters",
    "How AI Is Changing Engineering Data Management",
    "Autodesk Vault 2027.1: Bringing AI Into Engineering Workflows",
    "4 Ways AI-Powered PDM Can Improve Manufacturing",
    "From PDM to Connected Manufacturing",
    "How Sniper India Helps Organizations Modernize Autodesk Workflows",
    "The Future of Engineering Data Management Is Intelligent",
  ];

  const engineeringFiles = [
    "3D CAD models",
    "2D drawings",
    "Bills of materials",
    "Engineering specifications",
    "Product revisions",
    "Manufacturing documentation",
  ];

  const aiCapabilities = [
    "Find engineering information faster",
    "Reduce repetitive data-management tasks",
    "Improve access to product information",
    "Support better collaboration across teams",
    "Generate useful reports and insights",
  ];

  const vault2027Features = [
    "Expanded Vault Thin Client capabilities",
    "Autodesk Assistant integration for natural-language interaction",
    "Connectivity with Autodesk Fusion Manage",
    "Connectivity with Autodesk Forma",
    "Improved supported task automation",
    "Enhanced information discovery workflows",
  ];

  const aiSteps = [
    {
      number: "01",
      title: "Faster Access to Engineering Data",
      description:
        "Engineers can spend significant time searching for the right drawing, revision, or product information. AI-assisted interaction makes information easier to locate — especially in organizations with large engineering repositories.",
    },
    {
      number: "02",
      title: "Reduced Repetitive Work",
      description:
        "AI-assisted workflows can help automate supported tasks such as report generation, data searches and routine product data management activities — reducing manual effort while maintaining established engineering processes.",
    },
    {
      number: "03",
      title: "Better Collaboration",
      description:
        "Engineering information is used by design, manufacturing, procurement, quality and project management teams. A centralized PDM environment with connected Autodesk platform integrations extends information across broader workflows.",
    },
    {
      number: "04",
      title: "Improved Data-Driven Decisions",
      description:
        "AI-assisted reporting and visualization help teams understand product and process information more quickly, identify relevant trends, and build a stronger foundation for digital transformation.",
    },
  ];

  const sniperServices = [
    "Autodesk software consultation",
    "Autodesk Vault implementation",
    "PDM and CAD data management",
    "Workflow optimization",
    "Software deployment and upgrades",
    "User training",
    "Technical support",
    "IT infrastructure optimization",
  ];

  const relatedPosts = [
    {
      title: "How BIM and Digital Twins Are Redefining Project Delivery and Asset Management in AEC",
      category: "AEC & BIM",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      readTime: "14 min read",
      href: "/blog/bim-digital-twins-aec-redefined",
    },
    {
      title: "Why AI Is Reshaping Enterprise Server and Storage Infrastructure",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      readTime: "8 min read",
      href: "/blog/why-ai-is-reshaping-enterprise-server-and-storage-infrastructure",
    },
    {
      title: "How Real-Time 3D and XR Are Transforming Automotive Product Development",
      category: "Automotive XR",
      image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&q=80",
      readTime: "10 min read",
      href: "/blog/how-real-time-3d-and-xr-are-transforming-automotive-product-development-unity",
    },
  ];

  const marqueeItems1 = [
    "Sniper Systems Blog",
    "Autodesk Vault",
    "Engineering Data Management",
    "AI PDM",
    "Manufacturing Workflows",
    "Autodesk Partner",
  ];
  const marqueeItems2 = [
    "CAD Data Management",
    "Vault 2027.1",
    "Autodesk Assistant",
    "Fusion Manage",
    "Product Data Management",
    "Digital Manufacturing",
    "Connected Workflows",
  ];
  const marqueeItems3 = [
    "Stay Informed",
    "Technology Insights",
    "Sniper Systems",
    "Autodesk Gold Partner",
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
              <MetaPill icon={Tag} label="Engineering Data Management" />
              <MetaPill icon={Calendar} label="August 13, 2026" />
              <MetaPill icon={Clock} label="11 min read" />
              <MetaPill icon={User} label="Sniper Systems" />
            </motion.div>

            {/* Headline */}
            <h1
              ref={heroHeadingRef}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight"
              aria-label="AI in Engineering Data Management: How Autodesk Vault Is Changing Manufacturing Workflows"
            >
              {["AI", "in", "Engineering"].map((word, i) => (
                <span key={i} className="hero-word inline-block opacity-0 mr-[0.22em]">
                  {word}
                </span>
              ))}
              <br className="hidden sm:block" />
              {["Data", "Management"].map((word, i) => (
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
              How Autodesk Vault Is Changing Manufacturing Workflows
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 1.7 }}
            >
              Manufacturing companies are generating more engineering data than ever. AI is
              now changing how engineers interact with that information — moving beyond design
              and analytics into everyday workflows that help teams find data faster, reduce
              repetitive work and build more connected product development environments.
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
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1600&q=80"
                alt="AI-powered engineering data management — Autodesk Vault manufacturing workflows"
                className="w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 z-10">
                  <div className="bg-black/50 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                    <span className="text-[10px] sm:text-sm font-medium uppercase tracking-widest">
                      AUTODESK VAULT · AI PDM
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

      {/* ── Section 1: Why EDM Matters ───────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Why Engineering Data<br />Management Matters
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-16">
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION ONE<br />THE ENGINEERING DATA CHALLENGE
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Engineering teams work with thousands of files throughout the product
                development lifecycle. These may include:
              </p>
              <div ref={whyRef}>
                <CheckRow items={engineeringFiles} inView={whyInView} />
              </div>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                When this information is stored across disconnected systems or managed
                manually, organizations can face version-control problems, duplicated files,
                communication gaps and unnecessary rework.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                A <strong>Product Data Management (PDM)</strong> solution helps organizations
                control engineering information, manage revisions and provide teams with
                access to the correct product data. Autodesk Vault is designed to help
                engineering and manufacturing teams manage CAD data, revisions, workflows
                and product information in a controlled environment.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                As organizations generate larger volumes of engineering data, combining
                structured PDM with AI-assisted workflows can help teams work more efficiently.
              </p>
            </FadeUp>
          </div>

          {/* Mid image */}
          <FadeUp delay={0.1} className="mb-10 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1581093196277-9f608bb3b511?w=1600&q=80"
                alt="Manufacturing engineering team working with CAD data and product documentation"
                className="w-full h-full"
              />
            </div>
          </FadeUp>

          {/* Section 2 — AI in EDM */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  How AI Is Changing<br />Engineering Data<br />Management
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION TWO<br />AI-POWERED PDM
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  One of the biggest advantages of AI is the ability to make complex
                  information easier to access. Traditional engineering data management often
                  requires users to navigate multiple menus, filters, folders and workflows.
                  AI introduces a more natural way of interacting with information.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Instead of manually searching through systems, users can increasingly use{" "}
                  <strong>natural-language interactions</strong> to find information,
                  understand data and perform supported tasks.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  AI-powered engineering data management can support organizations by helping
                  them:
                </p>
                <div ref={aiRef}>
                  <CheckRow items={aiCapabilities} inView={aiInView} />
                </div>
                <div className="border-l-4 border-gray-900 pl-6 py-2">
                  <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed">
                    The objective isn't to replace engineers. It is to{" "}
                    <strong>help engineers spend less time managing information and more
                    time creating value</strong>.
                  </p>
                </div>
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
              "PDM is no longer just about storing and controlling engineering files. It is becoming part of a more connected and intelligent digital workflow."
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-gray-400 text-sm sm:text-base uppercase tracking-widest font-medium">
              Sniper Systems &amp; Solutions — Autodesk Gold Partner
            </p>
          </FadeUp>
        </div>
      </FadeUp>

      {/* ── Section 3: Vault 2027.1 ──────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Autodesk Vault 2027.1:<br />AI in Engineering<br />Workflows
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-14 sm:mb-20">
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION THREE<br />VAULT 2027.1 FEATURES
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Autodesk Vault 2027.1 is an important development in this transition. The
                latest update expands the capabilities of the Vault Thin Client and
                introduces <strong>Autodesk Assistant</strong> integration for Vault
                Professional users.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Autodesk Assistant enables users to interact with Vault using
                natural-language prompts and can assist with supported tasks and information
                discovery. This is particularly useful for organizations managing large
                engineering data environments where users frequently need to locate
                information, generate reports or perform routine data-management activities.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Vault 2027.1 also expands connectivity with{" "}
                <strong>Autodesk Fusion Manage</strong> and{" "}
                <strong>Autodesk Forma</strong>, helping organizations connect engineering
                data with broader product development and project workflows.
              </p>
            </FadeUp>
          </div>

          {/* Vault features grid */}
          <FadeUp delay={0.1} className="mb-14 sm:mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {vault2027Features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.05 + i * 0.06 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-gray-500 mb-3" />
                  <p className="text-sm sm:text-base text-gray-700 font-medium leading-snug">{feature}</p>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          {/* Mid image */}
          <FadeUp delay={0.1} className="mb-10 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80"
                alt="Autodesk Vault engineering workflow — connected product data management"
                className="w-full h-full"
              />
            </div>
          </FadeUp>

          {/* Section 4 — 4 Ways */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  4 Ways AI-Powered PDM<br />Can Improve<br />Manufacturing
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Steps (dark panel) ─────────────────────────────────────────── */}
      <FadeUp className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-6 my-8 sm:my-12">
        <div className="max-w-4xl mx-auto" ref={stepsRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {aiSteps.map((step, i) => (
              <StepCard
                key={i}
                number={step.number}
                title={step.title}
                description={step.description}
                index={i}
                inView={stepsInView}
              />
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ── Section 5: Connected Manufacturing ──────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                From PDM to<br />Connected<br />Manufacturing
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-14 sm:mb-20">
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION FIVE<br />CONNECTED PRODUCT LIFECYCLE
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                The future of manufacturing data management is not simply about storing CAD
                files. Organizations are increasingly looking to connect information across
                the product lifecycle — from design and engineering through manufacturing
                and project management.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Autodesk's continued development of Vault, along with its connectivity with
                platforms such as Fusion Manage and Forma, reflects this broader movement
                toward connected workflows. The goal is to create a more continuous flow
                of information:
              </p>
            </FadeUp>
          </div>

          {/* Flow diagram */}
          <div ref={flowRef} className="mb-14 sm:mb-20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 flex-wrap">
              {[
                { label: "Design", icon: Layers },
                { label: "Engineering", icon: GitBranch },
                { label: "Product Data", icon: Database },
                { label: "Manufacturing", icon: Boxes },
                { label: "Business Operations", icon: BarChart2 },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <motion.div
                    className="flex flex-col items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-5 sm:px-6 py-4 min-w-[100px]"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={flowInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.1 }}
                  >
                    <step.icon className="w-5 h-5 text-gray-500" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 text-center">{step.label}</span>
                  </motion.div>
                  {i < 4 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={flowInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.1 }}
                    >
                      <ArrowRight className="w-5 h-5 text-gray-400 hidden sm:block" />
                      <div className="w-px h-4 bg-gray-300 block sm:hidden mx-auto" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            <FadeUp delay={0.3} className="mt-8 text-center">
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                When these processes are better connected, organizations can reduce manual
                data transfers, improve visibility and make information available to the
                right teams at the right time.
              </p>
            </FadeUp>
          </div>

          {/* Section 6 — Sniper India */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  How Sniper India<br />Modernizes Autodesk<br />Workflows
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION SIX<br />SNIPER INDIA · AUTODESK GOLD PARTNER
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Technology implementation is only one part of a successful digital
                  transformation strategy. Organizations also need the right infrastructure,
                  workflows, deployment strategy and technical expertise.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  <strong>Sniper Systems &amp; Solutions</strong>, an Autodesk Gold Partner,
                  helps organizations adopt Autodesk technologies across engineering,
                  manufacturing, AEC and other industries. Sniper can support organizations
                  with:
                </p>
                <div ref={benefitsRef}>
                  <CheckRow items={sniperServices} inView={benefitsInView} />
                </div>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  By combining Autodesk solutions with enterprise IT expertise, Sniper helps
                  organizations build{" "}
                  <strong>secure, scalable and connected engineering environments</strong>{" "}
                  that support long-term digital transformation.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { label: "Autodesk Solutions", href: "/partners/autodesk" },
                    { label: "IT Infrastructure", href: "/solutions/it-infrastructure" },
                    { label: "Managed IT Services", href: "/solutions/managed-it-services" },
                    { label: "Contact Us", href: "/contact" },
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

          {/* Benefits grid */}
          <div ref={benefitsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-16">
            {[
              {
                icon: Database,
                title: "Controlled Engineering Data",
                description:
                  "Centralized PDM gives teams a single source of truth for CAD files, revisions, BOMs and product documentation — eliminating version-control issues.",
              },
              {
                icon: Cpu,
                title: "AI-Assisted Workflows",
                description:
                  "Autodesk Assistant enables natural-language interaction with Vault, making information discovery and routine tasks faster and more accessible.",
              },
              {
                icon: Users,
                title: "Cross-Team Collaboration",
                description:
                  "Design, manufacturing, quality and procurement teams all rely on accurate product information. Connected Autodesk platforms extend that data across the organization.",
              },
              {
                icon: Workflow,
                title: "Scalable Digital Infrastructure",
                description:
                  "Sniper combines Autodesk expertise with enterprise IT capabilities to build environments that scale as engineering operations grow.",
              },
            ].map((b, i) => (
              <BenefitCard key={i} {...b} index={i} inView={benefitsInView} />
            ))}
          </div>

          {/* Final image */}
          <FadeUp delay={0.1} className="mb-10 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=1600&q=80"
                alt="Modern manufacturing facility with digital engineering workflows"
                className="w-full h-full"
              />
            </div>
          </FadeUp>

          {/* Section 7 — Future */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  The Future of<br />Engineering Data<br />Management Is Intelligent
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION SEVEN<br />INTELLIGENT MANUFACTURING DATA
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  AI is changing how manufacturers design products, manage information and
                  collaborate across teams. The evolution of Autodesk Vault demonstrates
                  how <strong>AI, PDM and connected platforms</strong> are coming together
                  to create smarter engineering workflows.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  For manufacturers, the opportunity is not simply to adopt another AI tool.
                  It is to use AI to make engineering data easier to access, reduce repetitive
                  work, improve collaboration and create a stronger foundation for digital
                  manufacturing.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Organizations that modernize their engineering data management strategy
                  today will be better positioned to support the next generation of
                  connected manufacturing.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Closing summary block */}
          <FadeUp className="bg-gray-950 text-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 mt-4 sm:mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {[
                { label: "Access", value: "Faster information discovery with AI-assisted interaction" },
                { label: "Efficiency", value: "Less repetitive work, more time for engineering" },
                { label: "Integration", value: "Connected data across design, manufacturing and operations" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="border-b border-gray-700 pb-4 sm:pb-6 sm:border-b-0 sm:border-r sm:pr-6 last:border-r-0 last:pr-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                >
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-2">{item.label}</p>
                  <p className="text-base sm:text-lg font-medium text-white leading-snug">{item.value}</p>
                </motion.div>
              ))}
            </div>
            <FadeUp delay={0.2}>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                Autodesk Vault 2027.1 represents a meaningful step toward{" "}
                <strong className="text-white">intelligent, connected engineering data management</strong>.
                Organizations that invest in the right PDM strategy and implementation
                partner will have a significant advantage as digital manufacturing continues
                to evolve.
              </p>
            </FadeUp>
          </FadeUp>

        </div>
      </section>

      <MarqueeTicker items={marqueeItems3} />

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
              aria-label="Ready to modernize your engineering data management?"
            >
              {["Ready", "to", "modernize", "your", "workflows?"].map((word, i) => (
                <span key={i} className="cta-word inline-block opacity-0 mr-[0.22em] last:mr-0">
                  {word}
                  {word === "modernize" && <br className="hidden sm:block" />}
                </span>
              ))}
            </h2>
          </div>
          <FadeUp delay={0.3}>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Talk to our team about Autodesk Vault implementation, PDM strategy and
              AI-powered engineering data management for your organization.
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

export default BlogS;
