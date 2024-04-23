"use client";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { MySwal, swalErrorOption, swalQuestionOption } from "@/libs/utils/Swal2Config";
import { useUpdateDataSetting } from "@/hooks/mutates/useMutateDataSetting";
import { InputField } from "@/components/Content";
import { PhotoUpload } from "@/components/FilesUpload";
import { Button } from "primereact/button";

interface InputFormJobProps {
  onClose?: any;
  id?: any;
  initialData?: any | null;
}

const InputFormGeneral = ({ onClose, id, initialData }: InputFormJobProps) => {
  // --- router
  const router = useRouter();

  // --- initialData
  const { images, ...otherData }: any = initialData || {};

  // --- state
  const [image, setImage] = useState(images?.length == 1 ? images[1] || "" : null);

  // --- hook
  const update = useUpdateDataSetting(id);

  // --- useform
  const defaultFormData: any = {
    tel: otherData?.tel || "",
    email: otherData?.email || "",
    link_facebook: otherData?.link_facebook || "",
    link_instagram: otherData?.link_instagram || "",
    link_twitter: otherData?.link_twitter || "",
    link_tiktok: otherData?.link_tiktok || "",
    link_line: otherData?.link_line || "",
    link_website: otherData?.link_website || "",
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any>({
    defaultValues: defaultFormData,
  });

  const onSubmit = (data: any) => {
    console.log(data);
    let images: any = [];

    if (image) {
      images = [image]?.filter((obj: any) => Object.keys(obj).length > 0);
      if (images.length < 1) {
        MySwal.fire({ ...swalErrorOption, title: "กรุณาอัปโหลดรูปภาพ" });
        return;
      }
    } else {
      MySwal.fire({ ...swalErrorOption, title: "กรุณาอัปโหลดรูปภาพ" });
      return;
    }

    const payload = {
      tel: data?.tel,
      email: data?.email,
      link_facebook: data?.link_facebook,
      link_instagram: data?.link_instagram,
      link_twitter: data?.link_twitter,
      link_tiktok: data?.link_tiktok,
      link_line: data?.link_line,
      link_website: data?.link_website,
      images: images || [],
    };

    console.log(payload);

    MySwal.fire({ ...swalQuestionOption, title: "ยืนยันที่จะบันทึกข้อมูล" }).then((response) => {
      if (response.isConfirmed) {
        if (id) {
          update.mutate(payload, {
            onSuccess: (response) => {
              router.push("/admin/setting-general");
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
        <div className="grid grid-col-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <Controller
              name="tel"
              control={control}
              rules={{ required: "กรุณากรอกเบอร์โทร" }}
              render={({ field, fieldState }) => (
                <>
                  <InputField name={field.name} labelName="เบอร์โทร" required errors={errors}>
                    <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                  </InputField>
                </>
              )}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "กรุณากรอกอีเมล",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "รูปแบบอีเมลไม่ถูกต้อง",
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <InputField name={field.name} labelName="Email" required errors={errors}>
                    <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                  </InputField>
                </>
              )}
            />
          </div>

          <div className="col-span-12">
            <div className="font-semibold mb-2">
              อัปโหลดรูปภาพ QR Code Line <span className="text-red">*</span>
            </div>
            <PhotoUpload oldData={image} setData={setImage} destination={"data_setting"} limitSize={10} limitPixel="240x240" />
          </div>

          <div className="col-span-12">
            <label className="font-semibold">ลิงก์โซเชียลมีเดีย</label>
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-5 md:col-span-1">
                <Controller
                  name="link_facebook"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <InputField name={field.name} labelName="Facebook">
                        <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                      </InputField>
                    </>
                  )}
                />
              </div>
              <div className="col-span-5 md:col-span-1">
                <Controller
                  name="link_instagram"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <InputField name={field.name} labelName="Instagram">
                        <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                      </InputField>
                    </>
                  )}
                />
              </div>
              <div className="col-span-5 md:col-span-1">
                <Controller
                  name="link_twitter"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <InputField name={field.name} labelName="Twitter">
                        <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                      </InputField>
                    </>
                  )}
                />
              </div>
              <div className="col-span-5 md:col-span-1">
                <Controller
                  name="link_tiktok"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <InputField name={field.name} labelName="Tiktok">
                        <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                      </InputField>
                    </>
                  )}
                />
              </div>
              <div className="col-span-5 md:col-span-1">
                <Controller
                  name="link_line"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <InputField name={field.name} labelName="Line">
                        <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                      </InputField>
                    </>
                  )}
                />
              </div>
              <div className="col-span-5">
                <Controller
                  name="link_website"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <InputField name={field.name} labelName="Website">
                        <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                      </InputField>
                    </>
                  )}
                />
              </div>
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

export default InputFormGeneral;
