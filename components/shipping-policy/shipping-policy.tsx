'use client';

import PageLayout from "../layouts/page-layout/page-layout";

export default function ShippingPolicy() {
    return (
        <PageLayout>
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">Shipping Policy</h1>
                <p>At Gurunanak Bookstore, we strive to provide the best shipping experience for our customers. Below is our shipping policy that outlines the delivery options, shipping charges, and related details.</p>
                <section className="space-y-2">
                    <h2 className="text-lg font-semibold">Processing Time</h2>
                    <ul className="list-disc list-inside">
                        <li>
                            Orders are typically processed within 1-2 business days of receiving payment. Please note that processing times may vary during peak seasons or holidays.
                        </li>
                        <li>
                            Orders are processed and shipped only on business days (Monday through Friday, excluding holidays).
                        </li>
                    </ul>
                </section>
                <section className="space-y-2">
                    <h2 className="text-lg font-semibold">Shipping Costs</h2>
                    <ul className="list-disc list-inside">
                        <li>Shipping costs are calculated at checkout based on the size, weight, and destination of your order.</li>
                        <li>We offer free shipping on orders over $50 (within Pune).</li>
                        <li>For orders under $50, shipping fees are calculated based on your location.</li>
                    </ul>
                </section>
                <section className="space-y-2">
                    <h2 className="text-lg font-semibold">Damaged or Lost Shipments</h2>
                    <ul className="list-disc list-inside">
                        <li>While we take utmost care in packaging and shipping, if your order is damaged or lost during transit, please contact us immediately at [support@xyz.com]. We will work with the carrier to resolve the issue.</li>
                    </ul>
                </section>
                <section className="space-y-2">
                    <h2 className="text-lg font-semibold">Address Changes</h2>
                    <ul className="list-disc list-inside">
                        <li>Once an order is processed, we cannot modify the shipping address. Please ensure that your address details are accurate before placing an order.</li>
                    </ul>
                </section>
            </div>
        </PageLayout>
    );
}
