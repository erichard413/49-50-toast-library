import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

describe("#App", () => {
  it("should render", () => {
    render(<App />);
    expect(screen.getByText("Add a Toast!")).toBeInTheDocument();
  });
  it("should open form when add a toast button clicked", async () => {
    render(<App />);
    const addToastBtn = screen.getByTestId("open-form-btn");
    await userEvent.click(addToastBtn);
    const submitBtn = screen.getByText("Submit");
    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });
  it("should close form", async () => {
    render(<App />);
    const addToastBtn = screen.getByTestId("open-form-btn");
    await userEvent.click(addToastBtn);
    const submitBtn = screen.getByText("Submit");
    const cancelBtn = screen.getByText("Cancel");
    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    await userEvent.click(cancelBtn);
    expect(screen.queryByText("Message")).not.toBeInTheDocument();
    expect(submitBtn).not.toBeInTheDocument();
  });
});
