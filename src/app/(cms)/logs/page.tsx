"use client";

import { Card, Header } from "@/components/Content";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { useLogs } from "@/hooks/queries/useLog";
import { usePagination } from "@/hooks/usePagination";
import { ConvertDays } from "@/libs/utils/ConvertDay";
import { Column, ColumnProps } from "primereact/column";
import { DataTable } from "primereact/datatable";

const LogManagePage = () => {
  // --- breadcrumb
  const breadcrumb = [{ label: "หน้าแรก", url: "/" }, { label: "ประวัติการเข้าใช้งาน" }];

  // --- pagination
  const {
    data: pagination,
    data: { rows, page },
  }: any = usePagination(10);

  // --- columns
  const convertDayBodyTemplate = (rowData: any) => {
    let date: any = rowData?.created_at;
    return ConvertDays(date, "dd/mm/yy h:m:s");
  };

  const rowIndexBodyTemplate = (rowData: any, options: any) => {
    const rowIndex: any = (options?.rowIndex || 0) + 1 + rows * (page - 1);
    return <div className="text-center">{rowIndex}</div>;
  };

  const columns: ColumnProps[] = [
    { field: "rowIndex", header: "#", body: rowIndexBodyTemplate, style: { maxWidth: "10px", textAlign: "left" } },
    { field: "user.name", header: "ผู้ใช้งาน", style: { maxWidth: "50px", textAlign: "left" } },
    { field: "details", header: "รายละเอียด", style: { maxWidth: "110px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
    { field: "created_at", header: "วันที่", style: { maxWidth: "70px" }, body: convertDayBodyTemplate },
  ];

  // --- query data
  const logs = useLogs();

  return (
    <>
      <Header title="ประวัติการเข้าใช้งาน" breadcrumb={breadcrumb}></Header>
      <Card>
        <IsLoadingSkeleton isLoading={logs?.isLoading}>
          <DataTable value={logs?.data || []} className="text-nowrap" rows={10} paginator rowsPerPageOptions={[5, 10, 25, 50]}>
            {columns.map((item: any, idx: any) => (
              <Column key={idx} {...item} />
            ))}
          </DataTable>
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default LogManagePage;
