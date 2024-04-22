"use client";

import InputFormInterest from "@/components/cms/interest/InputFrom";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { useInterestShow } from "@/hooks/queries/useInterests";

const InterestEditPage = (params: any) => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "จัดการอัตราดอกเบี้ย", url: "/interests" }, { label: "แก้ไขข้อมูล" }];

  // --- params
  const id = params?.params?.id;

  // --- query data
  const interest = useInterestShow(id);

  return (
    <>
      <Header title="แก้ไขข้อมูลอัตราดอกเบี้ย" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดอัตราดอกเบี้ย">
        <IsLoadingSkeleton isLoading={interest?.isLoading}>
          <InputFormInterest id={id} initialData={interest?.data} />
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default InterestEditPage;
