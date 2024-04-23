"use client";

import InputFormSEO from "@/components/cms/seo/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";

const GeneralManagePage = () => {
  // --- breadcrumb
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "หน้าแรก", url: "/" }, { label: "จัดการ SEO" }];

  return (
    <>
      <Header title="จัดการ SEO" breadcrumb={breadcrumb} />

      <Card title="รายละเอียด SEO">
        <InputFormSEO />
      </Card>
    </>
  );
};

export default GeneralManagePage;
