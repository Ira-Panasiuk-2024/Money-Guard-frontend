import StatisticsChart from "../../components/StatisticsChart/StatisticsChart";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import s from "./StatisticsTab.module.css";
import { useSelector } from "react-redux";
import {
 selectTotalBalance,
 selectPeriodIncomeOutcome,
 selectPeriodTransactionsSum,
 selectPeriodTransactionsCount,
 selectTotalExpense,
 selectTotalIncome,
 selectStatisticsIsLoading,
 selectStatisticsError,
} from "../../redux/statistics/selectors";

const StatisticsTab = () => {
 // Get all necessary data from Redux state
 const totalBalance = useSelector(selectTotalBalance);
 const periodIncomeOutcome = useSelector(selectPeriodIncomeOutcome);
 const periodTransactionsSum = useSelector(selectPeriodTransactionsSum);
 const periodTransactionsCount = useSelector(selectPeriodTransactionsCount);
 const totalExpense = useSelector(selectTotalExpense);
 const totalIncome = useSelector(selectTotalIncome);

 const isLoading = useSelector(selectStatisticsIsLoading);
 const error = useSelector(selectStatisticsError);

 return (
  <div className={s.statisticsBox}>
   {/* Display loading overlay if data is loading */}
   {isLoading && <div className={s.loadingOverlay}>Loading...</div>}

   <div className={s.chartSection}>
    <h2 className={s.title}>Statistics</h2>
    {/* Display error message if present */}
    {error && <p className={s.errorMessage}>Error: {error}</p>}
    {/* Chart component */}
    <StatisticsChart />
    {/* Display user's total balance */}
    <p className={s.totalBalanceDisplay}>
     Total Balance:{" "}
     <span className={s.balanceValue}>₴ {totalBalance.toFixed(2)}</span>
    </p>
   </div>

   <div className={s.tabContainer}>
    {/* Component for period selection */}
    <div className={s.dashboardSection}>
     <StatisticsDashboard />
     {/* Display additional metrics for the selected period */}
     <div className={s.periodSummary}>
      <p className={s.periodSummaryItem}>
       Net Result:
       <span
        className={periodIncomeOutcome >= 0 ? s.incomeText : s.expenseText}
       >
        ₴ {periodIncomeOutcome.toFixed(2)}
       </span>
      </p>
      <p className={s.periodSummaryItem}>
       Total Income:
       <span className={s.incomeText}>₴ {totalIncome.toFixed(2)}</span>
      </p>
      <p className={s.periodSummaryItem}>
       Total Expenses:
       <span className={s.expenseText}>₴ {totalExpense.toFixed(2)}</span>
      </p>
      <p className={s.periodSummaryItem}>
       Total Transactions Sum:
       <span className={s.sumText}>₴ {periodTransactionsSum.toFixed(2)}</span>
      </p>
      <p className={s.periodSummaryItem}>
       Transactions Count:
       <span className={s.countText}>{periodTransactionsCount}</span>
      </p>
     </div>
    </div>
    {/* Statistics table component */}
    <div className={s.tableSection}>
     <StatisticsTable />
    </div>
   </div>
  </div>
 );
};

export default StatisticsTab;
