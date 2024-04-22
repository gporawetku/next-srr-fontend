"use client";

import InputFormRole from "@/components/cms/roles/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { useUserShow } from "@/hooks/queries/useUser";

const RoleEditPage = (params: any) => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลสิทธิ์ผู้ใช้งาน", url: "/roles" }, { label: "แก้ไขข้อมูล" }];

  // --- params
  const id = params.params.id;

  // --- query data
  const user: any = useUserShow(id);

  return (
    <>
      <Header title="แก้ไขข้อมูลสิทธิ์ผู้ใช้งาน" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดสิทธิ์ผู้ใช้งาน">
        <IsLoadingSkeleton isLoading={user?.isLoading}>
          <InputFormRole id={id} initialData={user?.data || ""} />
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default RoleEditPage;
