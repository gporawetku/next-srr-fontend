"use client";

import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MySwal, swalErrorOption, swalQuestionOption } from "@/libs/utils/Swal2Config";
import { useStoreBrand, useUpdateBrand } from "@/hooks/mutates/useMutateBrand";
import { InputField } from "@/components/Content";
import { PhotoUpload } from "@/components/FilesUpload";
import { Button } from "primereact/button";

interface InputFormBrandProps {
  onClose?: any;
  id?: any;
  initialData?: any | null;
}
export default function InputFormBrand({ onClose, id, initialData }: InputFormBrandProps) {
  // --- router
  const router = useRouter();

  // --- initialData
  const { images, ...otherData }: any = initialData || {};

  // --- state
  const [desktopImage, setDesktopImage] = useState(images?.length == 1 ? images[0] || "" : null);

  // --- hook
  const create = useStoreBrand();
  const update = useUpdateBrand(id);

  // --- useform
  const defaultFormData: any = {
    index: otherData?.index || 1,
    name: otherData?.name || null,
    display: otherData?.display || "published",
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any>({
    defaultValues: defaultFormData,
  });

  const onSubmit = (data: any) => {
    let images: any = [];

    if (desktopImage) {
      images = [desktopImage]?.filter((obj: any) => Object.keys(obj).length > 0);
      if (images.length < 1) {
        MySwal.fire({ ...swalErrorOption, title: "กรุณาอัพโหลดรูปภาพ" });
        return;
      }
    } else {
      MySwal.fire({ ...swalErrorOption, title: "กรุณาอัพโหลดรูปภาพ" });
      return;
    }

    const payload = {
      index: data?.index || 1,
      name: data?.name,
      display: data?.display || "published",
      images: images || [],
    };

    MySwal.fire({ ...swalQuestionOption, title: "ยืนยันที่จะบันทึกข้อมูล" }).then((response) => {
      if (response.isConfirmed) {
        if (id) {
          update.mutate(payload, {
            onSuccess: (response) => {
              router.push("/admin/brands");
              onClose();
            },
          });
        } else {
          create.mutate(payload, {
            onSuccess: (response) => {
              router.push("/admin/brands");
              onClose();
            },
          });
        }
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <Controller
              name="name"
              control={control}
              rules={{ required: "กรุณากรอกชื่อโครงการ" }}
              render={({ field, fieldState }) => (
                <>
                  <InputField name={field.name} labelName="ชื่อโครงการ" required errors={errors}>
                    <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                  </InputField>
                </>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <div>
              อัปโหลดรูปภาพ <span className="text-red-500">*</span>
            </div>
            <PhotoUpload oldData={desktopImage} setData={setDesktopImage} destination={"brands"} limitSize={10} limitPixel="100x24" />
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
}
