import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Stethoscope, HeartHandshake, GraduationCap, Palette } from "lucide-react";

export default function OurWorkOverview() {
    const { t } = useTranslation();

    const workItems = [
        {
            i18nKey: "workPages.medicalAssistance",
            defaultLabel: "Medical Assistance",
            descriptionKey: "workOverview.medicalDesc",
            defaultDesc: "Providing essential healthcare resources and medical aid to those in need.",
            icon: Stethoscope,
            color: "bg-blue-50 text-blue-600",
        },
        {
            i18nKey: "workPages.marriageSupport",
            defaultLabel: "Marriage Support",
            descriptionKey: "workOverview.marriageDesc",
            defaultDesc: "Assisting families to conduct dignified marriages for their daughters.",
            icon: HeartHandshake,
            color: "bg-pink-50 text-pink-600",
        },
        {
            i18nKey: "workPages.studentRecognition",
            defaultLabel: "Student Recognition",
            descriptionKey: "workOverview.studentDesc",
            defaultDesc: "Empowering youth by acknowledging and rewarding academic excellence.",
            icon: GraduationCap,
            color: "bg-indigo-50 text-indigo-600",
        },
        {
            i18nKey: "workPages.culturalActivities",
            defaultLabel: "Cultural Activities",
            descriptionKey: "workOverview.culturalDesc",
            defaultDesc: "Preserving and celebrating our rich heritage through community events.",
            icon: Palette,
            color: "bg-orange/10 text-orange",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="py-24 bg-gray-50/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-semibold text-orange uppercase tracking-wider mb-6"
                    >
                        {t("navbar.ourWork") || "Our Work"}
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-24 h-1 bg-orange mx-auto rounded-full"
                    />
                </div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {workItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
                                <item.icon strokeWidth={1.5} size={28} />
                            </div>
                            <h4 className="font-heading text-xl font-bold text-green-dark text-center">
                                {t(item.i18nKey) || item.defaultLabel}
                            </h4>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
