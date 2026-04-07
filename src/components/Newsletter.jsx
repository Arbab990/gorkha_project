import { motion } from "framer-motion";
import { HiMail } from "react-icons/hi";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Newsletter() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = () => {
        if (email) {
            setSent(true);
            setEmail("");
            setTimeout(() => setSent(false), 3000);
        }
    };

    return (
        <section className="py-16 px-6 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto bg-orange rounded-2xl px-10 py-10 flex flex-col md:flex-row items-center gap-8"
            >
                <div className="flex items-center gap-4 text-white min-w-fit">
                    <HiMail size={52} className="opacity-90" />
                    <div>
                        <p className="text-sm opacity-80 uppercase tracking-widest">
                            {t("newsletter.keepUpdated")}
                        </p>
                        <h3 className="font-heading text-4xl font-bold">{t("newsletter.newsletter")}</h3>
                    </div>
                </div>

                <div className="flex flex-1 items-center border-b-2 border-white/60 gap-4 w-full md:w-auto">
                    <input
                        type="email"
                        placeholder={t("newsletter.emailPlaceholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-transparent text-white placeholder-white/70 outline-none py-2 text-sm"
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    className="bg-white text-orange font-semibold text-sm uppercase tracking-wider px-8 py-3 rounded hover:bg-gray-100 transition-colors min-w-fit"
                >
                    {sent ? t("newsletter.subscribed") : t("newsletter.subscribe")}
                </motion.button>
            </motion.div>
        </section>
    );
}