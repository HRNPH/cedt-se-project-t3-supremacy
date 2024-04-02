import { twMerge } from "tailwind-merge";
import { Required } from "../Required";
import { type TextInput } from "../TextInput";
import { useRef } from "react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "title" | "ref">,
    TextInput {
  parentClassName?: string;
  children?: React.ReactNode;
  labelClassName?: string;
  titleClassName?: string;
}

export const Input = ({
  label,
  title,
  inheritTitle,
  description,
  required = false,
  className,
  type = "text",
  submitted,
  parentClassName,
  labelClassName,
  titleClassName,
  children,
  ...props
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <label className={twMerge("flex w-full flex-col", labelClassName)}>
      {title && (
        <p className={twMerge("mb-2 text-sm font-medium", titleClassName)}>
          <Required required={required}>{title}</Required>
        </p>
      )}
      <div
        className={twMerge(
          "flex w-full cursor-text overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 focus:outline-none",
          submitted &&
            inputRef.current?.value === "" &&
            "[&:not(:focus-within)]:border-red-600",
          parentClassName,
        )}
      >
        <input
          ref={inputRef}
          className={twMerge(
            `w-full border-0 p-0 py-2 pl-3 pr-1.5 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm`,
            className,
          )}
          name={title}
          type={type}
          placeholder={inheritTitle ? title : label}
          required={required}
          {...props}
        />
        {children}
      </div>
      {description && (
        <p className="mt-1.5 pr-5 text-xs leading-4 text-gray-500">
          {description}
        </p>
      )}
    </label>
  );
};
