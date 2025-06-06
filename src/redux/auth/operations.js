import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { toasterCustomStyles } from "../../helpers/toasterCustomStyles.js";
import { useAxios } from "../../service/axios.js";

export const registerThunk = createAsyncThunk(
 "auth/register",
 async (credentials, thunkAPI) => {
  try {
   const { data } = await useAxios().post("/auth/register", credentials);

   toast.success(`Welcome, ${data.data.user.name}!`, toasterCustomStyles);
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
    message = backendMessage || "Unauthorized";
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
   return thunkApi.rejectWithValue(error.response?.status || 500);
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
   return thunkApi.rejectWithValue(error.status);
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
   return data;
  } catch (error) {
   return thunkApi.rejectWithValue(error.status);
  }
 }
);
