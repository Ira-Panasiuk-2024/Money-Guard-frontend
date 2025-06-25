import Container from "../../components/Container/Container.jsx";
import ResetPasswordForm from "../../components/AuthForms/ResetPasswordForm.jsx";
import s from "./ResetPasswordFormPage.module.css";

const ResetPasswordFormPage = () => {
 return (
  <section className={s.resetPasswordFormPage}>
   <Container className={s.resetPassword}>
    <ResetPasswordForm />
   </Container>
  </section>
 );
};

export default ResetPasswordFormPage;
