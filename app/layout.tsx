import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hire Hub",
    description: "Hire Hub CIT-U Applicant Tracking System",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" data-theme="light">
            <body className={inter.className}>
                <Toaster position="top-center" />
                {children}
            </body>
        </html>
    );
}
