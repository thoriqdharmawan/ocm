import { useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  blurDataURL?: string;
  placeholder?: "blur" | "empty";
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  style = {},
  blurDataURL,
  placeholder = "empty",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const blurStyles: React.CSSProperties = blurDataURL && !isLoaded && placeholder === "blur"
    ? {
        filter: "blur(20px)",
        transition: "opacity 0.3s ease",
        objectFit: style.objectFit || "cover",
        ...style,
      }
    : { ...style };

  return (
    <div
      style={{
        position: "relative",
        width: width || "auto",
        height: height || "auto",
        display: "inline-block",
      }}
      className={className}
    >
      {blurDataURL && placeholder === "blur" && !isLoaded && (
        <img
          src={blurDataURL}
          alt={alt}
          style={{
            ...blurStyles,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          ...style,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
          position: "relative",
          zIndex: 2,
        }}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"

        {...props}
      />
    </div>
  );
};

export default Image;
