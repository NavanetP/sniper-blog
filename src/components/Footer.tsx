import imgSrccc from "@/assets/aaaa87d7-c10a-420c-99fb-d72436796abd.png";
import imgSrcc from "@/assets/sniper-logo-black.png";
import { memo, useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "https://blog.sniperindia.com/" },
  { name: "Contact Us", href: "/contact" },
  { name: "Solutions", href: "/Solutions" },
  { name: "Partners", href: "/Partners" },
  { name: "Industries", href: "/industries" },
  { name: "Careers", href: "/careers", badge: "We're Hiring" },
  { name: "Privacy Policy", href: "/privacy" },
];

const solutionsLinks = [
  { name: "AV Solutions", href: "/solutions/av-solutions" },
  { name: "Cloud Solutions", href: "/solutions/clould-solutions" },
  { name: "Device Deployment & MDM", href: "/solutions/device-deployment-mdm" },
  { name: "Gifting Solution", href: "/solutions/gifting-solution" },
  { name: "IT Asset Disposal", href: "/solutions/it-asset-disposal" },
  { name: "HR Solutions", href: "/solutions/hr-solutions" },
  { name: "IT Consulting Services", href: "/solutions/it-consulting" },
  { name: "Managed IT Services", href: "/solutions/managed-it-services" },
  { name: "Payment Services", href: "/solutions/payment-services" },
  { name: "IT Infrastructure Solutions", href: "/solutions/it-infrastructure" },
  { name: "Networking Solutions", href: "/solutions/networking-solutions" },
];

const partnersLinks = [
  { name: "Apple", href: "/partners/apple" },
  { name: "Nvidia", href: "/partners/nvidia" },
  { name: "Microsoft", href: "/partners/microsoft" },
  { name: "Lenovo", href: "/partners/lenovo" },
  { name: "Autodesk", href: "/partners/autodesk" },
  { name: "Adobe", href: "/partners/adobe" },
  { name: "Samsung", href: "/partners/samsung" },
  { name: "HP", href: "/partners/hp" },
  { name: "Unity", href: "/partners/unity" },
  { name: "JAMF", href: "/partners/jamf" },
  { name: "Unreal Engine", href: "/partners/unreal-engine" },
  { name: "Logitech", href: "/partners/logitech" },
  { name: "Cisco", href: "/partners/cisco" },
  { name: "Asus", href: "/partners/asus" },
  { name: "Yubico", href: "/partners/yubico" },
  { name: "Dell", href: "/partners/dell" },
  { name: "Acer", href: "/partners/acer" },
];

