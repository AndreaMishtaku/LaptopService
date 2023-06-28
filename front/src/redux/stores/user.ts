import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "../../assets/interfaces";
import AuthManager from "../../utils/authManager";

export const login = createAsyncThunk(
  "auth/login",
  async (data: any): Promise<IUserState> => {
    const response = await AuthManager.logIn(data.email, data.password);
    return response;
  }
);

const userStore = createSlice({
  name: "user",
  initialState: null as unknown as IUserState,
  reducers: {
    setUser(_state, action: PayloadAction<any>) {
      return action.payload;
    },
    logout(_state) {
      AuthManager.logOut();
      return null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.rejected, (state, action) => {
        return null;
      })
      .addCase(login.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default userStore.reducer;

export const { setUser, logout } = userStore.actions;
