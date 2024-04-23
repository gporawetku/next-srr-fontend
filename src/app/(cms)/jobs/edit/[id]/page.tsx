"use client";

import InputFormJobs from "@/components/cms/jobs/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { useJobShow } from "@/hooks/queries/useJob";

const JobUpdatePage = (params: any) => {
  // --- breadcrumb
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลตำแหน่งงาน", url: "/jobs" }, { label: "แก้ไขข้อมูล" }];

  // --- params
  const id = params.params.id;

  // --- query data
  const job: any = useJobShow(id);

  return (
    <>
      <Header title="แก้ไขข้อมูลตำแหน่งงาน" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดข้อมูลตำแหน่งงาน">
        <IsLoadingSkeleton isLoading={job?.isLoading}>
          <InputFormJobs id={id} initialData={job?.data} />
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default JobUpdatePage;
