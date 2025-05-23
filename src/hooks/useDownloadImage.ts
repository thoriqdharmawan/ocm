import { useRef } from "react";
import { toPng } from "html-to-image";

export const useDownloadImage = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const downloadImage = async (fileName: string = "download.png") => {
    if (elementRef.current) {
      const clone = elementRef.current.cloneNode(true) as HTMLDivElement;
      document.body.appendChild(clone);

      clone.style.width = "798px";
      clone.style.height = "306px";

      const button = clone.querySelector("#button-download-customer");
      if (button && button instanceof HTMLElement) {
        button.style.display = "none";
      }

      try {
        const dataUrl = await toPng(clone, {
          canvasHeight: 306 * 1.5,
          canvasWidth: 798 * 1.5,
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
