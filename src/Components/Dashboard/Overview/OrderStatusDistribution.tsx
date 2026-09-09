import React from "react";
import ReuseSelect from "../../../ui/Form/ReuseSelect";
import OrderStatusChart from "../../Chart/OrderStatusChart";
import { useGetOrderStatsQuery } from "../../../redux/features/overview/overviewApi";

const OrderStatusDistribution = () => {
  const [selectedOption, setSelectedOption] = React.useState("photographer");
  const { data } = useGetOrderStatsQuery(
    {
      type: selectedOption,
    },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 600000
    }
  );

  console.log(data);
  return (
    <div className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg flex flex-col border border-[#E1E1E1]">
      <div className="flex justify-between text-base-color mt-4">
        <p className="text-2xl lg:text-3xl text-secondary-color font-bold mb-5">
          Order Status Distribution
        </p>
        <div>
          <ReuseSelect
            onChange={(e) => setSelectedOption(e)}
            value={selectedOption}
            selectClassName="!w-[160px]"
            name="orderStatus"
            options={[
              {
                value: "photographer",
                label: "Photography",
              },
              {
                value: "videographer",
                label: "Videography",
              },
              {
                value: "gear",
                label: "Gears",
              },
            ]}
          />
        </div>
      </div>
      <hr />
      <div>
        <OrderStatusChart data={data?.data} />
      </div>
    </div>
  );
};

export default OrderStatusDistribution;
