"use client";
import { Box, Typography, Container } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

// Reusable legal / policy page. Pass:
//  title      – page heading
//  updated    – "Last updated" text
//  intro      – short lead paragraph
//  sections   – [{ heading, paragraphs?: string[], bullets?: string[] }]
const PolicyPage = ({ title, updated, intro, sections = [] }) => {
  return (
    <>
      <Navbar />

      {/* Hero band */}
      <Box sx={{
        mt: "64px",
        background: "linear-gradient(135deg, #0D1B2A 0%, #1B3A57 100%)",
        px: { xs: 2, md: 4 }, py: { xs: 5, md: 7 },
        position: "relative", overflow: "hidden",
      }}>
        <Box sx={{
          position: "absolute", top: -100, right: -60,
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,165,0,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{
            display: "inline-flex", alignItems: "center", gap: 0.8,
            background: "rgba(240,165,0,0.12)",
            border: "1px solid rgba(240,165,0,0.35)",
            borderRadius: "999px", px: 1.6, py: 0.5, mb: 1.8,
          }}>
            <Box sx={{ width: 7, height: 7, borderRadius: "50%", background: "#F0A500" }} />
            <Typography sx={{ fontSize: 11, letterSpacing: 2.5, color: "#F0A500", fontWeight: 700 }}>
              LEGAL
            </Typography>
          </Box>
          <Typography sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: { xs: 30, md: 44 }, fontWeight: 700, color: "#fff", lineHeight: 1.1, mb: 1,
          }}>
            {title}
          </Typography>
          {updated && (
            <Typography sx={{ fontSize: 13, color: "rgba(232,237,242,0.55)" }}>
              {updated}
            </Typography>
          )}
        </Container>
      </Box>

      {/* Content */}
      <Box sx={{ background: "#fdf6ec", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Box sx={{
            background: "white", borderRadius: "20px",
            p: { xs: 3, md: 5 },
            border: "1px solid #efe7d6",
            boxShadow: "0 10px 40px rgba(18,51,63,0.07)",
          }}>
            {intro && (
              <Typography sx={{ fontSize: 15, color: "#4a5560", lineHeight: 1.8, mb: 4 }}>
                {intro}
              </Typography>
            )}

            {sections.map((sec, i) => (
              <Box key={i} sx={{ mb: i < sections.length - 1 ? 4 : 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.5 }}>
                  <Box sx={{
                    width: 4, height: 22, borderRadius: 2, background: "#F0A500", flexShrink: 0,
                  }} />
                  <Typography sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: { xs: 19, md: 22 }, fontWeight: 700, color: "#0D1B2A",
                  }}>
                    {i + 1}. {sec.heading}
                  </Typography>
                </Box>

                {sec.paragraphs?.map((p, pi) => (
                  <Typography key={pi} sx={{ fontSize: 14.5, color: "#4a5560", lineHeight: 1.8, mb: 1.5 }}>
                    {p}
                  </Typography>
                ))}

                {sec.bullets && (
                  <Box component="ul" sx={{ pl: 0, m: 0, listStyle: "none" }}>
                    {sec.bullets.map((b, bi) => (
                      <Box component="li" key={bi} sx={{
                        display: "flex", alignItems: "flex-start", gap: 1.2, mb: 1,
                      }}>
                        <Box sx={{
                          width: 6, height: 6, borderRadius: "50%", background: "#F0A500",
                          mt: "8px", flexShrink: 0,
                        }} />
                        <Typography sx={{ fontSize: 14.5, color: "#4a5560", lineHeight: 1.7 }}>
                          {b}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default PolicyPage;
