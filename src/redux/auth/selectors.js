export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;

export const selectBalance = (state) => state.auth.user.balance || 0;

export const selectConfirmLogout = (state) => state.auth.isConfirmLogout;

export const selectUserProfile = (state) => state.auth.isUserOpen;

export const selectIsUserVerified = (state) => state.auth.user.isVerified;
