import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL, COUNT_TODOS_PAGE } from "../settings";
import { RootState } from "./store";
import { ICreateTodo, ITodo, ITodoData, IUpdateTodo } from "../types";

interface ITodoQuery {
  offset?: number;
  limit?: number;
}

export const todoApi = createApi({
  reducerPath: "todo",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/todo/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).app.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
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
