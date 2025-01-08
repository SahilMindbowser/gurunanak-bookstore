import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers/auth-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gurunanak Bookstore",
  description: "Bookstore for schools",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
