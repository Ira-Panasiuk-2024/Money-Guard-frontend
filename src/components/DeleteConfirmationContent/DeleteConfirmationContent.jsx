import Button from "../Button/Button";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import css from "./DeleteConfirmationContent.module.css";

const DeleteConfirmationContent = ({ onConfirm, onCancel, transaction }) => {
 const sum = transaction?.sum;
 const type = transaction?.type === "income" ? "income" : "expense";
 const category = transaction?.categoryId?.name || "uncategorized";

 return (
  <div className={css.contentWrapper}>
   <p className={css.message}>
    Are you sure you want to delete this transaction?
   </p>
   <p className={css.details}>
    Type: {type}, Amount: {sum}, Category: {category}
   </p>
   <div className={css.buttonGroup}>
    <Button
     text="Yes, Delete"
     className={css.confirmButton}
     onClick={onConfirm}
    />
    <ButtonCancel onClick={onCancel} />
   </div>
  </div>
 );
};

export default DeleteConfirmationContent;
