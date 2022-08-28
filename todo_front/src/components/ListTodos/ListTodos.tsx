import React, { FC, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useGetAllTodosQuery } from "../../store/todoApi";
import { useTodoDispatch, useTodoSelector } from "../../store/store";
import { List, Pagination } from "@mui/material";
import ListTodosItem from "../ListTodosItem";
import CloseButton from "../CloseButton";
import { COUNT_TODOS_PAGE, messageErrorOptions } from "../../settings";
import { IErrorAnswer } from "../../types";
import css from "./ListTodos.module.scss";
import Spinner from "../Spinner";
import { setPage } from "../../store/appSlice";
import { checkPage, savePage } from "../../utils";

const ListTodos: FC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { page } = useTodoSelector((state) => state.app);
  const dispatch = useTodoDispatch();

  const {
    data: todos = { items: [], count: 0 },
    error: errorLoadTodo,
    isLoading,
    isFetching,
  } = useGetAllTodosQuery({ offset: page });

  useEffect(() => {
    if (errorLoadTodo && "data" in errorLoadTodo) {
      const { message } = errorLoadTodo.data as IErrorAnswer;

      enqueueSnackbar(message, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorLoadTodo, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (todos.items.length === 0 && todos.count > 0) {
      const maxPage = Math.ceil(todos.count / COUNT_TODOS_PAGE);

      if (page > maxPage) {
        dispatch(setPage(maxPage));
        savePage(maxPage);
      } else if (page < 1) {
        dispatch(setPage(1));
        savePage(1);
      }
    }
  }, [todos, dispatch, page]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const maxPage = Math.ceil(todos.count / COUNT_TODOS_PAGE);
    const currentPage = checkPage(value, maxPage);

    dispatch(setPage(currentPage));
    savePage(currentPage);
  };

  if (isLoading) return <Spinner size={150} mt={3} />;

  return (
    <>
      {todos.count && todos.items.length ? (
        <List className={css.list}>
          {todos.items.map((oneTodo, index) => (
            <ListTodosItem
              key={oneTodo.id}
              {...oneTodo}
              number={(page - 1) * COUNT_TODOS_PAGE + (index + 1)}
            />
          ))}
        </List>
      ) : null}

      {todos.count > COUNT_TODOS_PAGE && (
        <Pagination
          className={css.pagination}
          count={Math.ceil(todos.count / COUNT_TODOS_PAGE)}
          page={page}
          color="primary"
          onChange={handlePageChange}
          disabled={isLoading || isFetching}
        />
      )}
    </>
  );
};

export default ListTodos;
