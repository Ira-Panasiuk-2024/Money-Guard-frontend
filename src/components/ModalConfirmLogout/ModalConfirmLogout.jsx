import { logoutUser } from "../../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectConfirmLogout } from "../../redux/auth/selectors";
import { setConfirmLogout } from "../../redux/auth/slice";
import Button from "../Button/Button";
import s from "./ModalConfirmLogout.module.css";
import ModalWindow from "../ModalWindow/ModalWindow";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import Logo from "../Logo/Logo";
import useMedia from "../../helpers/useMedia";

const ModalConfirmLogout = () => {
 const dispatch = useDispatch();
 const isConfirm = useSelector(selectConfirmLogout);
 const { isBigScreen } = useMedia();
 return (
  <ModalWindow
   closeModal={() => dispatch(setConfirmLogout(false))}
   modalIsOpen={isConfirm}
   showIcon={false}
  >
   <div className={s.modalBox}>
    <div className={s.boxIcon}>
     {isBigScreen && <Logo />}
     <p className={s.text}>Are you sure you want to log out?</p>
    </div>
    <Button
     className={s.btn}
     type="button"
     text="logout"
     onClick={() => {
      dispatch(logoutUser());
      dispatch(setConfirmLogout(false));
     }}
    />
    <ButtonCancel onClick={() => dispatch(setConfirmLogout(false))} />
   </div>
  </ModalWindow>
 );
};

export default ModalConfirmLogout;
