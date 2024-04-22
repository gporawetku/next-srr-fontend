"use client";

import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useRouter } from "next/navigation";
import { MySwal, swalErrorOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import { useStoreInterest, useUpdateInterest } from "@/hooks/mutates/useMutateInterests";
import { PhotoUpload } from "@/components/FilesUpload";
import { InputField } from "@/components/Content";
import { Button } from "primereact/button";

interface InputFormInterestProps {
  id?: any;
  initialData?: any | null;
}

const InputFormInterest = ({ id, initialData }: InputFormInterestProps) => {
  // --- router
  const router = useRouter();

  // --- initialData
  const { images, ...otherData }: any = initialData || {};

  // --- state
  const [bankImage, setBankImage] = useState(images?.length == 1 ? images[0] : "");

  // --- useform
  const defaultFormData: any = {
    name: otherData?.bank_name || "",
    interestRate: otherData?.interest_rate || 0,
    startDate: otherData?.startDate || undefined,
    endDate: otherData?.endDate || undefined,
    note: otherData?.note || "",
    display: otherData?.display || "published",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormData,
  });

  const onSubmit = (data: any) => {
    let images: any = [];

    if (bankImage) {
      images = [bankImage]?.filter((obj: any) => Object.keys(obj).length > 0);
      if (images.length < 1) {
        MySwal.fire({ ...swalErrorOption, title: "กรุณาเลือกรูป" });
        return;
      }
    } else {
      MySwal.fire({ ...swalErrorOption, title: "กรุณาเลือกรูป" });
      return;
    }

    const newData: any = {
      bank_name: data?.name || "",
      interest_rate: data?.interestRate || "",
      start_date: data?.startDate || "",
      end_date: data?.endDate || "",
      note: data?.note || "",
      display: data?.display || "published",
      images: images || [],
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
                  router.push("/admin/interest");
                },
              });
            } else {
              console.log("create");
              createData.mutate(newData, {
                onSuccess(data, variables, context) {
                  router.push("/admin/interest");
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
  const createData = useStoreInterest();
  const updateData = useUpdateInterest(id);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12">
          <PhotoUpload oldData={bankImage} setData={setBankImage} destination={"interests"} limitSize={10} limitPixel="240x240" />
        </div>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <InputField className="col-span-12 md:col-span-6" name={field.name} labelName="ชื่อธนาคาร" required errors={errors}>
              <InputText id={field.name} value={field.value} className={classNames({ "p-invalid": fieldState.error }, "w-full")} onChange={(e) => field.onChange(e.target.value)} />
            </InputField>
          )}
        />
        <Controller
          name="interestRate"
          control={control}
          render={({ field, fieldState }) => (
            <InputField className="col-span-12 md:col-span-6" name={field.name} labelName="อัตราดอกเบี้ย (ต่อปี)" required errors={errors}>
              <InputNumber
                inputId={field.name}
                inputRef={field.ref}
                value={field.value}
                onBlur={field.onBlur}
                onValueChange={(e) => field.onChange(e)}
                useGrouping={false}
                className="w-full"
                inputClassName={classNames({ "p-invalid": fieldState.error }, "w-full")}
              />
            </InputField>
          )}
        />
        <Controller
          name="note"
          control={control}
          render={({ field, fieldState }) => (
            <InputField className="col-span-12" name={field.name} labelName="หมายเหตุ">
              <InputTextarea id={field.name} {...field} rows={4} cols={30} className={classNames({ "p-invalid": fieldState.error }, "w-full")} />
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
  );
};

export default InputFormInterest;
