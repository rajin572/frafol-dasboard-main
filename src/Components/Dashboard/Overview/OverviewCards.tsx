/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiShoppingBag2Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { FaEuroSign } from "react-icons/fa6";

const OverviewCards = ({ stats }: any) => {
  const countData = [
    {
      id: 1,
      background: "#ffffff",
      name: "Total Users",
      icon: <HiUsers className="size-5 text-secondary-color" />,
      count: stats?.totalUsers || 0,
    },
    {
      id: 2,
      background: "#ffffff",
      name: "Regular Users",
      icon: <HiUsers className="size-5 text-secondary-color" />,
      count: stats?.totalRegularUsers || 0,
    },
    {
      id: 3,
      background: "#ffffff",
      name: "Photographers/Videographers",
      icon: <HiUsers className="size-6 text-secondary-color" />,
      count: stats?.totalProfessionals || 0,
    },
    {
      id: 4,
      background: "#ffffff",
      name: "Active Orders",
      icon: <RiShoppingBag2Fill className="size-6 text-secondary-color" />,
      count: stats?.activeEventOrders || 0,
    },
    {
      id: 4,
      background: "#ffffff",
      name: "Earrings From Commission",
      icon: <FaEuroSign className="size-6 text-secondary-color" />,
      count: `${(stats?.totalCommission || 0).toLocaleString()}€`,
    },
  ];
  return (
    <div className="flex flex-row flex-wrap gap-1 lg:gap-3 mb-5 ">
      {/* Company  */}
      {countData.map((item) => (
        <div
          key={item.id}
          className={`flex rounded-2xl w-full my-2 lg:my-0 flex-1 border border-[#E1E1E1] p-6`}
          style={{
            backgroundColor: item.background,
          }}
        >
          <div className="!w-full">
            <div className="flex items-center justify-between w-full gap-2">
              <p className="text-sm sm:text-base lg:text-lg  font-semibold mb-1  tracking-tight w-full text-nowrap">
                {item.name}
              </p>
              <p>{item?.icon}</p>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl  font-bold capitalize tracking-wider">
              {item.count}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
