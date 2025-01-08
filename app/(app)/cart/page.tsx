'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Loader2, School, Trash2, Truck } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function CartPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const { cart, removeFromCart, clearCart } = useCart();

    const { data: session } = useSession();

    const [contactDetails, setContactDetails] = useState({
        contact: '',
        address: '',
        postalCode: '',
        city: 'Pune',
        state: 'Maharashtra',
        landmark: '',
    });

    const [errors, setErrors] = useState<any>({});
    const deliveryCharge = deliveryOption === 'delivery' ? 250 : 0;

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + deliveryCharge;

    const handleNextStep = () => {
        if (currentStep === 2) {
            const newErrors: any = {};

            if (deliveryOption === 'delivery') {
                // Validate contact number
                if (!/^\d{10}$/.test(contactDetails.contact)) {
                    newErrors.contact = 'Contact number must be exactly 10 digits.';
                }
                // Validate address
                if (contactDetails.address.length < 5) {
                    newErrors.address = 'Address should be at least 5 characters.';
                }
                // Validate postal code
                if (!/^\d{6}$/.test(contactDetails.postalCode)) {
                    newErrors.postalCode = 'Contact number must be exactly 6 digits.';
                }
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            setErrors({});
        }
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };


    const handleOrderPlacement = async () => {
        setIsPlacingOrder(true);
        try {
            const orderData = {
                userId: session?.user.id,
                items: cart.map((item) => ({
                    productId: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                })),
                totalAmount: total.toFixed(2),
                shippingAddress:
                    deliveryOption === 'delivery'
                        ? {
                            address: contactDetails.address,
                            city: contactDetails.city,
                            state: contactDetails.state,
                            postalCode: contactDetails.postalCode,
                            country: 'India',
                        }
                        : null,
                deliveryOption,
                paymentMethod: 'Online',
            };

            const response = await axios.post('/api/order', orderData);
            // const token = response.data.orderToken;
            toast.success('Order placed successfully!')
            clearCart();
            setCurrentStep(1);
        } catch (error) {
            console.error('Failed to place order:', error);
            toast.error('Failed to place the order. Please try again later.')
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto p-8 text-center space-y-6 min-h-screen">
                <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
                <p className="text-gray-600">Looks like you haven’t added anything to your cart yet.</p>
                <Button onClick={() => window.location.href = '/grades'}>Start Shopping</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="space-y-6">
                {/* Stepper */}
                <div className="flex justify-center items-center gap-4">
                    {['Order Items', 'Delivery Options', 'Order Summary'].map((label, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div
                                className={`rounded-full h-10 w-10 flex items-center justify-center font-bold ${currentStep === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}
                            >
                                {index + 1}
                            </div>
                            <p className="text-sm mt-2 text-center">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                {currentStep === 1 && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Order Items</h2>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col lg:flex-row lg:justify-between space-y-2 lg:space-y-0 lg:items-center p-4 border rounded-md shadow-sm"
                                >
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-medium lg:text-base text-sm">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <Trash2
                                            onClick={() => removeFromCart(item.id)}
                                            className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {cart.length > 0 && (
                            <div className="flex justify-between items-center mt-6 border-t pt-4">
                                <h3 className="text-lg font-semibold">Subtotal:</h3>
                                <p className="text-lg font-bold">
                                    ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                                </p>
                            </div>
                        )}
                        <p className="text-gray-500 text-sm mt-4">Shipping calculated at the checkout step.</p>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold">Choose Delivery Option</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* School Pickup Option */}
                            <div
                                onClick={() => setDeliveryOption('pickup')}
                                className={`cursor-pointer border rounded-lg p-4 text-center shadow-sm transition-transform transform hover:scale-105 ${deliveryOption === 'pickup' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                                    }`}
                            >
                                <School className="w-12 h-12 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold">School Pick-Up</h3>
                                <p className="text-sm text-gray-600">Convenient and Free</p>
                            </div>

                            {/* Local Delivery Option */}
                            <div
                                onClick={() => setDeliveryOption('delivery')}
                                className={`cursor-pointer border rounded-lg p-4 text-center shadow-sm transition-transform transform hover:scale-105 ${deliveryOption === 'delivery' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                                    }`}
                            >
                                <Truck className="w-12 h-12 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold">Local Delivery</h3>
                                <p className="text-sm text-gray-600">Charges: $250</p>
                            </div>
                        </div>

                        {deliveryOption === 'delivery' && (
                            <div className="space-y-4 mt-6">
                                <h3 className="text-lg font-bold">Delivery Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                                            Contact Number (10 digits) <span className="text-red-600">*</span>
                                        </label>
                                        <Input
                                            id="contact"
                                            type="text"
                                            value={contactDetails.contact}
                                            onChange={(e) =>
                                                setContactDetails((prev) => ({
                                                    ...prev,
                                                    contact: e.target.value,
                                                }))
                                            }
                                            className="mt-1"
                                        />
                                        {errors.contact && (
                                            <p className="text-sm text-red-600 mt-1">{errors.contact}</p>
                                        )}
                                    </div>
                                    {/* Address */}
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            Address (min 5 characters) <span className="text-red-600">*</span>
                                        </label>
                                        <Input
                                            id="address"
                                            value={contactDetails.address}
                                            onChange={(e) =>
                                                setContactDetails((prev) => ({
                                                    ...prev,
                                                    address: e.target.value,
                                                }))
                                            }
                                            className="mt-1"
                                        />
                                        {errors.address && (
                                            <p className="text-sm text-red-600 mt-1">{errors.address}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            Postal Code (6 digits) <span className="text-red-600">*</span>
                                        </label>
                                        <Input
                                            id="address"
                                            value={contactDetails.postalCode}
                                            onChange={(e) =>
                                                setContactDetails((prev) => ({
                                                    ...prev,
                                                    postalCode: e.target.value,
                                                }))
                                            }
                                            className="mt-1"
                                        />
                                        {errors.postalCode && (
                                            <p className="text-sm text-red-600 mt-1">{errors.postalCode}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            City <span className="text-red-600">*</span>
                                        </label>
                                        <Input
                                            id="city"
                                            type="text"
                                            value={contactDetails.city}
                                            readOnly
                                            className="mt-1 p-2 border rounded-md bg-gray-100 cursor-not-allowed w-full"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                            State <span className="text-red-600">*</span>
                                        </label>
                                        <Input
                                            id="state"
                                            type="text"
                                            value={contactDetails.state}
                                            readOnly
                                            className="mt-1 p-2 border rounded-md bg-gray-100 cursor-not-allowed w-full"
                                        />
                                    </div>

                                    {/* Landmark */}
                                    <div>
                                        <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">
                                            Landmark (Optional)
                                        </label>
                                        <Input
                                            id="landmark"
                                            type="text"
                                            placeholder="Landmark (Optional)"
                                            value={contactDetails.landmark}
                                            onChange={(e) =>
                                                setContactDetails((prev) => ({ ...prev, landmark: e.target.value }))
                                            }
                                            className="mt-1 p-2 border rounded-md w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold">Order Summary</h2>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center p-4 border rounded-md shadow-sm"
                                >
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <Separator />
                            <div className="flex justify-between font-semibold">
                                <span>Delivery Charges:</span>
                                <span>${deliveryCharge.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    {currentStep > 1 && (
                        <Button onClick={handlePreviousStep} variant="outline">
                            Previous
                        </Button>
                    )}
                    {currentStep < 3 ? (
                        <Button onClick={handleNextStep}>Next</Button>
                    ) : (
                        <Button onClick={handleOrderPlacement}>{isPlacingOrder && <Loader2 className="animate-spin" />}Place Order</Button>
                    )}
                </div>
            </div>
        </div>
    );
}
