"use client";

import InputFormRole from "@/components/cms/roles/InputForm";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";

const RoleCreatePage = () => {
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "ข้อมูลสิทธิ์ผู้ใช้งาน", url: "/roles" }, { label: "เพิ่มข้อมูล" }];

  return (
    <>
      <Header title="เพิ่มข้อมูลสิทธิ์ผู้ใช้งาน" breadcrumb={breadcrumb} />

      <Card title="รายละเอียดสิทธิ์ผู้ใช้งาน">
        <InputFormRole />
      </Card>
    </>
  );
};

export default RoleCreatePage;
