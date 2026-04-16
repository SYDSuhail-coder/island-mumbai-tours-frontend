import { Box, Typography, Container } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const footerLinks = ["About Us", "All Tours", "Group Bookings", "Refund Policy", "Privacy Policy", "Contact"];

const socialLinks = [
  { icon: <InstagramIcon sx={{ fontSize: 18 }} />, url: "https://instagram.com" },
  { icon: <FacebookIcon sx={{ fontSize: 18 }} />, url: "https://facebook.com" },
  { icon: <YouTubeIcon sx={{ fontSize: 18 }} />, url: "https://youtube.com" },
  { icon: <WhatsAppIcon sx={{ fontSize: 18 }} />, url: "https://wa.me/919820000000" },
];

const Footer = () => {
  return (
    <Box component="footer"
      sx={{ background: "#0d1b2a", color: "#aaa", py: 5, px: 2, textAlign: "center" }}>
      <Container maxWidth="lg">

        {/* LOGO */}
        <Typography sx={{
          fontFamily: "'Playfair Display', serif",
          color: "#f0a500", fontSize: 24, mb: 1
        }}>
          Mumbai Island Tours
        </Typography>

        {/* ADDRESS */}
        <Typography sx={{ fontSize: 13, mb: 0.5 }}>
          📍 Gateway of India Jetty, Apollo Bunder, Mumbai 400001
        </Typography>
        <Typography sx={{ fontSize: 13, mb: 2 }}>
          📞 +91 98200 XXXXX &nbsp;|&nbsp; 📧 hello@mumbaiislandtours.in
        </Typography>

        {/* NAV LINKS */}
        <Box sx={{
          display: "flex", gap: { xs: 2, md: 3 },
          justifyContent: "center", flexWrap: "wrap", mb: 2
        }}>
          {footerLinks.map((link) => (
            <Typography key={link} sx={{
              fontSize: 12, color: "#888", cursor: "pointer",
              "&:hover": { color: "#f0a500" }, transition: "color 0.2s"
            }}>
              {link}
            </Typography>
          ))}
        </Box>

        {/* SOCIAL ICONS */}
        <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", mb: 3 }}>
          {socialLinks.map((s, i) => (
            <Box key={i} component="a" href={s.url}
              target="_blank" rel="noopener noreferrer"
              sx={{
                width: 38, height: 38, borderRadius: "50%",
                border: "1px solid #444",
                display: "flex", alignItems: "center",
                justifyContent: "center", color: "#aaa",
                textDecoration: "none",
                transition: "all 0.2s",
                "&:hover": { borderColor: "#f0a500", color: "#f0a500", transform: "scale(1.1)" }
              }}>
              {s.icon}
            </Box>
          ))}
        </Box>

        {/* TIMINGS */}
        <Typography sx={{ fontSize: 12, color: "#666", mb: 1 }}>
          Mon–Sun · 6:00 AM – 8:00 PM · WhatsApp available 24/7
        </Typography>

        {/* COPYRIGHT */}
        <Typography sx={{ fontSize: 11, color: "#444" }}>
          © 2025 Mumbai Island Tours. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;