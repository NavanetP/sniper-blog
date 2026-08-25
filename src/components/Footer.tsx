import {
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import sniper from "@/assets/sniper-logo-black.png";

const quickLinks = [
  { name: "Home", href: "https://sniperindia.com/" },
  { name: "Blog", href: "https://blog.sniperindia.com/" },
  { name: "Contact Us", href: "https://sniperindia.com/contact" },
  { name: "Solutions", href: "https://sniperindia.com/Solutions" },
  { name: "Partners", href: "https://sniperindia.com//Partners" },
  { name: "Industries", href: "https://sniperindia.com//industries" },
  { name: "Careers", href: "https://sniperindia.com//careers", badge: "We're Hiring" },
  { name: "Privacy Policy", href: "https://sniperindia.com//privacy" },
];

const solutionsLinks = [
  { name: "AV Solutions", href: "https://sniperindia.com/solutions/av-solutions" },
  { name: "Cloud Solutions", href: "https://sniperindia.com/solutions/clould-solutions" },
  { name: "Device Deployment & MDM", href: "https://sniperindia.com/solutions/device-deployment-mdm" },
  { name: "Gifting Solution", href: "https://sniperindia.com/solutions/gifting-solution" },
  { name: "IT Asset Disposal", href: "https://sniperindia.com/solutions/it-asset-disposal" },
  { name: "HR Solutions", href: "https://sniperindia.com/solutions/hr-solutions" },
  { name: "IT Consulting Services", href: "https://sniperindia.com/solutions/it-consulting" },
  { name: "Managed IT Services", href: "https://sniperindia.com/solutions/managed-it-services" },
  { name: "Payment Services", href: "https://sniperindia.com/solutions/payment-services" },
  { name: "IT Infrastructure Solutions", href: "https://sniperindia.com/solutions/it-infrastructure" },
  { name: "Networking Solutions", href: "https://sniperindia.com/solutions/networking-solutions" },
];

const partnersLinks = [
  { name: "Apple", href: "https://sniperindia.com/partners/apple" },
  { name: "Nvidia", href: "https://sniperindia.com/partners/nvidia" },
  { name: "Microsoft", href: "https://sniperindia.com/partners/microsoft" },
  { name: "Lenovo", href: "https://sniperindia.com/partners/lenovo" },
  { name: "Autodesk", href: "https://sniperindia.com/partners/autodesk" },
  { name: "Adobe", href: "https://sniperindia.com/partners/adobe" },
  { name: "Samsung", href: "https://sniperindia.com/partners/samsung" },
  { name: "HP", href: "https://sniperindia.com/partners/hp" },
  { name: "Unity", href: "https://sniperindia.com/partners/unity" },
  { name: "JAMF", href: "https://sniperindia.com/partners/jamf" },
  { name: "Unreal Engine", href: "https://sniperindia.com/partners/unreal-engine" },
  { name: "Logitech", href: "https://sniperindia.com/partners/logitech" },
  { name: "Cisco", href: "https://sniperindia.com/partners/cisco" },
  { name: "Asus", href: "https://sniperindia.com/partners/asus" },
  { name: "Yubico", href: "https://sniperindia.com/partners/yubico" },
  { name: "Dell", href: "https://sniperindia.com/partners/dell" },
  { name: "Acer", href: "https://sniperindia.com/partners/acer" },
];

const industriesLinks = [
  { name: "AEC", href: "https://sniperindia.com/industries/aec" },
  { name: "Media & Entertainment", href: "https://sniperindia.com/industries/media-and-entertainment" },
  { name: "AR / VR / MR / XR", href: "https://sniperindia.com/industries/ar-vr-mr-xr" },
  { name: "Government Sector", href: "https://sniperindia.com/industries/government" },
  { name: "IT / ITES / Infrastructure", href: "https://sniperindia.com/industries/it-ites-infra" },
  { name: "Healthcare & Pharma", href: "https://sniperindia.com/industries/healthcare-pharma" },
  { name: "Manufacturing & Automotive", href: "https://sniperindia.com/industries/manufacturing-automotive" },
  { name: "Education", href: "https://sniperindia.com/industries/Education" },
];

const locations = [
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Coimbatore",
  "Kochi",
  "Gurugram",
  "Vijayawada",
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookie-policy" },
];

// Small badge used for "New" / "We're Hiring" style tags
const Badge = ({ children }) => (
  <span className="ml-2 inline-flex items-center rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-regular leading-none tracking-wide text-white">
    {children}
  </span>
);

// Reusable footer link column
const LinkColumn = ({ title, links }) => (
  <div>
    <h3 className="text-base font-medium mb-5 text-stone-900">{title}</h3>
    <ul className="space-y-3.5">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className={`inline-flex items-center text-sm transition-colors ${link.active
                ? "text-red-500 hover:text-red-600"
                : "text-stone-600 hover:text-red-600"
              }`}
          >
            {link.name}
            {link.badge && <Badge>{link.badge}</Badge>}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// Sniper wordmark logo — using the real asset from /assets.
// If logo.png lives under src/assets and needs to be bundled (Vite/CRA/webpack),
// use `import logo from "../assets/logo.png";` at the top of the file and
// swap the src below to src={logo}.
const SniperLogo = () => (
  <a href="/" aria-label="Sniper Systems & Solutions" className="inline-flex items-center">
    <img
      src={sniper}
      alt="Sniper"
      className="h-16 w-auto"
    />
  </a>
);

export const Footer = () => {
  return (
    <footer className="bg-stone-50 text-stone-800 rounded-t-[32px] border-t border-stone-200 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.12)]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-20 py-14 lg:py-16">
        {/* Top Section — CTA + 5 link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[380px_repeat(4,1fr)] gap-y-12 gap-x-8 xl:gap-x-10 2xl:gap-x-12 mb-14">
          {/* CTA */}
          <div className="max-w-[360px]">
            <h2 className="text-[26px] md:text-[28px] lg:text-[30px] font-semibold leading-[1.2] tracking-tighter mb-4 text-stone-900 whitespace-nowrap">
              Stay Connected to
              <br />
              the future of Enterprise IT
            </h2>
            <p className="text-sm leading-6 tracking-tight text-stone-500 mb-6 max-w-xs">
              Crafted with creativity &amp; passion, let&rsquo;s stay connected and reach out
              each other
            </p>
            <a
              href="/contact"
              className="group relative inline-flex items-center gap-3 rounded-full bg-stone-900 text-stone-50 pl-2 pr-5 py-2 overflow-hidden hover:bg-red-600 transition-colors duration-300 hover:animate-btn-bounce"
            >
              {/* Arrow circle — horizontal slide, left to right */}
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-50 text-stone-900 overflow-hidden">
                <svg
                  className="absolute h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-6"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
                <svg
                  className="absolute h-4 w-4 -translate-x-6 transition-transform duration-300 ease-out group-hover:translate-x-0"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>

              {/* Text swap */}
              <span className="relative h-5 overflow-hidden">
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  Get in Touch
                </span>
                <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                  Get in Touch
                </span>
              </span>
            </a>

            {/* Contact Section */}
            <div className="mt-14">
              <h3 className="text-lg font-medium text-stone-900 mb-6">
                Contact Us
              </h3>

              <div className="space-y-5">

                {/* Email */}
                <a
                  href="mailto:Enquiry@sniperindia.com"
                  className="group flex items-center gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-200 transition-colors group-hover:bg-red-500">
                    <FiMail className="text-lg text-stone-700 transition-colors group-hover:text-white" />
                  </div>

                  <div>
                    <p className="text-sm text-stone-500">Email</p>
                    <p className="text-[15px] text-stone-800 underline underline-offset-4 group-hover:text-red-600 transition-colors">
                      Enquiry@sniperindia.com
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+918939301100"
                  className="group flex items-center gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-200 transition-colors group-hover:bg-red-500">
                    <FiPhone className="text-lg text-stone-700 transition-colors group-hover:text-white" />
                  </div>

                  <div>
                    <p className="text-sm text-stone-500">Phone</p>
                    <p className="text-[15px] text-stone-800 group-hover:text-red-600 transition-colors">
                      +91 89393 01100
                    </p>
                  </div>
                </a>

                {/* Location — moved here from the old standalone "Our Presence" block */}
                <div className="group flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-stone-200 transition-colors group-hover:bg-red-500">
                    <FiMapPin className="text-lg text-stone-700 transition-colors group-hover:text-white" />
                  </div>

                  <div>
                    <p className="text-sm text-stone-500">Location</p>
                    <p className="text-[15px] leading-6 text-stone-800">
                      {locations.join(" | ")}
                    </p>
                  </div>
                </div>

              </div>

              {/* Follow Us */}
              <div className="mt-10">
                <h3 className="text-lg font-medium text-stone-900 mb-5">
                  Follow us on
                </h3>

                <div className="flex items-center gap-3">

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/sniper-systems-solutions-pvt-ltd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-stone-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0077B5]"
                  >
                    <FaLinkedinIn className="text-lg text-stone-600 group-hover:text-white" />
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/snipersystemsandsolution/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-stone-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1877F2]"
                  >
                    <FaFacebookF className="text-lg text-stone-600 group-hover:text-white" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/sniperindia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-stone-200 transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]"
                  >
                    <FaInstagram className="text-lg text-stone-600 group-hover:text-white" />
                  </a>

                  {/* Twitter / X */}
                  <a
                    href="https://x.com/_sniperindia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-stone-200 transition-all duration-300 hover:-translate-y-1 hover:bg-black"
                  >
                    <FaXTwitter className="text-lg text-stone-600 group-hover:text-white" />
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@Snipersystemsandsolutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-stone-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#FF0000]"
                  >
                    <FaYoutube className="text-lg text-stone-600 group-hover:text-white" />
                  </a>

                </div>
              </div>

              {/* Logo — new, sits below Follow Us as requested
              <div className="mt-10">
                <SniperLogo />
              </div>*/}
            </div>
          </div>

          <LinkColumn title="Quick Links" links={quickLinks} />
          <LinkColumn title="Solutions" links={solutionsLinks} />
          <LinkColumn title="Partners" links={partnersLinks} />
          <LinkColumn title="Industries" links={industriesLinks} />
        </div>

        {/* Bottom Section */}
        <div className="border-t border-stone-200 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-stone-500">
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

            <p className="text-sm text-stone-500 whitespace-nowrap">
              © {new Date().getFullYear()} Sniper Systems &amp; Solutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
