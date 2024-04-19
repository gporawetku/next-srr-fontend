import { Button, ButtonProps } from "primereact/button";

interface ActionButtonProps extends ButtonProps {
  actionType: "info" | "edit" | "delete" | "cancel" | "save";
}

export default function ActionButton({ actionType, ...ButtonProps }: ActionButtonProps) {
  const actionBody = (actionType: any) => {
    switch (actionType) {
      case "info":
        ButtonProps = {
          ...ButtonProps,
          severity: "secondary",
          icon: "fa-solid fa-eye",
        };
        return ButtonProps;
      case "edit":
        ButtonProps = {
          ...ButtonProps,
          severity: "info",
          icon: "fa-solid fa-pen-to-square",
        };
        return ButtonProps;
      case "delete":
        ButtonProps = {
          ...ButtonProps,
          severity: "danger",
          icon: "fa-solid fa-trash-can",
        };
        return ButtonProps;
      case "cancel":
        ButtonProps = {
          ...ButtonProps,
          severity: "secondary",
          icon: "fa-solid fa-xmark-large",
        };
        return ButtonProps;
      case "save":
        ButtonProps = {
          ...ButtonProps,
          severity: "success",
          icon: "fa-solid fa-floppy-disk",
        };
        return ButtonProps;
      default:
        return ButtonProps;
    }
  };

  return (
    <>
      <Button type="button" size="small" {...actionBody(actionType)}></Button>
    </>
  );
}
