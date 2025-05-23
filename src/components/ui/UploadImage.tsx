import { useRef, useState } from "react";
import { cn } from "../../utils/classname";
import Image from "./Image";

interface UploadImageProps {
  value?: string | null; // url or base64
  onChange?: (file: File | null, previewUrl: string | null) => void;
  error?: string;
  className?: string;
  wrapperClassName?: string;
  accept?: string;
  disabled?: boolean;
  previewSize?: number;
}

const UploadImage: React.FC<UploadImageProps> = ({
  value,
  onChange,
  error,
  className = "",
  wrapperClassName = "",
  accept = "image/*",
  disabled = false,
  previewSize = 120,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onChange?.(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onChange?.(null, null);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    onChange?.(null, null);
  };

  return (
    <div className={cn("mb-3", wrapperClassName)}>
      <div
        className={cn("d-flex flex-column align-items-center gap-3", className)}
      >
        <div
          style={{ width: previewSize, height: previewSize }}
          className="rounded bg-light d-flex align-items-center justify-content-center overflow-hidden border"
        >
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={previewSize}
              height={previewSize}
              style={{
                objectFit: "cover",
                width: previewSize,
                height: previewSize,
              }}
            />
          ) : (
            <span className="text-secondary small">No Image</span>
          )}
        </div>
        <div className="d-flex gap-2">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="form-control form-control-sm"
            style={{ width: 180 }}
            onChange={handleFileChange}
            disabled={disabled}
          />
          {preview && (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger w-fit"
              onClick={handleRemove}
              disabled={disabled}
            >
              Remove
            </button>
          )}
        </div>
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default UploadImage;
