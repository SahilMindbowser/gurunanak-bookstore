'use client';

import { useEffect, useState } from 'react';
import { GradeProducts } from '@/components/grades/grade-products/grade-products';
import axios from 'axios';

export default function GradeProductsPage({ params }: { params: Promise<{ grade: string }> }) {
    const [grade, setGrade] = useState<string | null>(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            // Unwrap params to get grade
            const { grade } = await params;
            setGrade(grade);

            const schoolId = '67750d9c7ebea80429b4bda4'; // Replace with the actual school ID

            try {
                const response = await axios.get(`/api/school/${schoolId}/grade/${grade}/product`);
                setProducts(response.data.products || []);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [params]);

    return <GradeProducts grade={grade} products={products} loading={loading} />;
}
