"use client";

import { Card, Header } from "@/components/Content";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputSwitch } from "primereact/inputswitch";
import { usePathname, useRouter } from "next/navigation";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { InputNumber } from "primereact/inputnumber";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { usePagination } from "@/hooks/usePagination";
import { ImagesBasic } from "@/components/ImagesBasic";
import { ConvertDays } from "@/libs/utils/ConvertDay";
import ActionButton from "@/components/common/ActionButton";
import { MySwal, swalErrorOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import { useActivities } from "@/hooks/queries/useActivity";
import { useDestroyActivitie, useUpdateActivitieSpecialCase } from "@/hooks/mutates/useMutateActivity";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import FilterHeader from "@/components/FilterHeader";

const ActivityManagePage = () => {
  // --- router
  const router = useRouter();
  const pathname = usePathname();

  // --- breadcrumb
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "หน้าแรก", url: "/" }, { label: "กิจกรรมและข่าวสาร" }];

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

  // --- column
  const rowIndexBodyTemplate = (rowData: any, options: any) => {
    const rowIndex: any = (options?.rowIndex || 0) + 1 + rows * (page - 1);
    return <div className="text-center">{rowIndex}</div>;
  };

  const imageBodyTemplate = (rowData: any) => {
    const images: any = rowData?.images || [];
    return (
      <div className="flex items-center justify-center" style={{ minWidth: "80px" }}>
        <ImagesBasic width={80} height={80} images={images} alt="property" />
      </div>
    );
  };

  const indexBodyTemplate = (rowData: any) => {
    return (
      <InputNumber
        value={rowData.index}
        min={1}
        onBlur={(e: any) => {
          const value = e.target.value || 1;
          if (value != rowData.index) {
            const newData: any = {
              ...rowData,
              index: Number(value),
            };
            updateDateFunc(newData);
          }
        }}
      />
    );
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

  const startDateBodyTemplate = (rowData: any) => {
    return ConvertDays(rowData?.start_date || "");
  };

  const endDateBodyTemplate = (rowData: any) => {
    return ConvertDays(rowData?.end_date || "");
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
                        activities?.refetch();
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

  const columns = [
    { field: "rowIndex", header: "#", filter: false, sortable: true, body: rowIndexBodyTemplate },
    { field: "", header: "ภาพ", filter: false, sortable: true, body: imageBodyTemplate },
    { field: "heading", header: "ชื่อหัวข้อกิจกรรม", filter: false, sortable: true },
    { field: "start_date", header: "วันที่เริ่มต้น", filter: false, sortable: true, body: startDateBodyTemplate },
    { field: "end_date", header: "วันที่สิ้นสุด", filter: false, sortable: true, body: endDateBodyTemplate },
    { field: "index", header: "ลำดับการแสดงผล", filter: false, sortable: true, body: indexBodyTemplate },
    { field: "display", header: "การแสดงผล", filter: false, sortable: true, body: displayBodyTemplate },
    { field: "action", header: "Action", filter: false, sortable: true, body: actionBodyTemplate },
  ];

  // --- query data
  const activities = useActivities({
    params: {
      page: page,
      limit: rows,
    },
  });

  const destroyData = useDestroyActivitie();
  pagination.totalRecords = activities?.data?.total_item || 0;

  // --- update data
  const updateData = useUpdateActivitieSpecialCase();

  const updateDateFunc = (newData: any) => {
    try {
      updateData.mutate(newData, {
        onSuccess(data, variables, context) {
          activities?.refetch();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title="กิจกรรมและข่าวสาร" breadcrumb={breadcrumb}>
        <FilterHeader filter={globalFilterValue} onFilter={onGlobalFilterChange} />
      </Header>

      <Card>
        <IsLoadingSkeleton isLoading={activities?.isLoading}>
          <DataTable value={activities?.data?.data || []} size="normal" className="text-nowrap" globalFilterFields={["heading", "description", "start_date", "end_date", "index"]} filters={filters}>
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

export default ActivityManagePage;
