import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";

import { selectTransactions } from "../../redux/transactions/selectors";
import s from "./TransactionsList.module.css";
import useMedia from "../../helpers/useMedia";
import {
 getTransactions,
 getCategories,
} from "../../redux/transactions/operations";

import TransactionsItem from "../TransactionsItem/TransactionsItem";
import {
 setPage,
 useTransactionsPagination,
} from "../../redux/transactions/slice";

const columns = ["Date", "Type", "Category", "Comment", "Sum", "", ""];

function EmptyStateMessage() {
 return (
  <>
   <p className={s.emptyText}>No transaction yet.</p>
   <p className={s.emptyText}>Let&apos;s add your first transaction!</p>
  </>
 );
}

function TransactionsList() {
 const reduxTransactions = useSelector(selectTransactions);
 const pagination = useTransactionsPagination();
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(
   getTransactions({ page: pagination.page, perPage: pagination.perPage })
  );
  dispatch(getCategories());
 }, [dispatch, pagination.page, pagination.perPage]);

 const { isMobile } = useMedia();

 const handlePageClick = (data) => {
  dispatch(setPage(data.selected + 1));
 };

 // Визначимо, чи показувати пагінацію
 const shouldShowPagination = pagination.totalPage > 0;

 if (isMobile) {
  return (
   <div className={s.mobileContainer}>
    <div className={`${s.mobileScrollList} ${s.scroll}`}>
     {reduxTransactions.length ? (
      reduxTransactions.map((item) => (
       <TransactionsItem key={item._id} transaction={item} />
      ))
     ) : (
      <EmptyStateMessage />
     )}
    </div>
    {/* Умовний рендеринг пагінації для мобільних */}
    {shouldShowPagination && (
     <div>
      <ReactPaginate
       breakLabel="..."
       nextLabel="next >"
       onPageChange={handlePageClick}
       pageRangeDisplayed={1}
       pageCount={pagination.totalPage}
       previousLabel="< previous"
       renderOnZeroPageCount={null}
       activeClassName={s.pageActive}
       disabledClassName={s.pageButtonDisabled}
       className={s.pageContainer}
       // Переконайтеся, що forcePage не виходить за межі, якщо totalPage === 0,
       // але оскільки ми вже робимо умовний рендеринг, це стає менш критичним.
       // Math.max(0, pagination.page - 1) гарантує, що forcePage не буде від'ємним.
       forcePage={Math.max(0, pagination.page - 1)}
      />
     </div>
    )}
   </div>
  );
 }

 return (
  <div className={s.tableContainer}>
   <table className={s.table}>
    <thead className={s.head_row}>
     <tr className={s.row_item}>
      {columns.map((column, idx) => (
       <th key={idx}>{column}</th>
      ))}
     </tr>
    </thead>
    <tbody>
     {reduxTransactions.length ? (
      reduxTransactions.map((item) => (
       <TransactionsItem key={item._id} transaction={item} />
      ))
     ) : (
      <tr>
       <td colSpan={columns.length} className={s.emptyCell}>
        <EmptyStateMessage />
       </td>
      </tr>
     )}
    </tbody>
   </table>
   {/* Умовний рендеринг пагінації для десктопу */}
   {shouldShowPagination && (
    <div>
     <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={pagination.totalPage}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      activeClassName={s.pageActive}
      disabledClassName={s.pageButtonDisabled}
      className={s.pageContainer}
      forcePage={Math.max(0, pagination.page - 1)}
     />
    </div>
   )}
  </div>
 );
}

export default TransactionsList;
