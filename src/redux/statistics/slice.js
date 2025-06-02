import { createSlice } from "@reduxjs/toolkit";
import { fetchStatistics } from "./operations";
import { colors } from "../../helpers/statistics";
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
 isLoading: false,
 error: null,
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

   .addCase(fetchStatistics.pending, (state) => {
    state.isLoading = true;
    state.error = null;
   })

   .addCase(fetchStatistics.fulfilled, (state, action) => {
    state.isLoading = false;
    state.error = null;

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

   .addCase(fetchStatistics.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.error = payload.message || "Something went wrong fetching statistics";
    toast.error(state.error);

    state.expenseCategories = [];
    state.incomeCategories = [];
    state.totalExpense = 0;
    state.totalIncome = 0;
    state.totalBalance = 0;
    state.periodIncomeOutcome = 0;
    state.periodTransactionsSum = 0;
    state.periodTransactionsCount = 0;
   });
 },
});

export const statisticsReducer = statisticsSlice.reducer;
export const { setStatisticsPeriod } = statisticsSlice.actions;
export default statisticsSlice;
