import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addOrUpdateUser: (state: any, action) => {
      const newUser = action.payload;
      const existingUserIndex = state.users.findIndex(
        (user: any) => user.key === newUser.key
      );

      if (existingUserIndex !== -1) {
        state.users[existingUserIndex] = {
          ...state.users[existingUserIndex],
          ...newUser,
        };
      } else {
        state.users = [...state.users, newUser];
      }

      localStorage.setItem("users", JSON.stringify(state.users));
    },
    removeUser: (state: any, action) => {
      state.users = state.users.filter(
        (user: any) => !action.payload.includes(user.key)
      );

      state.users = [...state.users];
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    loadUsersFromLocalStorage: (state) => {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        state.users = JSON.parse(storedUsers);
      }
    },
  },
});

export const { addOrUpdateUser, removeUser, loadUsersFromLocalStorage } =
  userSlice.actions;
export default userSlice.reducer;
