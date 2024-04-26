"use client";

import ActionButton from "@/components/common/ActionButton";
import { Card, Header } from "@/components/Content";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import FilterHeader from "@/components/FilterHeader";
import { ImagesBasic } from "@/components/ImagesBasic";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { useDestroyPromotion, useUpdatePromotionSpecialCase } from "@/hooks/mutates/useMutatePromotion";
import { usePromotions } from "@/hooks/queries/usePromotion";
import { usePagination } from "@/hooks/usePagination";
import { ConvertDays } from "@/libs/utils/ConvertDay";
import { MySwal, swalErrorOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import { usePathname, useRouter } from "next/navigation";
import { FilterMatchMode } from "primereact/api";
import { Column, ColumnProps } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { Paginator } from "primereact/paginator";
import { classNames } from "primereact/utils";
import { useState } from "react";

const PromotionManagePage = () => {
  // --- router
  const router = useRouter();
  const pathname = usePathname();

  // --- breadcrumb
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "หน้าแรก", url: "/" }, { label: "โปรโมชัน" }];

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
                        promotions?.refetch();
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
        pt={{
          slider: ({ props }: any) => ({
            className: classNames({
              "bg-green-500 before:transform before:translate-x-5": props.checked,
            }),
          }),
        }}
      />
    );
  };

  const imageBodyTemplate = (rowData: any) => {
    const images: any = rowData?.promotion_images || [];
    return (
      <div className="flex items-center justify-center" style={{ minWidth: "80px" }}>
        <ImagesBasic width={80} height={80} images={images} alt="property" />
      </div>
    );
  };

  const columns: ColumnProps[] = [
    { field: "rowIndex", header: "#", body: rowIndexBodyTemplate },
    { field: "", header: "ภาพ", body: imageBodyTemplate },
    { field: "heading", header: "ชื่อโปรโมชัน" },
    { field: "start_date", header: "วันที่เริ่มต้น", body: (rowData: any) => ConvertDays(rowData?.start_date, "dd/mm/yy", true) },
    { field: "end_date", header: "วันที่สิ้นสุด", body: (rowData: any) => ConvertDays(rowData?.end_date, "dd/mm/yy", true) },
    { field: "index", header: "ลำดับการแสดงผล", body: indexBodyTemplate },
    { field: "display", header: "การแสดงผล", body: displayBodyTemplate },
    { field: "action", header: "Action", alignHeader: "center", body: actionBodyTemplate },
  ];

  // --- query data
  const promotions: any = usePromotions({
    params: {
      page: page,
      limit: rows,
    },
  });

  pagination.totalRecords = promotions?.data?.total_item || 0;

  // --- destroy
  const destroyData = useDestroyPromotion();

  // --- update data
  const updateData = useUpdatePromotionSpecialCase();

  const updateDateFunc = (newData: any) => {
    try {
      updateData.mutate(newData, {
        onSuccess(data, variables, context) {
          promotions?.refetch();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title="โปรโมชัน" breadcrumb={breadcrumb}>
        <FilterHeader filter={globalFilterValue} onFilter={onGlobalFilterChange} />
      </Header>

      <Card>
        <IsLoadingSkeleton isLoading={promotions?.isLoading}>
          <DataTable value={promotions?.data?.data || []} className="text-nowrap" globalFilterFields={["heading", "description", "index"]} filters={filters}>
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

export default PromotionManagePage;
