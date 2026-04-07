import Hero from "../components/Hero";
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
            <Features />
            <Story />
            <Partners />
            <Stats />
            <Priorities />
            <Newsletter />
        </div>
    );
}
