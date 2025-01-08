'use client';

import PageLayout from "../layouts/page-layout/page-layout";

export default function TermsOfService() {
    return (
        <PageLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Terms of Service</h1>
                <p>Welcome to Gurunanak Bookstore. By accessing or using our website and services, you agree to comply with and be bound by the following Terms of Service. If you do not agree with these terms, please do not use our website or services.</p>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Acceptance of Terms</h2>
                    <p>By accessing or using the website and services, you accept and agree to abide by these Terms of Service. You also agree to our Privacy Policy and other related policies, which are incorporated herein by reference. If you are using the services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms of Service.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Changes to Terms</h2>
                    <p>We reserve the right to modify, amend, or update these Terms of Service at any time. Any changes will be posted on this page with an updated revision date. It is your responsibility to review these terms periodically. Your continued use of the website and services after any changes constitutes your acceptance of the updated terms.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Use of Our Services</h2>
                    <p>Our website and services are intended for lawful purposes only. You agree to use our services in compliance with all applicable local, state, and federal laws and regulations. You must not use our services for any illegal, unauthorized, or fraudulent activity.</p>
                    <ul className="list-disc list-inside">
                        <li>You are responsible for any activity that occurs through your account.</li>
                        <li>You must provide accurate and complete information during registration and update it as necessary.</li>
                        <li>You agree not to disrupt, damage, or interfere with the functionality of our website or services.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Account Security</h2>
                    <p>When you create an account with us, you agree to maintain the confidentiality of your account and password. You are responsible for all activities under your account, whether authorized by you or not. If you suspect unauthorized access to your account, you must notify us immediately.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Product Availability</h2>
                    <p>We make every effort to ensure that products listed on our website are available for purchase. However, due to the nature of online inventory, there may be instances where a product is out of stock or discontinued. If a product you order becomes unavailable, we will notify you and offer a suitable alternative or a refund for the unavailable product.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Pricing and Payment</h2>
                    <p>Prices listed on our website are subject to change without notice. We reserve the right to correct any pricing errors or inaccuracies that may occur. All prices are displayed in the local currency, and applicable taxes will be added at checkout.</p>
                    <p>We accept various payment methods, including credit/debit cards, PayPal, and other options. By submitting an order, you authorize us to charge the payment method you provide for the total amount of your order, including any applicable taxes, shipping, and handling fees.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Shipping and Delivery</h2>
                    <p>We offer shipping services for the products purchased on our website. Shipping fees and delivery times will vary based on the shipping address and the selected shipping method. Please note that shipping delays may occur due to unforeseen circumstances beyond our control (e.g., weather, strikes, etc.).</p>
                    <p>Once an order is shipped, you will receive a tracking number to monitor the delivery status of your package.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Returns and Refunds</h2>
                    <p>Our Return and Refund Policy applies to all items purchased from our website. Please review our <a href="/return-refund-policy" className="text-blue-600">Return and Refund Policy</a> for details on how to return products, request refunds, and understand our procedures.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">User-Generated Content</h2>
                    <p>By submitting reviews, comments, or other content to our website, you grant us a perpetual, royalty-free license to use, display, and distribute such content for marketing and promotional purposes. You must not submit content that is illegal, defamatory, or infringes on the rights of others.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Intellectual Property</h2>
                    <p>All content on our website, including but not limited to text, images, logos, designs, and software, is the property of Gurunanak Bookstore or its licensors. You may not use, reproduce, or distribute any content from our website without our explicit consent, except as permitted under applicable copyright laws.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Limitation of Liability</h2>
                    <p>To the fullest extent permitted by law, Gurunanak Bookstore and its affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or inability to use our services, even if we have been advised of the possibility of such damages. This includes any damages to your computer or other devices arising from using our website or services.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Indemnification</h2>
                    <p>You agree to indemnify and hold harmless Gurunanak Bookstore, its affiliates, and its employees, officers, and agents from any claims, liabilities, damages, or expenses (including legal fees) arising from your use of the website or services or any violation of these Terms of Service.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Governing Law</h2>
                    <p>These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction where Gurunanak Bookstore is based, without regard to its conflict of law principles. Any legal action or proceeding related to these terms shall be brought exclusively in the courts located in that jurisdiction.</p>
                </section>

            </div>
        </PageLayout>
    );
}
