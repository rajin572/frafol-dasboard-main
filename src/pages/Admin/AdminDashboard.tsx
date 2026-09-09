import IncomeOverview from "../../Components/Dashboard/Overview/IncomeOverview";
import OverviewCard from "../../Components/Dashboard/Overview/OverviewCards";
import QuickActionRequired from "../../Components/Dashboard/Overview/QuickActionRequired";
import RecentNotification from "../../Components/Dashboard/Overview/RecentNotification";
import { useGetStatsQuery } from "../../redux/features/overview/overviewApi";

const AdminDashboard = () => {
  const { data } = useGetStatsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 600000
    }
  );
  const stats = data?.data || {};
  return (
    <div>
      <>
        <div className="my-5">
          <OverviewCard stats={stats} />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mt-8">
          <IncomeOverview />
          {/* <OrderStatusDistribution /> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
          <RecentNotification notifications={stats?.latestNotifications} />
          <QuickActionRequired quickActions={stats?.quickActions} />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
