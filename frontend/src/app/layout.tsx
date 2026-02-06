import { QueryProvider } from "@/application/providers";
import { CreateCoffeeModalProvider } from "@/features/create-coffee";
import "@/shared/styles/globals.scss";
import { ToastProvider } from "@/shared/ui/toast";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

export const metadata = {
  description: "MVST. EXCLUSIVE Coffee",
  title: "Coffee Shop",
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
