const ErrorMessageBasic = ({ errors, name }: { errors: any; name: string }) => {
  if (errors && name) {
    return errors[name] && <small className="p-error">{(errors[name] as any)?.message || ""}</small>;
  }
};

export { ErrorMessageBasic };
