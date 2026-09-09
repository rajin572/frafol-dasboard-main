/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { DatePicker } from "antd";
import { Typography, Form } from "antd";
import { Rule } from "antd/es/form";
import { CiCalendarDate } from "react-icons/ci";
import { cn } from "../../lib/utils";

interface ReuseDatePickerProps {
  label?: React.ReactNode;
  name: string;
  rules?: Rule[];
  value?: any;
  onChange?: (date: any, dateString: string | string[]) => void; // Updated type for onChange
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  format?: string;
  placeholder?: string;
  labelClassName?: string;
  wrapperClassName?: string;
}

const ReuseDatePicker = ({
  label,
  name,
  rules,
  value,
  onChange,
  disabled = false,
  className,
  style,
  format = "MM-DD-YYYY",
  placeholder = "Select date",
  labelClassName,
  wrapperClassName,
}: ReuseDatePickerProps) => {
  const disabledDate = (current: any) => {
    // Disable all dates before today (including past months and years)
    return current && current < new Date().setHours(0, 0, 0, 0); // Disable past dates
  };

  return (
    <div className={cn(wrapperClassName)}>
      {label && (
        <Typography.Title
          level={5}
          className={cn("!text-base-color !font-normal", labelClassName)}
        >
          {label}
        </Typography.Title>
      )}
      <Form.Item name={name} rules={rules}>
        <DatePicker
          suffixIcon={<CiCalendarDate className="text-[#D0D5DD]" />}
          value={value}
          onChange={(date, dateString) => {
            if (onChange) {
              onChange(date, dateString); // Handle both string and string[] for dateString
            }
          }}
          disabled={disabled}
          className={cn(
            "!py-1.5 !px-3 !text-lg !bg-[#EFEFEF] border !border-[#EFEFEF] !text-base-color rounded-lg w-full",
            className
          )}
          style={style}
          format={format}
          placeholder={placeholder}
          disabledDate={disabledDate} // Disable previous dates, months, and years
        />
      </Form.Item>
    </div>
  );
};

export default ReuseDatePicker;
