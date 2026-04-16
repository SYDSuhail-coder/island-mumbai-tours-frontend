// import "./globals.css";
// export const metadata = {
//   title: "Mumbai Islands Tours",
//   description: "Book unique island tours and city experiences",
// };
// export default function RootLayout({ children }) {
//   return (
//     <html>
//       <body suppressHydrationWarning={true}>
//         <main>
//           {children}
//         </main>
//       </body>
//     </html>
//   );
// }
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export const metadata = {
  title: "Mumbai Islands Tours",
  description: "Book unique island tours and city experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AppRouterCacheProvider>
          <main>
            {children}
          </main>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}