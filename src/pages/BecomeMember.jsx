import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

/* ── API Configuration (ready for backend integration) ──────────────── */
const API_CONFIG = {
    // TODO: Replace with actual backend endpoint when ready
    MEMBERSHIP_ENDPOINT: "/api/memberships",
};

/**
 * Validates the membership form fields.
 * Returns an object with field-level error messages.
 */
function validateMembershipForm({ formData }) {
    const errors = {};

    if (!formData.fullName || formData.fullName.trim().length < 2) {
        errors.fullName = "Full name is required";
    }

    if (!formData.guardianName || formData.guardianName.trim().length < 2) {
        errors.guardianName = "Father/Husband name is required";
    }

    if (!formData.mobileNumber || !/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
        errors.mobileNumber = "Please enter a valid 10-digit Indian mobile number";
    }

    if (!formData.dateOfBirth) {
        errors.dateOfBirth = "Date of birth is required";
    }

    if (!formData.aadhaarNumber || !/^\d{12}$/.test(formData.aadhaarNumber)) {
        errors.aadhaarNumber = "Please enter a valid 12-digit Aadhaar number";
    }

    if (!formData.permanentAddress || formData.permanentAddress.trim().length < 10) {
        errors.permanentAddress = "Please enter your full permanent address";
    }

    return errors;
}

/**
 * Builds the membership API payload.
 * This structure is designed for easy backend consumption.
 */
function buildMembershipPayload({ formData, familyMembers }) {
    return {
        applicant: {
            ...formData,
            applicationDate: formData.applicationDate || new Date().toISOString().slice(0, 10),
        },
        familyMembers: familyMembers.filter(
            (member) => member.name || member.relation || member.age
        ),
        metadata: {
            source: "website",
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
        },
    };
}

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

    // ── UI state ──
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [referenceId, setReferenceId] = useState("");

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
        // Clear field-level error on change
        if (formErrors[name]) {
            setFormErrors((prev) => ({ ...prev, [name]: undefined }));
        }
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setApiError("");

        // ── Client-side validation ──
        const errors = validateMembershipForm({ formData });
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        setIsProcessing(true);

        // ── Build API payload ──
        const payload = buildMembershipPayload({ formData, familyMembers });

        try {
            /*
             * ─────────────────────────────────────────────────────────
             * TODO: BACKEND INTEGRATION POINT
             * ─────────────────────────────────────────────────────────
             *
             * Replace the simulated delay below with an actual API call:
             *
             * const response = await fetch(API_CONFIG.MEMBERSHIP_ENDPOINT, {
             *     method: "POST",
             *     headers: { "Content-Type": "application/json" },
             *     body: JSON.stringify(payload),
             * });
             *
             * if (!response.ok) {
             *     const errorData = await response.json();
             *     throw new Error(errorData.message || "Submission failed");
             * }
             *
             * const data = await response.json();
             * setReferenceId(data.referenceId);
             *
             * ─────────────────────────────────────────────────────────
             */

            // Simulated API call (remove when backend is ready)
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Simulated reference ID (replace with actual from backend)
            const mockRefId = `BGSS-M-${Date.now().toString(36).toUpperCase()}`;
            setReferenceId(mockRefId);

            console.info("📦 Membership Payload (ready for API):", payload);

            setShowSuccess(true);
        } catch (error) {
            console.error("Membership submission failed:", error);
            setApiError(
                error?.message || "Something went wrong. Please try again or contact support."
            );
        } finally {
            setIsProcessing(false);
        }
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setFamilyMembers(createFamilyRows());
        setShowSuccess(false);
        setFormErrors({});
        setApiError("");
        setReferenceId("");
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

                        {/* ── API Error Banner ── */}
                        <AnimatePresence>
                            {apiError && (
                                <motion.div
                                    key="api-error"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-red-700">Submission Failed</p>
                                        <p className="text-xs text-red-600 mt-0.5">{apiError}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
                                disabled={isProcessing}
                                whileHover={!isProcessing ? { y: -2, scale: 1.01 } : {}}
                                whileTap={!isProcessing ? { scale: 0.98 } : {}}
                                className={`inline-flex items-center justify-center gap-2 rounded bg-orange px-8 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-orange-light ${
                                    isProcessing ? "opacity-80 cursor-not-allowed" : ""
                                }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    t("becomeMemberPage.submitBtn")
                                )}
                            </motion.button>
                        </motion.div>


                    </form>
                </motion.div>
            </div>

            {/* ── SUCCESS MODAL ─────────────────────────────── */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        key="success-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => resetForm()}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-white rounded-[2rem] p-10 max-w-md w-full text-center shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-20 h-20 bg-green-dark/10 rounded-full flex items-center justify-center mx-auto mb-5">
                                <CheckCircle2 className="w-10 h-10 text-green-dark" />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-green-dark mb-2">Application Submitted! 🙏</h3>
                            <p className="text-gray-500 text-sm mb-2">
                                Your membership application has been received successfully.
                            </p>
                            {referenceId && (
                                <p className="text-xs text-gray-400 mb-1">
                                    Reference ID: <span className="font-mono font-semibold text-gray-600">{referenceId}</span>
                                </p>
                            )}
                            <p className="text-gray-400 text-xs mb-6 leading-relaxed">
                                No backend is connected yet — this is a UI demonstration. Your application will be processed once the integration is live.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => resetForm()}
                                className="bg-green-dark text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-green transition-colors"
                            >
                                Close
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
