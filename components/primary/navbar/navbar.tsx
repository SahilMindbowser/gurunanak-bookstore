"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const handleSignOut = () => {
        signOut();
        router.push("/login");
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            Gurunanak Bookstore
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link href="/" className="text-gray-700 hover:text-blue-600">
                            Home
                        </Link>
                        <Link href="/grades" className="text-gray-700 hover:text-blue-600">
                            Grades
                        </Link>
                        <Link href="/about-us" className="text-gray-700 hover:text-blue-600">
                            About
                        </Link>
                        <Link href="/cart" className="relative text-gray-700 hover:text-blue-600">
                            Cart
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                3
                            </span>
                        </Link>
                        {session ? (
                            <Button
                                onClick={handleSignOut}
                                className="text-white hover:text-red-600"
                            >
                                Sign Out
                            </Button>
                        ) : (
                            <Link href="/login" className="text-gray-700 hover:text-blue-600">
                                Login
                            </Link>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-700 hover:text-blue-600"
                        >
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {menuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {menuOpen && (
                <div className="md:hidden bg-gray-50">
                    <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                        Home
                    </Link>
                    <Link href="/grades" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                        Grades
                    </Link>
                    <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                        About
                    </Link>
                    <Link href="/cart" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                        Cart
                        <span className="ml-2 text-sm text-red-500">(3)</span>
                    </Link>
                    {session ? (
                        <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
