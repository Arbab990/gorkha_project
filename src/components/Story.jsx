import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function Story() {
    const { t } = useTranslation();

    const bullets = [
        t("story.education"),
        t("story.campaign"),
        t("story.environmental"),
        t("story.advocation"),
    ];

    return (
        <section className="py-24 px-6 bg-gray-50 overflow-hidden">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* Image Collage */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative h-[420px]"
                >
                    <motion.div
                        className="absolute top-0 left-4 w-64 h-72 rounded-2xl bg-cover bg-center shadow-md cursor-pointer"
                        style={{
                            backgroundImage:
                                "url('/images/gorkha.jpg')",
                        }}
                        whileHover={{ rotate: 15, scale: 1.05 }}
                        transition={{ duration: 0.6, type: "spring" }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-16 w-72 h-64 rounded-2xl bg-cover bg-center shadow-xl border-4 border-white cursor-pointer"
                        style={{
                            backgroundImage:
                                "url('/images/pexels-micklatter-15519578.jpg')",
                        }}
                        whileHover={{ rotate: -15, scale: 1.05 }}
                        transition={{ duration: 0.6, type: "spring" }}
                    />
                    <div className="absolute -bottom-4 left-8 w-12 h-12 rounded-full bg-orange opacity-20" />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-green-dark mb-6 leading-tight">
                        {t("story.heading")}
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed mb-8">
                        {t("story.description")}
                    </p>

                    <div className="grid grid-cols-2 gap-y-3 mb-10">
                        {bullets.map((item) => (
                            <div key={item} className="flex items-center gap-2">
                                <span className="w-5 h-0.5 bg-orange inline-block" />
                                <span className="text-gray-700 text-sm font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-orange text-white px-8 py-3 rounded font-semibold text-sm uppercase tracking-wider hover:bg-orange-light transition-colors"
                        >
                            {t("story.readMore")}
                        </motion.a>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-3 font-semibold text-gray-700"
                        >
                            <span className="w-12 h-12 rounded-full bg-orange/20 flex items-center justify-center text-orange hover:bg-orange/30 transition-colors">
                                <FiPlay size={18} fill="currentColor" />
                            </span>
                            {t("story.watchVideo")}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}