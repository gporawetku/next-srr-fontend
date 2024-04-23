import { InputField } from "@/components/Content";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { Controller, useForm } from "react-hook-form";

const InputFormSEO = () => {
  // --- router
  const router = useRouter();

  // --- useForm
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12">
            <Controller
              control={control}
              name="title"
              rules={{ required: "กรุณากรอก Title" }}
              render={({ field, fieldState }) => (
                <InputField name={field.name} labelName="Title" required errors={errors}>
                  <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>

          <div className="col-span-12">
            <Controller
              control={control}
              name="description"
              rules={{ required: "กรุณากรอก description" }}
              render={({ field, fieldState }) => (
                <InputField name={field.name} labelName="description" required errors={errors}>
                  <InputTextarea id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>

          <div className="col-span-12">
            <Controller
              control={control}
              name="keywords"
              rules={{ required: "กรุณากรอก Keywords" }}
              render={({ field, fieldState }) => (
                <InputField name={field.name} labelName="Keywords" required errors={errors}>
                  <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>

          <div className="col-span-12 ">
            <Controller
              control={control}
              name="robot"
              rules={{ required: "กรุณากรอก robot" }}
              render={({ field, fieldState }) => (
                <InputField name={field.name} labelName="robot" required errors={errors}>
                  <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
              )}
            />
          </div>

          <div className="col-span-12">
            <Controller
              control={control}
              name="googleBot"
              rules={{ required: "กรุณากรอก google bot" }}
              render={({ field, fieldState }) => (
                <InputField name={field.name} labelName="google bot" required errors={errors}>
                  <InputText id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} className={classNames("w-full", { "p-invalid": fieldState.error })} />
                </InputField>
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

export default InputFormSEO;
