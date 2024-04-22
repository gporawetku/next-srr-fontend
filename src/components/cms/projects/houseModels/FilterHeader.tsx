"use client";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import React from "react";

interface ProjectHouseModelFilterHeaderProps {
  projects?: any;
  projectId?: any;
  setProjectId?: any;
  filter?: any;
  onFilter?: any;
}

const ProjectHouseModelFilterHeader = ({ projects, projectId, setProjectId, filter, onFilter }: ProjectHouseModelFilterHeaderProps) => {
  // --- router
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className="flex flex-row items-center justify-center lg:justify-end gap-2 flex-wrap">
      <Dropdown
        id="searchProject"
        inputId="searchProject"
        value={projectId}
        optionLabel="name"
        optionValue="id"
        options={projects?.data?.data || []}
        onChange={(e: any) => {
          setProjectId(e.value);
        }}
        loading={projects?.isLoading}
        className="max-h-[40px] min-w-[100px]"
        placeholder="เลือกโครงการ"
        filter
      />

      <input
        type="text"
        className="border rounded-md p-2 max-h-[40px]"
        placeholder="Search"
        value={filter}
        onChange={(e: any) => {
          onFilter(e);
        }}
      />

      <button className="rounded-md border p-2 bg-[#EF4036] text-white max-h-[40px]" onClick={() => router.push(pathName + "/create")}>
        <i className="fa-regular fa-plus mr-1"></i>
        เพิ่มข้อมูล
      </button>
    </div>
  );
};

export default ProjectHouseModelFilterHeader;
