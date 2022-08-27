import React, { FC, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useGetAllTodosQuery } from "../../store/todoApi";
import { List } from "@mui/material";
import ListTodosItem from "../ListTodosItem";
import CloseButton from "../CloseButton";
import { messageErrorOptions } from "../../settings";
import { IErrorAnswer } from "../../types";
import css from "./ListTodos.module.scss";
import Spinner from "../Spinner";

const ListTodos: FC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    data: todos = { items: [], count: 0 },
    error: errorLoadTodo,
    isLoading: isLoadingTodos,
  } = useGetAllTodosQuery();

  useEffect(() => {
    if (errorLoadTodo && "data" in errorLoadTodo) {
      const { message } = errorLoadTodo.data as IErrorAnswer;

      enqueueSnackbar(message, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorLoadTodo, enqueueSnackbar, closeSnackbar]);

  if (isLoadingTodos) return <Spinner size={150} mt={3} />;

  if (!todos.items.length) return null;

  return (
    <List className={css.list}>
      {todos.items.map((oneTodo, index) => (
        <ListTodosItem key={oneTodo.id} {...oneTodo} number={index + 1} />
      ))}
    </List>
  );
};

export default ListTodos;
