import "@/shared/styles/globals.scss";

import { QueryProvider } from "@/application/providers";
import { CreateCoffeeModalProvider } from "@/features/create-coffee";
import { Header } from "@/widgets/header";

export const metadata = {
  title: "Coffee Shop",
  description: "MVST. EXCLUSIVE Coffee",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <CreateCoffeeModalProvider>
            <Header />
            {children}
          </CreateCoffeeModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
