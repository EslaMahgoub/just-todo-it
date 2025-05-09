import { Box, Grid, IconButton, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import { useTodosDispatch } from "../Contexts/TodoContext";
import { useToast } from "../Contexts/SnackbarContext";
export default function TodoTask({
  todo,
  handleDeleteDialogShow,
  handleUpdateDialogShow,
}) {
  const dispatch = useTodosDispatch();
  const { showHideSnackbar } = useToast();

  //   Event Handlers
  function handleUpdateClick() {
    handleUpdateDialogShow(todo);
  }

  function handleDeleteClick() {
    handleDeleteDialogShow(todo);
  }

  function handleCheckClick() {
    dispatch({ type: "toggledCompleted", payload: { todo: todo } });
    showHideSnackbar("Task Updated Successfully");
  }

  return (
    <>
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
