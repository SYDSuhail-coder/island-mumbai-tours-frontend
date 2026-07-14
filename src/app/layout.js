import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeRegistry from "./ThemeRegistry";

export const metadata = {
  title: "Mumbai Islands Tours",
  description: "Book unique island tours and city experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <main>
              {children}
            </main>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}