import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GraduationCap, HeartPulse, PartyPopper, Handshake, Zap, Diamond, RefreshCcw, Loader2, AlertCircle, User, Mail, Phone } from "lucide-react";
import { BiDonateHeart } from "react-icons/bi";

/* ── SVG Icons ──────────────────────────────────────────────────────── */
function ShieldCheckIcon({ className = "" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
        </svg>
    );
}

/* ── Preset amounts ─────────────────────────────────────────────────── */
const PRESETS = [101, 251, 501, 1001, 2501, 5001];

/* ── Payment Methods ────────────────────────────────────────────────── */
const PAYMENT_METHODS = [
    {
        id: "upi",
        label: "",
        desc: "",
        icon: (
            <img src="/logo/UPI-Logo-vector.svg" alt="UPI" className="h-7 w-auto object-contain" />
        ),
        apps: ["GPay", "PhonePe", "Paytm", "BHIM"],
        color: "from-[#097939]/10 to-transparent",
        border: "border-[#097939]",
        badge: "bg-[#097939] text-white",
    },
    {
        id: "gpay",
        label: "",
        desc: "",
        icon: (
            <img src="/logo/Google_Pay_Logo.svg" alt="Google Pay" className="h-6 w-auto object-contain" />
        ),
        apps: [],
        color: "from-blue-50 to-transparent",
        border: "border-blue-400",
        badge: "bg-blue-500 text-white",
    },
    {
        id: "phonepe",
        label: "",
        desc: "",
        icon: (
            <img src="/logo/PhonePe_Logo.svg" alt="PhonePe" className="h-6 w-auto object-contain" />
        ),
        apps: [],
        color: "from-purple-50 to-transparent",
        border: "border-purple-400",
        badge: "bg-purple-600 text-white",
    },
    {
        id: "netbanking",
        label: "Net Banking",
        desc: "All major Indian banks supported",
        icon: (
            <img src="/logo/Netbanking.svg" alt="Net Banking" className="h-10 w-auto object-contain" />
        ),
        apps: [],
        color: "from-gray-50 to-transparent",
        border: "border-gray-300",
        badge: "bg-gray-600 text-white",
    },
    {
        id: "card",
        label: "Debit / Credit Card",
        desc: "Visa, Mastercard, RuPay accepted",
        icon: (
            <img src="/logo/Credit_or_Debit_Card_Flat_Icon_Vector.svg" alt="Cards" className="h-10 w-auto object-contain" />
        ),
        apps: [],
        color: "from-indigo-50 to-transparent",
        border: "border-indigo-300",
        badge: "bg-indigo-700 text-white",
    },
];

/* ── API Configuration (ready for backend integration) ──────────────── */
const API_CONFIG = {
    // TODO: Replace with actual backend endpoint when ready
    DONATION_ENDPOINT: "/api/donations",
    // TODO: Replace with actual Razorpay/Cashfree key
    PAYMENT_GATEWAY_KEY: "",
    // TODO: Replace with the organisation's actual UPI VPA (Virtual Payment Address)
    ORG_UPI_VPA: "gorkhasewa@upi",
    ORG_NAME: "Bhartiya Gorkha Seva Samaj",
};

/**
 * UPI Intent URL schemes for direct app redirection on mobile.
 * These allow opening the specific payment app with amount pre-filled.
 *
 * How it works:
 * - On mobile browsers, `window.location.href = intentUrl` opens the app.
 * - The UPI spec (NPCI) defines the standard `upi://pay?...` format.
 * - GPay and PhonePe also support their own custom schemes.
 */
const UPI_APP_SCHEMES = {
    upi: "upi://pay",       // Generic UPI — opens system UPI picker
    gpay: "gpay://upi/pay", // Google Pay direct (also: tez://upi/pay)
    phonepe: "phonepe://pay", // PhonePe direct
};

/**
 * Checks if the current device is a mobile phone.
 */
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Builds a UPI intent URL for direct app redirection.
 * Works on mobile browsers to open GPay/PhonePe/BHIM with the payment pre-filled.
 *
 * @param {Object} params
 * @param {string} params.appScheme - The UPI app scheme (from UPI_APP_SCHEMES)
 * @param {string} params.payeeVpa - Organisation's UPI VPA
 * @param {string} params.payeeName - Organisation's display name
 * @param {number} params.amount - Amount in INR
 * @param {string} params.transactionNote - Description shown in the app
 * @param {string} params.transactionRef - Unique reference ID for tracking
 * @returns {string} The full UPI intent URL
 */
