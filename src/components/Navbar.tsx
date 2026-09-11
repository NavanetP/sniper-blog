import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import myImage from "../assets/v2.svg";

// ─── Unique SVG Icons ──────────────────────────────────────────────────────────
const SvgIcons = {
  av: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M3 8.5L8 5.5L16 8L21 5V16L16 19L8 16L3 19.5V8.5Z" strokeWidth="1.4" />
      <line x1="8" y1="5.5" x2="8" y2="16" />
      <line x1="16" y1="8" x2="16" y2="19" />
      <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="17" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11.5" r="1" fill="currentColor" stroke="none" opacity="0.4" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M6.5 19H17C19.8 19 22 16.8 22 14C22 11.4 20.1 9.2 17.6 8.9C17.1 6.1 14.8 4 12 4C8.7 4 6 6.7 6 10C4.3 10.4 3 12 3 14C3 16.8 4.7 19 6.5 19Z" />
      <path d="M14.5 15.5L17 18L14.5 20.5" />
      <line x1="10" y1="18" x2="17" y2="18" />
    </svg>
  ),
  device: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <line x1="9" y1="6" x2="15" y2="6" />
      <line x1="9" y1="10" x2="15" y2="10" />
      <line x1="9" y1="14" x2="12.5" y2="14" />
      <circle cx="15.5" cy="15.5" r="1.75" fill="currentColor" stroke="none" />
      <line x1="9" y1="18" x2="11" y2="18" opacity="0.35" />
    </svg>
  ),

  disposal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="3,6 5,6 21,6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  ),
  hr: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="9" cy="7" r="3.5" />
      <circle cx="15.5" cy="7" r="3.5" />
      <path d="M2 21V19C2 16.2 4.2 14 7 14H11" />
      <path d="M22 21V19C22 16.2 19.8 14 17 14H13" />
    </svg>
  ),
  consulting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="13" y2="14" />
    </svg>
  ),
  managed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 2L3 6.5V13C3 17.8 12 22 12 22C12 22 21 17.8 21 13V6.5L12 2Z" />
      <polyline points="8,12 11,15 16.5,9" strokeWidth="1.75" />
    </svg>
  ),
  payment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="5.5" width="20" height="13" rx="2.5" />
      <line x1="2" y1="10.5" x2="22" y2="10.5" strokeWidth="2" />
      <circle cx="7" cy="15.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="11.5" cy="15.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  ),
  infra: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="4" width="18" height="11" rx="2" />
      <line x1="8" y1="15" x2="8" y2="19.5" />
      <line x1="16" y1="15" x2="16" y2="19.5" />
      <line x1="12" y1="15" x2="12" y2="19.5" />
      <line x1="5.5" y1="19.5" x2="18.5" y2="19.5" />
      <line x1="7" y1="8" x2="17" y2="8" />
      <line x1="7" y1="11" x2="13.5" y2="11" />
    </svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="4.5" r="2" />
      <circle cx="4.5" cy="19.5" r="2" />
      <circle cx="19.5" cy="19.5" r="2" />
      <line x1="12" y1="6.5" x2="12" y2="13" />
      <line x1="12" y1="13" x2="5.8" y2="18.2" />
      <line x1="12" y1="13" x2="18.2" y2="18.2" />
      <circle cx="12" cy="13" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  aec: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M3 21V9.5L12 3L21 9.5V21H3Z" />
      <rect x="9" y="14" width="6" height="7" rx="0.75" />
      <line x1="3" y1="21" x2="21" y2="21" />
    </svg>
  ),
  media: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="6" width="15" height="12" rx="2" />
      <path d="M17 9.5L22 7V17L17 14.5" />
      <circle cx="8" cy="12" r="2.5" fill="currentColor" stroke="none" opacity="0.7" />
    </svg>
  ),
  xr: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="3.5" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
    </svg>
  ),
  govt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 2L22 7.5L12 13L2 7.5L12 2Z" />
      <line x1="5" y1="10" x2="5" y2="17" />
      <line x1="9" y1="11.5" x2="9" y2="17" />
      <line x1="15" y1="11.5" x2="15" y2="17" />
      <line x1="19" y1="10" x2="19" y2="17" />
      <rect x="3" y="17" width="18" height="3.5" rx="1" />
    </svg>
  ),
  it: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="3" width="20" height="15" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="7" y1="8" x2="17" y2="8" />
      <line x1="7" y1="12" x2="14" y2="12" />
    </svg>
  ),
  health: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M22 12H18L15 20L9 4L6 12H2" />
    </svg>
  ),
  mfg: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M2 20h20M4 20V10l4-4 4 4 4-4 4 4v10" />
      <rect x="9" y="14" width="6" height="6" />
    </svg>
  ),
  edu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M2 8L12 3L22 8L12 13L2 8Z" />
      <path d="M6 10.5V16C6 16 8.7 19 12 19C15.3 19 18 16 18 16V10.5" />
      <line x1="22" y1="8" x2="22" y2="14" />
    </svg>
  ),
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const solutionGroups = [
  {
    label: "Infrastructure",
    items: [
      { name: "IT Infrastructure", href: "https://sniperindia.com/solutions/it-infrastructure", desc: "Build robust enterprise infrastructure", iconKey: "infra" },
      { name: "Networking Solutions", href: "https://sniperindia.com/solutions/networking-solutions", desc: "Enterprise-grade network architecture", iconKey: "network" },
      { name: "Cloud Solutions", href: "https://sniperindia.com/solutions/clould-solutions", desc: "Scalable cloud infrastructure & services", iconKey: "cloud" },
    ],
  },
  {
    label: "Managed Services",
    items: [
      { name: "Managed IT Services", href: "https://sniperindia.com/solutions/managed-it-services", desc: "Complete end-to-end IT support", iconKey: "managed" },
      { name: "IT Consulting", href: "https://sniperindia.com/solutions/it-consulting", desc: "Expert technology guidance & strategy", iconKey: "consulting" },
      { name: "Device Deployment & MDM", href: "https://sniperindia.com/solutions/device-deployment-mdm", desc: "Seamless device lifecycle management", iconKey: "device" },
    ],
  },
  {
    label: "Business Solutions",
    items: [
      { name: "HR Solutions", href: "https://sniperindia.com/solutions/hr-solutions", desc: "Streamline your HR operations", iconKey: "hr" },
      { name: "Payment Services", href: "https://sniperindia.com/solutions/payment-services", desc: "Secure and reliable payment processing", iconKey: "payment" },

    ],
  },
  {
    label: "Specialty",
    items: [
      { name: "AV Solutions", href: "https://sniperindia.com/solutions/av-solutions", desc: "Professional audio-visual systems", iconKey: "av" },
      { name: "IT Asset Disposal", href: "https://sniperindia.com/solutions/it-asset-disposal", desc: "Secure disposal & lifecycle mgmt", iconKey: "disposal" },
    ],
  },
];

