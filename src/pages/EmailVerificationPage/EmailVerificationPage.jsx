import Container from "../../components/Container/Container.jsx";
import EmailVerification from "../../components/AuthForms/EmailVerification.jsx";
import s from "./EmailVerificationPage.module.css";

const EmailVerificationPage = () => {
 return (
  <section className={s.emailVerificationPage}>
   <Container className={s.emailVerification}>
    <EmailVerification />
   </Container>
  </section>
 );
};

export default EmailVerificationPage;
