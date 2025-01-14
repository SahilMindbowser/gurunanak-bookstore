'use client';

import React from 'react';
import { ProductCard, ProductCardProps } from '@/components/primary/product-card/product-card';
import { useRouter } from 'next/navigation';

interface GradeProductsProps {
    grade: string | null;
    products: ProductCardProps[];
    loading?: boolean;
}

export const GradeProducts: React.FC<GradeProductsProps> = ({ grade, products, loading = false }) => {

    const router = useRouter()

    if (loading || !grade) {
        return (
            <div className="flex justify-center items-center p-8 min-h-screen">
                <h1 className="">Loading...</h1>
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className="text-center p-8 min-h-screen">
                <h1 className="text-2xl font-bold">No Products Found</h1>
                <p>Currently, no products are available for this class.</p>
            </div>
        );
    }

    return (
        <div className="p-6 py-12 container mx-auto min-h-screen">
            <h1 className="text-2xl font-bold mb-8 text-center">Products for {grade}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        id={product.id}
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                        onButtonClick={() => { router.push(`/grades/${grade}/product-details/${product.id}`) }}
                    />
                ))}
            </div>
        </div>
    );
};
