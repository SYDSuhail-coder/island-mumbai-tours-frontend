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

//Single contact row 
const ContactRow = ({ icon, title, subtitle, buttonText, buttonLink, iconBg, iconColor, btnBg, btnBorder, btnColor }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "12px",
      p: { xs: "12px 14px", sm: "14px 16px" },
      gap: 2,
      transition: "background 0.2s",
      "&:hover": { background: "rgba(255,255,255,0.07)" },
    }}
  >
    {/* Left: icon + text */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        sx={{
          width: 42, height: 42, borderRadius: "10px",
          background: iconBg, border: `1px solid ${btnBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, color: iconColor,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#e8edf2" }}>{title}</Typography>
        <Typography sx={{ fontSize: 11, color: "rgba(232,237,242,0.4)", mt: 0.25 }}>{subtitle}</Typography>
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
        fontSize: 12,
        fontWeight: 600,
        px: 2,
        py: 0.75,
        borderRadius: "20px",
        textDecoration: "none",
        whiteSpace: "nowrap",
        flexShrink: 0,
        transition: "opacity 0.2s",
        "&:hover": { opacity: 0.8 },
      }}
    >
      {buttonText}
    </Box>
  </Box>
);

// ── Main Component
const Contact = () => {
  const router = useRouter();
  return (
    <>
    <Navbar />
    <Box
      sx={{
        mt: { xs: -6, md: 6 },
        minHeight: "100vh",
        background: "#0b1520",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: "1rem", sm: "2rem" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient blobs */}
      <Box sx={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", top: -100, left: -100, background: "radial-gradient(circle,rgba(212,168,71,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", bottom: -80, right: -80, background: "radial-gradient(circle,rgba(26,58,92,0.5) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* Back button */}
      <IconButton
        onClick={() => router.back()}
        sx={{
          position: "absolute",
          top: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          zIndex: 10,
          color: "#D4A847",
          background: "rgba(13,27,42,0.8)",
          border: "1px solid rgba(212,168,71,0.25)",
          width: 38, height: 38,
          "&:hover": { background: "rgba(212,168,71,0.12)" },
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 18 }} />
      </IconButton>

      {/* Card */}
      <Box
        sx={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: 480,
          background: "rgba(13,27,42,0.97)",
          border: "1px solid rgba(212,168,71,0.25)",
          borderRadius: "20px",
          p: { xs: "24px 20px", sm: "32px 28px" },
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Logo row */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.5 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: "8px", background: "linear-gradient(135deg,#D4A847,#b88a2e)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1200" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l1-6h16l1 6"/><path d="M12 3v8"/><path d="M8 8l4-5 4 5"/>
              <path d="M1 21c2 0 4-1 6-1s4 1 6 1 4-1 6-1"/>
            </svg>
          </Box>
          <Typography sx={{ fontSize: 11, color: "#D4A847", letterSpacing: "0.12em", fontWeight: 600 }}>
            MUMBAI ISLAND TOURS
          </Typography>
        </Box>

        {/* Divider */}
        <Box sx={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(212,168,71,0.3),transparent)", my: 2.5 }} />

        {/* Heading */}
        <Typography sx={{ fontSize: 22, fontWeight: 500, color: "#ffffff", mb: 0.75 }}>
          Get in Touch
        </Typography>
        <Typography sx={{ fontSize: 13, color: "rgba(232,237,242,0.45)", mb: 3 }}>
          We're here to help you explore Mumbai's islands.
        </Typography>

        {/* Contact rows */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>

          <ContactRow
            icon={<WhatsAppIcon sx={{ fontSize: 20 }} />}
            title="WhatsApp Support"
            // subtitle="+91 70545 XXXXX"
            buttonText="Chat Now"
            // buttonLink="https://wa.me/7054530763"
            iconBg="rgba(29,158,117,0.12)"
            iconColor="#1D9E75"
            btnBg="rgba(29,158,117,0.15)"
            btnBorder="rgba(29,158,117,0.3)"
            btnColor="#1D9E75"
          />

          <ContactRow
            icon={<HeadsetMicIcon sx={{ fontSize: 20 }} />}
            title="Customer Care"
            // subtitle="+91 705453 XXXX"
            buttonText="Call Now"
            // buttonLink="tel:+917054530763"
            iconBg="rgba(212,168,71,0.12)"
            iconColor="#D4A847"
            btnBg="rgba(212,168,71,0.15)"
            btnBorder="rgba(212,168,71,0.25)"
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
            btnBorder="rgba(55,138,221,0.25)"
            btnColor="#378ADD"
          />

        </Box>

        {/* Footer timing */}
        <Box sx={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(212,168,71,0.2),transparent)", mt: 3, mb: 2 }} />
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
          <AccessTimeIcon sx={{ fontSize: 13, color: "rgba(212,168,71,0.5)" }} />
          <Typography sx={{ fontSize: 11, color: "rgba(232,237,242,0.3)" }}>
            Mon–Sat · 9:00 AM – 6:00 PM · WhatsApp 24/7
          </Typography>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default Contact;
