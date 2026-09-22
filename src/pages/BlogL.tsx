import { Layout } from "@/components/Layout";
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
  Briefcase,
  Activity,
  Scale,
  Users,
  BarChart2,
  Shield,
  Cpu,
  Layers,
  Database,
  Cloud,
  ArrowUpRight,
  Check
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

gsap.registerPlugin(ScrollTrigger);

// ─── Shared easing ────────────────────────────────────────
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
// ✦ MARQUEE TICKER (Scroll-Linked via GSAP)
// ========================================================
const MarqueeTicker = ({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const tween = gsap.fromTo(
      track,
      { xPercent: reverse ? -25 : 0 },
      {
        xPercent: reverse ? 0 : -25,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reverse]);

  const multiplied = [...items, ...items, ...items, ...items];

  return (
    <div ref={containerRef} className="overflow-hidden bg-gray-950 py-3 sm:py-4 border-y border-gray-800">
      <div
        ref={trackRef}
        className="flex gap-8 sm:gap-10 whitespace-nowrap will-change-transform"
      >
        {multiplied.map((text, i) => (
          <span
            key={i}
            className="flex items-center gap-8 sm:gap-10 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500"
          >
            {text}
            <span className="w-1.5 h-1.5 rounded-full bg-gray-700 inline-block flex-shrink-0" />
          </span>
        ))}
      </div>
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
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
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
const AnimatedCounter = ({
  target,
  suffix = "",
}: {
  target: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);
  const numericMatch = target.match(/[\d.]+/);
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : null;
  const prefix =
    numericValue !== null ? target.replace(/[\d.]+.*/, "") : "";

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
            if (el)
              el.textContent =
                prefix + Math.round(obj.val).toLocaleString() + suffix;
          },
        });
      },
    });
    return () => st.kill();
  }, [numericValue]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
};

// ========================================================
// ✦ META PILL
// ========================================================
const MetaPill = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
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
  post: { id: string; title: string; category: string; image: string; readTime: string };
}) => (
  <a href={`/blog/${post.id}`} className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
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
    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 leading-snug group-hover:underline underline-offset-2">
        {post.title}
      </h3>
      <span className="text-xs text-gray-500 flex items-center gap-1.5 mt-4">
        <Clock className="w-3.5 h-3.5" /> {post.readTime}
      </span>
    </div>
  </a>
);

// ========================================================
// ✦ TABLE OF CONTENTS ITEM (dark panel)
// ========================================================
const TocItem = ({
  index,
  title,
  inView,
}: {
  index: number;
  title: string;
  inView: boolean;
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!inView || !lineRef.current) return;
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.3 + index * 0.1,
      }
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
        <span className="text-gray-500 text-xs font-mono mt-1 flex-shrink-0">
          0{index + 1}
        </span>
        <span className="text-white text-sm sm:text-base font-medium leading-relaxed">
          {title}
        </span>
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
// ✦ BENEFIT CARD (Infrastructure benefits)
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
    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 leading-snug">
      {title}
    </h4>
    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

