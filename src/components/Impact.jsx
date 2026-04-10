import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

function Counter({ target, className }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 20);
        return () => clearInterval(timer);
    }, [inView, target]);

    return (
        <span ref={ref} className={className}>
            {count}
            <sup className="text-orange text-xl ml-1">+</sup>
        </span>
    );
}

export default function Impact() {
    const { t } = useTranslation();

    const impactData = [
        {
            title: "Years of service",
            target: 25,
            desc: "Decades of unwavering dedication to uplifting the community and preserving our rich cultural heritage.",
            color: "text-blue-600",
            image: "/images/image8.jpg"
        },
        {
            title: "Families supported",
            target: 750,
            desc: "Providing essential resources, healthcare, and marriage assistance to households in need.",
            color: "text-pink-600",
            image: "/images/image19.jpg"
        },
        {
            title: "Events organized",
            target: 150,
            desc: "Bringing people together through vibrant cultural celebrations and meaningful social gatherings.",
            color: "text-orange",
            image: "/images/image6.jpg"
        },
        {
            title: "Students honored",
            target: 500,
            desc: "Empowering the next generation by recognizing academic excellence and outstanding achievements.",
            color: "text-indigo-600",
            image: "/images/image17.jpg"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="py-24 bg-gray-50/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-semibold text-orange uppercase tracking-wider mb-6"
                    >
                        Impact
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-24 h-1 bg-orange mx-auto rounded-full"
                    />
                </div>

                {/* Vertical Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {impactData.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        >
                            {/* Card Image */}
                            <div className="w-full aspect-[4/3] bg-gray-200 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                                {item.image ? (
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                            <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="absolute inset-0 bg-gray-100/10 animate-pulse"></div>
                                    </>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex-1 flex flex-col items-start">
                                <div className="mb-1 transition-transform duration-300 group-hover:scale-105 origin-left">
                                    <Counter target={item.target} className={`font-heading text-4xl font-bold ${item.color}`} />
                                </div>
                                <h4 className="font-heading text-lg font-bold text-green-dark leading-tight mb-3">
                                    {item.title}
                                </h4>
                                <p className="text-gray-500 font-body text-[15px] leading-relaxed flex-1">
                                    {item.desc}
                                </p>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
