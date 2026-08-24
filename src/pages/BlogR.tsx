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
  Cpu,
  Layers,
  Wrench,
  Radio,
  Brain,
  MonitorPlay,
  Globe,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.16, 1, 0.3, 1] as const;

// ── White Screen Transition ──────────────────────────────
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

// ── Fade-Up Wrapper ──────────────────────────────────────
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

// ── Marquee Ticker ───────────────────────────────────────
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

// ── Parallax Image ───────────────────────────────────────
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

// ── Animated Counter ─────────────────────────────────────
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

// ── Meta Pill ────────────────────────────────────────────
const MetaPill = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium">
    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
    <span>{label}</span>
  </div>
);

// ── Related Post Card ────────────────────────────────────
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

// ── Table of Contents Item ───────────────────────────────
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

// ── Benefit Card ─────────────────────────────────────────
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

// ── Foundation Card (dark) ───────────────────────────────
const FoundationCard = ({
  icon: Icon, title, description, index, inView,
}: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
}) => (
  <motion.div
    className="border border-gray-700 rounded-2xl p-6 sm:p-8 bg-gray-900 hover:bg-gray-800 transition-colors duration-300"
    initial={{ opacity: 0, y: 40 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease, delay: 0.1 + index * 0.09 }}
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-4 sm:mb-5">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
    </div>
    <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 leading-snug">{title}</h4>
    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

// ── Flow Step ────────────────────────────────────────────
const FlowStep = ({
  icon: Icon, label, index, total, inView,
}: {
  icon: React.ElementType; label: string; index: number; total: number; inView: boolean;
}) => (
  <motion.div
    className="flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.55, ease, delay: 0.15 + index * 0.1 }}
  >
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center mb-3">
      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-300" />
    </div>
    <span className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider leading-tight px-1">
      {label}
    </span>
    {index < total - 1 && (
      <div className="hidden sm:flex absolute translate-x-[4.5rem] top-7 items-center">
        <ArrowRight className="w-4 h-4 text-gray-600" />
      </div>
    )}
  </motion.div>
);

// ========================================================
// MAIN BLOG-R PAGE
// ========================================================
const BlogR = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);

  // ── Geo meta tags ────────────────────────────────────
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

  // ── SEO ─────────────────────────────────────────────
  useSEO({
    title: "Digital Twins in Manufacturing: How AI and Real-Time 3D Are Creating the Intelligent Factory",
    description:
      "Discover how the next generation of industrial digital twins connects live machine data, AI, real-time 3D and operational knowledge to build the intelligent factory.",
    keywords:
      "digital twins manufacturing, industrial digital twin, AI manufacturing India, intelligent factory, Machine Information Systems MIS, predictive maintenance digital twin, Unity industrial, smart factory India, real-time 3D manufacturing, Sniper India manufacturing",
    ogTitle: "Digital Twins in Manufacturing: How AI and Real-Time 3D Are Creating the Intelligent Factory",
    ogDescription:
      "Beyond visualization — discover how AI-powered digital twins are connecting machine data, documentation, 3D context and operational knowledge to transform modern manufacturing.",
    ogImage:
      "https://www.advancedtech.com/wp-content/uploads/2024/09/Facility-Condition-Assessments_Image-1_1200x628.jpg",
    ogUrl:
      "https://sniperindia.com/blog/digital-twins-manufacturing-ai-real-time-3d-intelligent-factory",
    canonicalUrl:
      "https://sniperindia.com/blog/digital-twins-manufacturing-ai-real-time-3d-intelligent-factory",
    twitterTitle:
      "Digital Twins in Manufacturing: How AI and Real-Time 3D Are Creating the Intelligent Factory",
    twitterDescription:
      "From visualization to operational intelligence — how AI-powered digital twins are reshaping manufacturing.",
    twitterImage:
      "https://www.advancedtech.com/wp-content/uploads/2024/09/Facility-Condition-Assessments_Image-1_1200x628.jpg",
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

  // ── Hero word stagger ────────────────────────────────
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

  // ── Hero image scale-on-scroll ───────────────────────
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

  // ── CTA stagger ──────────────────────────────────────
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

  // ── Related posts stagger ────────────────────────────
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

  // ── Section inView refs ──────────────────────────────
  const heroRef = useRef(null);
  const tocRef = useRef(null);
  const statsRef = useRef(null);
  const benefitsRef = useRef(null);
  const foundationsRef = useRef(null);
  const flowRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const tocInView = useInView(tocRef, { once: true, margin: "-60px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-60px" });
  const foundationsInView = useInView(foundationsRef, { once: true, margin: "-60px" });
  const flowInView = useInView(flowRef, { once: true, margin: "-60px" });

  // ── Data ─────────────────────────────────────────────
  const tocItems = [
    "Why Digital Twins Are Becoming More Important in Manufacturing",
    "How AI Is Changing Digital Twins",
    "Four Business Benefits of AI-Powered Digital Twins",
    "Faster Fault Diagnosis",
    "Better Operator Support and Knowledge Access",
    "Predictive Maintenance",
    "Scalable Remote Support",
    "Why Real-Time 3D Still Matters",
    "What Manufacturers Need Before Building an AI Digital Twin",
    "From Smart Factory to Intelligent Factory",
  ];

  const benefits = [
    {
      icon: Wrench,
      title: "Faster Fault Diagnosis",
      description:
        "An AI-powered digital twin brings machine status, technical documentation, spatial context and historical data together — helping engineers investigate issues faster and reduce time spent searching across disconnected systems.",
    },
    {
      icon: Brain,
      title: "Better Operator Support",
      description:
        "A connected digital twin makes machine-specific information easier to access by combining documentation, equipment data and 3D context — helping operators and maintenance teams work independently without always depending on specialist expertise.",
    },
    {
      icon: BarChart2,
      title: "Predictive Maintenance",
      description:
        "By monitoring machine conditions and applying AI to operational data streams, manufacturers can identify emerging issues earlier, prioritize maintenance activities, and reduce unplanned downtime before equipment fails.",
    },
    {
      icon: Globe,
      title: "Scalable Remote Support",
      description:
        "A connected digital twin gives remote teams a shared view of equipment and its operational context — enabling engineers to review machine information, access documentation, and collaborate with on-site teams across geographically distributed facilities.",
    },
  ];

  const foundations = [
    {
      icon: Layers,
      title: "Data Integration",
      description:
        "Machine signals, MES data, engineering documentation and maintenance records need to be connected through a practical integration architecture before AI can add meaningful value.",
    },
    {
      icon: CheckCircle2,
      title: "Data Quality",
      description:
        "Digital twins and AI are only as useful as the information behind them. Documentation and machine metadata must be accurate and maintained throughout the entire asset lifecycle.",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description:
        "Connected industrial environments introduce additional security considerations. OT systems, machine data, enterprise applications and AI interfaces all need appropriate, layered protection.",
    },
    {
      icon: Cpu,
      title: "Scalability",
      description:
        "The architecture should support additional machines, facilities, data sources and future AI applications without requiring a complete redesign as manufacturing operations grow.",
    },
  ];

  const flowSteps = [
    { icon: Radio, label: "Machines" },
    { icon: Cpu, label: "Sensors" },
    { icon: BarChart2, label: "Operational Data" },
    { icon: MonitorPlay, label: "Digital Twin" },
    { icon: Brain, label: "AI" },
    { icon: User, label: "Human Decision" },
  ];

  const relatedPosts = [
    {
      title: "How Real-Time 3D and XR Are Transforming Automotive Product Development",
      category: "Manufacturing & 3D",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
      readTime: "10 min read",
    },
    {
      title: "Don't Just Dispose: How IT Asset Buyback Helps Businesses Recover Value and Protect Data",
      category: "IT Asset Management",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      readTime: "9 min read",
    },
    {
      title: "How BIM and Digital Twins Are Redefining Project Delivery in AEC",
      category: "AEC & BIM",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      readTime: "14 min read",
    },
  ];

  const marqueeItems1 = [
    "Sniper Systems Blog",
    "Digital Twins",
    "Intelligent Factory",
    "AI Manufacturing",
    "Real-Time 3D",
    "Machine Information Systems",
  ];
  const marqueeItems2 = [
    "Predictive Maintenance",
    "Smart Factory",
    "Unity Industrial",
    "Fault Diagnosis",
    "Operator Support",
    "OT Security",
    "Industry 4.0",
  ];
  const marqueeItems3 = [
    "Stay Informed",
    "Technology Insights",
    "Sniper Systems",
    "Industrial AI",
    "Read More",
  ];

  return (
    <Layout>
      {showWhiteScreen && (
        <WhiteScreenTransition onComplete={() => setShowWhiteScreen(false)} />
      )}

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative bg-white pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16" ref={heroRef}>
            <motion.div
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.9 }}
            >
              <MetaPill icon={Tag} label="Digital Manufacturing" />
              <MetaPill icon={Calendar} label="August 13, 2026" />
              <MetaPill icon={Clock} label="11 min read" />
              <MetaPill icon={User} label="Sniper Systems" />
            </motion.div>

            <h1
              ref={heroHeadingRef}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight"
              aria-label="Digital Twins in Manufacturing: AI and Real-Time 3D"
            >
              {["Digital", "Twins", "in"].map((word, i) => (
                <span key={i} className="hero-word inline-block opacity-0 mr-[0.22em]">
                  {word}
                </span>
              ))}
              <br className="hidden sm:block" />
              {["Manufacturing"].map((word, i) => (
                <span key={i} className="hero-word inline-block opacity-0 mr-[0.22em]">
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
              How AI and Real-Time 3D Are Creating the Intelligent Factory
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 1.7 }}
            >
              The next generation of industrial digital twins is moving beyond visualization.
              By connecting live machine data, AI, real-time 3D and operational knowledge in
              a single environment, manufacturers can build a foundation for truly intelligent
              factory operations.
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
                src="https://www.advancedtech.com/wp-content/uploads/2024/09/Facility-Condition-Assessments_Image-1_1200x628.jpg"
                alt="Digital twin industrial manufacturing — AI-powered intelligent factory"
                className="w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 z-10">
                  <div className="bg-black/50 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                    <span className="text-[10px] sm:text-sm font-medium uppercase tracking-widest">
                      INTELLIGENT FACTORY
                    </span>
                  </div>
                </div>
              </ParallaxImage>
            </div>
          </motion.div>
        </div>
      </section>

      <MarqueeTicker items={marqueeItems1} />

      {/* ── Table of Contents ──────────────────────────────── */}
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

      {/* ── Section 1: Why Digital Twins Matter ────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Beyond Visualization
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-16">
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION ONE<br />WHY DIGITAL TWINS MATTER NOW
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                For years, digital twins were mainly associated with 3D visualization.
                Manufacturers could create virtual representations of machines, production
                lines and industrial environments to better understand physical assets.
                That is now changing.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                The next generation of industrial digital twins is moving beyond visualization
                to connect <strong>live machine data, production information, documentation,
                maintenance history and operational knowledge</strong> in a single environment.
                Unity's latest work on industrial digital twins describes this evolution toward
                Machine Information Systems (MIS) that connect these different information
                layers into a coherent operational surface.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Modern factories generate enormous amounts of information. Machines produce
                operational signals. Engineering teams maintain technical documents. Production
                teams use MES platforms. Maintenance teams track equipment history. The challenge
                is not simply collecting this data — it is making the information accessible,
                connected and useful across every team that needs it.
              </p>
            </FadeUp>
          </div>

          {/* Mid image */}
          <FadeUp delay={0.1} className="mb-10 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80"
                alt="Manufacturing engineer working with digital twin interface and machine data"
                className="w-full h-full"
              />
            </div>
          </FadeUp>

          {/* Section 2: AI + Digital Twins */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  How AI Changes<br />the Digital Twin
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION TWO<br />AI NEEDS CONTEXT
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Artificial intelligence adds another layer of value to the digital twin —
                  but industrial AI requires more than a general-purpose model. An AI system
                  needs context.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Knowing that a motor is showing an abnormal reading is useful. Understanding
                  that reading, however, requires information about the specific machine, its
                  current operating state, its technical documentation and its maintenance
                  history. Without that grounding, AI operates with incomplete information.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Unity highlights this need for grounded industrial AI, where AI systems can
                  access structured information such as live machine state, MES context,
                  manufacturer documentation and historical operational knowledge. The result
                  is a powerful combination:
                </p>
                <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 border border-gray-200">
                  <p className="text-base sm:text-lg font-semibold text-gray-900 text-center leading-relaxed">
                    Digital Twin + Machine Data + Operational Knowledge + AI
                  </p>
                </div>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Together, these technologies help manufacturers move from simply monitoring
                  equipment toward making operations genuinely more intelligent.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <MarqueeTicker items={marqueeItems2} reverse />

      {/* ── Pull Quote ─────────────────────────────────────── */}
      <FadeUp className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-6 my-8 sm:my-12">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 sm:mb-10">
              "The opportunity is not 3D versus AI. It is 3D + data + AI."
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-gray-400 text-sm sm:text-base uppercase tracking-widest font-medium">
              Sniper Systems &amp; Solutions — Digital Manufacturing
            </p>
          </FadeUp>
        </div>
      </FadeUp>

      {/* ── Four Benefits ──────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Four Business<br />Benefits
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
                { number: "30", suffix: "%", label: "Reduction in unplanned downtime achievable with AI-driven predictive maintenance on connected digital twin platforms" },
                { number: "40", suffix: "%", label: "Of maintenance costs can be saved when moving from reactive to condition-based maintenance supported by digital twins" },
                { number: "5", suffix: "×", label: "Faster fault diagnosis when machine data, documentation and 3D context are unified in a single operational environment" },
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

      {/* ── Why Real-Time 3D Still Matters ─────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Why Real-Time 3D<br />Still Matters
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-14">
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION THREE<br />SPATIAL CONTEXT FOR AI
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                As AI becomes more prominent, it may seem that 3D visualization is becoming
                less important. In industrial environments, the opposite is often true.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Machines and factories are physical systems. Components have locations,
                relationships and dependencies that are difficult to understand through
                conventional dashboards alone. Real-time 3D provides spatial context.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                An engineer can see which component is affected, where it is located, and how
                it relates to surrounding equipment. When this visual context is combined with
                live machine information and documentation, the digital twin becomes more than
                a virtual model — it becomes an interactive interface for understanding the
                physical environment.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Unity's approach specifically combines spatial 3D context with machine signals,
                production information, structured documentation and maintenance history. The
                opportunity is therefore not <strong>3D versus AI</strong> — it is{" "}
                <strong>3D + data + AI</strong>.
              </p>
            </FadeUp>
          </div>

          {/* Mid image */}
          <FadeUp delay={0.1} className="mb-10 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80"
                alt="Real-time 3D factory digital twin operational interface"
                className="w-full h-full"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Intelligence Flow (dark panel) ─────────────────── */}
      <FadeUp className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-6 my-8 sm:my-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <FadeUp>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-white mb-4">
                From Smart Factory<br />to Intelligent Factory
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                The smart factory focuses on connected equipment, automation and data. The
                intelligent factory goes further — using that connected information to support
                better human decisions. The value comes from connecting the physical and digital
                worlds in a continuous loop.
              </p>
            </FadeUp>
          </div>

          {/* Flow steps */}
          <div ref={flowRef} className="relative grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-2 mb-10 sm:mb-14">
            {flowSteps.map((s, i) => (
              <FlowStep key={i} icon={s.icon} label={s.label} index={i} total={flowSteps.length} inView={flowInView} />
            ))}
          </div>

          <FadeUp delay={0.2}>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              Instead of treating a machine's data, documentation and operational history as
              separate resources, manufacturers can create a connected environment where that
              information is available within the context of the asset — and where AI can
              reason across it all.
            </p>
          </FadeUp>
        </div>
      </FadeUp>

      {/* ── Foundations (dark panel) ───────────────────────── */}
      <FadeUp className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-6 my-8 sm:my-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <FadeUp>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-white mb-4">
                Four Foundations Before<br />Building an AI Digital Twin
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                Successful digital twin initiatives require more than choosing visualization
                software. Manufacturers should consider these four foundations before scaling
                AI-powered digital twin programmes.
              </p>
            </FadeUp>
          </div>

          <div ref={foundationsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {foundations.map((f, i) => (
              <FoundationCard key={i} {...f} index={i} inView={foundationsInView} />
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ── The Future Section ─────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                The Future Is<br />Intelligent and Connected
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION FOUR<br />WHAT COMES NEXT
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                The definition of the industrial digital twin is changing. It is moving from
                a virtual representation of a machine or factory toward a connected operational
                layer that brings together machine data, people, documentation, 3D context
                and AI.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                That makes digital twins increasingly relevant to manufacturers looking to
                improve maintenance, support operators, reduce knowledge gaps and build a
                stronger foundation for industrial AI.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                The next stage of digital manufacturing will not simply be about creating a
                digital version of a physical factory. It will be about using that digital
                representation to understand, operate and continuously improve the physical
                environment.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                For manufacturers, the future is not just a smarter digital twin. It is a
                more intelligent way of running the factory.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <MarqueeTicker items={marqueeItems3} />

      {/* ── Related Posts ───────────────────────────────────── */}
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

      {/* ── CTA ─────────────────────────────────────────────── */}
      <FadeUp className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-6 my-8 sm:my-12 overflow-hidden">
        <div ref={ctaRef} className="max-w-4xl mx-auto text-center">
          <div className="mb-8 sm:mb-12 overflow-hidden">
            <h2
              ref={ctaHeadingRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-4 sm:mb-6 leading-tight"
              aria-label="Ready to build your intelligent factory?"
            >
              {["Ready", "to", "build", "your"].map((word, i) => (
                <span key={i} className="cta-word inline-block opacity-0 mr-[0.22em]">
                  {word}
                </span>
              ))}
              <br className="hidden sm:block" />
              {["intelligent", "factory?"].map((word, i) => (
                <span key={i} className="cta-word inline-block opacity-0 mr-[0.22em] last:mr-0">
                  {word}
                </span>
              ))}
            </h2>
          </div>
          <FadeUp delay={0.3}>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Talk to our team about digital twin solutions, industrial AI integration and
              real-time 3D for manufacturing.
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

      {/* ── Scroll to Top ───────────────────────────────────── */}
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
