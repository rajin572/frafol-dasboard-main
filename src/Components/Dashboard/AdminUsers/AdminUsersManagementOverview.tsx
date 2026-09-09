import { HiUsers } from "react-icons/hi";
import { useGetAllUsersOverviewQuery } from "../../../redux/features/users/usersApi";
import SpinLoader from "../../../ui/SpinLoader";

interface IOverviewData {
  _id: null;
  totalPhotographer: number;
  totalVideographer: number;
  totalBoth: number;
  totalUserCompany: number;
}

const AdminUsersManagementOverview = () => {
  const { data, isFetching } = useGetAllUsersOverviewQuery(
    {},
    { refetchOnMountOrArgChange: true, pollingInterval: 600000 }
  );

  const overviewData: IOverviewData = data?.data || {};

  const countData = [
    {
      id: 1,
      background: "#ffffff",
      name: "Photographers",
      icon: <HiUsers className="size-5 text-secondary-color" />,
      count: overviewData.totalPhotographer || 0,
    },
    {
      id: 2,
      background: "#ffffff",
      name: "Videographers",
      icon: <HiUsers className="size-5 text-secondary-color" />,
      count: overviewData.totalVideographer || 0,
    },
    {
      id: 3,
      background: "#ffffff",
      name: "Photographer & Videographer",
      icon: <HiUsers className="size-6 text-secondary-color" />,
      count: overviewData.totalBoth || 0,
    },
    {
      id: 4,
      background: "#ffffff",
      name: "Clients",
      icon: <HiUsers className="size-6 text-secondary-color" />,
      count: overviewData.totalUserCompany || 0,
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
            <div className="flex items-center justify-between gap-5 w-full">
              <p className="text-base sm:text-lg lg:text-xl  font-medium mb-1  tracking-tight w-full text-nowrap">
                {item.name}
              </p>
              <p>{item?.icon}</p>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl  font-bold capitalize tracking-wider">
              {isFetching ? <SpinLoader /> : item.count}
            </p>
            {/* <div className="bg-[#FAF4FF] p-3 rounded-full">{item.icon}</div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminUsersManagementOverview;
