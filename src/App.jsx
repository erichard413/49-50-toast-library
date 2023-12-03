import { useCallback, useState } from "react";
import "./styles/styles.css";
import { useToasts } from "./hooks/useContext";
import { useToastsDispatch } from "./hooks/useContext";
import { ACTIONS } from "./hooks/useContext";
import ToastForm from "./forms/ToastForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const toasts = useToasts();

  const positionOptions = [
    `top-left`,
    `top-center`,
    `top-right`,
    `bottom-left`,
    `bottom-center`,
    `bottom-right`,
  ];

  const toggleFormOpen = () => {
    setFormOpen(val => !val);
  };

  return (
    <>
      {formOpen ? (
        <ToastForm closeForm={toggleFormOpen} />
      ) : (
        <button className="open-form-btn" onClick={toggleFormOpen}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      )}

      {positionOptions.map(pos => (
        <ToastContainer key={pos} location={pos}>
          {toasts
            ?.filter(t => t.position == pos)
            .map(toast => (
              <ToastMessage key={toast.id} {...toast} />
            ))}
        </ToastContainer>
      ))}
    </>
  );
}

function ToastContainer({ location, children }) {
  return <div className={`toast-container ${location}`}>{children}</div>;
}

function ToastMessage({ id, message, autoDismiss, autoDismissTimeout }) {
  const dispatch = useToastsDispatch();
  const toasts = useToasts();
  const removeToast = id => {
    return dispatch({ type: ACTIONS.DELETE, payload: id });
  };

  if (autoDismiss) {
    setTimeout(() => {
      removeToast(id);
    }, autoDismissTimeout * 1000);
  }
  console.log(id, message, autoDismiss, autoDismissTimeout);
  return (
    <div className="toast" onClick={() => removeToast(id)}>
      {message}
    </div>
  );
}

export default App;
