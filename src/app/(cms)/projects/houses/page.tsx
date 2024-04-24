"use client";

import { usePathname, useRouter } from "next/navigation";
import { FilterMatchMode } from "primereact/api";
import { Column, ColumnProps } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { useState } from "react";
import { useLocalStorage } from "primereact/hooks";
import { MySwal, swalErrorOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import { usePagination } from "@/hooks/usePagination";
import ActionButton from "@/components/common/ActionButton";
import { ImagesBasic } from "@/components/ImagesBasic";
import { useProjects } from "@/hooks/queries/useProject";
import { useHouseModels } from "@/hooks/queries/useHouseModel";
import { useDestroyHouseModel, useUpdateHouseModelSpecialCase } from "@/hooks/mutates/useMutateHouseModel";
import { Card, Header } from "@/components/Content";
import { IsLoadingSkeleton } from "@/components/IsLoadingSkeleton";
import ProjectHouseModelFilterHeader from "@/components/cms/projects/houseModels/FilterHeader";
import { classNames } from "primereact/utils";

const ProjectHouseManagePage = () => {
  // --- router
  const router = useRouter();
  const pathname = usePathname();

  // --- project id
  const [projectId, setProjectId] = useLocalStorage(null, "projectId");

  // --- breadcrumb
  const breadcrumb = [{ label: "หน้าแรก", url: "/" }, { label: "จัดการข้อมูลแบบบ้าน" }];

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
                        houseModels?.refetch();
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
    { field: "rowIndex", header: "#", sortable: true, body: rowIndexBodyTemplate },
    { field: "", header: "ภาพ", body: imageBodyTemplate },
    { field: "name", header: "ชื่อแบบบ้าน" },
    { field: "projectName", header: "ชื่อโครงการ" },
    { field: "index", header: "ลำดับการแสดงผล", body: indexBodyTemplate },
    { field: "display", header: "การแสดงผล", body: displayBodyTemplate },
    { field: "action", header: "Action", alignHeader: "center", body: actionBodyTemplate },
  ];

  // --- query data
  const projects = useProjects();
  const houseModels: any = useHouseModels(projectId, {});

  // --- destroy data
  const destroyData = useDestroyHouseModel();

  // --- update data
  const updateData = useUpdateHouseModelSpecialCase();

  // --- func
  const updateDateFunc = (newData: any) => {
    try {
      updateData.mutate(newData, {
        onSuccess(data, variables, context) {
          houseModels?.refetch();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title="จัดการข้อมูลแบบบ้าน" breadcrumb={breadcrumb}>
        <ProjectHouseModelFilterHeader filter={globalFilterValue} onFilter={onGlobalFilterChange} projects={projects} projectId={projectId} setProjectId={setProjectId} />
      </Header>

      <Card>
        <IsLoadingSkeleton isLoading={houseModels?.isLoading}>
          <DataTable
            value={houseModels?.data?.house_models || []}
            className="text-nowrap"
            globalFilterFields={["name", "location", "price", "status_project", "type_project", "index"]}
            filters={filters}
            rows={rows}
            paginator
          >
            {columns.map((item: any, idx: any) => (
              <Column key={idx} {...item} />
            ))}
          </DataTable>
        </IsLoadingSkeleton>
      </Card>
    </>
  );
};

export default ProjectHouseManagePage;
