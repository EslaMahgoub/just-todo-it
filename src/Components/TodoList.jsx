import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Card,
  Button,
  Container,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  CardContent,
  DialogTitle,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import TodoTask from "./TodoTask";
import { useTodos, useTodosDispatch } from "../Contexts/TodoContext";
import { useToast } from "../Contexts/SnackbarContext";

export default function TodoList() {
  const { showHideSnackbar } = useToast();
  const todos = useTodos();
  const dispatch = useTodosDispatch();

  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState({
    title: "",
    description: "",
  });

  function handleAddTodo() {
    dispatch({
      type: "add",
      payload: { titleInput },
    });
    setTitleInput("");
    showHideSnackbar("Task Added Successfully");
  }

  // filteration arrays
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const nonCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = nonCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  useEffect(() => {
    dispatch({ type: "get" });
  }, [dispatch]);

  // Dialog Handlers
  function handleDeleteDialogShow(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    dispatch({
      type: "delete",
      payload: {
        dialogTodo,
      },
    });
    setShowDeleteDialog(false);
    showHideSnackbar("Task Deleted Successfully");
  }

  function handleUpdateDialogShow(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    dispatch({
      type: "update",
      payload: {
        dialogTodo,
      },
    });
    setShowUpdateDialog(false);
    showHideSnackbar("Task Updated Successfully");
  }

  const todosList = todosToBeRendered.map((t) => {
    return (
      <TodoTask
        key={t.id}
        todo={t}
        handleDeleteDialogShow={handleDeleteDialogShow}
        handleUpdateDialogShow={handleUpdateDialogShow}
      />
    );
  });

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
        open={showUpdateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update Task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Todo Title
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />
          <DialogContentText id="alert-dialog-description">
            Todo Body
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="description"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo.description}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, description: e.target.value });
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
      <Container maxWidth="md">
        <Card
          variant="outlined"
          style={{
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          <CardContent>
            <Typography variant="h3" gutterBottom>
              Just ToDo it
            </Typography>
            <Divider />
            <ToggleButtonGroup
              value={displayedTodosType}
              style={{ marginTop: "20px" }}
              size="small"
              aria-label="Small sizes"
              exclusive
              onChange={(event, newValue) => {
                if (newValue) {
                  setDisplayedTodosType(newValue);
                }
              }}
              color="primary"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="non-completed">In Progress</ToggleButton>
              <ToggleButton value="completed">Done</ToggleButton>
            </ToggleButtonGroup>
            {todosList}
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid size={8}>
                <TextField
                  id="outlined-basic"
                  label=" Task Title"
                  variant="outlined"
                  style={{ width: "100%", height: "100%" }}
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ width: "100%", height: "100%" }}
                  onClick={handleAddTodo}
                  disabled={titleInput.length <= 0}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
