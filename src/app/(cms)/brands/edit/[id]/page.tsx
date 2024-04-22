"use client";

import InputFormBrand from "@/components/cms/brands/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { useBrandShow } from "@/hooks/queries/useBrand";

const EditBrandPage = (params: any) => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลแบรนด์สิรารมย์", url: "/brands" }, { label: "แก้ไขข้อมูล" }];

  // --- params
  const id = params.params.id;

  // --- query data
  const brand: any = useBrandShow(id);

  return (
    <>
      <Header title="แก้ไขข้อมูลแบรนด์สิรารมย์" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดข้อมูลแบรนด์สิรารมย์">
        <IsLoadingSkeleton isLoading={brand?.isLoading}>
          <InputFormBrand id={id} initialData={brand?.data} />
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default EditBrandPage;
