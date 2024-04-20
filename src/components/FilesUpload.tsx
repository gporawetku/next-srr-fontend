"use client";

import { uploadFiles } from "@/servers/api/dataSetting";
import Image from "next/image";
import { Badge } from "primereact/badge";
import { FileUpload } from "primereact/fileupload";
import { useEffect, useRef, useState } from "react";
import { MySwal, swalErrorOption, swalSuccessOption, swlPreConfirmOption } from "@/libs/utils/Swal2Config";
import { getPixelForStr, ImagePixles, MbtoByte } from "@/libs/utils/ImagePixels";

interface filesUploadProps {
  oldFiles?: any;
  setData?: any;
  setRemove?: any;
  destination?: any;
  limitSize?: number;
  limitPixel?: string;
}

interface photoUploadProps {
  oldData?: any;
  setData?: any;
  destination?: any;
  limitSize?: number;
  limitPixel?: string;
}

interface PhotoFieldArrayUploadProps {
  index?: any;
  list?: any;
  destination?: any;
  update?: any;
  limitSize?: number;
  limitPixel?: string;
}

const FilesUpload = ({ oldFiles, setData, setRemove, destination, limitSize = 2, limitPixel = "1920x600" }: filesUploadProps) => {
  // --- ref fileUpload
  const fileUploadRef: any = useRef(null);

  // --- state
  const [listFiles, setListFile] = useState<any>([]);
  const [removeFiles, setRemoveFile] = useState<any>([]);

  //  --- thumbnail for type
  const thumbnailForType = (file: any) => {
    const fileExtension = file?.name?.split(".").pop()?.toLowerCase();

    if (["jpg", "jpeg", "png", "web"].includes(fileExtension)) {
      return <Image src={file?.objectURL || ""} alt="image" width={50} height={50} loading="lazy" />;
    } else if (fileExtension === "pdf") {
      return <i className="fa-solid fa-file-pdf text-lg"></i>;
    } else if (["xls", "xlsx"].includes(fileExtension)) {
      return <i className="fa-solid fa-file-excel text-lg"></i>;
    } else if (fileExtension === "docx") {
      return <i className="fa-solid fa-file-word text-lg"></i>;
    } else if (fileExtension && fileExtension.startsWith("video")) {
      return <i className="fa-solid fa-video text-lg"></i>;
    } else {
      return <i className="fa-solid fa-file text-lg"></i>;
    }
  };

  // --- convert byte to MB
  const bytesToMB = (bytes: any) => {
    return (bytes / (1024 * 1024)).toFixed(3);
  };

  // --- convert format files
  const formattedFiles = (data: any) => {
    return data.map((fileData: any) => {
      return {
        objectURL: fileData?.url || "",
        name: fileData?.filename || "",
        url: fileData?.url || "",
        filename: fileData?.filename || "",
        status: "completed",
      };
    });
  };

  // --- open file
  const open = (url: string) => {
    window.open(url);
  };

  const cutFileName = (name: string) => {
    const maxLength = 20;
    let result = name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
    return result || "";
  };

  // --- handler
  const upload = async (files: any) => {
    try {
      let newFiles: any = [];
      newFiles = await sendFiles(files);

      const updatedList = listFiles.concat(newFiles);

      setListFile(updatedList);
      fileUploadRef?.current?.clear();
      fileUploadRef?.current?.setUploadedFiles(formattedFiles(updatedList));

      setData(updatedList);
    } catch (error) {
      console.error(error);
    }
  };

  const sendFiles = async (files: any) => {
    try {
      const formData = new FormData();
      formData.append("destination", destination);

      files.forEach((file: any) => {
        formData.append(`files`, file);
      });

      const response = await uploadFiles(formData);

      if (response) {
        let data: any = response || [];
        let newLists: any = [];

        newLists = data.map((val: any) => ({
          filename: val?.filename || "",
          url: val?.url || "",
          name: val?.name || "",
        }));

        return newLists || [];
      } else {
        return [];
      }
    } catch (error) {
      console.error("File upload error:", error);
      return [];
    }
  };

  const remove = (file: any) => {
    if (file.status === "completed") {
      // add remove
      const removeFile = listFiles.find((val: any) => val.filename === file.name);

      // remove uploaded
      const updatedFiles: any = listFiles.filter((val: any) => val.filename !== file.name) || [];
      fileUploadRef?.current?.setUploadedFiles(formattedFiles(updatedFiles));
      setListFile(updatedFiles);

      if (removeFile) {
        if (!removeFiles.some((rf: any) => rf.filename === removeFile.filename)) {
          const removeAll = [...removeFiles, removeFile];
          setRemoveFile(removeAll);
          if (updatedFiles.length == 0) {
            setRemove([]);
          } else {
            setRemove(removeAll);
          }
        }
      }

      setData(updatedFiles);
    } else {
      const files: any = fileUploadRef?.current?.getFiles() || [];
      const newFiles: any = files.filter((val: any) => val.name !== file.name) || [];
      fileUploadRef?.current?.setFiles(newFiles);
    }
  };

  useEffect(() => {
    if (oldFiles?.length > 0) {
      fileUploadRef?.current?.setUploadedFiles(formattedFiles(oldFiles));
      setListFile(oldFiles);
    }
  }, [oldFiles, setData]);

  return (
    <>
      <FileUpload
        ref={fileUploadRef}
        maxFileSize={MbtoByte(limitSize)}
        accept="image/jpeg,image/png,image/jpg,image/webp"
        name="files[]"
        multiple
        customUpload
        uploadHandler={({ files }) => {
          upload(files);
        }}
        onSelect={async (e) => {
          try {
            const chosenFiles = e?.files || [];
            const currentFiles = fileUploadRef?.current?.getFiles() || [];
            const newFiles = currentFiles.slice();

            const filterPromises = chosenFiles.map(async (file) => {
              const isNewFile = newFiles.every((f: any) => f.name !== file.name);
              const pixel: any = await ImagePixles(file);

              if (!isNewFile || pixel?.pixel !== limitPixel) return;

              newFiles.push(file);
            });

            await Promise.all(filterPromises);

            fileUploadRef?.current?.setFiles(newFiles);
          } catch (error) {
            console.error(error);
          }
        }}
        contentStyle={{ backgroundColor: "hsl(210, 33%, 96%, 1)", border: "1px solid rgb(229 231 235)", borderTop: "0", overflowY: "auto", maxHeight: "400px" }}
        chooseOptions={{ icon: "pi pi-fw pi-plus", iconOnly: false, className: "custom-choose-btn p-button-outlined", label: "เลือกไฟล์" }}
        uploadOptions={{ icon: "fa-solid fa-upload", iconOnly: false, className: "p-button-success", label: "อัปโหลดไฟล์" }}
        headerTemplate={(options: any) => {
          const { className, chooseButton, uploadButton, cancelButton } = options;
          return (
            <div className="flex gap-2 rounded-t-md border border-gray-200 bg-white p-2" style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}>
              {chooseButton}
              {uploadButton}
            </div>
          );
        }}
        itemTemplate={(file: any, options: any) => {
          return (
            <>
              <div key={file.name}>
                <div className="grid grid-cols-12 w-full hover:bg-gray-200 g-0" title={file.name}>
                  <div className="col-span-12 md:col-span-8">
                    <div className="flex items-center p-2">
                      {thumbnailForType(file)}
                      <div className="text-left ml-2">
                        <div>{cutFileName(file.name)}</div>
                        <div className="flex p-2">{file?.status === "completed" ? <Badge value="Completed" severity="success"></Badge> : <Badge value="Pending" severity="warning"></Badge>}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    {file?.status === "completed" && (
                      <button
                        type="button"
                        className="p-button p-component p-button-icon-only p-button-text p-button-rounded p-button-success"
                        onClick={() => {
                          open(file?.objectURL);
                        }}
                      >
                        <i className="pi pi-download text-success"></i>
                      </button>
                    )}
                    <button
                      type="button"
                      className="p-button p-component p-button-icon-only p-button-text p-button-rounded p-button-danger"
                      onClick={() => {
                        remove(file);
                      }}
                    >
                      <i className="pi pi-times text-danger"></i>
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        }}
        emptyTemplate={(props: any) => {
          return (
            <>
              <div className="text-center">
                <div className="text-5xl text-gray-500 mb-2">
                  <i className="fa-solid fa-arrow-up-to-line"></i>
                </div>
                <div className="text-xl font-bold">คลิกเพื่ออัปโหลดรูปภาพ</div>
                <div className="text-sm">รูปภาพต้องอยู่ในรูปแบบ JPEG JPG PNG และ WEBP</div>
                <div className="text-sm">
                  และมีขนาด {limitPixel} ขนาดไม่เกิน {limitSize} MB
                </div>
              </div>
            </>
          );
        }}
      />
    </>
  );
};

