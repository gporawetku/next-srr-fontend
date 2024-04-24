"use client";

import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { MySwal, swalErrorOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import { useRouter } from "next/navigation";
import projectConsts from "@/data/projectConsts";
import { useStoreProject, useUpdateProject } from "@/hooks/mutates/useMutateProject";
import { InputField } from "@/components/Content";
import { PhotoUpload } from "@/components/FilesUpload";
import { Button } from "primereact/button";

interface InputFormProjectProps {
  id?: any;
  initialData?: any | null;
}

const InputFormProject = ({ id, initialData }: InputFormProjectProps) => {
  // --- router
  const router = useRouter();

  // --- initialData
  const { images, ...otherData }: any = initialData || {};

  // --- func
  const gethomeTypes = (data: any) => {
    if (data) {
      return data?.map((val: any) => {
        return { name: val?.name || "" };
      });
    } else {
      return [];
    }
  };

  // --- useForm
  const defaultFormData: any = {
    index: otherData?.index || 1,
    name: otherData?.name || "",
    heading: otherData?.heading || "",
    text: otherData?.text || "",
    location: otherData?.location || "",
    price: otherData?.price || "",
    status: otherData?.status_project || "",
    type: otherData?.type_project || "",
    homeTypes: gethomeTypes(otherData?.house_type_items) || [],
    description: otherData?.description || "",
    facebook: otherData?.name_facebook || "",
    facebookLink: otherData?.link_facebook || "",
    phoneNumber: otherData?.tel || "",
    address: otherData?.address || "",
    addressLink: otherData?.link_location || "",
    display: otherData?.display || "published",
    areaItems: otherData?.area_items || [
      {
        item: "",
        amount: null,
        unit: "",
      },
    ],
    facilitiesItems: otherData?.facilities_items || [
      {
        item: "",
      },
    ],
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormData,
  });

  const {
    fields: areaItemsFields,
    append: areaItemsAppend,
    prepend: areaItemsPrepend,
    remove: areaItemsRemove,
  } = useFieldArray({
    control,
    name: "areaItems",
  });

  const {
    fields: facilitiesItemsFields,
    append: facilitiesItemsAppend,
    prepend: afacilitiesItemsPrepend,
    remove: facilitiesItemsRemove,
  } = useFieldArray({
    control,
    name: "facilitiesItems",
  });

  const onSubmit = (data: any) => {
    let images: any = [];

    if (mobileImage && desktopImage && mobileEnvImage && desktopEnvImage) {
      images = [mobileImage, desktopImage, mobileEnvImage, desktopEnvImage]?.filter((obj: any) => Object.keys(obj).length > 0);
      if (images.length < 4) {
        MySwal.fire({ ...swalErrorOption, title: "กรุณาเลือกรูปให้ครบทุกรูป" });
        return;
      }
    } else {
      MySwal.fire({ ...swalErrorOption, title: "กรุณาเลือกรูปให้ครบทุกรูป" });
      return;
    }

    const newData: any = {
      index: data?.index || 1,
      name: data?.name || "",
      heading: data?.heading || "",
      text: data?.text || "",
      location: data?.location || "",
      price: data?.price || 0,
      description: data?.description || "",
      status_project: data?.status || "",
      type_project: data?.type || "",
      name_facebook: data?.facebook || "",
      link_facebook: data?.facebookLink || "",
      tel: data?.phoneNumber || "",
      address: data?.address || "",
      link_location: data?.addressLink || "",
      display: data?.display || "published",
      images: images || [],
      house_type_items: data?.homeTypes || [],
      area_items: data?.areaItems || [],
      facilities_items: data?.facilitiesItems || [],
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
                  router.push("/projects");
                },
              });
            } else {
              console.log("create");
              createData.mutate(newData, {
                onSuccess(data, variables, context) {
                  router.push("/projects");
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

  const status: any[] = projectConsts?.status || [];

  const types: any[] = projectConsts?.types || [];

  const homeTypes: any[] = projectConsts?.homeTypes || [];

  // --- state
  const [mobileImage, setMobileImage] = useState(images?.length == 4 ? images[0] : "");
  const [desktopImage, setDesktopImage] = useState(images?.length == 4 ? images[1] : "");
  const [mobileEnvImage, setMobileEnvImage] = useState(images?.length == 4 ? images[2] : "");
  const [desktopEnvImage, setDesktopEnvImage] = useState(images?.length == 4 ? images[3] : "");

  // --- query data
  const createData = useStoreProject();
  const updateData = useUpdateProject(id);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-2">
          <Controller
            control={control}
            name="name"
            rules={{ required: "กรุณากรอกชื่อโครงการ" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12 md:col-span-4" name={field.name} labelName="ชื่อโครงการ" required errors={errors}>
                <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
              </InputField>
            )}
          />
          <Controller
            control={control}
            name="heading"
            rules={{ required: "กรุณากรอกข้อความบรรทัด 1" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12 md:col-span-4" name={field.name} labelName="ข้อความบรรทัด 1" required errors={errors}>
                <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
              </InputField>
            )}
          />
          <Controller
            control={control}
            name="text"
            rules={{ required: "กรุณากรอกข้อความบรรทัด 2" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12 md:col-span-4" name={field.name} labelName="ข้อความบรรทัด 2" required errors={errors}>
                <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
              </InputField>
            )}
          />

          <div className="col-span-12 md:col-span-6">
            <strong>
              ภาพประกอบโครงการ Mobile <span className="text-danger">*</span>
            </strong>
            <PhotoUpload oldData={mobileImage} setData={setMobileImage} destination={"projects"} limitSize={10} limitPixel="570x661" />
          </div>
          <div className="col-span-12 md:col-span-6">
            <strong>
              ภาพประกอบโครงการ Desktop <span className="text-danger">*</span>
            </strong>
            <PhotoUpload oldData={desktopImage} setData={setDesktopImage} destination={"projects"} limitSize={10} limitPixel="1920x600" />
          </div>

          <Controller
            control={control}
            name="location"
            rules={{ required: "กรุณากรอกตำแหน่งที่ตั้ง" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12 md:col-span-8" name={field.name} labelName="ตำแหน่งที่ตั้ง" required errors={errors}>
                <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
              </InputField>
            )}
          />

          <Controller
            control={control}
            name="price"
            rules={{ required: "กรุณากรอกราคาเริ่มต้น" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12 md:col-span-4" name={field.name} labelName="ราคาเริ่มต้น" required errors={errors}>
                <InputNumber
                  inputId={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  className={classNames("w-full", { "p-invalid": fieldState.error })}
                  placeholder="0.00"
                  maxFractionDigits={2}
                />
              </InputField>
            )}
          />

          <Controller
            control={control}
            name="status"
            rules={{ required: "กรุณาเลือกสถานะโครงการ" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12 md:col-span-6" name={field.name} labelName="สถานะโครงการ" required errors={errors}>
                <Dropdown
                  inputId={field.name}
                  value={field.value}
                  onChange={(e: DropdownChangeEvent) => field.onChange(e.value)}
                  options={status}
                  optionLabel="name"
                  optionValue="value"
                  className={classNames("w-full", { "p-invalid": fieldState.error })}
                />
              </InputField>
            )}
          />

          <Controller
            control={control}
            name="type"
            rules={{ required: "กรุณาเลือกประเภทโครงการ" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12 md:col-span-6" name={field.name} labelName="ประเภทโครงการ" required errors={errors}>
                <Dropdown
                  inputId={field.name}
                  value={field.value}
                  onChange={(e: DropdownChangeEvent) => field.onChange(e.value)}
                  options={types}
                  optionLabel="name"
                  optionValue="value"
                  className={classNames("w-full", { "p-invalid": fieldState.error })}
                />
              </InputField>
            )}
          />

          <Controller
            control={control}
            name="homeTypes"
            rules={{ required: "กรุณาเลือกประเภทบ้าน" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12" name={field.name} labelName="ประเภทบ้าน" required errors={errors}>
                <MultiSelect
                  inputId={field.name}
                  value={field.value}
                  options={homeTypes}
                  onChange={(e) => field.onChange(e.value)}
                  optionLabel="name"
                  placeholder="เลือกประเภทบ้าน"
                  maxSelectedLabels={3}
                  className={classNames("w-full", { "p-invalid": fieldState.error })}
                />
              </InputField>
            )}
          />

          <Controller
            control={control}
            name="description"
            rules={{ required: "กรุณากรอกรายละเอียดโครงการ" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12" name={field.name} labelName="รายละเอียดโครงการ" required errors={errors}>
                <InputTextarea
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  rows={4}
                  cols={30}
                  className={classNames("w-full", { "p-invalid": fieldState.error })}
                />
              </InputField>
            )}
          />

          {/* 1 */}
          <div className="col-span-12">
            <div className="flex gap-2">
              <strong>รายละเอียดขนาดพื้นที่โครงการ</strong>
              <span>(สูงสุด 6 รายการ)</span>
            </div>
            <table className="w-full">
              <thead className="text-start">
                <tr>
                  <th style={{ textAlign: "start" }}>ชื่อพื้นที่</th>
                  <th style={{ textAlign: "start" }}>จำนวน</th>
                  <th style={{ textAlign: "start" }}>หน่วยนับ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {areaItemsFields?.map((item: any, index: number) => (
                  <tr key={item?.id}>
                    <td>
                      <Controller
                        control={control}
                        name={`areaItems.${index}.item`}
                        rules={{ required: "กรุณากรอกชื่อพื้นที่" }}
                        render={({ field, fieldState }) => (
                          <>
                            <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                          </>
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name={`areaItems.${index}.amount`}
                        rules={{ required: "กรุณากรอกจำนวน" }}
                        render={({ field, fieldState }) => (
                          <InputNumber id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name={`areaItems.${index}.unit`}
                        rules={{ required: "กรุณากรอกหน่วยนับ" }}
                        render={({ field, fieldState }) => (
                          <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
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
                              if (areaItemsFields?.length < 6) {
                                areaItemsAppend({
                                  item: "",
                                  amount: "",
                                  unit: "",
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
                              areaItemsRemove(index);
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

          <div className="col-span-12 md:col-span-6">
            <strong>
              ภาพประกอบสิ่งอำนวนความสะดวก Mobile <span className="text-red-500">*</span>
            </strong>
            <PhotoUpload oldData={mobileEnvImage} setData={setMobileEnvImage} destination={"projects"} limitSize={10} limitPixel="570x661" />
          </div>
          <div className="col-span-12 md:col-span-6">
            <strong>
              ภาพประกอบสิ่งอำนวนความสะดวก Desktop <span className="text-red-500">*</span>
            </strong>
            <PhotoUpload oldData={desktopEnvImage} setData={setDesktopEnvImage} destination={"projects"} limitSize={10} limitPixel="1920x600" />
          </div>

          {/* 2 */}
          <div className="col-span-12">
            <div className="flex gap-2">
              <strong>สิ่งอำนวยความสะดวก</strong>
            </div>

            <table className="w-full">
              <tbody>
                {facilitiesItemsFields?.map((item: any, index: number) => (
                  <tr key={item?.id}>
                    <td style={{ width: "95%" }}>
                      <Controller
                        control={control}
                        name={`facilitiesItems.${index}.item`}
                        rules={{ required: "กรุณากรอกหน่วยนับ" }}
                        render={({ field, fieldState }) => (
                          <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
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
                              if (facilitiesItemsFields?.length < 6) {
                                facilitiesItemsAppend({
                                  item: "",
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
                              facilitiesItemsRemove(index);
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

          <Controller
            control={control}
            name="facebook"
            rules={{ required: "กรุณากรอกชื่อเฟสบุ๊กโครงการ" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12 md:col-span-4" name={field.name} labelName="ชื่อเฟสบุ๊กโครงการ" required errors={errors}>
                <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
              </InputField>
            )}
          />

          <Controller
            control={control}
            name="facebookLink"
            rules={{ required: "กรุณากรอกลิงก์เฟสบุ๊กโครงการ" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12 md:col-span-4" name={field.name} labelName="ลิงก์เฟสบุ๊กโครงการ" required errors={errors}>
                <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
              </InputField>
            )}
          />

          <Controller
            control={control}
            name="phoneNumber"
            rules={{ required: "กรุณากรอกเบอร์โทรโครงการ" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12 md:col-span-4" name={field.name} labelName="เบอร์โทรโครงการ" required errors={errors}>
                <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
              </InputField>
            )}
          />

          <Controller
            control={control}
            name="address"
            rules={{ required: "กรุณากรอกที่อยู่โครงการ" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12" name={field.name} labelName="ที่อยู่โครงการ" required errors={errors}>
                <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
              </InputField>
            )}
          />

          <Controller
            control={control}
            name="addressLink"
            rules={{ required: "กรุณากรอกลิ้งก์แผนที่โครงการ" }}
            render={({ field, fieldState }) => (
              <InputField className="col-span-12" name={field.name} labelName="ลิ้งก์แผนที่โครงการ" required errors={errors}>
                <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
              </InputField>
            )}
          />

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

export default InputFormProject;
