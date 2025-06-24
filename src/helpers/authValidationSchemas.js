import * as yup from "yup";

export const validationSchemaRequestReset = yup.object().shape({
 email: yup.string().email("Invalid email").required("Email is required"),
});

export const validationSchemaReset = yup.object().shape({
 newPassword: yup
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(20, "Password must be at most 20 characters")
  .required("New password is required"),
 confirmNewPassword: yup
  .string()
  .oneOf([yup.ref("newPassword"), null], "Passwords must match")
  .required("Confirm new password is required"),
});
