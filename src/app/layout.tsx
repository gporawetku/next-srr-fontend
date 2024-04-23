"use client";

import { Prompt } from "next/font/google";

import "./globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme

// --- fontawesome
import "../../public/fontawesome/css/all.min.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";

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
          <body className={prompt.className}>{children}</body>
        </html>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}
