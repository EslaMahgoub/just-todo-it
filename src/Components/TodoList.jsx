import * as React from "react";
import TodoTask from "./TodoTask";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Container,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../Contexts/TodoContext";

export default function TodoList() {
  const [titleInput, setTitleInput] = useState("");
  const { todos, setTodos } = useContext(TodoContext);

  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  function handleAddTodo() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      description: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const nonCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = nonCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosList = todosToBeRendered.map((t) => {
    return <TodoTask key={t.id} todo={t} />;
  });

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storedTodos || []);
  }, [setTodos]);

  return (
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
            <Grid item size={8}>
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
            <Grid item size={4}>
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
  );
}