function buildUpiIntentUrl({ appScheme, payeeVpa, payeeName, amount, transactionNote, transactionRef }) {
    const params = new URLSearchParams({
        pa: payeeVpa,           // Payee VPA
        pn: payeeName,          // Payee name
        am: amount.toFixed(2),  // Amount
        cu: "INR",              // Currency
        tn: transactionNote,    // Transaction note
        tr: transactionRef,     // Transaction reference
    });
    return `${appScheme}?${params.toString()}`;
}

/**
 * Creates the donation payload for the backend API.
 * This structure is designed to work with popular Indian payment gateways
 * like Razorpay, Cashfree, PayU, and CCAvenue.
 */
function buildDonationPayload({ donorName, donorEmail, donorPhone, amount, donationType, paymentMethod, upiId }) {
    return {
        donor: {
            name: donorName,
            email: donorEmail,
            phone: donorPhone,
        },
        donation: {
            amount: Number(amount),
            currency: "INR",
            type: donationType, // "one-time" or "monthly"
            paymentMethod: paymentMethod,
            upiId: ["upi", "gpay", "phonepe"].includes(paymentMethod) ? upiId : undefined,
        },
        metadata: {
            source: "website",
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
        },
    };
}

/**
 * Validates the donation form fields.
 * Returns an object with field-level error messages.
 */
function validateDonationForm({ donorName, donorEmail, donorPhone, amount, paymentMethod, upiId }) {
    const errors = {};

    if (!donorName || donorName.trim().length < 2) {
        errors.donorName = "Please enter your full name";
    }

    if (!donorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
        errors.donorEmail = "Please enter a valid email address";
    }

    if (!donorPhone || !/^[6-9]\d{9}$/.test(donorPhone)) {
        errors.donorPhone = "Please enter a valid 10-digit Indian mobile number";
    }

    if (!amount || amount <= 0) {
        errors.amount = "Please select or enter a donation amount";
    }

    if (["upi", "gpay", "phonepe"].includes(paymentMethod) && (!upiId || !/^[\w.-]+@[\w]+$/.test(upiId))) {
        errors.upiId = "Please enter a valid UPI ID (e.g., name@upi)";
    }

    return errors;
}


