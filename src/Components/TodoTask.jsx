import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import { useContext, useState } from "react";
import { TodoContext } from "../Contexts/TodoContext";

export default function TodoTask({ todo }) {
  const { todos, setTodos } = useContext(TodoContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateeDialog, setShowUpdateDialog] = useState(false);

  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    description: todo.description,
  });

  //   Event Handlers
  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          description: updatedTodo.description,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowUpdateDialog(false);
  }

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you Want to Remove this task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This Task will completely removed and this action cannot be reversed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Yes, Delete Task
          </Button>
        </DialogActions>
      </Dialog>
      {/* === Delete Dialog=== */}
      {/* Update Dialog */}
      <Dialog
        open={showUpdateeDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update Task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="description"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.description}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, description: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Cancel</Button>
          <Button onClick={handleUpdateConfirm} autoFocus>
            Update Task
          </Button>
        </DialogActions>
      </Dialog>
      {/* === Update Dialog=== */}
      <Box
        className="todoBox"
        component="section"
        sx={{
          p: 2,
          border: "1px solid grey",
          marginTop: 2,
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
          },
          borderRadius: 3,
          color: "white",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={8}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                textAlign: "left",
                textDecoration: todo.isCompleted ? "line-through" : "",
              }}
            >
              {todo.title}
            </Typography>
            <Typography gutterBottom sx={{ textAlign: "left" }}>
              {todo.description}
            </Typography>
          </Grid>
          <Grid
            size={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <IconButton
              className="iconButton"
              style={{
                color: todo.isCompleted ? "white" : "orange",
                background: todo.isCompleted ? "orange" : "white",
                border: "solid orange 3px",
              }}
              value={todo.isCompleted}
              onClick={handleCheckClick}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              className="iconButton"
              style={{
                color: "#1769aa",
                background: "white",
                border: "solid #1769aa 3px",
              }}
              onClick={handleUpdateClick}
            >
              <ModeEditRoundedIcon />
            </IconButton>
            <IconButton
              className="iconButton"
              style={{
                color: "#b23c17",
                background: "white",
                border: "solid #b23c17 3px",
              }}
              onClick={handleDeleteClick}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
