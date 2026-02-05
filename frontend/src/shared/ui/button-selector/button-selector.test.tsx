import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ButtonSelector } from "./button-selector";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
] as const;

type OptionValue = (typeof options)[number]["value"];

describe("ButtonSelector", () => {
  describe("rendering", () => {
    it("should render all options", () => {
      render(
        <ButtonSelector<OptionValue>
          options={[...options]}
          value={undefined}
          onChange={vi.fn()}
        />
      );

      expect(screen.getByRole("button", { name: "Option 1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Option 2" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Option 3" })).toBeInTheDocument();
    });

    it("should render label when provided", () => {
      render(
        <ButtonSelector<OptionValue>
          options={[...options]}
          value={undefined}
          onChange={vi.fn()}
          label="Select an option"
        />
      );

      expect(screen.getByText("Select an option")).toBeInTheDocument();
    });

    it("should render in a group role", () => {
      render(
        <ButtonSelector<OptionValue>
          options={[...options]}
          value={undefined}
          onChange={vi.fn()}
        />
      );

      expect(screen.getByRole("group")).toBeInTheDocument();
    });
  });

  describe("selection", () => {
    it("should mark selected option with data-selected", () => {
      render(
        <ButtonSelector<OptionValue>
          options={[...options]}
          value="option2"
          onChange={vi.fn()}
        />
      );

      const option2 = screen.getByRole("button", { name: "Option 2" });
      expect(option2).toHaveAttribute("data-selected", "true");
      expect(option2).toHaveAttribute("aria-pressed", "true");
    });

    it("should not mark unselected options", () => {
      render(
        <ButtonSelector<OptionValue>
          options={[...options]}
          value="option2"
          onChange={vi.fn()}
        />
      );

      const option1 = screen.getByRole("button", { name: "Option 1" });
      expect(option1).toHaveAttribute("data-selected", "false");
      expect(option1).toHaveAttribute("aria-pressed", "false");
    });

    it("should call onChange when clicking an option", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <ButtonSelector<OptionValue>
          options={[...options]}
          value={undefined}
          onChange={onChange}
        />
      );

      await user.click(screen.getByRole("button", { name: "Option 2" }));

      expect(onChange).toHaveBeenCalledWith("option2");
    });
  });

  describe("error state", () => {
    it("should show error message when error prop is provided", () => {
      render(
        <ButtonSelector<OptionValue>
          options={[...options]}
          value={undefined}
          onChange={vi.fn()}
          error="Please select an option"
        />
      );

      expect(screen.getByText("Please select an option")).toBeInTheDocument();
    });

    it("should set data-error on buttons when error is present", () => {
      render(
        <ButtonSelector<OptionValue>
          options={[...options]}
          value={undefined}
          onChange={vi.fn()}
          error="Error"
        />
      );

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toHaveAttribute("data-error", "true");
      });
    });
  });

  describe("custom props", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <ButtonSelector<OptionValue>
          options={[...options]}
          value={undefined}
          onChange={vi.fn()}
          className="custom-class"
        />
      );

      // The wrapper div contains the group
      const wrapperDiv = screen.getByRole("group").parentElement;
      expect(wrapperDiv).toHaveClass("custom-class");
    });
  });
});
