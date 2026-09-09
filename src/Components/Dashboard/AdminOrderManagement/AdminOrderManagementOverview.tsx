import { RiShoppingBag2Fill } from "react-icons/ri";
import { useGetOrderStatesQuery } from "../../../redux/features/orderManagement/orderManagementApi";

const AdminOrderManagementOverview = () => {

  const { data, isFetching } = useGetOrderStatesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 600000
    }
  )


  // data: {
  //     totalOrders: 27,
  //     completedOrders: 7,
  //     activeOrders: 9,
  //     cancelledOrders: 1
  //   }

  console.log(data)

  const countData = [
    {
      id: 1,
      background: "#ffffff",
      name: "Total Orders",
      icon: <RiShoppingBag2Fill className="size-5 text-secondary-color" />,
      count: isFetching ? "--" : data?.data?.totalOrders || 0,
    },
    {
      id: 2,
      background: "#ffffff",
      name: "Completed Orders",
      icon: <RiShoppingBag2Fill className="size-5 text-secondary-color" />,
      count: isFetching ? "--" : data?.data?.completedOrders || 0,
    },
    {
      id: 3,
      background: "#ffffff",
      name: "Active Orders",
      icon: <RiShoppingBag2Fill className="size-6 text-secondary-color" />,
      count: isFetching ? "--" : data?.data?.activeOrders || 0,
    },
    {
      id: 4,
      background: "#ffffff",
      name: "Cancelled Orders",
      icon: <RiShoppingBag2Fill className="size-6 text-secondary-color" />,
      count: isFetching ? "--" : data?.data?.cancelledOrders || 0,
    },
  ];
  return (
    <div className="flex flex-row flex-wrap gap-1 lg:gap-5 mb-5 ">
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
            <div className="flex items-center justify-between w-full">
              <p className="text-base sm:text-lg lg:text-xl  font-medium mb-1  tracking-tight w-full text-nowrap">
                {item.name}
              </p>
              <p>{item?.icon}</p>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl  font-bold capitalize tracking-wider">
              {item.count}
            </p>
            {/* <div className="bg-[#FAF4FF] p-3 rounded-full">{item.icon}</div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrderManagementOverview;
