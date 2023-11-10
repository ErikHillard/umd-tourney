"use client";

import clsx from "clsx";

import { UseFormRegister } from "react-hook-form";

export default function Input({
  label,
  id,
  type = "text",
  required,
  register,
  errors,
  disabled,
  width = "",
  value = "",
  onChange,
}) {
  if (type === "checkbox") {
    return (
      <div>
        <label
          htmlFor={id}
          className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        "
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
        />
      </div>
    );
  }
  if (!register) {
    return (
      <div className={width}>
        {label && (
          <label
            htmlFor={id}
            className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        "
          >
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={clsx(
            `
          mt-2
          mb-4
          form-input
          block 
          w-full 
          rounded-md 
          border-0 
          py-1.5 
          text-gray-900 
          shadow-sm 
          ring-1 
          ring-inset 
          ring-gray-300 
          placeholder:text-gray-400 
          focus:ring-2 
          focus:ring-inset 
          focus:ring-sky-600 
          sm:text-sm 
          sm:leading-6`,
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    );
  }
  return (
    <div className={width}>
      <label
        htmlFor={id}
        className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        "
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        value={value}
        {...register(id, { required })}
        className={clsx(
          `
          mt-2
          mb-4
          form-input
          block 
          w-full 
          rounded-md 
          border-0 
          py-1.5 
          text-gray-900 
          shadow-sm 
          ring-1 
          ring-inset 
          ring-gray-300 
          placeholder:text-gray-400 
          focus:ring-2 
          focus:ring-inset 
          focus:ring-sky-600 
          sm:text-sm 
          sm:leading-6`,
          errors[id] && "focus:ring-rose-500",
          disabled && "opacity-50 cursor-default"
        )}
      />
    </div>
  );
}
