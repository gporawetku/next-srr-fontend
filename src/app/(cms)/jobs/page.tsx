"use client";

import { usePathname, useRouter } from "next/navigation";
import { FilterMatchMode } from "primereact/api";
import { Column, ColumnProps } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputSwitch } from "primereact/inputswitch";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import { MySwal, swalErrorOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { usePagination } from "@/hooks/usePagination";
import ActionButton from "@/components/common/ActionButton";
import { useJobs } from "@/hooks/queries/useJob";
import { useDestroyJob, useUpdateJobSpecialCase } from "@/hooks/mutates/useMutateJob";
import { Card, Header } from "@/components/Content";
import FilterHeader from "@/components/FilterHeader";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";

const JobManagePage = () => {
  // --- router
  const router = useRouter();
  const pathname = usePathname();

  // --- breadcrumb
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "หน้าแรก", url: "/" }, { label: "ร่วมงานกับเรา" }];

  // --- pagination
  const {
    data: pagination,
    data: { rows, page },
  }: any = usePagination(10);

  // --- filter
  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e: any) => {
    const value: any = e.target.value;
    let _filters: any = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // --- columns
  const rowIndexBodyTemplate = (rowData: any, options: any) => {
    const rowIndex: any = (options?.rowIndex || 0) + 1 + rows * (page - 1);
    return <div className="text-center">{rowIndex}</div>;
  };

  const displayBodyTemplate = (rowData: any) => {
    let display: any = rowData?.display;
    const jobId: any = rowData?.id;
    return (
      <InputSwitch
        checked={display === "published"}
        onClick={(e) => {
          const newDisplay = display === "published" ? "unpublished" : "published";
          updateDateFunc(jobId, newDisplay);
        }}
      />
    );
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex justify-center items-centrer gap-2">
        <ActionButton
          type="button"
          actionType="edit"
          onClick={() => {
            router.push(pathname + "/edit/" + rowData?.id);
          }}
        />
        <ActionButton
          type="button"
          actionType="delete"
          onClick={() => {
            MySwal.fire({
              ...swlPreConfirmOption,
              title: "ยืนยันที่จะลบข้อมูล",
              preConfirm: (e) => {
                return new Promise(async function (resolve) {
                  if (rowData?.id) {
                    destroyData.mutate(rowData?.id, {
                      onSuccess(data, variables, context) {
                        jobs?.refetch();
                      },
                    });
                  } else {
                    MySwal.fire(swalErrorOption);
                  }
                });
              },
            });
          }}
        />
      </div>
    );
  };

  const columns: ColumnProps[] = [
    { field: "rowIndex", header: "#", body: rowIndexBodyTemplate },
    { field: "position", header: "ตำแหน่งงาน" },
    { field: "location", header: "สถานที่ปฏิบัติงาน" },
    { field: "display", header: "การแสดงผล", body: displayBodyTemplate },
    { field: "action", header: "Action", alignHeader: "center", body: actionBodyTemplate },
  ];

  // --- jobs
  const jobs: any = useJobs({
    params: {
      page: page,
      limit: rows,
    },
  });

  pagination.totalRecords = jobs?.data?.total_item || 0;

  const destroyData = useDestroyJob();

  const footer = `ข้อมูลตำแหน่งงานทั้งหมด : ${jobs ? jobs?.data?.length : 0}`;

  // --- update data
  const updateData = useUpdateJobSpecialCase();

  const updateDateFunc = (jobId: any, newDisplay: string) => {
    try {
      updateData.mutate(
        { id: jobId, display: newDisplay },
        {
          onSuccess(data, variables, context) {
            jobs?.refetch();
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Header title="จัดการตำแหน่งงาน" breadcrumb={breadcrumb}>
        <FilterHeader filter={globalFilterValue} onFilter={onGlobalFilterChange} />
      </Header>
      <Card>
        <IsLoadingSkeleton isLoading={jobs?.isLoading}>
          <DataTable value={jobs?.data || []} className="text-nowrap" globalFilterFields={["index", "position", "location"]} filters={filters} footer={footer}>
            {columns.map((item: any, idx: any) => (
              <Column key={idx} {...item} />
            ))}
          </DataTable>
          <Paginator {...pagination} rowsPerPageOptions={[5, 10, 25, 50]} />
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default JobManagePage;
