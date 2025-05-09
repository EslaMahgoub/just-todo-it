import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import TodoList from "./Components/TodoList";
import TodosProvider from "./Contexts/TodoContext";
import { SnackbarProvider } from "./Contexts/SnackbarContext";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <SnackbarProvider>
          <div className="App">
            <TodoList />
          </div>
        </SnackbarProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
