import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Introduction() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-50/50 p-12 md:p-16 rounded-[2rem] border border-gray-100 shadow-sm"
                >
                    <h2 className="text-sm font-semibold text-orange uppercase tracking-wider mb-6">
                        Introduction
                    </h2>
                    <div className="w-24 h-1 bg-orange mx-auto rounded-full mb-8"></div>
                    <p className="text-gray-500 font-body text-lg max-w-3xl mx-auto leading-relaxed">
                        Brief overview of the organization and its purpose.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
