import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStatistics } from "../../redux/statistics/operations";
import { setStatisticsPeriod } from "../../redux/statistics/statisticsSlice"; // Correct action import
import s from "./StatisticsDashboard.module.css";
import { months, years } from "../../helpers/statistics"; // Ensure months and years are exported from here
import {
 selectStatisticsMonth,
 selectStatisticsYear,
 selectStatisticsIsLoading, // Importing selector for loading state
} from "../../redux/statistics/selectors";
import { IoIosArrowDown } from "react-icons/io"; // Icon for dropdown

const StatisticsDashboard = () => {
 const dispatch = useDispatch();

 // Get current month and year from Redux state
 const currentMonth = useSelector(selectStatisticsMonth);
 const currentYear = useSelector(selectStatisticsYear);
 // Get loading state to disable selectors during data fetch
 const isLoading = useSelector(selectStatisticsIsLoading);

 // Effect that runs on component mount and when month/year in Redux changes
 useEffect(() => {
  // Dispatch request to fetch statistics
  dispatch(fetchStatistics({ month: currentMonth, year: currentYear }));
 }, [dispatch, currentMonth, currentYear]); // useEffect dependencies

 // Handler for month change
 const handleMonthChange = (e) => {
  const newMonth = Number(e.target.value);
  // Dispatch action to update month in Redux store
  dispatch(setStatisticsPeriod({ month: newMonth, year: currentYear }));
 };

 // Handler for year change
 const handleYearChange = (e) => {
  const newYear = Number(e.target.value);
  // Dispatch action to update year in Redux store
  dispatch(setStatisticsPeriod({ month: currentMonth, year: newYear }));
 };

 return (
  <div className={s.dashboard}>
   <label className={s.label}>
    <select
     className={s.selectStatistic}
     value={currentMonth} // Value taken from Redux
     onChange={handleMonthChange}
     disabled={isLoading} // Disable selector if data is loading
    >
     <option value="" disabled hidden>
      Month
     </option>
     {months.map(({ value, label }) => (
      <option key={value} value={value}>
       {label}
      </option>
     ))}
    </select>
    <IoIosArrowDown size={24} className={s.selectIcon} />
   </label>

   <label className={s.label}>
    <select
     className={s.selectStatistic}
     value={currentYear} // Value taken from Redux
     onChange={handleYearChange}
     disabled={isLoading} // Disable selector if data is loading
    >
     <option value="" disabled hidden>
      Year
     </option>
     {years.map((y) => (
      <option key={y} value={y}>
       {y}
      </option>
     ))}
    </select>
    <IoIosArrowDown size={24} className={s.selectIcon} />
   </label>
   {/* Loading indicator */}
   {isLoading && <p className={s.loadingMessage}>Loading statistics...</p>}
  </div>
 );
};

export default StatisticsDashboard;
