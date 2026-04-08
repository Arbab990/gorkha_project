import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Testimonials() {
    const { t } = useTranslation();

    const testimonialsData = t("testimonials.items", { returnObjects: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
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
                        {t("testimonials.heading")}
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-24 h-1 bg-orange mx-auto rounded-full"
                    />
                </div>

                {/* Testimonials Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {Array.isArray(testimonialsData) && testimonialsData.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="bg-[#fafbfb] rounded-[1.25rem] p-8 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                        >
                            {/* Quote Icon */}
                            <div className="mb-4 text-green-dark/20">
                                <Quote fill="currentColor" stroke="none" size={42} className="rotate-180" />
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-600 font-body text-base italic leading-relaxed mb-6 flex-1">
                                &quot;{item.text}&quot;
                            </p>

                            {/* Stars */}
                            <div className="flex gap-1 mb-6 text-[#f5b82e]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} fill="currentColor" stroke="none" size={18} />
                                ))}
                            </div>

                            {/* Divider Line */}
                            <div className="w-full h-[1px] bg-gray-200 mb-6"></div>

                            {/* Footer Info */}
                            <div>
                                <h4 className="font-heading font-bold text-gray-800 text-[17px] mb-1">
                                    {item.name}
                                </h4>
                                <p className="text-xs text-gray-500 mb-3">
                                    {item.location}
                                </p>
                                <span className="inline-block bg-gray-200 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-md">
                                    {item.badge}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
