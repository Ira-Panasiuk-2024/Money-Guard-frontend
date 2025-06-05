import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import s from "./StatisticsChart.module.css";

import { setChartType } from "../../redux/statistics/slice";
import {
 selectTotalExpense,
 selectExpenseCategories,
 selectTotalIncome,
 selectIncomeCategories,
 selectChartType,
} from "../../redux/statistics/selectors";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsChart = () => {
 const dispatch = useDispatch();
 const chartType = useSelector(selectChartType);

 const totalExpense = useSelector(selectTotalExpense);
 const expenseCategories = useSelector(selectExpenseCategories);
 const totalIncome = useSelector(selectTotalIncome);
 const incomeCategories = useSelector(selectIncomeCategories);

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

 const currentTotal = chartType === "expenses" ? totalExpense : totalIncome;
 const currentCategories =
  chartType === "expenses" ? expenseCategories : incomeCategories;

 if (!currentCategories || currentCategories.length === 0) {
  return (
   <div className={s.chartControl}>
    <button
     className={`${s.chartTypeButton} ${
      chartType === "expenses" ? s.active : ""
     }`}
     onClick={() => dispatch(setChartType("expenses"))}
    >
     Expenses
    </button>
    <button
     className={`${s.chartTypeButton} ${
      chartType === "incomes" ? s.active : ""
     }`}
     onClick={() => dispatch(setChartType("incomes"))}
    >
     Incomes
    </button>
   </div>
  );
 }

 const data = {
  labels: currentCategories.map((v) => v.name),
  datasets: [
   {
    label: "Amount",
    data: currentCategories.map((v) => v.total),
    backgroundColor: currentCategories.map((v) => v.color),
    borderColor: currentCategories.map((v) => v.color),
    borderWidth: 2,
   },
  ],
 };

 return (
  <div className={s.chartWrapper}>
   <div className={s.chartControl}>
    <button
     className={`${s.chartTypeButton} ${
      chartType === "expenses" ? s.active : ""
     }`}
     onClick={() => dispatch(setChartType("expenses"))}
    >
     Expenses
    </button>
    <button
     className={`${s.chartTypeButton} ${
      chartType === "incomes" ? s.active : ""
     }`}
     onClick={() => dispatch(setChartType("incomes"))}
    >
     Incomes
    </button>
   </div>
   <div className={s.chartContainer}>
    <Doughnut data={data} options={options} />
    <div className={s.centerText}>
     <p className={s.balance}>₴ {currentTotal.toFixed(2)}</p>
    </div>
   </div>
  </div>
 );
};

export default StatisticsChart;
