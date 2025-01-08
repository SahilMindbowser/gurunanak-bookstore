'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Grade {
    name: string;
}

export default function Grades() {
    const [grades, setGrades] = useState<Grade[]>([]);
    const router = useRouter();

    const { status } = useSession();

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await axios.get('/api/school/67750d9c7ebea80429b4bda4/grade'); // Replace with your school ID
                setGrades(response.data);
            } catch (error) {
                console.error('Error fetching grades:', error);
            }
        };

        fetchGrades();
    }, []);

    const handleClassClick = (gradeName: string) => {
        router.push(`/grades/${gradeName}`);
    };

    return (
        <div className="container mx-auto py-12 px-4 min-h-screen">
            <h1 className="text-2xl font-bold mb-8 text-gray-800">
                Explore Grades & Classes
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {grades?.map((grade) => (
                    <div
                        key={grade.name}
                        onClick={() => handleClassClick(grade.name)}
                        className="cursor-pointer group relative bg-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow"
                    >
                        <Image
                            width={1000}
                            height={1000}
                            src="/assets/classes.jpg"
                            alt={`Class ${grade.name}`}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                            <h2 className="text-2xl font-bold text-white">
                                {grade.name}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
