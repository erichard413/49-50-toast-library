import { useState } from "react";
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
              <ToastMessage
                key={toast.id}
                id={toast.id}
                message={toast.message}
              />
            ))}
        </ToastContainer>
      ))}
    </>
  );
}

function ToastContainer({ location, children }) {
  return <div className={`toast-container ${location}`}>{children}</div>;
}

function ToastMessage({ id, message }) {
  const dispatch = useToastsDispatch();
  const removeToast = id => {
    return dispatch({ type: ACTIONS.DELETE, payload: id });
  };
  return (
    <div className="toast" onClick={() => removeToast(id)}>
      {message}
    </div>
  );
}

export default App;
