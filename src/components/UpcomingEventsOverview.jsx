import { motion } from "framer-motion";
import { CalendarDays, Stethoscope, GraduationCap, HeartHandshake, MapPin, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function UpcomingEventsOverview() {
    const { t } = useTranslation();

    const eventsData = [
        {
            title: "Cultural Heritage Festival",
            date: "June 15, 2026",
            location: "Community Center",
            desc: "Join us for an evening of traditional music, dance, and authentic cuisine celebrating our rich roots.",
            icon: CalendarDays,
            color: "bg-orange/10 text-orange border-orange/20"
        },
        {
            title: "Annual Health Camp",
            date: "July 10, 2026",
            location: "City General Hospital",
            desc: "Free medical check-ups, eye exams, and essential health consultations for all community members.",
            icon: Stethoscope,
            color: "bg-blue-50 text-blue-600 border-blue-100"
        },
        {
            title: "Youth Leadership Summit",
            date: "August 22, 2026",
            location: "Main Hall Auditorium",
            desc: "A dedicated workshop aimed at empowering local youth with essential leadership and career skills.",
            icon: GraduationCap,
            color: "bg-indigo-50 text-indigo-600 border-indigo-100"
        },
        {
            title: "Charity Fundraiser Gala",
            date: "September 05, 2026",
            location: "Grand Palace Hotel",
            desc: "Our annual fundraising event supporting ongoing medical assistance and marriage support programs.",
            icon: HeartHandshake,
            color: "bg-pink-50 text-pink-600 border-pink-100"
        }
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
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-semibold text-orange uppercase tracking-wider mb-6"
                    >
                        {t("navbar.events") || "Upcoming Events"}
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-24 h-1 bg-orange mx-auto rounded-full"
                    />
                </div>

                {/* Vertical Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {eventsData.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="bg-gray-50/50 rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        >
                            {/* Image Placeholder */}
                            <div className="w-full aspect-[4/3] bg-gray-200 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="absolute inset-0 bg-gray-100/10 animate-pulse"></div>
                                
                                {/* Date Badge Floating over Image */}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm text-green-dark font-bold text-sm tracking-wide border border-white/50">
                                    {item.date}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
                                        <item.icon strokeWidth={2} size={20} />
                                    </div>
                                    <h4 className="font-heading text-lg font-bold text-green-dark leading-tight line-clamp-2">
                                        {item.title}
                                    </h4>
                                </div>
                                
                                <div className="flex items-center gap-2 text-orange text-sm font-medium mb-4">
                                    <MapPin size={16} />
                                    <span>{item.location}</span>
                                </div>

                                <p className="text-gray-500 font-body text-[15px] leading-relaxed flex-1">
                                    {item.desc}
                                </p>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
