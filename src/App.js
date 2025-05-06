import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import TodoList from "./Components/TodoList";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "./Contexts/TodoContext";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#311b92",
    },
  },
});

const initalTodos = [
  {
    id: uuidv4(),
    title: "Finish React Course",
    description: "Finish Tarmeez React course ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "البدء في مشروع الريأكت",
    description: " البدء في مشروع كامل",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "الانتهاء من كورس البولندي",
    description: " الانتهاء من كورس البولندي الكتاب",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initalTodos);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TodoContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
