import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ITodo } from "../../types";
import css from "./ListTodosItem.module.scss";

interface IListTodosItemProps extends Omit<ITodo, "id"> {
  number: number;
}

const ListTodosItem = ({ number, title, text, done }: IListTodosItemProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleDone = () => {
    console.log("Done");
  };

  const handleRemove = () => {
    console.log("Remove");
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <li className={css.list__item}>
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
          <Button className={css.list__item_done} onClick={handleDone}>
            {done ? "Undone" : "Done"}
          </Button>

          <Button
            className={css.list__item_delete}
            variant="contained"
            color="error"
            aria-label="Delete"
            onClick={handleOpen}
          >
            <DeleteForeverIcon />
          </Button>
        </Box>
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
