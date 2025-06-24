import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import {
 currentUser,
 logoutUser,
 updateUser,
 registerThunk,
 loginThunk,
 verifyEmailThunk,
 requestPasswordResetThunk,
 resetPasswordThunk,
} from "./operations.js";
import { selectIsLoggedIn, selectUser, selectToken } from "./selectors.js";
import {
 addTransactions,
 deleteTransactions,
 updateTransaction,
} from "../transactions/operations.js";

const auth = {
 user: {
  name: null,
  email: null,
  photo: null,
  balance: 0,
  isVerified: false,
 },
 token: null,
 isLoggedIn: false,
 isConfirmLogout: false,
 isUserOpen: false,
};

export const useAuth = () => {
 const isLoggedIn = useSelector(selectIsLoggedIn);
 const user = useSelector(selectUser);
 const token = useSelector(selectToken);
 return {
  isLoggedIn,
  user,
  token,
 };
};

const authSlice = createSlice({
 name: "auth",
 initialState: auth,
 reducers: {
  setConfirmLogout(state, action) {
   state.isConfirmLogout = action.payload;
  },
  setOpenUserProfile(state, action) {
   state.isUserOpen = action.payload;
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(registerThunk.fulfilled, (state, action) => {
    state.user.name = action.payload.user.name;
    state.user.email = action.payload.user.email;
    state.user.isVerified = action.payload.user.isVerified;
   })
   .addCase(loginThunk.fulfilled, (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.isLoggedIn = true;
   })
   .addCase(logoutUser.fulfilled, (state) => {
    state.user = {
     name: null,
     email: null,
     photo: null,
     balance: 0,
     isVerified: false,
    };
    state.token = null;
    state.isLoggedIn = false;
    state.isConfirmLogout = false;
    state.isUserOpen = false;
   })
   .addCase(logoutUser.rejected, (state, action) => {
    if (action.payload === 401) {
     state.user = {
      name: null,
      email: null,
      photo: null,
      balance: 0,
      isVerified: false,
     };
     state.token = null;
     state.isLoggedIn = false;
     state.isConfirmLogout = false;
     state.isUserOpen = false;
    }
   })
   .addCase(deleteTransactions.fulfilled, (state, action) => {
    state.user.balance = action.payload.balance;
   })
   .addCase(addTransactions.fulfilled, (state, action) => {
    state.user.balance = action.payload.balance;
   })
   .addCase(currentUser.fulfilled, (state, { payload }) => {
    state.user = payload.data;
    state.isLoggedIn = true;
   })
   .addCase(updateTransaction.fulfilled, (state, action) => {
    state.user.balance = action.payload.balance;
   })
   .addCase(currentUser.rejected, (state, { payload }) => {
    if (payload === 401) {
     state.user = {
      name: null,
      email: null,
      photo: null,
      balance: 0,
      isVerified: false,
     };
     state.token = null;
     state.isLoggedIn = false;
     state.isConfirmLogout = false;
     state.isUserOpen = false;
    }
   })
   .addCase(updateUser.fulfilled, (state, action) => {
    state.user.photo = action.payload.data.photo;
    state.user.name = action.payload.data.name;
   })

   // eslint-disable-next-line no-unused-vars
   .addCase(verifyEmailThunk.fulfilled, (state, _action) => {
    state.user.isVerified = true;
   })

   // eslint-disable-next-line no-unused-vars
   .addCase(requestPasswordResetThunk.fulfilled, (_state, _action) => {
    // No additional logic needed, toast shows message
   })

   // eslint-disable-next-line no-unused-vars
   .addCase(resetPasswordThunk.fulfilled, (_state, _action) => {
    // No additional logic needed, toast shows message
   });
 },
});

const authReducer = authSlice.reducer;
export const { setConfirmLogout, setOpenUserProfile } = authSlice.actions;
export default authReducer;
