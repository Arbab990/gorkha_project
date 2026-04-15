import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

export default function Volunteer() {
    const { t } = useTranslation();

    const rolesKey = "involvedPages.roles.";
    const roles = [
        { id: "community", tagsKey: "tags" },
        { id: "digital", tagsKey: "tags" },
        { id: "legal", tagsKey: "tags" },
        { id: "skill", tagsKey: "tags" },
        { id: "content", tagsKey: "tags" },
        { id: "event", tagsKey: "tags" }
    ];

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/50">
            <div className="max-w-7xl mx-auto mt-12 mb-16">
                
                {/* Header Section */}
                <div className="text-center md:mb-16 mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-heading text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight"
                    >
                        {t("involvedPages.volunteerTitle")}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-500 font-body text-lg"
                    >
                        {t("involvedPages.volunteerSubtitle")}
                    </motion.p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {roles.map((role, idx) => {
                        // get translation tags safely: it's an array in json
                        const tags = t(`${rolesKey}${role.id}.tags`, { returnObjects: true }) || [];

                        return (
                            <motion.div
                                key={role.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow flex flex-col h-full"
                            >
                                <h2 className="text-xl font-heading font-medium text-gray-800 mb-6">
                                    {t(`${rolesKey}${role.id}.title`)}
                                </h2>
                                
                                <p className="text-gray-500 font-body leading-relaxed mb-8 flex-grow">
                                    {t(`${rolesKey}${role.id}.desc`)}
                                </p>
                                
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-green-dark">
                                        <Clock size={18} strokeWidth={1.5} />
                                        <span className="text-sm font-medium text-gray-600">
                                            {t(`${rolesKey}${role.id}.time`)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-green-dark">
                                        <MapPin size={18} strokeWidth={1.5} />
                                        <span className="text-sm font-medium text-gray-600">
                                            {t(`${rolesKey}${role.id}.location`)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {Array.isArray(tags) && tags.map((tag, tIdx) => (
                                        <span 
                                            key={tIdx} 
                                            className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto flex justify-center pb-2">
                                    <button className="bg-green-dark text-white text-sm font-medium px-6 py-2.5 rounded hover:bg-orange transition-colors">
                                        {t("involvedPages.applyNow")}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
