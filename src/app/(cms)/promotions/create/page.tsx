"use client";

import InputFormPromotion from "@/components/cms/promotions/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";

const PromotionCreatePage = () => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "โปรโมชัน", url: "/promotions" }, { label: "เพิ่มข้อมูล" }];
  return (
    <>
      <Header title="เพิ่มข้อมูลโปรโมชัน" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดโปรโมชัน">
        <InputFormPromotion />
      </Card>
    </>
  );
};

export default PromotionCreatePage;
