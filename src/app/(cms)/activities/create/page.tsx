"use client";

import InputFormActivity from "@/components/cms/activities/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";

const ActivityCreatePage = () => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลกิจกรรมและข่าวสาร", url: "/activities" }, { label: "เพิ่มข้อมูล" }];
  return (
    <>
      <Header title="เพิ่มข้อมูลกิจกรรมและข่าวสาร" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดกิจกรรมและข่าวสาร">
        <InputFormActivity />
      </Card>
    </>
  );
};

export default ActivityCreatePage;
