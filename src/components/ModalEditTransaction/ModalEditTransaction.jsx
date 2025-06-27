import { useDispatch, useSelector } from "react-redux";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import ModalWindow from "../ModalWindow/ModalWindow";
import { selectCurrentTransaction } from "../../redux/transactions/selectors";
import useMedia from "../../helpers/useMedia";
import { setEditTransaction } from "../../redux/transactions/slice";
import Header from "../Header/Header";
import s from "./ModalEditTransaction.module.css";

const ModalEditTransaction = () => {
 const dispatch = useDispatch();
 const { isMobile } = useMedia();
 const transaction = useSelector(selectCurrentTransaction);
 return (
  <ModalWindow
   closeModal={() => dispatch(setEditTransaction(null))}
   modalIsOpen={!!transaction}
   showIcon={isMobile ? false : true}
  >
   <div className={s.modalBox}>
    <div className={s.header}>
     <Header />
    </div>

    <h2 className={s.title}>Edit transaction</h2>

    <EditTransactionForm transaction={transaction} />
   </div>
  </ModalWindow>
 );
};
export default ModalEditTransaction;
