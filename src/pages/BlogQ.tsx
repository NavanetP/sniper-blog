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
  BarChart2,
  Shield,
  Recycle,
  HardDrive,
  Layers,
  Truck,
  FileText,
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
          animation: `marqueeQ${reverse ? "Rev" : ""} 28s linear infinite`,
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
        @keyframes marqueeQ    { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marqueeQRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
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
// ✦ ANIMATED COUNTER
// ========================================================
const AnimatedCounter = ({ target, suffix = "" }: { target: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);
  const numericMatch = target.match(/[\d.]+/);
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : null;
  const prefix = numericValue !== null ? target.replace(/[\d.]+.*/, "") : "";

  useEffect(() => {
    const el = ref.current;
    if (!el || numericValue === null) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericValue,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => {
            if (el) el.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
          },
        });
      },
    });
    return () => st.kill();
  }, [numericValue]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
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
  post: { title: string; category: string; image: string; readTime: string };
}) => (
  <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 h-full">
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
  </div>
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
  }, [inView]);
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
// ✦ BENEFIT CARD
// ========================================================
const BenefitCard = ({
  icon: Icon, title, description, index, inView,
}: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
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
// ✦ PROCESS STEP ROW (dark panel)
// ========================================================
const ProcessRow = ({
  icon: Icon, step, items, index, inView,
}: {
  icon: React.ElementType; step: string; items: string[]; index: number; inView: boolean;
}) => (
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-4 sm:gap-8 py-6 sm:py-8 border-b border-gray-700 last:border-b-0 items-start"
    initial={{ opacity: 0, x: -24 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.55, ease, delay: 0.1 + index * 0.07 }}
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-gray-300" />
      </div>
      <span className="text-sm font-semibold text-gray-200 uppercase tracking-wider">{step}</span>
    </div>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

// ========================================================
// MAIN BLOG-Q PAGE
// ========================================================
const BlogQ = () => {
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

  // ── SEO ───────────────────────────────────────────────
  useSEO({
    title: "Don't Just Dispose: How IT Asset Buyback Helps Businesses Recover Value and Protect Data",
    description:
      "Discover how IT Asset Buyback and ITAD services help Indian enterprises recover residual value from retired equipment, ensure secure data wiping, and manage e-waste responsibly.",
    keywords:
      "IT asset buyback India, ITAD India, IT asset disposal India, secure data wiping, e-waste management India, IT asset recovery, laptop buyback India, server disposal India, IT lifecycle management, Sniper India ITAD",
    ogTitle: "Don't Just Dispose: How IT Asset Buyback Helps Businesses Recover Value and Protect Data",
    ogDescription:
      "Retired IT assets aren't just old equipment — they hold financial value, data-security risks, and e-waste responsibilities. Learn how a structured IT Asset Buyback programme addresses all three.",
    ogImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    ogUrl:
      "https://sniperindia.com/blog/it-asset-buyback-recover-value-protect-data",
    canonicalUrl:
      "https://sniperindia.com/blog/it-asset-buyback-recover-value-protect-data",
    twitterTitle:
      "Don't Just Dispose: How IT Asset Buyback Helps Businesses Recover Value and Protect Data",
    twitterDescription:
      "IT Asset Buyback and ITAD: recover value, protect data, and dispose responsibly. A guide for enterprises in India.",
    twitterImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
  });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setShowScrollTop(window.scrollY > 300); ticking = false; });
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
        scale: 1, borderRadius: "1.5rem", ease: "none",
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
  const statsRef = useRef(null);
  const benefitsRef = useRef(null);
  const processRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const tocInView = useInView(tocRef, { once: true, margin: "-60px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-60px" });
  const processInView = useInView(processRef, { once: true, margin: "-60px" });

  // ── Data ──────────────────────────────────────────────
  const tocItems = [
    "Retired IT Assets Are More Than Just Old Equipment",
    "Why IT Asset Buyback Matters for Businesses",
    "Data Security Should Come Before Disposal",
    "From Hardware Refresh to Value Recovery",
    "IT Asset Buyback and Responsible E-Waste Management",
    "Which IT Assets Can Businesses Sell or Buy Back?",
    "How to Choose an IT Asset Buyback Partner",
    "How Sniper India Helps Businesses Recover Value From IT Assets",
  ];

  const benefits = [
    {
      icon: BarChart2,
      title: "Recover Residual Value",
      description:
        "Retired laptops, desktops, servers and networking equipment may still hold resale or refurbishment value — a structured buyback programme turns end-of-life assets into recovered capital.",
    },
    {
      icon: Shield,
      title: "Secure Data Sanitization",
      description:
        "Simply deleting files is not enough. A professional ITAD process includes appropriate data wiping and documentation to ensure business data does not leave with the hardware.",
    },
    {
      icon: Recycle,
      title: "Responsible E-Waste Disposal",
      description:
        "Assets that cannot be resold enter a responsible recycling process, helping organizations comply with India's E-Waste (Management) Rules, 2022 and their EPR obligations.",
    },
    {
      icon: Layers,
      title: "Simplified Asset Lifecycle",
      description:
        "From identification and evaluation through secure collection and final disposition, a structured ITAD process removes the operational burden of managing retired technology internally.",
    },
  ];

  const processSteps = [
    {
      icon: HardDrive,
      step: "Asset Identification",
      items: [
        "Catalogue retired laptops, desktops, servers, storage, networking and mobile devices",
        "Assess equipment condition and specifications to determine disposition pathway",
      ],
    },
    {
      icon: BarChart2,
      step: "Evaluation & Valuation",
      items: [
        "Evaluate each asset against current market conditions and resale benchmarks",
        "Receive a transparent quotation before any collection takes place",
      ],
    },
    {
      icon: Truck,
      step: "Secure Collection",
      items: [
        "Controlled pickup and logistics with chain-of-custody documentation",
        "Supports multi-location enterprise refreshes across offices and data centres",
      ],
    },
    {
      icon: Shield,
      step: "Data Wiping",
      items: [
        "Appropriate data sanitization performed on all storage-bearing devices",
        "Certificates of data destruction provided for compliance and audit purposes",
      ],
    },
    {
      icon: CheckCircle2,
      step: "Buyback & Reuse",
      items: [
        "Payment processed for assets with residual market value",
        "Equipment directed towards reuse, refurbishment, resale or responsible recycling",
      ],
    },
    {
      icon: FileText,
      step: "Documentation",
      items: [
        "Complete records covering asset movement, data sanitization and transactions",
        "Supports internal audit, regulatory compliance and ESG reporting requirements",
      ],
    },
  ];

  const assetCategories = [
    "Laptops and notebooks",
    "Desktops and workstations",
    "Servers",
    "Storage equipment",
    "Networking equipment",
    "Monitors",
    "Mobile devices",
    "Printers, cables and accessories",
  ];

  const relatedPosts = [
    {
      title: "Why AI Is Reshaping Enterprise Server and Storage Infrastructure",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      readTime: "8 min read",
    },
    {
      title: "How Microsoft Intune Is Helping Enterprises Secure Hybrid Work and Simplify Endpoint Management",
      category: "Endpoint Security",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      readTime: "9 min read",
    },
    {
      title: "The Future of Business Transformation: Cloud Solutions for Indian Enterprises",
      category: "Cloud Solutions",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      readTime: "15 min read",
    },
  ];

  const marqueeItems1 = [
    "Sniper Systems Blog",
    "IT Asset Buyback",
    "ITAD India",
    "Secure Data Wiping",
    "E-Waste Management",
    "IT Lifecycle",
  ];
  const marqueeItems2 = [
    "Laptop Buyback",
    "Server Disposal",
    "Data Sanitization",
    "IT Asset Recovery",
    "EPR Compliance",
    "Responsible Recycling",
    "Enterprise IT",
  ];
  const marqueeItems3 = [
    "Stay Informed",
    "Technology Insights",
    "Sniper Systems",
    "IT Asset Disposition",
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
            <motion.div
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.9 }}
            >
              <MetaPill icon={Tag} label="IT Asset Management" />
              <MetaPill icon={Calendar} label="August 13, 2026" />
              <MetaPill icon={Clock} label="9 min read" />
              <MetaPill icon={User} label="Sniper Systems" />
            </motion.div>

            <h1
              ref={heroHeadingRef}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight"
              aria-label="Don't Just Dispose: IT Asset Buyback"
            >
              {["Don't", "Just", "Dispose"].map((word, i) => (
                <span key={i} className="hero-word inline-block opacity-0 mr-[0.22em] last:mr-0">
                  {word}
                  {word === "Dispose" && <br className="hidden sm:block" />}
                </span>
              ))}
            </h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 1.55 }}
            >
              How IT Asset Buyback Helps Businesses Recover Value and Protect Data
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 1.7 }}
            >
              For many organisations, old equipment ends up sitting in storage or being sent for
              disposal. But retired IT assets represent financial value, data-security risks and
              e-waste responsibilities. IT Asset Buyback and ITAD are practical ways to address
              all three — at the same time.
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
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80"
                alt="IT asset buyback and disposal — enterprise hardware lifecycle management"
                className="w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 z-10">
                  <div className="bg-black/50 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                    <span className="text-[10px] sm:text-sm font-medium uppercase tracking-widest">
                      IT ASSET DISPOSITION
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

      {/* ── Section 1: More Than Old Equipment ───────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                More Than Just<br />Old Equipment
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-16">
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION ONE<br />THE REAL COST OF DISPOSAL
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                What happens to a company's laptops, desktops, servers and storage devices
                when they are replaced? For many organisations, old equipment ends up sitting
                in storage or being sent for disposal without a second thought.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                But retired IT assets can represent three things simultaneously: financial
                value, data-security risks and e-waste responsibilities. Treating every
                replaced device as immediate waste overlooks the residual value it may still
                carry — and creates liability if business data is not properly removed before
                the hardware leaves the organisation.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                As businesses regularly refresh their technology infrastructure, IT Asset
                Buyback and IT Asset Disposition (ITAD) are becoming practical ways to
                manage what happens after equipment reaches the end of its primary business
                use. The objective is simple: <strong>recover value, protect data, dispose
                responsibly.</strong>
              </p>
            </FadeUp>
          </div>

          {/* Mid image */}
          <FadeUp delay={0.1} className="mb-10 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=1600&q=80"
                alt="Enterprise IT hardware ready for asset buyback evaluation"
                className="w-full h-full"
              />
            </div>
          </FadeUp>

          {/* Section 2 — Why It Matters */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Why IT Asset Buyback<br />Matters for Businesses
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-14">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION TWO<br />RESIDUAL VALUE
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Retired technology isn't necessarily worthless. A laptop that is no longer
                  suitable for one employee may still have resale or refurbishment value.
                  The same applies to desktops, workstations, servers, storage and networking
                  equipment.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  A structured IT asset buyback programme can help organisations recover
                  residual value from retired equipment, reduce the burden of storing unused
                  assets, simplify hardware refresh programmes, and improve IT asset lifecycle
                  management. Instead of treating every retired device as waste, businesses
                  can determine whether an asset can be reused, refurbished, resold or
                  responsibly recycled.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Section 3 — Data Security */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Data Security Comes<br />Before Disposal
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION THREE<br />PROTECTING BUSINESS DATA
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  For enterprise IT teams, the biggest concern often isn't the hardware itself
                  — it's the data stored on it. Retired laptops, desktops, servers and storage
                  devices may contain business documents, customer information, employee data,
                  credentials or intellectual property.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Simply deleting files or formatting a hard drive should not be treated as a
                  complete data disposal strategy. Secure data wiping should be an integral
                  part of professional IT asset disposal — with controlled asset handling,
                  appropriate data sanitization and documentation providing visibility
                  throughout the process.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  The principle is straightforward: the hardware may leave the organisation,
                  but data security cannot be overlooked when it does.
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
              "The hardware may leave the organisation — but data security cannot be overlooked when it does."
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-gray-400 text-sm sm:text-base uppercase tracking-widest font-medium">
              Sniper Systems &amp; Solutions — IT Asset Disposition
            </p>
          </FadeUp>
        </div>
      </FadeUp>

      {/* ── Disposition Process ──────────────────────────────────────────── */}
      <FadeUp className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-6 my-8 sm:my-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <FadeUp>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-white">
                From Hardware Refresh<br />to Value Recovery
              </h2>
            </FadeUp>
          </div>
          <div ref={processRef}>
            {processSteps.map((s, i) => (
              <ProcessRow
                key={i}
                icon={s.icon}
                step={s.step}
                items={s.items}
                index={i}
                inView={processInView}
              />
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ── Key Benefits Grid ────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Key Business<br />Benefits
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div
            ref={benefitsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-16 sm:mb-20"
          >
            {benefits.map((b, i) => (
              <BenefitCard key={i} {...b} index={i} inView={benefitsInView} />
            ))}
          </div>

          {/* Stats */}
          <div ref={statsRef}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 text-center">
              {[
                { number: "70", suffix: "%", label: "Of retired IT assets still hold residual market value when professionally evaluated" },
                { number: "3", suffix: "×", label: "More likely for data breaches to occur without a structured data sanitization process" },
                { number: "50", suffix: "M+", label: "Tonnes of e-waste generated globally each year — responsible disposal is a business responsibility" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 40 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-2 font-semibold">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base px-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── E-Waste & Asset Categories ───────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* E-Waste section */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Buyback and Responsible<br />E-Waste Management
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-14">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION FOUR<br />E-WASTE COMPLIANCE
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Not every retired IT asset can be resold or reused. Some equipment has
                  reached the end of its useful life and needs to enter an appropriate
                  recycling process. India's <strong>E-Waste (Management) Rules, 2022</strong>{" "}
                  provide a regulatory framework for managing specified electrical and
                  electronic equipment, including an Extended Producer Responsibility (EPR)
                  framework.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  A responsible ITAD approach considers both pathways simultaneously: value
                  recovery where possible, and responsible recycling where necessary. This
                  makes IT Asset Disposition more than a disposal exercise — it becomes part
                  of a broader technology lifecycle and ESG strategy.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Asset categories */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Which Assets Can<br />Be Bought Back?
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION FIVE<br />ELIGIBLE EQUIPMENT
                </h3>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed mb-6">
                  Corporate IT environments include a wide range of equipment. Depending on
                  condition and market value, businesses may be able to recover value from:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {assetCategories.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </div>

          {/* Final image */}
          <FadeUp delay={0.1} className="mb-10 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1542903660-eedba2cda473?w=1600&q=80"
                alt="IT asset buyback — servers and enterprise hardware being evaluated"
                className="w-full h-full"
              />
            </div>
          </FadeUp>

          {/* Partner selection criteria */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Choosing the Right<br />Buyback Partner
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION SIX<br />WHAT TO LOOK FOR
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Price matters, but it shouldn't be the only factor. Businesses should look
                  for a partner that provides a defined process for securely sanitizing data,
                  clear asset valuation based on equipment condition and market value, controlled
                  pickup and transportation, and appropriate documentation throughout.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  For organisations managing sensitive business information or large volumes of
                  equipment across multiple locations, enterprise-level support becomes
                  particularly important. Clear pathways for assets that can be refurbished,
                  resold or recycled ensure that the entire disposition process is handled
                  through a structured and accountable channel.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Sniper India section */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  How Sniper India Helps<br />Recover IT Asset Value
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION SEVEN<br />SNIPER INDIA ITAD
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Sniper Systems &amp; Solutions provides IT Asset Buyback and IT Asset
                  Disposition solutions to help organisations manage retired technology through
                  a structured process — covering asset evaluation, valuation and quotation,
                  secure pickup and logistics, data wiping, payment processing and documentation.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  This is particularly relevant for businesses undergoing laptop refresh
                  programmes, infrastructure upgrades, or enterprise technology replacement
                  cycles. Whether a single office or a multi-location rollout, the goal remains
                  consistent: recover value, protect data, and ensure responsible disposal.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Old IT equipment doesn't have to become a storage problem or an immediate
                  e-waste liability. With the right process in place, businesses can identify
                  assets that still hold value, securely remove business data, and ensure
                  end-of-life equipment is handled responsibly.
                </p>
              </FadeUp>
            </div>
          </div>
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
              aria-label="Ready to recover value from your retired IT assets?"
            >
              {["Ready", "to", "recover", "your", "asset value?"].map((word, i) => (
                <span key={i} className="cta-word inline-block opacity-0 mr-[0.22em] last:mr-0">
                  {word}
                  {word === "recover" && <br className="hidden sm:block" />}
                </span>
              ))}
            </h2>
          </div>
          <FadeUp delay={0.3}>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Talk to our team about IT Asset Buyback, secure data wiping and responsible
              disposal solutions for your organisation.
            </p>
          </FadeUp>
          <FadeUp delay={0.45}>
            <a
              href="https://sniperindia.com/contact"
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

export default BlogQ;
