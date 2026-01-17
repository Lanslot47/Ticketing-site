import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Nav";
import AuthGuard from "./component/authGuard";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CineTicket",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <html lang="en">

            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <div className="flex flex-col md:flex-row overflow-x-hidden bg-black">
                    <AuthGuard>
                        <Sidebar />
                        <div className="flex-1 md:ml-64">
                            <Navbar />
                            <main className="p-4 md:p-6">{children}</main>
                        </div>
                    </AuthGuard>
                </div>
            </body>
        </html>
    );
}
