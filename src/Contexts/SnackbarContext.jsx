import { createContext, useState, useContext } from "react";
import CustomSnackbar from "../Components/CustomSnackbar";

export const SnackbarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideSnackbar(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <SnackbarContext.Provider value={{ showHideSnackbar }}>
      <CustomSnackbar open={open} message={message} />
      {children}
    </SnackbarContext.Provider>
  );
};

export const useToast = () => {
  return useContext(SnackbarContext);
};
