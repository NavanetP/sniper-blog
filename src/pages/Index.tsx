import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, ArrowUpRight, Calendar, Clock, Mail, User,
} from "lucide-react";
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────────────────
// TEAM AUTHORS
// ─────────────────────────────────────────────────────────
const TEAM_MEMBERS = [
  { name: "Jahara Bee",     avatar: "from-rose-400 to-pink-500" },
  { name: "Praveena",       avatar: "from-violet-400 to-indigo-500" },
  { name: "Quency Wilfrada",avatar: "from-amber-400 to-orange-500" },
  { name: "Wishways",       avatar: "from-sky-400 to-blue-500" },
];

const assignAuthors = (posts: any[]) => {
  const total = posts.length;
  const jaharaQ = Math.ceil(total * 0.4);
  const otherQ  = Math.floor((total - jaharaQ) / 3);
  const counts: Record<string, number> = {};
  TEAM_MEMBERS.forEach(m => (counts[m.name] = 0));
  return posts.map(post => {
    const weights = [40, 22, 19, 19];
    const sum = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * sum;
    let author = TEAM_MEMBERS[0];
    for (let i = 0; i < TEAM_MEMBERS.length; i++) {
      r -= weights[i];
      if (r <= 0) { author = TEAM_MEMBERS[i]; break; }
    }
    const quota = author.name === "Jahara Bee" ? jaharaQ : otherQ;
    if (counts[author.name] >= quota) {
      const rem = TEAM_MEMBERS.filter(m => counts[m.name] < (m.name === "Jahara Bee" ? jaharaQ : otherQ));
      if (rem.length) author = rem[Math.floor(Math.random() * rem.length)];
    }
    counts[author.name]++;
    return { ...post, author: author.name, avatar: author.avatar };
  });
};

