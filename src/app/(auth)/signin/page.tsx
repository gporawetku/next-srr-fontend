"use client";

import { InputField } from "@/components/Content";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const SignIn = () => {
  // --- router
  const router = useRouter();

  // --- state
  const [errorMessage, setErrorMessage] = useState("");

  // --- login
  const login = useMutation({
    mutationFn: (data: any) =>
      signIn("credentials", {
        redirect: false,
        email: data?.email,
        password: data?.password,
      }),
    onSuccess: (response: any) => {
      if (response.ok) {
        router.push("/");
      }
      if (response.status === 401) {
        setErrorMessage("กรุณากรอก email และ password ให้ถูกต้อง");
      }
    },
    onError(error: any, variables, context) {
      console.error(error);
      if (error.status === 401) {
        setErrorMessage("กรุณากรอก email และ password ให้ถูกต้อง");
      }
    },
  });

  // --- useForm
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    login.mutate({ email: data.email, password: data.password });
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border w-[80vw] md:w-[30vw] rounded-md p-10">
            <div className="border-b pb-2 mb-5">
              <div className="font-bold">สามารถลงชื่อเข้าใช้เฉพาะ Admin เท่านั้น!</div>
            </div>
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12">
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: "กรุณากรอก Email" }}
                  render={({ field, fieldState }) => (
                    <>
                      <InputField name={field.name} labelName="Email" errors={errors}>
                        <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                      </InputField>
                    </>
                  )}
                />
              </div>
              <div className="col-span-12">
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: "กรุณากรอก Password" }}
                  render={({ field, fieldState }) => (
                    <>
                      <InputField name={field.name} labelName="Password" errors={errors}>
                        <InputText type="password" id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                      </InputField>
                    </>
                  )}
                />
              </div>
              <div className="col-span-12">{errorMessage && <small className="text-red-500">{errorMessage}</small>}</div>
              <div className="col-span-12">
                <button type="submit" className="p-2 bg-[#EF4036] text-white w-full rounded-md">
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
