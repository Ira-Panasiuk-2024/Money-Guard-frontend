import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { toasterCustomStyles } from "../../helpers/toasterCustomStyles.js";
import { useAxios } from "../../service/axios.js";

export const registerThunk = createAsyncThunk(
 "auth/register",
 async (credentials, thunkAPI) => {
  try {
   const { data } = await useAxios().post("/auth/register", credentials);

   toast.success(
    "Registration successful! Please check your email to verify your account.",
    toasterCustomStyles
   );

   return data.data;
  } catch (error) {
   const status = error.response?.status;
   const backendMessage = error.response?.data?.message;
   let message = "Something went wrong. Please try again later.";

   if (status === 400) {
    message = backendMessage || "Invalid request data";
   } else if (status === 409) {
    message =
     backendMessage || "The user already exists. Please try another one";
   } else if (status === 500) {
    message = backendMessage || "Server error";
   }

   toast.error(message, toasterCustomStyles);
   return thunkAPI.rejectWithValue(message);
  }
 }
);

export const loginThunk = createAsyncThunk(
 "auth/login",
 async (credentials, thunkAPI) => {
  try {
   const { data } = await useAxios().post("/auth/login", credentials);
   toast.success(`Welcome back, ${data.data.user.name}!`, toasterCustomStyles);
   return data.data;
  } catch (error) {
   const status = error.response?.status;
   const backendMessage = error.response?.data?.message;
   let message = "Something went wrong. Please try again later.";

   if (status === 400) {
    message = backendMessage || "Invalid request data";
   } else if (status === 401) {
    message = backendMessage || "Email or password is incorrect";
   } else if (status === 403) {
    message = backendMessage || "Please verify your email to log in.";
   } else if (status === 404) {
    message = backendMessage || "Not Found";
   } else if (status === 500) {
    message = backendMessage || "Server Error";
   }

   toast.error(message, toasterCustomStyles);
   return thunkAPI.rejectWithValue(message);
  }
 }
);

export const logoutUser = createAsyncThunk(
 "auth/logout",
 async (_, thunkApi) => {
  try {
   const { token } = thunkApi.getState().auth;
   const { data } = await useAxios(token).post("/auth/logout");
   return data;
  } catch (error) {
   const status = error.response?.status;
   const backendMessage = error.response?.data?.message;
   let message = "Logout failed. Please try again.";

   if (status === 401) {
    message = backendMessage || "Authentication failed. Please log in again.";
   } else if (status === 500) {
    message = backendMessage || "Server error during logout.";
   }
   toast.error(message, toasterCustomStyles);
   return thunkApi.rejectWithValue(status || message);
  }
 }
);

export const currentUser = createAsyncThunk(
 "auth/user",
 async (_, thunkApi) => {
  try {
   const { token } = thunkApi.getState().auth;
   const { data } = await useAxios(token).get("/users/current");
   return data;
  } catch (error) {
   const status = error.response?.status;
   const message =
    error.response?.data?.message ||
    error.message ||
    "Failed to fetch user data.";
   toast.error(message, toasterCustomStyles);
   return thunkApi.rejectWithValue(status || message);
  }
 }
);

export const updateUser = createAsyncThunk(
 "user/update",
 async (newUser, thunkApi) => {
  try {
   const state = thunkApi.getState();
   const { token } = state.auth;
   const { data } = await useAxios(token).patch("/users/current", newUser);
   toast.success("Profile updated successfully!", toasterCustomStyles);
   return data;
  } catch (error) {
   const status = error.response?.status;
   const backendMessage = error.response?.data?.message;
   let message = "Something went wrong. Please try again later.";

   if (status === 400) {
    if (
     backendMessage &&
     (backendMessage.includes("File upload error") ||
      backendMessage.includes("Invalid file type") ||
      backendMessage.includes("File is too large") ||
      backendMessage.includes("Too many files uploaded") ||
      backendMessage.includes("Unexpected field"))
    ) {
     message = backendMessage;
    } else {
     message = backendMessage || "Invalid data provided.";
    }
   } else if (status === 404) {
    message = backendMessage || "User profile not found.";
   } else if (status === 401) {
    message = backendMessage || "Authentication failed. Please log in again.";
   } else if (status === 500) {
    message = backendMessage || "Server error. Please try again later.";
   } else {
    message = error.message || "An unexpected error occurred.";
   }

   toast.error(message, toasterCustomStyles);
   return thunkApi.rejectWithValue(message);
  }
 }
);

export const verifyEmailThunk = createAsyncThunk(
 "auth/verifyEmail",
 async (token, thunkAPI) => {
  try {
   const { data } = await useAxios().get(`/auth/verify?token=${token}`);
   toast.success(
    "Your email has been successfully verified!",
    toasterCustomStyles
   );
   return data;
  } catch (error) {
   const backendMessage = error.response?.data?.message;
   const message =
    backendMessage ||
    "Failed to verify email. Please try again or contact support.";
   toast.error(message, toasterCustomStyles);
   return thunkAPI.rejectWithValue(message);
  }
 }
);

export const requestPasswordResetThunk = createAsyncThunk(
 "auth/requestPasswordReset",
 async (email, thunkAPI) => {
  try {
   const { data } = await useAxios().post("/auth/request-reset-password", {
    email,
   });
   toast.success(
    "If an account with that email exists, a password reset link has been sent.",
    toasterCustomStyles
   );
   return data;
  } catch (error) {
   const backendMessage = error.response?.data?.message;
   const message =
    backendMessage || "Failed to send password reset link. Please try again.";
   toast.error(message, toasterCustomStyles);
   return thunkAPI.rejectWithValue(message);
  }
 }
);

export const resetPasswordThunk = createAsyncThunk(
 "auth/resetPassword",
 async ({ token, newPassword }, thunkAPI) => {
  try {
   const { data } = await useAxios().post(
    `/auth/reset-password?token=${token}`,
    { newPassword }
   );
   toast.success(
    "Your password has been successfully reset. You can now log in.",
    toasterCustomStyles
   );
   return data;
  } catch (error) {
   const backendMessage = error.response?.data?.message;
   const message =
    backendMessage ||
    "Failed to reset password. The link might be invalid or expired.";
   toast.error(message, toasterCustomStyles);
   return thunkAPI.rejectWithValue(message);
  }
 }
);
