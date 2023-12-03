import React from "react";
import { useState } from "react";

export default function ToastForm() {
  const initialFormData = {
    message: "",
    autoDismiss: false,
    autoDismissTimeout: 10,
    position: "top-left",
  };
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="ToastForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message</label>
        <input
          name="message"
          value={formData.message}
          id="message"
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
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
