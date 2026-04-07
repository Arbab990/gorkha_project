import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Archives() {
    const { t } = useTranslation();

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto text-center mt-12 mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-4xl md:text-5xl font-bold text-green-dark mb-6 leading-tight"
                >
                    {t("legacyPages.archivesTitle")}
                </motion.h1>
                <div className="w-24 h-1 bg-orange mx-auto rounded-full mb-8"></div>
                <p className="text-gray-600 text-lg md:text-xl font-body leading-relaxed max-w-2xl mx-auto">
                    This page will display the archives...
                </p>
            </div>
        </div>
    );
}
