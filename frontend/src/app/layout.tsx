import { QueryProvider } from "@/application/providers/query-provider";
import "@/shared/styles/globals.scss";

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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
