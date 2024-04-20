import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface FilterHeaderProps {
  filter?: any;
  onFilter?: any;
}

const FilterHeader = ({ filter, onFilter }: FilterHeaderProps) => {
  // --- router
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-row items-center justify-center lg:justify-end gap-2 flex-wrap">
      <input
        type="text"
        className="border rounded-md p-2 max-h-[40px]"
        placeholder="Search"
        value={filter}
        onChange={(e: any) => {
          onFilter(e);
        }}
      />

      <button className="rounded-md border p-2 bg-[#EF4036] text-white max-h-[40px]" onClick={() => router.push(pathname + "/create")}>
        <i className="fa-regular fa-plus mr-1"></i>
        เพิ่มข้อมูล
      </button>
    </div>
  );
};

export default FilterHeader;
