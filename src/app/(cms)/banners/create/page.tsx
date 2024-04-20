"use client";

import InputFormBanner from "@/components/cms/banners/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";

const CreateBannerPage = () => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลแบนเนอร์", url: "/banners" }, { label: "เพิ่มข้อมูล" }];
  return (
    <>
      <Header title="เพิ่มข้อมูลแบนเนอร์" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดข้อมูลแบนเนอร์">
        <InputFormBanner />
      </Card>
    </>
  );
};

export default CreateBannerPage;
