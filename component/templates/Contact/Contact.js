"use client";
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

//
const ContactRow = ({
  icon, title, subtitle,
  buttonText, buttonLink,
  iconBg, iconColor, btnBg, btnBorder, btnColor,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "14px",
      p: "14px 16px",
      gap: 2,
      transition: "background 0.2s, border-color 0.2s",
      "&:hover": {
        background: "rgba(255,255,255,0.08)",
        borderColor: `${btnBorder}`,
      },
    }}
  >
    {/* Icon + Text */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
      <Box sx={{
        width: 44, height: 44, borderRadius: "11px",
        background: iconBg,
        border: `1px solid ${btnBorder}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, color: iconColor,
      }}>
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#e8edf2", lineHeight: 1.3 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ fontSize: 11, color: "rgba(232,237,242,0.38)", mt: 0.3 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>

    {/* Button */}
    <Box
      component="a"
      href={buttonLink}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        background: btnBg,
        border: `1px solid ${btnBorder}`,
        color: btnColor,
        fontSize: 12, fontWeight: 700,
        px: 2.2, py: 0.8,
        borderRadius: "20px",
        textDecoration: "none",
        whiteSpace: "nowrap",
        flexShrink: 0,
        letterSpacing: 0.3,
        transition: "opacity 0.2s, transform 0.15s",
        "&:hover": { opacity: 0.82, transform: "scale(1.03)" },
      }}
    >
      {buttonText}
    </Box>
  </Box>
);

const Contact = () => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Box sx={{
        background: "#fdf6ec",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: "64px",
        py: { xs: 3, sm: 5 },
        px: { xs: 2, sm: 3 },
        position: "relative",
        overflow: "hidden",
      }}>
        <Box sx={{
          position: "absolute",
          width: 520, height: 520, borderRadius: "50%",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle,rgba(212,168,71,0.09) 0%,transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* ── Card ── */}
        <Box sx={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: 480,
          background: "rgba(13,27,42,0.97)",
          border: "1px solid rgba(212,168,71,0.22)",
          borderRadius: "22px",
          p: { xs: "26px 20px", sm: "34px 30px" },
          boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(212,168,71,0.06)",
        }}>

          {/* Logo row */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.5 }}>
            <Box sx={{
              width: 32, height: 32, borderRadius: "8px",
              background: "linear-gradient(135deg,#D4A847,#b88a2e)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#1a1200" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l1-6h16l1 6" />
                <path d="M12 3v8" />
                <path d="M8 8l4-5 4 5" />
                <path d="M1 21c2 0 4-1 6-1s4 1 6 1 4-1 6-1" />
              </svg>
            </Box>
            <Typography sx={{ fontSize: 10, color: "#D4A847", letterSpacing: "0.14em", fontWeight: 700 }}>
              MUMBAI ISLAND TOURS
            </Typography>
          </Box>

          {/* Gold divider */}
          <Box sx={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(212,168,71,0.3),transparent)", my: 2.5 }} />

          {/* Heading */}
          <Typography sx={{ fontSize: { xs: 22, sm: 24 }, fontWeight: 700, color: "#fff", mb: 0.6, lineHeight: 1.2 }}>
            Get in Touch
          </Typography>
          <Typography sx={{ fontSize: 13, color: "rgba(232,237,242,0.42)", mb: 3.5, lineHeight: 1.6 }}>
            We're here to help you explore Mumbai's islands.
          </Typography>

          {/* Contact rows */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <ContactRow
              icon={<WhatsAppIcon sx={{ fontSize: 20 }} />}
              title="WhatsApp Support"
              subtitle="+91 70545 XXXXX"
              buttonText="Chat Now"
              buttonLink="https://wa.me/91"
              iconBg="rgba(29,158,117,0.12)"
              iconColor="#1D9E75"
              btnBg="rgba(29,158,117,0.15)"
              btnBorder="rgba(29,158,117,0.35)"
              btnColor="#1D9E75"
            />

            <ContactRow
              icon={<HeadsetMicIcon sx={{ fontSize: 20 }} />}
              title="Customer Care"
              subtitle="+91 70545 XXXXX"
              buttonText="Call Now"
              buttonLink="tel:+9170"
              iconBg="rgba(212,168,71,0.12)"
              iconColor="#D4A847"
              btnBg="rgba(212,168,71,0.15)"
              btnBorder="rgba(212,168,71,0.3)"
              btnColor="#D4A847"
            />

            <ContactRow
              icon={<EmailOutlinedIcon sx={{ fontSize: 20 }} />}
              title="Email Support"
              subtitle="hello@mumbaiislandtours.in"
              buttonText="Email Us"
              buttonLink="mailto:hello@mumbaiislandtours.in"
              iconBg="rgba(55,138,221,0.12)"
              iconColor="#378ADD"
              btnBg="rgba(55,138,221,0.15)"
              btnBorder="rgba(55,138,221,0.3)"
              btnColor="#378ADD"
            />

          </Box>

          {/* Footer timing */}
          <Box sx={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(212,168,71,0.18),transparent)", mt: 3.5, mb: 2.5 }} />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 13, color: "rgba(212,168,71,0.45)" }} />
            <Typography sx={{ fontSize: 11, color: "rgba(232,237,242,0.28)", letterSpacing: 0.2 }}>
              Mon–Sat · 9:00 AM – 6:00 PM · WhatsApp 24/7
            </Typography>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Contact;
