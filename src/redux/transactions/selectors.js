export const selectTransactions = (state) => state.transactions.items;

export const selectCurrentTransaction = (state) =>
 state.transactions.currentTransaction;

export const selectTransactionToDelete = (state) =>
 state.transactions.transactionToDelete;

export const selectOpenAddTransaction = (state) =>
 state.transactions.isOpenAddTransaction;

export const selectPage = (state) => state.transactions.page;

export const selectPerPage = (state) => state.transactions.perPage;

export const selectTotalPages = (state) => state.transactions.totalPages;

export const selectIncomeCategories = (state) =>
 state.transactions.incomeCategories;
export const selectExpenseCategories = (state) =>
 state.transactions.expenseCategories;

export const selectOpenEditTransaction = (state) =>
 state.transactions.isOpenEditTransaction;

export const selectTransactionsIsLoading = (state) =>
 state.transactions.isLoading;
export const selectTransactionsError = (state) => state.transactions.error;
