"use client";

import InputFormSEO from "@/components/cms/seo/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { useSEOShow } from "@/hooks/queries/useSEO";

const GeneralManagePage = () => {
  // --- breadcrumb
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "หน้าแรก", url: "/" }, { label: "จัดการ SEO" }];

  // --- query data
  const id = 1;
  const seo: any = useSEOShow(id);

  return (
    <>
      <Header title="จัดการ SEO" breadcrumb={breadcrumb} />

      <Card title="รายละเอียด SEO">
        <IsLoadingSkeleton isLoading={seo?.isLoading}>
          <InputFormSEO id={id} initialData={seo?.data} />
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default GeneralManagePage;
