export const selectExpenseCategories = (state) =>
 state.statistics.expenseCategories;
export const selectIncomeCategories = (state) =>
 state.statistics.incomeCategories;

export const selectTotalExpense = (state) => state.statistics.totalExpense;
export const selectTotalIncome = (state) => state.statistics.totalIncome;
export const selectTotalBalance = (state) => state.statistics.totalBalance;
export const selectPeriodIncomeOutcome = (state) =>
 state.statistics.periodIncomeOutcome;
export const selectPeriodTransactionsSum = (state) =>
 state.statistics.periodTransactionsSum;
export const selectPeriodTransactionsCount = (state) =>
 state.statistics.periodTransactionsCount;

export const selectStatisticsMonth = (state) => state.statistics.month;
export const selectStatisticsYear = (state) => state.statistics.year;
