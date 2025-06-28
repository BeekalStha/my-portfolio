import { ThemeProvider } from "@/components/ThemeProvider";
import AdminNavbar from "./adminComponents/navbar";
import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AdminNavbar />

          <main className="min-h-screen px-4 py-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
