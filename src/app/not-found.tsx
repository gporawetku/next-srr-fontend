"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const route = useRouter();

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-500">
      <div className="text-center">
        <div className="text-2xl mb-2">ไม่พบหน้านี้ – 404!</div>
        <div className="flex gap-2">
          <button className="border border-blue-400 rounded-md p-2" onClick={() => route.push("/")}>
            กลับเข้าสู่หน้าหลัก
          </button>
          <button type="button" className="border border-yellow-400 rounded-md p-2" onClick={() => route.back()}>
            กลับหน้าไปยังหน้าล่าสุด
          </button>
        </div>
      </div>
    </div>
  );
}
