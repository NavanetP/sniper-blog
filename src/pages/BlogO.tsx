import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Bookmark,
  Heart,
  Twitter,
  Linkedin,
  Link2,
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

// ── Parallax hero image ───────────────────────────────
const HeroImage = ({ src, alt }: { src: string; alt: string }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current; const img = imgRef.current;
    if (!wrap || !img) return;
    const tween = gsap.fromTo(img, { yPercent: -6 }, {
      yPercent: 6, ease: "none",
      scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 1 },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return (
    <div ref={wrapRef} className="overflow-hidden w-full h-full">
      <img ref={imgRef} src={src} alt={alt} loading="eager" decoding="async"
        className="w-full h-full object-cover scale-110" style={{ willChange: "transform" }} />
    </div>
  );
};

// ── Share Button ──────────────────────────────────────
const ShareBtn = ({ icon: Icon, label, href }: { icon: React.ElementType; label: string; href?: string }) => (
  <a href={href ?? "#"} target={href ? "_blank" : undefined} rel="noopener noreferrer"
    aria-label={label}
    className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all duration-200">
    <Icon className="w-4 h-4" />
  </a>
);

// ── Clap button ───────────────────────────────────────
const ClapButton = () => {
  const [count, setCount] = useState(0);
  const [burst, setBurst] = useState(false);
  const handleClap = () => {
    if (count >= 50) return;
    setCount(c => c + 1); setBurst(true);
    setTimeout(() => setBurst(false), 300);
  };
  return (
    <button onClick={handleClap}
      className={`flex flex-col items-center gap-1 group transition-transform duration-150 ${burst ? "scale-125" : "scale-100"}`}
      aria-label="Clap for this article">
      <span className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${count > 0 ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 text-gray-500 group-hover:border-gray-900 group-hover:text-gray-900"}`}>
        <Heart className={`w-4 h-4 ${count > 0 ? "fill-white" : ""}`} />
      </span>
      <span className="text-xs text-gray-500 font-medium">{count > 0 ? count : ""}</span>
    </button>
  );
};

// ── Inline image with caption ─────────────────────────
const ArticleImage = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current; const img = imgRef.current;
    if (!wrap || !img) return;
    const tween = gsap.fromTo(img, { yPercent: -5 }, {
      yPercent: 5, ease: "none",
      scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 1 },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return (
    <figure className="my-10 sm:my-14">
      <div ref={wrapRef} className="overflow-hidden rounded-xl sm:rounded-2xl w-full h-56 sm:h-80 md:h-[420px]">
        <img ref={imgRef} src={src} alt={alt} loading="lazy" decoding="async"
          className="w-full h-full object-cover scale-110" style={{ willChange: "transform" }} />
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm text-gray-400 italic">{caption}</figcaption>}
    </figure>
  );
};

// ── Pull quote ────────────────────────────────────────
const PullQuote = ({ text }: { text: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.blockquote ref={ref} className="border-l-4 border-gray-900 pl-6 my-10 sm:my-14"
      initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease }}>
      <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 leading-snug italic">{text}</p>
    </motion.blockquote>
  );
};

// ── Section heading ───────────────────────────────────
const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.h2 ref={ref} className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 sm:mt-16 mb-4 sm:mb-6 leading-tight"
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease }}>
      {children}
    </motion.h2>
  );
};

// ── Body paragraph ────────────────────────────────────
const P = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.p ref={ref} className={`text-lg sm:text-xl text-gray-700 leading-relaxed mb-6 ${className}`}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease }}>
      {children}
    </motion.p>
  );
};

// ── Bullet list ───────────────────────────────────────
const BulletList = ({ items }: { items: string[] }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.ul ref={ref} className="my-6 space-y-3"
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, ease }}>
      {items.map((item, i) => (
        <motion.li key={i} className="flex items-start gap-3 text-lg sm:text-xl text-gray-700 leading-relaxed"
          initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45, ease, delay: 0.05 * i }}>
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0" />
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
};

