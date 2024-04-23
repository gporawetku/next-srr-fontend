"use client";

import InputFormGeneral from "@/components/cms/setting-general/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { useDataSettingShow } from "@/hooks/queries/useDataSetting";

const GeneralManagePage = () => {
  // --- breadcrumb
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "หน้าแรก", url: "/" }, { label: "จัดการข้อมูลเว็บไซต์" }];

  const id = 1;

  // --- query data
  const job: any = useDataSettingShow(id);

  return (
    <>
      <Header title="จัดการข้อมูลเว็บไซต์" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดข้อมูลเว็บไซต์">
        <IsLoadingSkeleton isLoading={job?.isLoading}>
          <InputFormGeneral id={id} initialData={job?.data} />
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default GeneralManagePage;
