import "./globals.css";
export const metadata = {
  title: "Mumbai Islands Tours",
  description: "Book unique island tours and city experiences",
};
export default function RootLayout({ children }) {
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}