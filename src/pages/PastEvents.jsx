import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function PastEvents() {
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
                    {t("eventPages.pastEventsTitle")}
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
