import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { RootState, TodoDispatch } from "./store";
import { setRefreshToken, setToken } from "./appSlice";
import { refreshTokenFn, setLocalStorageTokens } from "../utils";
import { BACKEND_URL, COUNT_TODOS_PAGE } from "../settings";
import {
  ICreateTodo,
  ITodo,
  ITodoData,
  ITokenAnswer,
  IUpdateTodo,
} from "../types";

interface ITodoQuery {
  offset?: number;
  limit?: number;
}

type TBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
>;

const changeTokenInfo = (
  dispatch: TodoDispatch,
  token: string,
  refreshToken: string
) => {
  setLocalStorageTokens(token, refreshToken);
  dispatch(setToken(token));
  dispatch(setRefreshToken(refreshToken));
};

export const todoBaseQuery = fetchBaseQuery({
  baseUrl: `${BACKEND_URL}/todo/`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).app.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const todoBaseQueryWithReauth: TBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await todoBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const { refreshToken } = (api.getState() as RootState).app;

    try {
      const newPair: ITokenAnswer = await refreshTokenFn(refreshToken);
      if (!newPair || !newPair.accessToken || !newPair.refreshToken) {
        return result;
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        newPair;
      changeTokenInfo(api.dispatch, newAccessToken, newRefreshToken);

      result = await todoBaseQuery(args, api, extraOptions);
    } catch (error) {
      return result;
    }
  }
  return result;
};

export const todoApi = createApi({
  reducerPath: "todo",
  baseQuery: todoBaseQueryWithReauth,
  tagTypes: ["Todo"],
  endpoints: (build) => ({
    getAllTodos: build.query<ITodoData, ITodoQuery>({
      query: ({ offset = 1, limit = COUNT_TODOS_PAGE }) => ({
        url: "",
        params: { offset: (offset - 1) * limit, limit },
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Todo" as const, id })),
              { type: "Todo", id: "LIST" },
            ]
          : [{ type: "Todo", id: "LIST" }],
    }),

    addTodo: build.mutation<ITodo, ICreateTodo>({
      query: (body: ICreateTodo) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),

    updateTodo: build.mutation<ITodo, { body: IUpdateTodo; id: string }>({
      query: ({ body, id }) => ({
        url: id,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),

    deleteTodo: build.mutation<null, string>({
      query: (id: string) => ({
        url: id,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
