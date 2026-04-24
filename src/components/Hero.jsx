import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const slides = [
    { url: "/images/optimized/beautiful-scenery-mountainous-landscape-covered-with-snow-cloudy-sky.webp", position: "center" },
    { url: "/images/optimized/pexels-micklatter-31540737.webp", position: "center" },
    { url: "/images/optimized/pexels-micklatter-15519578.webp", position: "center 20%" },
    { url: "/images/optimized/pexels-prabin-adhikari-1090022431-20651038.webp", position: "center" },
];

const AUTOPLAY_INTERVAL = 5000;

export default function Hero() {
    const { t } = useTranslation();
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(next, AUTOPLAY_INTERVAL);
        return () => clearInterval(timer);
    }, [next]);

    // Preload all slide images into browser cache
    useEffect(() => {
        slides.forEach((slide) => {
            const img = new Image();
            img.src = slide.url;
        });
    }, []);

    const slideVariants = {
        enter: (dir) => ({ 
            x: dir > 0 ? "100%" : "-100%", 
            opacity: 0,
            zIndex: 1
        }),
        center: { 
            x: 0, 
            opacity: 1,
            zIndex: 1
        },
        exit: { 
            x: 0, 
            opacity: 0,
            zIndex: 0,
            transition: { opacity: { duration: 0.4 } }
        },
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-green-dark"
        >
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ 
                        x: { type: "tween", duration: 0.8, ease: "easeInOut" },
                        opacity: { duration: 0.4 }
                    }}
                    className="absolute inset-0 bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url('${slides[current].url}')`,
                        backgroundPosition: slides[current].position,
                    }}
                />
            </AnimatePresence>

            <div className="absolute inset-0 bg-green-dark/50 z-[5]" />

            <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
                >
                    {t("hero.heading1")}{" "}
                    <br />
                    <span className="text-orange">{t("hero.heading2")}</span> {t("hero.heading3")}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                    className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body"
                >
                    {t("hero.description")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <motion.a
                        href="#join"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-orange text-white px-6 py-3 rounded font-semibold text-sm uppercase tracking-widest hover:bg-orange-light transition-all duration-300 shadow-lg hover:shadow-orange/30"
                    >
                        {t("hero.joinCommunity")}
                    </motion.a>
                    
                    <motion.a
                        href="#donate"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded font-semibold text-sm uppercase tracking-widest hover:bg-white/20 transition-all duration-300 shadow-lg"
                    >
                        {t("hero.supportDonate")}
                    </motion.a>
                </motion.div>
            </div>

            <button
                onClick={prev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors duration-200"
            >
                <HiChevronLeft size={24} />
            </button>
            <button
                onClick={next}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors duration-200"
            >
                <HiChevronRight size={24} />
            </button>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center pt-2 z-20"
            >
                <div className="w-1 h-3 bg-white/70 rounded-full" />
            </motion.div>
        </section>
    );
}