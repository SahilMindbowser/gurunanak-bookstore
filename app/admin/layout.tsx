"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/primary/navbar/navbar";
import Footer from "@/components/primary/footer/footer";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/cart-context";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && session?.user.role !== "admin") {
            router.replace("/admin/not-found");
        } else if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, session, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (status === "authenticated" && session?.user.role === "admin") {
        return (
            <div className="w-full h-full">
                <CartProvider>
                    <Navbar />{children}<Footer />
                    <Toaster />
                </CartProvider>
            </div>
        );
    }

    return null;
}
