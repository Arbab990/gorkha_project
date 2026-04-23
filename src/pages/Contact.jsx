import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail, Phone, MapPin, Clock, Send, MessageSquare, User, AtSign,
    Loader2, CheckCircle2, AlertCircle, ExternalLink, Globe,
} from "lucide-react";

const initialFormState = { name: "", email: "", phone: "", subject: "", message: "" };

const inputBase =
    "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 font-body text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green hover:border-gray-300";

function validate(d) {
    const e = {};
    if (!d.name.trim()) e.name = true;
    if (!d.email.trim()) e.email = "required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "invalid";
    if (d.phone && !/^[6-9]\d{9}$/.test(d.phone.replace(/\D/g, ""))) e.phone = true;
    if (!d.message.trim()) e.message = "required";
    else if (d.message.trim().length < 10) e.message = "short";
    return e;
}

// Social icons with brand colors
const socials = [
    {
        label: "Facebook", color: "#1877F2",
        href: "https://www.facebook.com/bhartiyagorkhasewa.samajj",
        path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
        label: "Instagram", color: "#E4405F",
        href: "https://instagram.com",
        path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    },
    {
        label: "YouTube", color: "#FF0000",
        href: "https://youtube.com",
        path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
];

export default function Contact() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [apiError, setApiError] = useState("");
    const [btnHovered, setBtnHovered] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
        if (formErrors[name]) setFormErrors((p) => ({ ...p, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError(""); setSubmitStatus(null);
        const errors = validate(formData);
        if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
        setFormErrors({}); setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to send message");
            setSubmitStatus("success"); setFormData(initialFormState);
        } catch (err) {
            setApiError(err?.message || t("contactPage.errorGeneric"));
            setSubmitStatus("error");
        } finally { setIsSubmitting(false); }
    };

    const contactInfo = [
        { icon: Mail, label: t("contactPage.emailLabel"), value: "info@onegorkha.com", href: "mailto:info@onegorkha.com", color: "text-orange", bg: "bg-orange/10" },
        { icon: Phone, label: t("contactPage.phoneLabel"), value: "+91 78975 49993", href: "tel:+917897549993", color: "text-green", bg: "bg-green/10" },
        { icon: MapPin, label: t("contactPage.locationLabel"), value: t("contactPage.locationValue"), href: "https://maps.google.com/?q=Lucknow+Uttar+Pradesh+India", color: "text-orange", bg: "bg-orange/10" },
        { icon: Clock, label: t("contactPage.responseLabel"), value: t("contactPage.responseValue"), href: null, color: "text-green", bg: "bg-green/10" },
    ];

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/50">
            <div className="max-w-7xl mx-auto mt-12 mb-16">

                {/* Header */}
                <div className="text-center md:mb-16 mb-12">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="font-heading text-4xl md:text-5xl font-bold text-green-dark mb-4 leading-tight">
                        {t("contactPage.title")}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-500 font-body text-lg max-w-2xl mx-auto">
                        {t("contactPage.subtitle")}
                    </motion.p>
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-24 h-1 bg-orange mx-auto rounded-full mt-6" />
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">

                    {/* Left: Form (3 cols) */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-3 bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-10 flex flex-col">

                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-green-dark/10 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-green-dark" />
                            </div>
                            <h2 className="font-heading text-2xl font-bold text-green-dark">{t("contactPage.formTitle")}</h2>
                        </div>

                        {/* Banners */}
                        <AnimatePresence>
                            {submitStatus === "success" && (
                                <motion.div key="s" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                                    <div className="bg-green/5 border border-green/20 rounded-xl p-4 flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-semibold text-green-dark">{t("contactPage.successTitle")}</p>
                                            <p className="text-xs text-green-dark/70 mt-0.5">{t("contactPage.successMsg")}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {submitStatus === "error" && (
                                <motion.div key="e" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-semibold text-red-700">{t("contactPage.errorTitle")}</p>
                                            <p className="text-xs text-red-600 mt-0.5">{apiError}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t("contactPage.nameLabel")} <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t("contactPage.namePlaceholder")}
                                        className={`${inputBase} pl-10 ${formErrors.name ? "border-red-400" : ""}`} />
                                </div>
                            </div>

                            {/* Email + Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("contactPage.emailFormLabel")} <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com"
                                            className={`${inputBase} pl-10 ${formErrors.email ? "border-red-400" : ""}`} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("contactPage.phoneFormLabel")}</label>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">+91</span>
                                        <input type="tel" name="phone" value={formData.phone}
                                            onChange={(e) => { const n = e.target.value.replace(/\D/g, "").slice(0, 10); setFormData((p) => ({ ...p, phone: n })); if (formErrors.phone) setFormErrors((p) => ({ ...p, phone: undefined })); }}
                                            inputMode="numeric" maxLength={10} placeholder="78975 49993"
                                            className={`${inputBase} pl-12 ${formErrors.phone ? "border-red-400" : ""}`} />
                                    </div>
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t("contactPage.subjectLabel")}</label>
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder={t("contactPage.subjectPlaceholder")} className={inputBase} />
                            </div>

                            {/* Message */}
                            <div className="flex-1 flex flex-col">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t("contactPage.messageLabel")} <span className="text-red-500">*</span></label>
                                <textarea name="message" value={formData.message} onChange={handleChange} placeholder={t("contactPage.messagePlaceholder")}
                                    rows={3} className={`${inputBase} resize-none flex-1 min-h-[100px] ${formErrors.message ? "border-red-400" : ""}`} />
                            </div>

                            {/* Submit Button with animation */}
                            <motion.button type="submit" disabled={isSubmitting}
                                onMouseEnter={() => setBtnHovered(true)} onMouseLeave={() => setBtnHovered(false)}
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                className="w-full bg-green-dark text-white py-4 rounded-xl font-semibold text-sm uppercase tracking-widest flex items-center justify-center gap-2.5 hover:bg-green transition-colors duration-300 shadow-lg hover:shadow-green-dark/20 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden relative"
                            >
                                <AnimatePresence mode="wait">
                                    {isSubmitting ? (
                                        <motion.span key="loading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" /> {t("contactPage.sending")}
                                        </motion.span>
                                    ) : btnHovered ? (
                                        <motion.span key="hover" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex items-center gap-2">
                                            <Send className="w-4 h-4 -rotate-12" /> {t("contactPage.letsConnect")}
                                        </motion.span>
                                    ) : (
                                        <motion.span key="default" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex items-center gap-2">
                                            <Mail className="w-4 h-4" /> {t("contactPage.sendMessage")}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Right: Info + Follow Us (2 cols) */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-2 flex flex-col gap-6">

                        {/* Contact Information */}
                        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-green-dark/10 flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-green-dark" />
                                </div>
                                <h2 className="font-heading text-2xl font-bold text-green-dark">{t("contactPage.infoTitle")}</h2>
                            </div>
                            <div className="space-y-2">
                                {contactInfo.map((item, idx) => (
                                    <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}>
                                        {item.href ? (
                                            <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200 group">
                                                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                                                    <item.icon className={`w-5 h-5 ${item.color}`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-green-dark mb-0.5">{item.label}</p>
                                                    <p className="text-sm text-gray-500 break-all">{item.value}</p>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-gray-400 shrink-0 mt-1" />
                                            </a>
                                        ) : (
                                            <div className="flex items-start gap-4 p-4 rounded-2xl">
                                                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                                                    <item.icon className={`w-5 h-5 ${item.color}`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-green-dark mb-0.5">{item.label}</p>
                                                    <p className="text-sm text-gray-500">{item.value}</p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Follow Us - expanded to fill remaining space */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
                            className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-10 flex-1 flex flex-col items-center justify-center">
                            <h3 className="font-heading text-xl font-bold text-green-dark mb-8 text-center">{t("contactPage.followUs")}</h3>
                            <div className="flex items-center justify-center gap-8 w-full">
                                {socials.map((s) => (
                                    <SocialIcon key={s.label} social={s} />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Google Maps */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-12">
                    <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-3 md:p-4 overflow-hidden">
                        <iframe title="Bhartiya Gorkha Seva Samaj Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.3825624477!2d80.77769936397395!3d26.848868899653025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            className="w-full h-[300px] md:h-[400px] rounded-[1.5rem] border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

/* ── Social Icon with GSAP-like spring animation ── */
function SocialIcon({ social }) {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    return (
        <motion.a
            ref={ref}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={hovered ? {
                scale: 1.25,
                rotate: [0, -8, 8, -4, 0],
                boxShadow: `0 8px 25px ${social.color}40`,
            } : {
                scale: 1,
                rotate: 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            transition={{
                type: "spring", stiffness: 400, damping: 15,
                rotate: { duration: 0.5, ease: "easeInOut" },
            }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-colors duration-200"
            style={{
                borderColor: hovered ? social.color : "#e5e7eb",
                backgroundColor: hovered ? `${social.color}10` : "#f9fafb",
                color: hovered ? social.color : "#6b7280",
            }}
        >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d={social.path} />
            </svg>
        </motion.a>
    );
}