// ========================================================
// MAIN BLOG-L PAGE
// ========================================================
const BlogL = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);

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

  // GSAP hero word-stagger
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = heroHeadingRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".hero-word");
    const tween = gsap.fromTo(
      words,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        delay: 1.2,
      }
    );
    return () => tween.kill();
  }, []);

  // Hero image scale-on-scroll
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
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          end: "top 10%",
          scrub: 1.4,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // GSAP CTA word stagger
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  useEffect(() => {
    if (!ctaInView) return;
    const el = ctaHeadingRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".cta-word");
    gsap.fromTo(
      words,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.2,
      }
    );
  }, [ctaInView]);

  // Related posts grid stagger
  const relatedGridRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef(null);
  const relatedInView = useInView(relatedRef, { once: true, margin: "-60px" });
  const relatedTriggered = useRef(false);
  useEffect(() => {
    if (!relatedInView || relatedTriggered.current) return;
    relatedTriggered.current = true;
    const cards = relatedGridRef.current?.querySelectorAll(".related-card");
    if (!cards) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.12 }
    );
  }, [relatedInView]);

  // Section inView refs
  const heroRef = useRef(null);
  const tocRef = useRef(null);
  const statsRef = useRef(null);
  const benefitsRef = useRef(null);
  const teamsRef = useRef(null);
  const tableRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const tocInView = useInView(tocRef, { once: true, margin: "-60px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-60px" });
  const teamsInView = useInView(teamsRef, { once: true, margin: "-60px" });
  const tableInView = useInView(tableRef, { once: true, margin: "-60px" });

  // Data
  const tocItems = [
    "Why Traditional Infrastructure Falls Short",
    "Three Infrastructure Changes Driving AI Adoption",
    "The Business Value of Modern Infrastructure",
    "Traditional vs AI-Ready Infrastructure Comparison",
    "Building an Infrastructure Strategy for the Future",
  ];

  const benefits = [
    {
      icon: Cpu,
      title: "AI-Ready Compute Servers",
      description:
        "High-performance GPU-accelerated enterprise servers enable rapid training and real-time model inference.",
    },
    {
      icon: Database,
      title: "High-Speed NVMe Storage",
      description:
        "Ultra-low latency storage architectures eliminate input/output bottlenecks, supplying data to AI processors instantly.",
    },
    {
      icon: Cloud,
      title: "Hybrid Cloud Integration",
      description:
        "Balancing on-premises control for sensitive data with cloud scalability for flexible model training.",
    },
    {
      icon: Shield,
      title: "Resiliency & Security",
      description:
        "Robust backup, compliance pipelines, and isolated networks guard mission-critical intellectual property.",
    },
  ];

  const teams = [
    {
      icon: Cpu,
      team: "IT Infrastructure",
      items: [
        "Deploy GPU-enabled server architectures designed for heavy, variable computational workloads",
        "Streamline hardware footprint with automated management platforms like Dell OpenManage or Lenovo XClarity"
      ],
    },
    {
      icon: Database,
      team: "Data Engineering",
      items: [
        "Eliminate data pipeline bottlenecks with high-throughput NVMe storage",
        "Maintain unified access controls across structured databases and unstructured document pools"
      ],
    },
    {
      icon: Shield,
      team: "Security & Compliance",
      items: [
        "Enforce strict regional data residency rules by keeping private datasets in secure local enclaves",
        "Automate data-at-rest encryption and secure backup routes to prevent shadow IT risks"
      ],
    },
  ];

  const relatedPosts = [
    {
      id: "how-real-time-3d-and-xr-are-transforming-automotive-product-development-unity",
      title: "How Real-Time 3D and XR Are Transforming Automotive Product Development",
      category: "Automotive XR",
      image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&q=80",
      readTime: "10 min read",
    },
    {
      id: "how-enterprises-are-using-azure-openai-to-drive-productivity-and-innovation-in-2026",
      title: "How Enterprises Are Using Azure OpenAI to Drive Productivity and Innovation in 2026",
      category: "Enterprise AI",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      readTime: "10 min read",
    },
    {
      id: "why-businesses-are-choosing-dell-dual-monitor-setups-for-higher-productivity",
      title: "Beyond Bigger Screens: Why Dual Monitor Setups Are Becoming a Business Standard",
      category: "Workplace IT",
      image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
      readTime: "9 min read",
    },
  ];

  const marqueeItems1 = [
    "AI-Ready Compute",
    "GPU-Enabled Servers",
    "NVMe Storage Architecture",
    "Hybrid Cloud Flexibility",
    "Enterprise Infrastructure 2026",
    "Zero-Trust Security",
  ];
  const marqueeItems2 = [
    "Dell Technologies Partner",
    "Lenovo Enterprise Solutions",
    "Microsoft Azure Hybrid",
    "AWS Storage Gateway",
    "Data Center Modernization",
  ];
  const marqueeItems3 = [
    "Sniper Systems Solutions",
    "IT Infrastructure Reseller India",
    "Scalable Storage Platforms",
    "AI Infrastructure Strategy 2026",
    "Read More",
  ];

  return (
    <Layout>
      <Helmet>
        {/* BASIC SEO */}
        <title>Why AI Is Reshaping Enterprise Server and Storage Infrastructure | Sniper Systems</title>
        <meta
          name="description"
          content="Discover how Real-Time 3D, Extended Reality (XR), and digital twins are helping automotive manufacturers accelerate product development, improve collaboration, and reduce engineering costs."
        />
        <meta
          name="keywords"
          content="Enterprise AI infrastructure, GPU servers, NVMe storage arrays, hybrid cloud architecture, server modernization, Dell Lenovo reseller, Sniper Systems"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://sniperindia.com/blog/why-ai-is-reshaping-enterprise-server-and-storage-infrastructure"
        />

        {/* GEO TAGS */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai" />
        <meta name="geo.position" content="13.0827;80.2707" />
        <meta name="ICBM" content="13.0827, 80.2707" />

        {/* OPEN GRAPH */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Why AI Is Reshaping Enterprise Server and Storage Infrastructure" />
        <meta property="og:description" content="Explore why traditional infrastructure falls short and how GPU compute, high-performance NVMe storage, and hybrid cloud strategies are reshaping modern enterprise data centers." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80" />
        <meta property="og:url" content="https://sniperindia.com/blog/why-ai-is-reshaping-enterprise-server-and-storage-infrastructure" />

        {/* TWITTER SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Why AI Is Reshaping Enterprise Server and Storage Infrastructure" />
        <meta name="twitter:description" content="Explore why traditional infrastructure falls short and how GPU compute, high-performance NVMe storage, and hybrid cloud strategies are reshaping modern enterprise data centers." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80" />

        {/* ARTICLE SCHEMA */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Why AI Is Reshaping Enterprise Server and Storage Infrastructure",
            "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
            "datePublished": "2026-07-15T11:00:00+05:30",
            "dateModified": "2026-07-15T14:50:00+05:30",
            "author": {
              "@type": "Organization",
              "name": "Sniper Systems",
              "url": "https://sniperindia.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Sniper Systems",
              "logo": {
                "@type": "ImageObject",
                "url": "https://sniperindia.com/wp-content/uploads/2023/09/logo.png"
              }
            },
            "description": "Explore why traditional infrastructure falls short and how GPU compute, high-performance NVMe storage, and hybrid cloud strategies are reshaping modern enterprise data centers."
          }
          `}
        </script>

        {/* BREADCRUMB SCHEMA */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://sniperindia.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://sniperindia.com/blog/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Why AI Is Reshaping Enterprise Server and Storage Infrastructure",
                "item": "https://sniperindia.com/blog/why-ai-is-reshaping-enterprise-server-and-storage-infrastructure"
              }
            ]
          }
          `}
        </script>
      </Helmet>

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
              <MetaPill icon={Tag} label="Infrastructure" />
              <MetaPill icon={Calendar} label="July 15, 2026" />
              <MetaPill icon={Clock} label="8 min read" />
              <MetaPill icon={User} label="Sniper Systems" />
            </motion.div>

            <h1
              ref={heroHeadingRef}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight max-w-5xl mx-auto font-sans"
              aria-label="Why AI Is Reshaping Enterprise Server and Storage Infrastructure"
            >
              {["Why", "AI", "Is", "Reshaping", "Enterprise", "Server", "and", "Storage", "Infrastructure"].map((word, i) => (
                <span
                  key={i}
                  className="hero-word inline-block opacity-0 mr-[0.22em] last:mr-0"
                >
                  {word}
                  {(word === "Enterprise" || word === "and") && <br className="hidden sm:block" />}
                </span>
              ))}
            </h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 1.55 }}
            >
              AI Is Changing More Than Applications
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-gray-750 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 1.7 }}
            >
              Artificial Intelligence has rapidly become a business priority. Organizations across industries
              are embedding AI into their everyday operations. But while AI software continues to evolve, many
              businesses overlook a critical question: Is their IT infrastructure ready to support AI? Traditional
              enterprise systems were built for business applications like ERP and email—not for processing massive datasets.
            </motion.p>
          </div>

          {/* Hero image with scale-on-scroll */}
          <motion.div
            className="max-w-6xl mx-auto pt-6 sm:pt-8 lg:pt-12"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            <div
              ref={heroImgWrapRef}
              className="relative shadow-2xl overflow-hidden h-56 sm:h-96 md:h-[500px] lg:h-[600px]"
              style={{
                borderRadius: "2.5rem",
                willChange: "transform, border-radius",
                transformOrigin: "center center",
              }}
            >
              <ParallaxImage
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80"
                alt="AI-Ready Data Center Server Racks"
                className="w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 z-10">
                  <div className="bg-black/50 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                    <span className="text-[10px] sm:text-sm font-medium uppercase tracking-widest">
                      ENTERPRISE IT INFRASTRUCTURE
                    </span>
                  </div>
                </div>
              </ParallaxImage>
            </div>
          </motion.div>
        </div>
      </section>

      <MarqueeTicker items={marqueeItems1} />

      {/* ── Table of Contents ──────────────────────────────────────────── */}
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

      {/* ── Article Body: Section 1 ──────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Why Traditional<br />Infrastructure Falls Short
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-16">
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION ONE<br />THE DATA DILEMMA
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Most legacy IT environments were designed for predictable workloads. AI is different. Whether it's training machine learning
                models, analyzing large volumes of data, or running intelligent business applications, AI requires faster processing, greater
                scalability, and high-speed access to information.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Without the right infrastructure, organizations experience: slow application performance, storage bottlenecks, limited
                scalability for AI projects, higher operational costs, and delayed business insights. Rather than upgrading individual components,
                enterprises must redesign their server and storage strategies.
              </p>
            </FadeUp>
          </div>

          {/* Mid-article image */}
          <FadeUp delay={0.1} className="mb-10 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage
                src="https://i.postimg.cc/J0JTJ41N/Apple-i-Phone-18-Pro-2up-Geo-260909-lp-jpg-landing-big-2x.jpg"
                alt="Modern Server Hardware Infrastructure"
                className="w-full h-full"
              />
            </div>
          </FadeUp>

          {/* Section 2 — Three Changes */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Three Changes Driving<br />Modern AI Adoption
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-14">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION TWO<br />COMPUTE, STORAGE &amp; CLOUD
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  <strong>1. AI-Ready Compute:</strong> Modern AI applications require GPU acceleration. High-performance enterprise
                  servers with GPUs process AI models faster, improve analytics, and support data-intensive applications.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  <strong>2. High-Performance Storage:</strong> Storage is no longer just about capacity—it's about enabling faster
                  decision-making. NVMe and unified storage architectures reduce latency and ensure AI workloads run efficiently.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  <strong>3. Hybrid Flexibilities:</strong> Balance performance and security by keeping sensitive workloads on-premises
                  while leveraging cloud resources for disaster recovery, backups, and scaling training runs.
                </p>
              </FadeUp>
            </div>

            {/* Section 3 — Building Future Strategy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION THREE<br />BUSINESS REFLECTION
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  As AI becomes a core part of enterprise operations, infrastructure decisions become business decisions. Organizations
                  that modernize today are better positioned to support emerging technologies, improve operational efficiency, and respond quickly
                  to changing demands.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Industry-leading platforms from providers such as Dell Technologies, Lenovo, Microsoft Azure, and AWS are helping enterprises
                  build flexible, AI-ready environments that combine powerful servers, intelligent storage, and cloud capabilities into a unified strategy.
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
              "The focus is no longer on purchasing more hardware — it's about creating an infrastructure that can adapt as business needs evolve."
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-gray-400 text-sm sm:text-base uppercase tracking-widest font-medium">
              Sniper Systems &amp; Solutions, Enterprise Infrastructure Refresh Report
            </p>
          </FadeUp>
        </div>
      </FadeUp>

      {/* ── Key Benefits Grid ────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Business Outcomes of<br />Modern Infrastructure
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
                { number: "3.2", suffix: "×", label: "Faster insight generation from analytics pipelines" },
                { number: "10",  suffix: "×", label: "Reduction in storage latency via NVMe architectures" },
                { number: "65", suffix: "%", label: "Faster scaling and disaster recovery in hybrid setups" },
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

      {/* ── Comparison Table (Traditional vs AI-Ready) ───────────────────── */}
      <section ref={tableRef} className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 sm:mb-12">
            <FadeUp>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
                Traditional vs AI-Ready<br />Infrastructure
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-200 mt-4" />
          </div>

          <motion.div
            className="overflow-x-auto border border-gray-200 rounded-2xl"
            initial={{ opacity: 0, y: 25 }}
            animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 sm:p-6 text-sm font-semibold text-gray-900">Traditional Infrastructure</th>
                  <th className="p-4 sm:p-6 text-sm font-semibold text-gray-900">AI-Ready Infrastructure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150">
                {[
                  { trad: "CPU-focused servers", ai: "GPU-enabled enterprise servers" },
                  { trad: "Conventional storage", ai: "High-performance NVMe storage" },
                  { trad: "Fixed capacity", ai: "Scalable infrastructure" },
                  { trad: "Separate on-premises systems", ai: "Hybrid infrastructure" },
                  { trad: "Manual operations", ai: "Intelligent automation and analytics" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 sm:p-6 text-sm sm:text-base text-gray-600 border-r border-gray-100">{row.trad}</td>
                    <td className="p-4 sm:p-6 text-sm sm:text-base text-gray-900 font-medium flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {row.ai}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── Team Use Cases (Where Businesses See Impact) ──────────────────── */}
      <FadeUp className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-6 my-8 sm:my-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <FadeUp>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-white">
                How Modern Infrastructure<br />Empowers Technical Teams
              </h2>
            </FadeUp>
          </div>
          <div ref={teamsRef}>
            {teams.map((t, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-8 py-6 sm:py-8 border-b border-gray-700 last:border-b-0 items-start"
              >
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={teamsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.07 }}
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <t.icon className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="text-sm font-semibold text-gray-200 uppercase tracking-wider font-sans">
                    {t.team}
                  </span>
                </motion.div>
                <motion.ul
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={teamsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.07 }}
                >
                  {t.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </motion.ul>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ── Future / Final Section ───────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Reshaping the Infrastructure<br />Refresh Cycle
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-14 sm:mb-20">
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION FINAL<br />THE STRATEGIC ROADMAP
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Modern server and storage strategies are no longer centered solely on performance—they are designed to support scalability,
                resilience, and continuous innovation. Organizations that invest in AI-ready infrastructure today will be better prepared to deliver
                faster insights, improve operational efficiency, and remain competitive.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-semibold">
                For businesses planning their next infrastructure refresh, the key question is no longer whether AI will influence enterprise IT—it's
                how quickly they can build an infrastructure ready to support it.
              </p>
            </FadeUp>
          </div>

          {/* Final image */}
          <FadeUp delay={0.1}>
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
                alt="AI Computing Data Streams and Network Connections"
                className="w-full h-full"
              />
            </div>
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

          <div
            ref={relatedGridRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8"
          >
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
              aria-label="Ready to modernize your server and storage infrastructure?"
            >
              {["Ready", "to", "build", "your", "AI-ready", "infra?"].map((word, i) => (
                <span
                  key={i}
                  className="cta-word inline-block opacity-0 mr-[0.22em] last:mr-0"
                >
                  {word}
                  {word === "build" && <br className="hidden sm:block" />}
                </span>
              ))}
            </h2>
          </div>
          <FadeUp delay={0.3}>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Partner with Sniper Systems to design, secure, and deploy high-performance servers and NVMe storage architectures for enterprise AI.
            </p>
          </FadeUp>
          <FadeUp delay={0.45}>
            <a
              href="https://sniperindia.com/contact"
              className="inline-flex items-center px-8 sm:px-12 py-3 sm:py-4 border-2 border-white rounded-full text-white font-medium text-base sm:text-lg hover:bg-white hover:text-black transition-colors duration-300"
            >
              TALK TO OUR INFRASTRUCTURE ARCHITECTS
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

export default BlogL;
