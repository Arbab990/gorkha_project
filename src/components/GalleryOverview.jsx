import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function GalleryOverview() {
    const { t } = useTranslation();

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    // Array of 4 items for the grid
    const placeholders = [1, 2, 3, 4];

    return (
        <section className="py-24 bg-gray-50/50 relative overflow-hidden">
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
                        {t("navbar.gallery") || "Gallery"}
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-24 h-1 bg-orange mx-auto rounded-full"
                    />
                </div>

                {/* Photo Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {placeholders.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03 }}
                            className="w-full aspect-[4/3] bg-gray-200 rounded-2xl relative overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-black/5"
                        >
                            {/* SVG Placeholder Icon */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-gray-100/40 animate-pulse"></div>
                            
                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 bg-green-dark/0 group-hover:bg-green-dark/10 transition-colors duration-300"></div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View More Button */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-block"
                    >
                        <Link to="/gallery">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-orange text-white px-6 py-2.5 rounded-full font-medium text-xs uppercase tracking-[0.15em] hover:bg-orange-light transition-all duration-300 shadow-md hover:shadow-orange/30"
                            >
                                View More
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
