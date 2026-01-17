/** @format */
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { AppProvider } from "@/data/AppContext";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | MediCare",
    default: "MediCare – Healthcare Appointment & Management Platform",
  },
  description:
    "Book appointments with top specialists and manage your health efficiently.",
  keywords: [
    "Healthcare Platform",
    "Doctor Appointment Booking",
    "Medical Clinic Management",
    "Online Healthcare App",
    "Patient Management System",
  ],
  metadataBase: new URL("https://medicare-platform.vercel.app"),
  icons: { icon: "/icons/favicon.ico" },
};


export const viewport: Viewport = {
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: { unsafe_disableDevelopmentModeWarnings: true },
        variables: { colorPrimary: "#10b981" },
      }}
    >
      {/* ضيفنا data-scroll-behavior هنا عشان الـ Warning اللي ظهرلك قبل كدة */}
      <html lang="en" data-scroll-behavior="smooth">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col selection:bg-emerald-100 selection:text-emerald-900`}
        >
          <AppProvider>
            {/* الـ Navbar والـ Footer بقوا جوه الـ Provider عشان يقدروا يقرأوا أي Global State */}
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}