const ConvertImages = (images: any, index: number = 0, defaultImage: any = "/images/no-image.jpg") => {
  try {
    if (images?.length > 0 && images?.length > index) {
      return images[index]?.url || "";
    } else {
      return defaultImage;
    }
  } catch (error) {
    console.error(error);
    return "";
  }
};

const ConvertImagesBackground = (images: any, index: number = 0, defaultImage: any = "/images/no-image-4k.jpg") => {
  try {
    if (images?.length > 0 && images?.length > index) {
      return images[index]?.url || "";
    } else {
      return defaultImage;
    }
  } catch (error) {
    console.error(error);
    return "";
  }
};

export { ConvertImages, ConvertImagesBackground };
