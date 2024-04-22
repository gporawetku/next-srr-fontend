"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Checkbox } from "primereact/checkbox";
import { MySwal, swalErrorOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import rolesConsts from "@/data/rolesConsts";
import { useStoreUser, useUpdateUser } from "@/hooks/mutates/useMutateUpdate";
import { PhotoUpload } from "@/components/FilesUpload";
import { InputField } from "@/components/Content";
import { Button } from "primereact/button";

interface InputFormRoleProps {
  id?: any;
  initialData?: any | null;
}

const InputFormRole = ({ id, initialData }: InputFormRoleProps) => {
  // --- router
  const router = useRouter();

  // --- initialData
  const { images, ...otherData }: any = initialData || {};

  // --- state
  const [image, setImage] = useState(images?.length == 1 ? images[0] : "");

  // --- option
  const roles: any = rolesConsts.roles || [];

  // --- func
  const rolesFormat = (data: any) => {
    return data?.map((val: any) => {
      return {
        role_id: val?.id,
      };
    });
  };

  const getRolesFormat = (data: any) => {
    return data?.map((val: any) => roles?.find((role: any) => role?.id == val?.role_id));
  };

  // --- useForm
  const defaultFormData: any = {
    name: otherData?.name || "",
    tel: otherData?.tel || "",
    email: otherData?.email || "",
    username: otherData?.username || "",
    password: null,
    display: otherData?.display || "published",
    roles: getRolesFormat(otherData?.roles) || [],
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

    if (image) {
      images = [image]?.filter((obj: any) => Object.keys(obj).length > 0);
      if (images.length < 1) {
        MySwal.fire({ ...swalErrorOption, title: "กรุณาเลือกรูปให้ครบทุกรูป" });
        return;
      }
    } else {
      MySwal.fire({ ...swalErrorOption, title: "กรุณาเลือกรูปให้ครบทุกรูป" });
      return;
    }

    const newData: any = {
      name: data?.name || "",
      tel: data?.tel || "",
      email: data?.email || "",
      username: data?.username || "",
      password: data?.password || "",
      display: data?.display || "published",
      roles: rolesFormat(data?.roles) || [],
      images: images,
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
                  router.push("/roles");
                },
              });
            } else {
              console.log("create");
              createData.mutate(newData, {
                onSuccess(data, variables, context) {
                  router.push("/roles");
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

  // --- mutate
  const createData = useStoreUser();
  const updateData = useUpdateUser(id);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12">
            <PhotoUpload oldData={image} setData={setImage} destination={"users"} limitPixel="240x240" limitSize={10} />
          </div>
          <div className="col-span-12 md:col-span-8">
            <Controller
              name="name"
              control={control}
              rules={{ required: "กรุณากรอกชื่อ-นามสกุล" }}
              render={({ field, fieldState }) => (
                <InputField labelName="ชื่อ-นามสกุล" name={field.name} required errors={errors}>
                  <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <Controller
              name="tel"
              control={control}
              rules={{ required: "กรุณากรอกเบอร์โทร" }}
              render={({ field, fieldState }) => (
                <InputField labelName="เบอร์โทร" name={field.name} required errors={errors}>
                  <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <InputField labelName="อีเมล" name={field.name} errors={errors}>
                  <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <Controller
              name="username"
              control={control}
              rules={{ required: "กรุณากรอก Username" }}
              render={({ field, fieldState }) => (
                <InputField labelName="Username" name={field.name} required errors={errors}>
                  <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <Controller
              name="password"
              control={control}
              rules={{ required: "กรุณากรอก Password" }}
              render={({ field, fieldState }) => (
                <InputField labelName="Password" name={field.name} required errors={errors}>
                  <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>
          <div className="col-span-12 mb-2">
            <div className="mb-2 font-bold">กำหนดสิทธิ์ผู้ใช้งาน</div>
            <Controller
              name="roles"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex gap-2 justify-between items-center">
                  {roles.map((val: any) => (
                    <div className="flex gap-1" key={val.id}>
                      <Checkbox
                        inputId={`${field.name}-${val.id}`}
                        value={val.id}
                        checked={field.value?.some((item: any) => item.id === val.id)}
                        inputRef={field.ref}
                        className={classNames({ "p-invalid mr-1": fieldState.error })}
                        onChange={(e) => {
                          const newRoles: any[] = [...(field.value || [])];
                          const existingIndex = newRoles.findIndex((item) => item.id === val.id);

                          if (e.checked && existingIndex === -1) {
                            newRoles.push(val);
                          } else if (!e.checked && existingIndex !== -1) {
                            newRoles.splice(existingIndex, 1);
                          }

                          field.onChange(newRoles);
                        }}
                      />
                      <label htmlFor={`${field.name}-${val.id}`}>{val.label}</label>
                    </div>
                  ))}
                </div>
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

export default InputFormRole;
