import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Founders() {
    const { t } = useTranslation();
    const leaders = t("leadershipPage.leaders", { returnObjects: true });

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/50">
            <div className="max-w-7xl mx-auto mt-12 mb-16">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-heading text-4xl md:text-5xl font-bold text-green-dark mb-6 leading-tight"
                    >
                        {t("legacyPages.foundersTitle")}
                    </motion.h1>
                    <div className="w-24 h-1 bg-orange mx-auto rounded-full mb-8"></div>
                    <p className="text-gray-600 text-lg md:text-xl font-body leading-relaxed max-w-2xl mx-auto">
                        {t("legacyPages.foundersSubtitle")}
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.isArray(leaders) && leaders.map((leader, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center flex flex-col items-center hover:shadow-md transition-shadow"
                        >
                            <div className="w-20 h-20 bg-green-dark/5 rounded-full flex items-center justify-center border border-green-dark/10 mb-6">
                                <span className="text-green-dark font-bold text-xl">{leader.initials}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 font-heading mb-1">{leader.name}</h3>
                            <p className="text-orange text-sm font-medium mb-5">{leader.role}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {leader.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
