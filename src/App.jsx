import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import MissionVision from "./pages/MissionVision";
import Leadership from "./pages/Leadership";
import Timeline from "./pages/Timeline";
import Founders from "./pages/Founders";
import Archives from "./pages/Archives";
import ScrollToTop from "./components/ScrollToTop";

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
          <Route path="legacy/timeline" element={<Timeline />} />
          <Route path="legacy/founders" element={<Founders />} />
          <Route path="legacy/archives" element={<Archives />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}