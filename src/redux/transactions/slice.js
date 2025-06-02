import { createSlice } from "@reduxjs/toolkit";
import {
 getTransactions,
 deleteTransactions,
 getCategories,
 updateTransaction,
 addTransactions,
} from "./operations";
import { selectPage, selectPerPage, selectTotalPages } from "./selectors";
import { useSelector } from "react-redux";

const transactions = {
 items: [],
 incomeCategories: [],
 expenseCategories: [],
 currentTransaction: null,
 transactionToDelete: null,
 isOpenAddTransaction: false,
 perPage: 8,
 page: 1,
 totalPages: 1,
 isOpenEditTransaction: false,
 isLoading: false,
 error: null,
};

export const useTransactionsPagination = () => {
 const page = useSelector(selectPage);
 const perPage = useSelector(selectPerPage);
 const totalPage = useSelector(selectTotalPages);
 return {
  page,
  perPage,
  totalPage,
 };
};

const transactionsSlice = createSlice({
 name: "transactions",
 initialState: transactions,
 reducers: {
  setAddTransaction(state, action) {
   state.isOpenAddTransaction = action.payload;
  },
  setEditTransaction(state, action) {
   state.currentTransaction = action.payload;
  },
  setTransactionToDelete(state, action) {
   state.transactionToDelete = action.payload;
  },
  setPage(state, { payload }) {
   state.page = payload > 0 ? payload : 1;
  },
  setOpenEditTransaction(state, action) {
   state.isOpenEditTransaction = action.payload;
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(getTransactions.pending, (state) => {
    state.isLoading = true;
    state.error = null;
   })
   .addCase(getTransactions.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.items = payload.transactions;
    state.perPage = payload.pagination.perPage;
    state.totalPages = payload.pagination.totalPages;

    if (payload.pagination.totalPages > 0) {
     if (state.page > payload.pagination.totalPages) {
      state.page = payload.pagination.totalPages;
     }
     if (state.page === 0) {
      state.page = 1;
     }
    } else {
     state.page = 1;
    }
   })
   .addCase(getTransactions.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
   })

   .addCase(addTransactions.pending, (state) => {
    state.isLoading = true;
    state.error = null;
   })
   .addCase(addTransactions.fulfilled, (state) => {
    state.isLoading = false;
    state.isOpenAddTransaction = false;
   })
   .addCase(addTransactions.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
   })

   .addCase(deleteTransactions.pending, (state) => {
    state.isLoading = true;
    state.error = null;
   })
   .addCase(deleteTransactions.fulfilled, (state) => {
    state.isLoading = false;
    state.transactionToDelete = null;
   })
   .addCase(deleteTransactions.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
    state.transactionToDelete = null;
   })

   .addCase(getCategories.pending, (state) => {
    state.isLoading = true;
    state.error = null;
   })
   .addCase(getCategories.fulfilled, (state, { payload, meta }) => {
    state.isLoading = false;
    if (meta.arg === "income") {
     state.incomeCategories = payload;
    } else if (meta.arg === "expense") {
     state.expenseCategories = payload;
    } else {
     state.incomeCategories = payload.filter((cat) => cat.type === "income");
     state.expenseCategories = payload.filter((cat) => cat.type === "expense");
    }
   })
   .addCase(getCategories.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
   })

   .addCase(updateTransaction.pending, (state) => {
    state.isLoading = true;
    state.error = null;
   })
   .addCase(updateTransaction.fulfilled, (state) => {
    state.isLoading = false;
    state.currentTransaction = null;
    state.isOpenEditTransaction = false;
   })
   .addCase(updateTransaction.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
    state.currentTransaction = null;
   });
 },
});

const transactionsReducer = transactionsSlice.reducer;

export const {
 setAddTransaction,
 setEditTransaction,
 setTransactionToDelete,
 setPage,
 setOpenEditTransaction,
} = transactionsSlice.actions;

export default transactionsReducer;
