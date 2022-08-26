import React from "react";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, InputBase, TextField, Typography } from "@mui/material";
import css from "./FormTodo.module.scss";
import {
  FormTodoMessages,
  MAX_LENGTH_TODO_TEXT,
  MAX_LENGTH_TODO_TITLE,
  MIN_LENGTH_TODO_TEXT,
  MIN_LENGTH_TODO_TITLE,
} from "../../settings";

interface ITodoForm {
  title: string;
  description: string;
}

const FormTodo = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ITodoForm>();

  const onSubmit: SubmitHandler<ITodoForm> = (data) => {
    console.log(data);
    reset();
  };

  const classNameSubmit = classNames(css.form__submit, {
    [css.disabled]: isSubmitting,
  });

  return (
    <Box
      component="form"
      className={css.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        className={css.form__title}
        variant="inherit"
        component="p"
        fontWeight={400}
        align="center"
        mb={2}
      >
        Form for add Todo
      </Typography>

      <TextField
        className={classNames([css.form__element, css.form__todo_title], {
          [css.error]: !!errors?.title?.message,
        })}
        {...register("title", {
          required: FormTodoMessages.titleError,
          minLength: {
            value: MIN_LENGTH_TODO_TITLE,
            message: FormTodoMessages.minTitleError,
          },
          maxLength: {
            value: MAX_LENGTH_TODO_TITLE,
            message: FormTodoMessages.maxTitleError,
          },
        })}
        label={FormTodoMessages.placeHolderTitle}
        placeholder={FormTodoMessages.placeHolderTitle}
        fullWidth
      />

      {errors?.title?.message && (
        <Typography
          variant="inherit"
          component="p"
          className={classNames([css.form__error, css.form__error_title])}
        >
          {errors?.title?.message}
        </Typography>
      )}

      <TextField
        className={classNames([css.form__element, css.form__todo_text], {
          [css.error]: !!errors?.description?.message,
        })}
        {...register("description", {
          required: FormTodoMessages.textError,
          minLength: {
            value: MIN_LENGTH_TODO_TEXT,
            message: FormTodoMessages.minTextError,
          },
          maxLength: {
            value: MAX_LENGTH_TODO_TEXT,
            message: FormTodoMessages.maxTextError,
          },
        })}
        label={FormTodoMessages.placeHolderText}
        placeholder={FormTodoMessages.placeHolderText}
        fullWidth
      />

      {errors?.description?.message && (
        <Typography
          variant="inherit"
          component="p"
          className={classNames([css.form__error, css.form__error_text])}
        >
          {errors?.description?.message}
        </Typography>
      )}

      <InputBase
        className={classNameSubmit}
        type="submit"
        disableInjectingGlobalStyles={true}
        disabled={isSubmitting}
        value="Add todo"
      />
    </Box>
  );
};

export default FormTodo;
