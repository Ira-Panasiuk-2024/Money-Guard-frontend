import { useSelector } from "react-redux";
import styles from "./StatisticsTable.module.css";
import {
 selectExpenseCategories,
 selectTotalExpense,
 selectTotalIncome,
 selectStatisticsIsLoading,
} from "../../redux/statistics/selectors";

const StatisticsTable = () => {
 const expenseCategories = useSelector(selectExpenseCategories);

 const totalIncome = useSelector(selectTotalIncome);

 const totalExpense = useSelector(selectTotalExpense);

 const isLoading = useSelector(selectStatisticsIsLoading);

 if (isLoading) {
  return <p className={styles.message}>Loading table...</p>;
 }

 if (!expenseCategories || expenseCategories.length === 0) {
  return <p className={styles.message}>No expense data for this period.</p>;
 }

 return (
  <div className={styles.tableWrapper}>
   <ul className={styles.titleTab}>
    <li>
     <p>Category</p>
    </li>
    <li>
     <p>Sum</p>
    </li>
   </ul>

   <ul className={styles.table}>
    {expenseCategories.map((category) => (
     <li key={category.name} className={styles.row}>
      <span
       className={styles.color}
       style={{ backgroundColor: category.color }}
      ></span>

      <span className={styles.name}>{category.name}</span>

      <span className={styles.amount}>{category.total.toFixed(2)}</span>
     </li>
    ))}
   </ul>

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