const industryGroups = [
  {
    label: "Technology",
    items: [
      { name: "IT / ITES / Infrastructure", href: "https://sniperindia.com/industries/it-ites-infra", desc: "Technology infrastructure management", iconKey: "it" },
      { name: "AR / VR / MR / XR", href: "https://sniperindia.com/industries/ar-vr-mr-xr", desc: "Immersive extended reality technology", iconKey: "xr" },
    ],
  },
  {
    label: "Creative & Public",
    items: [
      { name: "Media & Entertainment", href: "https://sniperindia.com/industries/media-and-entertainment", desc: "Creative production & broadcast solutions", iconKey: "media" },
      { name: "Government Sector", href: "https://sniperindia.com/industries/government", desc: "Secure public sector IT solutions", iconKey: "govt" },
    ],
  },
  {
    label: "Industrial",
    items: [
      { name: "AEC", href: "https://sniperindia.com/industries/aec", desc: "Architecture, Engineering & Construction", iconKey: "aec" },
      { name: "Manufacturing & Automotive", href: "https://sniperindia.com/industries/manufacturing-automotive", desc: "Industrial automation & IT solutions", iconKey: "mfg" },
    ],
  },
  {
    label: "Health & Education",
    items: [
      { name: "Healthcare & Pharma", href: "https://sniperindia.com/industries/healthcare-pharma", desc: "Medical technology & compliance solutions", iconKey: "health" },
      { name: "Education", href: "https://sniperindia.com/industries/education", desc: "EdTech and digital learning solutions", iconKey: "edu" },
    ],
  },
];

