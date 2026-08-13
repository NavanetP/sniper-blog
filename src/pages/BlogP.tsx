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
// MAIN PAGE — BlogP
// ========================================================
const BlogP = () => {
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
    title: "Microsoft Security Copilot: The Future of AI-Powered Enterprise Cybersecurity in 2026",
    description: "Discover how Microsoft Security Copilot uses generative AI to help enterprises investigate threats faster, improve analyst productivity, and strengthen security operations in 2026.",
    keywords: "Microsoft Security Copilot India, AI cybersecurity enterprise, Security Copilot 2026, Microsoft Defender AI, SOC automation India, generative AI security, Microsoft Sentinel Copilot, enterprise cybersecurity AI, Sniper Systems Microsoft security",
    ogTitle: "Microsoft Security Copilot: The Future of AI-Powered Enterprise Cybersecurity in 2026",
    ogDescription: "Learn how Microsoft Security Copilot is reshaping enterprise Security Operations Centers with generative AI, faster threat investigations, and analyst augmentation.",
    ogImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80",
    ogUrl: "https://sniperindia.com/blog/microsoft-security-copilot-ai-powered-enterprise-cybersecurity-2026",
    canonicalUrl: "https://sniperindia.com/blog/microsoft-security-copilot-ai-powered-enterprise-cybersecurity-2026",
    twitterTitle: "Microsoft Security Copilot: The Future of AI-Powered Enterprise Cybersecurity in 2026",
    twitterDescription: "AI is reshaping enterprise cybersecurity. Explore how Microsoft Security Copilot helps SOC teams investigate faster and respond smarter.",
    twitterImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80",
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

  const BLOG_URL = "https://sniperindia.com/blog/microsoft-security-copilot-ai-powered-enterprise-cybersecurity-2026";

  const relatedPosts = [
    { title: "Microsoft Threat Protection: Strengthening Enterprise Security Against Modern Cyber Threats", category: "Cybersecurity", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80", readTime: "9 min read", author: "Sniper Systems" },
    { title: "How Microsoft Intune Is Helping Enterprises Secure Hybrid Work and Simplify Endpoint Management", category: "Endpoint Security", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80", readTime: "9 min read", author: "Sniper Systems" },
    { title: "How Enterprises Are Using Azure OpenAI to Drive Productivity and Innovation in 2026", category: "Cloud AI", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80", readTime: "11 min read", author: "Sniper Systems" },
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
              Cybersecurity &amp; AI
            </span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400">10 min read</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.05 }}>
            Microsoft Security Copilot: The Future of AI-Powered Enterprise Cybersecurity in 2026
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="text-xl sm:text-2xl text-gray-500 font-normal leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 1.2 }}>
            Security teams are overwhelmed by alerts, outpaced by automation, and fighting AI-assisted threats. Microsoft Security Copilot changes the equation.
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
                  <span>August 13, 2026</span>
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
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80"
            alt="Microsoft Security Copilot AI-powered enterprise cybersecurity 2026" />
        </motion.div>
        <p className="text-center text-sm text-gray-400 italic mt-3 px-5">
          Microsoft Security Copilot combines generative AI with Microsoft's threat intelligence to help enterprises respond faster.
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
        <P>Cyberattacks are becoming more sophisticated, faster, and increasingly driven by automation. Modern enterprises are no longer defending against isolated threats — they face ransomware, phishing campaigns, identity attacks, insider risks, and AI-assisted cybercrime on a daily basis.</P>
        <P>For Security Operations Centers, this creates a fundamental challenge: how can security teams investigate and respond to threats at the speed required by today's threat landscape? Adding more analysts is no longer enough. Organisations need technology that can help security teams process vast amounts of security data, identify high-priority risks, and recommend response actions in real time.</P>
        <P>This is where <strong>Microsoft Security Copilot</strong> is reshaping enterprise cybersecurity. Powered by generative AI and deeply integrated with Microsoft's security ecosystem, Security Copilot helps security professionals investigate incidents faster, automate repetitive tasks, and improve decision-making — without replacing human expertise.</P>

        <SectionHeading>Why AI Is Becoming Essential for Modern Security Operations</SectionHeading>
        <P>Security teams are overwhelmed by the growing volume of alerts generated across endpoints, identities, cloud workloads, email, and enterprise networks. Many alerts are false positives, while genuine threats often require analysts to collect data from multiple security tools before making informed decisions.</P>
        <P>As organisations expand cloud environments, adopt hybrid work, and connect more business applications, security complexity continues to increase. AI-powered security platforms help address these challenges by:</P>

        <BulletList items={[
          "Prioritizing high-risk alerts",
          "Correlating data across multiple security products",
          "Summarizing security incidents",
          "Accelerating threat investigations",
          "Recommending remediation steps",
          "Improving analyst productivity",
        ]} />

        <P>Rather than replacing security professionals, AI enables them to focus on higher-value investigations and strategic security initiatives.</P>

        <PullQuote text="The question is no longer whether to adopt AI-assisted security — but how quickly organisations can build the foundation to support it." />

        <ArticleImage
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
          alt="Enterprise Security Operations Center with AI-powered threat monitoring"
          caption="Modern SOCs need AI to keep pace with the volume and sophistication of today's cyber threats." />

        <SectionHeading>What Is Microsoft Security Copilot?</SectionHeading>
        <P>Microsoft Security Copilot is an AI-powered security assistant designed to help organisations protect their environments by combining generative AI with Microsoft's security intelligence. It works alongside Microsoft's security portfolio to enhance existing security operations — not replace the technologies organisations have already deployed.</P>
        <P>Microsoft positions Security Copilot around four core themes: an overview of the platform, business value for enterprise customers, partner opportunities to deliver Security Copilot solutions, and resources to begin the Security Copilot journey. The platform helps partners deliver more effective and efficient security by embedding generative AI within existing Microsoft security environments.</P>
      </article>

      {/* ── Four Capabilities — dark panel ───────────────────────────────── */}
      <section className="bg-gray-950 text-white py-14 sm:py-20 px-5 sm:px-6 mx-3 sm:mx-6 rounded-2xl sm:rounded-3xl my-8 sm:my-12">
        <div className="max-w-3xl mx-auto">
          <motion.p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            Key Capabilities
          </motion.p>
          <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 leading-tight"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}>
            How Security Copilot Improves Enterprise Security
          </motion.h2>
          <div className="space-y-0">
            {[
              {
                label: "Faster Threat Investigation",
                body: "Security analysts spend significant time gathering information from multiple sources before understanding an incident. Security Copilot helps summarize complex investigations, reducing the time required to understand attack patterns and identify the root cause of a security event.",
              },
              {
                label: "AI-Assisted Incident Response",
                body: "Security teams receive contextual recommendations that support faster and more consistent response actions. This helps reduce response times while maintaining analyst oversight — ensuring that humans remain central to every critical security decision.",
              },
              {
                label: "Improved Analyst Productivity",
                body: "Routine security tasks such as analyzing alerts, reviewing logs, and creating investigation summaries can be completed more efficiently. By reducing manual effort, analysts can dedicate more time to strategic security initiatives and proactive threat hunting.",
              },
              {
                label: "Better Collaboration",
                body: "Security investigations often involve SOC analysts, IT administrators, compliance teams, and business stakeholders. AI-generated summaries help improve communication and ensure teams work from consistent information during incident response — across every level of the organisation.",
              },
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

        <SectionHeading>Business Benefits of Microsoft Security Copilot</SectionHeading>
        <P>For enterprise organisations, adopting AI-powered security delivers measurable operational advantages. Organisations that integrate Security Copilot into their security operations report improvements across key metrics:</P>

        <BulletList items={[
          "Faster detection of cyber threats",
          "Reduced incident response time",
          "Improved Security Operations Center efficiency",
          "Better visibility across enterprise environments",
          "Enhanced analyst productivity",
          "Consistent security investigation workflows",
          "Stronger support for Microsoft's integrated security ecosystem",
        ]} />

        <P>These outcomes align with the increasing demand for intelligent security platforms that can scale with modern enterprise environments — without requiring proportional increases in headcount.</P>

        <ArticleImage
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80"
          alt="Enterprise security team reviewing AI-assisted threat analysis"
          caption="Security Copilot helps analysts stay ahead of threats by surfacing insights across the entire Microsoft security stack." />

        <SectionHeading>Security Copilot Within the Microsoft Security Ecosystem</SectionHeading>
        <P>One of the strengths of Security Copilot is its ability to complement existing Microsoft security technologies. Organisations already using solutions such as Microsoft Defender, Microsoft Sentinel, Microsoft Entra, Microsoft Intune, and Microsoft Purview can extend their security operations with AI-powered insights while continuing to leverage their existing Microsoft investments.</P>
        <P>This integrated approach helps enterprises reduce tool fragmentation, improve signal correlation across security products, and deliver a more unified security operations experience. Rather than introducing a standalone AI tool, Security Copilot works within the environment organisations already trust.</P>

        <PullQuote text="Security Copilot doesn't replace your security stack — it makes everything in it smarter." />

        <SectionHeading>What This Means for Enterprise IT Leaders</SectionHeading>
        <P>For CIOs, CISOs, and IT managers, Security Copilot is more than a new AI feature. It represents a shift in how security operations are conducted. Instead of asking security teams to manually analyse increasing volumes of alerts, organisations can use AI to augment human expertise, accelerate investigations, and strengthen decision-making.</P>
        <P>As cyber threats continue to evolve, enterprises that combine skilled analysts with AI-powered security tools will be better positioned to protect business-critical assets while improving operational efficiency. The organisations that build this foundation today will be significantly better prepared for tomorrow's threat landscape.</P>

        <SectionHeading>How Sniper Systems Helps Organisations Modernise Microsoft Security</SectionHeading>
        <P>As a <a href="https://www.sniperindia.com/partners/microsoft/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Microsoft Solutions Partner</a>, Sniper Systems &amp; Solutions helps organisations implement modern Microsoft security technologies that strengthen enterprise cyber resilience. Our Microsoft security services include:</P>

        <BulletList items={[
          "Microsoft Security Copilot adoption guidance",
          "Microsoft Defender solutions",
          "Microsoft Intune deployment",
          "Microsoft Entra identity management",
          "Microsoft Purview implementation",
          "Endpoint management",
          "Enterprise cybersecurity consulting",
        ]} />

        <P>By helping organisations integrate Microsoft's security ecosystem, Sniper enables businesses to build intelligent, AI-assisted security operations aligned with modern enterprise requirements.</P>

        <SectionHeading>Conclusion</SectionHeading>
        <P>The future of enterprise cybersecurity will rely on the combination of human expertise and AI-powered intelligence. Microsoft Security Copilot demonstrates how generative AI can help organisations investigate threats faster, improve analyst productivity, and strengthen security operations without replacing the critical role of security professionals.</P>
        <P>For enterprises already investing in the Microsoft ecosystem, Security Copilot represents an opportunity to modernise security operations, improve resilience, and respond to threats with greater speed and confidence. As AI continues to reshape cybersecurity, organisations that adopt intelligent security platforms today will be better prepared for tomorrow's threat landscape.</P>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-200">
          {["Microsoft Security Copilot", "AI Cybersecurity", "Enterprise SOC", "Microsoft Defender", "Microsoft Sentinel", "Zero Trust", "Sniper Systems"].map(tag => (
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
            Ready to strengthen your security with AI?
          </motion.h2>
          <motion.p className="text-gray-400 text-lg mb-8 leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}>
            Talk to our team about Microsoft Security Copilot adoption, Defender solutions, and AI-powered cybersecurity for your organisation.
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

export default BlogP;
