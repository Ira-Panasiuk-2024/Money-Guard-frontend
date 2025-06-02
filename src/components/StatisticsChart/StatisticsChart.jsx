import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import s from "./StatisticsChart.module.css";

import {
 selectTotalExpense,
 selectExpenseCategories,
 selectStatisticsIsLoading,
} from "../../redux/statistics/selectors";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsChart = () => {
 const totalExpense = useSelector(selectTotalExpense);

 const expenseCategories = useSelector(selectExpenseCategories);

 const isLoading = useSelector(selectStatisticsIsLoading);

 const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
   legend: {
    display: false,
   },
   tooltip: {
    enabled: true,
    callbacks: {
     label: function (context) {
      let label = context.label || "";
      if (label) {
       label += ": ";
      }
      if (context.parsed !== null) {
       label += new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH",
       }).format(context.parsed);
      }
      return label;
     },
    },
   },
  },
  cutout: "70%",
 };

 if (isLoading) {
  return <p className={s.message}>Loading chart...</p>;
 }

 if (!expenseCategories || expenseCategories.length === 0) {
  return <p className={s.message}>No expense data for this period.</p>;
 }

 const data = {
  labels: expenseCategories.map((v) => v.name),
  datasets: [
   {
    label: "Amount",
    data: expenseCategories.map((v) => v.total),
    backgroundColor: expenseCategories.map((v) => v.color),
    borderColor: expenseCategories.map((v) => v.color),
    borderWidth: 2,
   },
  ],
 };

 return (
  <div className={s.chartContainer}>
   <Doughnut data={data} options={options} />
   <div className={s.centerText}>
    <p className={s.balance}>₴ {totalExpense.toFixed(2)}</p>
   </div>
  </div>
 );
};

export default StatisticsChart;