const partnerGroups = [
  {
    label: "Hardware",
    items: ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer", "Samsung"],
  },
  {
    label: "Software & Cloud",
    items: ["Microsoft", "Adobe", "Autodesk", "AWS","Azure", "Unity", "Unreal Engine"],
  },
  {
    label: "Networking & Security",
    items: ["Cisco", "Yubico", "JAMF", "Logitech", "Nvidia"],
  },
];

// ─── Dropdown corner image paths — replace with your actual image URLs ─────────
const DROPDOWN_CORNER_IMAGES = {
  solutions:  myImage,   // 🔁 replace with your path
  partners:   myImage,    // 🔁 replace with your path
  industries: myImage,  // 🔁 replace with your path
};

// ─── Corner Image Component ────────────────────────────────────────────────────
const DropdownCornerImage = ({ src, alt = "" }) => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      right: 0,
      width: "80px",
      height: "150px",
      pointerEvents: "none",
      overflow: "hidden",
      borderBottomRightRadius: "16px",
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{
        position: "absolute",
        bottom: 38,
        right: 0,
        width: "80px",
        height: "80px",
        objectFit: "contain",
        objectPosition: "bottom right",
        userSelect: "none",
      }}
    />
  </div>
);

// ─── Icon Badge ────────────────────────────────────────────────────────────────
const IconBadge = ({ iconKey }) => (
  <div style={{
    background: "linear-gradient(135deg, #2a2a2a 0%, #2a2a2a 100%)",
    border: "1px solid #333",
    borderRadius: "10px",
    width: "38px",
    height: "38px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: "#d1d5db",
    boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
  }}>
    {SvgIcons[iconKey]}
  </div>
);

// ─── Category Header ───────────────────────────────────────────────────────────
const CategoryLabel = ({ children }) => (
  <p style={{
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.1em",
    fontSize: "9.5px",
    fontWeight: 700,
    color: "#6b7280",
    marginBottom: "10px",
    textTransform: "uppercase",
    paddingLeft: "4px",
  }}>
    {children}
  </p>
);

// ─── Menu Item with Icon ───────────────────────────────────────────────────────
const MenuItem = ({ href, iconKey, name, desc, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "10px 10px",
        borderRadius: "10px",
        background: hovered ? "rgba(255,255,255,0.05)" : "transparent",
        textDecoration: "none",
        transition: "background 0.15s ease",
        cursor: "pointer",
      }}
    >
      <IconBadge iconKey={iconKey} />
      <div style={{ minWidth: 0, paddingTop: "2px" }}>
        <p style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          color: hovered ? "#ffffff" : "#e5e7eb",
          lineHeight: 1.35,
          transition: "color 0.15s",
          margin: 0,
        }}>{name}</p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11.5px",
          color: hovered ? "#9ca3af" : "#6b7280",
          marginTop: "2px",
          lineHeight: 1.4,
          transition: "color 0.15s",
          margin: "2px 0 0",
        }}>{desc}</p>
      </div>
    </a>
  );
};

// ─── Divider ───────────────────────────────────────────────────────────────────
const ColDivider = () => (
  <div style={{ width: "1px", background: "linear-gradient(to bottom, transparent, #2a2a2a 20%, #2a2a2a 80%, transparent)", flexShrink: 0, alignSelf: "stretch" }} />
);

