/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, Select } from "antd";
import { useEffect, useState } from "react";

// Define types for the props
interface YearOptionProps {
  currentYear: number;
  setThisYear: (year: any) => void; // Function to set the selected year
}

interface YearOption {
  value: string;
  label: string;
}

const YearOption: React.FC<YearOptionProps> = ({
  currentYear,
  setThisYear,
}) => {
  const [yearOptions, setYearOptions] = useState<YearOption[]>([]); // Type state as an array of YearOption objects

  useEffect(() => {
    const startYear = 2020;
    const yearRange: YearOption[] = [];

    // Add the years to the list
    for (let i = startYear; i <= currentYear; i++) {
      yearRange.push({ value: i.toString(), label: i.toString() });
    }

    setYearOptions(yearRange);
  }, [currentYear]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorTextQuaternary: "#AD2B08",
            fontSize: 16,
            borderRadius: 10,
            colorBorder: "#FFFFFF",
            colorText: "#2c2c2c",
            colorIcon: "#AD2B08",
            colorBgContainer: "rgba(0,0,0,0)",
            colorBgElevated: "#FFFFFF",
            selectorBg: "#FFFFFF",
            colorTextPlaceholder: "#2c2c2c",
            optionSelectedColor: "#ffffff",
            optionSelectedBg: "#AD2B08",
            optionActiveBg: "#20202055",
          },
        },
      }}
    >
      <Select
        defaultValue={currentYear}
        style={{ width: 100 }}
        options={yearOptions}
        onChange={(value) => setThisYear(value)}
      />
    </ConfigProvider>
  );
};

export default YearOption;
