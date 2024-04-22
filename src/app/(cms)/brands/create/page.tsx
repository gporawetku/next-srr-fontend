"use client";

import InputFormBrand from "@/components/cms/brands/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";

const CreateBrandPage = () => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลแบรนด์สิรารมย์", url: "/brands" }, { label: "เพิ่มข้อมูล" }];

  return (
    <>
      <Header title="เพิ่มข้อมูลแบรนด์สิรารมย์" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดข้อมูลแบรนด์สิรารมย์">
        <InputFormBrand />
      </Card>
    </>
  );
};

export default CreateBrandPage;
