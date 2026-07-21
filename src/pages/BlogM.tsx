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
  Users,
  Shield,
  Zap,
  FileText,
  Search,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.16, 1, 0.3, 1] as const;

// ── White Screen Transition ───────────────────────────
const WhiteScreenTransition = ({ onComplete }: { onComplete: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(ref.current, { yPercent: -105, duration: 0.9, ease: "power3.inOut", delay: 0.2, onComplete });
  }, []);
  return <div ref={ref} className="fixed inset-0 bg-white z-[9999] will-change-transform" />;
};

// ── Fade-Up Wrapper ───────────────────────────────────
const FadeUp = ({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay }}>
      {children}
    </motion.div>
  );
};

// ── Marquee Ticker ────────────────────────────────────
const MarqueeTicker = ({ items, reverse = false }: { items: string[]; reverse?: boolean }) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-gray-950 py-3 sm:py-4 border-y border-gray-800">
      <div className="flex gap-8 sm:gap-10 whitespace-nowrap"
        style={{ animation: `marqueeM${reverse ? "Rev" : ""} 28s linear infinite`, willChange: "transform" }}>
        {doubled.map((text, i) => (
          <span key={i} className="flex items-center gap-8 sm:gap-10 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500">
            {text}
            <span className="w-1.5 h-1.5 rounded-full bg-gray-700 inline-block flex-shrink-0" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marqueeM    { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marqueeMRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>
    </div>
  );
};

// ── Parallax Image ────────────────────────────────────
const ParallaxImage = ({ src, alt, className, children }: {
  src: string; alt: string; className?: string; children?: React.ReactNode;
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current; const img = imgRef.current;
    if (!wrap || !img) return;
    const tween = gsap.fromTo(img, { yPercent: -8 }, {
      yPercent: 8, ease: "none",
      scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 1 },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return (
    <div ref={wrapRef} className={`overflow-hidden ${className ?? ""}`}>
      <img ref={imgRef} src={src} alt={alt} loading="lazy" decoding="async"
        className="w-full h-full object-cover scale-110" style={{ willChange: "transform" }} />
      {children}
    </div>
  );
};

// ── Animated Counter ──────────────────────────────────
const AnimatedCounter = ({ target, suffix = "" }: { target: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);
  const numericMatch = target.match(/[\d.]+/);
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : null;
  const prefix = numericValue !== null ? target.replace(/[\d.]+.*/, "") : "";
  useEffect(() => {
    const el = ref.current;
    if (!el || numericValue === null) return;
    const st = ScrollTrigger.create({ trigger: el, start: "top 88%",
      onEnter: () => {
        if (triggered.current) return; triggered.current = true;
        const obj = { val: 0 };
        gsap.to(obj, { val: numericValue, duration: 2.2, ease: "power2.out",
          onUpdate: () => { if (el) el.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix; },
        });
      },
    });
    return () => st.kill();
  }, [numericValue]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
};

// ── Meta Pill ─────────────────────────────────────────
const MetaPill = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium">
    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" /><span>{label}</span>
  </div>
);

// ── Related Card ──────────────────────────────────────
const RelatedCard = ({ post }: { post: { title: string; category: string; image: string; readTime: string } }) => (
  <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 h-full">
    <div className="relative h-44 sm:h-56 overflow-hidden">
      <img src={post.image} alt={post.title} loading="lazy" decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute top-3 left-3">
        <span className="bg-black/70 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
          {post.category}
        </span>
      </div>
    </div>
    <div className="p-5 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 leading-snug group-hover:underline underline-offset-2">{post.title}</h3>
      <span className="text-xs text-gray-500 flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" /> {post.readTime}
      </span>
    </div>
  </div>
);

// ── ToC Item ──────────────────────────────────────────
const TocItem = ({ index, title, inView }: { index: number; title: string; inView: boolean }) => {
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!inView || !lineRef.current) return;
    gsap.fromTo(lineRef.current, { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1, ease: "power3.out", delay: 0.3 + index * 0.1 });
  }, [inView]);
  return (
    <motion.div className="relative pb-5 last:pb-0"
      initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease, delay: 0.2 + index * 0.08 }}>
      <div className="flex items-start gap-4">
        <span className="text-gray-500 text-xs font-mono mt-1 flex-shrink-0">0{index + 1}</span>
        <span className="text-white text-sm sm:text-base font-medium leading-relaxed">{title}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-700 overflow-hidden">
        <div ref={lineRef} className="h-full bg-gradient-to-r from-transparent via-gray-400 to-transparent"
          style={{ transform: "scaleX(0)", willChange: "transform" }} />
      </div>
    </motion.div>
  );
};

