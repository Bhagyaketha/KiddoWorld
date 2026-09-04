
import { createSlice } from "@reduxjs/toolkit";

// Get previously logged-in user from localStorage
const savedUser = localStorage.getItem("loggedInUser");

const initialState = {
  currentUser: savedUser
    ? JSON.parse(savedUser)
    : null,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {

    loginUser: (state, action) => {

      state.currentUser = action.payload;

      // Save user in localStorage
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(action.payload)
      );
    },


    logoutUser: (state) => {

      state.currentUser = null;

      // Remove user from localStorage
      localStorage.removeItem("loggedInUser");
    },

  },
});

export const {
  loginUser,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;

