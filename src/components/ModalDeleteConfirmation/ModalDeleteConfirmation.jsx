import { useDispatch, useSelector } from "react-redux";
import ModalWindow from "../ModalWindow/ModalWindow";
import DeleteConfirmationContent from "../DeleteConfirmationContent/DeleteConfirmationContent";
import {
 selectTransactionToDelete,
 selectPage,
} from "../../redux/transactions/selectors";
import { setTransactionToDelete } from "../../redux/transactions/slice";
import {
 deleteTransactions,
 getTransactions,
} from "../../redux/transactions/operations";
import { toast } from "react-toastify";
import useMedia from "../../helpers/useMedia";

const ModalDeleteConfirmation = () => {
 const dispatch = useDispatch();
 const { isMobile } = useMedia();
 const transactionToDelete = useSelector(selectTransactionToDelete);
 const page = useSelector(selectPage);

 const closeModal = () => {
  dispatch(setTransactionToDelete(null));
 };

 const handleConfirmDelete = async () => {
  if (!transactionToDelete) {
   closeModal();
   return;
  }

  try {
   await dispatch(deleteTransactions(transactionToDelete._id)).unwrap();
   toast.success("Transaction successfully deleted!");
   dispatch(getTransactions(page));
   closeModal();
  } catch (error) {
   const errorMessage = error.message || "Failed to delete transaction";
   toast.error(`Error: ${errorMessage}`);
   closeModal();
  }
 };

 return (
  <ModalWindow
   closeModal={closeModal}
   modalIsOpen={!!transactionToDelete}
   showIcon={isMobile ? false : true}
  >
   <DeleteConfirmationContent
    onConfirm={handleConfirmDelete}
    onCancel={closeModal}
    transaction={transactionToDelete}
   />
  </ModalWindow>
 );
};

export default ModalDeleteConfirmation;
