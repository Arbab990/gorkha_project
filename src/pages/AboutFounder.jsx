import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function AboutFounder() {
    const { t } = useTranslation();

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/50">
            
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 mb-16">
                
                {/* Left Content Area */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-3/5"
                >
                    <div className="inline-block px-3 py-1 mb-6 rounded-md bg-white border border-gray-200 text-sm font-medium text-gray-500 shadow-sm">
                        {t("aboutPages.aboutFounder")}
                    </div>
                    
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-green-dark mb-10 leading-tight">
                        {t("aboutPages.aboutFounderTitle")}
                    </h1>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold font-heading text-green-dark mb-3">{t("aboutFounderPage.para1Title")}</h2>
                            <p className="text-gray-600 leading-relaxed font-body text-lg">
                                {t("aboutFounderPage.para1Text")}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-heading text-green-dark mb-3">{t("aboutFounderPage.para2Title")}</h2>
                            <p className="text-gray-600 leading-relaxed font-body text-lg">
                                {t("aboutFounderPage.para2Text")}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-heading text-green-dark mb-3">{t("aboutFounderPage.para3Title")}</h2>
                            <p className="text-gray-600 leading-relaxed font-body text-lg">
                                {t("aboutFounderPage.para3Text")}
                            </p>
                        </section>
                    </div>
                </motion.div>

                {/* Right Image Area */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:w-2/5"
                >
                    <div className="sticky top-28">
                        <img 
                            src="/images/VBThapa.png" 
                            alt="Ved Bahadur Thapa" 
                            className="w-full h-auto rounded-2xl shadow-2xl object-contain min-h-0 bg-white"
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
