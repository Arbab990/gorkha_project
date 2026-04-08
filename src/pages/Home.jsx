import Hero from "../components/Hero";
import Introduction from "../components/Introduction";
import OurWorkOverview from "../components/OurWorkOverview";
import Legacy from "../components/Legacy";
import Impact from "../components/Impact";
import UpcomingEventsOverview from "../components/UpcomingEventsOverview";
import GalleryOverview from "../components/GalleryOverview";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import Story from "../components/Story";
import Partners from "../components/Partners";
import Stats from "../components/Stats";
import Priorities from "../components/Priorities";
import Newsletter from "../components/Newsletter";

export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <Hero />
            <Introduction />
            <OurWorkOverview />
            <Legacy />
            <Impact />
            <UpcomingEventsOverview />
            <GalleryOverview />
            <Testimonials />
            <Features />
            <Story />
            <Partners />
            <Stats />
            <Priorities />
            <Newsletter />
        </div>
    );
}