// ─────────────────────────────────────────────────────────
// ALL BLOG POSTS
// ─────────────────────────────────────────────────────────
const RAW_POSTS = [
  { id: "enterprise-apple-device-deployment-guide",                                               title: "How to Deploy Apple Devices at Scale in an Enterprise: A Complete Guide",                                  excerpt: "From procurement and Apple Business to MDM, Automated Device Enrollment, user onboarding and lifecycle management.",                                                      image: "/blog/apple-enterprise-devices.png",                                                                      date: "Aug 13, 2026", readTime: "14 min", category: "Apple Deployment" },
  { id: "ai-engineering-data-management-autodesk-vault-manufacturing",                            title: "AI in Engineering Data Management: How Autodesk Vault Is Changing Manufacturing Workflows",              excerpt: "Autodesk Vault 2027.1 and AI-powered PDM are transforming engineering data management — faster access, less repetitive work and connected workflows.",                   image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=900&q=80",                                date: "Aug 13, 2026", readTime: "11 min", category: "Engineering Data" },
  { id: "gcc-it-infrastructure-ai-ready-operations-india",                                        title: "From GCC Setup to AI-Ready Operations: Why India's GCCs Need a New IT Infrastructure Strategy",          excerpt: "India's GCCs are taking ownership of AI and product engineering. IT infrastructure strategy must evolve alongside that expanding mandate.",                             image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",                                date: "Aug 13, 2026", readTime: "12 min", category: "GCC Infrastructure" },
  { id: "digital-twins-manufacturing-ai-real-time-3d-intelligent-factory",                        title: "Digital Twins in Manufacturing: How AI and Real-Time 3D Are Creating the Intelligent Factory",           excerpt: "The next generation of industrial digital twins connects live machine data, AI and real-time 3D in a single environment.",                                               image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=80",                                date: "Aug 13, 2026", readTime: "11 min", category: "Digital Manufacturing" },
  { id: "it-asset-buyback-recover-value-protect-data",                                            title: "Don't Just Dispose: How IT Asset Buyback Helps Businesses Recover Value and Protect Data",               excerpt: "Retired IT assets hold financial value, data-security risks and e-waste responsibilities. A structured buyback programme addresses all three.",                           image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",                                date: "Aug 13, 2026", readTime: "9 min",  category: "IT Asset Management" },
  { id: "microsoft-security-copilot-ai-powered-enterprise-cybersecurity-2026",                    title: "Microsoft Security Copilot: The Future of AI-Powered Enterprise Cybersecurity in 2026",                  excerpt: "How Microsoft Security Copilot uses generative AI to help enterprises investigate threats faster and strengthen security operations.",                                   image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80",                                    date: "Aug 13, 2026", readTime: "10 min", category: "Cybersecurity" },
  { id: "the-hidden-technology-behind-indias-gcc-boom-why-it-infrastructure-matters",             title: "The Hidden Technology Behind India's GCC Boom: Why IT Infrastructure Is the Biggest Investment",         excerpt: "India's GCC landscape is evolving beyond talent. IT infrastructure, hybrid cloud, cybersecurity and AI readiness are the defining investments.",                        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",                                date: "Jul 20, 2026", readTime: "10 min", category: "Enterprise IT" },
  { id: "why-remote-engineering-teams-are-transforming-manufacturing-and-product-design",         title: "Why Remote Engineering Teams Are Transforming Manufacturing and Product Design",                          excerpt: "Secure remote workstations, GPU-powered collaboration and enterprise IT infrastructure are enabling distributed engineering at scale.",                                  image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=80",                                date: "Jul 18, 2026", readTime: "9 min",  category: "Engineering" },
  { id: "how-ai-powered-document-collaboration-is-transforming-modern-business-workflows",        title: "How AI-Powered Document Collaboration Is Transforming Modern Business Workflows",                         excerpt: "Adobe Document Cloud, Adobe Acrobat and AI Assistant help enterprises build smarter document workflows that improve collaboration and productivity.",                    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=900&q=80",                                date: "Jul 15, 2026", readTime: "9 min",  category: "Document AI" },
  { id: "why-ai-is-reshaping-enterprise-server-and-storage-infrastructure",                       title: "Why AI Is Reshaping Enterprise Server and Storage Infrastructure",                                        excerpt: "GPU compute, high-performance NVMe storage and hybrid cloud strategies are reshaping modern enterprise data centres.",                                                  image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",                                    date: "Jul 15, 2026", readTime: "8 min",  category: "Infrastructure" },
  { id: "how-real-time-3d-and-xr-are-transforming-automotive-product-development-unity",          title: "How Real-Time 3D and XR Are Transforming Automotive Product Development",                                 excerpt: "Real-Time 3D, Extended Reality and digital twins are helping automotive manufacturers accelerate product development and reduce engineering costs.",                      image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=900&q=80",                                date: "Jul 15, 2026", readTime: "10 min", category: "Automotive XR" },
  { id: "how-microsoft-intune-is-helping-enterprises-secure-hybrid-work-and-simplify-endpoint-management", title: "How Microsoft Intune Is Helping Enterprises Secure Hybrid Work and Simplify Endpoint Management", excerpt: "Microsoft Intune enables enterprises to secure hybrid work, simplify endpoint management and support Zero Trust across all devices.",                               image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80",                                date: "Jul 2, 2026",  readTime: "9 min",  category: "Endpoint Security" },
  { id: "how-real-time-3d-and-xr-are-transforming-automotive-product-development",                title: "How Real-Time 3D and XR Are Transforming Automotive Product Development",                                 excerpt: "Real-Time 3D, Extended Reality and digital twins are helping automotive manufacturers accelerate product development and reduce engineering costs.",                      image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=900&q=80",                                date: "Jul 2, 2026",  readTime: "10 min", category: "Automotive XR" },
  { id: "how-enterprises-are-using-azure-openai-to-drive-productivity-and-innovation-in-2026",    title: "How Enterprises Are Using Azure OpenAI to Drive Productivity and Innovation in 2026",                    excerpt: "Leading enterprises are shifting from basic chatbots to autonomous agentic AI and robust governance on Azure OpenAI in 2026.",                                          image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&q=80",                                date: "Jun 25, 2026", readTime: "11 min", category: "Cloud AI" },
  { id: "microsoft-threat-protection-strengthening-enterprise-security",                          title: "Microsoft Threat Protection: Strengthening Enterprise Security Against Modern Cyber Threats",             excerpt: "How Microsoft Threat Protection brings identity, endpoint, email, cloud and data signals together for faster detection and response.",                                  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",                                date: "Jun 22, 2026", readTime: "9 min",  category: "Cybersecurity" },
  { id: "why-businesses-are-choosing-dell-dual-monitor-setups-for-higher-productivity",           title: "Beyond Bigger Screens: Why Dual Monitor Setups Are Becoming a Business Standard",                        excerpt: "Why enterprises across India are adopting Dell dual monitor setups to improve productivity, collaboration and employee experience.",                                     image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&q=80",                                date: "Jul 2, 2026",  readTime: "9 min",  category: "Workplace IT" },
  { id: "bim-digital-twins-aec-redefined",                                                        title: "How BIM and Digital Twins Are Redefining Project Delivery and Asset Management in AEC",                   excerpt: "BIM and Digital Twin technologies are transforming AEC project delivery, collaboration and asset lifecycle management using Autodesk solutions.",                        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",                                date: "Jun 16, 2026", readTime: "14 min", category: "AEC & BIM" },
  { id: "blogd",                                                                                   title: "The Future of Business Transformation: How Cloud Solutions Are Empowering Indian Enterprises",           excerpt: "The rise of digital transformation across industries has made cloud solutions one of the most critical enablers of modern business.",                                    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80",                                date: "Jun 16, 2026", readTime: "15 min", category: "Cloud Solutions" },
  { id: "interactive-3d-business-unity-studio",                                                   title: "How Businesses Are Using Interactive 3D Experiences to Improve Sales, Training & Operations",            excerpt: "Interactive 3D for Business — a smarter way to engage customers and streamline operations with Unity Studio.",                                                          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80",                                    date: "Jun 16, 2026", readTime: "12 min", category: "Interactive 3D" },
  { id: "blogb",                                                                                   title: "Lenovo AI Powers a World Gone Football™",                                                                  excerpt: "How Lenovo's full-stack AI technology is driving the most advanced FIFA World Cup™ in history.",                                                                        image: "https://i.postimg.cc/c4XZj4V4/131659201.jpg",                                                            date: "Jun 11, 2026", readTime: "10 min", category: "Lenovo AI" },
  { id: "bloga",                                                                                   title: "A Smarter Way to Document Work",                                                                           excerpt: "How Adobe Acrobat, Adobe Express and AI Assistant are transforming business documentation.",                                                                            image: "https://i.postimg.cc/PrX7vbNy/adobe-acrobat-logo-on-background-(1).jpg",                                date: "May 4, 2026",  readTime: "8 min",  category: "Adobe Acrobat" },
  { id: "2",                                                                                       title: "Maximizing ROI with Managed IT Services",                                                                   excerpt: "How businesses are reducing costs and improving efficiency by partnering with managed service providers for comprehensive IT support.",                                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",                                date: "Nov 20, 2025", readTime: "6 min",  category: "Managed Services" },
  { id: "3",                                                                                       title: "Mobile Device Management Best Practices",                                                                   excerpt: "Essential strategies for implementing effective MDM solutions that balance security, user experience and organisational control.",                                        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80",                                date: "Nov 15, 2025", readTime: "7 min",  category: "Device Management" },
  { id: "4",                                                                                       title: "Cybersecurity in the Age of Remote Work",                                                                   excerpt: "Addressing the evolving security challenges of distributed workforces and implementing robust protection strategies for hybrid environments.",                           image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80",                                    date: "Nov 10, 2025", readTime: "9 min",  category: "Security" },
  { id: "5",                                                                                       title: "Sustainable IT: Environmental Responsibility in Technology",                                               excerpt: "How organisations are adopting green IT practices — from responsible asset disposal to energy-efficient infrastructure.",                                                image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=900&q=80",                                date: "Nov 5, 2025",  readTime: "5 min",  category: "Sustainability" },
  { id: "6",                                                                                       title: "AI and Machine Learning in Business Operations",                                                            excerpt: "Practical applications of AI and machine learning that are transforming business processes and driving competitive advantage.",                                          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80",                                date: "Oct 30, 2025", readTime: "10 min", category: "Innovation" },
  { id: "7",                                                                                       title: "Network Infrastructure Modernization Guide",                                                               excerpt: "A comprehensive approach to upgrading legacy network systems with modern, scalable solutions that support digital transformation.",                                       image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",                                    date: "Oct 25, 2025", readTime: "8 min",  category: "Networking" },
  { id: "8",                                                                                       title: "The Rise of Global Capability Centers in India",                                                            excerpt: "Understanding the GCC boom in India and how technology partnerships are enabling multinational corporations to establish successful operations.",                         image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",                                date: "Oct 20, 2025", readTime: "7 min",  category: "Industry Insights" },
];

// Unique categories for filter tabs
const ALL_CATEGORIES = ["All", ...Array.from(new Set(RAW_POSTS.map(p => p.category)))];

// ─────────────────────────────────────────────────────────
// READING PROGRESS
// ─────────────────────────────────────────────────────────
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#1d1d1f] z-[9999] origin-left pointer-events-none"
    />
  );
};

// ─────────────────────────────────────────────────────────
// WHITE CURTAIN
// ─────────────────────────────────────────────────────────
const WhiteScreenTransition = ({ onComplete }: { onComplete: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(ref.current, { yPercent: -105, duration: 0.9, ease: "power3.inOut", delay: 0.25, onComplete });
  }, []);
  return <div ref={ref} className="fixed inset-0 bg-white z-[9998] will-change-transform" />;
};

// ─────────────────────────────────────────────────────────
// FADE UP
// ─────────────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay }}>
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────
// FEATURED CARD — Prismic-style wide card (image left, meta right)
// ─────────────────────────────────────────────────────────
const FeaturedCard = ({ post }: { post: any }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.a
      ref={ref}
      href={`/blog/${post.id}`}
      className="group grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0 rounded-2xl overflow-hidden border border-[#e8e8ed] bg-white hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-[260px] md:h-[420px]">
        <img
          src={post.image}
          alt={post.title}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Meta */}
      <div className="flex flex-col justify-between p-8 md:p-10 bg-white">
        <div>
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-[#6e6e73] bg-[#f5f5f7] px-3 py-1.5 rounded-full mb-6">
            {post.category}
          </span>
          <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#1d1d1f] leading-[1.2] mb-5 group-hover:text-[#0066cc] transition-colors">
            {post.title}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#6e6e73] leading-relaxed line-clamp-4 mb-8">
            {post.excerpt}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${post.avatar ?? "from-rose-400 to-pink-500"} flex items-center justify-center flex-shrink-0`}>
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#1d1d1f]">{post.author ?? "Sniper Systems"}</p>
              <p className="text-[12px] text-[#8e8e93] flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />{post.date}
                <span className="mx-1">·</span>
                <Clock className="w-3 h-3" />{post.readTime}
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#0066cc] group-hover:gap-3 transition-all">
            Read <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.a>
  );
};

// ─────────────────────────────────────────────────────────
// GRID CARD — Prismic 3-col card
// ─────────────────────────────────────────────────────────
const GridCard = ({ post, index }: { post: any; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.a
      ref={ref}
      href={`/blog/${post.id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#e8e8ed] hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease, delay: index * 0.06 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 sm:h-52 flex-shrink-0">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3 className="text-[16px] sm:text-[17px] font-bold text-[#1d1d1f] leading-snug mb-3 line-clamp-2 group-hover:text-[#0066cc] transition-colors">
          {post.title}
        </h3>
        <p className="text-[14px] text-[#6e6e73] leading-relaxed line-clamp-2 mb-4 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-[#f2f2f7]">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${post.avatar ?? "from-rose-400 to-pink-500"} flex items-center justify-center flex-shrink-0`}>
              <User className="w-3 h-3 text-white" />
            </div>
            <span className="text-[12px] text-[#8e8e93] font-medium">{post.author ?? "Sniper Systems"}</span>
          </div>
          <span className="text-[12px] text-[#8e8e93] flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>
      </div>
    </motion.a>
  );
};

// ─────────────────────────────────────────────────────────
// LIST ROW — for "More articles" list below the grid
// ─────────────────────────────────────────────────────────
const ListRow = ({ post, index }: { post: any; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.a
      ref={ref}
      href={`/blog/${post.id}`}
      className="group flex gap-4 sm:gap-6 items-start py-6 border-b border-[#f2f2f7] last:border-b-0"
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay: index * 0.04 }}
    >
      {/* Thumb */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#f5f5f7]">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80"; }}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6e6e73] mb-2 block">{post.category}</span>
        <h4 className="text-[15px] sm:text-[16px] font-bold text-[#1d1d1f] leading-snug line-clamp-2 mb-2 group-hover:text-[#0066cc] transition-colors">
          {post.title}
        </h4>
        <div className="flex items-center gap-2 text-[12px] text-[#8e8e93]">
          <span>{post.date}</span>
          <span>·</span>
          <Clock className="w-3 h-3" />
          <span>{post.readTime}</span>
        </div>
      </div>

      <ArrowUpRight className="w-5 h-5 text-[#c7c7cc] group-hover:text-[#0066cc] transition-colors flex-shrink-0 mt-1 hidden sm:block" />
    </motion.a>
  );
};

// ─────────────────────────────────────────────────────────
// NEWSLETTER BAR
// ─────────────────────────────────────────────────────────
// GATEWAY FLOW CANVAS — extracted from GatewayFlow component
// ─────────────────────────────────────────────────────────
const GatewayFlowCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId: number;
    let explosions: { x: number; y: number; radius: number; life: number }[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      explosions.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, radius: 0, life: 1 });
    };
    canvas.addEventListener("click", handleClick);

    // Build paths
    const numPaths = 80;
    const paths = Array.from({ length: numPaths }, (_, i) => ({
      isLeft: i % 2 === 0,
      startY: (i / numPaths) * height * 1.4 - height * 0.2,
      particles: [{ t: Math.random(), speed: 0.0015 + Math.random() * 0.002 }],
    }));

    const getBezier = (
      t: number,
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number }
    ) => {
      const u = 1 - t;
      return {
        x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
        y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      // age explosions
      explosions.forEach(e => { e.radius += 15; e.life -= 0.015; });
      explosions = explosions.filter(e => e.life > 0);

      paths.forEach(path => {
        // update startY to current height on resize
        const p0 = { x: path.isLeft ? 0 : width, y: path.startY };
        const p1 = { x: path.isLeft ? cx * 0.5 : width - cx * 0.5, y: path.startY };
        const p2 = { x: path.isLeft ? cx * 0.8 : width - cx * 0.8, y: cy };
        const p3 = { x: cx, y: cy };

        // draw dashed bezier guide
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.lineWidth = 1;
        ctx.setLineDash([1, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        // animate particles
        path.particles.forEach(p => {
          p.t += p.speed;
          if (p.t > 1) {
            p.t = 0;
            path.startY += (Math.random() - 0.5) * 8;
          }

          let pos = getBezier(p.t, p0, p1, p2, p3);

          // explosion force
          let dx = 0, dy = 0;
          explosions.forEach(exp => {
            const ex = pos.x - exp.x;
            const ey = pos.y - exp.y;
            const dist = Math.hypot(ex, ey);
            if (dist < exp.radius + 120 && dist > exp.radius - 120) {
              const force = (1 - Math.abs(dist - exp.radius) / 120) * exp.life;
              dx += (ex / dist) * force * 80;
              dy += (ey / dist) * force * 80;
            }
          });

          pos.x += dx;
          pos.y += dy;

          // particle alpha fades in and out along path
          const alpha = 0.25 + 0.5 * Math.sin(p.t * Math.PI);
          ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
          ctx.fillRect(pos.x - 1.5, pos.y - 1.5, 3, 3);
        });
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
};

// ─────────────────────────────────────────────────────────
// NEWSLETTER BAR — with GatewayFlow canvas background
// ─────────────────────────────────────────────────────────
const NewsletterBar = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden my-16 sm:my-20"
      style={{ background: "#000" }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease }}
    >
      {/* ── Canvas background ── */}
      <GatewayFlowCanvas />

      {/* ── Dither overlay (matches original) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox%3D%220 0 2 2%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect width%3D%221%22 height%3D%221%22 fill%3D%22%23ffffff%22%2F%3E%3Crect x%3D%221%22 y%3D%221%22 width%3D%221%22 height%3D%221%22 fill%3D%22%23ffffff%22%2F%3E%3C%2Fsvg%3E')",
          backgroundSize: "2px 2px",
          opacity: 0.06,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 px-6 sm:px-12 py-14 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-3">
            Stay in the loop
          </p>
          <h2 className="text-[28px] sm:text-[38px] font-thin tracking-tight text-white leading-tight mb-3 uppercase">
            Get the latest insights delivered
          </h2>
          <p className="text-[15px] text-slate-500 font-extralight mb-10 leading-relaxed">
            Enterprise IT, cloud infrastructure, cybersecurity and emerging technology — straight to your inbox.
          </p>

          {submitted ? (
            <motion.p
              className="text-[#30d158] font-semibold text-[15px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ✓ You're subscribed. Welcome aboard.
            </motion.p>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true); }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="operative@company.com"
                className="flex-1 px-5 py-3.5 rounded-xl bg-black/80 border border-slate-800 text-white placeholder-slate-700 focus:outline-none focus:border-slate-600 text-[14px] font-extralight transition-colors"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-white text-black font-semibold text-[13px] uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-colors whitespace-nowrap flex items-center justify-center gap-2"
              >
                Subscribe <Mail className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────
const Index = () => {
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);

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

  // Author assignment — stable across renders
  const allPosts = useRef(assignAuthors(RAW_POSTS)).current;

  useEffect(() => {
    window.addEventListener("scroll", () => setShowScrollTop(window.scrollY > 400), { passive: true });
  }, []);

  // Filter + slice
  const filtered = activeCategory === "All"
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory);

  const featuredPost = filtered[0];
  const gridPosts    = filtered.slice(1, 7);   // up to 6 in the grid
  const listPosts    = filtered.slice(7, visibleCount + 7); // paginated list

  // Hero heading animation
  const heroHeadRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = heroHeadRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".hw");
    const t = gsap.fromTo(words, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.9 });
    return () => { t.kill(); };
  }, []);

  return (
    <Layout>
      {showWhiteScreen && <WhiteScreenTransition onComplete={() => setShowWhiteScreen(false)} />}
      <ReadingProgress />

      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#fbfbfd] pt-28 sm:pt-32 pb-10 px-4 sm:px-6 border-b border-[#e8e8ed]">
        <div className="max-w-6xl mx-auto">
          <FadeUp delay={0.05}>
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-4">
              Sniper Systems · Blog
            </p>
          </FadeUp>

          <h1
            ref={heroHeadRef}
            className="text-[56px] sm:text-[72px] md:text-[88px] lg:text-[104px] font-black text-[#1d1d1f] leading-[0.96] tracking-tight mb-6"
          >
            {"Insights".split("").map((ch, i) => (
              <span key={i} className="hw inline-block opacity-0">{ch}</span>
            ))}
          </h1>

          <FadeUp delay={0.2}>
            <p className="text-[17px] sm:text-[19px] text-[#6e6e73] max-w-2xl leading-relaxed">
              Expert perspectives on enterprise IT, cloud infrastructure, cybersecurity
              and the technologies shaping modern business in India and beyond.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ CATEGORY FILTER TABS ════════════════════════════════════════ */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#e8e8ed]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-3">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(9); }}
                className={`flex-shrink-0 text-[13px] font-semibold px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#1d1d1f] text-white"
                    : "text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ════════════════════════════════════════════════════ */}
      <div className="bg-[#fbfbfd] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              {/* ── FEATURED ── */}
              {featuredPost && (
                <div className="mb-12 sm:mb-16">
                  <FadeUp>
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-5">
                      Featured
                    </p>
                  </FadeUp>
                  <FeaturedCard post={featuredPost} />
                </div>
              )}

              {/* ── 3-COL GRID ── */}
              {gridPosts.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <FadeUp>
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-5">
                      Latest articles
                    </p>
                  </FadeUp>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {gridPosts.map((post, i) => (
                      <GridCard key={post.id} post={post} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── NEWSLETTER BAR ── */}
              {filtered.length >= 4 && <NewsletterBar />}

              {/* ── LIST ── */}
              {listPosts.length > 0 && (
                <div>
                  <FadeUp>
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-6">
                      More articles
                    </p>
                  </FadeUp>
                  <div className="bg-white rounded-2xl border border-[#e8e8ed] px-5 sm:px-8 divide-y divide-[#f2f2f7]">
                    {listPosts.map((post, i) => (
                      <ListRow key={post.id} post={post} index={i} />
                    ))}
                  </div>

                  {/* Load more */}
                  {filtered.slice(7).length > visibleCount && (
                    <FadeUp delay={0.1} className="text-center mt-10">
                      <button
                        onClick={() => setVisibleCount(v => v + 9)}
                        className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#1d1d1f] text-[#1d1d1f] font-bold text-[14px] rounded-full hover:bg-[#1d1d1f] hover:text-white transition-all duration-200"
                      >
                        Load more <ArrowRight className="w-4 h-4" />
                      </button>
                    </FadeUp>
                  )}
                </div>
              )}

              {/* ── EMPTY STATE ── */}
              {filtered.length === 0 && (
                <div className="text-center py-24">
                  <p className="text-[#8e8e93] text-[17px]">No articles in this category yet.</p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ SCROLL TO TOP ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-11 h-11 bg-[#1d1d1f] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
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

export default Index;
