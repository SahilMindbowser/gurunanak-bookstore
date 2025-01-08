'use client';

import PageLayout from "../layouts/page-layout/page-layout";

export default function PrivacyPolicy() {
    return (
        <PageLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Privacy Policy</h1>
                <p>At Gurunanak Bookstore, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, store, and protect your information when you interact with our website and services.</p>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Information We Collect</h2>
                    <p>We collect two types of information:</p>
                    <ul className="list-disc list-inside">
                        <li>
                            <strong>Personal Information:</strong> This includes your name, email address, phone number, shipping address, payment details, and any other information you voluntarily provide when making purchases or signing up for our services.
                        </li>
                        <li>
                            <strong>Non-Personal Information:</strong> This includes information such as your IP address, browser type, device information, operating system, and data collected through cookies and other tracking technologies.
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">How We Use Your Information</h2>
                    <p>We use the information we collect for the following purposes:</p>
                    <ul className="list-disc list-inside">
                        <li>To process and fulfill your orders.</li>
                        <li>To send you important updates regarding your account, orders, and our services.</li>
                        <li>To send you promotional materials, newsletters, and special offers, if you've opted in.</li>
                        <li>To improve our website and services based on your feedback and usage patterns.</li>
                        <li>To comply with legal requirements and protect our legal rights.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Cookies and Tracking Technologies</h2>
                    <p>We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content and ads. By using our website, you consent to our use of cookies. You can manage or disable cookies through your browser settings at any time.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Data Security</h2>
                    <p>Your information is stored securely, and we take appropriate measures to protect it from unauthorized access, alteration, or disclosure. We use industry-standard encryption for payment processing and store sensitive data in accordance with applicable data protection laws.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Data Retention</h2>
                    <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. If you wish to delete your account or request that we stop using your information, you can contact us at any time.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Your Rights and Choices</h2>
                    <p>Depending on your location, you may have certain rights regarding your personal information. These rights may include:</p>
                    <ul className="list-disc list-inside">
                        <li>The right to access the personal information we hold about you.</li>
                        <li>The right to correct any inaccurate or incomplete information.</li>
                        <li>The right to delete your personal information.</li>
                        <li>The right to opt-out of receiving promotional communications.</li>
                    </ul>
                    <p>If you wish to exercise any of these rights, please contact us through the contact details below.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Third-Party Links</h2>
                    <p>Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those external sites. We encourage you to review their privacy policies before providing any personal information.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised policy will be effective as of the date it is posted. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.</p>
                </section>
            </div>
        </PageLayout>
    );
}
