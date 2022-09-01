import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CURRENT_PAGE_LOCALSTORAGE,
  REFRESH_TOKEN_AUTH_LOCALSTORAGE,
  TOKEN_AUTH_LOCALSTORAGE,
} from "../settings";

export type IStateTodo = {
  token: string | null;
  refreshToken: string | null;
  page: number;
};

export const initialState: IStateTodo = {
  token: localStorage.getItem(TOKEN_AUTH_LOCALSTORAGE) || null,
  refreshToken: localStorage.getItem(REFRESH_TOKEN_AUTH_LOCALSTORAGE) || null,
  page: Math.abs(Number(localStorage.getItem(CURRENT_PAGE_LOCALSTORAGE))) || 1,
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },

    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setToken, setRefreshToken, setPage } = app.actions;

export default app.reducer;
