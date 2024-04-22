"use client";

import { useRouter } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { MySwal, swalErrorOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import { useProjects } from "@/hooks/queries/useProject";
import projectConsts from "@/data/projectConsts";
import { useStoreHouseModel, useUpdateHouseModel } from "@/hooks/mutates/useMutateHouseModel";
import { InputField } from "@/components/Content";
import { FilesUpload, PhotoFieldArrayUpload } from "@/components/FilesUpload";
import { Button } from "primereact/button";

interface InputFormProjectHouseModelProps {
  id?: any;
  initialData?: any | null;
}

const InputFormProjectHouseModel = ({ id, initialData }: InputFormProjectHouseModelProps) => {
  // --- router
  const router = useRouter();

  // --- initialData
  const { house_images, ...otherData }: any = initialData || {};

  // --- state
  const [oldFiles, setOldFiles] = useState(house_images?.length > 0 ? house_images || [] : []);
  const [files, setFiles] = useState(house_images?.length > 0 ? house_images || [] : []);
  const [fileRemove, setFileRemove] = useState([]);

  // --- useForm
  const housePlan = {
    floor: 1,
    size: null,
    plan_images: [],
    plan_items: [
      {
        room_type: null,
        amount: null,
      },
    ],
  };

  const defaultFormData: any = {
    index: otherData?.index || 1,
    projectId: otherData?.project_id || "",
    name: otherData?.name || "",
    description: otherData?.Description || "",
    linkVideo: otherData?.link_video || "",
    linkVirtualTour: otherData?.link_virtual_tour || "",
    display: otherData?.display || "published",
    typeItems: otherData?.type_items || [
      {
        room_type: null,
        amount: null,
      },
    ],
    housePlan: otherData?.house_plan || [housePlan],
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    defaultValues: defaultFormData,
  });

  const {
    fields: typeItemsFields,
    append: typeItemsAppend,
    prepend: typeItemsPrepend,
    remove: typeItemsRemove,
  } = useFieldArray({
    control,
    name: "typeItems",
  });

  const {
    fields: housePlanFields,
    append: housePlanAppend,
    prepend: housePlanPrepend,
    remove: housePlanRemove,
    update: housePlanUpdate,
  }: any = useFieldArray({
    control,
    name: "housePlan",
  });

  const onSubmit = (data: any) => {
    const typeItems = data?.typeItems?.map((val: any) => {
      return {
        room_type: val?.room_type || "",
        amount: val?.amount || 0,
      };
    });

    const housePlans = data?.housePlan?.map((val: any) => {
      return {
        floor: val?.floor || 1,
        size: val?.size || "",
        plan_images: val?.plan_images || "",
        plan_items: val?.plan_items?.map((item: any) => {
          return {
            room_type: item?.room_type || "",
            amount: item?.amount || 0,
          };
        }),
      };
    });

    if (files?.length < 1) {
      MySwal.fire({ ...swalErrorOption, title: "กรุณาเลือกรูป" });
      return;
    }

    const newData = {
      project_id: data?.projectId || "",
      name: data?.name || "",
      Description: data?.description || "",
      link_video: data?.linkVideo || "",
      link_virtual_tour: data?.linkVirtualTour || "",
      display: data?.display || "published",
      index: data?.index || 1,
      house_images: files || [],
      type_items: typeItems || [],
      house_plan: housePlans || [],
    };

    MySwal.fire({
      ...swlPreConfirmOption,
      title: "ยืนยันที่จะบันทึกข้อมูล",
      preConfirm: (e) => {
        return new Promise(async function (resolve) {
          if (newData && Object.keys(newData).length !== 0) {
            if (id) {
              console.log("edit");
              updateData.mutate(newData, {
                onSuccess(data, variables, context) {
                  router.push("/admin/projects/house");
                },
              });
            } else {
              console.log("create");
              createData.mutate(newData, {
                onSuccess(data, variables, context) {
                  router.push("/admin/projects/house");
                },
              });
            }
          } else {
            MySwal.fire(swalErrorOption);
          }
        });
      },
    });
  };

  // --- option data
  const projects = useProjects();
  const roomTypes = projectConsts?.roomTypes || [];

  // --- func
  const updataImageHousePlan = (index: any, image?: any) => {
    try {
      housePlanUpdate(index, {
        ...housePlanFields[index],
        plan_images: image || [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  // --- mutate
  const createData = useStoreHouseModel();
  const updateData = useUpdateHouseModel(id);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <Controller
              control={control}
              name="name"
              rules={{ required: "กรุณากรอกชื่อแบบบ้าน" }}
              render={({ field, fieldState }) => (
                <>
                  <InputField labelName="ชื่อแบบบ้าน" name={field.name} required errors={errors}>
                    <InputText id={field.name} value={field.value} onChange={(e: any) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                  </InputField>
                </>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Controller
              control={control}
              name="projectId"
              rules={{ required: "กรุณาเลือกโครงการ" }}
              render={({ field, fieldState }) => (
                <>
                  <InputField labelName="ชื่อโครงการ" name={field.name} required errors={errors}>
                    <Dropdown
                      id={field.name}
                      inputId={field.name}
                      value={field.value}
                      optionLabel="name"
                      optionValue="id"
                      options={projects?.data?.data || []}
                      onChange={(e: any) => field.onChange(e.value)}
                      loading={projects?.isLoading}
                      className={classNames("w-full", { "p-invalid": fieldState.error })}
                    />
                  </InputField>
                </>
              )}
            />
          </div>
          <div className="col-span-12">
            <h4>
              ภาพประกอบโครงการ <span className="text-red-500">*</span>
            </h4>
            <FilesUpload oldFiles={oldFiles} setData={setFiles} setRemove={setFileRemove} destination="house_models" limitSize={10} limitPixel="1170x650" />
          </div>
          <div className="col-span-12">
            <table className="mt-4" style={{ width: "100%" }}>
              <thead className="text-start">
                <tr>
                  <th style={{ width: "60%", textAlign: "start" }}>ประเภทห้อง</th>
                  <th style={{ width: "30%", textAlign: "start" }}>จำนวนห้อง</th>
                  <th style={{ width: "10%" }}></th>
                </tr>
              </thead>
              <tbody>
                {typeItemsFields?.map((item: any, i: number) => (
                  <tr key={item.id}>
                    <td>
                      <Controller
                        control={control}
                        name={`typeItems.${i}.room_type`}
                        rules={{ required: "กรุณาเลือกประเภทห้อง" }}
                        render={({ field, fieldState }) => (
                          <>
                            <Dropdown
                              id={field.name}
                              inputId={field.name}
                              value={field.value}
                              optionLabel="name"
                              optionValue="name"
                              options={roomTypes}
                              onChange={(e: any) => field.onChange(e.value)}
                              className={classNames("w-full", { "p-invalid": fieldState.error })}
                            />
                          </>
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name={`typeItems.${i}.amount`}
                        rules={{ required: "กรุณาเลือกจำนวน" }}
                        render={({ field, fieldState }) => (
                          <InputNumber id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                        )}
                      />
                    </td>
                    <td>
                      <div className="flex justify-center items-center">
                        {i == 0 ? (
                          <Button
                            type="button"
                            severity="info"
                            onClick={() => {
                              if (typeItemsFields?.length < 10) {
                                typeItemsAppend({
                                  room_type: null,
                                  amount: null,
                                });
                              }
                            }}
                          >
                            <i className="fa-regular fa-circle-plus"></i>
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            severity="danger"
                            onClick={() => {
                              typeItemsRemove(item.id);
                            }}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-span-12">
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <InputField labelName={"ข้อมูลแบบบ้านเบื้องต้น"} name={field.name} errors={errors}>
                  <InputTextarea id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Controller
              control={control}
              name="linkVideo"
              render={({ field, fieldState }) => (
                <InputField labelName={"วิดีโอประกอบโครงการ"} name={field.name} errors={errors}>
                  <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Controller
              control={control}
              name="linkVirtualTour"
              render={({ field, fieldState }) => (
                <InputField labelName={"360 Virtual Tour"} name={field.name} errors={errors}>
                  <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>
          <div className="col-span-12">
            <div className="text-end">
              <Button
                type="button"
                severity="info"
                onClick={() => {
                  const totalLength: any = housePlanFields?.length || 0;
                  if (totalLength < 2) {
                    housePlanAppend({ ...housePlan, floor: totalLength + 1 });
                  }
                }}
              >
                <i className="fa-regular fa-circle-plus me-1"></i>
                <span>เพิ่มแบบแปลน</span>
              </Button>
            </div>
            {housePlanFields?.map((item: any, i: number) => (
              <div className="grid grid-cols-12 gap-2" key={item.id}>
                <div className="col-span-12">
                  <h5>แบบแปลนบ้านชั้น {i + 1}</h5>
                </div>
                <div className="col-span-12">
                  <PhotoFieldArrayUpload index={i} list={housePlanFields[i]?.plan_images} destination={"house_model_plans"} update={updataImageHousePlan} limitSize={10} limitPixel="736x544" />
                </div>
                <div className="col-span-12">
                  <Controller
                    control={control}
                    name={`housePlan.${i}.size`}
                    render={({ field, fieldState }) => (
                      <InputField name={field.name} labelName={"ขนาดห้อง (ตารางเมตร)"}>
                        <InputText id={field.name} value={field.value} onChange={(e: any) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                      </InputField>
                    )}
                  />
                </div>
                <div className="col-span-12">
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th style={{ width: "60%", textAlign: "start" }}>ประเภทห้อง</th>
                        <th style={{ width: "30%", textAlign: "start" }}>จำนวนห้อง/คัน</th>
                        <th style={{ width: "10%" }}>
                          {item?.plan_items?.length == 0 && (
                            <Button
                              type="button"
                              severity="info"
                              onClick={() => {
                                housePlanUpdate(i, {
                                  ...housePlanFields[i],
                                  plan_items: [...housePlanFields[i].plan_items, { room_type: null, amount: null }],
                                });
                              }}
                            >
                              <i className="fa-regular fa-circle-plus"></i>
                            </Button>
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {item?.plan_items?.map((val: any, index: number) => (
                        <tr key={val?.id}>
                          <td>
                            <Controller
                              control={control}
                              name={`housePlan.${i}.plan_items.${index}.room_type`}
                              render={({ field, fieldState }) => (
                                <Dropdown
                                  id={field.name}
                                  inputId={field.name}
                                  value={field.value}
                                  optionLabel="name"
                                  optionValue="name"
                                  options={roomTypes}
                                  onChange={(e: any) => field.onChange(e.value)}
                                  className={classNames("w-full", { "p-invalid": fieldState.error })}
                                />
                              )}
                            />
                          </td>
                          <td>
                            <Controller
                              control={control}
                              name={`housePlan.${i}.plan_items.${index}.amount`}
                              render={({ field, fieldState }) => (
                                <InputNumber id={field.name} value={field.value} onChange={(e: any) => field.onChange(e.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                              )}
                            />
                          </td>
                          <td>
                            <div className="flex justify-center items-center">
                              {index == 0 ? (
                                <Button
                                  type="button"
                                  severity="info"
                                  onClick={() => {
                                    const total = item?.plan_items?.length || 0;
                                    if (total < 5) {
                                      housePlanUpdate(i, {
                                        ...housePlanFields[i],
                                        plan_items: [...housePlanFields[i].plan_items, { room_type: null, amount: null }],
                                      });
                                    }
                                  }}
                                >
                                  <i className="fa-regular fa-circle-plus"></i>
                                </Button>
                              ) : (
                                <Button
                                  type="button"
                                  severity="danger"
                                  onClick={() => {
                                    housePlanUpdate(i, {
                                      ...housePlanFields[i],
                                      plan_items: [...housePlanFields[i].plan_items?.filter((plan: any, key: number) => key !== index)],
                                    });
                                  }}
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-12 flex justify-end">
            <div className="flex gap-2">
              <Button
                className="w-60"
                type="button"
                severity="secondary"
                label="ยกเลิก"
                onClick={() => {
                  router.back();
                }}
              />
              <Button className="w-60" type="submit" severity="success" label="บันทึก" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default InputFormProjectHouseModel;
