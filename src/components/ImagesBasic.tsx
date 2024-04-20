import { ConvertImages, ConvertImagesBackground } from "@/libs/utils/ConvertImage";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImagesBasicProp {
  images: any;
  height: number;
  width: number;
  alt: string;
  style?: any;
  className?: any;
  defaultImage?: any;
  index?: number;
  priority?: any;
}

interface ImagesGalleryBasicProp {
  images: any;
  height: number;
  width: number;
  alt: string;
  style?: any;
  className?: any;
}

interface ImagesGallerySubBasicProp {
  src: any;
  height: number;
  width: number;
  alt: string;
  style?: any;
  className?: any;
  refs?: any;
  hendleOnClick?: any;
}

const ImagesBasic = ({ images, height, width, alt, style, className, defaultImage = "/images/no-image.jpg", index, priority }: ImagesBasicProp) => {
  const [src, setSrc] = useState(ConvertImages(images, index, defaultImage));

  const handleImageError = () => {
    setSrc(defaultImage);
  };

  useEffect(() => {
    setSrc(ConvertImages(images, index, defaultImage));
  }, [images, index, defaultImage]);

  return <Image height={height} width={width} src={src} alt={alt} style={style} className={className} onError={handleImageError} priority={priority} loading="lazy" />;
};

const ImagesBackgroundBasic = ({ images, height, width, alt, style, className, defaultImage = "/images/no-image-4k.jpg", index, priority }: ImagesBasicProp) => {
  const [src, setSrc] = useState(ConvertImagesBackground(images, index, defaultImage));

  const handleImageError = () => {
    setSrc(defaultImage);
  };

  useEffect(() => {
    setSrc(ConvertImages(images, index, defaultImage));
  }, [images, index, defaultImage]);

  return <Image height={height} width={width} src={src} alt={alt} style={style} className={className} onError={handleImageError} priority={priority} loading="lazy" />;
};

export { ImagesBasic, ImagesBackgroundBasic };
