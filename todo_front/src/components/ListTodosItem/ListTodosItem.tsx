import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import classNames from "classnames";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../store/todoApi";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseButton from "../CloseButton";
import { messageErrorOptions } from "../../settings";
import { IErrorAnswer, ITodo } from "../../types";
import css from "./ListTodosItem.module.scss";
import Spinner from "../Spinner";

interface IListTodosItemProps extends ITodo {
  number: number;
}

const ListTodosItem = ({
  id,
  number,
  title,
  text,
  done,
}: IListTodosItemProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [
    deleteTodo,
    { isLoading: isLoadingDeleteTodo, error: errorDeleteTodo },
  ] = useDeleteTodoMutation();
  const [
    updateTodo,
    { isLoading: isLoadingUpdateTodo, error: errorUpdateTodo },
  ] = useUpdateTodoMutation();

  useEffect(() => {
    if (errorDeleteTodo && "data" in errorDeleteTodo) {
      const { message } = errorDeleteTodo.data as IErrorAnswer;

      enqueueSnackbar(message, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorDeleteTodo, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (errorUpdateTodo && "data" in errorUpdateTodo) {
      const { message } = errorUpdateTodo.data as IErrorAnswer;

      enqueueSnackbar(message, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorUpdateTodo, enqueueSnackbar, closeSnackbar]);

  const handleDone = () => {
    updateTodo({ body: { done: !done }, id });
  };

  const handleRemove = () => {
    deleteTodo(id);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const classNameItem = classNames(css.list__item, {
    [css.loading]: isLoadingDeleteTodo || isLoadingUpdateTodo,
    [css.done]: done,
  });
  return (
    <>
      <li className={classNameItem}>
        <Typography
          component="p"
          className={css.list__item_number}
          variant="inherit"
        >
          {number}
        </Typography>

        <Box className={css.list__item_content} component="div">
          <Typography
            component="p"
            className={css.list__item_title}
            variant="inherit"
          >
            {title}
          </Typography>

          <Typography
            component="p"
            className={css.list__item_text}
            variant="inherit"
          >
            {text}
          </Typography>
        </Box>

        <Box className={css.list__item_buttons} component="div">
          <Button
            className={css.list__item_done}
            disabled={isLoadingDeleteTodo || isLoadingUpdateTodo}
            onClick={handleDone}
          >
            {done ? "Undone" : "Done"}
          </Button>

          <Button
            disabled={isLoadingDeleteTodo || isLoadingUpdateTodo}
            className={css.list__item_delete}
            variant="contained"
            color="error"
            aria-label="Delete"
            onClick={handleOpen}
          >
            <DeleteForeverIcon />
          </Button>
        </Box>

        <Box className={css.list__item_spinner} component="div"><Spinner size={50}/></Box>
      </li>

      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete task ({title})?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleRemove} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListTodosItem;
