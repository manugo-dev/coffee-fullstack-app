import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import { ReactNode } from "react";

import { CreateCoffeeModalProvider } from "@/features/create-coffee";
import { ToastProvider } from "@/shared/ui/toast";

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
      queries: {
        gcTime: 0,
        retry: false,
      },
    },
  });
}

interface WrapperProps {
  children: ReactNode;
}

export * from "@testing-library/react";

export { default as userEvent } from "@testing-library/user-event";

export function createWrapper() {
  const queryClient = createTestQueryClient();

  return function Wrapper({ children }: WrapperProps) {
    return (
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <CreateCoffeeModalProvider>{children}</CreateCoffeeModalProvider>
        </ToastProvider>
      </QueryClientProvider>
    );
  };
}
export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: createWrapper(), ...options });
}
