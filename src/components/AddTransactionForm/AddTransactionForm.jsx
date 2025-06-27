import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState, useRef } from "react"; // Додано useRef
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";
import { BiCalendar } from "react-icons/bi";

import {
 selectPage,
 selectIncomeCategories,
 selectExpenseCategories,
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
import ButtonCancel from "../ButtonCancel/ButtonCancel";

const AddTransactionForm = ({ closeModal }) => {
 const [startDate, setStartDate] = useState(new Date());
 const [isChecked, setIsChecked] = useState(true);
 const [isSelectOpen, setIsSelectOpen] = useState(false);
 const [isCalendarOpen, setIsCalendarOpen] = useState(false);
 const selectRef = useRef(null);

 const incomeCategories = useSelector(selectIncomeCategories);
 const expenseCategories = useSelector(selectExpenseCategories);
 const page = useSelector(selectPage);

 const dispatch = useDispatch();

 useEffect(() => {
  if (incomeCategories.length === 0 && expenseCategories.length === 0) {
   dispatch(getCategories());
  }
 }, [dispatch, incomeCategories, expenseCategories]);

 const availableCategories = isChecked ? expenseCategories : incomeCategories;

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

 const handleSelectFocus = () => {
  setIsSelectOpen(true);
 };

 const handleSelectBlur = () => {
  setIsSelectOpen(false);
 };

 const handleSelectChange = (e) => {
  setIsSelectOpen(false);
  const { onChange } = register("categoryId");
  onChange(e);
 };

 const handleCalendarClick = () => {
  setIsCalendarOpen(!isCalendarOpen);
 };

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
    const errorMessage = error.message || "Something went wrong";
    if (error.data?.message && error.data.message.includes("does not match")) {
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
        ref={selectRef}
        className={s.select}
        name="categoryId"
        defaultValue=""
        {...register("categoryId")}
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
        onChange={handleSelectChange}
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
       <IoIosArrowDown
        className={`${s.select_icon} ${isSelectOpen ? s.select_icon_open : ""}`}
       />
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
        <div className={s.date_picker_container}>
         <DatePicker
          {...field}
          selected={field.value || startDate}
          onChange={(date) => {
           field.onChange(date);
           setStartDate(date);
           setIsCalendarOpen(false);
          }}
          dateFormat="dd.MM.yyyy"
          className={s.DatePicker}
          maxDate={new Date()}
          open={isCalendarOpen}
          onClickOutside={() => setIsCalendarOpen(false)}
          onFocus={() => setIsCalendarOpen(true)}
         />
         <div className={s.date_icon} onClick={handleCalendarClick}>
          <BiCalendar size={24} />
         </div>
        </div>
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

    <div className={s.buttonGroup}>
     <Button text="ADD" className={s.submitButton} type="submit" />
     <ButtonCancel onClick={() => dispatch(setAddTransaction(false))} />
    </div>
   </form>
  </div>
 );
};

export default AddTransactionForm;
