"use client";

import Footer from "@/components/primary/footer/footer";
import Navbar from "@/components/primary/navbar/navbar";
import { CartProvider } from "@/context/cart-context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { Toaster } from "sonner";

export default function AppLayout({ children }: PropsWithChildren) {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(status, session)

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") return <></>

  return <div className="w-full h-full">
    <CartProvider>
      <Navbar />{children}<Footer /><Toaster /></CartProvider></div>;
}
