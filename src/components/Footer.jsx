import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    t("footer.home"),
    t("footer.aboutUs"),
    t("footer.destination"),
    t("footer.contact"),
  ];

  const otherPages = [
    t("footer.privacyPolicy"),
    t("footer.termsOfUse"),
    t("footer.disclaimer"),
    t("footer.faq"),
  ];

  return (
    <footer className="bg-green-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img
              src="/logo/WhatsApp Image 2026-04-02 at 3.55.48 PM.jpeg"
              alt="भारतीय गोर्खा सेवा समाज"
              className="h-14 w-14 rounded-full object-cover border-2 border-orange"
            />
            <div>
              <p className="font-heading font-bold text-lg">भारतीय गोर्खा सेवा समाज</p>
              <p className="text-xs text-white/50">उत्तर प्रदेश लखनऊ</p>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            {t("footer.brandDesc")}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-bold text-orange mb-5">{t("footer.quickLinks")}</h4>
          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Pages */}
        <div>
          <h4 className="font-heading font-bold text-orange mb-5">{t("footer.otherPages")}</h4>
          <ul className="space-y-3">
            {otherPages.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-bold text-orange mb-5">{t("footer.contactInfo")}</h4>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm text-white/60">
              <FiMapPin className="text-orange mt-0.5 shrink-0" size={16} />
              {t("footer.address")}
            </li>
            <li className="flex gap-3 text-sm text-white/60">
              <FiPhone className="text-orange shrink-0" size={16} />
              {t("footer.phone")}
            </li>
            <li className="flex gap-3 text-sm text-white/60">
              <FiMail className="text-orange shrink-0" size={16} />
              {t("footer.email")}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-white/70 text-sm">
          <p>
            Copyright © 2026 Bhartiye Gorkha Seva Samaj | Powered By -{" "}
            <a
              href="https://onebigbit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange transition-colors"
            >
              Onebigbit Technologies Private Limited
            </a>
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/40">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
