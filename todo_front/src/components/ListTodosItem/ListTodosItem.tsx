import React from "react";
import { ITodo } from "../../types";
import css from "./ListTodoItem.module.scss";

interface IListTodosItemProps extends Omit<ITodo, 'id'> {
  number: number;
}

const ListTodosItem = ({ number, title, text, done }: IListTodosItemProps) => {
  return (
    <li className={css.list__item}>
      <span>{number}</span>
      <span>{title}</span>
      <span>{text}</span>
      <span>{done}</span>
    </li>
  );
};

export default ListTodosItem;
