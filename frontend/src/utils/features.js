import moment from "moment";

export const getLastMonths = () => {
  const currentDate = moment();

  currentDate.date(1);

  const last6Months = [];

  for (let i = 0; i < 6; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");
    last6Months.unshift(monthName);
  }

  return last6Months;
};
