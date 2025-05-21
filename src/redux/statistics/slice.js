import { createSlice } from "@reduxjs/toolkit";
import { fetchStatistics } from "./operations";
import { colors } from "../../helpers/statistics"; // Переконайся, що цей шлях правильний
import { toast } from "react-toastify";

const initialState = {
 expenseCategories: [],
 incomeCategories: [],
 totalExpense: 0,
 totalIncome: 0,
 totalBalance: 0,
 periodIncomeOutcome: 0,
 periodTransactionsSum: 0,
 periodTransactionsCount: 0,
 month: new Date().getMonth() + 1,
 year: new Date().getFullYear(),
};

const statisticsSlice = createSlice({
 name: "statistics",
 initialState,
 reducers: {
  setStatisticsPeriod(state, action) {
   state.month = action.payload.month;
   state.year = action.payload.year;
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(fetchStatistics.fulfilled, (state, action) => {
    const expenseCategories = Object.entries(
     action.payload.categoryExpenses
    ).map(([name, value], index) => {
     return {
      name: name,
      total: value,
      color: colors[index % colors.length],
     };
    });

    const incomeCategories = Object.entries(action.payload.categoryIncomes).map(
     ([name, value], index) => {
      return {
       name: name,
       total: value,
       color: colors[index % colors.length],
      };
     }
    );

    state.expenseCategories = expenseCategories;
    state.incomeCategories = incomeCategories;
    state.totalExpense = action.payload.totalExpense;
    state.totalIncome = action.payload.totalIncome;
    state.totalBalance = action.payload.totalBalance;
    state.periodIncomeOutcome = action.payload.periodIncomeOutcome;
    state.periodTransactionsSum = action.payload.periodTransactionsSum;
    state.periodTransactionsCount = action.payload.periodTransactionsCount;

    state.month = action.meta.arg.month;
    state.year = action.meta.arg.year;
   })
   .addCase(fetchStatistics.rejected, (_, { payload }) => {
    toast.error(payload.message || "Something went wrong fetching statistics");
   });
 },
});

export const statisticsReducer = statisticsSlice.reducer;
export const { setStatisticsPeriod } = statisticsSlice.actions;
