import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Priorities() {
    const { t } = useTranslation();

    const images = [
        {
            src: "/images/gorkha.jpg",
            alt: t("priorities.treePlanting"),
        },
        {
            src: "/images/pexels-yohantha-gunawarna-1265127381-24032619.jpg",
            alt: t("priorities.recycling"),
        },
        {
            src: "/images/beautiful-scenery-mountainous-landscape-covered-with-snow-cloudy-sky.jpg",
            alt: t("priorities.beachCleanup"),
        },
    ];

    return (
        <section id="campaign" className="py-24 px-6 bg-white">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-4xl md:text-5xl font-bold text-green-dark mb-4"
                >
                    {t("priorities.heading")}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="text-gray-500 max-w-xl mx-auto mb-14 text-sm"
                >
                    {t("priorities.description")}
                </motion.p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {images.map((img, i) => (
                        <motion.div
                            key={img.alt}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            whileHover={{ scale: 1.03 }}
                            className="rounded-2xl overflow-hidden h-80 shadow-md cursor-pointer"
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                        </motion.div>
                    ))}
                </div>

                <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="inline-block bg-orange text-white px-10 py-3 rounded font-semibold text-sm uppercase tracking-wider hover:bg-orange-light transition-colors"
                >
                    {t("priorities.viewMore")}
                </motion.a>
            </div>
        </section>
    );
}