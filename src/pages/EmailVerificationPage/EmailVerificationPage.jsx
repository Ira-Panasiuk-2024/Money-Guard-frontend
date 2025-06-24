import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { verifyEmailThunk } from "../../redux/auth/operations.js";
import { toasterCustomStyles } from "../../helpers/toasterCustomStyles.js";
import Loader from "../../components/Loader/Loader.jsx";
import s from "./EmailVerificationPage.module.css";

const EmailVerificationPage = () => {
 const dispatch = useDispatch();
 const location = useLocation();
 const navigate = useNavigate();

 useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  if (token) {
   dispatch(verifyEmailThunk(token))
    .unwrap()
    .then(() => {
     setTimeout(() => {
      navigate("/login");
     }, 3000);
    })
    .catch(() => {
     setTimeout(() => {
      navigate("/register");
     }, 3000);
    });
  } else {
   toast.error("Verification token is missing.", toasterCustomStyles);
   navigate("/register");
  }
 }, [dispatch, location.search, navigate]);

 return (
  <div className={s.container}>
   <h1 className={s.title}>Verifying your email...</h1>
   <p className={s.text}>Please wait while we confirm your email address.</p>

   <Loader />
  </div>
 );
};

export default EmailVerificationPage;
