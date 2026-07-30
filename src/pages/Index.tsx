import { Layout } from "@/components/Layout";
import LottieAnimation from "@/components/ServicesAnimation";
import { useSEO } from "@/hooks/useSEO";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Calendar, Clock, TrendingUp } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

// -------------------- Easing presets --------------------
const ease = [0.16, 1, 0.3, 1];

// ========================================================
// GSAP UTILITIES
// ========================================================

// ---- Marquee Ticker ----
const MarqueeTicker = ({ items, speed = 26 }: { items: string[]; speed?: number }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    const tween = gsap.to(track, { x: `-${totalWidth}px`, duration: speed, ease: "none", repeat: -1 });
    return () => { tween.kill(); };
  }, [speed]);
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-gray-950 py-3.5 border-y border-gray-800">
      <div ref={trackRef} className="flex gap-10 whitespace-nowrap will-change-transform">
        {doubled.map((text, i) => (
          <span key={i} className="flex items-center gap-10 text-[10px] font-bold tracking-[0.28em] uppercase text-gray-500">
            {text}<span className="w-1 h-1 rounded-full bg-gray-600 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
};

// ---- Parallax Image ----
const ParallaxImage = ({
  src, alt, className, children,
}: {
  src: string; alt: string; className?: string; children?: React.ReactNode;
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    const tween = gsap.fromTo(img, { yPercent: -7 }, {
      yPercent: 7, ease: "none",
      scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return (
    <div ref={wrapRef} className={`overflow-hidden ${className ?? ""}`}>
      <img ref={imgRef} src={src} alt={alt} className="w-full h-full object-cover scale-110 will-change-transform" />
      {children}
    </div>
  );
};

// ========================================================
// WHITE SCREEN TRANSITION — GSAP curtain
// ========================================================
const WhiteScreenTransition = ({ onComplete }: { onComplete: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(ref.current, {
      yPercent: -105,
      duration: 0.9,
      ease: "power3.inOut",
      delay: 0.3,
      onComplete,
    });
  }, []);
  return <div ref={ref} className="fixed inset-0 bg-white z-[9999] will-change-transform" />;
};


// ========================================================
// ✦ CATEGORY PILL
// ========================================================
const CategoryPill = ({ label, accent = false }: { label: string; accent?: boolean }) => (
  <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full ${accent ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"}`}>
    {label}
  </span>
);

// ========================================================
// ✦ HERO FEATURE CARD — large spotlight card
// ========================================================
const HeroCard = ({ post, inView }: { post: any; inView: boolean }) => (
  <motion.div className="group relative flex flex-col h-full"
    initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
    <a href={`/blog/${post.id}`} className="block relative rounded-2xl overflow-hidden mb-5 h-72 sm:h-80 lg:h-[420px] flex-shrink-0">
      <ParallaxImage src={post.image} alt={post.title} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
      <div className="absolute top-4 left-4"><CategoryPill label={post.category} accent /></div>
      <div className="absolute bottom-5 left-5 right-5">
        <div className="flex items-center gap-3 text-white/70 text-xs mb-2.5">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
        </div>
        <h3 className="text-white text-2xl sm:text-3xl font-bold leading-snug line-clamp-3">{post.title}</h3>
      </div>
    </a>
    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
    <a href={`/blog/${post.id}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-900 hover:gap-3 transition-all duration-200 group-hover:underline underline-offset-4">
      Read article <ArrowUpRight className="w-4 h-4" />
    </a>
  </motion.div>
);

// ========================================================
// ✦ SIDE STACK CARD — compact right-column cards
// ========================================================
const StackCard = ({ post, index, inView }: { post: any; index: number; inView: boolean }) => (
  <motion.div className="group flex gap-4 items-start pb-5 last:pb-0 border-b border-gray-100 last:border-b-0"
    initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + index * 0.08 }}>
    <a href={`/blog/${post.id}`} className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
      <img src={post.image} alt={post.title} loading="lazy" decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </a>
    <div className="flex-1 min-w-0">
      <CategoryPill label={post.category} />
      <a href={`/blog/${post.id}`}>
        <h4 className="text-sm font-semibold text-gray-900 leading-snug mt-1.5 mb-1 line-clamp-2 group-hover:underline underline-offset-2">{post.title}</h4>
      </a>
      <span className="text-xs text-gray-400 flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.readTime}</span>
    </div>
  </motion.div>
);

// ========================================================
// ✦ GRID CARD — standard 3-column featured grid
// ========================================================
const GridCard = ({ post, index, inView }: { post: any; index: number; inView: boolean }) => (
  <motion.div className="group flex flex-col"
    initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.05 + index * 0.05 }}>
    <a href={`/blog/${post.id}`} className="block relative rounded-xl overflow-hidden h-48 mb-4 flex-shrink-0">
      <ParallaxImage src={post.image} alt={post.title} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-3 left-3"><CategoryPill label={post.category} accent /></div>
    </a>
    <div className="flex-1 flex flex-col">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
        <span>·</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
      </div>
      <a href={`/blog/${post.id}`}>
        <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:underline underline-offset-2">{post.title}</h3>
      </a>
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3 flex-1">{post.excerpt}</p>
      <a href={`/blog/${post.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 uppercase tracking-wider hover:gap-2.5 transition-all duration-200 mt-auto">
        Read more <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  </motion.div>
);

// ========================================================
// ORBITAL RINGS
// ========================================================
const OrbitalRings = () => (
  <div className="absolute inset-0 bg-black overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px]">
      <div className="absolute inset-0 animate-[spin_20s_linear_infinite]"><div className="absolute inset-0 rounded-full border-2 border-white blur-sm"></div><div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)]"></div></div>
      <div className="absolute inset-8 animate-[spin_15s_linear_infinite_reverse]"><div className="absolute inset-0 rounded-full border-2 border-white blur-sm"></div><div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div></div>
      <div className="absolute inset-16 animate-[spin_12s_linear_infinite]"><div className="absolute inset-0 rounded-full border-2 border blur-[2px]"></div><div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_18px_rgba(244,114,182,0.9)]"></div></div>
      <div className="absolute inset-24 animate-[spin_9s_linear_infinite_reverse]"><div className="absolute inset-0 rounded-full border-2 border blur-[1px]"></div><div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(96,165,250,0.9)]"></div></div>
      <div className="absolute inset-32 animate-[spin_7s_linear_infinite]"><div className="absolute inset-0 rounded-full border-2 border blur-[1px]"></div><div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-violet-400 rounded-full shadow-[0_0_10px_rgba(167,139,250,1)]"></div></div>
      <div className="absolute inset-40 animate-[spin_5s_linear_infinite_reverse]"><div className="absolute inset-0 rounded-full border-2 border"></div><div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-fuchsia-400 rounded-full shadow-[0_0_15px_rgba(232,121,249,1)]"></div></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
        <div className="absolute w-16 h-16 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl"></div>
        <div className="absolute w-8 h-8 bg-white/50 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.5)]"></div>
      </div>
    </div>
  </div>
);


// ========================================================
// CTA SECTION
// ========================================================
const CTASection = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [displayPosition, setDisplayPosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const sectionRef = useRef(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const animationFrameRef = useRef(null);
  const velocity = useRef({ x: 0, y: 0 });

  const lerp = (s: number, e: number, f: number) => s + (e - s) * f;

  const animateCursor = useCallback(() => {
    if (!cursorVisible) return;
    const sf = isHoveringButton ? 0.2 : 0.1;
    const newX = lerp(displayPosition.x, cursorPosition.x, sf);
    const newY = lerp(displayPosition.y, cursorPosition.y, sf);
    velocity.current.x = newX - displayPosition.x;
    velocity.current.y = newY - displayPosition.y;
    setDisplayPosition({ x: newX, y: newY });
    animationFrameRef.current = requestAnimationFrame(animateCursor);
  }, [cursorVisible, cursorPosition, displayPosition, isHoveringButton]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const enter = () => { setCursorVisible(true); if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); animationFrameRef.current = requestAnimationFrame(animateCursor); };
    const leave = () => { setCursorVisible(false); setIsHoveringButton(false); if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
    const move = (e: MouseEvent) => setCursorPosition({ x: e.clientX, y: e.clientY });
    section.addEventListener("mouseenter", enter);
    section.addEventListener("mouseleave", leave);
    section.addEventListener("mousemove", move);
    animationFrameRef.current = requestAnimationFrame(animateCursor);
    return () => { section.removeEventListener("mouseenter", enter); section.removeEventListener("mouseleave", leave); section.removeEventListener("mousemove", move); if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, [animateCursor]);

  useEffect(() => { return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); }; }, []);

  useEffect(() => {
    const btn = ctaBtnRef.current;
    if (!btn) return;
    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
      gsap.to(btn, { x: dx, y: dy, duration: 0.35, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.5)" });
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); };
  }, []);

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <>
      <div className={`fixed pointer-events-none z-50 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-150 ease-out ${cursorVisible ? "opacity-100" : "opacity-0"} ${isHoveringButton ? "w-32 h-32 bg-white text-black" : "w-24 h-24 bg-white text-black"}`}
        style={{ left: `${displayPosition.x}px`, top: `${displayPosition.y}px`, transform: `translate(-50%, -50%) ${cursorVisible ? (isHoveringButton ? "scale(1.3)" : "scale(1)") : "scale(0.5)"}`, transition: cursorVisible ? 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.3s ease, height 0.3s ease' : 'all 0.3s ease', filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25))' }}>
        {isHoveringButton ? "CLICK ME!" : "LET'S GO!"}
      </div>
      <div className={`fixed pointer-events-none z-40 rounded-full transition-all duration-300 ease-out ${cursorVisible ? "opacity-30" : "opacity-0"} ${isHoveringButton ? "w-20 h-20 bg-white/30" : "w-16 h-16 bg-white/20"}`}
        style={{ left: `${displayPosition.x - velocity.current.x * 0.5}px`, top: `${displayPosition.y - velocity.current.y * 0.5}px`, transform: 'translate(-50%, -50%)', transition: 'left 0.1s linear, top 0.1s linear' }} />

      <motion.section
        ref={(el) => { sectionRef.current = el; ctaRef.current = el; }}
        className="relative bg-black text-white py-20 px-6 rounded-[4rem] mx-6 my-12 cursor-none overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <OrbitalRings />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div className="mb-12" initial={{ opacity: 0, y: 40 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
            <h2 className="text-7xl md:text-8xl font-semibold mb-6 leading-tight text-white">Have<br />an idea?<br />We make it happen</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}>
            <Link
              ref={ctaBtnRef as any}
              to="/"
              className="inline-flex items-center px-12 py-4 border-2 border-white rounded-full text-white font-medium text-lg hover:bg-white hover:text-black transition-all duration-300 relative z-10 will-change-transform"
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setIsHoveringButton(false)}
            >
              TELL US
              <span className="absolute inset-[-10px] rounded-full"></span>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};


