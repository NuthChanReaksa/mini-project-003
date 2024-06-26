import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import {Toaster} from "react-hot-toast";
import React from "react";
import {getCurrentUser} from "@/actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSTAD-Ecommerce",
  description: "Create a new ecommerce project with CSTAD.",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {

    const currentUser = await getCurrentUser();

    console.log("user<<<",currentUser);

    return (
        <html lang="en">
        <body className={`${inter.className} text-slate-700`}>
        <Toaster
            toastOptions={{
                style: {
                    background: "rgb(51 65 85)",
                    color: "#fff",
                },
            }}
        />
        <CartProvider>
            <div className={"flex flex-col min-h-screen"}>
                <NavBar/>
                <main className={""}> {/*flex grow*/}
                    {children}
                </main>
                <Footer/>
            </div>
        </CartProvider>
        </body>
        </html>
    );
}
