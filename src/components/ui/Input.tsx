import React from "react";
import { cn } from "../../utils/classname";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      wrapperClassName = "",
      helperText = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn(wrapperClassName)}>
        <input
          ref={ref}
          className={cn(
            "form-control fw-light",
            error && "is-invalid",
            "focus-none",
            className
          )}
          {...props}
        />
        {error && <div className="invalid-feedback">{error}</div>}
        {helperText && (
          <div className="fs-7 color-body-secondary mt-1 fw-light">
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