// ── Benefit Card ──────────────────────────────────────
const BenefitCard = ({ icon: Icon, title, description, index, inView }: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
}) => (
  <motion.div className="border border-gray-200 rounded-2xl p-6 sm:p-8 bg-white hover:shadow-lg transition-shadow duration-300"
    initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease, delay: 0.1 + index * 0.08 }}>
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 sm:mb-5">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
    </div>
    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 leading-snug">{title}</h4>
    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

// ── Department Row (dark panel) ───────────────────────
const DeptRow = ({ icon: Icon, dept, items, index, inView }: {
  icon: React.ElementType; dept: string; items: string[]; index: number; inView: boolean;
}) => (
  <motion.div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-8 py-6 sm:py-8 border-b border-gray-700 last:border-b-0 items-start"
    initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.55, ease, delay: 0.1 + index * 0.07 }}>
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-gray-300" />
      </div>
      <span className="text-sm font-semibold text-gray-200 uppercase tracking-wider">{dept}</span>
    </div>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 flex-shrink-0" />{item}
        </li>
      ))}
    </ul>
  </motion.div>
);

// ========================================================
// MAIN BLOG-M PAGE
// ========================================================
const BlogM = () => {
  const [showScrollTop,    setShowScrollTop]   = useState(false);
  const [showWhiteScreen,  setShowWhiteScreen] = useState(true);

  // ── GEO meta (India) ──────────────────────────────────
  useEffect(() => {
    const tags: Array<[string, string]> = [
      ["geo.region", "IN"], ["geo.placename", "India"],
      ["geo.position", "20.5937;78.9629"], ["ICBM", "20.5937, 78.9629"],
    ];
    const added: HTMLMetaElement[] = [];
    tags.forEach(([name, content]) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); added.push(el); }
      el.content = content;
    });
    return () => added.forEach((el) => el.remove());
  }, []);

  // ── SEO ───────────────────────────────────────────────
  useSEO({
    title: "How AI-Powered Document Collaboration Is Transforming Modern Business Workflows",
    description: "Discover how Adobe Document Cloud, Adobe Acrobat, and Adobe Acrobat Studio help enterprises in India build smarter, AI-powered document workflows that improve collaboration and productivity.",
    keywords: "Adobe Document Cloud India, Adobe Acrobat enterprise, AI document collaboration, Adobe Acrobat Studio, document workflow automation India, Adobe Gold Partner India, enterprise PDF management, Sniper Systems Adobe",
    ogTitle: "How AI-Powered Document Collaboration Is Transforming Modern Business Workflows",
    ogDescription: "Adobe Document Cloud, Adobe Acrobat, and Adobe Acrobat Studio help enterprises build AI-powered document workflows that improve collaboration and reduce manual effort.",
    ogImage: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1600&q=80",
    ogUrl: "https://sniperindia.com/blog/how-ai-powered-document-collaboration-is-transforming-modern-business-workflows",
    canonicalUrl: "https://sniperindia.com/blog/how-ai-powered-document-collaboration-is-transforming-modern-business-workflows",
    twitterTitle: "How AI-Powered Document Collaboration Is Transforming Modern Business Workflows",
    twitterDescription: "AI is redefining how teams work with business documents. Discover how Adobe solutions help enterprises collaborate smarter at scale.",
    twitterImage: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1600&q=80",
  });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) { requestAnimationFrame(() => { setShowScrollTop(window.scrollY > 300); ticking = false; }); ticking = true; }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── GSAP: hero word-stagger ───────────────────────────
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = heroHeadingRef.current; if (!el) return;
    const words = el.querySelectorAll(".hero-word");
    const tween = gsap.fromTo(words, { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.07, delay: 1.2 });
    return () => { tween.kill(); };
  }, []);

  // ── GSAP: hero image scale ────────────────────────────
  const heroImgWrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heroImgWrapRef.current; if (!el) return;
    const tween = gsap.fromTo(el, { scale: 0.82, borderRadius: "2.5rem" }, {
      scale: 1, borderRadius: "1.5rem", ease: "none",
      scrollTrigger: { trigger: el, start: "top 95%", end: "top 10%", scrub: 1.4 },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  // ── GSAP: CTA word stagger ────────────────────────────
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  useEffect(() => {
    if (!ctaInView) return; const el = ctaHeadingRef.current; if (!el) return;
    const words = el.querySelectorAll(".cta-word");
    gsap.fromTo(words, { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.06, delay: 0.2 });
  }, [ctaInView]);

  // ── Related posts stagger ─────────────────────────────
  const relatedGridRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef(null);
  const relatedInView = useInView(relatedRef, { once: true, margin: "-60px" });
  const relatedTriggered = useRef(false);
  useEffect(() => {
    if (!relatedInView || relatedTriggered.current) return; relatedTriggered.current = true;
    const cards = relatedGridRef.current?.querySelectorAll(".related-card"); if (!cards) return;
    gsap.fromTo(cards, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.12 });
  }, [relatedInView]);

  // ── Section inView refs ───────────────────────────────
  const heroRef = useRef(null); const tocRef = useRef(null); const statsRef = useRef(null);
  const benefitsRef = useRef(null); const deptsRef = useRef(null);

  const heroInView     = useInView(heroRef,     { once: true, margin: "-60px" });
  const tocInView      = useInView(tocRef,      { once: true, margin: "-60px" });
  const statsInView    = useInView(statsRef,    { once: true, margin: "-60px" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-60px" });
  const deptsInView    = useInView(deptsRef,    { once: true, margin: "-60px" });

  // ── Data ──────────────────────────────────────────────
  const tocItems = [
    "Why Traditional Document Workflows Are Holding Teams Back",
    "How AI Is Changing the Way Businesses Work with Documents",
    "Building Smarter Workflows with Adobe Document Cloud",
    "Adobe Acrobat: More Than a PDF Solution",
    "Adobe Acrobat Studio: A Smarter Way to Collaborate",
    "Business Benefits Beyond Productivity",
    "How Sniper India Helps Businesses Modernize Document Workflows",
  ];

  const benefits = [
    { icon: Zap, title: "Faster Document Reviews", description: "AI summaries and contextual search reduce the time spent navigating lengthy contracts, proposals, and reports." },
    { icon: Users, title: "Seamless Cross-Team Collaboration", description: "Centralized workspaces let distributed teams organize, review, and annotate documents without version confusion." },
    { icon: Shield, title: "Enterprise-Grade Security", description: "Granular access controls and document tracking protect sensitive business data while maintaining compliance." },
    { icon: CheckCircle2, title: "Reduced Administrative Effort", description: "Automated approval workflows and e-signatures eliminate manual routing, reducing cycle times across departments." },
  ];

  const departments = [
    { icon: FileText, dept: "Legal", items: ["Quickly review and compare lengthy contracts with AI summaries", "Track document versions and maintain a clear approval audit trail"] },
    { icon: Users, dept: "HR", items: ["Streamline policy management and employee documentation workflows", "Collect e-signatures for offer letters, policies, and compliance forms"] },
    { icon: BarChart2, dept: "Sales", items: ["Locate proposal content and customer agreements in seconds", "Share and track client-facing documents with access controls"] },
    { icon: Search, dept: "Engineering", items: ["Organize technical specifications across multiple project workspaces", "Search across related drawings, reports, and compliance documents simultaneously"] },
    { icon: Zap, dept: "Finance", items: ["Review business documents with greater speed and accuracy", "Automate invoice and report workflows to accelerate approvals"] },
  ];

  const relatedPosts = [
    { title: "A Smarter Way to Document Work with Adobe Acrobat Studio", category: "Adobe Acrobat", image: "https://i.postimg.cc/PrX7vbNy/adobe-acrobat-logo-on-background-(1).jpg", readTime: "8 min read" },
    { title: "How Enterprises Are Using Azure OpenAI to Drive Productivity and Innovation in 2026", category: "Cloud AI", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80", readTime: "11 min read" },
    { title: "Microsoft Threat Protection: Strengthening Enterprise Security", category: "Cybersecurity", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", readTime: "9 min read" },
  ];

  const marqueeItems1 = ["Sniper Systems Blog", "Adobe Document Cloud", "AI Document Collaboration", "Adobe Acrobat", "Acrobat Studio", "Adobe Gold Partner"];
  const marqueeItems2 = ["AI-Powered Workflows", "Enterprise PDF", "E-Signatures", "Document Security", "Digital Transformation", "Hybrid Work Productivity", "Adobe India"];
  const marqueeItems3 = ["Stay Informed", "Technology Insights", "Sniper Systems", "Adobe Partner India", "Read More"];

  return (
    <Layout>
      {showWhiteScreen && <WhiteScreenTransition onComplete={() => setShowWhiteScreen(false)} />}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16" ref={heroRef}>
            <motion.div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.9 }}>
              <MetaPill icon={Tag}      label="Document AI" />
              <MetaPill icon={Calendar} label="July 15, 2026" />
              <MetaPill icon={Clock}    label="9 min read" />
              <MetaPill icon={User}     label="Sniper Systems" />
            </motion.div>

            <h1 ref={heroHeadingRef}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight"
              aria-label="How AI-Powered Document Collaboration Is Transforming Modern Business Workflows">
              {["AI-Powered", "Document", "Collaboration"].map((word, i) => (
                <span key={i} className="hero-word inline-block opacity-0 mr-[0.22em] last:mr-0">
                  {word}{word === "Document" && <br className="hidden sm:block" />}
                </span>
              ))}
            </h1>

            <motion.p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 1.55 }}>
              How AI-Powered Document Collaboration Is Transforming Modern Business Workflows
            </motion.p>

            <motion.p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 1.7 }}>
              Many businesses still rely on fragmented document workflows — files shared through email, stored across
              multiple platforms, and managed in different versions. The result is slower collaboration, reduced
              productivity, and delayed decisions. Modern enterprises need intelligent document collaboration that
              helps teams work smarter, find information faster, and securely manage content at scale.
            </motion.p>
          </div>

          <motion.div className="max-w-6xl mx-auto pt-6 sm:pt-8 lg:pt-12"
            initial={{ opacity: 0, y: 40 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}>
            <div ref={heroImgWrapRef}
              className="relative shadow-2xl overflow-hidden h-56 sm:h-96 md:h-[500px] lg:h-[600px]"
              style={{ borderRadius: "2.5rem", willChange: "transform, border-radius", transformOrigin: "center center" }}>
              <ParallaxImage src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1600&q=80"
                alt="AI-powered document collaboration with Adobe Document Cloud" className="w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 z-10">
                  <div className="bg-black/50 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                    <span className="text-[10px] sm:text-sm font-medium uppercase tracking-widest">ADOBE DOCUMENT CLOUD</span>
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
            <FadeUp><h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">In This Article</h2></FadeUp>
          </div>
          <div className="space-y-5">
            {tocItems.map((item, i) => <TocItem key={i} index={i} title={item} inView={tocInView} />)}
          </div>
        </div>
      </FadeUp>

      {/* ── Section 1: The Problem ─────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Why Traditional Workflows<br />Are Holding Teams Back
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-16">
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION ONE<br />THE DOCUMENT PROBLEM
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Every business generates thousands of documents each year — from proposals and contracts to
                engineering drawings, invoices, compliance reports, and customer agreements. The problem
                isn't creating documents. It's managing them efficiently.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Many organizations still struggle with multiple versions circulating across teams, time-consuming
                manual reviews, information scattered across emails and shared drives, lengthy approval cycles,
                and limited visibility into document ownership. For IT leaders, these challenges also create
                governance and security concerns that are increasingly difficult to manage as hybrid work scales.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.1} className="mb-10 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=80"
                alt="Business document management challenges in modern organizations" className="w-full h-full" />
            </div>
          </FadeUp>

          {/* Section 2 — AI Changes the Game */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  How AI Is Changing<br />Document Work
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION TWO<br />AI-POWERED WORKFLOWS
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Instead of spending hours searching through lengthy documents or comparing multiple file versions,
                  AI can quickly summarize content, answer contextual questions, identify important insights, and
                  organize information into meaningful workflows — allowing teams to focus less on administrative
                  tasks and more on strategic work.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Rather than replacing employees, AI enhances productivity by reducing repetitive document-related
                  work. Legal teams can quickly review contracts. HR can streamline policy management. Sales can
                  locate proposal content faster. Engineering can organize technical specifications. Finance can
                  review documents with greater speed and accuracy.
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
              "Business documents are no longer static files — they are strategic assets that drive decisions."
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-gray-400 text-sm sm:text-base uppercase tracking-widest font-medium">
              Sniper Systems &amp; Solutions, Adobe Gold Partner India
            </p>
          </FadeUp>
        </div>
      </FadeUp>

      {/* ── Department Use Cases ─────────────────────────────────────────── */}
      <FadeUp className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[4rem] mx-3 sm:mx-6 my-8 sm:my-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <FadeUp>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-white">
                Where Teams See<br />the Most Impact
              </h2>
            </FadeUp>
          </div>
          <div ref={deptsRef}>
            {departments.map((d, i) => (
              <DeptRow key={i} icon={d.icon} dept={d.dept} items={d.items} index={i} inView={deptsInView} />
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ── Adobe Products Deep-Dive ─────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Document Cloud */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Adobe Document Cloud:<br />A Connected Ecosystem
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-14">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION THREE<br />DOCUMENT CLOUD
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  A successful digital workplace requires more than cloud storage — it requires a connected
                  document ecosystem. Adobe Document Cloud provides organizations with a secure platform for
                  creating, sharing, reviewing, signing, and managing documents from virtually anywhere.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  It brings together document creation, collaboration, cloud storage, and e-signatures into a
                  unified environment that supports both office-based and remote teams. With centralized document
                  access and enterprise-grade security, businesses ensure employees always work on the latest
                  version of a document while maintaining governance and compliance.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Acrobat */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Adobe Acrobat:<br />More Than a PDF Tool
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-14">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION FOUR<br />ADOBE ACROBAT
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Adobe Acrobat has evolved into a comprehensive productivity platform designed for modern
                  enterprises. Beyond creating and editing PDFs, it enables teams to convert and organize
                  documents, protect sensitive information with advanced security controls, collect electronic
                  signatures, compare versions, share files securely, and use AI-powered assistance to
                  summarize content and locate key information.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Whether it's a procurement contract, engineering drawing, project proposal, or board
                  presentation, Adobe Acrobat simplifies how organizations create, manage, and collaborate on
                  business-critical documents — helping employees spend less time navigating files and more
                  time making informed decisions.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Acrobat Studio */}
          <div className="mb-10 sm:mb-16">
            <div className="mb-10 sm:mb-16">
              <FadeUp>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Acrobat Studio: Smarter<br />Team Collaboration
                </h2>
              </FadeUp>
              <div className="w-full h-px bg-gray-300" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              <FadeUp>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                  SECTION FIVE<br />ACROBAT STUDIO
                </h3>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  Adobe Acrobat Studio introduces a new approach to document collaboration. Instead of treating
                  documents as isolated files, it creates collaborative workspaces where teams can organize
                  related PDFs, presentations, spreadsheets, reference materials, and web content into one
                  centralized environment.
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  With AI-powered capabilities, users can search across multiple documents simultaneously,
                  generate intelligent summaries, ask contextual questions across related content, and keep
                  project documentation organized in one workspace. For departments handling large volumes of
                  technical documentation, legal contracts, or research materials, Acrobat Studio reduces time
                  spent searching while improving the quality of team collaboration.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Second image */}
          <FadeUp delay={0.1} className="mb-10 sm:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80"
                alt="Adobe Acrobat Studio collaborative document workspace" className="w-full h-full" />
            </div>
          </FadeUp>
        </div>
      </section>

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

          <div ref={benefitsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-16 sm:mb-20">
            {benefits.map((b, i) => <BenefitCard key={i} {...b} index={i} inView={benefitsInView} />)}
          </div>

          {/* Stats */}
          <div ref={statsRef}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 text-center">
              {[
                { number: "40", suffix: "%", label: "Average reduction in document processing time with AI-assisted workflows" },
                { number: "3",  suffix: "×", label: "Faster contract review with AI summarization in Adobe Acrobat" },
                { number: "60", suffix: "%", label: "Less time spent searching for documents in centralized Adobe workspaces" },
              ].map((stat, i) => (
                <motion.div key={i} className="text-center"
                  initial={{ opacity: 0, y: 40 }} animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.1 }}>
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

      {/* ── Sniper India / Partner Section ───────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-16">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                How Sniper India Helps<br />You Modernize Document Workflows
              </h2>
            </FadeUp>
            <div className="w-full h-px bg-gray-300" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-14 sm:mb-20">
            <FadeUp>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-relaxed">
                SECTION FINAL<br />ADOBE GOLD PARTNER
              </h3>
            </FadeUp>
            <FadeUp delay={0.1} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                As an Adobe Gold Partner, Sniper Systems & Solutions helps organizations adopt Adobe solutions
                that improve productivity, strengthen collaboration, and simplify enterprise document management.
                Our Adobe specialists work closely with businesses to deliver Document Cloud implementation,
                Acrobat licensing and deployment, Acrobat Studio adoption, and enterprise PDF workflow optimization.
              </p>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Whether your organization is looking to digitize document processes, enable secure collaboration,
                or improve enterprise productivity, Sniper India helps you maximize the value of Adobe's intelligent
                document solutions — ensuring a smooth deployment and strong user adoption from day one.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-[360px] md:h-[480px]">
              <ParallaxImage src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
                alt="Sniper Systems Adobe Gold Partner enterprise document solutions India" className="w-full h-full" />
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
            <h2 ref={ctaHeadingRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-4 sm:mb-6 leading-tight"
              aria-label="Ready to modernize your document workflows?">
              {["Ready", "to", "work", "smarter", "with docs?"].map((word, i) => (
                <span key={i} className="cta-word inline-block opacity-0 mr-[0.22em] last:mr-0">
                  {word}{word === "smarter" && <br className="hidden sm:block" />}
                </span>
              ))}
            </h2>
          </div>
          <FadeUp delay={0.3}>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Talk to our Adobe specialists about Document Cloud, Acrobat, and Acrobat Studio for your organization.
            </p>
          </FadeUp>
          <FadeUp delay={0.45}>
            <a href="https://sniperindia.com/contact"
              className="inline-flex items-center px-8 sm:px-12 py-3 sm:py-4 border-2 border-white rounded-full text-white font-medium text-base sm:text-lg hover:bg-white hover:text-black transition-colors duration-300">
              GET IN TOUCH
            </a>
          </FadeUp>
        </div>
      </FadeUp>

      {/* ── Scroll to Top ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 w-12 h-12 sm:w-14 sm:h-14 bg-white border-2 border-gray-900 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 z-50 shadow-lg"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default BlogM;
