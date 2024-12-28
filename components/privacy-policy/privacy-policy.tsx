'use client';

import PageLayout from "../layouts/page-layout/page-layout";

export default function PrivacyPolicy() {
    return (
        <PageLayout>
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">Privacy Policy</h1>
                <p>At Gurunanak Bookstore, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.</p>
                <section className="space-y-2">
                    <h2 className="text-lg font-semibold">Information We Collect</h2>
                    <ul className="list-disc list-inside">
                        <li>
                            Personal Information: Name, email address, phone number, shipping address, and payment details.
                        </li>
                        <li>
                            Non-Personal Information: Browser type, IP address, and other data collected via cookies.
                        </li>
                    </ul>
                </section>
                <section className="space-y-2">
                    <h2 className="text-lg font-semibold">We use your information to</h2>
                    <ul className="list-disc list-inside">
                        <li>Process and deliver your orders.</li>
                        <li>Send updates and promotional materials.</li>
                        <li>Improve our website and services.</li>
                    </ul>
                </section>
            </div>
        </PageLayout>
    );
}
