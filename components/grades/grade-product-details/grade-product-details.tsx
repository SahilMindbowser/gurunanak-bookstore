'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { ProductCard } from '@/components/primary/product-card/product-card';

export default function GradeProductDetails() {
    const [quantity, setQuantity] = useState(1);

    const product = {
        id: 1,
        title: 'Science Kit - Grade 1',
        price: 300,
        description: 'A comprehensive science kit for Grade 1 students to explore the wonders of science.',
        image: '/assets/classes.jpg',
        shippingPolicy: 'Shipping typically takes 3-5 business days. Free shipping for orders above $50.',
        returnPolicy: 'Returns are accepted within 30 days of purchase. Items must be in original condition.',
    };

    const relatedProducts = [
        { id: 2, title: 'Math Workbook - Grade 1', price: 150, image: '/assets/classes.jpg' },
        { id: 3, title: 'Drawing Book - Grade 1', price: 100, image: '/assets/classes.jpg' },
        { id: 4, title: 'Pencil Set', price: 50, image: '/assets/classes.jpg' },
        { id: 5, title: 'Eraser Pack', price: 30, image: '/assets/classes.jpg' },
    ];

    const handleAddToCart = () => {
        alert(`Added ${quantity} of ${product.title} to the cart.`);
    };

    return (
        <div className="container mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="flex items-center justify-center">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="rounded-lg shadow-md"
                    />
                </div>

                {/* Product Details Section */}
                <div className="flex flex-col justify-center space-y-6">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="text-lg font-semibold text-gray-700">${product.price.toFixed(2)}</p>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="quantity" className="font-medium text-gray-700">
                            Quantity:
                        </label>
                        <Input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            min={1}
                            className="w-20"
                        />
                    </div>

                    {/* Add to Cart Button */}
                    <Button onClick={handleAddToCart} className="w-full">
                        Add to Cart
                    </Button>

                    {/* Accordion for Policies */}
                    <Accordion type="single" collapsible className="mt-6">
                        <AccordionItem value="description">
                            <AccordionTrigger>Description</AccordionTrigger>
                            <AccordionContent>{product.description}</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="shipping">
                            <AccordionTrigger>Shipping Policy</AccordionTrigger>
                            <AccordionContent>{product.shippingPolicy}</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="return">
                            <AccordionTrigger>Return Policy</AccordionTrigger>
                            <AccordionContent>{product.returnPolicy}</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>

            {/* Additional Product Recommendations */}
            <div className="mt-12">
                <h2 className="text-xl font-bold mb-4">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((item) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            buttonText="View Details"
                            onButtonClick={() => alert(`View details for ${item.title}`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
