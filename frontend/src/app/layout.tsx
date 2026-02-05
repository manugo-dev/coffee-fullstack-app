import "@/shared/styles/globals.scss";

import { QueryProvider } from "@/application/providers";
import { CreateCoffeeModalProvider } from "@/features/create-coffee";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { ToastProvider } from "@/shared/ui/toast";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="MVST" />
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body>
        <QueryProvider>
          <ToastProvider>
            <CreateCoffeeModalProvider>
              <Header />
              {children}
              <Footer />
            </CreateCoffeeModalProvider>
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
