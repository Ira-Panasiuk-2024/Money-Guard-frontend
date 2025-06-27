import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import css from "./EditTransactionForm.module.css";
import Button from "../Button/Button";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import {
 setEditTransaction,
 useTransactionsPagination,
} from "../../redux/transactions/slice";
import {
 updateTransaction,
 getCategories,
 getTransactions,
} from "../../redux/transactions/operations";
import { toast } from "react-toastify";
import { BiCalendar } from "react-icons/bi";
import { useEffect, useState } from "react";
import {
 selectIncomeCategories,
 selectExpenseCategories,
} from "../../redux/transactions/selectors";
import { format, parseISO } from "date-fns";

const validationSchema = yup.object().shape({
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

const EditTransactionForm = ({ transaction }) => {
 const dispatch = useDispatch();
 const pagination = useTransactionsPagination();

 const incomeCategories = useSelector(selectIncomeCategories);
 const expenseCategories = useSelector(selectExpenseCategories);
 const [availableCategories, setAvailableCategories] = useState([]);

 const {
  register,
  handleSubmit,
  control,
  formState: { errors },
  watch,
  setValue,
  getValues,
 } = useForm({
  resolver: yupResolver(validationSchema),
  defaultValues: {
   sum: transaction?.sum,
   date: transaction?.date ? parseISO(transaction.date) : null,
   comment: transaction?.comment || "",
   type: transaction?.type || "expense",
   categoryId: transaction?.categoryId?._id || transaction?.categoryId || "",
  },
 });

 const watchType = watch("type");

 useEffect(() => {
  if (incomeCategories.length === 0 && expenseCategories.length === 0) {
   dispatch(getCategories());
  }
 }, [dispatch, incomeCategories, expenseCategories]);

 useEffect(() => {
  let filteredCategories = [];
  if (watchType === "expense") {
   filteredCategories = expenseCategories;
  } else if (watchType === "income") {
   filteredCategories = incomeCategories;
  }

  setAvailableCategories(filteredCategories);

  const currentCategoryId = getValues("categoryId");
  const isCurrentCategoryAvailable = filteredCategories.some(
   (cat) => cat._id === currentCategoryId
  );

  if (!isCurrentCategoryAvailable && filteredCategories.length > 0) {
   setValue("categoryId", filteredCategories[0]._id);
  } else if (filteredCategories.length === 0) {
   setValue("categoryId", "");
  }
 }, [watchType, incomeCategories, expenseCategories, setValue, getValues]);

 const handleTypeChange = (type) => {
  if (type !== watchType) {
   setValue("type", type);
  }
 };

 const onSubmit = async (data) => {
  const updatedTransaction = {
   _id: transaction._id,
   sum: data.sum,
   date: data.date ? format(data.date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") : null,
   comment: data.comment,
   type: data.type,
   categoryId: data.categoryId,
  };

  try {
   await dispatch(updateTransaction(updatedTransaction)).unwrap();
   toast.success("Transaction updated successfully!");
   dispatch(setEditTransaction(null));
   dispatch(
    getTransactions({ page: pagination.page, perPage: pagination.perPage })
   );
  } catch (error) {
   const errorMessage = error.message || "Something went wrong";
   if (error.data?.message && error.data.message.includes("does not match")) {
    toast.error(
     "Category type does not match transaction type. Please select a compatible category."
    );
   } else {
    const backendErrorMessage = error.data?.message || errorMessage;
    toast.error(`Error: ${backendErrorMessage}`);
   }
  }
 };

 return (
  <form className={css.transaction_form} onSubmit={handleSubmit(onSubmit)}>
   <div className={css.type_toggle}>
    <span
     className={`${css.type_option} ${
      watchType === "income" ? css.active : ""
     }`}
     onClick={() => handleTypeChange("income")}
    >
     Income
    </span>
    <span className={css.separator}>/</span>
    <span
     className={`${css.type_option} ${
      watchType === "expense" ? css.active : ""
     }`}
     onClick={() => handleTypeChange("expense")}
    >
     Expense
    </span>
   </div>
   <input type="hidden" {...register("type")} />
   <div className={css.form_row}>
    <div className={css.form_group}>
     <input
      type="number"
      step="0.01"
      placeholder="Enter amount"
      {...register("sum")}
      className={css.inputSumm}
     />
     <div className={css.error}>
      {errors.sum && <p className={css.error}>{errors.sum.message}</p>}
     </div>

     <select
      {...register("categoryId")}
      className={css.input}
      disabled={availableCategories.length === 0}
     >
      <option value="" disabled hidden>
       {availableCategories.length === 0
        ? "No categories available"
        : "Select a category"}
      </option>
      {availableCategories.map((category) => (
       <option key={category._id} value={category._id}>
        {category.name}
       </option>
      ))}
     </select>
     <div className={css.error}>
      {errors.categoryId && (
       <p className={css.error}>{errors.categoryId.message}</p>
      )}
     </div>

     <Controller
      control={control}
      name="date"
      render={({ field }) => (
       <div className={css.date_picker_container}>
        <DatePicker
         {...field}
         selected={field.value}
         onChange={(date) => field.onChange(date)}
         className={css.input}
         dateFormat="dd.MM.yyyy"
         maxDate={new Date()}
         placeholderText="Select date"
        />
        <div className={css.date_icon}>
         <BiCalendar size={24} />
        </div>
       </div>
      )}
     />
     <div className={css.error}>
      {errors.date && <p className={css.error}>{errors.date.message}</p>}
     </div>
    </div>

    <div className={css.comment}>
     <input
      placeholder="Comment"
      {...register("comment")}
      className={css.textarea}
     />
     <div className={css.error}>
      {errors.comment && <p className={css.error}>{errors.comment.message}</p>}
     </div>
    </div>
   </div>

   <div className={css.button_group}>
    <Button text="Save" className={css.submit_button} type="submit" />
    <ButtonCancel onClick={() => dispatch(setEditTransaction(null))} />
   </div>
  </form>
 );
};

export default EditTransactionForm;
