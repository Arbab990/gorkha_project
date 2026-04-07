import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiBookOpen, FiBook, FiUsers, FiHeart, FiShield, FiSun } from "react-icons/fi";

export default function OurStory() {
    const { t } = useTranslation();

    const standsFor = [
        { icon: <FiBookOpen size={20} />, text: t("ourStoryPage.standFor1") },
        { icon: <FiBook size={20} />, text: t("ourStoryPage.standFor2") },
        { icon: <FiUsers size={20} />, text: t("ourStoryPage.standFor3") },
        { icon: <FiHeart size={20} />, text: t("ourStoryPage.standFor4") },
        { icon: <FiShield size={20} />, text: t("ourStoryPage.standFor5") },
    ];

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/30">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
                
                {/* Left Content Area */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-3/5"
                >
                    <div className="inline-block px-3 py-1 mb-6 rounded-md bg-white border border-gray-200 text-sm font-medium text-gray-500 shadow-sm">
                        {t("aboutPages.ourStory")}
                    </div>
                    
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-green-dark mb-10 leading-tight">
                        {t("ourStoryPage.spiritTitle")}
                    </h1>

                    <div className="space-y-8">
                        {/* Section 1 */}
                        <section>
                            <p className="text-gray-600 leading-relaxed font-body text-lg">
                                {t("ourStoryPage.spiritText")}
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <p className="text-gray-600 leading-relaxed font-body text-lg">
                                {t("ourStoryPage.needText")}
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section className="pt-4">
                            <h2 className="text-xl font-bold font-heading text-green-dark mb-2">{t("ourStoryPage.beginningTitle")}</h2>
                            <p className="text-gray-600 leading-relaxed font-body text-lg">
                                {t("ourStoryPage.beginningText")}
                            </p>
                        </section>

                        {/* Section 4: What We Stand For */}
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-8 mb-8">
                            <h2 className="text-2xl font-bold font-heading text-green-dark mb-6 flex items-center gap-3">
                                <FiSun className="text-orange" />
                                {t("ourStoryPage.standForTitle")}
                            </h2>
                            <ul className="space-y-4">
                                {standsFor.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="mt-1 text-orange bg-orange/10 p-2 rounded-full">
                                            {item.icon}
                                        </div>
                                        <span className="text-gray-700 text-lg font-medium pt-1">
                                            {item.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <p className="text-gray-600 leading-relaxed font-body text-lg">
                                {t("ourStoryPage.lookingAheadText")}
                            </p>
                        </section>

                        {/* Section 6 */}
                        <section className="bg-orange/5 p-8 rounded-2xl border border-orange/20 text-center mt-8">
                            <h2 className="text-2xl font-bold font-heading text-orange mb-3">{t("ourStoryPage.invitationTitle")}</h2>
                            <p className="text-gray-700 font-medium font-body text-lg mx-auto max-w-lg">
                                {t("ourStoryPage.invitationText")}
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
                            src="/images/gurkha_memorial.jpg" 
                            alt="Gorkha Memorial" 
                            className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                            style={{ maxHeight: '80vh' }}
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
