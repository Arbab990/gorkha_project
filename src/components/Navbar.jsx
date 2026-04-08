import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown, HiMenu, HiX } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

    const navLinks = [
        { label: t("navbar.home"), href: "/#home" },
        { 
            label: t("navbar.aboutUs"), 
            dropdown: [
                { label: t("aboutPages.ourStory"), href: "/about/our-story", isRoute: true },
                { label: t("aboutPages.missionVision"), href: "/about/mission-vision", isRoute: true },
                { label: t("aboutPages.leadership"), href: "/about/leadership", isRoute: true },
            ]
        },
        {
            label: t("navbar.legacy"),
            dropdown: [
                { label: t("legacyPages.timeline"), href: "/legacy/timeline", isRoute: true },
                { label: t("legacyPages.founders"), href: "/legacy/founders", isRoute: true },
                { label: t("legacyPages.archives"), href: "/legacy/archives", isRoute: true },
            ]
        },
        {
            label: t("navbar.ourWork"),
            dropdown: [
                { label: t("workPages.communitySupport"), href: "/our-work/community-support", isRoute: true },
                { label: t("workPages.medicalAssistance"), href: "/our-work/medical-assistance", isRoute: true },
                { label: t("workPages.marriageSupport"), href: "/our-work/marriage-support", isRoute: true },
                { label: t("workPages.studentRecognition"), href: "/our-work/student-recognition", isRoute: true },
                { label: t("workPages.culturalActivities"), href: "/our-work/cultural-activities", isRoute: true },
            ]
        },
        {
            label: t("navbar.events"),
            dropdown: [
                { label: t("eventPages.upcomingEvents"), href: "/events/upcoming", isRoute: true },
                { label: t("eventPages.pastEvents"), href: "/events/past", isRoute: true },
            ]
        },
        {
            label: t("navbar.gallery"),
            href: "/gallery",
            isRoute: true
        },
        {
            label: t("newsPage.newsTitle") || "News",
            href: "/news",
            isRoute: true
        },
        {
            label: t("navbar.getInvolved"),
            dropdown: [
                { label: t("involvedPages.becomeMember"), href: "/get-involved/become-member", isRoute: true },
                { label: t("involvedPages.volunteer"), href: "/get-involved/volunteer", isRoute: true },
            ]
        },
        {
            label: t("donatePage.donateTitle") || "Donate",
            href: "/donate",
            isRoute: true
        },
        {
            label: t("navbar.contactUs"),
            href: "/contact",
            isRoute: true
        },
    ];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const toggleMobileDropdown = (label) => {
        if (mobileActiveDropdown === label) {
            setMobileActiveDropdown(null);
        } else {
            setMobileActiveDropdown(label);
        }
    };

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
                <a href="/#home" className="flex items-center gap-3">
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
                <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
                    {navLinks.map((link) => (
                        <li
                            key={link.label}
                            className="relative"
                            onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            {link.href ? (
                                link.isRoute ? (
                                    <Link
                                        to={link.href}
                                        className="flex items-center gap-1 text-[13px] whitespace-nowrap font-medium text-white/90 hover:text-orange transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <a
                                        href={link.href}
                                        className="flex items-center gap-1 text-[13px] whitespace-nowrap font-medium text-white/90 hover:text-orange transition-colors duration-200"
                                    >
                                        {link.label}
                                        {link.dropdown && (
                                            <HiChevronDown
                                                className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""
                                                    }`}
                                            />
                                        )}
                                    </a>
                                )
                            ) : (
                                <button
                                    className="flex items-center gap-1 text-[13px] whitespace-nowrap font-medium text-white/90 hover:text-orange transition-colors duration-200 focus:outline-none"
                                >
                                    {link.label}
                                    {link.dropdown && (
                                        <HiChevronDown
                                            className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""
                                                }`}
                                        />
                                    )}
                                </button>
                            )}

                            <AnimatePresence>
                                {link.dropdown && activeDropdown === link.label && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 border border-gray-100"
                                    >
                                        {link.dropdown.map((item) => (
                                            <li key={item.label}>
                                                {item.isRoute ? (
                                                    <Link
                                                        to={item.href}
                                                        className="block px-4 py-2 text-sm text-gray-600 hover:text-orange hover:bg-orange/5 transition-colors"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ) : (
                                                    <a
                                                        href={item.href}
                                                        className="block px-4 py-2 text-sm text-gray-600 hover:text-orange hover:bg-orange/5 transition-colors"
                                                    >
                                                        {item.label}
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>

                {/* Right side: Language */}
                <div className="hidden lg:flex items-center gap-4">
                    <LanguageSwitcher />
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
                                    <div className="flex items-center justify-between">
                                        {link.href ? (
                                            link.isRoute ? (
                                                <Link
                                                    to={link.href}
                                                    className="block text-sm font-medium text-white/90 hover:text-orange py-1 w-full"
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                <a
                                                    href={link.href}
                                                    className="block text-sm font-medium text-white/90 hover:text-orange py-1 w-full"
                                                    onClick={() => {
                                                        if (!link.dropdown) setMobileOpen(false);
                                                    }}
                                                >
                                                    {link.label}
                                                </a>
                                            )
                                        ) : (
                                            <button
                                                className="block text-sm font-medium text-white/90 hover:text-orange py-1 w-full text-left focus:outline-none"
                                                onClick={() => toggleMobileDropdown(link.label)}
                                            >
                                                {link.label}
                                            </button>
                                        )}
                                        {link.href && link.dropdown && (
                                            <button
                                                onClick={() => toggleMobileDropdown(link.label)}
                                                className="p-1 text-white/70 hover:text-orange"
                                            >
                                                <HiChevronDown
                                                    className={`transition-transform duration-200 ${mobileActiveDropdown === link.label ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>
                                        )}
                                    </div>

                                    {/* Mobile Dropdown */}
                                    <AnimatePresence>
                                        {link.dropdown && mobileActiveDropdown === link.label && (
                                            <motion.ul
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="pl-4 mt-2 space-y-2 border-l border-white/10"
                                            >
                                                {link.dropdown.map((item) => (
                                                    <li key={item.label}>
                                                        {item.isRoute ? (
                                                            <Link
                                                                to={item.href}
                                                                className="block text-sm text-white/70 hover:text-orange py-1"
                                                                onClick={() => setMobileOpen(false)}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        ) : (
                                                            <a
                                                                href={item.href}
                                                                className="block text-sm text-white/70 hover:text-orange py-1"
                                                                onClick={() => setMobileOpen(false)}
                                                            >
                                                                {item.label}
                                                            </a>
                                                        )}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}