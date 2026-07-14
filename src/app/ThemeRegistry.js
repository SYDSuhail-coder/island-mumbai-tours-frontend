"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// ── Brand theme (from MIT logo) ──
const theme = createTheme({
  palette: {
    primary: { main: "#0D1B2A" },   // navy
    secondary: { main: "#F0A500" },  // gold
  },
  typography: {
    // Body font for all MUI Typography by default
    fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
  },
});

export default function ThemeRegistry({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
