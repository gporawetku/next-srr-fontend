"use client";
import { classNames } from "primereact/utils";
import { ReactNode } from "react";
import { ErrorMessageBasic } from "../common/ErrorMessage";

export interface InputFieldProp {
  name: any;
  children?: ReactNode;
  className?: any;
  labelName?: any;
  required?: boolean;
  errors?: any;
}

const InputField = ({ children, className, name, labelName, required = false, errors }: InputFieldProp) => {
  return (
    <>
      <div className={classNames(className, "flex flex-col gap-1")}>
        <div className="flex gap-2">
          {labelName && (
            <label htmlFor={name} className="font-medium">
              {labelName}
            </label>
          )}
          {required && <span className="text-red-500">*</span>}
        </div>
        <div>{children}</div>
        {errors && <ErrorMessageBasic errors={errors} name={name} />}
      </div>
    </>
  );
};

export default InputField;
