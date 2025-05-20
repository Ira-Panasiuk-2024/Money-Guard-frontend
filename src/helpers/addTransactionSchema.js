import * as yup from "yup";

export const AddTransactionSchema = yup.object({
 categoryId: yup.string().required("Please select a category"),
 sum: yup
  .number()
  .required("Please enter the amount")
  .typeError("Amount must be a number")
  .positive("Amount must be greater than zero"),
 comment: yup.string().max(60, "Max 60 characters"),
});
