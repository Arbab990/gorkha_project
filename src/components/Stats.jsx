import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FiFeather, FiCheckCircle, FiSmile } from "react-icons/fi";
import { useTranslation } from "react-i18next";

function Counter({ target }) {
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
        <span ref={ref} className="font-heading text-5xl font-bold text-white">
            {count}
            <sup className="text-orange text-2xl">+</sup>
        </span>
    );
}

export default function Stats() {
    const { t } = useTranslation();

    const stats = [
        { icon: <FiFeather size={36} />, value: 750, label: t("stats.treesPlant") },
        { icon: <FiCheckCircle size={36} />, value: 750, label: t("stats.caseSolved") },
        { icon: <FiSmile size={36} />, value: 750, label: t("stats.youngVolunteer") },
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=1600&q=80')",
                }}
            />
            <div className="absolute inset-0 bg-green-dark/85" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-orange mb-6 leading-tight">
                        {t("stats.heading")}
                    </h2>
                    <p className="text-white/70 text-base leading-relaxed mb-14">
                        {t("stats.description")}
                    </p>

                    <div className="flex flex-wrap gap-12">
                        {stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className="flex flex-col items-start gap-2"
                            >
                                <span className="text-orange">{s.icon}</span>
                                <Counter target={s.value} />
                                <p className="text-white/70 text-sm uppercase tracking-wide">
                                    {s.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="hidden lg:block rounded-2xl overflow-hidden h-96 shadow-2xl"
                >
                    <img
                        src="/images/pexels-chandan-thapa-3746720-5569095.jpg"
                        alt={t("stats.volunteersAlt")}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>
        </section>
    );
}