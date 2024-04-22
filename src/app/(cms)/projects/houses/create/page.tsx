"use client";

import InputFormProjectHouseModel from "@/components/cms/projects/houseModels/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";

const ProjectHouseModelCreatePage = () => {
  // --- breadcrumb
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลแบบบ้าน", url: "/projects/houses" }, { label: "เพิ่มข้อมูล" }];

  return (
    <>
      <Header title="เพิ่มข้อมูลแบบบ้าน" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดข้อมูลแบบบ้าน">
        <InputFormProjectHouseModel />
      </Card>
    </>
  );
};

export default ProjectHouseModelCreatePage;
