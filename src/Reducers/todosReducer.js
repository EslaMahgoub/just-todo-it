import { v4 as uuidv4 } from "uuid";

export function todosReducer(currentTodos, action) {
  let updatedTodos = [];
  const dialogTodo = action.payload?.dialogTodo;
  switch (action.type) {
    case "add": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.titleInput,
        description: "",
        isCompleted: false,
      };
      updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "update": {
      updatedTodos = currentTodos.map((t) => {
        if (t.id == dialogTodo.id) {
          return {
            ...t,
            title: dialogTodo.title,
            description: dialogTodo.description,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "delete": {
      updatedTodos = currentTodos.filter((t) => {
        return t.id !== dialogTodo.id;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "toggledCompleted": {
      updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.todo.id) {
          const updatedTodo = { ...t, isCompleted: !t.isCompleted };
          return updatedTodo;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get": {
      const storedTodos = JSON.parse(localStorage.getItem("todos"));
      return storedTodos || [];
    }
    default:
      throw Error("Unknown Action " + action.type);
  }
}
