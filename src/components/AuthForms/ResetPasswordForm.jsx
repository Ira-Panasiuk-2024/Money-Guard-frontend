import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { PiLockFill } from "react-icons/pi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { validationSchemaReset } from "../../helpers/authValidationSchemas.js";
import { toasterCustomStyles } from "../../helpers/toasterCustomStyles.js";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import Logo from "../Logo/Logo";
import ProgressBar from "../ProgressBar/ProgressBar";
import { resetPasswordThunk } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/global/selectors";
import s from "./ResetPasswordForm.module.css";

const ResetPasswordForm = () => {
 const dispatch = useDispatch();
 const location = useLocation();
 const navigate = useNavigate();
 const isLoading = useSelector(selectIsLoading);

 const [token, setToken] = useState(null);
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [isPasswordFilled, setIsPasswordFilled] = useState(false);
 const [isConfirmPasswordFilled, setIsConfirmPasswordFilled] = useState(false);

 const {
  register,
  handleSubmit,
  watch,
  formState: { errors, isSubmitting },
 } = useForm({
  resolver: yupResolver(validationSchemaReset),
  mode: "onChange",
 });

 const newPassword = watch("newPassword");
 const confirmNewPasswordValue = watch("confirmNewPassword");

 useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get("token");
  if (resetToken) {
   setToken(resetToken);
  } else {
   toast.error("Password reset token is missing.", toasterCustomStyles);
   navigate("/login");
  }
 }, [location.search, navigate]);

 const togglePasswordVisibility = () =>
  setShowPassword((prevState) => !prevState);
 const toggleConfirmPasswordVisibility = () =>
  setShowConfirmPassword((prev) => !prev);
 const handlePasswordChange = (e) =>
  setIsPasswordFilled(e.target.value.length > 0);
 const handleConfirmPasswordChange = (e) =>
  setIsConfirmPasswordFilled(e.target.value.length > 0);

 const onSubmit = async (data) => {
  if (!token) {
   toast.error("Missing reset token.", toasterCustomStyles);
   return;
  }

  try {
   await dispatch(
    resetPasswordThunk({ token, newPassword: data.newPassword })
   ).unwrap();
   navigate("/login");
  } catch (_error) {
   console.error("Error during password reset:", _error);
  }
 };

 return (
  <div className={s.resetPasswordContainer}>
   <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
    <div className={s.logoWrapper}>
     <Logo className={s.iconLogo} />
    </div>

    <div className={s.formWrapper}>
     <h2 className={s.title}>Reset Your Password</h2>
     <p className={s.description}>Please enter your new password below.</p>
    </div>

    <div className={s.boxLabel}>
     <label className={s.label}>
      <div className={s.inputContainer}>
       <PiLockFill size={24} className={s.icon} />
       <input
        type={showPassword ? "text" : "password"}
        placeholder="New Password"
        autoComplete="new-password"
        className={s.regInput}
        {...register("newPassword", { onChange: handlePasswordChange })}
       />
       {isPasswordFilled && (
        <button
         type="button"
         className={s.togglePassButton}
         onClick={togglePasswordVisibility}
        >
         {showPassword ? (
          <AiOutlineEye size={20} className={s.eyeIcon} />
         ) : (
          <AiOutlineEyeInvisible size={20} className={s.eyeIcon} />
         )}
        </button>
       )}
      </div>
      <div className={s.errorWrapper}>
       {errors.newPassword && (
        <p className={s.error}>{errors.newPassword.message}</p>
       )}
      </div>
     </label>

     <label className={s.label}>
      <div className={s.inputContainer}>
       <PiLockFill size={24} className={s.icon} />
       <input
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm New Password"
        autoComplete="new-password"
        className={s.regInput}
        {...register("confirmNewPassword", {
         onChange: handleConfirmPasswordChange,
        })}
       />
       {isConfirmPasswordFilled && (
        <button
         type="button"
         className={s.togglePassButton}
         onClick={toggleConfirmPasswordVisibility}
        >
         {showConfirmPassword ? (
          <AiOutlineEye size={20} className={s.eyeIcon} />
         ) : (
          <AiOutlineEyeInvisible size={20} className={s.eyeIcon} />
         )}
        </button>
       )}
      </div>
      <div className={s.errorWrapper}>
       {errors.confirmNewPassword && (
        <p className={s.error}>{errors.confirmNewPassword.message}</p>
       )}
      </div>
      <ProgressBar
       password={newPassword}
       confirmPassword={confirmNewPasswordValue}
      />
     </label>
    </div>

    <Button
     type="submit"
     text="Reset Password"
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

export default ResetPasswordForm;
