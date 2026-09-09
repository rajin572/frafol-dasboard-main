/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from "react";
import ReuseInput from "./ReuseInput";
import { SearchOutlined } from "@ant-design/icons";

interface ReuseSearchInputProps {
  placeholder: string;
  setSearch: (value: string) => void;
  setPage: (page: number) => void;
}

const ReuseSearchInput: React.FC<ReuseSearchInputProps> = ({
  placeholder,
  setSearch,
  setPage,
}) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    debounceSearch(e.target.value);
  };

  const debounceSearch = debounce((value: string) => {
    setSearch(value);
  }, 500);

  function debounce<T extends (...args: any[]) => void>(
    this: void, // Explicitly type `this` as `void`
    func: T,
    wait: number
  ) {
    let timeout: any;
    return function (...args: Parameters<T>) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait); // Use spread operator for arguments
    };
  }

  return (
    <ReuseInput
      name="search"
      type="text"
      autoComplete="off"
      placeholder={placeholder}
      onChange={handleSearch}
      formItemClassName="!mb-0"
      inputClassName="!bg-primary-color !text-base-color !border-[#E1E1E1]"
      prefix={<SearchOutlined className="text-[#667185] text-xl mr-2" />}
    />
  );
};

export default ReuseSearchInput;
