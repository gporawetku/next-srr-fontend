import { InputField } from "@/components/Content";
import { useUpdateSEO } from "@/hooks/mutates/useMutateSEO";
import { MySwal, swalQuestionOption } from "@/libs/utils/Swal2Config";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { Controller, useForm } from "react-hook-form";

interface InputFormSEOProps {
  id?: any;
  initialData?: any | null;
}

const InputFormSEO = ({ id, initialData }: InputFormSEOProps) => {
  // --- router
  const router = useRouter();

  // --- initialData
  const { ...otherData }: any = initialData || {};

  // --- hook
  const update = useUpdateSEO(id);

  // --- useForm
  const defaultFormData: any = {
    title: otherData?.title || "",
    description: otherData?.description || "",
    keyword: otherData?.keyword || "",
    robot: otherData?.robot || "",
    googleBot: otherData?.google_bot || "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormData,
  });

  const onSubmit = (data: any) => {
    const newData: any = {
      title: data?.title || "",
      description: data?.description || "",
      keyword: data?.keyword || "",
      robot: data?.robot || "",
      google_bot: data?.googleBot || "",
    };

    MySwal.fire({ ...swalQuestionOption, title: "ยืนยันที่จะบันทึกข้อมูล" }).then((response) => {
      if (response.isConfirmed) {
        if (id) {
          update.mutate(newData, {
            onSuccess: (response) => {
              router.push("/seo");
            },
          });
        }
      }
    });
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
              name="keyword"
              rules={{ required: "กรุณากรอก Keyword" }}
              render={({ field, fieldState }) => (
                <InputField name={field.name} labelName="Keyword" required errors={errors}>
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
              <Button className="w-60" type="submit" severity="success" label="บันทึก" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default InputFormSEO;
