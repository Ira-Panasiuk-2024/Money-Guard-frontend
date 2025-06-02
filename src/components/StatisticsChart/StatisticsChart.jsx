import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import s from "./StatisticsChart.module.css";
// colors are already added in the reducer, so direct import here is not needed for data.backgroundColor
import {
 selectTotalExpense,
 selectExpenseCategories, // FIXED: using selector for expense categories
 selectStatisticsIsLoading,
} from "../../redux/statistics/selectors";

// Registering necessary Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsChart = () => {
 // Get total expense amount
 const totalExpense = useSelector(selectTotalExpense);
 // Get expense categories with their amounts and colors
 const expenseCategories = useSelector(selectExpenseCategories);
 // Get loading state
 const isLoading = useSelector(selectStatisticsIsLoading);

 // Options for the doughnut chart
 const options = {
  responsive: true,
  maintainAspectRatio: false, // Allows the chart not to maintain aspect ratio if container changes
  plugins: {
   legend: {
    display: false, // Do not display legend, as categories will be in the table
   },
   tooltip: {
    enabled: true, // Enable tooltips on hover
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
  cutout: "70%", // Size of the hole in the center of the chart
 };

 // Display loading message
 if (isLoading) {
  return <p className={s.message}>Loading chart...</p>;
 }

 // Display message if no expense data
 if (!expenseCategories || expenseCategories.length === 0) {
  return <p className={s.message}>No expense data for this period.</p>;
 }

 // Data for the chart
 const data = {
  labels: expenseCategories.map((v) => v.name), // Category names as labels
  datasets: [
   {
    label: "Amount", // Label for the dataset
    data: expenseCategories.map((v) => v.total), // Expense amounts for each category
    backgroundColor: expenseCategories.map((v) => v.color), // Colors for chart segments
    borderColor: expenseCategories.map((v) => v.color), // Border colors for segments
    borderWidth: 2, // Border width for segments
   },
  ],
 };

 return (
  <div className={s.chartContainer}>
   <Doughnut data={data} options={options} />
   {/* Text in the center of the chart displaying the total expense amount */}
   <div className={s.centerText}>
    <p className={s.balance}>₴ {totalExpense.toFixed(2)}</p>
   </div>
  </div>
 );
};

export default StatisticsChart;
