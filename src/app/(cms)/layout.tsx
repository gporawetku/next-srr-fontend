"use client";

import { LeftSidebar } from "@/Layouts/left-sidebar";
import { Navbar } from "@/Layouts/navbar";
import { CustomProviders } from "./provider";
import { Footer } from "@/Layouts/footer";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <CustomProviders>
      <main className="bg-[#F7F7F7]">
        <Navbar />
        <div className="grid grid-cols-12 h-screen">
          <div className="hidden md:block md:col-span-2  sticky top-0 z-[999]">
            <LeftSidebar />
          </div>
          <div className="col-span-12 md:col-span-10 relative bg-[#F7F7F7]">
            <div className="p-2 md:p-10 mb-[100px]">{children}</div>
            <Footer />
          </div>
        </div>
      </main>
    </CustomProviders>
  );
}
