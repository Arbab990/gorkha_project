import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Donate() {
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
                    {t("donatePage.donateTitle") || "Donate"}
                </motion.h1>
                <div className="w-24 h-1 bg-orange mx-auto rounded-full mb-12"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white p-12 md:p-16 rounded-[2rem] shadow-xl border border-gray-100"
                >
                    <div className="text-gray-400 mb-6 flex justify-center">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-heading font-medium text-gray-500 mb-4">
                        Page Content Coming Soon
                    </h2>
                    <p className="text-gray-400 font-body">
                        This section is currently under construction.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
