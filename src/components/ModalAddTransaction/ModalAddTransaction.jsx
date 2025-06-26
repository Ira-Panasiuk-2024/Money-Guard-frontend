import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { setAddTransaction } from "../../redux/transactions/slice";
import { selectOpenAddTransaction } from "../../redux/transactions/selectors";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import useMedia from "../../helpers/useMedia";
import Header from "../Header/Header";
import s from "./ModalAddTransaction.module.css";

const ModalAddTransaction = () => {
 const dispatch = useDispatch();
 const isAddModal = useSelector(selectOpenAddTransaction);
 const { isMobile } = useMedia();

 return (
  <ModalWindow
   closeModal={() => dispatch(setAddTransaction(false))}
   modalIsOpen={isAddModal}
   showIcon={isMobile ? false : true}
  >
   <div className={s.modalBox}>
    <div className={s.header}>
     <Header />
    </div>

    <h2 className={s.title}>Add transaction</h2>

    <AddTransactionForm closeModal={() => dispatch(setAddTransaction(false))} />
   </div>
  </ModalWindow>
 );
};

export default ModalAddTransaction;
