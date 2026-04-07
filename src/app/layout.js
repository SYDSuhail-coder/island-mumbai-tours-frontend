import "./globals.css";
import Navbar from "../../component/templates/Navbar/Navbar";
import { I18nProvider } from "../../scripts/i18nContext";
export const metadata = {
  title: "Mumbai Islands Tours",
  description: "Book unique island tours and city experiences",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ margin: 0, padding: 0 }}>
        <I18nProvider>
          <Navbar />
          <main>
            {children}
          </main>
        </I18nProvider>
      </body>
    </html>
  );
}