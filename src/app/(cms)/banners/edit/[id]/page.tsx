"use client";

import InputFormBanner from "@/components/cms/banners/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { useBannerShow } from "@/hooks/queries/useBanner";

const BannerEditPage = (params: any) => {
  // --- breadcrumb
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลแบนเนอร์", url: "/banners" }, { label: "แก้ไขข้อมูล" }];

  // --- params
  const id = params.params.id;

  // --- query data
  const banner: any = useBannerShow(id);

  return (
    <>
      <Header title="แก้ไขข้อมูลแบนเนอร์" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดข้อมูลแบนเนอร์">
        <IsLoadingSkeleton isLoading={banner?.isLoading}>
          <InputFormBanner id={id} initialData={banner?.data} />
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default BannerEditPage;
