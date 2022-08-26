import React, { FC } from "react";
import { List } from "@mui/material";
import ListTodosItem from "../ListTodosItem";
import css from "./ListTodos.module.scss";

const ListTodos: FC = () => {
  const todoList = [
    {
      id: "1234",
      title: "to do",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, est, corrupti quibusdam nobis assumenda, ullam deleniti recusandae quod commodi voluptatum iusto accusantium ipsa repellendus ab harum nesciunt unde beatae voluptates!",
      done: true,
    },
    {
      id: "13634",
      title: "reading",
      text: "do something",
      done: false,
    },
    {
      id: "12134",
      title: "to do",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, est, corrupti quibusdam nobis assumenda, ullam deleniti recusandae quod commodi voluptatum iusto accusantium ipsa repellendus ab harum nesciunt unde beatae voluptates!",
      done: true,
    },
    {
      id: "132234",
      title: "reading",
      text: "do something",
      done: false,
    },
    {
      id: "13234",
      title: "to do",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, est, corrupti quibusdam nobis assumenda, ullam deleniti recusandae quod commodi voluptatum iusto accusantium ipsa repellendus ab harum nesciunt unde beatae voluptates!",
      done: true,
    },
    {
      id: "14334",
      title: "reading",
      text: "do something",
      done: false,
    },
    {
      id: "12534",
      title: "to do",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, est, corrupti quibusdam nobis assumenda, ullam deleniti recusandae quod commodi voluptatum iusto accusantium ipsa repellendus ab harum nesciunt unde beatae voluptates!",
      done: true,
    },
    {
      id: "136334",
      title: "reading",
      text: "do something",
      done: false,
    },
    {
      id: "12374",
      title: "to do",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, est, corrupti quibusdam nobis assumenda, ullam deleniti recusandae quod commodi voluptatum iusto accusantium ipsa repellendus ab harum nesciunt unde beatae voluptates!",
      done: true,
    },
    {
      id: "13384",
      title: "reading",
      text: "do something",
      done: false,
    },
    {
      id: "112374",
      title: "to do",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, est, corrupti quibusdam nobis assumenda, ullam deleniti recusandae quod commodi voluptatum iusto accusantium ipsa repellendus ab harum nesciunt unde beatae voluptates!",
      done: true,
    },
    {
      id: "123384",
      title: "reading",
      text: "do something",
      done: false,
    },
    {
      id: "132374",
      title: "to do",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, est, corrupti quibusdam nobis assumenda, ullam deleniti recusandae quod commodi voluptatum iusto accusantium ipsa repellendus ab harum nesciunt unde beatae voluptates!",
      done: true,
    },
    {
      id: "134384",
      title: "reading",
      text: "do something",
      done: false,
    },
  ];

  if (!todoList.length) return null;

  return (
    <List className={css.list}>
      {todoList.map(({ id, ...last }, index) => (
        <ListTodosItem key={id} {...last} number={index + 1} />
      ))}
    </List>
  );
};

export default ListTodos;