// ─── Nav Link / Trigger ────────────────────────────────────────────────────────
const NavLink = ({ href, children, onClick }) => (
  <a href={href} onClick={onClick} style={{ fontFamily: "'DM Sans', sans-serif" }}
    className="px-4 py-2 text-[13.5px] font-medium tracking-wide text-gray-300 hover:text-white transition-colors duration-200">
    {children}
  </a>
);

const DropdownTrigger = ({ label, isOpen, onToggle }) => (
  <button onClick={onToggle} style={{ fontFamily: "'DM Sans', sans-serif" }}
    className={`flex items-center gap-1.5 px-4 py-2 text-[13.5px] font-medium tracking-wide transition-colors duration-200 ${isOpen ? "text-white" : "text-gray-300 hover:text-white"}`}>
    <span>{label}</span>
    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
  </button>
);

// ─── Mega Panel Shell ──────────────────────────────────────────────────────────
// Now accepts an optional `cornerImageSrc` prop to render the bottom-right image
const MegaPanel = ({ children, cornerImageSrc }) => (
  <div style={{
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100vw - 48px)",
    maxWidth: "1100px",
    marginTop: "8px",
    zIndex: 50,
    animation: "megaFadeSlide 0.18s cubic-bezier(0.22,1,0.36,1) forwards",
  }}>
    <div style={{
      position: "relative",           // ← needed so the corner image positions correctly
      background: "#111111",
      border: "1px solid #242424",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
      overflow: "hidden",
    }}>
      {children}

      {/* ── Bottom-right corner decorative image ── */}
      {cornerImageSrc && (
        <DropdownCornerImage src={cornerImageSrc} />
      )}
    </div>
  </div>
);

// ─── Mobile Dropdown ───────────────────────────────────────────────────────────
const MobileDropdown = ({ label, items, isOpen, onToggle }) => (
  <div className="border-b border-gray-800">
    <button className="flex items-center justify-between w-full py-4 px-6 text-left text-sm font-semibold text-gray-200 hover:bg-gray-900 transition-colors"
      style={{ fontFamily: "'DM Sans', sans-serif" }} onClick={onToggle}>
      <span>{label}</span>
      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-gray-300" : "text-gray-600"}`} />
    </button>
    {isOpen && (
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="py-2 px-4">
          {items.map((item) => (
            <a key={item.href || item} href={item.href || "#"}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="block py-2.5 px-4 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all border-l-2 border-transparent hover:border-gray-500"
              onClick={() => window.dispatchEvent(new CustomEvent("closemobilemenu"))}>
              {item.name || item}
            </a>
          ))}
        </div>
      </div>
    )}
  </div>
);

