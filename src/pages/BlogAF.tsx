import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Share2,
  Tag,
  User,
  Shield,
  Lock,
  Server,
  Network,
  Key,
  Eye,
  Database,
  Cloud,
  Settings,
  HeartHandshake,
  AlertTriangle,
  CheckSquare,
} from "lucide-react";
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────────────────
// READING PROGRESS
// ─────────────────────────────────────────────────────────
const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#1d1d1f] z-[9999] origin-left"
    />
  );
};

// ─────────────────────────────────────────────────────────
// WHITE CURTAIN
// ─────────────────────────────────────────────────────────
const WhiteScreenTransition = ({ onComplete }: { onComplete: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(ref.current, { yPercent: -105, duration: 0.9, ease: "power3.inOut", delay: 0.2, onComplete });
  }, []);
  return <div ref={ref} className="fixed inset-0 bg-white z-[9998] will-change-transform" />;
};

// ─────────────────────────────────────────────────────────
// FADE UP
// ─────────────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease, delay }}>
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────
// PROSE
// ─────────────────────────────────────────────────────────
const Prose = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`text-[17px] leading-[1.78] text-[#3d3d3f] ${className}`}>{children}</div>
);

// ─────────────────────────────────────────────────────────
// CALLOUT
// ─────────────────────────────────────────────────────────
const Callout = ({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "tip" | "warning" }) => {
  const styles = {
    info:    "bg-[#f5f5f7] border-l-4 border-[#1d1d1f] text-[#1d1d1f]",
    tip:     "bg-[#f0fdf4] border-l-4 border-[#16a34a] text-[#15803d]",
    warning: "bg-[#fffbeb] border-l-4 border-[#d97706] text-[#92400e]",
  };
  return (
    <div className={`rounded-r-xl px-6 py-5 my-8 ${styles[type]}`}>
      <div className="text-[15px] leading-relaxed font-medium">{children}</div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// SECTION HEADING
// ─────────────────────────────────────────────────────────
const SectionHeading = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <FadeUp>
    <h2 id={id} className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#1d1d1f] leading-tight mt-16 mb-6 scroll-mt-24">
      {children}
    </h2>
  </FadeUp>
);

// ─────────────────────────────────────────────────────────
// NUMBERED STEP — large Prismic numeral
// ─────────────────────────────────────────────────────────
const NumberedStep = ({ number, title, children, inView }: {
  number: number; title: string; children: React.ReactNode; inView: boolean;
}) => (
  <motion.div
    className="flex gap-6 sm:gap-8 py-8 border-b border-[#e5e5ea] last:border-b-0"
    initial={{ opacity: 0, x: -20 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, ease, delay: 0.05 + (number - 1) * 0.07 }}
  >
    <div className="flex-shrink-0 w-14 sm:w-16">
      <span className="text-[56px] sm:text-[72px] font-black leading-none text-[#e5e5ea] select-none" aria-hidden="true">
        {String(number).padStart(2, "0")}
      </span>
    </div>
    <div className="flex-1 pt-2">
      <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1d1d1f] mb-3 leading-snug">{title}</h3>
      <div className="text-[15px] sm:text-[16px] leading-relaxed text-[#3d3d3f] space-y-3">{children}</div>
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────────────────
// CHECK ITEM
// ─────────────────────────────────────────────────────────
const CheckItem = ({ children, inView, delay = 0 }: { children: React.ReactNode; inView: boolean; delay?: number }) => (
  <motion.li
    className="flex items-start gap-3 text-[15px] sm:text-[16px] text-[#3d3d3f]"
    initial={{ opacity: 0, x: -12 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.45, ease, delay }}
  >
    <CheckCircle2 className="w-[18px] h-[18px] text-[#1d1d1f] mt-0.5 flex-shrink-0" />
    <span>{children}</span>
  </motion.li>
);

// ─────────────────────────────────────────────────────────
// OUTCOME CARD
// ─────────────────────────────────────────────────────────
const OutcomeCard = ({ icon: Icon, title, description, index, inView }: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
}) => (
  <motion.div
    className="flex gap-4 p-5 sm:p-6 rounded-2xl border border-[#e5e5ea] bg-[#f9f9fb]"
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, ease, delay: 0.04 + index * 0.07 }}
  >
    <div className="w-9 h-9 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-[#16a34a]" />
    </div>
    <div>
      <p className="text-[14px] font-bold text-[#1d1d1f] mb-1">{title}</p>
      <p className="text-[13px] text-[#6e6e73] leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────────────────