const PhotoUpload = ({ oldData, setData, destination, limitSize = 2, limitPixel = "1920x600" }: photoUploadProps) => {
  // --- state
  const [image, setImage] = useState(oldData?.url || "");
  const [height, setHeight] = useState(getPixelForStr(limitPixel, "height"));
  const [width, setWidth] = useState(getPixelForStr(limitPixel, "width"));

  // --- open file
  const open = (url: string) => {
    window?.open(url);
  };

  // --- handle
  const handleUpload = () => {
    let input = document.createElement("input");

    input.type = "file";
    input.accept = "image/jpeg,image/png,image/jpg,image/webp";

    input.onchange = async (e: any) => {
      let file = e?.target?.files[0] || "";
      let size: number = file?.size || 0;

      if (!file) {
        MySwal.fire({ ...swalErrorOption, title: "อัปโหลดรูปไม่สำเร็จ" });
        return;
      }

      if (size > MbtoByte(limitSize)) {
        MySwal.fire({ ...swalErrorOption, title: "ขนาดไฟล์ใหญ่เกินขนาดที่กำหนด" });
        return;
      }

      const pixel: any = await ImagePixles(file);
      if (pixel?.pixel !== limitPixel) {
        MySwal.fire({ ...swalErrorOption, title: "ขนาดภาพไม่ถูกต้อง", text: `ขนาดภาพที่กำหนดคือ ${limitPixel} แต่ภาพของคุณ ${pixel?.pixel}` });
        return;
      }

      MySwal.fire({
        ...swlPreConfirmOption,
        title: "ยืนยันที่จะเลือกรูปนี้",
        preConfirm: (e) => {
          return new Promise(async function (resolve) {
            if (file) {
              const newData = await sendFiles(file);

              if (newData) {
                setData(newData);
                setImage(newData?.url || "");
                MySwal.fire({ ...swalSuccessOption, title: "อัปโหลดรูปสำเร็จ" });
              } else {
                MySwal.fire({ ...swalErrorOption, title: "อัปโหลดรูปไม่สำเร็จ" });
              }
            } else {
              MySwal.fire({ ...swalErrorOption, title: "อัปโหลดรูปไม่สำเร็จ" });
            }
          });
        },
      });
    };

    input.click();
  };

  const handleUpload2 = async (event: any) => {
    try {
      const file = event?.target?.files[0] || "";
      if (file) {
        const newData = await sendFiles(file);

        if (newData) {
          setData(newData);
          setImage(newData?.url || "");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendFiles = async (files: any) => {
    try {
      const formData = new FormData();
      formData.append("destination", destination);
      formData.append(`files`, files);

      const response = await uploadFiles(formData);

      if (response) {
        let data: any = response || [];
        let newLists: any = data[0] ?? "";

        return newLists || false;
      } else {
        return [];
      }
    } catch (error) {
      console.error("File upload error:", error);
      return false;
    }
  };

  const deletImage = () => {
    setData("");
    setImage("");
  };

  return (
    <>
      <div className="profile-box relativeflex flex-col items-center">
        <div className="relative overflow-hidden mb-2">
          <div className="file-upload-image-box">
            {image && (
              <>
                <Image width={width} height={height} src={image || ""} alt="profile avatar" loading="lazy" />
                <div className="file-upload-btn-box flex gap-1">
                  <button type="button" className="file-upload-btn-delete" onClick={deletImage}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <button type="button" className="file-upload-btn-open" onClick={() => open(image)}>
                    <i className="fa-regular fa-eye"></i>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
            <p className="text-sm">
              รูปภาพต้องอยู่ในรูปแบบ JPEG JPG PNG และ WEBP และมีขนาด {limitPixel} ขนาดไม่เกิน {limitSize} MB
            </p>
          </div>
          <div className="col-span-6 flex">
            <button
              type="button"
              className="file-upload-btn-choose"
              onClick={() => {
                handleUpload();
              }}
            >
              เลือกไฟล์
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const PhotoFieldArrayUpload = ({ index, list, destination, update, limitSize = 2, limitPixel = "1920x600" }: PhotoFieldArrayUploadProps) => {
  // --- state
  const [image, setImage] = useState(list?.length > 0 ? list[0]?.url : "");
  const [height, setHeight] = useState(getPixelForStr(limitPixel, "height"));
  const [width, setWidth] = useState(getPixelForStr(limitPixel, "width"));

  // --- open file
  const open = (url: string) => {
    window?.open(url);
  };

  // --- handle
  const handleUpload = () => {
    let input = document.createElement("input");

    input.type = "file";
    input.accept = "image/jpeg,image/png,image/jpg,image/webp";

    input.onchange = async (e: any) => {
      let file = e?.target?.files[0] || "";
      let size: number = file?.size || 0;

      if (!file) {
        MySwal.fire({ ...swalErrorOption, title: "อัปโหลดรูปไม่สำเร็จ" });
        return;
      }

      if (size > MbtoByte(limitSize)) {
        MySwal.fire({ ...swalErrorOption, title: "ขนาดไฟล์ใหญ่เกินขนาดที่กำหนด" });
        return;
      }

      const pixel: any = await ImagePixles(file);
      if (pixel?.pixel !== limitPixel) {
        MySwal.fire({ ...swalErrorOption, title: "ขนาดภาพไม่ถูกต้อง", text: `ขนาดภาพที่กำหนดคือ ${limitPixel} แต่ภาพของคุณ ${pixel?.pixel}` });
        return;
      }

      MySwal.fire({
        ...swlPreConfirmOption,
        title: "ยืนยันที่จะเลือกรูปนี้",
        preConfirm: (e) => {
          return new Promise(async function (resolve) {
            if (file) {
              const newData = await sendFiles(file);
              if (newData) {
                setImage(newData?.url || "");
                update(index, [newData]);
                MySwal.fire({ ...swalSuccessOption, title: "อัปโหลดรูปสำเร็จ" });
              } else {
                MySwal.fire({ ...swalErrorOption, title: "อัปโหลดรูปไม่สำเร็จ" });
              }
            } else {
              MySwal.fire({ ...swalErrorOption, title: "อัปโหลดรูปไม่สำเร็จ" });
            }
          });
        },
      });
    };

    input.click();
  };

  const sendFiles = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append("destination", destination);
      formData.append(`files`, file);

      const response = await uploadFiles(formData);

      if (response) {
        let data: any = response || [];
        let newLists: any = data[0] ?? "";

        return newLists || false;
      } else {
        return [];
      }
    } catch (error) {
      console.error("File upload error:", error);
      return false;
    }
  };

  const deletImage = () => {
    update(index, []);
    setImage("");
  };

  return (
    <>
      <div className="profile-box relativeflex flex-col items-center">
        <div className="relative overflow-hidden">
          <div className="file-upload-image-box">
            {image && (
              <>
                <Image width={width} height={height} src={image || ""} alt="profile avatar" loading="lazy" />
                <div className="file-upload-btn-box flex gap-1">
                  <button type="button" className="file-upload-btn-delete" onClick={deletImage}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <button type="button" className="file-upload-btn-open" onClick={() => open(image)}>
                    <i className="fa-regular fa-eye"></i>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
            <p className="text-sm">
              รูปภาพต้องอยู่ในรูปแบบ JPEG JPG PNG และ WEBP และมีขนาด {limitPixel} ขนาดไม่เกิน {limitSize} MB
            </p>
          </div>
          <div className="col-span-6 flex">
            <button
              type="button"
              className="file-upload-btn-choose"
              onClick={() => {
                handleUpload();
              }}
            >
              เลือกไฟล์
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { FilesUpload, PhotoUpload, PhotoFieldArrayUpload };
