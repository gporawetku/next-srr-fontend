"use client";

import InputFormProject from "@/components/cms/projects/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";

const ProjectCreatePage = () => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลโครงการ", url: "/projects" }, { label: "เพิ่มข้อมูล" }];
  return (
    <>
      <Header title="เพิ่มข้อมูลโครงการ" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดโครงการ">
        <InputFormProject />
      </Card>
    </>
  );
};

export default ProjectCreatePage;
