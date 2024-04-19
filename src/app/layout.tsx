"use client";

import { Inter } from "next/font/google";

import "./globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import { LeftSidebar } from "@/components/left-sidebar";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <html lang="en">
          <body className={inter.className}>
            <Navbar />
            <div className="flex w-20 h-screen">
              <LeftSidebar />
              <div className="">{children}</div>
            </div>
          </body>
        </html>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}
