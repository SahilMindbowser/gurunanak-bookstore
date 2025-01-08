'use client';

import PageLayout from "../layouts/page-layout/page-layout";

export default function ReturnRefundPolicy() {
    return (
        <PageLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Return and Refund Policy</h1>
                <p>At Gurunanak Bookstore, we want you to be fully satisfied with your purchase. If for any reason you are not completely happy with your order, we are here to help. This Return and Refund Policy outlines our process for returns, exchanges, and refunds, as well as the conditions under which they apply.</p>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Return Eligibility</h2>
                    <p>You may return items within 30 days of receiving your order for a full refund, subject to the following conditions:</p>
                    <ul className="list-disc list-inside">
                        <li>The item must be in its original condition and packaging.</li>
                        <li>The item must not be used, opened, or damaged.</li>
                        <li>Books must be in resalable condition (unmarked, unopened, and undamaged).</li>
                        <li>Items must be returned with proof of purchase (receipt or order confirmation).</li>
                    </ul>
                    <p>Items that do not meet these criteria are not eligible for return or refund.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Non-Returnable Items</h2>
                    <p>Certain items cannot be returned or refunded. These include:</p>
                    <ul className="list-disc list-inside">
                        <li>Gift cards or store credits.</li>
                        <li>Items marked as "final sale" or "non-returnable" at the time of purchase.</li>
                        <li>Items that are custom-made, personalized, or made to order.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Return Process</h2>
                    <p>If you wish to return an item, please follow these steps:</p>
                    <ul className="list-disc list-inside">
                        <li>Contact our customer service team at <a href="mailto:support@gurunanakbookstore.com" className="text-blue-600">support@gurunanakbookstore.com</a> or call +1 (800) 123-4567 to request a Return Merchandise Authorization (RMA) number.</li>
                        <li>Once you receive the RMA number, securely package the item with its original packaging and proof of purchase.</li>
                        <li>Ship the item back to us at the address provided with the RMA number. Return shipping fees are the responsibility of the customer unless the return is due to a defect or error on our part.</li>
                    </ul>
                    <p>Please note that we are not responsible for lost or damaged items during the return process. We recommend using a trackable shipping service.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Refunds</h2>
                    <p>Once we receive your returned item and confirm that it meets our return policy requirements, we will process your refund. The refund will be issued to the original payment method used at the time of purchase. Please allow up to 10 business days for the refund to appear in your account.</p>
                    <p>Refunds will be made for the purchase price of the item(s) only. Shipping and handling fees are non-refundable unless the return is due to an error on our part (e.g., defective or incorrect items).</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Exchanges</h2>
                    <p>If you would like to exchange an item for a different size, color, or product, please follow the return process and place a new order. We do not offer direct exchanges. Once your return is processed and refunded, you may purchase the new item separately.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Damaged or Defective Items</h2>
                    <p>If you receive an item that is damaged, defective, or not as described, please contact us within 7 days of receiving the order. We will provide a full refund or replacement for the damaged item at no additional cost to you. We may ask for photos of the damage to assist in processing your claim.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Cancellations</h2>
                    <p>If you wish to cancel your order, please contact us as soon as possible. We can only cancel orders before they have been processed or shipped. Once an order has been shipped, it is subject to our return policy.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Shipping Costs</h2>
                    <p>Customers are responsible for all return shipping costs, except in cases where the item is defective, damaged, or the wrong item was shipped. Original shipping fees are non-refundable unless the return is due to an error on our part.</p>
                </section>

            </div>
        </PageLayout>
    );
}
