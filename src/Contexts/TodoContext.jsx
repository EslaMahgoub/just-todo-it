import { createContext, useReducer, useContext } from "react";
import { todosReducer } from "../Reducers/todosReducer";

export const TodosContext = createContext([]);
export const DispatchContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <TodosContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export default TodosProvider;

export const useTodos = () => {
  return useContext(TodosContext);
};

export const useTodosDispatch = () => {
  return useContext(DispatchContext);
};
