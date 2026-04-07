import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown, HiMenu, HiX } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const navLinks = [
        { label: t("navbar.home"), href: "#home" },
        { label: t("navbar.aboutUs"), href: "#about" },
        {
            label: t("navbar.campaign"),
            href: "#campaign",
            dropdown: [t("navbar.cleanAir"), t("navbar.oceanSave"), t("navbar.treePlanting")],
        },
        {
            label: t("navbar.pages"),
            href: "#pages",
            dropdown: [t("navbar.blog"), t("navbar.events"), t("navbar.gallery")],
        },
        { label: t("navbar.contactUs"), href: "#contact" },
    ];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-green-dark shadow-lg" : "bg-green-dark/95 backdrop-blur-sm"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
                {/* Logo */}
                <a href="#home" className="flex items-center gap-3">
                    <img
                        src="/logo/WhatsApp Image 2026-04-02 at 3.55.48 PM.jpeg"
                        alt="भारतीय गोर्खा सेवा समाज"
                        className="h-14 w-14 rounded-full object-cover border-2 border-orange"
                    />
                    <div>
                        <p className="font-heading font-bold text-white text-lg leading-none">
                            भारतीय गोर्खा सेवा समाज
                        </p>
                        <p className="text-xs text-white tracking-wide">
                            उत्तर प्रदेश लखनऊ
                        </p>
                    </div>
                </a>

                {/* Desktop Nav */}
                <ul className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li
                            key={link.label}
                            className="relative"
                            onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <a
                                href={link.href}
                                className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-orange transition-colors duration-200"
                            >
                                {link.label}
                                {link.dropdown && (
                                    <HiChevronDown
                                        className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""
                                            }`}
                                    />
                                )}
                            </a>

                            <AnimatePresence>
                                {link.dropdown && activeDropdown === link.label && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-2 w-44 bg-white shadow-xl rounded-lg py-2 border border-gray-100"
                                    >
                                        {link.dropdown.map((item) => (
                                            <li key={item}>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-600 hover:text-orange hover:bg-orange/5 transition-colors"
                                                >
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>

                {/* Right side: Language + Donate */}
                <div className="hidden lg:flex items-center gap-4">
                    <LanguageSwitcher />
                    <motion.a
                        href="#donate"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center bg-orange text-white px-6 py-3 rounded font-semibold text-sm uppercase tracking-wider hover:bg-orange-light transition-colors duration-200"
                    >
                        {t("navbar.donate")}
                    </motion.a>
                </div>

                {/* Mobile: Language + Toggle */}
                <div className="lg:hidden flex items-center gap-3">
                    <LanguageSwitcher />
                    <button
                        className="text-2xl text-white"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden bg-green-dark border-t border-white/10 overflow-hidden"
                    >
                        <ul className="px-6 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="block text-sm font-medium text-white/90 hover:text-orange py-1"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}

                            <li>
                                <a
                                    href="#donate"
                                    className="inline-block bg-orange text-white px-5 py-2 rounded text-sm font-semibold uppercase"
                                >
                                    {t("navbar.donate")}
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}