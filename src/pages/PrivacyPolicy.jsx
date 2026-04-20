import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/30">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-gray-100"
        >
            <h1 className="font-heading text-4xl font-bold text-green-dark mb-10 text-center">
                Privacy Policy
            </h1>

            <div className="space-y-8 text-gray-700 font-body leading-relaxed md:text-lg">
                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">1. Information We Collect</h2>
                    <p className="mb-4">We collect information you provide directly to us, including:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Personal identification information (name, email, phone number)</li>
                        <li>KYC documents for Digital ID verification</li>
                        <li>Profile information and preferences</li>
                        <li>Content you post on the Community Wall</li>
                        <li>Communication with our support team</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">2. How We Use Your Information</h2>
                    <p className="mb-4">We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Verify your identity for Digital Gorkha ID</li>
                        <li>Send you notifications about events and updates</li>
                        <li>Respond to your comments and questions</li>
                        <li>Protect against fraud and abuse</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">3. KYC Policy</h2>
                    <p className="mb-4">For Digital Gorkha ID verification, we require:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>A valid government-issued ID (Aadhaar, PAN, Voter ID, or Passport)</li>
                        <li>A recent photograph for profile verification</li>
                        <li>Basic personal information for identity confirmation</li>
                    </ul>
                    <p>KYC documents are securely stored and only used for verification purposes. They are never shared with third parties without your explicit consent.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">4. Data Protection</h2>
                    <p className="mb-4">We implement appropriate security measures to protect your personal information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>All data is encrypted in transit and at rest</li>
                        <li>Access to personal data is restricted to authorized personnel</li>
                        <li>Regular security audits and vulnerability assessments</li>
                        <li>Secure data centers with industry-standard protections</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">5. Cookies</h2>
                    <p className="mb-4">We use cookies and similar technologies to:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Keep you signed in to your account</li>
                        <li>Remember your preferences</li>
                        <li>Analyze how our services are used</li>
                        <li>Improve user experience</li>
                    </ul>
                    <p>You can control cookie settings through your browser preferences.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">6. Your Rights</h2>
                    <p className="mb-4">You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Access your personal data</li>
                        <li>Correct inaccurate information</li>
                        <li>Request deletion of your data</li>
                        <li>Withdraw consent for data processing</li>
                        <li>Export your data in a portable format</li>
                    </ul>
                    <p>To exercise these rights, please contact us at <a href="mailto:info@onegorkha.com" className="text-orange hover:underline">info@onegorkha.com</a>.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">7. Legal Compliance</h2>
                    <p className="mb-4">We comply with applicable data protection laws, including:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Information Technology Act, 2000</li>
                        <li>IT (Reasonable Security Practices and Procedures) Rules, 2011</li>
                        <li>Personal Data Protection Bill provisions (as applicable)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">8. Contact Us</h2>
                    <p className="mb-4">If you have questions about this Privacy Policy, please contact us:</p>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <p className="mb-2"><strong>Email:</strong> <a href="mailto:info@onegorkha.com" className="text-orange hover:underline">info@onegorkha.com</a></p>
                        <p className="mb-2"><strong>Phone:</strong> +91 78975 49993</p>
                        <p><strong>Address:</strong> Onebigbit Technologies Pvt. Ltd., India</p>
                    </div>
                </section>
            </div>
            
            <div className="mt-12 text-center">
                <Link to="/" className="inline-block px-8 py-3 bg-green-dark text-white rounded-full font-medium hover:bg-opacity-90 transition-all font-heading">
                    Return to Home
                </Link>
            </div>
        </motion.div>
    </div>
  );
}
