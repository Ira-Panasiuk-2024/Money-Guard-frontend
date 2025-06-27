import * as yup from "yup";

export const EditTransactionSchema = yup.object().shape({
 sum: yup
  .number()
  .required("Please enter the amount")
  .positive("Amount must be greater than zero")
  .typeError("Amount must be a number"),
 date: yup.date().required("Date is required").typeError("Invalid date format"),
 comment: yup.string().max(60, "Comment is too long"),
 type: yup
  .string()
  .oneOf(["income", "expense"], "Invalid transaction type")
  .required("Transaction type is required"),
 categoryId: yup.string().required("Category is required"),
});
