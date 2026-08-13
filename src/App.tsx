import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/privacy";
import TermsAndConditions from "./pages/TermsAndConditions";
// Pages
const Index = React.lazy(() => import("./pages/Index"));


const About = React.lazy(() => import("./pages/About"));
const Blog = React.lazy(() => import("./pages/Blog"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Careers = React.lazy(() => import("./pages/Careers"));
const BlogA = React.lazy(() => import("./pages/BlogA"));
const BlogB = React.lazy(() => import("./pages/BlogB"));
const BlogC = React.lazy(() => import("./pages/BlogC"));
const BlogD = React.lazy(() => import("./pages/BlogD"));
const BlogE = React.lazy(() => import("./pages/BlogE"));
const BlogF = React.lazy(() => import("./pages/BlogF"));
const BlogG = React.lazy(() => import("./pages/BlogG"));
const BlogH = React.lazy(() => import("./pages/BlogH"));
const BlogI = React.lazy(() => import("./pages/BlogI"));
const BlogJ = React.lazy(() => import("./pages/BlogJ"));
const BlogK = React.lazy(() => import("./pages/BlogK"));
const BlogL = React.lazy(() => import("./pages/BlogL"));
const BlogM = React.lazy(() => import("./pages/BlogM"));
const BlogN = React.lazy(() => import("./pages/BlogN"));
const BlogO = React.lazy(() => import("./pages/BlogO"));
const BlogP = React.lazy(() => import("./pages/BlogP"));
const BlogQ = React.lazy(() => import("./pages/BlogQ"));

// Solutions
import AVSolutions from "./pages/solutions/AVSolutions";
import CloudSolutions from "./pages/solutions/CloudSolutions";
import DeviceDeploymentMDM from "./pages/solutions/DeviceDeploymentMDM";
import GiftingSolution from "./pages/solutions/GiftingSolution";
import HRSolutions from "./pages/solutions/HRSolutions";
import ITAssetDisposal from "./pages/solutions/ITAssetDisposal";
import ITConsulting from "./pages/solutions/ITConsulting";
import ITInfrastructure from "./pages/solutions/ITInfrastructure";
import ManagedITServices from "./pages/solutions/ManagedITServices";
import NetworkingSolutions from "./pages/solutions/NetworkingSolutions";
import PaymentServices from "./pages/solutions/PaymentServices";
import Solutions from "./pages/solutions/Solutions";


// Partners
import Acer from "./pages/partners/Acer";
import Adobe from "./pages/partners/Adobe";
import Apple from "./pages/partners/Apple";
import Asus from "./pages/partners/Asus";
import Autodesk from "./pages/partners/Autodesk";
import AWS from "./pages/partners/AWS";
import Azure from "./pages/partners/Azure";
import Cisco from "./pages/partners/Cisco";
import Dell from "./pages/partners/Dell";
import HP from "./pages/partners/HP";
import JAMF from "./pages/partners/JAMF";
import Lenovo from "./pages/partners/Lenovo";
import Logitech from "./pages/partners/Logitech";
import Microsoft from "./pages/partners/Microsoft";
import Nvidia from "./pages/partners/Nvidia";
import Partners from "./pages/partners/Partners";
import Samsung from "./pages/partners/Samsung";
import Unity from "./pages/partners/Unity";
import UnrealEngine from "./pages/partners/UnrealEngine";
import Yubico from "./pages/partners/Yubico";


//  <Route path="/about" element={<About />} />



// Industries
import AEC from "./pages/industries/AEC";
import ARVRMRXR from "./pages/industries/ARVRMRXR";
import Education from "./pages/industries/Education";
import Government from "./pages/industries/Government";
import HealthcarePharma from "./pages/industries/HealthcarePharma";
import Industries from "./pages/industries/Industries";
import ITITESInfra from "./pages/industries/ITITESInfra";
import ManufacturingAutomotive from "./pages/industries/ManufacturingAutomotive";
import MediaEntertainment from "./pages/industries/MediaEntertainment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
       <BrowserRouter>
  <Suspense>
    <Routes>
          <Route path="/" element={<Index />} />

          {/* Main route */}
          <Route path="/about" element={<About />} />

          {/* Redirect old URL */}
          <Route path="/about-us" element={<Navigate to="/about" replace />} />


          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<Privacy/>}/>
          <Route path="/terms" element={<TermsAndConditions/>}/>

          {/* Solutions Routes */}
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/av-solutions" element={<AVSolutions />} />
          <Route path="/solutions/device-deployment-mdm" element={<DeviceDeploymentMDM />} />
          <Route path="/solutions/gifting-solution" element={<GiftingSolution />} />
          <Route path="/solutions/it-asset-disposal" element={<ITAssetDisposal />} />
          <Route path="/solutions/hr-solutions" element={<HRSolutions />} />
          <Route path="/solutions/it-consulting" element={<ITConsulting />} />
          <Route path="/solutions/managed-it-services" element={<ManagedITServices />} />
          <Route path="/solutions/payment-services" element={<PaymentServices />} />
          <Route path="/solutions/it-infrastructure" element={<ITInfrastructure />} />
          <Route path="/solutions/networking-solutions" element={<NetworkingSolutions />} />
          <Route path="/solutions/clould-solutions" element={<CloudSolutions />} />

          {/* Partners Routes */}
          <Route path="/partners" element={<Partners />} />
          <Route path="/partners/apple/" element={<Apple />} />
          <Route path="/partners/nvidia" element={<Nvidia />} />
          <Route path="/partners/microsoft" element={<Microsoft />} />
          <Route path="/partners/lenovo" element={<Lenovo />} />
          <Route path="/partners/autodesk" element={<Autodesk />} />
          <Route path="/partners/adobe" element={<Adobe />} />
          <Route path="/partners/samsung" element={<Samsung />} />
          <Route path="/partners/hp" element={<HP />} />
          <Route path="/partners/unity" element={<Unity />} />
          <Route path="/partners/jamf" element={<JAMF />} />
          <Route path="/partners/unreal-engine" element={<UnrealEngine />} />
          <Route path="/partners/logitech" element={<Logitech />} />
          <Route path="/partners/cisco" element={<Cisco />} />
          <Route path="/partners/asus" element={<Asus />} />
          <Route path="/partners/yubico" element={<Yubico />} />
          <Route path="/partners/dell" element={<Dell />} />
          <Route path="/partners/acer" element={<Acer />} />
          <Route path="/partners/aws" element={<AWS />} />
          <Route path="/partners/azure" element={<Azure />} />

          {/* Industries Routes */}
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/aec" element={<AEC />} />
          <Route path="/industries/media-and-entertainment" element={<MediaEntertainment />} />
          <Route path="/industries/ar-vr-mr-xr" element={<ARVRMRXR />} />
          <Route path="/industries/government" element={<Government />} />
          <Route path="/industries/it-ites-infra" element={<ITITESInfra />} />
          <Route path="/industries/healthcare-pharma" element={<HealthcarePharma />} />
          <Route path="/industries/manufacturing-automotive" element={<ManufacturingAutomotive />} />
          <Route path="/industries/Education" element={<Education />} />


<Route path="/blog/bloga" element={<BlogA />} />
<Route path="/blog/blogb" element={<BlogB />} />
<Route path="/blog/interactive-3d-business-unity-studio" element={<BlogC />} />
<Route path="/blog/blogd" element={<BlogD />} />
<Route path="/blog/bim-digital-twins-aec-redefined" element={<BlogE />} />
<Route path="/blog/microsoft-threat-protection-strengthening-enterprise-security" element={<BlogF />} />
<Route path="/blog/how-enterprises-are-using-azure-openai-to-drive-productivity-and-innovation-in-2026" element={<BlogG />} />
<Route path="/blog/why-businesses-are-choosing-dell-dual-monitor-setups-for-higher-productivity" element={<BlogH />} />
<Route path="/blog/how-real-time-3d-and-xr-are-transforming-automotive-product-development" element={<BlogI />} />
<Route path="/blog/how-microsoft-intune-is-helping-enterprises-secure-hybrid-work-and-simplify-endpoint-management" element={<BlogJ />} />
<Route path="/blog/how-real-time-3d-and-xr-are-transforming-automotive-product-development-unity" element={<BlogK />} />
<Route path="/blog/why-ai-is-reshaping-enterprise-server-and-storage-infrastructure" element={<BlogL />} />
<Route path="/blog/how-ai-powered-document-collaboration-is-transforming-modern-business-workflows" element={<BlogM />} />
<Route path="/blog/why-remote-engineering-teams-are-transforming-manufacturing-and-product-design" element={<BlogN />} />
<Route path="/blog/the-hidden-technology-behind-indias-gcc-boom-why-it-infrastructure-matters" element={<BlogO />} />
<Route path="/blog/microsoft-security-copilot-ai-powered-enterprise-cybersecurity-2026" element={<BlogP />} />
<Route path="/blog/it-asset-buyback-recover-value-protect-data" element={<BlogQ />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
            </Routes>
  </Suspense>
</BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
