import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import MissionVision from "./pages/MissionVision";
import Leadership from "./pages/Leadership";
import AboutFounder from "./pages/AboutFounder";
import Timeline from "./pages/Timeline";
import Founders from "./pages/Founders";
import Archives from "./pages/Archives";

// Our Work Pages
import CommunitySupport from "./pages/CommunitySupport";
import MedicalAssistance from "./pages/MedicalAssistance";
import MarriageSupport from "./pages/MarriageSupport";
import StudentRecognition from "./pages/StudentRecognition";
import CulturalActivities from "./pages/CulturalActivities";

// Event Pages
import UpcomingEvents from "./pages/UpcomingEvents";
import PastEvents from "./pages/PastEvents";

// Gallery & News
import Gallery from "./pages/Gallery";
import News from "./pages/News";

// Get Involved
import BecomeMember from "./pages/BecomeMember";
import Volunteer from "./pages/Volunteer";

// Donate & Contact
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";

import ScrollToTop from "./components/ScrollToTop";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

function Layout() {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about/our-story" element={<OurStory />} />
          <Route path="about/mission-vision" element={<MissionVision />} />
          <Route path="about/leadership" element={<Leadership />} />
          <Route path="about/about-founder" element={<AboutFounder />} />
          <Route path="legacy/timeline" element={<Timeline />} />
          <Route path="legacy/founders" element={<Founders />} />
          <Route path="legacy/archives" element={<Archives />} />

          {/* Our Work */}
          <Route path="our-work/community-support" element={<CommunitySupport />} />
          <Route path="our-work/medical-assistance" element={<MedicalAssistance />} />
          <Route path="our-work/marriage-support" element={<MarriageSupport />} />
          <Route path="our-work/student-recognition" element={<StudentRecognition />} />
          <Route path="our-work/cultural-activities" element={<CulturalActivities />} />

          {/* Events */}
          <Route path="events/upcoming" element={<UpcomingEvents />} />
          <Route path="events/past" element={<PastEvents />} />

          {/* Gallery & News */}
          <Route path="gallery" element={<Gallery />} />
          <Route path="news" element={<News />} />

          {/* Get Involved */}
          <Route path="get-involved/become-member" element={<BecomeMember />} />
          <Route path="get-involved/volunteer" element={<Volunteer />} />

          {/* Donate & Contact */}
          <Route path="donate" element={<Donate />} />
          <Route path="contact" element={<Contact />} />
          
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-conditions" element={<TermsConditions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}