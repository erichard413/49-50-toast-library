import React from "react";
import { useState } from "react";
import { useToastsDispatch } from "../hooks/useContext";
import { ACTIONS } from "../hooks/useContext";

const bool = str => {
  return str === "true";
};

const positionOptions = [
  `top-left`,
  `top-center`,
  `top-right`,
  `bottom-left`,
  `bottom-center`,
  `bottom-right`,
];

export default function ToastForm({ closeForm }) {
  const dispatch = useToastsDispatch();
  const initialFormData = {
    message: "",
    autoDismiss: false,
    autoDismissTimeout: "0",
    position: "top-left",
  };
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(e) {
    let { name, value } = e.target;

    if (name == "autoDismissTimeout") value = parseInt(value);

    if (name == "autoDismiss") {
      setFormData(data => ({ ...data, [name]: !bool(e.target.value) }));
    } else {
      setFormData(data => ({ ...data, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newToast = {
      id: crypto.randomUUID(),
      ...formData,
    };
    dispatch({ type: ACTIONS.ADD, payload: newToast });
    setFormData(initialFormData);
    closeForm();
  }

  return (
    <div className="ToastForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message</label>
        <input
          type="text"
          name="message"
          value={formData.message}
          id="message"
          onChange={handleChange}
        />
        <label htmlFor="position">Position</label>
        <select name="position" id="position" onChange={handleChange}>
          {positionOptions.map(opt => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </select>

        <label htmlFor="autoDismiss">Auto Dismiss?</label>
        <input
          type="checkbox"
          name="autoDismiss"
          id="autoDismiss"
          onChange={handleChange}
          value={formData.autoDismiss}
        />

        {formData.autoDismiss && (
          <>
            <label htmlFor="autoDismissTimeout">Dismiss Timeout Seconds</label>
            <input
              type="number"
              name="autoDismissTimeout"
              id="autoDismissTimeout"
              min="0"
              onChange={handleChange}
              value={formData.autoDismissTimeout}
            />
          </>
        )}

        <button>Submit</button>
      </form>
      <button onClick={closeForm}>Cancel</button>
    </div>
  );
}

// # Instructions

// 1. Create a toast library that has the following abilities:
//    - Add a toast message
//    - Remove a toast message by id
//    - Some way to access all the toast messages
// 2. When a toast is created it should have the following options that you can configure
//    - `autoDismiss`: a boolean that determines if the toast should automatically dismiss itself after a certain amount of time
//    - `autoDismissTimeout`: the amount of time in milliseconds that the toast should wait before dismissing itself if `autoDismiss` is true
//    - `position`: the position on the screen where the toast should appear (`top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`)
// 3. Toast messages should remove themselves when clicked
