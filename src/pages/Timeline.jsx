import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Flag, Landmark, BookOpen, Building2, Network } from "lucide-react";

export default function Timeline() {
    const { t } = useTranslation();
    const events = t("legacyPages.timelineEvents", { returnObjects: true });
    const [activeIndex, setActiveIndex] = useState(0);

    if (!Array.isArray(events)) return null;

    const icons = [
        <MessageSquare size={24} />,
        <Flag size={24} />,
        <Landmark size={24} />,
        <BookOpen size={24} />,
        <Building2 size={24} />,
        <Network size={24} />
    ];

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/50">
            <div className="max-w-6xl mx-auto mt-12 mb-16">
                
                <div className="text-center mb-16 md:mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-heading text-4xl md:text-5xl font-bold text-green-dark mb-6 leading-tight flex items-center justify-center gap-4"
                    >
                        {t("legacyPages.timelineTitle")}
                    </motion.h1>
                    <div className="w-24 h-1 bg-orange mx-auto rounded-full mb-12"></div>
                </div>

                {/* RESPONSIVE TIMELINE WRAPPER */}
                <div className="relative mb-8 px-2 md:px-10 lg:px-4 md:overflow-x-auto pb-6 md:pb-56 custom-scrollbar">
                    
                    {/* Desktop continuous line positioned perfectly behind icons */}
                    <div className="absolute top-[8rem] left-[5%] right-[5%] h-1 bg-gray-200 hidden md:block rounded-full z-0"></div>
                    
                    {/* Mobile continuous line */}
                    <div className="absolute top-4 bottom-4 left-[3rem] w-1 bg-gray-200 block md:hidden rounded-full z-0"></div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 md:min-w-[900px] relative z-10 w-full pt-4">
                        {events.map((event, idx) => {
                            const isActive = activeIndex === idx;
                            return (
                                <div key={idx} className="flex flex-row md:flex-col items-start md:items-center group w-full md:w-40 relative" onClick={() => setActiveIndex(idx)}>
                                    
                                    {/* Desktop Year & Heading Label (Hidden on mobile) */}
                                    <motion.div 
                                        className={`hidden md:flex flex-col items-center justify-end h-20 mb-4 transition-all duration-300 w-full cursor-pointer
                                          ${isActive ? "scale-105" : "opacity-80 group-hover:opacity-100"}`}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <span className="text-orange font-bold text-[15px] tracking-wider mb-1">{event.year}</span>
                                        <h3 className="font-heading font-bold text-green-dark text-[14px] text-center leading-snug px-1 line-clamp-3">
                                            {event.title}
                                        </h3>
                                    </motion.div>
                                    
                                    {/* Node Icon Cluster (Both mobile and desktop) */}
                                    <div className="flex items-center cursor-pointer shrink-0 ml-2 md:ml-0 z-10 md:justify-center md:w-auto">
                                        <motion.div 
                                            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-md bg-white shrink-0
                                                ${isActive ? "border-orange text-orange scale-110 shadow-orange/20" : "border-gray-200 text-gray-400 group-hover:border-green-dark/30 group-hover:text-green-dark"}
                                            `}
                                            whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, delay: idx * 0.1 }}
                                        >
                                            {icons[idx] || <Flag size={20} />}
                                        </motion.div>
                                    </div>

                                    {/* Mobile Only: Inline Content beside the icon */}
                                    <div className="block md:hidden ml-6 flex-1 w-full pt-1 cursor-pointer">
                                        <div className={`transition-colors duration-300 ${isActive ? "text-green-dark" : "text-gray-500 hover:text-green-dark"}`}>
                                            <span className="text-orange font-bold text-sm tracking-wider mr-2">{event.year}</span>
                                            <h3 className="text-xl font-bold font-heading mb-2 leading-tight">{event.title}</h3>
                                        </div>
                                        
                                        {/* Expandable Description on Mobile */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="bg-white p-5 mt-3 rounded-2xl shadow-sm border border-gray-100 text-gray-600 text-[15px] leading-relaxed">
                                                        {event.desc}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Desktop Only: Absolute Info Popover Card */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                                transition={{ duration: 0.3 }}
                                                className="hidden md:block absolute top-[115%] left-1/2 -translate-x-1/2 w-64 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 z-50 text-center pointer-events-none"
                                            >
                                                {/* Tooltip triangle notch */}
                                                <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white filter drop-shadow-[0_-5px_5px_rgba(0,0,0,0.03)] z-0"></div>
                                                
                                                <div className="relative z-10">
                                                    <div className="w-8 h-1 bg-orange mx-auto mb-3 rounded-full"></div>
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        {event.desc}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
