import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HeartHandshake, BookOpen, ShieldCheck } from "lucide-react";

export default function Introduction() {
    const { t } = useTranslation();

    const pillars = [
        {
            icon: <HeartHandshake size={32} className="text-orange" />,
            title: t("introduction.pillar1Title"),
            desc: t("introduction.pillar1Desc")
        },
        {
            icon: <BookOpen size={32} className="text-orange" />,
            title: t("introduction.pillar2Title"),
            desc: t("introduction.pillar2Desc")
        },
        {
            icon: <ShieldCheck size={32} className="text-orange" />,
            title: t("introduction.pillar3Title"),
            desc: t("introduction.pillar3Desc")
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-50/50 p-12 md:p-16 rounded-[2rem] border border-gray-100 shadow-sm text-center"
                >
                    <h2 className="text-sm font-semibold text-orange uppercase tracking-wider mb-4">
                        {t("introduction.subtitle")}
                    </h2>
                    <div className="w-24 h-1 bg-orange mx-auto rounded-full mb-8"></div>
                    <p className="text-gray-600 font-body text-lg max-w-4xl mx-auto leading-relaxed mb-16">
                        {t("introduction.description")}
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {pillars.map((pillar, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, duration: 0.5 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                <div className="bg-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    {pillar.icon}
                                </div>
                                <h4 className="font-heading text-xl font-bold text-green-dark mb-3">
                                    {pillar.title}
                                </h4>
                                <p className="text-gray-500 leading-relaxed text-[15px]">
                                    {pillar.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
