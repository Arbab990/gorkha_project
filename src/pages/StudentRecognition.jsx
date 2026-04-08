import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function StudentRecognition() {
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
                    {t("workPages.studentRecognitionTitle")}
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
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
