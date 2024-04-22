"use client";
import { Calendar } from "primereact/calendar";
import { useState } from "react";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import { useRouter } from "next/navigation";
import { MultiSelect } from "primereact/multiselect";
import { MySwal, swlPreConfirmOption, swalErrorOption } from "@/libs/utils/Swal2Config";
import { ConvertDays } from "@/libs/utils/ConvertDay";
import { useHouseModelOptions } from "@/hooks/queries/useHouseModel";
import { useStorePromotion, useUpdatePromotion } from "@/hooks/mutates/useMutatePromotion";
import { InputField } from "@/components/Content";
import { PhotoUpload } from "@/components/FilesUpload";
import { IsLoadingDropdow } from "@/components/IsLoadingSkeleton";

interface InputFormPromotionProps {
  id?: any;
  initialData?: any | null;
}

const InputFormPromotion = ({ id, initialData }: InputFormPromotionProps) => {
  // --- router
  const router = useRouter();

  // --- initialData
  const { promotion_images, ...otherData }: any = initialData || {};

  // --- state
  const [imageS, setImageS] = useState(promotion_images?.length == 2 ? promotion_images[0] : []);
  const [imageL, setImageL] = useState(promotion_images?.length == 2 ? promotion_images[1] : []);

  // house models
  const convertHouseModel = (data: any) => {
    if (data) {
      return data?.map((val: any) => {
        return { house_model_id: val?.id };
      });
    } else {
      return [];
    }
  };

  const getHouseModel = (data: any) => {
    if (data) {
      return data?.map((val: any) => {
        const { house_model_id, house_model_name } = val;
        const name = house_model_name?.[0]?.name || "";

        return { id: house_model_id || "", name };
      });
    } else {
      return [];
    }
  };

  // --- useForm
  const defaultFormData: any = {
    index: otherData?.index || 1,
    heading: otherData?.heading || "",
    description: otherData?.description || "",
    startDate: new Date(otherData?.start_date) || "",
    endDate: new Date(otherData?.end_date) || "",
    display: otherData?.display || "published",
    house_models: getHouseModel(otherData?.house_models) || [],
    freeItems: otherData?.free_items || [{ description: null }],
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormData,
  });

  const {
    fields: freeItemsFields,
    append: freeItemsAppend,
    prepend: freeItemsPrepend,
    remove: freeItemsRemove,
  } = useFieldArray({
    control,
    name: "freeItems",
  });

  const onSubmit = (data: any) => {
    let images: any = [];

    if (imageS && imageL) {
      images = [imageS, imageL]?.filter((obj: any) => Object.keys(obj).length > 0);
      if (images.length < 2) {
        MySwal.fire({ ...swalErrorOption, title: "กรุณาเลือกรูปให้ครบทุกรูป" });
        return;
      }
    } else {
      MySwal.fire({ ...swalErrorOption, title: "กรุณาเลือกรูปให้ครบทุกรูป" });
      return;
    }

    const houseModels = convertHouseModel(data?.house_models);

    const newData: any = {
      index: data?.index || 1,
      heading: data?.heading || "",
      description: data?.description || "",
      start_date: ConvertDays(data?.startDate, "yy/mm/dd", true) || "",
      end_date: ConvertDays(data?.endDate, "yy/mm/dd", true) || "",
      display: data?.display || "published",
      promotion_images: images || [],
      house_models: houseModels || [],
      free_items: data?.freeItems || [],
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
                  router.push("/admin/promotions");
                },
              });
            } else {
              console.log("create");
              createData.mutate(newData, {
                onSuccess(data, variables, context) {
                  router.push("/admin/promotions");
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

  // --- options
  const homeModelOptions: any = useHouseModelOptions();

  // --- query data
  const createData = useStorePromotion();
  const updateData = useUpdatePromotion(id);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-col-12 gap-2">
          <div className="col-span-12">
            <Controller
              control={control}
              name="heading"
              rules={{ required: "กรุณากรอกชื่อโปโมชัน" }}
              render={({ field, fieldState }) => (
                <InputField name={field.name} labelName={"ชื่อโปโมชัน"} required errors={errors}>
                  <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <strong>
              ภาพประกอบโครงการ Size S<span className="text-red-500">*</span>
            </strong>
            <PhotoUpload oldData={imageS} setData={setImageS} destination={"promotions"} limitSize={10} limitPixel="240x260" />
          </div>
          <div className="col-span-12 md:col-span-6">
            <strong>
              ภาพประกอบโครงการ Size L<span className="text-red-500">*</span>
            </strong>
            <PhotoUpload oldData={imageL} setData={setImageL} destination={"promotions"} limitSize={10} limitPixel="570x260" />
          </div>
          <div className="col-span-12">
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <InputField name={field.name} labelName={"รายละเอียดโปโมชัน"}>
                  <InputTextarea id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>
          <div className="col-span-12">
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: "95%" }}>รายการฟรี</th>
                  <th style={{ width: "5%" }}></th>
                </tr>
              </thead>
              <tbody>
                {freeItemsFields?.map((item: any, index: number) => (
                  <tr key={item.id}>
                    <td>
                      <Controller
                        control={control}
                        name={`freeItems.${index}.description`}
                        render={({ field, fieldState }) => (
                          <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                        )}
                      />
                    </td>
                    <td className="text-center">
                      {index == 0 ? (
                        <button
                          type="button"
                          className="btn text-white bg-info"
                          onClick={() => {
                            if (freeItemsFields?.length < 6) {
                              freeItemsAppend({
                                description: null,
                              });
                            }
                          }}
                        >
                          <i className="fa-regular fa-circle-plus"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn text-danger bg-white border border-danger"
                          onClick={() => {
                            freeItemsRemove(item.id);
                          }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-span-12 md:col-span-6">
            <Controller
              control={control}
              name="startDate"
              rules={{ required: "กรุณาเลือกวันที่เริ่มต้น" }}
              render={({ field, fieldState }) => (
                <InputField name={field.name} labelName={"วันที่เริ่มต้น"} required errors={errors}>
                  <Calendar
                    id={field.name}
                    inputId={field.name}
                    value={field.value}
                    onChange={(e: any) => field.onChange(e.value)}
                    className={classNames("w-full", { "p-invalid": fieldState.error })}
                    dateFormat="dd/mm/yy"
                    showIcon
                  />
                </InputField>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Controller
              control={control}
              name="endDate"
              rules={{ required: "กรุณาเลือกวันที่สิ้นสุด" }}
              render={({ field, fieldState }) => (
                <InputField name={field.name} labelName={"วันที่สิ้นสุด"} required errors={errors}>
                  <Calendar
                    id={field.name}
                    inputId={field.name}
                    value={field.value}
                    onChange={(e: any) => field.onChange(e.value)}
                    className={classNames("w-full", { "p-invalid": fieldState.error })}
                    dateFormat="dd/mm/yy"
                    showIcon
                  />
                </InputField>
              )}
            />
          </div>
          <div className="col-md-12 mb-2">
            <Controller
              control={control}
              name="house_models"
              rules={{ required: "กรุณาเลือกแบบบ้านที่เกี่ยวข้อง" }}
              render={({ field, fieldState }) => {
                return (
                  <InputField name={field.name} labelName={"แบบบ้านที่เกี่ยวข้อง"} required errors={errors}>
                    <IsLoadingDropdow isLoading={homeModelOptions?.isLoading}>
                      <MultiSelect
                        id={field.name}
                        name={field.name}
                        value={field.value}
                        optionLabel="name"
                        options={homeModelOptions?.data || []}
                        onChange={(e: any) => {
                          field.onChange(e.value);
                        }}
                        className={classNames("w-full", { "p-invalid": fieldState.error })}
                      />
                    </IsLoadingDropdow>
                  </InputField>
                );
              }}
            />
          </div>
          <div className="col-lg-12 d-flex gap-2 justify-content-end mt-2">
            <div className="d-flex flex-row-reverse gap-2 w-50">
              <button type="submit" className="btn btn-lg btn-green w-100">
                บันทึก
              </button>
              <button
                type="button"
                className="btn btn-lg btn-secondary font-white w-100"
                onClick={() => {
                  router.back();
                }}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default InputFormPromotion;
