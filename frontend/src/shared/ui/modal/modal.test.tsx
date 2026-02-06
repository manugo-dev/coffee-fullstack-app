import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Modal } from "./modal";

describe("Modal", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up body overflow
    document.body.style.overflow = "";
  });

  describe("rendering", () => {
    it("should render when isOpen is true", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Modal content")).toBeInTheDocument();
    });

    it("should not render when isOpen is false", () => {
      render(
        <Modal isOpen={false} onClose={mockOnClose}>
          Modal content
        </Modal>,
      );

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should render title when provided", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="My Modal">
          Modal content
        </Modal>,
      );

      expect(screen.getByText("My Modal")).toBeInTheDocument();
    });

    it("should have correct aria attributes", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="My Modal">
          Modal content
        </Modal>,
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
      expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    });
  });

  describe("closing behavior", () => {
    it("should call onClose when clicking close button", async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>,
      );

      await user.click(screen.getByLabelText("Close modal"));

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when clicking overlay", async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>,
      );

      const overlay = screen.getByRole("presentation");
      await user.click(overlay);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should not call onClose when clicking inside modal content", async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <button>Inside button</button>
        </Modal>,
      );

      await user.click(screen.getByText("Inside button"));

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("should call onClose when pressing Escape key", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>,
      );

      fireEvent.keyDown(document, { key: "Escape" });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("body overflow", () => {
    it("should set body overflow to hidden when open", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>,
      );

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("should restore body overflow when closed", () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={mockOnClose}>
          Modal content
        </Modal>,
      );

      expect(document.body.style.overflow).toBe("hidden");

      rerender(
        <Modal isOpen={false} onClose={mockOnClose}>
          Modal content
        </Modal>,
      );

      expect(document.body.style.overflow).toBe("");
    });
  });
});
