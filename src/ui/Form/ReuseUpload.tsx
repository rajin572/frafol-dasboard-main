"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Upload, Typography } from "antd";
import { TbCloudUpload } from "react-icons/tb";
import ReuseButton from "../Button/ReuseButton";
import { cn } from "../../lib/utils";

type TUploadProps = {
  Typolevel?: 1 | 2 | 3 | 4 | 5;
  label?: React.ReactNode;
  name: string;
  rules?: Array<Record<string, any>>;
  buttonText?: string;
  accept?: string;
  maxCount?: number;
  children?: React.ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
  uploadClassName?: string;
};

const ReuseUpload = ({
  Typolevel = 5,
  label,
  name,
  rules = [],
  buttonText = "Upload",
  accept = "image/*",
  maxCount = 1,
  children = (
    <div className="!w-full min-w-[300px] lg:min-w-[410px] border-dashed border-2 border-secondary-color rounded-md min-h-[200px] flex flex-col items-center justify-center gap-2">
      <TbCloudUpload className="size-5 text-secondary-color" />
      <p className="text-secondary-color text-base sm:text-lg lg:text-xl font-semibold">
        {buttonText}
      </p>
      <ReuseButton
        variant="secondary"
        className="!text-sm sm:!text-base lg:!text-lg !py-4 w-fit "
      >
        Browse File
      </ReuseButton>
    </div>
  ),
  wrapperClassName,
  labelClassName,
  uploadClassName,
}: TUploadProps) => {
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
      <Form.Item
        name={name}
        rules={rules}
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
      >
        <Upload
          customRequest={(options) => {
            setTimeout(() => {
              if (options.onSuccess) {
                options.onSuccess("ok");
              }
            }, 1000);
          }}
          maxCount={maxCount}
          accept={accept}
          listType="picture"
          className={cn(uploadClassName)}
        >
          {children}
        </Upload>
      </Form.Item>
    </div>
  );
};

export default ReuseUpload;
