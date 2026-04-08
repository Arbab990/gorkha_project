import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiBookOpen, FiBook, FiUsers, FiHeart, FiShield, FiSun } from "react-icons/fi";

export default function OurStory() {
    const { t } = useTranslation();

    // Removed the 5th element via standard definition, or we can just slice.
    // The user requested to take only 4 out of 5 of them.
    const standsFor = [
        { icon: <FiBookOpen size={24} />, text: t("ourStoryPage.standFor1") },
        { icon: <FiBook size={24} />, text: t("ourStoryPage.standFor2") },
        { icon: <FiUsers size={24} />, text: t("ourStoryPage.standFor3") },
        { icon: <FiHeart size={24} />, text: t("ourStoryPage.standFor4") },
    ];

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/30">
            
            {/* Top Reading Section with Image */}
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 mb-16">
                
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
                        <section>
                            <p className="text-gray-600 leading-relaxed font-body text-lg">
                                {t("ourStoryPage.spiritText")}
                            </p>
                        </section>

                        <section>
                            <p className="text-gray-600 leading-relaxed font-body text-lg">
                                {t("ourStoryPage.needText")}
                            </p>
                        </section>

                        <section className="pt-4">
                            <h2 className="text-xl font-bold font-heading text-green-dark mb-2">{t("ourStoryPage.beginningTitle")}</h2>
                            <p className="text-gray-600 leading-relaxed font-body text-lg">
                                {t("ourStoryPage.beginningText")}
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
                            style={{ maxHeight: '75vh' }}
                        />
                    </div>
                </motion.div>

            </div>

            {/* Bottom Expanding Cards Section */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-6xl mx-auto space-y-16"
            >
                {/* Section 4: What We Stand For (Horizontal 2x2 Grid) */}
                <section className="bg-white p-10 md:p-14 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center">
                    <h2 className="text-3xl font-bold font-heading text-green-dark mb-10 flex items-center justify-center gap-3 text-center">
                        <FiSun className="text-orange" size={32} />
                        {t("ourStoryPage.standForTitle")}
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 w-full max-w-4xl mx-auto">
                        {standsFor.map((item, index) => (
                            <li key={index} className="flex items-center gap-6 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="shrink-0 text-orange bg-orange/10 p-4 rounded-full flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <span className="text-gray-700 text-xl font-medium leading-tight">
                                    {item.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Section 5: Looking Ahead */}
                <section className="max-w-4xl mx-auto text-center px-4">
                    <div className="w-16 h-1 bg-gray-200 mx-auto rounded-full mb-8"></div>
                    <p className="text-gray-600 leading-relaxed font-body text-xl">
                        {t("ourStoryPage.lookingAheadText")}
                    </p>
                </section>

                {/* Section 6: Open Invitation (Horizontal Card) */}
                <section className="bg-orange/5 p-8 md:px-12 md:py-10 rounded-2xl border border-orange/20 mt-8 flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-center md:text-left shrink-0">
                        <h2 className="text-2xl font-bold font-heading text-orange mb-2">
                            {t("ourStoryPage.invitationTitle")}
                        </h2>
                        <div className="w-12 h-1 bg-orange/30 mx-auto md:mx-0 rounded-full mt-3"></div>
                    </div>
                    
                    <div className="text-center md:text-left md:pl-8 md:border-l border-orange/20 max-w-lg">
                        <p className="text-gray-700 font-medium font-body text-lg leading-relaxed">
                            {t("ourStoryPage.invitationText")}
                        </p>
                    </div>
                </section>
            </motion.div>

        </div>
    );
}
