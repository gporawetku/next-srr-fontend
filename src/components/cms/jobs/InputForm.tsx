"use client";

import { useRouter } from "next/navigation";
import { Calendar } from "primereact/calendar";
import { Editor } from "primereact/editor";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MySwal, swalErrorOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import { ConvertDays } from "@/libs/utils/ConvertDay";
import { useStoreJob, useUpdateJob } from "@/hooks/mutates/useMutateJob";
import { InputField } from "@/components/Content";
import { Button } from "primereact/button";

interface InputFormJobProps {
  id?: any;
  initialData?: any | null;
}

const InputFormJobs = ({ id, initialData }: InputFormJobProps) => {
  // --- router
  const router = useRouter();
  const [text, setText] = useState<string>(initialData?.qualification || "");

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
        <button className="ql-list" value="ordered" aria-label="Ordered List"></button>
        <button className="ql-list" value="bullet" aria-label="Unordered List"></button>
      </span>
    );
  };
  const header = renderHeader();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: async () => {
      if (initialData) {
        return {
          ...initialData,
          startDate: new Date(initialData?.start_date || ""),
          endDate: new Date(initialData?.end_date || ""),
          position: initialData?.position || "",
          amount: initialData?.amount || "",
          location: initialData?.location || "",
          description: initialData?.description || "",
          qualification: initialData?.qualification || "",
          status: "opening",
          display: initialData?.display || "published",
        };
      }
    },
  });

  const onSubmit = (data: any) => {
    const newData: any = {
      position: data?.position || "",
      amount: parseInt(data?.amount),
      location: data?.location || "",
      description: data?.description || "",
      qualification: data?.qualification || "",
      start_date: ConvertDays(data?.startDate, "yy-mm-dd") || "",
      end_date: ConvertDays(data?.endDate, "yy-mm-dd") || "",
      status: "opening",
      display: data?.display || "published",
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
                  router.push("/jobs");
                },
              });
            } else {
              console.log("create");
              createData.mutate(newData, {
                onSuccess(data, variables, context) {
                  router.push("/jobs");
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

  // --- query data
  const createData = useStoreJob();
  const updateData = useUpdateJob(id);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <Controller
              name="position"
              control={control}
              rules={{ required: "กรุณากรอกชื่อตำแหน่งงาน" }}
              render={({ field, fieldState }) => (
                <>
                  <InputField name={field.name} labelName="ชื่อตำแหน่งงาน" required errors={errors}>
                    <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                  </InputField>
                </>
              )}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <Controller
              name="amount"
              control={control}
              rules={{ required: "กรุณากรอกจำนวนที่รับสมัคร" }}
              render={({ field, fieldState }) => (
                <>
                  <InputField name={field.name} labelName="จำนวนที่รับสมัคร" required errors={errors}>
                    <InputNumber
                      id={field.name}
                      inputRef={field.ref}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(e.value)}
                      useGrouping={false}
                      className={classNames("w-full", { "p-invalid": fieldState.error })}
                    />
                  </InputField>
                </>
              )}
            />
          </div>

          <div className="col-span-12">
            <Controller
              name="location"
              control={control}
              rules={{ required: "กรุณากรอกสถานที่ทำงาน" }}
              render={({ field, fieldState }) => (
                <>
                  <InputField name={field.name} labelName="สถานที่ทำงาน" required errors={errors}>
                    <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                  </InputField>
                </>
              )}
            />
          </div>

          <div className="col-span-12">
            <Controller
              name="description"
              control={control}
              rules={{ required: "กรุณากรอกรายละเอียดตำแหน่งงาน" }}
              render={({ field, fieldState }) => (
                <>
                  <InputField name={field.name} labelName="รายละเอียดตำแหน่งงาน" required errors={errors}>
                    <InputTextarea id={field.name} {...field} rows={3} cols={30} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                  </InputField>
                </>
              )}
            />
          </div>

          <div className="col-span-12">
            <Controller
              name="qualification"
              control={control}
              rules={{ required: "กรุณากรอกคุณสมบัติผู้สมัคร" }}
              render={({ field, fieldState }) => (
                <>
                  <InputField name={field.name} labelName="คุณสมบัติผู้สมัคร" required errors={errors}>
                    <Editor
                      id={field.name}
                      {...field}
                      name="qualification"
                      value={field.value}
                      headerTemplate={header}
                      onTextChange={(e) => field.onChange(e.htmlValue)}
                      className={classNames({ "p-invalid": fieldState.error })}
                      style={{ height: "300px" }}
                    />
                  </InputField>
                </>
              )}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "กรุณาเลือกวันที่เริ่มต้น" }}
              render={({ field, fieldState }) => (
                <>
                  <InputField name={field.name} labelName="วันที่เริ่มต้น" required errors={errors}>
                    <Calendar inputId={field.name} {...field} showIcon className={classNames("w-full", { "p-invalid": fieldState.error })} dateFormat="dd/mm/yy" />
                  </InputField>
                </>
              )}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <Controller
              name="endDate"
              control={control}
              rules={{ required: "กรุณาเลือกวันที่สิ้นสุด" }}
              render={({ field, fieldState }) => (
                <>
                  <InputField name={field.name} labelName="วันที่สิ้นสุด" required errors={errors}>
                    <Calendar inputId={field.name} {...field} showIcon className={classNames("w-full", { "p-invalid": fieldState.error })} dateFormat="dd/mm/yy" />
                  </InputField>
                </>
              )}
            />
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

export default InputFormJobs;
