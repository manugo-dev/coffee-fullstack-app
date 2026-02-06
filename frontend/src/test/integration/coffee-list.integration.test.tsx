import { describe, expect, it } from "vitest";

import { CoffeeList } from "@/entities/coffee";

import { errorHandlers, server } from "../mocks";
import { renderWithProviders, screen, userEvent, waitFor } from "../test-utils";

describe("Coffee List Integration", () => {
  describe("Rendering", () => {
    it("should render the list of coffees from the server", async () => {
      renderWithProviders(<CoffeeList initialFilters={{ limit: 6 }} />);

      await waitFor(() => {
        expect(screen.getByText("Espresso Roast")).toBeInTheDocument();
        expect(screen.getByText("Morning Blend")).toBeInTheDocument();
        expect(screen.getByText("Dark Roast")).toBeInTheDocument();
        expect(screen.getByText("Robusta Special")).toBeInTheDocument();
      });
    });

    it("should render filter tabs", async () => {
      renderWithProviders(<CoffeeList initialFilters={{ limit: 6 }} />);

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /all/i }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: /robusta/i }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: /arabic/i }),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Filtering", () => {
    it("should filter by Arabic type", async () => {
      const user = userEvent.setup();
      renderWithProviders(<CoffeeList initialFilters={{ limit: 6 }} />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText("Espresso Roast")).toBeInTheDocument();
      });

      // Click Arabic filter
      const arabicTab = screen.getByRole("button", { name: /arabic/i });
      await user.click(arabicTab);

      // Should show only Arabic coffees
      await waitFor(() => {
        expect(screen.getByText("Espresso Roast")).toBeInTheDocument();
        expect(screen.getByText("Dark Roast")).toBeInTheDocument();
        expect(screen.queryByText("Morning Blend")).not.toBeInTheDocument();
        expect(screen.queryByText("Robusta Special")).not.toBeInTheDocument();
      });
    });

    it("should filter by Robusta type", async () => {
      const user = userEvent.setup();
      renderWithProviders(<CoffeeList initialFilters={{ limit: 6 }} />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText("Espresso Roast")).toBeInTheDocument();
      });

      // Click Robusta filter
      const robustaTab = screen.getByRole("button", { name: /robusta/i });
      await user.click(robustaTab);

      // Should show only Robusta coffees
      await waitFor(() => {
        expect(screen.getByText("Morning Blend")).toBeInTheDocument();
        expect(screen.getByText("Robusta Special")).toBeInTheDocument();
        expect(screen.queryByText("Espresso Roast")).not.toBeInTheDocument();
        expect(screen.queryByText("Dark Roast")).not.toBeInTheDocument();
      });
    });

    it("should show all coffees when clicking All tab after filtering", async () => {
      const user = userEvent.setup();
      renderWithProviders(<CoffeeList initialFilters={{ limit: 6 }} />);

      await waitFor(() => {
        expect(screen.getByText("Espresso Roast")).toBeInTheDocument();
      });

      // Filter by Arabic
      await user.click(screen.getByRole("button", { name: /arabic/i }));

      await waitFor(() => {
        expect(screen.queryByText("Morning Blend")).not.toBeInTheDocument();
      });

      // Click All tab
      await user.click(screen.getByRole("button", { name: /all/i }));

      await waitFor(() => {
        expect(screen.getByText("Espresso Roast")).toBeInTheDocument();
        expect(screen.getByText("Morning Blend")).toBeInTheDocument();
        expect(screen.getByText("Dark Roast")).toBeInTheDocument();
        expect(screen.getByText("Robusta Special")).toBeInTheDocument();
      });
    });
  });

  describe("Pagination", () => {
    it("should change page when clicking pagination", async () => {
      const user = userEvent.setup();
      renderWithProviders(<CoffeeList initialFilters={{ limit: 2 }} />);

      await waitFor(() => {
        expect(screen.getByText("Espresso Roast")).toBeInTheDocument();
      });

      // Go to page 2
      const page2Button = screen.getByRole("button", { name: "2" });
      await user.click(page2Button);

      await waitFor(() => {
        expect(screen.getByText("Dark Roast")).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    it("should show empty message when no coffees are found", async () => {
      server.use(errorHandlers.empty);
      renderWithProviders(<CoffeeList initialFilters={{ limit: 6 }} />);

      await waitFor(() => {
        expect(screen.getByText(/no coffees found/i)).toBeInTheDocument();
      });
    });

    it("should show error message when API fails with network error", async () => {
      server.use(errorHandlers.networkError);
      renderWithProviders(<CoffeeList initialFilters={{ limit: 6 }} />);

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });
    });

    it("should show error for 500 server error", async () => {
      server.use(errorHandlers.serverError);
      renderWithProviders(<CoffeeList initialFilters={{ limit: 6 }} />);

      await waitFor(() => {
        expect(screen.getByText(/internal server error/i)).toBeInTheDocument();
      });
    });

    it("should show error for timeout", async () => {
      server.use(errorHandlers.timeout);
      renderWithProviders(<CoffeeList initialFilters={{ limit: 6 }} />);

      await waitFor(() => {
        expect(screen.getByText(/request timeout/i)).toBeInTheDocument();
      });
    });

    it("should show error for unauthorized access", async () => {
      server.use(errorHandlers.unauthorized);
      renderWithProviders(<CoffeeList initialFilters={{ limit: 6 }} />);

      await waitFor(() => {
        expect(screen.getByText(/unauthorized/i)).toBeInTheDocument();
      });
    });

    it("should show error with warning icon", async () => {
      server.use(errorHandlers.serverError);
      renderWithProviders(<CoffeeList initialFilters={{ limit: 6 }} />);

      await waitFor(() => {
        const errorContainer = screen
          .getByText(/internal server error/i)
          .closest("div");
        expect(errorContainer).toHaveAttribute("data-error", "true");
      });
    });
  });
});
