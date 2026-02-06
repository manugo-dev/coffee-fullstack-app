import { describe, expect, it } from "vitest";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { HomeHero } from "@/widgets/home-hero";

import { renderWithProviders, screen, userEvent, waitFor } from "../test-utils";

describe("Home Page Integration", () => {
  describe("Header", () => {
    it("should render the Header with banner", () => {
      renderWithProviders(<Header />);

      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("should render the logo", () => {
      renderWithProviders(<Header />);

      expect(screen.getByAltText("MVST. Coffee")).toBeInTheDocument();
    });

    it("should render the Create Coffee button", () => {
      renderWithProviders(<Header />);

      expect(
        screen.getByRole("button", { name: /create coffee/i }),
      ).toBeInTheDocument();
    });

    it("should open create coffee modal when clicking the button", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header />);

      const createButton = screen.getByRole("button", {
        name: /create coffee/i,
      });
      await user.click(createButton);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(
          screen.getByRole("heading", { name: /create new/i }),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Footer", () => {
    it("should render the Footer", () => {
      renderWithProviders(<Footer />);

      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("should render the footer logo", () => {
      renderWithProviders(<Footer />);

      expect(screen.getByAltText("MVST Coffee")).toBeInTheDocument();
    });
  });

  describe("HomeHero", () => {
    it("should render the Hero section heading", () => {
      renderWithProviders(<HomeHero />);

      expect(
        screen.getByRole("heading", { name: /roasted coffee/i }),
      ).toBeInTheDocument();
    });

    it("should render the Hero description", () => {
      renderWithProviders(<HomeHero />);

      expect(
        screen.getByText(/choose a coffee from below/i),
      ).toBeInTheDocument();
    });

    it("should render the Create Coffee CTA button", () => {
      renderWithProviders(<HomeHero />);

      expect(
        screen.getByRole("button", { name: /create your own coffee/i }),
      ).toBeInTheDocument();
    });

    it("should open create coffee modal from Hero CTA", async () => {
      const user = userEvent.setup();
      renderWithProviders(<HomeHero />);

      const createButton = screen.getByRole("button", {
        name: /create your own coffee/i,
      });
      await user.click(createButton);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(
          screen.getByRole("heading", { name: /create new/i }),
        ).toBeInTheDocument();
      });
    });
  });
});