const industriesLinks = [
  { name: "AEC", href: "/industries/aec" },
  { name: "Media & Entertainment", href: "/industries/media-and-entertainment" },
  { name: "AR / VR / MR / XR", href: "/industries/ar-vr-mr-xr" },
  { name: "Government Sector", href: "/industries/government" },
  { name: "IT / ITES / Infrastructure", href: "/industries/it-ites-infra" },
  { name: "Healthcare & Pharma", href: "/industries/healthcare-pharma" },
  { name: "Manufacturing & Automotive", href: "/industries/manufacturing-automotive" },
  { name: "Education", href: "/industries/Education" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/sniper-systems-solutions-pvt-ltd" },
  { name: "Facebook", href: "https://www.facebook.com/snipersystemsandsolution/" },
  { name: "Instagram", href: "https://www.instagram.com/sniperindia/" },
  { name: "Twitter / X", href: "https://x.com/_sniperindia" },
  { name: "YouTube", href: "https://www.youtube.com/@Snipersystemsandsolutions" },
];

const locations = [
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Gurugram",
  "Coimbatore",
  "Kochi",
  "Vijayawada",
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookie-policy" },
];

// Small badge used for "New" / "We're Hiring" style tags
const Badge = ({ children }) => (
  <span className="ml-2 inline-flex items-center rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-medium leading-none text-white">
    {children}
  </span>
);

// Reusable footer link column
const LinkColumn = ({ title, links }) => (
  <div>
    <h3 className="text-lg font-normal mb-6 text-stone-900">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="inline-flex items-center text-base text-stone-700 hover:text-stone-900 transition-colors"
          >
            {link.name}
            {link.badge && <Badge>{link.badge}</Badge>}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// Faint dotted world-map graphic used behind the locations bar.
// Pure SVG / CSS — no external image asset required.
const LocationsMap = () => (
  <svg
    viewBox="0 0 400 90"
    className="hidden lg:block h-16 w-auto text-stone-400"
    fill="none"
    aria-hidden="true"
  >
    {Array.from({ length: 12 }).map((_, row) =>
      Array.from({ length: 40 }).map((_, col) => {
        // sparse pseudo-random dot placement to suggest a world map silhouette
        const seed = (row * 40 + col) % 7;
        if (seed !== 0) return null;
        return (
          <circle
            key={`${row}-${col}`}
            cx={col * 10 + 4}
            cy={row * 8 + 4}
            r="1.4"
            fill="currentColor"
            opacity="0.35"
          />
        );
      })
    )}
    <circle cx="60" cy="30" r="3" fill="#ef4444" />
    <circle cx="140" cy="50" r="3" fill="#ef4444" />
    <circle cx="230" cy="20" r="3" fill="#ef4444" />
    <circle cx="300" cy="60" r="3" fill="#ef4444" />
    <circle cx="360" cy="35" r="3" fill="#ef4444" />
  </svg>
);


const TileSection = memo(
  ({
    sectionIndex,
    verticalAlign,
    tileSize,
    animationDuration,
    tilesPerSection,
    isInView,
  }: {
    sectionIndex: number;
    verticalAlign: 'start' | 'center' | 'end';
    tileSize: number;
    animationDuration: number;
    tilesPerSection: number;
    isInView: boolean;
  }) => {
    const sectionStyle: React.CSSProperties = {
      top: verticalAlign === 'start' ? '8px' : verticalAlign === 'center' ? '50%' : undefined,
      bottom: verticalAlign === 'end' ? '8px' : undefined,
      transform: verticalAlign === 'center' ? 'translateY(-50%) translateZ(0)' : 'translateZ(0)',
      display: 'grid',
      gridAutoFlow: 'dense',
      gridTemplateColumns: `repeat(auto-fill, ${tileSize}px)`,
      gridTemplateRows: `repeat(auto-fill, ${tileSize}px)`,
      alignContent: verticalAlign,
      justifyContent: 'start',
      gap: 0,
      height: '33.333%',
      contain: 'layout style paint',
      willChange: 'contents',
    };

    return (
      <div className="footer-tile-section absolute inset-x-2" style={sectionStyle}>
        {Array.from({ length: tilesPerSection }).map((_, i) => {
          const delay = (((i + sectionIndex * 100) * 45) % 100) / 100 * animationDuration;
          return (
            <div
              key={`${sectionIndex}-${i}`}
              className="footer-tile-wrap relative"
              style={{
                width: tileSize,
                height: tileSize,
                contain: 'layout style paint',
              }}
            >
              <div
                className={`footer-tile absolute inset-[3px] rounded-md ${isInView ? 'running' : 'paused'}`}
                style={{
                  background: 'rgba(248, 138, 138, 0.13)',
                  opacity: 0,
                  animationDelay: `${delay}s`,
                  animationDuration: `${animationDuration}s`,
                  willChange: 'opacity',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

TileSection.displayName = 'TileSection';

const DecorativeTilesBackground = memo(() => {
  const tileSize = 28;
  const animationDuration = 8;
  const cornerGap = '34px';
  const tilesPerSection = 140;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsInView(entry.isIntersecting);
        }
      },
      {
        rootMargin: '200px',
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes footer-tiles {
          0%, 40%, 80% { opacity: 0; }
          20%, 60% { opacity: 1; }
        }
        .footer-tile {
          animation-name: footer-tiles;
          animation-iteration-count: infinite;
          animation-timing-function: ease;
        }
        .footer-tile.running {
          animation-play-state: running;
        }
        .footer-tile.paused {
          animation-play-state: paused;
        }
        .footer-tile-section {
          content-visibility: auto;
        }
      `}</style>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
        style={{
          padding: cornerGap,
          contain: 'layout style paint',
        }}
      >
        <div
          className="w-full h-full rounded-3xl overflow-hidden border border-stone-400/30 relative"
          style={{
            backgroundImage: `
              repeating-linear-gradient(to right, rgba(168,162,158,0.22) 0, rgba(168,162,158,0.22) 1px, transparent 1px, transparent ${tileSize}px),
              repeating-linear-gradient(to bottom, rgba(168,162,158,0.22) 0, rgba(168,162,158,0.22) 1px, transparent 1px, transparent ${tileSize}px)
            `,
            backgroundSize: `${tileSize}px ${tileSize}px`,
            backgroundColor: 'rgba(255,255,255,0.03)',
            contain: 'layout style paint',
            willChange: 'contents',
            transform: 'translateZ(0)',
          }}
        >
          <TileSection
            sectionIndex={0}
            verticalAlign="start"
            tileSize={tileSize}
            animationDuration={animationDuration}
            tilesPerSection={tilesPerSection}
            isInView={isInView}
          />
          <TileSection
            sectionIndex={1}
            verticalAlign="center"
            tileSize={tileSize}
            animationDuration={animationDuration}
            tilesPerSection={tilesPerSection}
            isInView={isInView}
          />
          <TileSection
            sectionIndex={2}
            verticalAlign="end"
            tileSize={tileSize}
            animationDuration={animationDuration}
            tilesPerSection={tilesPerSection}
            isInView={isInView}
          />
        </div>
      </div>
    </>
  );
});

DecorativeTilesBackground.displayName = 'DecorativeTilesBackground';

export const Footer = memo(() => {
  const footerRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      {
        rootMargin: '100px',
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`relative bg-stone-200 text-stone-800 overflow-hidden footer-optimized ${revealed ? 'footer-revealed' : 'footer-hidden'}`}
      style={{
        contain: 'layout style paint',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <style>{`
        .footer-optimized {
          content-visibility: auto;
          contain-intrinsic-size: 1000px;
        }
        .footer-hidden .footer-content {
          opacity: 0;
          transform: translateY(30px);
        }
        .footer-revealed .footer-content {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .footer-hidden .locations-bar {
          opacity: 0;
          transform: translateY(30px);
        }
        .footer-revealed .locations-bar {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.7s ease-out 0.15s, transform 0.7s ease-out 0.15s;
        }
        .footer-hidden .footer-bottom {
          opacity: 0;
          transform: translateY(20px);
        }
        .footer-revealed .footer-bottom {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.7s ease-out 0.3s, transform 0.7s ease-out 0.3s;
        }
      `}</style>
      <DecorativeTilesBackground />
      <div className="relative z-10 container mx-auto px-8 lg:px-16 py-20 footer-content gpu">
        {/* Top Section — CTA + 5 link columns */}
        <div
          className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-10 mb-20"
          style={{
            contentVisibility: 'auto',
            containIntrinsicSize: '600px',
          }}
        >
          {/* CTA */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl lg:text-4xl font-light leading-tight mb-6 text-stone-900">
              Stay connected
              <br />
              to the future of
              <br />
              Enterprise IT
            </h2>
            <p className="text-stone-600 mb-6 max-w-xs">
              Crafted with creativity &amp; passion, let&rsquo;s stay connected and reach out
              each other
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-stone-900 text-stone-50 pl-5 pr-2 py-2 hover:bg-stone-700 transition-colors"
            >
              Get in Touch
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-50 text-stone-900">
                →
              </span>
            </a>

            <div className="mt-10 space-y-2">
              <p className="text-lg text-stone-600">Contact Us</p>
              <p className="text-lg">
                <a
                  href="tel:+918939301100"
                  className="text-stone-700 hover:text-stone-900 transition-colors"
                >
                  +91 8939301100
                </a>
                {" | "}
                <a
                  href="mailto:enquiry@sniperindia.com"
                  className="text-stone-700 hover:text-stone-900 transition-colors"
                >
                  Enquiry@sniperindia.com
                </a>
              </p>
            </div>
          </div>

          <LinkColumn title="Quick Links" links={quickLinks} />
          <LinkColumn title="Solutions" links={solutionsLinks} />
          <LinkColumn title="Partners" links={partnersLinks} />
          <LinkColumn title="Industries" links={industriesLinks} />

          {/* Social — plain list, external links */}
          <div>
            <h3 className="text-lg font-normal mb-6 text-stone-900">Social</h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-base text-stone-700 hover:text-stone-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


        </div>

        {/* Locations bar */}
        <div
          className="locations-bar flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 rounded-2xl border border-stone-400/70 px-6 py-6 mb-16 gpu"
          style={{
            contentVisibility: 'auto',
            containIntrinsicSize: '150px',
          }}
        >
  <div className="flex items-start lg:items-center gap-3 flex-wrap">
    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500 text-stone-700 shrink-0">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
</span>
    <span className="font-normal text-stone-900 shrink-0">
      Locations
    </span>
    <span className="text-stone-700">
      {locations.join(" | ")}
    </span>
  </div>

 <img
  src={imgSrccc}
  alt="Global Locations"
  className="hidden lg:block w-[150px] h-30 "
  loading="lazy"
  decoding="async"
/>
</div>

        {/* Bottom Section */}
        <div
          className="footer-bottom border-t border-stone-400 pt-8 gpu"
          style={{
            contentVisibility: 'auto',
            containIntrinsicSize: '150px',
          }}
        >

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">


            {/* Text-based brand mark — replaces the raster logo image */}
            <div className="flex items-center">
  <img
     src={imgSrcc}
    alt="Sniper Logo"
    className="h-16 w-auto object-contain"
    loading="lazy"
    decoding="async"
  />
</div>

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-stone-700">
              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-stone-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <p className="text-sm text-stone-700 whitespace-nowrap">
              © Sniper Systems &amp; Solutions {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
