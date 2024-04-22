"use client";

import { Column, ColumnProps } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputSwitch } from "primereact/inputswitch";
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { Paginator } from "primereact/paginator";
import { usePathname, useRouter } from "next/navigation";
import { MySwal, swalErrorOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import { usePagination } from "@/hooks/usePagination";
import ActionButton from "@/components/common/ActionButton";
import { ImagesBasic } from "@/components/ImagesBasic";
import { useInterests } from "@/hooks/queries/useInterests";
import { useDestroyInterest, useUpdateInterestSpecialCase } from "@/hooks/mutates/useMutateInterests";
import { Card, Header } from "@/components/Content";
import FilterHeader from "@/components/FilterHeader";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";

const InterestManagePage = () => {
  // --- router
  const router = useRouter();
  const pathname = usePathname();

  // --- breadcrumb
  const breadcrumb = [{ label: "หน้าแรก", url: "/" }, { label: "จัดการอัตราดอกเบี้ย" }];

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
                        interests?.refetch();
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

  const rowIndexBodyTemplate = (rowData: any, options: any) => {
    const rowIndex: any = (options?.rowIndex || 0) + 1 + rows * (page - 1);
    return <div className="text-center">{rowIndex}</div>;
  };

  const displayBodyTemplate = (rowData: any) => {
    let display: any = rowData?.display;
    return (
      <InputSwitch
        checked={display === "published"}
        onClick={(e) => {
          if (display === "published") {
            display = "unpublished";
          } else {
            display = "published";
          }

          const newData: any = {
            ...rowData,
            display: display,
          };
          updateDateFunc(newData);
        }}
      />
    );
  };

  const imageBodyTemplate = (rowData: any) => {
    const images: any = rowData?.images || [];
    return (
      <div className="flex items-center justify-center" style={{ minWidth: "80px" }}>
        <ImagesBasic width={80} height={80} images={images} alt="property" />
      </div>
    );
  };

  const columns: ColumnProps[] = [
    { field: "rowIndex", header: "#", body: rowIndexBodyTemplate },
    { field: "", header: "ภาพ", body: imageBodyTemplate },
    { field: "bank_name", header: "ชื่อธนาคาร" },
    { field: "interest_rate", header: "อัตราดอกเบี้ย (ต่อปี)" },
    { field: "display", header: "การแสดงผล", body: displayBodyTemplate },
    { field: "action", header: "Action", alignHeader: "center", body: actionBodyTemplate },
  ];

  // --- query data
  const interests = useInterests({
    params: {
      page: page,
      limit: rows,
    },
  });
  
  pagination.totalRecords = interests?.data?.total_item || 0;

  const destroyData = useDestroyInterest();

  // --- update data
  const updateData = useUpdateInterestSpecialCase();
  const updateDateFunc = (newData: any) => {
    try {
      updateData.mutate(newData, {
        onSuccess(data, variables, context) {
          interests?.refetch();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title="จัดการอัตราดอกเบี้ย" breadcrumb={breadcrumb}>
        <FilterHeader filter={globalFilterValue} onFilter={onGlobalFilterChange} />
      </Header>

      <Card>
        <IsLoadingSkeleton isLoading={interests?.isLoading}>
          <DataTable value={interests?.data?.data || []} size="normal" className="text-nowrap" globalFilterFields={["bank_name", "interest_rate", "note", "status_project"]} filters={filters}>
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

export default InterestManagePage;
