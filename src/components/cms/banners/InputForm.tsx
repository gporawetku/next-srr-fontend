"use client";

import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Nullable } from "primereact/ts-helpers";
import { Controller, useForm } from "react-hook-form";
import { MySwal, swalQuestionOption, swalErrorOption } from "@/libs/utils/Swal2Config";
import { useRouter } from "next/navigation";
import { classNames } from "primereact/utils";
import { useStoreBanner, useUpdateBanner } from "@/hooks/mutates/useMutateBanner";
import { PhotoUpload } from "@/components/FilesUpload";
import { Button } from "primereact/button";
import { InputField } from "@/components/Content";

interface InputFormBannerProps {
  onClose?: any;
  id?: any;
  initialData?: any | null;
}

export default function InputFormBanner({ onClose, id, initialData }: InputFormBannerProps) {
  // --- router
  const router = useRouter();

  // --- initialData
  const { images, ...otherData }: any = initialData || {};

  // --- state
  const [value3, setValue3] = useState<Nullable<number>>(0);
  const [mobileImage, setMobileImage] = useState(images?.length == 2 ? images[0] || "" : null);
  const [desktopImage, setDesktopImage] = useState(images?.length == 2 ? images[1] || "" : null);

  // --- hook
  const create = useStoreBanner();
  const update = useUpdateBanner(id);

  // --- useform
  const defaultFormData: any = {
    index: otherData?.index || 1,
    delay: otherData?.delay || null,
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

    if (mobileImage && desktopImage) {
      images = [mobileImage, desktopImage]?.filter((obj: any) => Object.keys(obj).length > 0);
      if (images.length < 2) {
        MySwal.fire({ ...swalErrorOption, title: "กรุณาเลือกรูปให้ครบทุกรูป" });
        return;
      }
    } else {
      MySwal.fire({ ...swalErrorOption, title: "กรุณาเลือกรูปให้ครบทุกรูป" });
      return;
    }

    const payload = {
      index: data?.index || 1,
      delay: parseInt(data?.delay),
      display: data?.display || "published",
      images: images || [],
    };

    MySwal.fire({ ...swalQuestionOption, title: "ยืนยันที่จะบันทึกข้อมูล" }).then((response) => {
      if (response.isConfirmed) {
        if (id) {
          update.mutate(payload, {
            onSuccess: (response) => {
              router.push("/banners");
              onClose();
            },
          });
        } else {
          create.mutate(payload, {
            onSuccess: (response) => {
              router.push("/banners");
              onClose();
            },
          });
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <label>
                ภาพแบนเนอร์ Mobile <span className="text-red-500">*</span>
              </label>
              <PhotoUpload oldData={mobileImage} setData={setMobileImage} destination={"banner"} limitSize={10} limitPixel="570x661" />
            </div>
            <div className="col-span-6">
              <label>
                ภาพแบนเนอร์ Desktop <span className="text-red-500">*</span>
              </label>
              <PhotoUpload oldData={desktopImage} setData={setDesktopImage} destination={"banner"} limitSize={10} limitPixel="1920x600" />
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <Controller
            name="delay"
            control={control}
            rules={{ required: "กรุณาเลือกเวลาการแสดงผลแบนเนอร์" }}
            render={({ field, fieldState }) => (
              <>
                <InputField name={field.name} labelName="เวลาการแสดงผลแบนเนอร์" required errors={errors}>
                  <InputNumber
                    id={field.name}
                    inputRef={field.ref}
                    value={field.value}
                    decrementButtonClassName="p-button-secondary"
                    incrementButtonClassName="p-button-secondary"
                    showButtons
                    onBlur={field.onBlur}
                    onValueChange={(e) => field.onChange(e)}
                    useGrouping={false}
                    inputClassName={classNames({ "p-invalid": fieldState.error })}
                    className="w-full"
                  />
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
  );
}
