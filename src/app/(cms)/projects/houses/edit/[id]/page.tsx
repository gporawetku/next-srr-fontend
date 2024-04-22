"use client";

import InputFormProjectHouseModel from "@/components/cms/projects/houseModels/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { useHouseModelShow } from "@/hooks/queries/useHouseModel";


const ProjectHouseModelEditPage = (params: any) => {
  // --- breadcrumb
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลแบบบ้าน", url: "/projects/houses" }, { label: " แก้ไขข้อมูล" }];

  // --- params
  const id = params.params.id;

  // --- query data
  const houseModel: any = useHouseModelShow(id);

  return (
    <>
      <Header title="แก้ไขข้อมูลแบบบ้าน" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดข้อมูลแบบบ้าน">
        <IsLoadingSkeleton isLoading={houseModel?.isLoading}>
          <InputFormProjectHouseModel id={id} initialData={houseModel?.data || []} />
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default ProjectHouseModelEditPage;