// ── Topic tag ─────────────────────────────────────────
const TopicTag = ({ label }: { label: string }) => (
  <span className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors cursor-default">
    {label}
  </span>
);

// ── Related card ──────────────────────────────────────
const RelatedCard = ({ post }: { post: { title: string; category: string; image: string; readTime: string; author: string } }) => (
  <div className="group flex gap-4 items-start">
    <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100">
      <img src={post.image} alt={post.title} loading="lazy" decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div className="flex-1 min-w-0">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{post.category}</span>
      <h4 className="text-base font-semibold text-gray-900 leading-snug mt-1 mb-1 group-hover:underline underline-offset-2 line-clamp-2">{post.title}</h4>
      <span className="text-xs text-gray-400">{post.author} · {post.readTime}</span>
    </div>
  </div>
);

// ========================================================
// MAIN PAGE — BlogO
// ========================================================
const BlogO = () => {
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);
  const [showScrollTop,   setShowScrollTop]   = useState(false);
  const [linkCopied,      setLinkCopied]      = useState(false);

  // ── GEO ──────────────────────────────────────────────
  useEffect(() => {
    const geo: Array<[string, string]> = [
      ["geo.region", "IN"], ["geo.placename", "India"],
      ["geo.position", "20.5937;78.9629"], ["ICBM", "20.5937, 78.9629"],
    ];
    const added: HTMLMetaElement[] = [];
    geo.forEach(([name, content]) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); added.push(el); }
      el.content = content;
    });
    return () => added.forEach(el => el.remove());
  }, []);

  // ── SEO ───────────────────────────────────────────────
  useSEO({
    title: "The Hidden Technology Behind India's GCC Boom: Why IT Infrastructure Matters More Than Ever",
    description: "India's GCC landscape is evolving beyond talent. Discover why IT infrastructure, hybrid cloud, cybersecurity, AI infrastructure, and digital workplaces are becoming the biggest investments for Global Capability Centers.",
    keywords: "GCC India IT infrastructure, Global Capability Centers India, hybrid cloud GCC, AI infrastructure India, cybersecurity GCC, digital workplace GCC, Sniper Systems GCC, enterprise IT India, GCC technology investment",
    ogTitle: "The Hidden Technology Behind India's GCC Boom: Why IT Infrastructure Matters More Than Ever",
    ogDescription: "India's GCC ecosystem is evolving beyond talent. Discover why IT infrastructure, hybrid cloud, AI readiness, and cybersecurity are now the defining investments for Global Capability Centers.",
    ogImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    ogUrl: "https://sniperindia.com/blog/the-hidden-technology-behind-indias-gcc-boom-why-it-infrastructure-matters",
    canonicalUrl: "https://sniperindia.com/blog/the-hidden-technology-behind-indias-gcc-boom-why-it-infrastructure-matters",
    twitterTitle: "The Hidden Technology Behind India's GCC Boom: Why IT Infrastructure Matters More Than Ever",
    twitterDescription: "Behind every successful GCC in India is something less visible but equally important: the technology infrastructure that keeps the business running.",
    twitterImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
  });

  // ── Scroll handlers ────────────────────────────────────
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setShowScrollTop(window.scrollY > 400); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  // ── Reading progress ───────────────────────────────────
  const articleRef = useRef<HTMLDivElement>(null);
  const [readPct, setReadPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current; if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const pct = Math.min(100, Math.max(0, Math.round((-top / (height - window.innerHeight)) * 100)));
      setReadPct(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const BLOG_URL = "https://sniperindia.com/blog/the-hidden-technology-behind-indias-gcc-boom-why-it-infrastructure-matters";

  const relatedPosts = [
    { title: "How Microsoft Intune Is Helping Enterprises Secure Hybrid Work and Simplify Endpoint Management", category: "Endpoint Security", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80", readTime: "9 min read", author: "Sniper Systems" },
    { title: "How Enterprises Are Using Azure OpenAI to Drive Productivity and Innovation in 2026", category: "Cloud AI", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80", readTime: "11 min read", author: "Sniper Systems" },
    { title: "Microsoft Threat Protection: Strengthening Enterprise Security Against Modern Cyber Threats", category: "Cybersecurity", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80", readTime: "9 min read", author: "Sniper Systems" },
  ];

  return (
    <Layout>
      {showWhiteScreen && <WhiteScreenTransition onComplete={() => setShowWhiteScreen(false)} />}

      {/* ── Reading progress bar ─────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gray-100">
        <motion.div className="h-full bg-gray-900"
          style={{ scaleX: readPct / 100, transformOrigin: "left" }}
          transition={{ duration: 0.1 }} />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-24 sm:pt-28 pb-0 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">

          {/* Category pill + read time */}
          <motion.div className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.9 }}>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-200 rounded-full px-3 py-1">
              Enterprise IT &amp; GCC
            </span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400">10 min read</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.05 }}>
            The Hidden Technology Behind India's GCC Boom: Why IT Infrastructure Is Becoming the Biggest Investment
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="text-xl sm:text-2xl text-gray-500 font-normal leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 1.2 }}>
            Behind every successful GCC is something far less visible but equally important — the technology infrastructure that keeps the business running.
          </motion.p>

          {/* Author row */}
          <motion.div className="flex items-center justify-between pb-6 border-b border-gray-200"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease, delay: 1.35 }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">JB</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Jahara Bee</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Sniper Systems &amp; Solutions</span>
                  <span>·</span>
                  <span>July 20, 2026</span>
                  <span>·</span>
                  <span>10 min read</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShareBtn icon={Twitter}  label="Share on Twitter"  href={`https://twitter.com/intent/tweet?url=${BLOG_URL}`} />
              <ShareBtn icon={Linkedin} label="Share on LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${BLOG_URL}`} />
              <ShareBtn icon={Bookmark} label="Bookmark" />
            </div>
          </motion.div>
        </div>

        {/* Hero image — full-bleed */}
        <motion.div className="mt-8 w-full h-64 sm:h-96 md:h-[520px] overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.3 }}>
          <HeroImage
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt="India GCC IT infrastructure investment boom" />
        </motion.div>
        <p className="text-center text-sm text-gray-400 italic mt-3 px-5">
          Modern GCCs in India require IT infrastructure that is secure, scalable, and AI-ready.
        </p>
      </section>

      {/* ── Article body — part 1 ────────────────────────────────────────── */}
      <article ref={articleRef} className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-14">

        {/* Side actions (desktop) */}
        <div className="hidden lg:flex flex-col items-center gap-4 sticky top-1/3 float-left -ml-24 w-16 mb-0">
          <ClapButton />
          <button onClick={copyLink} aria-label="Copy link" className="flex flex-col items-center gap-1 group">
            <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-200 text-gray-400 group-hover:border-gray-900 group-hover:text-gray-900 transition-all duration-200">
              <Link2 className="w-4 h-4" />
            </span>
            <span className="text-xs text-gray-400">{linkCopied ? "Copied!" : ""}</span>
          </button>
          <ShareBtn icon={Twitter}  label="Twitter"  href={`https://twitter.com/intent/tweet?url=${BLOG_URL}`} />
          <ShareBtn icon={Linkedin} label="LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${BLOG_URL}`} />
        </div>

        {/* Intro */}
        <P>India has firmly established itself as one of the world's leading destinations for Global Capability Centers (GCCs). Over the past few years, multinational organisations have expanded their presence across Bengaluru, Chennai, Hyderabad, Pune, and Gurugram — not only to access skilled professionals but also to accelerate innovation, product engineering, AI development, cybersecurity, and digital transformation.</P>
        <P>Most headlines highlight hiring numbers and billion-dollar investments. Yet, behind every successful GCC is something far less visible but equally important: the technology infrastructure that keeps the business running.</P>
        <P>Today's GCCs are expected to deliver business outcomes, support global operations, and adopt emerging technologies such as artificial intelligence. Achieving these goals requires more than a talented workforce — it demands an IT foundation that is secure, scalable, and built for continuous innovation.</P>

        <SectionHeading>Why IT Infrastructure Has Become a Strategic Business Investment</SectionHeading>
        <P>The role of infrastructure has changed significantly. A decade ago, IT infrastructure was viewed primarily as a support function. Today, it is a strategic investment that directly influences business agility, operational resilience, employee productivity, and AI readiness.</P>
        <P>Modern GCCs rely on technology to connect distributed teams, manage enterprise applications, protect business data, and deliver seamless collaboration across global locations. Without the right infrastructure, organisations often experience slower application performance, fragmented collaboration, rising security risks, and increasing operational costs.</P>

        <PullQuote text="Infrastructure is now discussed in boardrooms — not just server rooms." />

        <ArticleImage
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
          alt="Hybrid cloud infrastructure for GCC organisations in India"
          caption="Hybrid cloud has become the preferred architecture for GCCs seeking long-term flexibility and resilience." />
      </article>

      {/* ── Five Priorities — dark panel ─────────────────────────────────── */}
      <section className="bg-gray-950 text-white py-14 sm:py-20 px-5 sm:px-6 mx-3 sm:mx-6 rounded-2xl sm:rounded-3xl my-8 sm:my-12">
        <div className="max-w-3xl mx-auto">
          <motion.p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            Five Technology Priorities
          </motion.p>
          <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 leading-tight"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}>
            What Modern GCCs Are Investing In
          </motion.h2>
          <div className="space-y-0">
            {[
              { label: "Hybrid Cloud", body: "Hybrid cloud enables organisations to combine the flexibility of public cloud platforms like Microsoft Azure and AWS with the control of on-premises environments — deploying applications faster, improving disaster recovery, optimising costs, and scaling operations without disrupting business continuity." },
              { label: "AI-Ready Infrastructure", body: "AI is now integrated into software development, customer support, analytics, finance, and cybersecurity. Supporting these workloads requires modern servers, scalable storage, high-performance computing, and reliable data management. Organisations investing in AI-ready infrastructure today are better positioned to adopt new technologies and accelerate innovation." },
              { label: "Cybersecurity by Design", body: "As GCCs manage sensitive enterprise data and critical business operations, cybersecurity has become a core business priority. Leading organisations embed security into every layer through Zero Trust principles, endpoint protection, identity management, secure networking, and continuous monitoring — reducing business risk while supporting compliance." },
              { label: "Digital Workplace", body: "Modern professionals expect secure access to business applications from anywhere, seamless collaboration across teams, and consistent digital experiences. Digital workplace solutions — including collaboration platforms, endpoint management, and intelligent document workflows — enable employees to work more efficiently while maintaining enterprise-grade security." },
              { label: "Managed IT Services", body: "Many organisations are partnering with experienced managed service providers to monitor infrastructure, optimise cloud environments, strengthen security, and ensure business continuity. This approach allows internal IT teams to focus on innovation instead of day-to-day infrastructure management." },
            ].map((item, i) => (
              <motion.div key={i}
                className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-3 sm:gap-8 py-7 border-b border-gray-800 last:border-b-0"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.07 }}>
                <p className="text-sm font-bold text-white uppercase tracking-wide">{item.label}</p>
                <p className="text-base text-gray-400 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Article body — part 2 ────────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-5 sm:px-6 pb-10 sm:pb-14">

        <SectionHeading>The Real Competitive Advantage Isn't Technology Alone</SectionHeading>
        <P>Successful GCCs are not defined by the number of technologies they deploy — they are defined by how well those technologies work together. Cloud, networking, servers, storage, cybersecurity, and collaboration platforms must operate as a unified ecosystem that supports business objectives.</P>
        <P>Organisations that plan their infrastructure strategically can respond faster to market changes, support AI adoption, improve employee productivity, and deliver better experiences for customers and stakeholders. In today's enterprise landscape, IT infrastructure has become a growth enabler rather than simply an operational necessity.</P>

        <ArticleImage
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80"
          alt="Enterprise server and storage infrastructure for GCC India"
          caption="Integrated infrastructure — from servers to cloud — is what separates high-performing GCCs from the rest." />

        <SectionHeading>How Sniper India Supports Modern Enterprise Infrastructure</SectionHeading>
        <P>As organisations expand their Global Capability Centers, they need technology partners who understand both business priorities and enterprise IT complexity. Sniper Systems &amp; Solutions helps organisations design and implement secure, scalable, and future-ready IT environments.</P>

        <BulletList items={[
          "Enterprise IT Infrastructure Solutions",
          "Hybrid Cloud Solutions (Microsoft Azure & AWS)",
          "AI Infrastructure",
          "Server & Storage Solutions",
          "Enterprise Networking",
          "Cybersecurity Solutions",
          "Digital Workplace Solutions",
          "Managed IT Services",
        ]} />

        <P>By combining consulting, implementation, deployment, and ongoing support, Sniper India enables enterprises to build resilient technology environments that support innovation and long-term business growth.</P>

        <PullQuote text="Organisations investing in modern IT infrastructure today are creating a foundation that supports AI adoption, strengthens cybersecurity, enables hybrid work, and accelerates digital transformation." />

        <SectionHeading>Conclusion</SectionHeading>
        <P>India's GCC ecosystem is entering a new phase of growth. While talent remains a key differentiator, the next wave of success will be driven by the technology that empowers those teams to innovate.</P>
        <P>As GCCs continue to evolve into global innovation hubs, infrastructure will play a defining role in determining which organisations lead — and which struggle to keep pace.</P>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-200">
          {["GCC India", "IT Infrastructure", "Hybrid Cloud", "AI Infrastructure", "Cybersecurity", "Digital Workplace", "Sniper Systems"].map(tag => (
            <TopicTag key={tag} label={tag} />
          ))}
        </div>

        {/* Mobile share row */}
        <div className="flex items-center gap-5 mt-8 pt-6 border-t border-gray-200 lg:hidden">
          <ClapButton />
          <button onClick={copyLink} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <Link2 className="w-4 h-4" />
            {linkCopied ? "Link copied!" : "Copy link"}
          </button>
          <ShareBtn icon={Twitter}  label="Twitter"  href={`https://twitter.com/intent/tweet?url=${BLOG_URL}`} />
          <ShareBtn icon={Linkedin} label="LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${BLOG_URL}`} />
        </div>

        {/* Author card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-gray-200 bg-gray-50">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg font-bold">JB</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-0.5 uppercase tracking-wider font-semibold">Written by</p>
              <h3 className="text-xl font-bold text-gray-900">Jahara Bee</h3>
            </div>
          </div>
        </div>
      </article>

      {/* ── More from Sniper Systems ─────────────────────────────────────── */}
      <section className="border-t border-gray-200 py-14 sm:py-20 px-5 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.h2 className="text-2xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}>
            More from Sniper Systems
          </motion.h2>
          <div className="space-y-6">
            {relatedPosts.map((post, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: i * 0.08 }}>
                <RelatedCard post={post} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-gray-950 text-white py-16 sm:py-20 px-5 sm:px-6 mx-3 sm:mx-6 rounded-2xl sm:rounded-3xl mb-10 sm:mb-14">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}>
            Ready to build your GCC's technology foundation?
          </motion.h2>
          <motion.p className="text-gray-400 text-lg mb-8 leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}>
            Talk to our team about enterprise IT infrastructure, hybrid cloud, cybersecurity, and managed IT services for your Global Capability Center.
          </motion.p>
          <motion.a href="https://sniperindia.com/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white rounded-full text-white font-semibold text-base hover:bg-white hover:text-gray-900 transition-colors duration-300"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.35 }}>
            GET IN TOUCH <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      {/* ── Scroll to top ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-11 h-11 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-200 z-50 shadow-lg"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <ArrowRight className="w-4 h-4 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default BlogO;