// ========================================================
// POST ROW — editorial list style for "Latest insights"
// ========================================================
const PostRow = ({ post, index }: { post: any; index: number }) => {
  const rowRef  = useRef(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const rowInView = useInView(rowRef, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!rowInView || !lineRef.current) return;
    gsap.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );
  }, [rowInView]);

  return (
    <div ref={rowRef} className="relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-100 overflow-hidden">
        <div ref={lineRef} className="h-full bg-gradient-to-r from-transparent via-gray-400 to-transparent" style={{ transform: "scaleX(0)" }} />
      </div>
      <motion.a
        href={`/blog/${post.id}`}
        className="group grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 sm:gap-8 items-start py-7 sm:py-8"
        initial={{ opacity: 0, y: 24 }}
        animate={rowInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      >
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <CategoryPill label={post.category} />
            <span className="flex items-center gap-1 text-xs text-gray-400"><Calendar className="w-3 h-3" />{post.date}</span>
            <span className="flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3 h-3" />{post.readTime}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug group-hover:underline underline-offset-2 line-clamp-2">{post.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 hidden sm:block">{post.excerpt}</p>
        </div>
        <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100">
          <img src={post.image} alt={post.title} loading="lazy" decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      </motion.a>
    </div>
  );
};


// ========================================================
// BLOG PAGE
// ========================================================
const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);

  // SEO Meta Tags
  useSEO({
    title: "IT Blogs & Insights | Sniper Systems | Technology & IT Solutions",
    description: "Explore Sniper Systems blog for the latest insights on IT infrastructure, managed services, cloud solutions, cybersecurity, and enterprise technology trends.",
    keywords: "IT blog India, managed IT services blog, cloud computing articles, cybersecurity insights, enterprise IT solutions blog",
    ogTitle: "IT Blogs & Insights | Sniper Systems",
    ogDescription: "Stay updated with the latest IT trends, cloud solutions, cybersecurity insights, and enterprise technology blogs.",
    ogImage: "https://sniperindia.com/wp-content/uploads/2023/09/sniper-systems-banner.jpg",
    ogUrl: "https://sniperindia.com/blog/",
    canonicalUrl: "https://sniperindia.com/blog/",
    twitterTitle: "IT Blogs & Insights | Sniper Systems",
    twitterDescription: "Read expert blogs on IT infrastructure, managed services, cloud computing, and enterprise solutions.",
    twitterImage: "https://sniperindia.com/wp-content/uploads/2023/09/sniper-systems-banner.jpg",
  });

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const blogPosts = [
    { id: "the-hidden-technology-behind-indias-gcc-boom-why-it-infrastructure-matters", title: "The Hidden Technology Behind India's GCC Boom: Why IT Infrastructure Is Becoming the Biggest Investment", excerpt: "India's GCC landscape is evolving beyond talent. Discover why IT infrastructure, hybrid cloud, cybersecurity, and AI readiness are becoming the defining investments for Global Capability Centers.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80", date: "July 20, 2026", readTime: "10 min read", category: "Enterprise IT" },
    { id: "why-remote-engineering-teams-are-transforming-manufacturing-and-product-design", title: "Why Remote Engineering Teams Are Transforming Manufacturing and Product Design", excerpt: "Discover how remote engineering teams are transforming manufacturing and product design with secure remote workstations, GPU-powered collaboration, and enterprise IT infrastructure.", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&q=80", date: "July 18, 2026", readTime: "9 min read", category: "Engineering" },
    { id: "how-ai-powered-document-collaboration-is-transforming-modern-business-workflows", title: "How AI-Powered Document Collaboration Is Transforming Modern Business Workflows", excerpt: "Discover how Adobe Document Cloud, Adobe Acrobat, and Adobe Acrobat Studio help enterprises build smarter, AI-powered document workflows that improve collaboration and productivity.", image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1600&q=80", date: "July 15, 2026", readTime: "9 min read", category: "Document AI" },
    { id: "why-ai-is-reshaping-enterprise-server-and-storage-infrastructure", title: "Why AI Is Reshaping Enterprise Server and Storage Infrastructure", excerpt: "Discover why traditional infrastructure falls short and how GPU compute, high-performance NVMe storage, and hybrid cloud strategies are reshaping modern enterprise data centers.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80", date: "July 15, 2026", readTime: "8 min read", category: "Infrastructure" },
    { id: "how-real-time-3d-and-xr-are-transforming-automotive-product-development-unity", title: "How Real-Time 3D and XR Are Transforming Automotive Product Development", excerpt: "Discover how Real-Time 3D, Extended Reality (XR), and digital twins are helping automotive manufacturers accelerate product development, improve collaboration, and reduce engineering costs.", image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1600&q=80", date: "July 15, 2026", readTime: "10 min read", category: "Automotive XR" },
    { id: "how-microsoft-intune-is-helping-enterprises-secure-hybrid-work-and-simplify-endpoint-management", title: "How Microsoft Intune Is Helping Enterprises Secure Hybrid Work and Simplify Endpoint Management", excerpt: "Discover how Microsoft Intune enables enterprises to secure hybrid work, simplify endpoint management, and support Zero Trust across all devices.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=80", date: "July 2, 2026", readTime: "9 min read", category: "Endpoint Security" },
    { id: "how-real-time-3d-and-xr-are-transforming-automotive-product-development", title: "How Real-Time 3D and XR Are Transforming Automotive Product Development", excerpt: "Discover how Real-Time 3D, Extended Reality (XR), and digital twins are helping automotive manufacturers accelerate product development, improve collaboration, and reduce engineering costs.", image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1600&q=80", date: "July 2, 2026", readTime: "10 min read", category: "Automotive XR" },
    { id: "how-enterprises-are-using-azure-openai-to-drive-productivity-and-innovation-in-2026", title: "How Enterprises Are Using Azure OpenAI to Drive Productivity and Innovation in 2026", excerpt: "Discover how leading enterprises are shifting from basic chatbots to autonomous agentic AI and robust governance on Azure OpenAI in 2026.", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=80", date: "June 25, 2026", readTime: "11 min read", category: "Cloud AI" },
    { id: "microsoft-threat-protection-strengthening-enterprise-security", title: "Microsoft Threat Protection: Strengthening Enterprise Security Against Modern Cyber Threats", excerpt: "How Microsoft Threat Protection brings identity, endpoint, email, cloud, and data signals together for faster detection and response.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80", date: "June 22, 2026", readTime: "9 min read", category: "Cybersecurity" },
    { id: "why-businesses-are-choosing-dell-dual-monitor-setups-for-higher-productivity", title: "Beyond Bigger Screens: Why Dual Monitor Setups Are Becoming a Business Standard", excerpt: "Why enterprises across India are adopting Dell dual monitor setups to improve productivity, collaboration, and employee experience in modern workplaces.", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1600&q=80", date: "July 2, 2026", readTime: "9 min read", category: "Workplace IT" },
    { id: "bim-digital-twins-aec-redefined", title: "How BIM and Digital Twins Are Redefining Project Delivery and Asset Management in AEC", excerpt: "Discover how BIM and Digital Twin technologies are transforming AEC project delivery, collaboration, and asset lifecycle management using Autodesk solutions.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80", date: "June 16, 2026", readTime: "14 min read", category: "AEC & BIM" },
    { id: "blogd", title: "The Future of Business Transformation: How Cloud Solutions Are Empowering Indian Enterprises", excerpt: "The rise of digital transformation across industries has made cloud solutions one of the most critical enablers of modern business", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80", date: "June 16, 2026", readTime: "15 min read", category: "Cloud Solutions" },
    { id: "interactive-3d-business-unity-studio", title: "How Businesses Are Using Interactive 3D Experiences to Improve Sales, Training & Operations with Unity Studio", excerpt: "Interactive 3D for Business – A Smarter Way to Engage Customers and Streamline Operations", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80", date: "June 16, 2026", readTime: "12 min read", category: "Interactive 3D" },
    { id: "blogb", title: "Lenovo AI Powers a World Gone Football™", excerpt: "How Lenovo's full-stack AI technology is driving the most advanced FIFA World Cup™ in history", image: "https://i.postimg.cc/c4XZj4V4/131659201.jpg", date: "June 11, 2026", readTime: "10 min read", category: "Lenovo AI" },
    { id: "bloga", title: "A Smarter Way to Document Work", excerpt: "How Adobe Acrobat, Adobe Express, and AI Assistant are transforming business documentation", image: "https://i.postimg.cc/PrX7vbNy/adobe-acrobat-logo-on-background-(1).jpg", date: "May 04, 2026", readTime: "8 min read", category: "Adobe Acrobat" },
    { id: 2, title: "Maximizing ROI with Managed IT Services", excerpt: "How businesses are reducing costs and improving efficiency by partnering with managed service providers for comprehensive IT support and strategic consulting.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80", date: "November 20, 2025", readTime: "6 min read", category: "Managed Services" },
    { id: 3, title: "Mobile Device Management Best Practices", excerpt: "Essential strategies for implementing effective MDM solutions that balance security, user experience, and organizational control across diverse device ecosystems.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80", date: "November 15, 2025", readTime: "7 min read", category: "Device Management" },
    { id: 4, title: "Cybersecurity in the Age of Remote Work", excerpt: "Addressing the evolving security challenges of distributed workforces and implementing robust protection strategies for remote and hybrid work environments.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80", date: "November 10, 2025", readTime: "9 min read", category: "Security" },
    { id: 5, title: "Sustainable IT: Environmental Responsibility in Technology", excerpt: "How organizations are adopting green IT practices, from responsible asset disposal to energy-efficient infrastructure, to reduce their environmental footprint.", image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&q=80", date: "November 5, 2025", readTime: "5 min read", category: "Sustainability" },
    { id: 6, title: "AI and Machine Learning in Business Operations", excerpt: "Practical applications of artificial intelligence and machine learning technologies that are transforming business processes and driving competitive advantage.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80", date: "October 30, 2025", readTime: "10 min read", category: "Innovation" },
    { id: 7, title: "Network Infrastructure Modernization Guide", excerpt: "A comprehensive approach to upgrading legacy network systems with modern, scalable solutions that support growing business demands and digital transformation.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80", date: "October 25, 2025", readTime: "8 min read", category: "Networking" },
    { id: 8, title: "The Rise of Global Capability Centers in India", excerpt: "Understanding the GCC boom in India and how technology partnerships are enabling multinational corporations to establish successful operations in the region.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80", date: "October 20, 2025", readTime: "7 min read", category: "Industry Insights" },
  ];

  const featuredPost = blogPosts[0];
  const postO = blogPosts.find(p => p.id === "the-hidden-technology-behind-indias-gcc-boom-why-it-infrastructure-matters") || blogPosts[0];
  const postN = blogPosts.find(p => p.id === "why-remote-engineering-teams-are-transforming-manufacturing-and-product-design") || blogPosts[1];
  const postM = blogPosts.find(p => p.id === "how-ai-powered-document-collaboration-is-transforming-modern-business-workflows") || blogPosts[2];
  const postL = blogPosts[3];
  const postK = blogPosts[4];
  const postJ = blogPosts.find(p => p.id === "how-microsoft-intune-is-helping-enterprises-secure-hybrid-work-and-simplify-endpoint-management") || blogPosts[5];
  const postI = blogPosts.find(p => p.id === "how-real-time-3d-and-xr-are-transforming-automotive-product-development") || blogPosts[6];
  const postG = blogPosts.find(p => p.id === "how-enterprises-are-using-azure-openai-to-drive-productivity-and-innovation-in-2026") || blogPosts[7];
  const postH = blogPosts.find(p => p.id === "why-businesses-are-choosing-dell-dual-monitor-setups-for-higher-productivity") || blogPosts[9];
  const postF = blogPosts.find(p => p.id === "microsoft-threat-protection-strengthening-enterprise-security") || blogPosts[8];
  const postA = blogPosts.find(p => p.id === "bloga") || blogPosts[14];
  const postB = blogPosts.find(p => p.id === "blogb") || blogPosts[13];
  const postC = blogPosts.find(p => p.id === "interactive-3d-business-unity-studio") || blogPosts[12];
  const postD = blogPosts.find(p => p.id === "blogd") || blogPosts[11];
  const postE = blogPosts.find(p => p.id === "bim-digital-twins-aec-redefined") || blogPosts[10];
  const regularPosts = blogPosts.slice(14);

  const heroRef       = useRef(null);
  const featuredRef   = useRef(null);
  const latestRef     = useRef(null);
  const newsletterRef = useRef(null);

  const heroInView       = useInView(heroRef,       { once: true, margin: "-60px" });
  const featuredInView   = useInView(featuredRef,   { once: true, margin: "-60px" });
  const latestInView     = useInView(latestRef,     { once: true, margin: "-60px" });
  const newsletterInView = useInView(newsletterRef, { once: true, margin: "-80px" });

  // ✦ GSAP: Hero heading word-stagger
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = heroHeadingRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".blog-word");
    gsap.fromTo(words,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.1, delay: 1.3 }
    );
  }, []);

  // ✦ GSAP: Featured category badge pop-in
  const badgeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!featuredInView || !badgeRef.current) return;
    gsap.fromTo(badgeRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.5 }
    );
  }, [featuredInView]);

  const marqueeTopItems    = ["Blog", "Insights", "Technology", "IT Trends", "Innovation", "Sniper Systems", "Enterprise Tech"];
  const marqueeBottomItems = ["IT Infrastructure", "Managed Services", "MDM", "Cybersecurity", "AI & ML", "Networking", "Sustainability"];

  return (
    <Layout>
      {showWhiteScreen && <WhiteScreenTransition onComplete={() => setShowWhiteScreen(false)} />}

      {/* ==================== HERO ==================== */}
      <section className="relative bg-white pt-28 sm:pt-32 pb-16 px-6 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10" ref={heroRef}>

            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              {/* eyebrow */}
              <motion.div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 mb-6"
                initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}>
                <TrendingUp className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Insights & Analysis</span>
              </motion.div>

              <h1 ref={heroHeadingRef}
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-5 leading-[1.05] tracking-tight"
                aria-label="Blog">
                {["Blog"].map((word, i) => (
                  <span key={i} className="blog-word inline-block opacity-0">{word}</span>
                ))}
              </h1>

              <motion.p className="text-lg text-gray-500 max-w-md leading-relaxed mb-8"
                initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.55 }}>
                Expert perspectives on enterprise IT, cloud infrastructure, cybersecurity, and the technologies shaping modern business.
              </motion.p>

              <motion.div className="flex flex-wrap gap-2 justify-center lg:justify-start"
                initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.7 }}>
                {["Infrastructure", "Cybersecurity", "Cloud AI", "Engineering", "Enterprise IT"].map(tag => (
                  <span key={tag} className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-400 hover:text-gray-700 transition-colors cursor-default">{tag}</span>
                ))}
              </motion.div>
            </div>

            {/* Right — Lottie */}
            <motion.div className="flex-1 flex items-center justify-center w-full max-w-sm lg:max-w-md"
              initial={{ opacity: 0, x: 30 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}>
              <LottieAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      <MarqueeTicker items={marqueeTopItems} speed={24} />

      {/* ==================== SPOTLIGHT + STACK ==================== */}
      <section className="bg-white py-16 sm:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10" ref={featuredRef}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={featuredInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Latest Stories</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">Featured articles</h2>
            </motion.div>
            <motion.a href="#all-posts"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
              initial={{ opacity: 0 }} animate={featuredInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}>
              View all <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Row 1: Hero card (left) + 3 stack cards (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 mb-12 pb-12 border-b border-gray-100">
            <HeroCard post={postO} inView={featuredInView} />
            <div className="flex flex-col justify-between gap-0">
              {[postN, postM, postL].map((post, i) => (
                <StackCard key={post.id} post={post} index={i} inView={featuredInView} />
              ))}
            </div>
          </div>

          {/* Row 2: 3-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-100">
            {[postK, postJ, postI].map((post, i) => (
              <GridCard key={post.id} post={post} index={i} inView={featuredInView} />
            ))}
          </div>

          {/* Row 3: Hero card (right) + 3 stack cards (left) */}
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 mb-12 pb-12 border-b border-gray-100">
            <div className="flex flex-col justify-between gap-0">
              {[postG, postH, postF].map((post, i) => (
                <StackCard key={post.id} post={post} index={i} inView={featuredInView} />
              ))}
            </div>
            <HeroCard post={postE} inView={featuredInView} />
          </div>

          {/* Row 4: 3-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[postD, postC, postB].map((post, i) => (
              <GridCard key={post.id} post={post} index={i} inView={featuredInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ✦ GSAP Marquee — between featured and latest */}
      <MarqueeTicker items={marqueeBottomItems} speed={30} />

      {/* ==================== ALL POSTS ==================== */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16" ref={latestRef}>
            <motion.h2
              className="text-6xl md:text-7xl font-semibold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={latestInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Latest insights
            </motion.h2>
          </div>

          <div className="space-y-0">
            {regularPosts.map((post, index) => (
              <PostRow key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}


      {/* ==================== CTA ==================== */}
      <CTASection />

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-white border-2 border-gray-900 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 z-50 shadow-lg"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight className="w-6 h-6 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Index;
