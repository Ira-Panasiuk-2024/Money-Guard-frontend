// Selector for retrieving expense categories
export const selectExpenseCategories = (state) =>
 state.statistics.expenseCategories;
// Selector for retrieving income categories
export const selectIncomeCategories = (state) =>
 state.statistics.incomeCategories;

// Selector for retrieving the total expense amount for the period
export const selectTotalExpense = (state) => state.statistics.totalExpense;
// Selector for retrieving the total income amount for the period
export const selectTotalIncome = (state) => state.statistics.totalIncome;
// Selector for retrieving the user's current total balance
export const selectTotalBalance = (state) => state.statistics.totalBalance;
// Selector for retrieving the difference between income and expense for the period
export const selectPeriodIncomeOutcome = (state) =>
 state.statistics.periodIncomeOutcome;
// Selector for retrieving the total sum of all transactions for the period
export const selectPeriodTransactionsSum = (state) =>
 state.statistics.periodTransactionsSum;
// Selector for retrieving the total count of transactions for the period
export const selectPeriodTransactionsCount = (state) =>
 state.statistics.periodTransactionsCount;

// Selector for retrieving the currently selected month
export const selectStatisticsMonth = (state) => state.statistics.month;
// Selector for retrieving the currently selected year
export const selectStatisticsYear = (state) => state.statistics.year;

// Selector for retrieving the data loading state
export const selectStatisticsIsLoading = (state) => state.statistics.isLoading;
// Selector for retrieving the error message
export const selectStatisticsError = (state) => state.statistics.error;
