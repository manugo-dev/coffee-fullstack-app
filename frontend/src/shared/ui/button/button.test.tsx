import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  describe("rendering", () => {
    it("should render children", () => {
      render(<Button>Click me</Button>);

      expect(screen.getByRole("button")).toHaveTextContent("Click me");
    });

    it("should have type button by default", () => {
      render(<Button>Click me</Button>);

      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
  });

  describe("variants", () => {
    it("should apply primary variant by default", () => {
      render(<Button>Click me</Button>);

      expect(screen.getByRole("button")).toHaveAttribute(
        "data-variant",
        "primary"
      );
    });

    it("should apply secondary variant", () => {
      render(<Button variant="secondary">Click me</Button>);

      expect(screen.getByRole("button")).toHaveAttribute(
        "data-variant",
        "secondary"
      );
    });

    it("should apply ghost variant", () => {
      render(<Button variant="ghost">Click me</Button>);

      expect(screen.getByRole("button")).toHaveAttribute("data-variant", "ghost");
    });
  });

  describe("sizes", () => {
    it("should apply md size by default", () => {
      render(<Button>Click me</Button>);

      expect(screen.getByRole("button")).toHaveAttribute("data-size", "md");
    });

    it("should apply sm size", () => {
      render(<Button size="sm">Click me</Button>);

      expect(screen.getByRole("button")).toHaveAttribute("data-size", "sm");
    });

    it("should apply lg size", () => {
      render(<Button size="lg">Click me</Button>);

      expect(screen.getByRole("button")).toHaveAttribute("data-size", "lg");
    });
  });

  describe("fullWidth", () => {
    it("should not be full width by default", () => {
      render(<Button>Click me</Button>);

      expect(screen.getByRole("button")).toHaveAttribute(
        "data-full-width",
        "false"
      );
    });

    it("should apply full width when prop is true", () => {
      render(<Button fullWidth>Click me</Button>);

      expect(screen.getByRole("button")).toHaveAttribute(
        "data-full-width",
        "true"
      );
    });
  });

  describe("events", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<Button onClick={onClick}>Click me</Button>);

      await user.click(screen.getByRole("button"));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Button onClick={onClick} disabled>
          Click me
        </Button>
      );

      await user.click(screen.getByRole("button"));

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("custom props", () => {
    it("should forward custom className", () => {
      render(<Button className="custom-class">Click me</Button>);

      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });

    it("should forward aria-label", () => {
      render(<Button aria-label="Custom label">Click me</Button>);

      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-label",
        "Custom label"
      );
    });
  });
});
