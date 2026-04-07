import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const partnerNames = ["NATURALY", "NATUCOLOGY", "ECOGROUP", "NATURCALL"];

export default function Partners() {
    const { t } = useTranslation();

    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-5xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-4xl font-bold text-green-dark mb-4"
                >
                    {t("partners.heading")}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="text-gray-500 max-w-xl mx-auto mb-14 text-sm"
                >
                    {t("partners.description")}
                </motion.p>

                <div className="flex flex-wrap justify-center items-center gap-10">
                    {partnerNames.map((name, i) => (
                        <motion.div
                            key={name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-3 cursor-pointer grayscale hover:grayscale-0 transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-full bg-orange/80 flex items-center justify-center text-white font-bold text-xs">
                                {name[0]}
                            </div>
                            <div className="text-left">
                                <p className="font-heading font-bold text-green-dark text-sm">
                                    {name}
                                </p>
                                <p className="text-gray-400 text-xs">{t("partners.sloganHere")}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}