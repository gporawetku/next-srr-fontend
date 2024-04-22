"use client";

import InputFormProject from "@/components/cms/projects/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { useProjectShow } from "@/hooks/queries/useProject";

const ProjectEditPage = (params: any) => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลโครงการ", url: "/projects" }, { label: "แก้ไขข้อมูล" }];

  // --- params
  const id = params.params.id;

  // --- query data
  const project: any = useProjectShow(id);

  return (
    <>
      <Header title="แก้ไขข้อมูลโครงการ" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดโครงการ">
        <IsLoadingSkeleton isLoading={project?.isLoading}>
          <InputFormProject id={id} initialData={project?.data || ""} />
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default ProjectEditPage;
