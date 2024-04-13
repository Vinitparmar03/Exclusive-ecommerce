import React from "react";
import "./DashboardCategroies.css";

const DashboardCategories = ({ stats }) => {
  return (
    <div className="dashboard-categories">
      <h2>Inventory</h2>
      <div className="categories">
        {stats.categoryCount.map((i) => {
          const [heading, value] = Object.entries(i)[0];
          return (
            <CategoryItem
              key={heading}
              value={value}
              heading={heading}
              color={`hsl(${value * 4}, ${value}%, 50%)`}
            />
          );
        })}
      </div>
    </div>
  );
};

const CategoryItem = ({ color, value, heading }) => (
  <div className="category-item">
    <h5>{heading}</h5>

    <div className="line">
      <div style={{ backgroundColor: color, width: `${value}%` }}></div>
    </div>

    <span>{value}%</span>
  </div>
);

export default DashboardCategories;