// SERVICE CARD
// ─────────────────────────────────────────────────────────
const ServiceCard = ({ icon: Icon, title, description, index, inView }: {
  icon: React.ElementType; title: string; description: string; index: number; inView: boolean;
}) => (
  <motion.div
    className="flex gap-4 p-5 sm:p-6 rounded-xl border border-[#e5e5ea] bg-white hover:shadow-md transition-shadow duration-300"
    initial={{ opacity: 0, y: 24 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.55, ease, delay: 0.05 + index * 0.07 }}
  >
    <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-[#1d1d1f]" />
    </div>
    <div>
      <h4 className="text-[15px] font-bold text-[#1d1d1f] mb-1 leading-snug">{title}</h4>
      <p className="text-[14px] text-[#6e6e73] leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────────────────
// FAQ ACCORDION
// ─────────────────────────────────────────────────────────
const FaqItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-b border-[#e5e5ea] last:border-b-0"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay: index * 0.06 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-[16px] sm:text-[17px] font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors leading-snug">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease }}>
          <ChevronDown className="w-5 h-5 text-[#8e8e93] flex-shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[15px] sm:text-[16px] text-[#6e6e73] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────
// RELATED CARD
// ─────────────────────────────────────────────────────────
const RelatedCard = ({ post }: {
  post: { title: string; category: string; image: string; readTime: string; href: string };
}) => (
  <a href={post.href} className="group block bg-white rounded-xl overflow-hidden border border-[#e5e5ea] hover:shadow-lg transition-shadow duration-300">
    <div className="relative h-44 sm:h-48 overflow-hidden">
      <img src={post.image} alt={post.title} loading="lazy" decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute top-3 left-3">
        <span className="bg-black/70 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
          {post.category}
        </span>
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-2 leading-snug group-hover:text-[#0066cc] transition-colors line-clamp-2">{post.title}</h3>
      <span className="text-xs text-[#8e8e93] flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" /> {post.readTime}
      </span>
    </div>
  </a>
);

// ─────────────────────────────────────────────────────────
// STICKY SIDEBAR TOC
// ─────────────────────────────────────────────────────────
const TOC_LINKS = [
  { id: "why-zero-trust",   label: "Why Zero Trust for AWS?" },
  { id: "challenge",        label: "The Customer Challenge" },
  { id: "architecture",     label: "The Architecture Design" },
  { id: "validation",       label: "Implementation & Validation" },
  { id: "outcomes",         label: "Business Outcomes" },
  { id: "considerations",   label: "Before You Implement" },
  { id: "sniper",           label: "How Sniper Can Help" },
  { id: "faq",              label: "FAQ" },
];

const SidebarTOC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.getElementById("blog-article-body-af");
    if (!article) return;
    const onScroll = () => {
      const rect = article.getBoundingClientRect();
      setVisible(rect.top < 140 && rect.bottom > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    TOC_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-15% 0px -70% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div
        className={`hidden xl:block fixed top-28 z-40 transition-all duration-300 ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
        }`}
        style={{ left: "max(1.5rem, calc(50% - 40rem - 1rem))", width: "13rem" }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-[#e5e5ea] shadow-sm p-4 space-y-0.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-3 px-2">On this page</p>
          {TOC_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`w-full text-left text-[13px] px-2 py-2 rounded-lg transition-all duration-200 leading-snug flex items-center gap-2 group ${
                activeId === id ? "text-[#1d1d1f] font-semibold" : "text-[#8e8e93] hover:text-[#1d1d1f]"
              }`}
            >
              <span className={`flex-shrink-0 h-4 rounded-full transition-all duration-200 ${
                activeId === id ? "w-[3px] bg-[#1d1d1f]" : "w-[2px] bg-[#e5e5ea] group-hover:bg-[#c7c7cc]"
              }`} />
              {label}
            </button>
          ))}
          <div className="pt-3 mt-1 border-t border-[#e5e5ea]">
            <button
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              className="flex items-center gap-2 text-[13px] text-[#8e8e93] hover:text-[#1d1d1f] px-2 py-2 rounded-lg hover:bg-[#f5f5f7] transition-all w-full"
            >
              <Share2 className="w-3.5 h-3.5 flex-shrink-0" /> Copy link
            </button>
          </div>
        </div>
      </div>
      <aside className="hidden xl:block w-52 flex-shrink-0" aria-hidden="true" />
    </>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════
const BlogAF = () => {
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ── GEO META ──────────────────────────────────────────
  useEffect(() => {
    const tags: [string, string][] = [
      ["geo.region", "IN"], ["geo.placename", "India"],
      ["geo.position", "20.5937;78.9629"], ["ICBM", "20.5937, 78.9629"],
    ];
    const added: HTMLMetaElement[] = [];
    tags.forEach(([name, content]) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); added.push(el); }
      el.content = content;
    });
    return () => added.forEach(el => el.remove());
  }, []);

  // ── JSON-LD ────────────────────────────────────────────
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "AWS Zero Trust Architecture: Secure EC2 Workloads Without Public IPs or SSH",
      description: "How Sniper Systems & Solutions designed a production AWS environment using private EC2 instances, least-privilege security groups, AWS Systems Manager Session Manager and VPC endpoints — eliminating public IPs and SSH.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
      author: { "@type": "Organization", name: "Sniper Systems & Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Sniper Systems & Solutions",
        logo: { "@type": "ImageObject", url: "https://sniperindia.com/wp-content/uploads/2023/09/logo.png" },
      },
      datePublished: "2026-09-23",
      dateModified: "2026-09-23",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sniperindia.com/blog/aws-zero-trust-architecture-ec2-ssm" },
      keywords: "AWS Zero Trust Architecture, EC2 no public IP, AWS Systems Manager Session Manager, AWS private subnets, least privilege security groups, VPC endpoints AWS, AWS cloud security India, Sniper AWS partner India",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // ── SEO ────────────────────────────────────────────────
  useSEO({
    title: "AWS Zero Trust Architecture: Secure EC2 Workloads Without Public IPs or SSH | Sniper",
    description: "How Sniper designed a production AWS environment using private EC2 instances, least-privilege security groups, AWS Systems Manager Session Manager and VPC endpoints — eliminating public IPs and SSH keys.",
    keywords: "AWS Zero Trust Architecture, EC2 without public IP, AWS Systems Manager Session Manager, AWS private subnets India, least privilege security groups AWS, VPC endpoints AWS, AWS cloud security India, Sniper AWS partner India, AWS SSM access India",
    ogTitle: "AWS Zero Trust Architecture: Secure EC2 Workloads Without Public IPs or SSH",
    ogDescription: "Private EC2 instances, least-privilege security groups, SSH-free administration via AWS SSM and VPC endpoints — a Sniper customer implementation case study.",
    ogImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
    ogUrl: "https://sniperindia.com/blog/aws-zero-trust-architecture-ec2-ssm",
    canonicalUrl: "https://sniperindia.com/blog/aws-zero-trust-architecture-ec2-ssm",
    twitterTitle: "AWS Zero Trust Architecture: Secure EC2 Workloads Without Public IPs or SSH",
    twitterDescription: "Private subnets, no SSH, AWS SSM Session Manager, VPC endpoints and least-privilege security groups — how Sniper built a Zero Trust AWS environment.",
    twitterImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
  });

  useEffect(() => {
    const fn = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── HERO GSAP ──────────────────────────────────────────
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = heroHeadingRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".hw");
    const t = gsap.fromTo(words,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.055, delay: 1.1 }
    );
    return () => { t.kill(); };
  }, []);

  // ── SECTION REFS ──────────────────────────────────────
  const stepsRef      = useRef(null);
  const outcomesRef   = useRef(null);
  const preRef        = useRef(null);
  const servicesRef   = useRef(null);

  const stepsInView    = useInView(stepsRef,    { once: true, margin: "-60px" });
  const outcomesInView = useInView(outcomesRef, { once: true, margin: "-60px" });
  const preInView      = useInView(preRef,      { once: true, margin: "-60px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-60px" });

  // ── DATA ──────────────────────────────────────────────
  const zeroTrustPrinciples = [
    "Keeping application and database servers in private subnets",
    "Avoiding unnecessary public IP addresses on backend compute",
    "Restricting inbound traffic through least-privilege security groups",
    "Using IAM-controlled administrative access",
    "Connecting management services through private endpoints",
    "Monitoring and reviewing administrative activity",
  ];

  const customerRequirements = [
    "Eliminate direct public exposure — application and database EC2 instances should not have public IP addresses or accept direct internet ingress",
    "Remove SSH and static key pairs — traditional port 22 access and shared .pem key files needed to be eliminated",
    "Restrict communication between tiers — only authorised load balancer traffic should reach the application server; MySQL access restricted to the application tier",
    "Maintain operational connectivity — private servers still needed access to software updates and secure administrative access",
  ];

  const ssmBenefits = [
    "No inbound SSH port was needed on the EC2 instances",
    "EC2 key pairs were not required for server administration",
    "Bastion-host maintenance was removed from this access path",
    "Administrative permissions could be managed using IAM policies",
    "Session Manager provided a foundation for controlled and auditable access",
  ];

  const vpcEndpoints = ["ssm", "ssmmessages", "ec2messages"];

  const validationSteps = [
    { step: "Network foundation",         detail: "Created the VPC subnet structure, Internet Gateway, NAT Gateway and separate route tables." },
    { step: "Security-group configuration",detail: "Established the security-group chain between the load balancer, application server, database and Systems Manager endpoints." },
    { step: "IAM and SSM endpoints",      detail: "Configured the SSM interface endpoints, Private DNS and EC2 instance permissions." },
    { step: "Private compute deployment", detail: "Launched the Ubuntu Server 24.04 LTS application and MySQL servers without public IP addresses or EC2 key pairs." },
    { step: "Final validation",           detail: "Confirmed application traffic entered through the load balancer, MySQL port 3306 was not accessible outside the application tier, and engineers could initiate Session Manager sessions." },
  ];

  const outcomes = [
    { icon: Shield,       title: "Reduced direct exposure",       description: "Application and database EC2 instances had no public IP addresses, preventing direct internet addressing of backend compute." },
    { icon: Key,          title: "Removed SSH key management",    description: "Administrative access no longer depended on inbound SSH port 22 or shared .pem key pairs." },
    { icon: Network,      title: "Improved network isolation",    description: "Security-group references restricted communication between the load balancer, application and database tiers." },
    { icon: CheckCircle2, title: "Maintained reliable updates",   description: "The NAT Gateway preserved required outbound access for patches and software dependencies." },
    { icon: Eye,          title: "Improved administrative control",description: "IAM and Systems Manager provided a centralised foundation for controlling server access and supporting session auditability." },
  ];

  const preImplementation = [
    "Public exposure: Which EC2 instances genuinely need public IP addresses?",
    "Network access: Are security groups allowing only required application communication?",
    "Administrative access: Can SSH and static key dependencies be replaced with IAM-controlled access?",
    "Private connectivity: Can suitable AWS services be accessed using VPC endpoints and PrivateLink?",
    "Outbound requirements: How will private instances receive patches and software packages?",
    "Monitoring and auditing: Are access events and session records configured to requirements?",
    "Recovery and continuity: Are backup, recovery and maintenance processes included in the architecture?",
  ];

  const sniperServices = [
    { icon: Cloud,        title: "Cloud Assessment & Planning",    description: "Assess existing AWS environments, identify security gaps and design appropriate architecture improvements." },
    { icon: Settings,     title: "Cloud Migration & Deployment",   description: "Migration planning, deployment and infrastructure configuration for AWS workloads." },
    { icon: Shield,       title: "Cloud Security",                description: "Implement security-group design, IAM configuration, private connectivity and Zero Trust controls for AWS." },
    { icon: Eye,          title: "Infrastructure Monitoring",      description: "Monitoring, alerting and performance management for cloud and hybrid infrastructure environments." },
    { icon: Server,       title: "Infrastructure Management",      description: "Ongoing management of AWS environments, configuration maintenance and operational support." },
    { icon: HeartHandshake,title: "Technical Support",            description: "Post-implementation support, troubleshooting and architecture reviews as requirements change." },
  ];

  const faqs = [
    { q: "What is AWS Zero Trust Architecture?",                      a: "AWS Zero Trust Architecture applies identity-based access, least-privilege permissions and controlled network communication to AWS workloads. It reduces implicit trust and helps restrict access to authorised users, systems and resources." },
    { q: "How can EC2 instances be secured without public IP addresses?",a: "EC2 instances can be deployed in private subnets without public IP addresses. Applications can receive approved external traffic through a designated load balancer, while backend servers communicate through restricted security groups and private network paths." },
    { q: "Can AWS EC2 instances be accessed without SSH?",            a: "Yes. AWS Systems Manager Session Manager allows administrators to access supported managed instances without opening inbound SSH ports, maintaining bastion hosts or using SSH key pairs. Access is controlled through IAM policies." },
    { q: "Does keeping EC2 instances private prevent all internet connectivity?", a: "No. Private instances can still have controlled outbound connectivity through a NAT Gateway or suitable private service endpoints. A private subnet prevents direct public addressing, but routing, security groups and egress policies must also be designed correctly." },
    { q: "Can Sniper help businesses implement AWS cloud security?",   a: "Sniper's published cloud services include cloud assessment, migration and deployment, infrastructure management, monitoring, cloud security, optimisation and support. Businesses can contact Sniper to discuss their AWS architecture and security requirements." },
  ];

  const relatedPosts = [
    { title: "Microsoft Security Copilot: The Future of AI-Powered Enterprise Cybersecurity in 2026", category: "Cybersecurity",    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",    readTime: "10 min read", href: "/blog/microsoft-security-copilot-ai-powered-enterprise-cybersecurity-2026" },
    { title: "How to Reduce Cloud Costs in 2026: FinOps Strategies for Indian Businesses",           category: "Cloud Solutions",   image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",  readTime: "14 min read", href: "/blog/reduce-cloud-costs-finops-india" },
    { title: "AI-Ready IT Infrastructure: How Enterprises Should Plan Servers, Storage, Networking & HPC", category: "IT Infrastructure", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", readTime: "14 min read", href: "/blog/ai-ready-it-infrastructure-enterprise-guide" },
  ];

  return (
    <Layout>
      {showWhiteScreen && <WhiteScreenTransition onComplete={() => setShowWhiteScreen(false)} />}
      <ReadingProgressBar />

      {/* ═══ HERO ════════════════════════════════════════════════════════ */}
      <section className="bg-[#fbfbfd] pt-28 sm:pt-32 pb-0 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">

          <FadeUp>
            <div className="flex items-center gap-2 text-[13px] text-[#8e8e93] mb-8">
              <a href="/blog" className="hover:text-[#1d1d1f] transition-colors">Blog</a>
              <span>/</span>
              <span className="text-[#1d1d1f]">Cloud Security</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc] bg-[#e8f0fe] px-3 py-1.5 rounded-full mb-6">
              <Shield className="w-3.5 h-3.5" />
              AWS Security · Zero Trust · Case Study
            </span>
          </FadeUp>

          <h1
            ref={heroHeadingRef}
            className="text-[36px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-black text-[#1d1d1f] leading-[1.04] tracking-tight mb-6"
            aria-label="AWS Zero Trust Architecture: Secure EC2 Workloads Without Public IPs or SSH"
          >
            {["AWS", "Zero", "Trust"].map((w, i) => (
              <span key={i} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
            <br />
            {["Architecture"].map((w, i) => (
              <span key={i + 3} className="hw inline-block opacity-0 mr-[0.15em]">{w}</span>
            ))}
          </h1>

          <FadeUp delay={0.15}>
            <p className="text-[18px] sm:text-[21px] text-[#6e6e73] leading-relaxed max-w-3xl mb-10 font-normal">
              Secure EC2 workloads without public IPs or SSH — how Sniper Systems &amp; Solutions
              designed a production AWS environment using private instances, least-privilege
              network access and AWS Systems Manager.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pb-8 border-b border-[#e5e5ea] text-[13px] sm:text-[14px]">
              <span className="flex items-center gap-2 text-[#3d3d3f]">
                <div className="w-8 h-8 rounded-full bg-[#1d1d1f] flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                Sniper Systems
              </span>
              <span className="flex items-center gap-1.5 text-[#8e8e93]">
                <Calendar className="w-4 h-4" /> September 23, 2026
              </span>
              <span className="flex items-center gap-1.5 text-[#8e8e93]">
                <Clock className="w-4 h-4" /> 12 min read
              </span>
              <span className="flex items-center gap-1.5 text-[#0066cc] bg-[#e8f0fe] px-2.5 py-1 rounded-full font-medium">
                <Tag className="w-3.5 h-3.5" /> Cloud Security
              </span>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.25} className="max-w-5xl mx-auto pt-8">
          <div className="relative rounded-t-3xl overflow-hidden h-[240px] sm:h-[400px] md:h-[500px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
              alt="AWS Zero Trust Architecture — secure EC2 workloads with private subnets and Systems Manager"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          </div>
        </FadeUp>
      </section>

      {/* ═══ BODY ════════════════════════════════════════════════════════ */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="flex gap-12 xl:gap-16 items-start">

            <SidebarTOC />

            <article id="blog-article-body-af" className="flex-1 min-w-0">

              {/* TL;DR */}
              <FadeUp>
                <Callout type="tip">
                  <strong>TL;DR:</strong> AWS Zero Trust Architecture applies identity-based
                  access, least-privilege permissions and controlled network communication to
                  protect cloud workloads. In a customer implementation, Sniper designed a
                  production AWS environment with a two-tier web application and MySQL database
                  — with application and database servers in private subnets, no public IP
                  addresses, no EC2 key pairs and administrative access moved to AWS Systems
                  Manager Session Manager. The result was a more isolated, manageable and
                  auditable AWS environment.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 1 — Why Zero Trust ════════════════════════════ */}
              <SectionHeading id="why-zero-trust">Why Is Zero Trust Important for AWS Cloud Security?</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Traditional cloud environments can become exposed when administrative
                    ports are open, servers have unnecessary public IP addresses or network
                    permissions allow more communication than applications require. These
                    configurations increase the attack surface and make infrastructure harder
                    to manage securely.
                  </p>
                  <p className="mt-4">
                    A Zero Trust security approach works differently. It does not automatically
                    trust a connection simply because it originates inside a network. Access
                    should be authenticated, authorised and restricted to the specific resources
                    and actions required. For AWS environments, this can involve:
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="my-8">
                <div className="bg-[#f9f9fb] rounded-2xl border border-[#e5e5ea] p-6 sm:p-8">
                  <ul className="space-y-3">
                    {zeroTrustPrinciples.map((item, i) => (
                      <motion.li key={i} className="flex items-start gap-3 text-[15px] text-[#3d3d3f]"
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease, delay: 0.03 + i * 0.05 }}>
                        <CheckCircle2 className="w-[18px] h-[18px] text-[#1d1d1f] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              {/* ══ SECTION 2 — Challenge ═════════════════════════════════ */}
              <SectionHeading id="challenge">The Customer Challenge: Securing a Production AWS Environment</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    The customer approached Sniper to modernise a two-tier web application
                    and MySQL database environment. The existing infrastructure needed to
                    meet stricter security, isolation and maintenance requirements.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="my-8">
                <div className="grid grid-cols-1 gap-3">
                  {customerRequirements.map((item, i) => (
                    <motion.div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-[#e5e5ea] bg-[#f9f9fb]"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, ease, delay: 0.04 + i * 0.07 }}>
                      <div className="w-6 h-6 rounded-full bg-[#1d1d1f] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-[14px] text-[#3d3d3f] leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>

              {/* ══ SECTION 3 — Architecture ══════════════════════════════ */}
              <SectionHeading id="architecture">How Sniper Designed the AWS Zero Trust Architecture</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Sniper proposed a private-first AWS architecture using native AWS
                    networking, identity and management services. The important design decision
                    was to separate the public application entry point from the underlying
                    compute environment.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={stepsRef} className="divide-y divide-[#e5e5ea] border-t border-[#e5e5ea] my-8">

                {/* Step 1 */}
                <NumberedStep number={1} title="Private EC2 Instances Without Public IP Addresses" inView={stepsInView}>
                  <p>
                    The Amazon VPC was divided into dedicated public and private subnets. The
                    external Application Load Balancer handled incoming web traffic, while the
                    application and MySQL database servers operated in private subnets without
                    public IP addresses.
                  </p>
                  <p>
                    External users could reach the application through its designated load
                    balancer, but could not directly address the application or database
                    servers from the internet. The architecture retained an authorised public
                    entry point for the web application while keeping its backend compute
                    private.
                  </p>
                </NumberedStep>

                {/* Step 2 */}
                <NumberedStep number={2} title="Least-Privilege Security Groups for Network Isolation" inView={stepsInView}>
                  <p>
                    Instead of broad network permissions, Sniper implemented four
                    interconnected security groups, each controlling communication for a
                    specific infrastructure component:
                  </p>

                  {/* Security group table */}
                  <div className="overflow-hidden rounded-2xl border border-[#e5e5ea] mt-5">
                    <table className="w-full text-[14px]">
                      <thead>
                        <tr className="bg-[#1d1d1f] text-white">
                          <th className="text-left px-5 py-3 font-semibold w-[40%]">Security group</th>
                          <th className="text-left px-5 py-3 font-semibold border-l border-gray-700">Access responsibility</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Load Balancer SG",    "Accepts approved external web traffic on HTTP/HTTPS ports"],
                          ["Application Server SG","Accepts application traffic from the load balancer SG and approved internal sources"],
                          ["SSM Endpoints SG",    "Controls HTTPS communication with the Systems Manager interface endpoints"],
                          ["Database Server SG",  "Allows MySQL port 3306 only from the application server security group"],
                        ].map(([sg, desc], i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f9f9fb]"}>
                            <td className="px-5 py-3 text-[#1d1d1f] font-semibold border-t border-[#e5e5ea] text-[13px]">{sg}</td>
                            <td className="px-5 py-3 text-[#6e6e73] border-t border-[#e5e5ea] border-l border-l-[#e5e5ea] text-[13px]">{desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4">The resulting communication path was:</p>
                  <div className="flex items-center gap-3 p-4 bg-[#f5f5f7] rounded-xl mt-3 flex-wrap">
                    {["Application Load Balancer", "Application Server", "MySQL Database"].map((item, i, arr) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-[13px] font-bold text-[#1d1d1f] bg-white px-3 py-1.5 rounded-lg border border-[#e5e5ea] whitespace-nowrap">
                          {item}
                        </span>
                        {i < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-[#8e8e93] flex-shrink-0" />}
                      </div>
                    ))}
                  </div>
                </NumberedStep>

                {/* Step 3 */}
                <NumberedStep number={3} title="SSH-Free Administration Using AWS Systems Manager" inView={stepsInView}>
                  <p>
                    One of the most important changes was removing traditional SSH-based
                    administrative access. Instead of relying on port 22, SSH clients, shared
                    key pairs and bastion hosts, Sniper implemented{" "}
                    <strong>AWS Systems Manager Session Manager</strong>.
                  </p>
                  <p>
                    The EC2 instances used a dedicated IAM instance profile with the
                    AWS-managed <code className="bg-[#f5f5f7] px-2 py-0.5 rounded text-[13px] font-mono">AmazonSSMManagedInstanceCore</code> policy,
                    allowing them to register with Systems Manager. This provided:
                  </p>
                  <ul className="mt-3 space-y-2.5 list-none">
                    {ssmBenefits.map((item, i) => (
                      <CheckItem key={i} inView={stepsInView} delay={0.03 + i * 0.05}>{item}</CheckItem>
                    ))}
                  </ul>
                  <Callout type="info">
                    AWS officially supports Session Manager as a method of managing EC2 and
                    other managed nodes without opening inbound ports, maintaining bastion
                    hosts or managing SSH keys.
                  </Callout>
                </NumberedStep>

                {/* Step 4 */}
                <NumberedStep number={4} title="AWS Private Management Connectivity via VPC Endpoints" inView={stepsInView}>
                  <p>
                    To keep Systems Manager communication within the AWS network, Sniper
                    configured interface VPC endpoints with Private DNS enabled. The
                    implementation included endpoints for:
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {vpcEndpoints.map((ep, i) => (
                      <code key={i} className="bg-[#f5f5f7] border border-[#e5e5ea] px-3 py-1.5 rounded-lg text-[13px] font-mono text-[#1d1d1f]">
                        {ep}
                      </code>
                    ))}
                  </div>
                  <p className="mt-4">
                    Endpoint security groups controlled the permitted HTTPS communication,
                    allowing the private EC2 instances to communicate with Systems Manager
                    through private network paths rather than public internet.
                  </p>
                  <Callout type="warning">
                    The required Systems Manager endpoints can vary depending on the AWS
                    Region and SSM Agent behaviour. The endpoint configuration should always
                    be validated against the current AWS documentation.
                  </Callout>
                </NumberedStep>

                {/* Step 5 */}
                <NumberedStep number={5} title="Controlled Outbound Connectivity for Updates" inView={stepsInView}>
                  <p>
                    Sniper used a NAT Gateway with an Elastic IP address and dedicated
                    routing to provide controlled outbound internet access. This allowed
                    the Ubuntu servers to retrieve operating-system updates and required
                    packages without enabling unsolicited inbound internet connections.
                  </p>
                  <p>
                    Systems Manager management communication used the VPC endpoints, while
                    the NAT Gateway supported the required outbound update traffic — keeping
                    management traffic private while preserving operational maintenance.
                  </p>
                </NumberedStep>

              </div>

              {/* ══ SECTION 4 — Validation ════════════════════════════════ */}
              <SectionHeading id="validation">Architecture Implementation and Validation</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    The delivery process involved building and validating each security layer
                    in sequence. Validation was important because a secure architecture needs
                    to be tested, not simply configured.
                  </p>
                </Prose>
              </FadeUp>

              <FadeUp delay={0.05} className="my-8">
                <div className="relative pl-8 border-l-2 border-[#e5e5ea] space-y-0">
                  {validationSteps.map(({ step, detail }, i) => (
                    <motion.div key={i} className="relative pb-7 last:pb-0"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, ease, delay: i * 0.07 }}>
                      <div className="absolute -left-[calc(2rem+5px)] top-1 w-3 h-3 rounded-full bg-[#1d1d1f] border-2 border-white ring-1 ring-[#1d1d1f]" />
                      <p className="text-[15px] sm:text-[16px] leading-snug">
                        <strong className="font-semibold text-[#1d1d1f]">{step}</strong>
                        <span className="text-[#6e6e73] ml-2 text-[14px]">— {detail}</span>
                      </p>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>

              {/* ══ SECTION 5 — Outcomes ══════════════════════════════════ */}
              <SectionHeading id="outcomes">Business and Security Outcomes</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    The re-architecture delivered several operational and security improvements,
                    showing how AWS-native security and management services can work together
                    to improve production cloud architecture.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={outcomesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {outcomes.map((item, i) => (
                  <OutcomeCard key={i} {...item} index={i} inView={outcomesInView} />
                ))}
              </div>

              {/* ══ SECTION 6 — Before Implementation ════════════════════ */}
              <SectionHeading id="considerations">What Businesses Should Consider Before Implementing AWS Zero Trust</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Before redesigning production workloads, IT teams should assess:
                  </p>
                </Prose>
              </FadeUp>

              <div ref={preRef} className="my-8 bg-[#f9f9fb] rounded-2xl border border-[#e5e5ea] p-6 sm:p-8">
                <ul className="space-y-3">
                  {preImplementation.map((item, i) => (
                    <CheckItem key={i} inView={preInView} delay={0.03 + i * 0.05}>{item}</CheckItem>
                  ))}
                </ul>
              </div>

              <FadeUp>
                <Callout type="warning">
                  Zero Trust should be treated as an <strong>ongoing security practice</strong>{" "}
                  rather than a single network redesign. Identity, permissions, endpoints,
                  monitoring and operational policies all need continuous review.
                </Callout>
              </FadeUp>

              {/* ══ SECTION 7 — Sniper ════════════════════════════════════ */}
              <SectionHeading id="sniper">How Sniper Can Support AWS Cloud Security and Infrastructure Modernisation</SectionHeading>

              <FadeUp>
                <Prose>
                  <p>
                    Securing a production AWS environment requires more than changing
                    security-group rules. It involves understanding workloads, designing the
                    network architecture, configuring identity and access, implementing private
                    connectivity and validating operational requirements.
                  </p>
                  <p className="mt-4">
                    Sniper supports businesses through cloud assessment and planning, cloud
                    migration and deployment, infrastructure management, monitoring, cloud
                    security, cost optimisation and technical support. Its broader IT
                    infrastructure capabilities also support enterprise networking, data centre
                    infrastructure and virtualisation.
                  </p>
                </Prose>
              </FadeUp>

              <div ref={servicesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {sniperServices.map((s, i) => (
                  <ServiceCard key={i} {...s} index={i} inView={servicesInView} />
                ))}
              </div>

              <FadeUp delay={0.05} className="my-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  {[
                    { label: "Cloud Solutions",        href: "/solutions/cloud-solutions" },
                    { label: "IT Infrastructure",      href: "/solutions/it-infrastructure" },
                    { label: "Microsoft Azure",        href: "/partners/microsoft" },
                  ].map((link, i) => (
                    <motion.a
                      key={i}
                      href={link.href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-[#1d1d1f] border border-[#e5e5ea] rounded-full hover:bg-[#1d1d1f] hover:text-white hover:border-[#1d1d1f] transition-all duration-200"
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease, delay: 0.05 + i * 0.08 }}
                    >
                      {link.label} <ArrowRight className="w-3.5 h-3.5" />
                    </motion.a>
                  ))}
                </div>
              </FadeUp>

              {/* ══ FAQ ═══════════════════════════════════════════════════ */}
              <SectionHeading id="faq">Frequently Asked Questions</SectionHeading>

              <FadeUp className="border-t border-[#e5e5ea] divide-y divide-transparent my-4">
                {faqs.map((f, i) => (
                  <FaqItem key={i} {...f} index={i} />
                ))}
              </FadeUp>

              {/* ══ INLINE CTA ════════════════════════════════════════════ */}
              <FadeUp delay={0.1} className="mt-16">
                <div className="rounded-2xl bg-[#1d1d1f] text-white px-8 sm:px-12 py-10 sm:py-14 text-center">
                  <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-4">
                    Secure your AWS production workloads
                  </p>
                  <h2 className="text-[28px] sm:text-[36px] font-black leading-tight mb-4">
                    Planning to Strengthen Your AWS Cloud Security?
                  </h2>
                  <p className="text-[16px] text-[#aeaeb2] max-w-xl mx-auto mb-8 leading-relaxed">
                    Contact Sniper Systems &amp; Solutions to discuss cloud architecture,
                    security implementation and infrastructure support for your AWS environment.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#1d1d1f] font-semibold rounded-full hover:bg-[#f5f5f7] transition-colors text-[15px]"
                    >
                      Get in touch <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="/solutions/cloud-solutions"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#3d3d3f] text-white font-semibold rounded-full hover:border-white transition-colors text-[15px]"
                    >
                      Explore Cloud Solutions
                    </a>
                  </div>
                </div>
              </FadeUp>

            </article>
          </div>
        </div>
      </div>

      {/* ═══ RELATED POSTS ═══════════════════════════════════════════════ */}
      <section className="bg-[#f5f5f7] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#8e8e93] mb-2">Keep reading</p>
                <h2 className="text-[28px] sm:text-[34px] font-black text-[#1d1d1f] leading-tight">More from the blog</h2>
              </div>
              <a href="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0066cc] hover:underline">
                View all <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {relatedPosts.map((post, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <RelatedCard post={post} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SCROLL TO TOP ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-11 h-11 bg-[#1d1d1f] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
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

export default BlogAF;
