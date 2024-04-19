const ImagePixles = (file: any) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      let data = {
        width: 0,
        height: 0,
        pixel: "",
      };

      reader.onload = function (event: any) {
        const img: any = new Image();
        img.onload = function () {
          data = {
            width: img.width,
            height: img.height,
            pixel: `${img.width}x${img.height}`,
          };
          resolve(data);
        };

        img.src = event.target.result;
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
      return null;
    }
  });
};

const getPixelForStr = (str: string, type: "height" | "width") => {
  if (!str) return 0;

  const pixels = str?.split("x")?.map(Number) || [];

  if (type === "height") {
    return pixels[1] || 0;
  } else if (type === "width") {
    return pixels[0] || 0;
  } else {
    return 0;
  }
};

const MbtoKb = (mb: number) => {
  return mb * 1024;
};

const MbtoByte = (mb: number) => {
  return mb * 1024 * 1024;
};

export { ImagePixles, MbtoKb, MbtoByte, getPixelForStr };
