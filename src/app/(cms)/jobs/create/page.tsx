"use client";

import InputFormJobs from "@/components/cms/jobs/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";

const JobCreatePage = () => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลตำแหน่งงาน", url: "/jobs" }, { label: "เพิ่มข้อมูล" }];

  return (
    <>
      <Header title="เพิ่มข้อมูลตำแหน่งงาน" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดข้อมูลตำแหน่งงาน">
        <InputFormJobs />
      </Card>
    </>
  );
};

export default JobCreatePage;
