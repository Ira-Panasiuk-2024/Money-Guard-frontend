import { useSelector } from "react-redux";
import styles from "./StatisticsTable.module.css";
import {
 selectExpenseCategories, // FIXED: using selector for expense categories
 selectTotalExpense,
 selectTotalIncome,
 selectStatisticsIsLoading,
} from "../../redux/statistics/selectors";

const StatisticsTable = () => {
 // Get expense categories
 const expenseCategories = useSelector(selectExpenseCategories);
 // Get total income for the period
 const totalIncome = useSelector(selectTotalIncome);
 // Get total expense for the period
 const totalExpense = useSelector(selectTotalExpense);
 // Get loading state
 const isLoading = useSelector(selectStatisticsIsLoading);

 // Display loading message
 if (isLoading) {
  return <p className={styles.message}>Loading table...</p>;
 }

 // Display message if no expense data
 if (!expenseCategories || expenseCategories.length === 0) {
  return <p className={styles.message}>No expense data for this period.</p>;
 }

 return (
  <div className={styles.tableWrapper}>
   {/* Table header */}
   <ul className={styles.titleTab}>
    <li>
     <p>Category</p>
    </li>
    <li>
     <p>Sum</p>
    </li>
   </ul>
   {/* List of expense categories */}
   <ul className={styles.table}>
    {expenseCategories.map((category) => (
     <li key={category.name} className={styles.row}>
      {/* Category color indicator */}
      <span
       className={styles.color}
       style={{ backgroundColor: category.color }}
      ></span>
      {/* Category name */}
      <span className={styles.name}>{category.name}</span>
      {/* Expense amount for the category */}
      <span className={styles.amount}>{category.total.toFixed(2)}</span>
     </li>
    ))}
   </ul>

   {/* Summary rows for total expenses and income */}
   <div className={styles.total}>
    <div className={styles.totalRow}>
     <p>Expenses:</p>
     <p className={styles.expenses}>₴ {totalExpense?.toFixed(2)}</p>
    </div>
    <div className={styles.totalRow}>
     <p>Income:</p>
     <p className={styles.income}>₴ {totalIncome?.toFixed(2)}</p>
    </div>
   </div>
  </div>
 );
};

export default StatisticsTable;