// ─── Main Navbar ───────────────────────────────────────────────────────────────
export const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  const toggle = (key) => setOpenDropdown(openDropdown === key ? null : key);
  const close = () => setOpenDropdown(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => { if (navRef.current && !navRef.current.contains(e.target)) close(); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const h = () => { setMobileMenuOpen(false); close(); };
    window.addEventListener("closemobilemenu", h);
    return () => window.removeEventListener("closemobilemenu", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  const allSolutionItems = solutionGroups.flatMap(g => g.items);
  const allIndustryItems = industryGroups.flatMap(g => g.items);


// const allPartnerItems = partnerGroups.flatMap(g => g.items.map(name => ({ name, href: `/partners/${name.toLowerCase().replace(/\s+/g, "-")}` })));

// With this (using actual absolute URLs):
// ─── Partner URLs ──────────────────────────────────────────────────────────────
const allPartnerItems = partnerGroups.flatMap(g => g.items.map(name => {
  // Map partner names to actual URLs
  const partnerUrls = {
    "Apple": "https://www.sniperindia.com/partners/apple",
    "Dell": "https://www.sniperindia.com/partners/dell",
    "HP": "https://www.sniperindia.com/partners/hp",
    "Lenovo": "https://www.sniperindia.com/partners/lenovo",
    "Asus": "https://www.sniperindia.com/partners/asus",
    "Acer": "https://www.sniperindia.com/partners/acer",
    "Samsung": "https://www.sniperindia.com/partners/samsung",
    "Microsoft": "https://www.sniperindia.com/partners/microsoft",
    "Adobe": "https://www.sniperindia.com/partners/adobe",
    "Autodesk": "https://www.sniperindia.com/partners/autodesk",
    "AWS": "https://www.sniperindia.com/partners/aws",
    "Azure": "https://www.sniperindia.com/partners/azure",
    "Unity": "https://www.sniperindia.com/partners/unity",
    "Unreal Engine": "https://www.sniperindia.com/partners/unreal-engine",
    "Cisco": "https://www.sniperindia.com/partners/cisco",
    "Yubico": "https://www.sniperindia.com/partners/yubico",
    "JAMF": "https://www.sniperindia.com/partners/jamf",
    "Logitech": "https://www.sniperindia.com/partners/logitech",
    "Nvidia": "https://www.sniperindia.com/partners/nvidia"
  };
  return {
    name,
    href: partnerUrls[name] || `https://www.sniperindia.com/partners/${name.toLowerCase().replace(/\s+/g, "-")}`
  };
}));


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@400;500;600;700&display=swap');
        @keyframes megaFadeSlide {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {/* ── Top Bar ── */}
      <div className="hidden md:block bg-gradient-to-r from-white via-stone-50 to-white text-stone-800 py-2.5 text-sm border-b border-stone-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a href="tel:+918939301100" className="flex items-center gap-2 hover:text-stone-600 transition-colors group" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <svg className="w-4 h-4 text-stone-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">+91 8939301100</span>
            </a>
            <a href="mailto:enquiry@sniperindia.com" className="flex items-center gap-2 hover:text-stone-600 transition-colors group" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <svg className="w-4 h-4 text-stone-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">enquiry@sniperindia.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-stone-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="font-semibold tracking-wide">Trusted IT Partner</span>
          </div>
        </div>
      </div>

      {/* ── Main Nav ── */}
      <nav ref={navRef}
        className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-900 ${scrolled ? "bg-black shadow-2xl" : "bg-black"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group flex-shrink-0" onClick={close}>
              <img
                src="https://i.ibb.co/9BNf5rZ/sniper-logo-neww.png"
                alt="Sniper India Logo"
                className="h-8 md:h-12 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              <NavLink href="https://sniperindia.com/" onClick={close}>Home</NavLink>
              <NavLink href="https://sniperindia.com/about" onClick={close}>About Us</NavLink>
              <DropdownTrigger label="Solutions" isOpen={openDropdown === "solutions"} onToggle={() => toggle("solutions")} />
              <DropdownTrigger label="Partners" isOpen={openDropdown === "partners"} onToggle={() => toggle("partners")} />
              <DropdownTrigger label="Industries" isOpen={openDropdown === "industries"} onToggle={() => toggle("industries")} />
              <NavLink href="https://blog.sniperindia.com/" onClick={close}>Blog</NavLink>
              <NavLink href="https://sniperindia.com/contact" onClick={close}>Contact Us</NavLink>
            </div>

            {/* Tablet Contact */}
            <div className="hidden md:flex lg:hidden items-center">
              <a href="/contact" style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="px-4 py-2 text-sm font-semibold text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border border-gray-700">
                Contact
              </a>
            </div>

            {/* Hamburger */}
            <button className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ═══ SOLUTIONS MEGA MENU ═══ */}
        {openDropdown === "solutions" && (
          <MegaPanel cornerImageSrc={DROPDOWN_CORNER_IMAGES.solutions}>
            <div style={{ display: "flex", gap: "0", padding: "28px 32px" }}>
              {solutionGroups.map((group, gi) => (
                <div key={group.label} style={{ display: "flex", gap: 0, flex: 1 }}>
                  <div style={{ flex: 1, paddingRight: gi < solutionGroups.length - 1 ? "20px" : "0" }}>
                    <CategoryLabel>{group.label}</CategoryLabel>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      {group.items.map((item) => (
                        <MenuItem key={item.href} href={item.href} iconKey={item.iconKey}
                          name={item.name} desc={item.desc} onClick={close} />
                      ))}
                    </div>
                  </div>
                  {gi < solutionGroups.length - 1 && (
                    <div style={{ width: "1px", background: "linear-gradient(to bottom, transparent, #2a2a2a 15%, #2a2a2a 85%, transparent)", marginLeft: "4px", marginRight: "4px", flexShrink: 0, alignSelf: "stretch" }} />
                  )}
                </div>
              ))}
            </div>
            {/* Bottom bar */}
            <div style={{ borderTop: "1px solid #1e1e1e", padding: "12px 32px", background: "#0d0d0d", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6b7280" }}>
                Explore the right solution for your business.
              </span>
              <a href="/solutions" onClick={close} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600,
                color: "#d1d5db", marginLeft: "4px", textDecoration: "none", borderBottom: "1px solid #4b5563",
              }}>
              Browse solutions →
              </a>
            </div>
          </MegaPanel>
        )}

        {/* ═══ PARTNERS MEGA MENU ═══ */}
        {openDropdown === "partners" && (
          <MegaPanel cornerImageSrc={DROPDOWN_CORNER_IMAGES.partners}>
            <div style={{ display: "flex", padding: "28px 32px", gap: "0" }}>
              {partnerGroups.map((group, gi) => (
                <div key={group.label} style={{ display: "flex", gap: 0, flex: 1 }}>
                  <div style={{ flex: 1, paddingRight: gi < partnerGroups.length - 1 ? "24px" : "0" }}>
                    <CategoryLabel>{group.label}</CategoryLabel>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      {group.items.map((name) => {
                       const href = `https://www.sniperindia.com/partners/${name.toLowerCase().replace(/\s+/g, "-")}`;
                        return (
                          <PartnerChip key={name} name={name} href={href} onClick={close} />
                        );
                      })}
                    </div>
                  </div>
                  {gi < partnerGroups.length - 1 && (
                    <div style={{ width: "1px", background: "linear-gradient(to bottom, transparent, #2a2a2a 15%, #2a2a2a 85%, transparent)", marginLeft: "4px", marginRight: "4px", flexShrink: 0, alignSelf: "stretch" }} />
                  )}
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #1e1e1e", padding: "12px 32px", background: "#0d0d0d", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6b7280" }}>
                Explore all {partnerGroups.flatMap(g => g.items).length} technology partnerships
              </span>
              <a href="https://www.sniperindia.com/partners" onClick={close} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600,
                color: "#d1d5db", marginLeft: "4px", textDecoration: "none", borderBottom: "1px solid #4b5563",
              }}>
                View all partners →
              </a>
            </div>
          </MegaPanel>
        )}

        {/* ═══ INDUSTRIES MEGA MENU ═══ */}
        {openDropdown === "industries" && (
          <MegaPanel cornerImageSrc={DROPDOWN_CORNER_IMAGES.industries}>
            <div style={{ display: "flex", padding: "28px 32px", gap: "0" }}>
              {industryGroups.map((group, gi) => (
                <div key={group.label} style={{ display: "flex", gap: 0, flex: 1 }}>
                  <div style={{ flex: 1, paddingRight: gi < industryGroups.length - 1 ? "20px" : "0" }}>
                    <CategoryLabel>{group.label}</CategoryLabel>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      {group.items.map((item) => (
                        <MenuItem key={item.href} href={item.href} iconKey={item.iconKey}
                          name={item.name} desc={item.desc} onClick={close} />
                      ))}
                    </div>
                  </div>
                  {gi < industryGroups.length - 1 && (
                    <div style={{ width: "1px", background: "linear-gradient(to bottom, transparent, #2a2a2a 15%, #2a2a2a 85%, transparent)", marginLeft: "4px", marginRight: "4px", flexShrink: 0, alignSelf: "stretch" }} />
                  )}
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #1e1e1e", padding: "12px 32px", background: "#0d0d0d", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6b7280" }}>
                Serving 8+ industry verticals across India
              </span>
              <a href="/industries" onClick={close} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600,
                color: "#d1d5db", marginLeft: "4px", textDecoration: "none", borderBottom: "1px solid #4b5563",
              }}>
                Explore all industries →
              </a>
            </div>
          </MegaPanel>
        )}

        {/* ═══ MOBILE MENU ═══ */}
        {mobileMenuOpen && (
          <>
            <div className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 top-16" onClick={() => setMobileMenuOpen(false)} />
            <div className="lg:hidden fixed top-16 left-0 right-0 bg-black border-t border-gray-800 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {[{ href: "/", label: "Home" }, { href: "/about", label: "About Us" }].map(({ href, label }) => (
                <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className="block py-4 px-6 text-sm font-medium text-gray-200 hover:bg-gray-900 border-b border-gray-800 transition-colors">
                  {label}
                </a>
              ))}
              <MobileDropdown label="Solutions" items={allSolutionItems} isOpen={openDropdown === "mobile-solutions"} onToggle={() => toggle("mobile-solutions")} />
              <MobileDropdown label="Partners" items={allPartnerItems} isOpen={openDropdown === "mobile-partners"} onToggle={() => toggle("mobile-partners")} />
              <MobileDropdown label="Industries" items={allIndustryItems} isOpen={openDropdown === "mobile-industries"} onToggle={() => toggle("mobile-industries")} />
              <a href="https://blog.sniperindia.com/" onClick={() => setMobileMenuOpen(false)}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="block py-4 px-6 text-sm font-medium text-gray-200 hover:bg-gray-900 border-b border-gray-800 transition-colors">
                Blog
              </a>
              <div className="p-5 border-t border-gray-800 bg-gray-950">
                <a href="/contact" onClick={() => setMobileMenuOpen(false)}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className="block w-full py-3.5 px-4 text-center text-sm font-semibold text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-all border border-gray-700 active:scale-95">
                  Contact Us
                </a>
                <div className="mt-4 space-y-2 text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <div className="flex items-center gap-2"><span className="text-gray-600">📞</span><span>+91 8939301100</span></div>
                  <div className="flex items-center gap-2"><span className="text-gray-600">✉️</span><span>enquiry@sniperindia.com</span></div>
                  <div className="pt-2 text-xs text-gray-600">ISO 9001:2015 Certified • Trusted IT Partner</div>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Backdrop */}
      {openDropdown && !openDropdown.startsWith("mobile-") && (
        <div className="fixed inset-0 bg-black/50 z-40" style={{ animation: "fadeIn 0.15s ease forwards" }}
          onClick={close} />
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </>
  );
};

// ─── Partner Chip ──────────────────────────────────────────────────────────────
const PartnerChip = ({ name, href, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "9px 12px",
        borderRadius: "9px",
        background: hovered ? "rgba(255,255,255,0.06)" : "transparent",
        border: hovered ? "1px solid #333" : "1px solid transparent",
        fontSize: "14px",
        fontWeight: 500,
        color: hovered ? "#f9fafb" : "#e4e7ed",
        transition: "all 0.15s ease",
        textDecoration: "none",
      }}>
      <span style={{
        width: "6px", height: "6px", borderRadius: "50%",
        background: hovered ? "#6b7280" : "#374151", flexShrink: 0,
        transition: "background 0.15s",
      }} />
      {name}
    </a>
  );
};

export default Navbar;
