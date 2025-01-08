'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { ProductCard } from '@/components/primary/product-card/product-card';
import { toast } from 'sonner';

export default function GradeProductDetails({ params }: { params: { grade: string; productId: string } }) {
    const [quantity, setQuantity] = useState<number>(1);
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const { grade, productId } = params;

            const schoolId = '67750d9c7ebea80429b4bda4';
            try {
                // Fetch product details
                const productResponse = await axios.get(`/api/school/${schoolId}/grade/${grade}/product/${productId}`);
                setProduct(productResponse.data.product);

                // Fetch related products
                const relatedResponse = await axios.get(`/api/school/${schoolId}/grade/${grade}/product`);
                setRelatedProducts(relatedResponse.data.products);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [params]);

    const handleAddToCart = () => {
        if (product) {
            toast.success(`${quantity} of ${product.title} added to the cart.`)
            addToCart(product, quantity);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center p-8 min-h-screen"><h1>Loading...</h1></div>;
    }

    if (!product) {
        return <div className="flex justify-center items-center p-8 min-h-screen"><h1>Product not found</h1></div>;
    }

    return (
        <div className="container mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="rounded-lg shadow-md"
                    />
                </div>

                <div className="flex flex-col justify-center space-y-6">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="text-lg font-semibold text-gray-700">${product.price.toFixed(2)}</p>

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

                    <Button onClick={handleAddToCart} className="w-full">
                        Add to Cart
                    </Button>

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
