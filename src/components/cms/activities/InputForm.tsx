"use client";

import { PrimeReactProvider } from "primereact/api";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { useRouter } from "next/navigation";
import { ConvertDays } from "@/libs/utils/ConvertDay";
import { MySwal, swalErrorOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import { useStoreActivitie, useUpdateActivitie } from "@/hooks/mutates/useMutateActivity";
import { FilesUpload } from "@/components/FilesUpload";
import { InputField } from "@/components/Content";
import { Button } from "primereact/button";

interface InputFormActivityProps {
  id?: any;
  initialData?: any | null;
}

const InputFormActivity = ({ id, initialData }: InputFormActivityProps) => {
  // --- router
  const router = useRouter();

  // --- hook
  const createData = useStoreActivitie();
  const updateData = useUpdateActivitie(id);

  // --- state
  const [oldFiles, setOldFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileRemove, setFileRemove] = useState([]);
  const [destination, setDestination] = useState("activities");

  // --- useForm
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: async () => {
      if (initialData) {
        if (initialData?.images && initialData?.images?.length > 0) {
          setOldFiles(initialData?.images);
        }
        return { ...initialData, startDate: new Date(initialData?.start_date || ""), endDate: new Date(initialData?.end_date || ""), videoLink: initialData?.video_link || "" };
      }
    },
  });

  const onSubmit = (data: any) => {
    const newData: any = {
      index: data?.index || 1,
      heading: data?.heading || "",
      description: data?.description || "",
      start_date: ConvertDays(data?.startDate, "yy-mm-dd") || "",
      end_date: ConvertDays(data?.endDate, "yy-mm-dd") || "",
      video_link: data?.videoLink || "",
      display: data?.display || "published",
      images: files,
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
                  router.push("/activities");
                },
              });
            } else {
              console.log("create");
              createData.mutate(newData, {
                onSuccess(data, variables, context) {
                  router.push("/activities");
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12">
            <div className="mb20">
              <Controller
                name="heading"
                control={control}
                rules={{ required: "กรุณากรอกชื่อหัวข้อกิจกรรม" }}
                render={({ field, fieldState }) => (
                  <>
                    <InputField name={field.name} labelName={"ชื่อหัวข้อกิจกรรม"} required errors={errors}>
                      <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                    </InputField>
                  </>
                )}
              />
            </div>
          </div>

          <div className="col-span-12">
            <div className="mb-2">
              อัปโหลดรูปภาพ <span className="text-red-500">*</span>
            </div>
            <PrimeReactProvider>
              <FilesUpload oldFiles={oldFiles} setData={setFiles} setRemove={setFileRemove} destination={destination} limitSize={10} limitPixel="1170x650" />
            </PrimeReactProvider>
          </div>

          <div className="col-span-12">
            <Controller
              name="description"
              control={control}
              rules={{ required: "กรุณากรอกรายละเอียดกิจกรรม" }}
              render={({ field, fieldState }) => (
                <>
                  <InputField name={field.name} labelName="รายละเอียดกิจกรรม" required errors={errors}>
                    <InputTextarea id={field.name} {...field} rows={4} cols={30} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                  </InputField>
                </>
              )}
            />
          </div>

          <div className="col-span-12">
            <div className=" flex flex-wrap gap-2 p-fluid">
              <div className="flex-auto">
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: "กรุณาเลือกวันที่เริ่มต้น" }}
                  render={({ field, fieldState }) => (
                    <>
                      <InputField name={field.name} labelName="วันที่เริ่มต้น" required errors={errors}>
                        <Calendar inputId={field.name} {...field} showIcon className={classNames({ "p-invalid": fieldState.error })} dateFormat="dd/mm/yy" />
                      </InputField>
                    </>
                  )}
                />
              </div>
              <div className="flex-auto">
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ required: "กรุณาเลือกวันที่สิ้นสุด" }}
                  render={({ field, fieldState }) => (
                    <>
                      <InputField name={field.name} labelName="วันที่สิ้นสุด" required errors={errors}>
                        <Calendar inputId={field.name} {...field} showIcon className={classNames({ "p-invalid": fieldState.error })} dateFormat="dd/mm/yy" />
                      </InputField>
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="col-span-12">
            <div className="mb20">
              <Controller
                name="videoLink"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <InputField name={field.name} labelName="วิดีโอประกอบกิจกรรม">
                      <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                    </InputField>
                  </>
                )}
              />
            </div>
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

export default InputFormActivity;
