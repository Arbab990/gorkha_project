import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HeartPulse, HeartHandshake, Award, Globe, Target, Eye, Shield, TrendingUp, Star, Link } from "lucide-react";

export default function MissionVision() {
    const { t } = useTranslation();

    const missionPoints = [
        { icon: <HeartPulse size={20} />, text: t("missionVisionPage.missionPoint1") },
        { icon: <HeartHandshake size={20} />, text: t("missionVisionPage.missionPoint2") },
        { icon: <Award size={20} />, text: t("missionVisionPage.missionPoint3") },
        { icon: <Globe size={20} />, text: t("missionVisionPage.missionPoint4") },
    ];

    const visionPoints = [
        { icon: <Shield size={20} />, text: t("missionVisionPage.visionPoint1") },
        { icon: <TrendingUp size={20} />, text: t("missionVisionPage.visionPoint2") },
        { icon: <Star size={20} />, text: t("missionVisionPage.visionPoint3") },
        { icon: <Link size={20} />, text: t("missionVisionPage.visionPoint4") },
    ];

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto text-center mt-12 mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-4xl md:text-5xl font-bold text-green-dark mb-6 leading-tight"
                >
                    {t("missionVisionPage.title")}
                </motion.h1>
                <div className="w-24 h-1 bg-orange mx-auto rounded-full mb-8"></div>
            </div>

            <div className="max-w-5xl mx-auto flex flex-col gap-12">
                
                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="bg-white p-10 md:p-12 rounded-3xl shadow-lg border border-gray-100"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-orange/10 p-3 rounded-full text-orange">
                            <Target size={28} />
                        </div>
                        <h2 className="text-3xl font-bold text-green-dark font-heading">{t("missionVisionPage.missionTitle")}</h2>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed font-body text-lg mb-8">
                        {t("missionVisionPage.missionLead")}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {missionPoints.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100/50 hover:bg-orange/5 transition-colors">
                                <div className="text-orange mt-1">{point.icon}</div>
                                <p className="text-gray-700 font-medium leading-snug pt-1">{point.text}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-gray-600 leading-relaxed font-body text-lg font-medium border-l-4 border-orange pl-4 bg-gray-50 p-4 rounded-r-xl">
                        {t("missionVisionPage.missionEnd")}
                    </p>
                </motion.div>

                {/* Vision Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="bg-green-dark p-10 md:p-12 rounded-3xl shadow-lg text-white"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-white/10 p-3 rounded-full text-white">
                            <Eye size={28} />
                        </div>
                        <h2 className="text-3xl font-bold font-heading">{t("missionVisionPage.visionTitle")}</h2>
                    </div>
                    
                    <p className="text-white/90 leading-relaxed font-body text-lg mb-8">
                        {t("missionVisionPage.visionLead")}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {visionPoints.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="text-orange mt-1">{point.icon}</div>
                                <p className="text-white/90 font-medium leading-snug pt-1">{point.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
                
            </div>
        </div>
    );
}
