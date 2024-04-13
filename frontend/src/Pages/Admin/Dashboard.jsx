import { BiMaleFemale } from "react-icons/bi";
import AdminSidebar from "../../Components/Admin/Admin Side Bar/AdminSideBar";
import { DoughnutChart } from "../../Components/Admin/Charts/Charts";
import DashboardTable from "../../Components/Admin/Dashboard Table/DashboardTable";
import GraphContainer from "../../Components/Admin/Graph/GraphContainer";
import { WidgetItem } from "../../Components/Admin/Widget Item/WidgetItem";
import "./CSS/Dashboard.css";
import { useSelector } from "react-redux";
import { useStatsQuery } from "../../Redux/api/dashboardAPI";

const Dashboard = () => {
  const { user } = useSelector((state) => state.userReducer);


  const { isLoading, data } = useStatsQuery(user?.id);
  const stats = data?.stats;

  return (
    <div className="admin-container">
      <AdminSidebar />

      <main className="dashboard">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <section className="widget-container">
              <WidgetItem
                percent={stats.changePercent.revenue}
                amount={true}
                value={stats.count.revenue}
                heading="Revenue"
                color="rgb(0, 115, 255)"
              />
              <WidgetItem
                percent={stats.changePercent.user}
                value={stats.count.user}
                color="rgb(0 198 202)"
                heading="Users"
              />
              <WidgetItem
                percent={stats.changePercent.order}
                value={stats.count.order}
                color="rgb(255 196 0)"
                heading="Transactions"
              />
              <WidgetItem
                percent={stats.changePercent.product}
                value={stats.count.product}
                color="rgb(76 0 255)"
                heading="Products"
              />
            </section>

            <GraphContainer stats={stats} />

            <section className="transaction-container">
              <div className="gender-chart">
                <h2>Gender Ratio</h2>
                <DoughnutChart
                  labels={["Female", "Male"]}
                  data={[stats.userRatio.female, stats.userRatio.male]}
                  backgroundColor={[
                    "hsl(340, 82%, 56%)",
                    "rgba(53, 162, 235, 0.8)",
                  ]}
                  cutout={90}
                />
                <p>
                  <BiMaleFemale />
                </p>
              </div>

              <DashboardTable data={stats?.latestTransaction} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
