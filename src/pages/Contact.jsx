import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Contact() {
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
                    {t("navbar.contactUs") || "Contact"}
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
