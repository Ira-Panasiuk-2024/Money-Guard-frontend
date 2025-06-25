import Container from "../../components/Container/Container.jsx";
import RequestResetPasswordForm from "../../components/AuthForms/RequestResetPasswordForm.jsx";
import s from "./RequestResetPasswordFormPage.module.css";

const RequestResetPasswordFormPage = () => {
 return (
  <section className={s.requestResetPasswordFormPage}>
   <Container className={s.requestResetPassword}>
    <RequestResetPasswordForm />
   </Container>
  </section>
 );
};

export default RequestResetPasswordFormPage;