export default function Donate() {
    const { t } = useTranslation();

    // ── Form state ──
    const [selectedAmount, setSelectedAmount] = useState(501);
    const [customAmount, setCustomAmount] = useState("");
    const [donationType, setDonationType] = useState("one-time");
    const [selectedMethod, setSelectedMethod] = useState("upi");
    const [upiId, setUpiId] = useState("");

    // ── Donor info state ──
    const [donorName, setDonorName] = useState("");
    const [donorEmail, setDonorEmail] = useState("");
    const [donorPhone, setDonorPhone] = useState("");

    // ── UI state ──
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [transactionId, setTransactionId] = useState("");

    const displayAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;

    const handlePreset = (amt) => {
        setSelectedAmount(amt);
        setCustomAmount("");
        // Clear amount error when user selects a preset
        setFormErrors((prev) => ({ ...prev, amount: undefined }));
    };

    const handleCustom = (v) => {
        setCustomAmount(v);
        setSelectedAmount(null);
        setFormErrors((prev) => ({ ...prev, amount: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError("");

        // ── Client-side validation ──
        const errors = validateDonationForm({
            donorName,
            donorEmail,
            donorPhone,
            amount: displayAmount,
            paymentMethod: selectedMethod,
            upiId,
        });

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        setIsProcessing(true);

        // ── Build API payload ──
        const payload = buildDonationPayload({
            donorName,
            donorEmail,
            donorPhone,
            amount: displayAmount,
            donationType,
            paymentMethod: selectedMethod,
            upiId,
        });

        try {
            /*
             * ─────────────────────────────────────────────────────────
             * TODO: BACKEND INTEGRATION POINT
             * ─────────────────────────────────────────────────────────
             *
             * Replace the simulated delay below with an actual API call:
             *
             * 1. POST the `payload` to your backend:
             *    const response = await fetch(API_CONFIG.DONATION_ENDPOINT, {
             *        method: "POST",
             *        headers: { "Content-Type": "application/json" },
             *        body: JSON.stringify(payload),
             *    });
             *    const data = await response.json();
             *
             * 2. The backend should create an order with the payment gateway
             *    (Razorpay/Cashfree/PayU) and return an `orderId` / `sessionId`.
             *
             * 3. Open the payment gateway checkout:
             *    - Razorpay:  new Razorpay({ key, order_id, ... }).open()
             *    - Cashfree:  cashfree.checkout({ paymentSessionId })
             *    - PayU:      redirect to PayU payment page
             *
             * 4. For GPay / PhonePe on mobile, use UPI Intent redirection:
             *    if (isMobileDevice() && UPI_APP_SCHEMES[selectedMethod]) {
             *        const intentUrl = buildUpiIntentUrl({
             *            appScheme: UPI_APP_SCHEMES[selectedMethod],
             *            payeeVpa: API_CONFIG.ORG_UPI_VPA,
             *            payeeName: API_CONFIG.ORG_NAME,
             *            amount: displayAmount,
             *            transactionNote: `Donation to ${API_CONFIG.ORG_NAME}`,
             *            transactionRef: data.orderId, // from backend
             *        });
             *        window.location.href = intentUrl;
             *        // The app will open with amount pre-filled and "Pay Now" button.
             *        // After payment, the app redirects back to your callback URL.
             *        return;
             *    }
             *
             * 5. Handle payment success/failure callback.
             *
             * 6. Verify the payment on the backend (server-to-server).
             *
             * 7. For "monthly" donations, use the gateway's subscription API
             *    (e.g., Razorpay Subscriptions).
             * ─────────────────────────────────────────────────────────
             */

            // Simulated API call (remove when backend is ready)
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Simulated transaction ID (replace with actual from gateway)
            const mockTxnId = `BGSS-${Date.now().toString(36).toUpperCase()}`;
            setTransactionId(mockTxnId);

            // Log UPI intent URL for debugging (remove in production)
            if (isMobileDevice() && UPI_APP_SCHEMES[selectedMethod]) {
                const intentUrl = buildUpiIntentUrl({
                    appScheme: UPI_APP_SCHEMES[selectedMethod],
                    payeeVpa: API_CONFIG.ORG_UPI_VPA,
                    payeeName: API_CONFIG.ORG_NAME,
                    amount: displayAmount,
                    transactionNote: `Donation to ${API_CONFIG.ORG_NAME}`,
                    transactionRef: mockTxnId,
                });
                console.log("📱 UPI Intent URL (ready for redirect):", intentUrl);
                // TODO: Uncomment the line below when backend & UPI VPA are configured
                // window.location.href = intentUrl;
            }

            console.log("📦 Donation Payload (ready for API):", payload);

            setShowSuccess(true);
        } catch (error) {
            console.error("Donation failed:", error);
            setApiError(
                error?.message || "Something went wrong. Please try again or contact support."
            );
        } finally {
            setIsProcessing(false);
        }
    };

    const resetForm = () => {
        setShowSuccess(false);
        setSelectedAmount(501);
        setCustomAmount("");
        setDonationType("one-time");
        setSelectedMethod("upi");
        setUpiId("");
        setDonorName("");
        setDonorEmail("");
        setDonorPhone("");
        setFormErrors({});
        setApiError("");
        setTransactionId("");
    };

    const sectionFade = {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease: "easeOut" },
    };

    return (
        <div className="pt-28 pb-24 px-4 min-h-screen bg-gradient-to-br from-green-dark/5 via-gray-50 to-orange/5">

            <div className="max-w-6xl mx-auto mt-8">
                {/* ── MAIN LAYOUT: form + sidebar ──────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                    {/* ── DONATION FORM ───────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="lg:col-span-3 bg-white rounded-[1.75rem] shadow-xl border-2 border-black hover:shadow-2xl transition-all overflow-hidden"
                    >
                        {/* Form header */}
                        <div className="px-7 pt-7 pb-5 border-b border-gray-100 bg-gradient-to-r from-green-dark/5 to-transparent flex items-center gap-3">
                            <BiDonateHeart className="w-8 h-8 text-green-dark" />
                            <div>
                                <h2 className="font-heading text-xl font-bold text-green-dark">Donate Now</h2>
                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                    <ShieldCheckIcon className="w-3.5 h-3.5 text-green inline" />
                                    100% Secure &amp; Trusted — All transactions are encrypted
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="px-7 py-7 space-y-7">

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
                                            <p className="text-sm font-semibold text-red-700">Payment Failed</p>
                                            <p className="text-xs text-red-600 mt-0.5">{apiError}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* ── Donor Information ── */}
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Your Details</p>
                                <div className="space-y-3">
                                    {/* Name */}
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={donorName}
                                            onChange={(e) => {
                                                setDonorName(e.target.value);
                                                setFormErrors((prev) => ({ ...prev, donorName: undefined }));
                                            }}
                                            placeholder="Full Name *"
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 ${
                                                formErrors.donorName
                                                    ? "border-red-400 ring-2 ring-red-100"
                                                    : "border-gray-200 focus:border-green-dark focus:ring-2 focus:ring-green-dark/10"
                                            }`}
                                        />
                                        {formErrors.donorName && (
                                            <p className="text-xs text-red-500 mt-1">{formErrors.donorName}</p>
                                        )}
                                    </div>
                                    {/* Email */}
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={donorEmail}
                                            onChange={(e) => {
                                                setDonorEmail(e.target.value);
                                                setFormErrors((prev) => ({ ...prev, donorEmail: undefined }));
                                            }}
                                            placeholder="Email Address *"
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 ${
                                                formErrors.donorEmail
                                                    ? "border-red-400 ring-2 ring-red-100"
                                                    : "border-gray-200 focus:border-green-dark focus:ring-2 focus:ring-green-dark/10"
                                            }`}
                                        />
                                        {formErrors.donorEmail && (
                                            <p className="text-xs text-red-500 mt-1">{formErrors.donorEmail}</p>
                                        )}
                                    </div>
                                    {/* Phone */}
                                    <div>
                                        <div className="flex">
                                            <span className="flex items-center px-3 bg-gray-50 border-2 border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-500 font-medium">+91</span>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={10}
                                                value={donorPhone}
                                                onChange={(e) => {
                                                    setDonorPhone(e.target.value.replace(/\D/g, ''));
                                                    setFormErrors((prev) => ({ ...prev, donorPhone: undefined }));
                                                }}
                                                placeholder="Mobile Number *"
                                                className={`w-full pl-3 pr-4 py-3 rounded-r-xl border-2 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 ${
                                                    formErrors.donorPhone
                                                        ? "border-red-400 ring-2 ring-red-100"
                                                        : "border-gray-200 focus:border-green-dark focus:ring-2 focus:ring-green-dark/10"
                                                }`}
                                            />
                                        </div>
                                        {formErrors.donorPhone && (
                                            <p className="text-xs text-red-500 mt-1">{formErrors.donorPhone}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* ── Donation Type ── */}
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Donation Type</p>
                                <div className="flex gap-3">
                                    {["one-time", "monthly"].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setDonationType(type)}
                                            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                                                donationType === type
                                                    ? "bg-green-dark text-white border-green-dark shadow-md"
                                                    : "bg-white text-gray-600 border-gray-200 hover:border-green-dark/40"
                                            }`}
                                        >
                                            {type === "one-time" ? (
                                                <><Diamond className={`w-3.5 h-3.5 ${donationType === type ? "text-orange-light" : "text-orange"}`} /> One Time</>
                                            ) : (
                                                <><RefreshCcw className={`w-3.5 h-3.5 ${donationType === type ? "text-blue-300" : "text-blue-500"}`} /> Monthly</>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* ── Amount ── */}
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                                    Choose Amount <span className="text-orange">(INR ₹)</span>
                                </p>
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    {PRESETS.map((amt) => (
                                        <motion.button
                                            key={amt}
                                            type="button"
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => handlePreset(amt)}
                                            className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                                                selectedAmount === amt && !customAmount
                                                    ? "bg-orange text-white border-orange shadow-lg shadow-orange/25"
                                                    : "bg-white text-gray-700 border-gray-200 hover:border-orange/50 hover:text-orange"
                                            }`}
                                        >
                                            ₹{amt.toLocaleString("en-IN")}
                                        </motion.button>
                                    ))}
                                </div>
                                {/* Custom amount */}
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-base">₹</span>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={customAmount}
                                        onChange={(e) => handleCustom(e.target.value.replace(/\D/g, ''))}
                                        placeholder="Enter custom amount"
                                        className={`w-full pl-8 pr-4 py-3.5 rounded-xl border-2 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 ${
                                            customAmount
                                                ? "border-orange ring-2 ring-orange/10"
                                                : "border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/10"
                                        }`}
                                    />
                                </div>
                                {formErrors.amount && (
                                    <p className="text-xs text-red-500 mt-1.5">{formErrors.amount}</p>
                                )}

                                {/* Amount preview pill */}
                                <AnimatePresence>
                                    {displayAmount > 0 && (
                                        <motion.div
                                            key="amt-pill"
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="mt-3 flex items-center gap-2"
                                        >
                                            <span className="text-xs text-gray-500">You are donating:</span>
                                            <span className="bg-orange/10 text-orange font-bold px-3 py-1 rounded-full text-sm">
                                                ₹{displayAmount.toLocaleString("en-IN")}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* ── Payment Method ── */}
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                                    <ShieldCheckIcon className="w-4 h-4 text-green-dark" />
                                    Choose Payment Method
                                </p>
                                <div className="space-y-2.5">
                                    {PAYMENT_METHODS.map((method) => (
                                        <motion.label
                                            key={method.id}
                                            whileHover={{ scale: 1.01 }}
                                            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all bg-gradient-to-r ${method.color} ${
                                                selectedMethod === method.id
                                                    ? `${method.border} shadow-md`
                                                    : "border-gray-100 hover:border-gray-300"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.id}
                                                checked={selectedMethod === method.id}
                                                onChange={() => setSelectedMethod(method.id)}
                                                className="accent-orange w-4 h-4"
                                            />
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="min-w-[70px]">{method.icon}</div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">{method.label}</p>
                                                    <p className="text-xs text-gray-500">{method.desc}</p>
                                                    {/* App pills for UPI */}
                                                    {method.apps.length > 0 && selectedMethod === method.id && (
                                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                                            {method.apps.map((app) => (
                                                                <span key={app} className="text-xs bg-white border border-gray-200 rounded-full px-2.5 py-0.5 text-gray-600 font-medium shadow-sm">
                                                                    {app}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {selectedMethod === method.id && (
                                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${method.badge}`}>
                                                    Selected
                                                </span>
                                            )}
                                        </motion.label>
                                    ))}
                                </div>

                                {/* UPI ID field for UPI / GPay / PhonePe */}
                                <AnimatePresence>
                                    {["upi", "gpay", "phonepe"].includes(selectedMethod) && (
                                        <motion.div
                                            key="upi-field"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden mt-3"
                                        >
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                                                Enter UPI ID <span className="text-gray-400 font-normal">(e.g. name@upi)</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={upiId}
                                                onChange={(e) => {
                                                    setUpiId(e.target.value);
                                                    setFormErrors((prev) => ({ ...prev, upiId: undefined }));
                                                }}
                                                placeholder="yourname@okaxis / @ybl / @paytm"
                                                className={`w-full px-4 py-3 rounded-xl border-2 text-sm text-gray-700 outline-none transition-all ${
                                                    formErrors.upiId
                                                        ? "border-red-400 ring-2 ring-red-100"
                                                        : "border-gray-200 focus:border-[#097939] focus:ring-2 focus:ring-[#097939]/10"
                                                }`}
                                            />
                                            {formErrors.upiId && (
                                                <p className="text-xs text-red-500 mt-1">{formErrors.upiId}</p>
                                            )}
                                            <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                                                <ShieldCheckIcon className="w-3 h-3 text-[#097939]" />
                                                Your UPI ID is transmitted securely and never stored.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* ── Motivational reminder ── */}
                            <div className="bg-gradient-to-r from-orange/8 to-green-dark/5 rounded-2xl p-4 border border-orange/15 flex gap-3 items-start">
                                <BiDonateHeart className="w-8 h-8 text-orange flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-green-dark mb-0.5">Your donation matters</p>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        ₹{PRESETS[1].toLocaleString("en-IN")} feeds a family for a week. ₹{PRESETS[3].toLocaleString("en-IN")} supports a student&apos;s education for a month.
                                        Every rupee counts — <span className="text-orange font-semibold">दिल से दो, समाज के लिए।</span>
                                    </p>
                                </div>
                            </div>

                            {/* ── Submit ── */}
                            <motion.button
                                type="submit"
                                disabled={isProcessing}
                                whileHover={!isProcessing ? { scale: 1.02, y: -2 } : {}}
                                whileTap={!isProcessing ? { scale: 0.98 } : {}}
                                className={`w-full py-4 bg-gradient-to-r from-orange to-orange-light text-white font-bold text-base rounded-xl shadow-lg shadow-orange/30 hover:shadow-orange/50 transition-all flex items-center justify-center gap-2 ${
                                    isProcessing ? "opacity-80 cursor-not-allowed" : ""
                                }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <BiDonateHeart className="w-5 h-5" />
                                        Donate Now
                                    </>
                                )}
                            </motion.button>

                            {/* T&C */}
                            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                                By donating, you agree to our{" "}
                                <span className="underline cursor-pointer text-gray-500">Terms &amp; Conditions</span> and{" "}
                                <span className="underline cursor-pointer text-gray-500">Privacy Policy</span>.{" "}
                                Bhartiya Gorkha Seva Samaj is a registered non-profit organisation.
                                Donations are voluntary and non-refundable.
                                We do not charge any hidden fees. Your payment details are handled securely.
                                <span className="block mt-1 text-gray-400">*Terms &amp; Conditions Apply.</span>
                            </p>
                        </form>
                    </motion.div>

                    {/* ── SIDEBAR ───────────────────────────────── */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Why donate card */}
                        <motion.div {...sectionFade} className="bg-white rounded-[1.5rem] shadow-lg border-2 border-black p-6 space-y-4">
                            <h3 className="font-heading text-green-dark font-bold text-lg flex items-center gap-2">
                                <BiDonateHeart className="w-6 h-6 text-orange" />
                                Why Donate?
                            </h3>
                            {[
                                { icon: <GraduationCap className="w-5 h-5 text-orange" />, text: "Fund scholarships for underprivileged Gorkha students" },
                                { icon: <HeartPulse className="w-5 h-5 text-orange" />, text: "Provide medical assistance to families in need" },
                                { icon: <PartyPopper className="w-5 h-5 text-orange" />, text: "Preserve our rich cultural heritage & festivals" },
                                { icon: <Handshake className="w-5 h-5 text-orange" />, text: "Strengthen community bonds & social welfare" },
                                { icon: <Zap className="w-5 h-5 text-orange" />, text: "Empower women through skill-development programs" },
                            ].map((item) => (
                                <div key={item.text} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
                                    <p className="text-sm text-gray-600 leading-snug">{item.text}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Trust badge card */}
                        <motion.div {...sectionFade} className="bg-gradient-to-br from-green-dark/5 to-orange/5 rounded-[1.5rem] border-2 border-black p-6 text-center">
                            <img
                                src="/logo/WhatsApp Image 2026-04-02 at 3.55.48 PM.jpeg"
                                alt="Logo"
                                className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-green-dark/20 shadow"
                            />
                            <p className="font-heading text-green-dark font-bold text-base">Bhartiya Gorkha Seva Samaj</p>
                            <p className="text-xs text-gray-500 mt-1">Uttar Pradesh, Lucknow</p>
                            <div className="flex items-center justify-center gap-1.5 mt-3 text-green-dark">
                                <ShieldCheckIcon className="w-4 h-4" />
                                <span className="text-xs font-semibold">Registered Non-Profit Organisation</span>
                            </div>
                            <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                                100% of your donation goes directly to community welfare programs. We maintain full transparency in our operations.
                            </p>
                        </motion.div>


                    </div>
                </div>
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
                                <BiDonateHeart className="w-10 h-10 text-green-dark" />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-green-dark mb-2">Dhanyawaad! 🙏</h3>
                            <p className="text-gray-500 text-sm mb-2">
                                Your donation of <span className="text-orange font-bold">₹{displayAmount.toLocaleString("en-IN")}</span> has been recorded.
                            </p>
                            {transactionId && (
                                <p className="text-xs text-gray-400 mb-1">
                                    Transaction ID: <span className="font-mono font-semibold text-gray-600">{transactionId}</span>
                                </p>
                            )}
                            <p className="text-gray-400 text-xs mb-6 leading-relaxed">
                                No payment gateway is connected yet — this is a UI demonstration. Your generosity will be processed once the integration is live.
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
