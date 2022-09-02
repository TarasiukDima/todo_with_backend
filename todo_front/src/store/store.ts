import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { todoApi } from "./todoApi";
import { userApi } from "./userApi";
import appReducer from "./appSlice";
import { unauthUserHandler } from "./middlewares/unauthUserHandler";

const reducersObj = {
  app: appReducer,
  [todoApi.reducerPath]: todoApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
};

export const createStore = () =>
  configureStore({
    reducer: reducersObj,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: true,
      }).concat(userApi.middleware, todoApi.middleware, unauthUserHandler),

    devTools: process.env.NODE_ENV !== "production",
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type TodoDispatch = typeof store.dispatch;

export const useTodoSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTodoDispatch = () => useDispatch<TodoDispatch>();
