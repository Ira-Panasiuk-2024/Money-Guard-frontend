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
 isLoading: false, // Loading state for data fetching
 error: null, // Error state for data fetching
};

const statisticsSlice = createSlice({
 name: "statistics",
 initialState,
 reducers: {
  // Action to set the month and year, which triggers a statistics update
  setStatisticsPeriod(state, action) {
   state.month = action.payload.month;
   state.year = action.payload.year;
   // Data is not cleared immediately; it will be updated after a successful fetchStatistics call.
  },
 },
 extraReducers: (builder) => {
  builder
   // Handling the start of the request (pending state)
   .addCase(fetchStatistics.pending, (state) => {
    state.isLoading = true;
    state.error = null;
   })
   // Handling successful request completion (fulfilled state)
   .addCase(fetchStatistics.fulfilled, (state, action) => {
    state.isLoading = false;
    state.error = null;

    // Transforming expense categories object into an array for easier rendering
    const expenseCategories = Object.entries(
     action.payload.categoryExpenses
    ).map(([name, value], index) => {
     return {
      name: name,
      total: value,
      color: colors[index % colors.length], // Assigning a color from the colors array
     };
    });

    // Transforming income categories object into an array for easier rendering
    const incomeCategories = Object.entries(action.payload.categoryIncomes).map(
     ([name, value], index) => {
      return {
       name: name,
       total: value,
       color: colors[index % colors.length], // Assigning a color from the colors array
      };
     }
    );

    // Updating the Redux state with all received data
    state.expenseCategories = expenseCategories;
    state.incomeCategories = incomeCategories;
    state.totalExpense = action.payload.totalExpense;
    state.totalIncome = action.payload.totalIncome;
    state.totalBalance = action.payload.totalBalance;
    state.periodIncomeOutcome = action.payload.periodIncomeOutcome;
    state.periodTransactionsSum = action.payload.periodTransactionsSum;
    state.periodTransactionsCount = action.payload.periodTransactionsCount;

    // Updating the month and year in Redux state based on the successful request
    state.month = action.meta.arg.month;
    state.year = action.meta.arg.year;
   })
   // Handling request error (rejected state)
   .addCase(fetchStatistics.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.error = payload.message || "Something went wrong fetching statistics";
    toast.error(state.error); // Displaying error message to the user

    // Clearing data on error to prevent displaying stale data
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
export const { setStatisticsPeriod } = statisticsSlice.actions; // Exporting the setStatisticsPeriod action
export default statisticsSlice;
