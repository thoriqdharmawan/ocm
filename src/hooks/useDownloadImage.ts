import { useRef } from "react";
import { toPng } from "html-to-image";

interface UseDownloadImage {
  width: number;
  height: number;
  multiplier?: number;
  removeElement?: string;
}

export const useDownloadImage = (props: UseDownloadImage) => {
  const { width, height, multiplier = 1.5, removeElement } = props;

  const elementRef = useRef<HTMLDivElement>(null);

  const downloadImage = async (fileName: string = "download.png") => {
    if (elementRef.current) {
      const clone = elementRef.current.cloneNode(true) as HTMLDivElement;
      document.body.appendChild(clone);

      clone.style.width = `${width}px`;
      clone.style.height = `${height}px`;

      if (removeElement) {
        const elementToRemove = clone.querySelector(removeElement);
        if (elementToRemove && elementToRemove instanceof HTMLElement) {
          elementToRemove.remove();
        }
      }

      try {
        const dataUrl = await toPng(clone, {
          canvasWidth: width * multiplier,
          canvasHeight: height * multiplier,
          quality: 1,
          style: {
            width: "100%",
            height: "100%",
          },
        });

        const link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      } finally {
        document.body.removeChild(clone);
      }
    }
  };

  return { elementRef, downloadImage };
};
