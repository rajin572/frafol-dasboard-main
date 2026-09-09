/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Input, Typography } from "antd";
import React from "react";
import type { Rule } from "antd/es/form";
import { cn } from "../../lib/utils";

type TInputProps = {
  Typolevel?: 1 | 2 | 3 | 4 | 5;
  label?: React.ReactNode;
  name: string;
  rules?: Rule[] | undefined;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  value?: any;
  inputType?: "normal" | "password" | "textarea" | string;
  rows?: number;
  prefix?: React.ReactNode | null;
  suffix?: React.ReactNode | null;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  formItemClassName?: string;
};

const ReuseInput = ({
  Typolevel = 5,
  label,
  name,
  rules = [],
  type = "text",
  placeholder,
  autoComplete = "on",
  disabled,
  onChange,
  value,
  inputType = "normal",
  rows = 4,
  prefix,
  suffix,
  wrapperClassName,
  labelClassName,
  inputClassName,
  formItemClassName,
}: TInputProps) => {
  return (
    <div className={cn(wrapperClassName)}>
      {label && (
        <Typography.Title
          level={Typolevel}
          className={cn("!text-base-color !font-normal", labelClassName)}
        >
          {label}
        </Typography.Title>
      )}
      <Form.Item name={name} rules={rules} className={cn(formItemClassName)}>
        {inputType === "password" ? (
          <Input.Password
            prefix={prefix}
            suffix={suffix}
            value={value}
            onChange={onChange}
            className={cn(
              "!py-1.5 !px-3 !text-base !bg-[#EFEFEF] border !border-[#EFEFEF] outline-none !ring-0 !text-base-color rounded-lg",
              inputClassName
            )}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
          />
        ) : inputType === "textarea" ? (
          <Input.TextArea
            value={value}
            onChange={onChange}
            className={cn(
              "!py-1.5 !px-3 !text-base !bg-[#EFEFEF] border !border-[#EFEFEF] outline-none !ring-0 !text-base-color rounded-lg",
              inputClassName
            )}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
          />
        ) : (
          <Input
            prefix={prefix}
            suffix={suffix}
            value={value}
            onChange={onChange}
            className={cn(
              "!py-1.5 !px-3 !text-base !bg-[#EFEFEF] border !border-[#EFEFEF] outline-none !ring-0 !text-base-color rounded-lg",
              inputClassName
            )}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            autoComplete={autoComplete}
          />
        )}
      </Form.Item>
    </div>
  );
};

export default ReuseInput;
