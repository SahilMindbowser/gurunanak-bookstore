'use client';

import React, { useEffect, useState } from 'react';
import GradeProductDetails from '@/components/grades/grade-product-details/grade-product-details';

export default function GradeProductDetailsPage({ params }: { params: Promise<{ grade: string; productId: string }> }) {
    const [unwrappedParams, setUnwrappedParams] = useState<{ grade: string; productId: string } | null>(null);

    useEffect(() => {
        // Unwrap the params Promise
        params.then((result) => {
            setUnwrappedParams(result);
        });
    }, [params]);

    if (!unwrappedParams) {
        return <div>Loading...</div>;
    }

    return (
        <GradeProductDetails params={unwrappedParams} />
    );
}
