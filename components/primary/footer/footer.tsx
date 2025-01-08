"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-lg font-bold text-white">Gurunanak Bookstore</h2>
                        <p className="mt-2 text-sm">
                            Your one-stop destination for educational resources and books. Explore our collection and find what you need to succeed.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <Link href="/">
                                    <span className="hover:text-blue-500 cursor-pointer">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/grades">
                                    <span className="hover:text-blue-500 cursor-pointer">Grades</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about-us">
                                    <span className="hover:text-blue-500 cursor-pointer">About Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile">
                                    <span className="hover:text-blue-500 cursor-pointer">Profile</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Policies</h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <Link href="/terms-of-service">
                                    <span className="hover:text-blue-500 cursor-pointer">Terms of Service</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy">
                                    <span className="hover:text-blue-500 cursor-pointer">Privacy Policy</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping-policy">
                                    <span className="hover:text-blue-500 cursor-pointer">Shipping Policy</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/return-refund-policy">
                                    <span className="hover:text-blue-500 cursor-pointer">Return & Refund Policy</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Gurunanak Bookstore. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
