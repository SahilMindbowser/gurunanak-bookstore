'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Grades() {
    const router = useRouter();

    // List of classes with images
    const classes = Array.from({ length: 15 }, (_, i) => ({
        classNumber: i + 1,
    }));

    // Navigate to class-specific product page
    const handleClassClick = (classNumber: number) => {
        router.push(`/grades/${classNumber}`);
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Explore Grades & Classes
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {classes.map(({ classNumber }) => (
                    <div
                        key={classNumber}
                        onClick={() => handleClassClick(classNumber)}
                        className="cursor-pointer group relative bg-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow"
                    >
                        <Image
                            width={1000}
                            height={1000}
                            src="/assets/classes.jpg"
                            alt={`Class ${classNumber}`}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                            <h2 className="text-2xl font-bold text-white">
                                Class {classNumber}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
