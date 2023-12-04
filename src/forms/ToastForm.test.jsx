import { render, screen } from "@testing-library/react";
import App from "../App";
import { ToastsProvider } from "../hooks/useContext";
import ToastForm from "./ToastForm";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

describe("#App", () => {
  it("should render", () => {
    render(<ToastForm />);
    expect(screen.getByText("Message")).toBeInTheDocument();
  });
  it("shouldn't show auto dismiss seconds input if autodismiss is false", async () => {
    render(<ToastForm />);
    const autoDismissInput = screen.getByLabelText("Auto Dismiss?");
    expect(
      screen.queryByText("Dismiss Timeout Seconds")
    ).not.toBeInTheDocument();
    await userEvent.click(autoDismissInput);
    expect(
      screen.getByLabelText("Dismiss Timeout Seconds")
    ).toBeInTheDocument();
  });
  it("should add new toast - with no auto-dismiss - on bottom-right", async () => {
    render(
      <ToastsProvider>
        <App />
      </ToastsProvider>
    );
    await userEvent.click(screen.getByTestId("open-form-btn"));
    const messageInput = screen.getByLabelText("Message");
    const positionInput = screen.getByLabelText("Position");
    await userEvent.type(messageInput, "testing123");
    await userEvent.selectOptions(positionInput, "bottom-right");
    const submitBtn = screen.getByText("Submit");
    await userEvent.click(submitBtn);
    expect(screen.getByText("testing123")).toBeInTheDocument();
    expect(screen.queryByText("testing234")).not.toBeInTheDocument();
    expect(screen.getByTestId("bottom-right").children[0]).toBe(
      screen.getByText("testing123")
    );
    expect(screen.getByTestId("top-left").children[0]).toBe(undefined);
  });
  it("should add new toast - with auto-dismiss, dismisses after x seconds", async () => {
    render(
      <ToastsProvider>
        <App />
      </ToastsProvider>
    );
    const seconds = "10";
    await userEvent.click(screen.getByTestId("open-form-btn"));
    const messageInput = screen.getByLabelText("Message");
    const positionInput = screen.getByLabelText("Position");
    await userEvent.type(messageInput, "testing234");
    await userEvent.selectOptions(positionInput, "bottom-right");
    const autoDismissInput = screen.getByLabelText("Auto Dismiss?");
    await userEvent.click(autoDismissInput);
    const autoDismissTimeoutInput = screen.getByLabelText(
      "Dismiss Timeout Seconds"
    );
    await userEvent.type(autoDismissTimeoutInput, "0");
    await userEvent.type(autoDismissTimeoutInput, seconds);
    const submitBtn = screen.getByText("Submit");
    await userEvent.click(submitBtn);
    expect(screen.getByText("testing234")).toBeInTheDocument();
    expect(screen.queryByText("testing567")).not.toBeInTheDocument();
    setTimeout(() => {
      expect(screen.getByText("testing234")).toBeInTheDocument();
    }, 9);
    setTimeout(() => {
      expect(screen.getByText("testing234")).not.toBeInTheDocument();
    }, 1 + seconds);
  });
  it("should delete toast when clicked", async () => {
    render(
      <ToastsProvider>
        <App />
      </ToastsProvider>
    );
    await userEvent.click(screen.getByTestId("open-form-btn"));
    const messageInput = screen.getByLabelText("Message");
    const positionInput = screen.getByLabelText("Position");
    await userEvent.type(messageInput, "testing-del");
    await userEvent.selectOptions(positionInput, "bottom-right");
    const submitBtn = screen.getByText("Submit");
    await userEvent.click(submitBtn);
    expect(screen.getByText("testing-del")).toBeInTheDocument();
    expect(screen.queryByText("testing-blah")).not.toBeInTheDocument();
    await userEvent.click(screen.getByText("testing-del"));
    expect(screen.queryByText("testing-del")).not.toBeInTheDocument();
  });
});
