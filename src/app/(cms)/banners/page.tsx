"use client";

import { usePathname, useRouter } from "next/navigation";
import { FilterMatchMode } from "primereact/api";
import { Column, ColumnProps } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import { MySwal, swalErrorOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import { BreadcrumbItemProps } from "@/components/contents/Breadcrumb";
import { usePagination } from "@/hooks/usePagination";
import ActionButton from "@/components/common/ActionButton";
import { ImagesBasic } from "@/components/ImagesBasic";
import { useBanners } from "@/hooks/queries/useBanner";
import { useDestroyBanner, useUpdateBannerSpecialCase } from "@/hooks/mutates/useMutateBanner";
import { Card, Header } from "@/components/Content";
import FilterHeader from "@/components/FilterHeader";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import { classNames } from "primereact/utils";

const BannerManagePage = () => {
  // --- router
  const router = useRouter();
  const pathname = usePathname();

  // --- breadcrumb
  const breadcrumb: BreadcrumbItemProps[] = [{ label: "หน้าแรก", url: "/" }, { label: "แบนเนอร์" }];

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
                        banners?.refetch();
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
        style={{ width: "100px !important" }}
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

  const columns: ColumnProps[] = [
    { field: "rowIndex", header: "#", body: rowIndexBodyTemplate },
    { field: "", header: "ภาพ", body: imageBodyTemplate },
    { field: "delay", header: "เวลาในการแสดงผล(วินาที)" },
    { field: "index", header: "ลำดับการแสดงผล", body: indexBodyTemplate },
    { field: "delay", header: "การแสดงผล", body: displayBodyTemplate },
    { field: "action", header: "Action", alignHeader: "center", body: actionBodyTemplate },
  ];

  const banners: any = useBanners({
    params: {
      page: page,
      limit: rows,
    },
  });
  pagination.totalRecords = banners?.data?.total_item || 0;

  const destroyData = useDestroyBanner();

  // --- update data
  const updateData = useUpdateBannerSpecialCase();

  const updateDateFunc = (newData: any) => {
    try {
      updateData.mutate(newData, {
        onSuccess(data, variables, context) {
          banners?.refetch();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title="จัดการแบนเนอร์" breadcrumb={breadcrumb}>
        <FilterHeader filter={globalFilterValue} onFilter={onGlobalFilterChange} />
      </Header>
      <Card>
        <IsLoadingSkeleton isLoading={banners?.isLoading}>
          <DataTable value={banners?.data?.data || []} size="normal" className="text-nowrap" globalFilterFields={["index", "delay"]} filters={filters}>
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

export default BannerManagePage;
