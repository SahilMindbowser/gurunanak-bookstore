'use client';

import { useEffect, useState } from 'react';
import { GradeProducts } from '@/components/grades/grade-products/grade-products';

const sampleData: any = {
    1: [
        { id: 1, title: 'Math Workbook - Grade 1', price: 150, image: '/assets/classes.jpg' },
        { id: 2, title: 'Science Kit - Grade 1', price: 300, image: '/assets/classes.jpg' },
        { id: 3, title: 'Drawing Book - Grade 1', price: 100, image: '/assets/classes.jpg' },
        { id: 4, title: 'Pencils Set', price: 50, image: '/assets/classes.jpg' },
    ],
    2: [
        { id: 1, title: 'Math Workbook - Grade 2', price: 160, image: '/assets/classes.jpg' },
        { id: 2, title: 'Science Kit - Grade 2', price: 320, image: '/assets/classes.jpg' },
        { id: 3, title: 'Drawing Book - Grade 2', price: 120, image: '/assets/classes.jpg' },
        { id: 4, title: 'Geometry Set', price: 200, image: '/assets/classes.jpg' },
    ],
};

export default function GradeProductsPage({ params }: { params: Promise<{ grade: string }> }) {
    const [grade, setGrade] = useState<string | null>(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        params.then((unwrappedParams) => {
            const id = unwrappedParams.grade;
            setGrade(id);
            setProducts(sampleData[id] || []);
            setLoading(false);
        });
    }, [params]);

    return <GradeProducts grade={grade} products={products} loading={loading} />;
}
