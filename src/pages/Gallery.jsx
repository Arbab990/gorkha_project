import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiFolder, FiArrowLeft } from "react-icons/fi";

export default function Gallery() {
    const { t } = useTranslation();
    const [activeFolder, setActiveFolder] = useState(null);

    const folders = [
        {
            id: "bada-mangal",
            title: t("galleryPage.badaMangalEvent") || "Bada Mangal Event",
            coverImage: "/images/Bada mangal1.jpg",
            images: [
                { src: "/images/Bada mangal1.jpg" },
                { src: "/images/badamangal2.jpg" },
                { src: "/images/image5.jpg" },
                { src: "/images/image6.jpg" },
                { src: "/images/image7.jpg" },
                { src: "/images/image8.jpg" },
                { src: "/images/image11.jpg" },
                { src: "/images/image12.jpg" }
            ]
        },
        {
            id: "foundation-day",
            title: t("galleryPage.foundationDay") || "11th Foundation Day",
            coverImage: "/images/foundationday1.jpg",
            images: [
                { src: "/images/foundationday1.jpg" },
                { src: "/images/foundationday2.jpg" },
                { src: "/images/foundationday3.jpg" },
                { src: "/images/image19.jpg" }
            ]
        },
        {
            id: "run-for-gorkhaland",
            title: t("galleryPage.runForGorkhaland") || "RUN For Gorkhaland",
            coverImage: "/images/image15.jpg",
            images: [
                { src: "/images/image15.jpg" },
                { src: "/images/image17.jpg" },
                { src: "/images/Gorkhalandrun1.jpg" },
                { src: "/images/gorkhalandrun3.jpg" },
                { src: "/images/gorkahlandrun4.jpg" }
            ]
        },
        {
            id: "kajri-teej",
            title: t("galleryPage.kajriTeejKaryakram") || "Kajri Teej Karyakram",
            coverImage: "/images/kajriteej1.jpg",
            images: [
                { src: "/images/image13.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/kajriteej1.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/kajriteej2.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/kajriteej3.png", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/kajriteej2016.jpg", fit: "object-contain", cardBg: "bg-black" }
            ]
        },
        {
            id: "saraswati-pooja-2025",
            title: t("galleryPage.saraswatiPooja2025") || "Saraswati Pooja 2025",
            coverImage: "/images/pooja.jpg",
            images: [
                { src: "/images/pooja.jpg" },
                { src: "/images/pooja2.jpg" }
            ]
        },
        {
            id: "fool-paati-karyakram-2017",
            title: t("galleryPage.foolPaatiKaryakram2017") || "Fool Paati Karyakram 2017",
            coverImage: "/images/foolpati1.jpg",
            images: [
                { src: "/images/foolpati1.jpg" },
                { src: "/images/foolpati2.jpg" },
                { src: "/images/foolpati3.jpg" }
            ]
        },
        {
            id: "bada-mangal-2017",
            title: t("galleryPage.badaMangal2017") || "Bada Mangal 2017",
            coverImage: "/images/Bada mangal 2017.jpg",
            images: [
                { src: "/images/Bada mangal 2017.jpg" }
            ]
        },
        {
            id: "blood-donation",
            title: t("galleryPage.bloodDonation") || "Blood Donation",
            coverImage: "/images/blooddonation1.jpg",
            images: [
                { src: "/images/blooddonation1.jpg" },
                { src: "/images/blooddonation2.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/blooddonation3.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/blooddonation4.jpg" }
            ]
        },
        {
            id: "picnic",
            title: t("galleryPage.picnic") || "Picnic",
            coverImage: "/images/picnic1.jpg",
            images: [
                { src: "/images/picnic1.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/picnic2.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/picnic3.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/picnic4.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/picnic5.jpg", fit: "object-contain", cardBg: "bg-black" }
            ]
        },
        {
            id: "felicitation-ceremony",
            title: t("galleryPage.felicitationCeremony") || "Felicitation Ceremony",
            coverImage: "/images/felicitation1.jpg",
            images: [
                { src: "/images/felicitation1.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/felicitation2.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/felicitation3.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/felicitation4.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/felicitation5.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/felicitation6.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/felicitation7.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/felicitation8.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/felicitation9.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/felicitation10.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/felicitation11.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/felicitation12.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/felicitation13.jpg", fit: "object-contain", cardBg: "bg-black" },
                { src: "/images/felicitation14.jpg", fit: "object-contain", cardBg: "bg-black" }
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/50">
            <div className="max-w-7xl mx-auto mt-12 mb-16">

                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-heading text-4xl md:text-5xl font-bold text-green-dark mb-6 leading-tight"
                    >
                        {t("galleryPage.galleryTitle") || "Gallery"}
                    </motion.h1>
                    <div className="w-24 h-1 bg-orange mx-auto rounded-full mb-8"></div>
                </div>

                <AnimatePresence mode="wait">
                    {!activeFolder ? (
                        <motion.div
                            key="folders"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {folders.map((folder) => (
                                    <motion.div
                                        key={folder.id}
                                        whileHover={{ scale: 1.03, y: -5 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setActiveFolder(folder)}
                                        className="bg-white rounded-[1.5rem] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-gray-100 hover:border-gray-200 group flex flex-col"
                                    >
                                        <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-100">
                                            {folder.coverImage ? (
                                                <img
                                                    src={folder.coverImage}
                                                    alt={folder.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                                    <FiFolder className="w-16 h-16" />
                                                </div>
                                            )}

                                            {/* Folder Overlay Gradient */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div className="p-5 flex items-center gap-4 bg-green-50 border-t border-gray-100">
                                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-orange">
                                                <FiFolder className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-heading font-semibold text-green-dark line-clamp-1">{folder.title}</h3>
                                                <p className="text-sm text-gray-500 font-body">{folder.images.length} {t("galleryPage.photos") || "Photos"}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="images"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setActiveFolder(null)}
                                        className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-orange hover:shadow-md hover:border-orange/20 transition-all border border-gray-100"
                                    >
                                        <FiArrowLeft className="w-5 h-5" />
                                    </button>
                                    <div>
                                        <h2 className="text-2xl font-heading font-bold text-green-dark">{activeFolder.title}</h2>
                                        <p className="text-gray-500 text-sm font-body">{activeFolder.images.length} {t("galleryPage.photos") || "Photos"}</p>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                            >
                                {activeFolder.images.map((img, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.03 }}
                                        className={`w-full aspect-[4/3] rounded-[1.5rem] relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-black/5 ${img.cardBg || "bg-gray-200"}`}
                                    >
                                        <img
                                            src={img.src}
                                            alt={`${activeFolder.title} - ${index + 1}`}
                                            className={`w-full h-full ${img.fit || "object-cover"} transition-transform duration-500 group-hover:scale-110 ${img.position || "object-center"}`}
                                        />
                                        <div className="absolute inset-0 bg-green-dark/0 group-hover:bg-green-dark/20 transition-colors duration-300 mix-blend-multiply"></div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
