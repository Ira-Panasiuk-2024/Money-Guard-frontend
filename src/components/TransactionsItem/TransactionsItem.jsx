import clsx from "clsx";
import { useDispatch } from "react-redux";
import s from "./TransactionsItem.module.css";
import Button from "../Button/Button";
import { MdOutlineModeEdit } from "react-icons/md";
import useMedia from "../../helpers/useMedia";
import {
 setEditTransaction,
 setTransactionToDelete,
} from "../../redux/transactions/slice";
import { format, parseISO, isValid } from "date-fns";

const getStyleByType = (type) =>
 type === "income" ? "var(--income-color)" : "var(--expense-color)";

function TransactionsItem({ transaction }) {
 const dispatch = useDispatch();
 const { isMobile } = useMedia();

 const { date, type, categoryId, comment, sum } = transaction;

 let formattedDate = "Invalid Date";
 if (date && isValid(parseISO(date))) {
  formattedDate = format(parseISO(date), "dd.MM.yyyy");
 }

 const formattedType = type === "income" ? "+" : "-";
 const color = getStyleByType(type);

 const isOpenEditModal = () => {
  dispatch(setEditTransaction(transaction));
 };

 const onDeleteButtonClick = () => {
  dispatch(setTransactionToDelete(transaction));
 };

 if (isMobile) {
  return (
   <div className={s.list} style={{ borderColor: color }}>
    <div className={s.list_item}>
     <span>Date</span>
     <span>{formattedDate}</span>
    </div>
    <div className={s.list_item}>
     <span>Type</span>
     <span>{formattedType}</span>
    </div>
    <div className={s.list_item}>
     <span>Category</span>
     <span>{categoryId?.name}</span>
    </div>
    <div className={s.list_item}>
     <span>Comment</span>
     <span>{comment}</span>
    </div>
    <div className={s.list_item} style={{ color }}>
     <span>Sum</span>
     <span>{sum}</span>
    </div>
    <div className={s.list_item}>
     <Button
      type="button"
      className={clsx(s.delete_btn)}
      onClick={onDeleteButtonClick}
      text={"Delete"}
     />
     <button type="button" className={s.edit_btn} onClick={isOpenEditModal}>
      <MdOutlineModeEdit />
      Edit
     </button>
    </div>
   </div>
  );
 }

 return (
  <tr className={s.row}>
   <td className={s.row_item}>{formattedDate}</td>
   <td className={s.row_item} style={{ textAlign: "center" }}>
    {formattedType}
   </td>
   <td className={s.row_item}>{categoryId?.name}</td>
   <td className={s.row_item}>{comment}</td>
   <td className={s.row_item} style={{ color }}>
    {sum}
   </td>
   <td className={clsx(s.row_item)}>
    <button type="button" className={s.edit_btn} onClick={isOpenEditModal}>
     <MdOutlineModeEdit />
    </button>
   </td>
   <td className={clsx(s.row_item)}>
    <Button
     type="button"
     className={s.delete_btn}
     onClick={onDeleteButtonClick}
     text={"Delete"}
    />
   </td>
  </tr>
 );
}

export default TransactionsItem;
