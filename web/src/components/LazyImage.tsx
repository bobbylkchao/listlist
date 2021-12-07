/**
 * LazyImage
 * @desc Custom image component, implemented and optimized by using Next.js Image. Have to configure the image domain in `next.config.js` if gonna use image from external.
 * @param {any} src source of the image, supports from local file or remote url
 * @param {string} alt alt attribute
 * @param {number} width width of image
 * @param {number} height height of image
 * @param {string} className (optional) class of image
 * @param {any} style (optional) styles of image
 */
import Image from "next/image";

const LazyImage = (params: {
  id?: string;
  src: any;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: any;
}) => {
  return(
    <Image
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAEAQMAAACTPww9AAAAA1BMVEXp6elXI8SMAAAACklEQVQI12OAAgAACAABod4++QAAAABJRU5ErkJggg=="
      {...params}
    />
  );
};

export default LazyImage;
