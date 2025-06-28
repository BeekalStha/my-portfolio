import "../globals.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
       <html lang="en" suppressHydrationWarning>
      <body>
    

          <main className="min-h-screen px-4 py-6">{children}</main>
       
      </body>
    </html>
     
  );
}