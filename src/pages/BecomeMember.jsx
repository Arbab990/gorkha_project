import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const initialFormState = {
    applicationDate: new Date().toISOString().slice(0, 10),
    fullName: "",
    guardianName: "",
    mobileNumber: "",
    occupation: "",
    permanentAddress: "",
    dateOfBirth: "",
    aadhaarNumber: "",
    familyCount: "",
    monthlyIncome: "",
    additionalDetails: "",
};

const createEmptyFamilyMember = () => ({
    name: "",
    relation: "",
    age: "",
});

const createFamilyRows = () =>
    Array.from({ length: 4 }, () => createEmptyFamilyMember());

function RequiredLabel({ children, required = false }) {
    return (
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
}

export default function BecomeMember() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState(initialFormState);
    const [familyMembers, setFamilyMembers] = useState(createFamilyRows);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setFamilyMembers((current) => {
            const hasExtraFilledRows = current
                .slice(4)
                .some((member) => member.name || member.relation || member.age);

            return hasExtraFilledRows ? current : current.slice(0, 4);
        });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleFamilyChange = (index, field, value) => {
        setFamilyMembers((current) =>
            current.map((member, memberIndex) =>
                memberIndex === index ? { ...member, [field]: value } : member
            )
        );
    };

    const addFamilyRow = () => {
        setFamilyMembers((current) => [...current, createEmptyFamilyMember()]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            applicant: formData,
            familyMembers: familyMembers.filter(
                (member) => member.name || member.relation || member.age
            ),
        };

        // Frontend-only for now. This payload structure is kept intentional so
        // it can later be sent to a membership backend endpoint without reshaping.
        console.info("Membership form submission payload:", payload);
        setSubmitted(true);
    };

    const inputClassName =
        "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors placeholder:text-gray-400 focus:border-orange focus:ring-2 focus:ring-orange/10";

    const sectionMotionProps = {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.45, ease: "easeOut" },
    };

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/50">
            <div className="max-w-6xl mx-auto mt-12">
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-heading text-4xl md:text-5xl font-bold text-green-dark mb-6 leading-tight"
                    >
                        {t("becomeMemberPage.title") || "Become a Member"}
                    </motion.h1>
                    <div className="w-24 h-1 bg-orange mx-auto rounded-full mb-6"></div>
                    <p className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg leading-relaxed">
                        {t("becomeMemberPage.subtitle")}
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden"
                >
                    <div className="px-8 py-8 md:px-12 md:py-10 border-b border-gray-100 bg-gradient-to-r from-green-dark to-green">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div>
                                <p className="text-white/70 text-sm uppercase tracking-[0.3em] mb-3">
                                    {t("becomeMemberPage.membershipForm")}
                                </p>
                                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                                    {t("becomeMemberPage.orgName")}
                                </h2>
                                <p className="text-white/75 mt-3 text-sm md:text-base">
                                    {t("becomeMemberPage.location")}
                                </p>
                            </div>

                            <div className="bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white/90 min-w-[220px]">
                                <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-2">
                                    {t("becomeMemberPage.applicationDate")}
                                </p>
                                <p className="font-medium">
                                    {formData.applicationDate || t("becomeMemberPage.notSet")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="px-8 py-8 md:px-12 md:py-10 space-y-12">
                        <motion.section className="space-y-6" {...sectionMotionProps}>
                            <div>
                                <h3 className="font-heading text-2xl font-bold text-green-dark mb-2">
                                    {t("becomeMemberPage.applicantDetails")}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <RequiredLabel required>{t("becomeMemberPage.name")}</RequiredLabel>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder={t("becomeMemberPage.fullName")}
                                        className={inputClassName}
                                        required
                                    />
                                </div>

                                <div>
                                    <RequiredLabel required>{t("becomeMemberPage.mobileNumber")}</RequiredLabel>
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        placeholder={t("becomeMemberPage.mobileNumberPlaceholder")}
                                        className={inputClassName}
                                        required
                                    />
                                </div>

                                <div>
                                    <RequiredLabel required>{t("becomeMemberPage.fatherHusbandName")}</RequiredLabel>
                                    <input
                                        type="text"
                                        name="guardianName"
                                        value={formData.guardianName}
                                        onChange={handleChange}
                                        placeholder={t("becomeMemberPage.fatherHusbandPlaceholder")}
                                        className={inputClassName}
                                        required
                                    />
                                </div>

                                <div>
                                    <RequiredLabel>{t("becomeMemberPage.occupation")}</RequiredLabel>
                                    <input
                                        type="text"
                                        name="occupation"
                                        value={formData.occupation}
                                        onChange={handleChange}
                                        placeholder={t("becomeMemberPage.occupationPlaceholder")}
                                        className={inputClassName}
                                    />
                                </div>

                                <div>
                                    <RequiredLabel required>{t("becomeMemberPage.dob")}</RequiredLabel>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        className={inputClassName}
                                        required
                                    />
                                </div>

                                <div>
                                    <RequiredLabel required>{t("becomeMemberPage.aadhar")}</RequiredLabel>
                                    <input
                                        type="text"
                                        name="aadhaarNumber"
                                        value={formData.aadhaarNumber}
                                        onChange={handleChange}
                                        placeholder={t("becomeMemberPage.aadharPlaceholder")}
                                        className={inputClassName}
                                        required
                                    />
                                </div>

                                <div>
                                    <RequiredLabel>{t("becomeMemberPage.familyCount")}</RequiredLabel>
                                    <input
                                        type="number"
                                        min="0"
                                        name="familyCount"
                                        value={formData.familyCount}
                                        onChange={handleChange}
                                        placeholder={t("becomeMemberPage.familyCountPlaceholder")}
                                        className={inputClassName}
                                    />
                                </div>

                                <div>
                                    <RequiredLabel>{t("becomeMemberPage.monthlyIncome")}</RequiredLabel>
                                    <input
                                        type="text"
                                        name="monthlyIncome"
                                        value={formData.monthlyIncome}
                                        onChange={handleChange}
                                        placeholder={t("becomeMemberPage.monthlyIncomePlaceholder")}
                                        className={inputClassName}
                                    />
                                </div>
                            </div>

                            <div>
                                <RequiredLabel required>{t("becomeMemberPage.permanentAddress")}</RequiredLabel>
                                <textarea
                                    name="permanentAddress"
                                    value={formData.permanentAddress}
                                    onChange={handleChange}
                                    placeholder={t("becomeMemberPage.permanentAddressPlaceholder")}
                                    rows={3}
                                    className={`${inputClassName} resize-none`}
                                    required
                                />
                            </div>

                            <div>
                                <RequiredLabel>{t("becomeMemberPage.otherSkills")}</RequiredLabel>
                                <textarea
                                    name="additionalDetails"
                                    value={formData.additionalDetails}
                                    onChange={handleChange}
                                    placeholder={t("becomeMemberPage.otherSkillsPlaceholder")}
                                    rows={4}
                                    className={`${inputClassName} resize-none`}
                                />
                            </div>
                        </motion.section>

                        <motion.section className="space-y-6" {...sectionMotionProps}>
                            <div>
                                <h3 className="font-heading text-2xl font-bold text-green-dark mb-2">
                                    {t("becomeMemberPage.familyMemberDetails")}
                                </h3>
                            </div>

                            <div className="border border-gray-100 rounded-[1.5rem] overflow-hidden bg-gray-50/60">
                                <div className="hidden md:grid grid-cols-[80px_1.4fr_1fr_120px] gap-0 bg-green-dark text-white text-sm font-medium">
                                    <div className="px-4 py-3 border-r border-white/10">{t("becomeMemberPage.sNo")}</div>
                                    <div className="px-4 py-3 border-r border-white/10">{t("becomeMemberPage.name")}</div>
                                    <div className="px-4 py-3 border-r border-white/10">{t("becomeMemberPage.relation")}</div>
                                    <div className="px-4 py-3">{t("becomeMemberPage.age")}</div>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    {familyMembers.map((member, index) => (
                                        <div
                                            key={`family-member-${index}`}
                                            className="grid grid-cols-1 md:grid-cols-[80px_1.4fr_1fr_120px] gap-3 md:gap-0 p-4 md:p-0 bg-white"
                                        >
                                            <div className="md:px-4 md:py-4 text-sm font-medium text-gray-500 flex items-center">
                                                <span className="md:hidden mr-2 text-gray-400">{t("becomeMemberPage.sNo")}</span>
                                                {index + 1}
                                            </div>

                                            <div className="md:px-3 md:py-2">
                                                <label className="md:hidden block text-xs font-medium text-gray-500 mb-2">
                                                    {t("becomeMemberPage.name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={member.name}
                                                    onChange={(event) =>
                                                        handleFamilyChange(index, "name", event.target.value)
                                                    }
                                                    className={inputClassName}
                                                    placeholder={t("becomeMemberPage.memberNamePlaceholder")}
                                                />
                                            </div>

                                            <div className="md:px-3 md:py-2">
                                                <label className="md:hidden block text-xs font-medium text-gray-500 mb-2">
                                                    {t("becomeMemberPage.relation")}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={member.relation}
                                                    onChange={(event) =>
                                                        handleFamilyChange(index, "relation", event.target.value)
                                                    }
                                                    className={inputClassName}
                                                    placeholder={t("becomeMemberPage.relationPlaceholder")}
                                                />
                                            </div>

                                            <div className="md:px-3 md:py-2">
                                                <label className="md:hidden block text-xs font-medium text-gray-500 mb-2">
                                                    {t("becomeMemberPage.age")}
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={member.age}
                                                    onChange={(event) =>
                                                        handleFamilyChange(index, "age", event.target.value)
                                                    }
                                                    className={inputClassName}
                                                    placeholder={t("becomeMemberPage.age")}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={addFamilyRow}
                                    className="w-full border-t border-dashed border-gray-300 bg-white px-4 py-4 text-sm font-semibold text-green-dark transition-colors hover:bg-green-50 hover:text-orange"
                                >
                                    {t("becomeMemberPage.addFamilyMember")}
                                </button>
                            </div>
                        </motion.section>

                        <motion.div
                            {...sectionMotionProps}
                            className="flex justify-center pt-2"
                        >
                            <motion.button
                                type="submit"
                                whileHover={{ y: -2, scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center rounded bg-orange px-8 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-orange-light"
                            >
                                {t("becomeMemberPage.submitBtn")}
                            </motion.button>
                        </motion.div>

                        {submitted && (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-2xl border border-green/20 bg-green/8 px-5 py-4 text-left"
                            >
                                <p className="text-green-dark font-medium mb-1">
                                    Form captured on the frontend.
                                </p>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    No backend is connected yet, so the data was not sent anywhere.
                                    The page is already structured for future API integration.
                                </p>
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
