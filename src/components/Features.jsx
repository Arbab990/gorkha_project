import { motion } from "framer-motion";
import { FiBook, FiUsers, FiAward } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Features() {
    const { t } = useTranslation();

    const cards = [
        {
            icon: <FiBook size={32} />,
            title: t("features.card1Title"),
            desc: t("features.card1Desc"),
        },
        {
            icon: <FiUsers size={32} />,
            title: t("features.card2Title"),
            desc: t("features.card2Desc"),
        },
        {
            icon: <FiAward size={32} />,
            title: t("features.card3Title"),
            desc: t("features.card3Desc"),
        },
    ];

    return (
        <section id="about" className="py-24 px-6 bg-white">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-4xl md:text-5xl font-bold text-green-dark mb-4"
                >
                    {t("features.heading")} <br /> {t("features.headingLine2")}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="text-gray-500 max-w-xl mx-auto mb-16 text-base"
                >
                    {t("features.description")}
                </motion.p>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                            className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm transition-shadow duration-300 cursor-default"
                        >
                            <div className="text-orange mb-5 flex justify-center">{card.icon}</div>
                            <h3 className="font-heading font-bold text-xl text-green-dark mb-3">
                                {card.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}