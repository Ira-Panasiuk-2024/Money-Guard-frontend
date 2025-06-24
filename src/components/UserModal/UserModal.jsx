import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./UserModal.module.css";
import { setOpenUserProfile, useAuth } from "../../redux/auth/slice";
import { selectUserProfile } from "../../redux/auth/selectors";
import Button from "../Button/Button";
import Avatar from "../Avatar/Avatar";
import { updateUser } from "../../redux/auth/operations";
import { validationSchemaUserUpdate } from "../../helpers/userSchema";
import useMedia from "../../helpers/useMedia";
import clsx from "clsx";

const UserModal = () => {
 const dispatch = useDispatch();
 const { user } = useAuth();
 const isUserOpen = useSelector(selectUserProfile);
 const inputAvatar = useRef(null);
 const { isMobile } = useMedia;

 const [photo, setFile] = useState(null);
 const [fileError, setFileError] = useState(null);

 const onSubmit = async (data) => {
  setFileError(null);

  const form = new FormData();

  if (data.name !== user.name || dirtyFields.name) {
   form.append("name", data.name);
  }

  if (photo) {
   form.append("photo", photo);
  }

  if (!photo && (!dirtyFields.name || data.name === user.name)) {
   dispatch(setOpenUserProfile(false));
   return;
  }

  try {
   await dispatch(updateUser(form)).unwrap();
   dispatch(setOpenUserProfile(false));
   setFile(null);
  } catch (error) {
   if (
    (typeof error === "string" && error.includes("File")) ||
    error.includes("size")
   ) {
    setFileError(error);
   }
  }
 };

 const handlePhotoChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
   setFile(selectedFile);
   setFileError(null);
  }
 };

 const {
  register,
  handleSubmit,
  formState: { errors, dirtyFields },
  watch,
 } = useForm({
  mode: "all",
  defaultValues: {
   name: user.name,
  },
  resolver: yupResolver(validationSchemaUserUpdate),
 });

 const watchedName = watch("name");

 const isSaveDisabled =
  (errors.name && errors.name.message) ||
  (!dirtyFields.name && !photo) ||
  (dirtyFields.name && watchedName === user.name);

 return (
  <ModalWindow
   closeModal={() => dispatch(setOpenUserProfile(false))}
   modalIsOpen={isUserOpen}
   title="Edit Profile"
   showIcon={isMobile ? false : true}
  >
   <div className={s.modalBox}>
    <form onSubmit={handleSubmit(onSubmit)}>
     <Avatar
      user={{
       photo: photo ? URL.createObjectURL(photo) : user.photo,
       name: user.name,
      }}
      edit={true}
      onAvatarEdit={() => inputAvatar.current.click()}
     ></Avatar>
     <input
      {...register("avatar")}
      type="file"
      id="avatar-upload"
      accept="image/*"
      onChange={handlePhotoChange}
      ref={inputAvatar}
      className={s.file}
     />
     {fileError && <p className={s.error}>{fileError}</p>}{" "}
     <input
      className={clsx(s.textEdit, errors.name && s.invalid)}
      placeholder="Name"
      type="text"
      {...register("name", { required: true })}
     />
     <div className={s.error}>
      {errors.name && <p>{errors.name.message}</p>}
     </div>
     <Button
      text="save"
      disabled={isSaveDisabled}
      className={clsx(s.save, isSaveDisabled && s.opacity)}
     />
    </form>
   </div>
  </ModalWindow>
 );
};

export default UserModal;
