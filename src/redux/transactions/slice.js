import { createSlice } from "@reduxjs/toolkit";
import {
 getTransactions,
 deleteTransactions,
 getCategories,
 updateTransaction,
} from "./operations";
import { selectPage, selectPerPage, selectTotalPages } from "./selectors";
import { useSelector } from "react-redux";

const transactions = {
 items: [],
 category: [],
 currentTransaction: null,
 transactionToDelete: null,
 isOpenAddTransaction: false,
 perPage: 8,
 page: 0,
 totalPages: 1,
 isOpenEditTransaction: false,
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
   state.page = payload;
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

    if (
     payload.pagination.totalPages > 0 &&
     state.page >= payload.pagination.totalPages
    ) {
     state.page = payload.pagination.totalPages - 1;
    } else if (payload.pagination.totalPages === 0) {
     state.page = 0;
    }
   })
   .addCase(getTransactions.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
   })

   .addCase(deleteTransactions.pending, (state) => {
    state.isLoading = true;
    state.error = null;
   })
   .addCase(deleteTransactions.fulfilled, (state, { payload }) => {
    state.isLoading = false;

    state.items = state.items.filter(
     (transaction) => transaction._id !== payload.id
    );

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
   .addCase(getCategories.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.category = payload;
   })
   .addCase(getCategories.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
   })

   .addCase(updateTransaction.pending, (state) => {
    state.isLoading = true;
    state.error = null;
   })
   .addCase(updateTransaction.fulfilled, (state, { payload }) => {
    state.isLoading = false;

    const index = state.items.findIndex(
     (item) => item._id === payload.transaction._id
    );
    if (index !== -1) {
     state.items[index] = payload.transaction;
    }

    state.currentTransaction = null;
   })
   .addCase(updateTransaction.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
    state.currentTransaction = null;
   });
 },
});

const transactionsReducer = transactionsSlice.reducer;

export const { setAddTransaction, setEditTransaction, setTransactionToDelete, setPage } =
 transactionsSlice.actions;

export default transactionsReducer;
