"use client";

import InputFormPromotion from "@/components/cms/promotions/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { usePromotionShow } from "@/hooks/queries/usePromotion";

const PromotionEditPage = (params: any) => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "โปรโมชัน", url: "/promotions" }, { label: "แก้ไขข้อมูล" }];

  // --- params
  const id = params.params.id;

  // --- query data
  const promotion: any = usePromotionShow(id);

  return (
    <>
      <Header title="แก้ข้อมูลโปรโมชัน" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดโปรโมชัน">
        <IsLoadingSkeleton isLoading={promotion?.isLoading}>
          <InputFormPromotion id={id} initialData={promotion?.data || ""} />
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default PromotionEditPage;
