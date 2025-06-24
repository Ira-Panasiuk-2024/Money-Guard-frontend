import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdEmail } from "react-icons/md";

import { validationSchemaRequestReset } from "../../helpers/authValidationSchemas.js";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Loader from "../Loader/Loader";
import { requestPasswordResetThunk } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/global/selectors";
import s from "./RequestResetPasswordForm.module.css";

const RequestResetPasswordForm = () => {
 const dispatch = useDispatch();
 const isLoading = useSelector(selectIsLoading);

 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
 } = useForm({
  resolver: yupResolver(validationSchemaRequestReset),
  mode: "onChange",
 });

 const onSubmit = async (data) => {
  await dispatch(requestPasswordResetThunk(data.email)).unwrap();
 };

 return (
  <div className={s.container}>
   <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
    <div className={s.logoWrapper}>
     <Logo className={s.iconLogo} />
    </div>
    <h2 className={s.title}>Forgot Your Password?</h2>
    <p className={s.description}>
     Enter your email address below and we will send you a link to reset your
     password.
    </p>
    <label className={s.label}>
     <div className={s.inputContainer}>
      <MdEmail size={24} className={s.icon} />
      <input
       type="email"
       placeholder="E-mail"
       className={s.input}
       {...register("email")}
       autoComplete="email"
      />
     </div>
     <div className={s.errorWrapper}>
      {errors.email && <p className={s.error}>{errors.email.message}</p>}
     </div>
    </label>
    <Button
     type="submit"
     text="Send Reset Link"
     className={s.button}
     disabled={isSubmitting || isLoading}
    />
    <Link to="/login" className={s.link}>
     Back to Login
    </Link>
   </form>
   {isLoading && <Loader />}
  </div>
 );
};

export default RequestResetPasswordForm;
