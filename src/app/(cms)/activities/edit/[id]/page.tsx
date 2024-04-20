"use client";
import InputFormActivity from "@/components/cms/activities/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { useActivitieShow } from "@/hooks/queries/useActivity";

const ActivityUpdatePage = (params: any) => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลกิจกรรมและข่าวสาร", url: "/activities" }, { label: "แก้ไขข้อมูล" }];

  // --- params
  const id = params.params.id;

  // --- query data
  const activitie: any = useActivitieShow(id);

  return (
    <>
      <Header title="แก้ไขข้อมูลกิจกรรมและข่าวสาร" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดกิจกรรมและข่าวสาร">
        <IsLoadingSkeleton isLoading={activitie?.isLoading}>
          <InputFormActivity id={id} initialData={activitie?.data || ""} />
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default ActivityUpdatePage;
