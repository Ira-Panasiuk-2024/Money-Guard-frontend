import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react"; // Додано useEffect
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";
import { BiCalendar } from "react-icons/bi";
import {
 selectCategories,
 selectPage,
} from "../../redux/transactions/selectors";
import {
 addTransactions,
 getTransactions,
 getCategories,
} from "../../redux/transactions/operations";
import { setAddTransaction } from "../../redux/transactions/slice";
import { AddTransactionSchema } from "../../helpers/addTransactionSchema";
import s from "./AddTransactionForm.module.css";
import Switch from "../Switch/Switch";
import Button from "../Button/Button";

const AddTransactionForm = ({ closeModal }) => {
 const [startDate, setStartDate] = useState(new Date());
 const [isChecked, setIsChecked] = useState(true);
 const categories = useSelector(selectCategories);
 const page = useSelector(selectPage);

 const dispatch = useDispatch();

 useEffect(() => {
  if (!categories || categories.length === 0) {
   dispatch(getCategories());
  }
 }, [dispatch, categories]);

 const availableCategories = categories.filter(
  (category) => category.type === (isChecked ? "expense" : "income")
 );

 const {
  register,
  handleSubmit,
  control,
  formState: { errors },
  reset,
  setValue,
  getValues,
 } = useForm({
  resolver: yupResolver(AddTransactionSchema),
  defaultValues: {
   sum: "",
   comment: "",
   date: new Date(),
   categoryId: "",
  },
 });

 useEffect(() => {
  if (availableCategories.length > 0) {
   const currentCategoryId = getValues("categoryId");
   const isCurrentCategoryAvailable = availableCategories.some(
    (cat) => cat._id === currentCategoryId
   );

   if (!isCurrentCategoryAvailable) {
    setValue("categoryId", availableCategories[0]._id);
   }
  } else {
   setValue("categoryId", "");
  }
 }, [isChecked, availableCategories, setValue, getValues]);

 const onSubmit = async (data) => {
  const newTransaction = {
   type: isChecked ? "expense" : "income",
   categoryId: data.categoryId,
   sum: data.sum,
   date: data.date,
   comment: data.comment,
  };

  dispatch(addTransactions(newTransaction))
   .unwrap()
   .then(() => {
    toast.success("Transaction added successfully!");
    dispatch(getTransactions({ page: page }));
    reset();
    closeModal(() => dispatch(setAddTransaction(false)));
   })
   .catch((error) => {
    console.error(`Failed to add transaction: ${error.message}`);
    const errorMessage = error.message || "Something went wrong";
    if (errorMessage.includes("does not match")) {
     toast.error(
      "Category type does not match transaction type. Please select a compatible category."
     );
    } else {
     const backendErrorMessage = error.data?.message || errorMessage;
     toast.error(`Error: ${backendErrorMessage}`);
    }
   });
 };

 return (
  <div className={s.wrapper}>
   <Switch
    className={s.switch}
    onChange={setIsChecked}
    defaultValue={true}
    checked={isChecked}
   />

   <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
    <div className={s.select_error_box}>
     <>
      <div className={s.select_box}>
       <select
        className={s.select}
        name="categoryId"
        defaultValue=""
        {...register("categoryId")}
        disabled={availableCategories.length === 0}
       >
        <option value="" disabled hidden>
         {availableCategories.length === 0
          ? "No categories available"
          : "Select a category"}
        </option>

        {availableCategories.map((items) => (
         <option key={items._id} value={items._id}>
          {items.name}
         </option>
        ))}
       </select>
       <IoIosArrowDown className={s.select_icon} />
      </div>
      <div className={s.error_box}>
       {errors.categoryId && (
        <p className={s.errors}>{errors.categoryId.message}</p>
       )}
      </div>
     </>
    </div>

    <div className={s.box_sum_date}>
     <div className={s.date_box}>
      <input
       className={s.sum}
       {...register("sum")}
       type="number"
       defaultValue=""
       placeholder="0.00"
       step={0.01}
       min={0.01}
      />
      <div className={s.error_box}>
       {errors.sum && <p className={s.errors}>{errors.sum.message}</p>}
      </div>
     </div>
     <div className={s.date_box}>
      <Controller
       name="date"
       control={control}
       className={s.controller}
       render={({ field }) => (
        <>
         <DatePicker
          {...field}
          selected={field.value || startDate}
          onChange={(date) => {
           field.onChange(date);
           setStartDate(date);
          }}
          dateFormat="dd.MM.yyyy"
          className={s.DatePicker}
          maxDate={new Date()}
         />
        </>
       )}
      />
      <div className={s.error_box}>
       {errors.date && <p className={s.errors}>{errors.date.message}</p>}
      </div>
     </div>
    </div>

    <div className={s.comment_error_box}>
     <input
      className={s.comment}
      {...register("comment")}
      placeholder="Comment"
      autoComplete="off"
      type="text"
     />
     <div className={s.error_box}>
      {errors.comment && <p className={s.errors}>{errors.comment.message}</p>}
     </div>
    </div>
    <Button className={s.add_btn} text="ADD" />
   </form>
  </div>
 );
};

export default AddTransactionForm;
