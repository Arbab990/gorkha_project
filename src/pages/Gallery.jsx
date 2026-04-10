import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Gallery() {
    const { t } = useTranslation();

    const galleryImages = [
        { src: "/images/image5.jpg" },
        { src: "/images/image6.jpg" },
        { src: "/images/image7.jpg" },
        { src: "/images/image8.jpg" },
        { src: "/images/image9.jpg" },
        { src: "/images/image10.jpg", position: "object-[center_15%]" },
        { src: "/images/image11.jpg" },
        { src: "/images/image12.jpg" },
        { src: "/images/image13.jpg" },
        { src: "/images/image14.jpg", position: "object-top" },
        { src: "/images/image15.jpg" },
        { src: "/images/image16.jpg" }
    ];

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

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/50">
            <div className="max-w-7xl mx-auto mt-12 mb-16">
                
                <div className="text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-heading text-4xl md:text-5xl font-bold text-green-dark mb-6 leading-tight"
                    >
                        {t("galleryPage.galleryTitle") || "Gallery"}
                    </motion.h1>
                    <div className="w-24 h-1 bg-orange mx-auto rounded-full mb-16"></div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03 }}
                            className="w-full aspect-[4/3] bg-gray-200 rounded-[1.5rem] relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-black/5"
                        >
                            <img 
                                src={img.src} 
                                alt={`Gallery image ${index + 1}`} 
                                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${img.position || 'object-center'}`} 
                            />
                            
                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 bg-green-dark/0 group-hover:bg-green-dark/20 transition-colors duration-300 mix-blend-multiply"></div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </div>
    );
}
