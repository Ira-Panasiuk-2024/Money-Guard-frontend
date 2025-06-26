import Button from "../Button/Button";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import Header from "../Header/Header";
import css from "./DeleteConfirmationContent.module.css";

const DeleteConfirmationContent = ({ onConfirm, onCancel, transaction }) => {
 const sum = transaction?.sum;
 const type = transaction?.type === "income" ? "income" : "expense";
 const category = transaction?.categoryId?.name || "uncategorized";

 return (
  <div className={css.deleteContainer}>
   <div className={css.header}>
    <Header />
   </div>

   <div className={css.contentWrapper}>
    <p className={css.message}>
     Are you sure you want to delete this transaction?
    </p>
    <div className={css.box}>
     <p className={css.details}>
      Type transaction: <span className={css.accent}>{type}</span>
     </p>
     <p className={css.details}>
      Amount: <span className={css.accent}>{sum}</span>
     </p>
     <p className={css.details}>
      Category: <span className={css.accent}>{category}</span>
     </p>
    </div>
    <div className={css.buttonGroup}>
     <Button
      text="Yes, Delete"
      className={css.confirmButton}
      onClick={onConfirm}
     />
     <ButtonCancel onClick={onCancel} />
    </div>
   </div>
  </div>
 );
};

export default DeleteConfirmationContent;
