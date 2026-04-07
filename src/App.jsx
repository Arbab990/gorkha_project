import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Story from "./components/Story";
import Partners from "./components/Partners";
import Stats from "./components/Stats";
import Priorities from "./components/Priorities";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Story />
      <Partners />
      <Stats />
      <Priorities />
      <Newsletter />
      <Footer />
    </div>
  );
}