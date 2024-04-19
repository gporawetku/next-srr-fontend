import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const MySwal = withReactContent(Swal);

export const swalWarningOption: SweetAlertOptions = {
  icon: "warning",
  title: `ใช่ หรือ ไม่`,
  reverseButtons: true,
  showConfirmButton: true,
  confirmButtonText: `<i class="fa-sharp fa-solid fa-circle-check"></i> ตกลง`,
  showCancelButton: true,
  cancelButtonText: `<i class="fa-solid fa-circle-xmark"></i> ยกเลิก`,
  customClass: {
    actions: "!w-full",
    confirmButton: "!bg-green-600 !min-w-[40%]",
    cancelButton: "!bg-red-100 !text-red-500 !min-w-[40%]",
  },
};

export const swalQuestionOption: SweetAlertOptions = {
  icon: "question",
  title: `ใช่ หรือ ไม่`,
  reverseButtons: true,
  showConfirmButton: true,
  confirmButtonText: `<i class="fa-sharp fa-solid fa-circle-check"></i> ตกลง`,
  showCancelButton: true,
  cancelButtonText: `<i class="fa-solid fa-circle-xmark"></i> ยกเลิก`,
  customClass: {
    actions: "!w-full",
    confirmButton: "!bg-green-600 !min-w-[40%]",
    cancelButton: "!bg-red-100 !text-red-500 !min-w-[40%]",
  },
};

export const swalInfoOption: SweetAlertOptions = {
  icon: "info",
  title: `ใช่ หรือ ไม่`,
  reverseButtons: true,
  showConfirmButton: true,
  confirmButtonText: `<i class="fa-sharp fa-solid fa-circle-check"></i> ตกลง`,
  showCancelButton: true,
  cancelButtonText: `<i class="fa-solid fa-circle-xmark"></i> ยกเลิก`,
  customClass: {
    actions: "!w-full",
    confirmButton: "!bg-green-600 !min-w-[40%]",
    cancelButton: "!bg-red-100 !text-red-500 !min-w-[40%]",
  },
};

export const swalSuccessOption: SweetAlertOptions = {
  icon: "success",
  title: "เสร็จสิ้น",
  showConfirmButton: false,
  timer: 1500,
};

export const swalErrorOption: SweetAlertOptions = {
  icon: "error",
  title: "ล้มเหลว",
  showConfirmButton: false,
  timer: 1500,
};

export const swlPreConfirmOption: SweetAlertOptions = {
  icon: "info",
  title: "ยืนยันที่จะลบข้อมูล",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "ยืนยัน",
  cancelButtonText: "ยกเลิก",
  showLoaderOnConfirm: true,
  heightAuto: false,
  returnFocus: false,
};
