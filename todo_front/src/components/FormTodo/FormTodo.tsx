import React, { FC, useEffect } from "react";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useAddTodoMutation } from "../../store/todoApi";
import { Box, InputBase, TextField, Typography } from "@mui/material";
import {
  FormTodoMessages,
  MAX_LENGTH_TODO_TEXT,
  MAX_LENGTH_TODO_TITLE,
  messageErrorOptions,
  MIN_LENGTH_TODO_TEXT,
  MIN_LENGTH_TODO_TITLE,
} from "../../settings";
import CloseButton from "../CloseButton";
import { IErrorAnswer } from "../../types";
import css from "./FormTodo.module.scss";

interface ITodoForm {
  title: string;
  text: string;
}

const FormTodo: FC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [addTodo, { isLoading: isLoadingAddTodo, error: errorAddTodo }] =
    useAddTodoMutation();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ITodoForm>();

  useEffect(() => {
    if (errorAddTodo && "data" in errorAddTodo) {
      const { message } = errorAddTodo.data as IErrorAnswer;

      enqueueSnackbar(message, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorAddTodo, enqueueSnackbar, closeSnackbar]);

  const onSubmit: SubmitHandler<ITodoForm> = (data) => {
    addTodo(data);

    reset();
  };

  const classNameSubmit = classNames(css.form__submit, {
    [css.disabled]: isSubmitting || isLoadingAddTodo,
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
          [css.error]: !!errors?.text?.message,
        })}
        {...register("text", {
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

      {errors?.text?.message && (
        <Typography
          variant="inherit"
          component="p"
          className={classNames([css.form__error, css.form__error_text])}
        >
          {errors?.text?.message}
        </Typography>
      )}

      <InputBase
        className={classNameSubmit}
        type="submit"
        disableInjectingGlobalStyles={true}
        disabled={isSubmitting || isLoadingAddTodo}
        value={isLoadingAddTodo ? "Loading..." : "Add todo"}
      />
    </Box>
  );
};

export default FormTodo;
