import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function TermsConditions() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50/30">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-gray-100"
        >
            <h1 className="font-heading text-4xl font-bold text-green-dark mb-10 text-center">
                Terms and Conditions
            </h1>

            <div className="space-y-8 text-gray-700 font-body leading-relaxed md:text-lg">
                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">1. Acceptance of Terms</h2>
                    <p>By accessing or using the OneGorkha application and website, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">2. User Guidelines</h2>
                    <p className="mb-4">As a user of OneGorkha, you agree to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Provide accurate and complete information during registration</li>
                        <li>Keep your account credentials confidential</li>
                        <li>Use the platform responsibly and respectfully</li>
                        <li>Not impersonate others or create false identities</li>
                        <li>Respect the intellectual property rights of others</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">3. Prohibited Actions</h2>
                    <p className="mb-4">The following activities are strictly prohibited:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Posting offensive, harmful, or illegal content</li>
                        <li>Harassment, bullying, or discrimination of any kind</li>
                        <li>Sharing false or misleading information</li>
                        <li>Attempting to hack or disrupt our services</li>
                        <li>Using the platform for commercial spam or advertising</li>
                        <li>Violating any applicable laws or regulations</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">4. Community Rules</h2>
                    <p className="mb-4">When using the Community Wall and other social features:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Be respectful and constructive in all interactions</li>
                        <li>Do not share personal information of others without consent</li>
                        <li>Report any violations of community guidelines</li>
                        <li>Content may be moderated to ensure community safety</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">5. Payment Terms</h2>
                    <p className="mb-4">For membership purchases:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>All prices are in Indian Rupees (INR)</li>
                        <li>Payments are processed through secure payment gateways</li>
                        <li>Yearly memberships are valid for 12 months from purchase date</li>
                        <li>Lifetime memberships are valid indefinitely</li>
                        <li>Membership fees are non-transferable</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">6. Refund Policy</h2>
                    <p className="mb-4">Refund requests are considered under the following conditions:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Requests must be made within 7 days of purchase</li>
                        <li>Refunds are processed on a case-by-case basis</li>
                        <li>Processing fees may be deducted from refund amounts</li>
                        <li>Refunds will be credited to the original payment method</li>
                    </ul>
                    <p>Contact <a href="mailto:info@onegorkha.com" className="text-orange hover:underline">info@onegorkha.com</a> for refund requests.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">7. Liability</h2>
                    <p className="mb-4">OneGorkha and Onebigbit Technologies:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Provide services "as is" without warranties of any kind</li>
                        <li>Are not liable for user-generated content</li>
                        <li>May modify or discontinue services at any time</li>
                        <li>Are not responsible for third-party links or services</li>
                        <li>Limit liability to the amount paid for services</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">8. Account Termination</h2>
                    <p className="mb-4">We reserve the right to:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Suspend or terminate accounts violating these terms</li>
                        <li>Remove content that violates community guidelines</li>
                        <li>Take legal action against serious violations</li>
                        <li>Refuse service to anyone at our discretion</li>
                    </ul>
                    <p>You may also delete your account at any time through the app settings.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">9. Intellectual Property</h2>
                    <p>All content and materials on OneGorkha, including logos, designs, and software, are owned by Onebigbit Technologies Pvt. Ltd. Users retain ownership of content they create but grant us a license to display and distribute it on our platform.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">10. Changes to Terms</h2>
                    <p>We may update these terms from time to time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the new terms.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold font-heading text-orange mb-4">11. Contact Us</h2>
                    <p className="mb-4">If you have questions about these Terms & Conditions, please contact us:</p>
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
