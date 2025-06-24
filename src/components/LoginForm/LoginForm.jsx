import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { PiLockFill } from "react-icons/pi";

import Button from "../Button/Button.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import { loginThunk } from "../../redux/auth/operations.js";
import { selectIsLoading } from "../../redux/global/selectors.js";
import { validationSchemaLogin } from "../../helpers/loginSchema.js";
import Loader from "../Loader/Loader.jsx";
import s from "./LoginForm.module.css";

const LoginForm = () => {
 const dispatch = useDispatch();
 const isLoading = useSelector(selectIsLoading);

 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
 } = useForm({
  resolver: yupResolver(validationSchemaLogin),
  mode: "onChange",
 });

 const [showPassword, setShowPassword] = useState(false);
 const [isPasswordFilled, setIsPasswordFilled] = useState(false);

 const togglePasswordVisibility = () => {
  setShowPassword((prevState) => !prevState);
 };

 const handlePasswordChange = (e) => {
  const value = e.target.value;
  setIsPasswordFilled(value.length > 0);
 };

 const navigate = useNavigate();

 const onSubmit = async (data) => {
  try {
   await dispatch(loginThunk(data)).unwrap();
   navigate("/dashboard");
  } catch (error) {
   console.error(error);
  }
 };

 return (
  <div className={s.loginContainer}>
   <form onSubmit={handleSubmit(onSubmit)} className={s.loginForm}>
    <div className={s.loginLogo}>
     <Logo className={s.iconLogo} />
    </div>
    <div className={s.loginBoxLabel}>
     <label className={s.label}>
      <div className={s.inputContainerLogo}>
       <MdEmail size={24} className={s.icon} />
       <input
        type="email"
        placeholder="E-mail"
        className={s.regInput}
        {...register("email")}
        autoComplete="email"
       />
      </div>
      <div className={s.errorWrapper}>
       {errors.email && <p className={s.error}>{errors.email.message}</p>}
      </div>
     </label>

     <label className={s.label}>
      <div className={s.inputContainerLogo}>
       <PiLockFill size={24} className={s.icon} />
       <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className={s.regInput}
        {...register("password", {
         onChange: (e) => {
          handlePasswordChange(e);
         },
        })}
        autoComplete="current-password"
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
       {errors.password && <p className={s.error}>{errors.password.message}</p>}
      </div>
     </label>
    </div>
    <Button
     type="submit"
     text="Log in"
     className={s.button}
     disabled={isSubmitting || isLoading}
    />
    <Link to="/register" className={s.link}>
     Register
    </Link>
    <Link to="/request-reset-password" className={s.link}>
     Forgot Password?
    </Link>
   </form>
   {isLoading && <Loader />}
  </div>
 );
};

export default LoginForm;
