"use client";

import { usePathname, useRouter } from "next/navigation";
import { FilterMatchMode } from "primereact/api";
import { Column, ColumnProps } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { Paginator } from "primereact/paginator";
import { Tag } from "primereact/tag";
import { useState } from "react";
import { MySwal, swalErrorOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import projectConsts from "@/data/projectConsts";
import { usePagination } from "@/hooks/usePagination";
import ActionButton from "@/components/common/ActionButton";
import { ImagesBasic } from "@/components/ImagesBasic";
import { FormatDecimal } from "@/libs/utils/FormatNumber";
import { useProjects } from "@/hooks/queries/useProject";
import { useDestroyProject, useUpdateProjectSpecialCase } from "@/hooks/mutates/useMutateProject";
import { Card, Header } from "@/components/Content";
import FilterHeader from "@/components/FilterHeader";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";

const ProjectManagePage = () => {
  // --- router
  const router = useRouter();
  const pathname = usePathname();

  // --- breadcrumb
  const breadcrumb = [{ label: "หน้าแรก", url: "/" }, { label: "จัดการข้อมูลโครงการ" }];

  // --- project const
  const status: any[] = projectConsts?.status || [];
  const types: any[] = projectConsts?.types || [];

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
        <button
          type="button"
          className="bg-[#81B441] text-white p-2 rounded-md hover:bg-[#77a33c]"
          onClick={() => {
            router.push(pathname + "/houses");
          }}
        >
          <i className="fa-thin fa-folder-plus mr-1 fw-bold"></i>
          <span>แบบบ้าน</span>
        </button>
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
                        projects?.refetch();
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

  const statusProjectBodyTemplate = (rowData: any) => {
    const status_project = rowData?.status_project || "";
    let result = status?.find((item: any) => item?.value === status_project)?.name || "";
    if (status_project == "ready") {
      return <Tag value={result} severity={"success"}></Tag>;
    } else if (status_project == "new") {
      return <Tag value={result} severity={"info"}></Tag>;
    } else {
      return result;
    }
  };

  const typeProjectBodyTemplate = (rowData: any) => {
    const type_project = rowData?.type_project || "";
    let result = types?.find((item: any) => item?.value === type_project)?.name || "";
    return result;
  };

  const houseTypeItemBodyTemplate = (rowData: any) => {
    const house_type_items = rowData?.house_type_items || "";
    let result = house_type_items?.map((val: any) => val?.name)?.join(", ");
    return result;
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

  const imageBodyTemplate = (rowData: any) => {
    const images: any = rowData?.images || [];
    return (
      <div className="flex items-center justify-center" style={{ minWidth: "80px" }}>
        <ImagesBasic width={80} height={80} images={images} alt="property" />
      </div>
    );
  };

  const MoneyBodyTemplate = (rowData: any, option: any) => {
    const value: any = rowData?.price || 0;
    const result: any = FormatDecimal(value, 2);
    return result || 0;
  };

  const columns: ColumnProps[] = [
    { field: "rowIndex", header: "#", sortable: true, body: rowIndexBodyTemplate },
    { field: "", header: "ภาพ", sortable: true, body: imageBodyTemplate },
    { field: "name", header: "ชื่อโครงการ", sortable: true },
    { field: "location", header: "ตำแหน่งที่ตั้ง", sortable: true },
    { field: "price", header: "ราคาเริ่มต้น", sortable: true, body: MoneyBodyTemplate },
    { field: "status_project", header: "สถานะโครงการ", sortable: true, body: statusProjectBodyTemplate },
    { field: "type_project", header: "ประเภทครงการ", sortable: true, body: typeProjectBodyTemplate },
    { field: "house_type_items", header: "ประเภทบ้าน", sortable: true, body: houseTypeItemBodyTemplate },
    { field: "index", header: "ลำดับการแสดงผล", sortable: true, body: indexBodyTemplate },
    { field: "display", header: "การแสดงผล", sortable: true, body: displayBodyTemplate },
    { field: "action", header: "Action", alignHeader: "center", body: actionBodyTemplate },
  ];

  // --- query data
  const projects: any = useProjects({
    params: {
      page: page,
      limit: rows,
    },
  });

  const destroyData = useDestroyProject();
  pagination.totalRecords = projects?.data?.total_item || 0;

  // --- update data
  const updateData = useUpdateProjectSpecialCase();

  const updateDateFunc = (newData: any) => {
    try {
      updateData.mutate(newData, {
        onSuccess(data, variables, context) {
          projects?.refetch();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title="จัดการข้อมูลโครงการ" breadcrumb={breadcrumb}>
        <FilterHeader filter={globalFilterValue} onFilter={onGlobalFilterChange} />
      </Header>

      <Card>
        <IsLoadingSkeleton isLoading={projects?.isLoading}>
          <DataTable value={projects?.data?.data || []} className="text-nowrap" globalFilterFields={["name", "location", "price", "status_project", "type_project", "index"]} filters={filters}>
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

export default ProjectManagePage;
