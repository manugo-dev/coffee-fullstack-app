import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./input";

describe("Input", () => {
  describe("rendering", () => {
    it("should render an input element", () => {
      render(<Input />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render label when provided", () => {
      render(<Input label="Email" />);

      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("should generate unique id when not provided", () => {
      render(<Input label="Email" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id");
    });

    it("should use provided id", () => {
      render(<Input id="custom-id" label="Email" />);

      expect(screen.getByRole("textbox")).toHaveAttribute("id", "custom-id");
    });
  });

  describe("error state", () => {
    it("should show error message when error prop is provided", () => {
      render(<Input error="This field is required" />);

      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("should set data-error attribute when error is present", () => {
      render(<Input error="Error message" />);

      expect(screen.getByRole("textbox")).toHaveAttribute("data-error", "true");
    });

    it("should not show error when not provided", () => {
      render(<Input />);

      expect(screen.getByRole("textbox")).toHaveAttribute(
        "data-error",
        "false",
      );
    });
  });

  describe("suffix", () => {
    it("should render suffix when provided", () => {
      render(<Input suffix="USD" />);

      expect(screen.getByText("USD")).toBeInTheDocument();
    });

    it("should set data-has-suffix attribute", () => {
      render(<Input suffix="USD" />);

      expect(screen.getByRole("textbox")).toHaveAttribute(
        "data-has-suffix",
        "true",
      );
    });

    it("should not have suffix attribute when not provided", () => {
      render(<Input />);

      expect(screen.getByRole("textbox")).toHaveAttribute(
        "data-has-suffix",
        "false",
      );
    });
  });

  describe("interaction", () => {
    it("should accept user input", async () => {
      const user = userEvent.setup();
      render(<Input />);

      const input = screen.getByRole("textbox");
      await user.type(input, "Hello");

      expect(input).toHaveValue("Hello");
    });

    it("should call onChange when value changes", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<Input onChange={onChange} />);

      await user.type(screen.getByRole("textbox"), "a");

      expect(onChange).toHaveBeenCalled();
    });
  });
});
