import React from "react";
import "./GraphContainer.css";
import { BarChart } from "../Charts/Charts";
import DashboardCategories from "../Dashboard Categories/DashboardCategories";
import { getLastMonths } from "../../../utils/features";

const months = getLastMonths();

const GraphContainer = ({ stats }) => {
  return (
    <>
      <section className="graph-container">
        <div className="revenue-chart">
          <h2>Revenue & Transaction</h2>
          <BarChart
            labels={months}
            data_1={stats.chart.revenue}
            data_2={stats.chart.order}
            title_1="Revenue"
            title_2="Transaction"
            bgColor_1="rgb(0, 115, 255)"
            bgColor_2="rgba(53, 162, 235, 0.8)"
          />
        </div>
        <DashboardCategories stats={stats} />
      </section>
    </>
  );
};

export default GraphContainer;
