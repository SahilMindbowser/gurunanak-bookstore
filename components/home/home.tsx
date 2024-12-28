'use client';

import { ProductCard } from '@/components/primary/product-card/product-card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-gray-700 text-white h-[100vh] flex items-center justify-center p-3">
                <div className="absolute inset-0 opacity-30">
                    <Image
                        width={1440}
                        height={800}
                        src="/assets/home-background.jpg"
                        alt="Books and Stationery Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Welcome to Gurunanak Bookstore
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6">
                        Your trusted partner for school books, stationery, and supplies. Serving tie-up schools and walk-in customers with quality products and unbeatable service.
                    </p>
                    <Button size="lg" className="px-6 py-3">
                        Get Started
                    </Button>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <ProductCard key={i} id={i} title='Product Title' price='$10.99' image="/assets/classes.jpg" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Testimonials Section */}
            <section className="py-16 bg-blue-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
                            >
                                <p className="italic text-gray-700 mb-4">
                                    "Great selection of books and stationery. Excellent customer service!"
                                </p>
                                <h4 className="font-semibold text-gray-900">- Customer {i + 1}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Partners Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Our Trusted Partners</h2>
                    <div className="flex justify-center items-center flex-wrap gap-6">
                        {[...Array(5)].map((_, i) => (
                            <img
                                key={i}
                                src="/assets/partner-logo.webp"
                                alt={`Partner ${i + 1}`}
                                className="w-24 h-24 object-contain"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-blue-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
                    <p className="text-lg mb-6">
                        Explore our wide range of books and stationery today!
                    </p>
                    <Button className="px-6 py-3">
                        Shop Now
                    </Button>
                </div>
            </section>
        </div>
    );
}
