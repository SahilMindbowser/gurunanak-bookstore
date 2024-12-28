'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { School, Truck } from 'lucide-react';


export default function CartPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
    const [sampleCartItems, setSampleCartItems] = useState([
        { id: 1, title: 'Math Workbook - Grade 1', price: 150, quantity: 1 },
        { id: 2, title: 'Science Kit - Grade 1', price: 300, quantity: 1 },
        { id: 3, title: 'Drawing Book - Grade 1', price: 100, quantity: 2 },
    ]);

    const [contactDetails, setContactDetails] = useState({
        contact: '',
        address: '',
        city: 'Pune', // Fixed city
        state: 'Maharashtra', // Fixed state
        landmark: '',
    });
    const [errors, setErrors] = useState<any>({});

    const deliveryCharge = deliveryOption === 'delivery' ? 250 : 0;

    const total = sampleCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + deliveryCharge;

    const handleNextStep = () => {
        if (currentStep === 2) {
            const newErrors: any = {};

            // Validate contact number (must be 10 digits)
            if (deliveryOption === 'delivery' && !/^\d{10}$/.test(contactDetails.contact)) {
                newErrors.contact = 'Contact number must be exactly 10 digits.';
            }

            // Validate address (must be at least 5 characters)
            if (deliveryOption === 'delivery' && contactDetails.address.length < 5) {
                newErrors.address = 'Address should be at least 5 characters.';
            }

            // If errors are present, do not proceed
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            } else {
                setErrors({});
            }
        }
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleRemoveItem = (index: number) => {
        const updatedCartItems = [...sampleCartItems];
        updatedCartItems.splice(index, 1);
        setSampleCartItems(updatedCartItems);
    };


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
                            {sampleCartItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center p-4 border rounded-md shadow-sm"
                                >
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleRemoveItem(index)}
                                            className=""
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-6 border-t pt-4">
                            <h3 className="text-lg font-semibold">Subtotal:</h3>
                            <p className="text-lg font-bold">${sampleCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
                        </div>
                        <p className="text-gray-500 text-sm mt-4">Shipping calculated at the next step.</p>
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
                                <div className="flex justify-center items-center w-full h-32 rounded-md mb-4">
                                    <School className="w-12 h-12" />
                                </div>
                                <h3 className="text-lg font-semibold">School Pick-Up</h3>
                                <p className="text-sm text-gray-600">Convenient and Free</p>
                            </div>

                            {/* Local Delivery Option */}
                            <div
                                onClick={() => setDeliveryOption('delivery')}
                                className={`cursor-pointer border rounded-lg p-4 text-center shadow-sm transition-transform transform hover:scale-105 ${deliveryOption === 'delivery' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                                    }`}
                            >
                                <div className="flex justify-center items-center w-full h-32 rounded-md mb-4">
                                    <Truck className="w-12 h-12" />
                                </div>
                                <h3 className="text-lg font-semibold">Local Delivery</h3>
                                <p className="text-sm text-gray-600">Charges: $250</p>
                            </div>
                        </div>

                        {deliveryOption === 'delivery' && (
                            <div className="space-y-4 mt-6">
                                <h3 className="text-lg font-bold">Delivery Details</h3>
                                <div className="space-y-4">
                                    {/* Contact Number */}
                                    <div>
                                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                                            Contact Number (10 didgits) <span className="text-red-600">*</span>
                                        </label>
                                        <Input
                                            id="contact"
                                            type="text"
                                            placeholder="Contact Number"
                                            value={contactDetails.contact}
                                            onChange={(e) =>
                                                setContactDetails((prev) => ({ ...prev, contact: e.target.value }))
                                            }
                                            className="mt-1 p-2 border rounded-md w-full"
                                        />
                                        {errors.contact && <p className="text-sm text-red-600 mt-1">{errors.contact}</p>}
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            Street/Address (min 5 characters) <span className="text-red-600">*</span>
                                        </label>
                                        <Input
                                            id="address"
                                            type="text"
                                            placeholder="Street/Address"
                                            value={contactDetails.address}
                                            onChange={(e) =>
                                                setContactDetails((prev) => ({ ...prev, address: e.target.value }))
                                            }
                                            className="mt-1 p-2 border rounded-md w-full"
                                        />
                                        {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
                                    </div>

                                    {/* City (Fixed value) */}
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

                                    {/* State (Fixed value) */}
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
                            {sampleCartItems.map((item) => (
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
                            <p className="text-gray-500 text-sm mt-4">Convenience calculated at payment.</p>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    {currentStep > 1 && (
                        <Button variant="outline" onClick={handlePreviousStep}>
                            Previous
                        </Button>
                    )}
                    {currentStep < 3 && (
                        <Button onClick={handleNextStep}>Next</Button>
                    )}
                    {currentStep === 3 && (
                        <Button onClick={() => alert('Order Placed!')} className="bg-blue-500 text-white">
                            Proceed to Payment
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
