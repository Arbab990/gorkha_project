import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CalendarX } from "lucide-react";
import { Link } from "react-router-dom";

export default function UpcomingEvents() {
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
                    {t("eventPages.upcomingEventsTitle")}
                </motion.h1>
                <div className="w-24 h-1 bg-orange mx-auto rounded-full mb-12"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white p-12 md:p-20 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center max-w-3xl mx-auto"
                >
                    <div className="text-gray-300 mb-8 bg-gray-50 p-8 rounded-full border-4 border-gray-100">
                        <CalendarX size={72} strokeWidth={1} />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-gray-700 mb-4">
                        {t("eventPages.noEventsTitle")}
                    </h2>
                    <p className="text-gray-500 font-body text-lg leading-relaxed mb-10 max-w-lg">
                        {t("eventPages.noEventsDesc")}
                    </p>
                    
                    <Link
                        to="/events/past"
                        className="inline-flex items-center justify-center px-8 py-3.5 bg-green-dark text-white font-medium rounded-full hover:bg-orange transition-colors duration-300 shadow-md hover:shadow-lg font-heading tracking-wide"
                    >
                        {t("eventPages.browsePastEvents")}
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
