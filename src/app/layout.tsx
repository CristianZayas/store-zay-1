import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { AuthProvider } from "@/context/auth-context";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Store Zay - E-commerce Demo",
  description:
    "A modern e-commerce storefront built with Next.js and FakeStore API",
};

export const viewport: Viewport = {
  themeColor: "#1a1614",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: "bg-card text-card-foreground border-border",
              title: "text-card-foreground",
              description: "text-muted-foreground",
              error: "bg-destructive text-destructive-foreground border-destructive",
              success: "bg-primary text-primary-foreground border-primary",
            },
          }}
        />
      </body>
    </html>
  );
}
