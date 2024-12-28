'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

export interface ProductCardProps {
    id: number;
    image: string;
    title: string;
    price: string | number;
    buttonText?: string;
    onButtonClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    image,
    title,
    price,
    buttonText = 'Buy Now',
    onButtonClick,
}) => {
    return (
        <div className="bg-white shadow-md rounded-lg">
            <Image
                width={1000}
                height={1000}
                src={image}
                alt={title}
                className="w-full h-40 object-cover rounded-t-md"
            />
            <div className="p-3 flex flex-col items-start space-y-2">
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="text-gray-600 text-sm">${price}</p>
                <Button variant="secondary" onClick={onButtonClick}>
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};
