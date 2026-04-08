import Hero from "../components/Hero";
import Introduction from "../components/Introduction";
import OurWorkOverview from "../components/OurWorkOverview";
import Legacy from "../components/Legacy";
import Impact from "../components/Impact";
import UpcomingEventsOverview from "../components/UpcomingEventsOverview";
import GalleryOverview from "../components/GalleryOverview";
import Testimonials from "../components/Testimonials";
import FinalCallToAction from "../components/FinalCallToAction";

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
            <FinalCallToAction />
        </div>
    );
}
