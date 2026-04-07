import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "ne", label: "नेपाली" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-orange transition-colors duration-200"
      >
        {currentLang.label}
        <HiChevronDown
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-32 bg-white shadow-xl rounded-lg py-2 border border-gray-100 z-50"
          >
            {languages
              .filter((l) => l.code !== i18n.language)
              .map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleChange(lang.code)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-orange hover:bg-orange/5 transition-colors"
                >
                  {lang.label}
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
