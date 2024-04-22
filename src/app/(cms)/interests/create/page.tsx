"use client";

import InputFormInterest from "@/components/cms/interest/InputFrom";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";

const InterestCreatePage = () => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "จัดการอัตราดอกเบี้ย", url: "/interests" }, { label: "เพิ่มข้อมูล" }];

  return (
    <>
      <Header title="เพิ่มข้อมูลอัตราดอกเบี้ย" breadcrumb={breadcrumb} />
      <Card title="รายละเอียดอัตราดอกเบี้ย">
        <InputFormInterest />
      </Card>
    </>
  );
};

export default InterestCreatePage;
