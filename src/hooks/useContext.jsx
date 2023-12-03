import { createContext, useContext, useReducer } from "react";

//define our actions
export const ACTIONS = {
  DELETE: "DELETE",
  ADD: "ADD",
};

//create our reducer function
const toastsReducer = (toasts, { type, payload }) => {
  const { DELETE, ADD } = ACTIONS;
  switch (type) {
    case ADD:
      const addToastsArr = [...toasts, payload];
      localStorage.setItem("toasts", JSON.stringify(addToastsArr));
      return addToastsArr;
    case DELETE:
      const deletedToastsArr = toasts.filter(t => t.id != payload);
      localStorage.setItem("toasts", JSON.stringify(deletedToastsArr));
      return deletedToastsArr;
    default:
      console.log("action is out of bounds of reducer action types");
  }
};

//create a context for toasts and a separate context for dispatch
export const ToastsContext = createContext(null);
export const ToastsDispatchContext = createContext(null);

export function ToastsProvider({ children }) {
  const initialToasts = JSON.parse(localStorage.getItem("toasts")) || [];
  const [toasts, dispatch] = useReducer(toastsReducer, initialToasts);
  return (
    <ToastsContext.Provider value={toasts}>
      <ToastsDispatchContext.Provider value={dispatch}>
        {children}
      </ToastsDispatchContext.Provider>
    </ToastsContext.Provider>
  );
}

export function useToasts() {
  return useContext(ToastsContext);
}

export function useToastsDispatch() {
  return useContext(ToastsDispatchContext);
}
