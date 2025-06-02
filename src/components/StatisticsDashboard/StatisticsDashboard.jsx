import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStatistics } from "../../redux/statistics/operations";
import { setStatisticsPeriod } from "../../redux/statistics/slice";
import s from "./StatisticsDashboard.module.css";
import { months, years } from "../../helpers/statistics";
import {
 selectStatisticsMonth,
 selectStatisticsYear,
 selectStatisticsIsLoading,
} from "../../redux/statistics/selectors";
import { IoIosArrowDown } from "react-icons/io";

const StatisticsDashboard = () => {
 const dispatch = useDispatch();

 const currentMonth = useSelector(selectStatisticsMonth);
 const currentYear = useSelector(selectStatisticsYear);

 const isLoading = useSelector(selectStatisticsIsLoading);

 useEffect(() => {
  dispatch(fetchStatistics({ month: currentMonth, year: currentYear }));
 }, [dispatch, currentMonth, currentYear]);

 const handleMonthChange = (e) => {
  const newMonth = Number(e.target.value);

  dispatch(setStatisticsPeriod({ month: newMonth, year: currentYear }));
 };

 const handleYearChange = (e) => {
  const newYear = Number(e.target.value);

  dispatch(setStatisticsPeriod({ month: currentMonth, year: newYear }));
 };

 return (
  <div className={s.dashboard}>
   <label className={s.label}>
    <select
     className={s.selectStatistic}
     value={currentMonth}
     onChange={handleMonthChange}
     disabled={isLoading}
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
     value={currentYear}
     onChange={handleYearChange}
     disabled={isLoading}
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

   {isLoading && <p className={s.loadingMessage}>Loading statistics...</p>}
  </div>
 );
};

export default StatisticsDashboard;
