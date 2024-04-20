"use client";

import { Prompt } from "next/font/google";

import "./globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme

// --- fontawesome
import "../../public/fontawesome/css/all.min.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import { LeftSidebar } from "@/Layouts/left-sidebar";
import { Navbar } from "@/Layouts/navbar";

const prompt = Prompt({
  subsets: ["thai"],
  weight: ["400"],
});

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
          <body className={prompt.className}>
            <Navbar />
            <div className="grid grid-cols-12">
              <div className="hidden md:block md:col-span-2 h-screen">
                <LeftSidebar />
              </div>
              <div className="col-span-12 md:col-span-10 bg-[#F7F7F7]">
                <div className="p-10">{children}</div>
              </div>
            </div>
          </body>
        </html>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}
