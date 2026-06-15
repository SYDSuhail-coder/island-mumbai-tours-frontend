"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter, usePathname } from "next/navigation";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
  ];

  const whatsappNumber = "7054530763";

  const handleNavClick = (path) => {
    router.push(path);
    setDrawerOpen(false);
  };

  const isActive = (path) => pathname === path;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ background: "#0d1b2a", height: 64 }}
      >
        <Toolbar
          sx={{
            height: "100%",
            px: { xs: 2, md: 6 },
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="https://res.cloudinary.com/drjders4g/image/upload/f_auto,q_auto/v1777532408/LogoMIT_ds7wfz.png"
              alt="logo"
              style={{
                height: 35,
                cursor: "pointer"
              }}
              onClick={() => router.push("/")}
            />
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                color: "#f0a500",
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Mumbai Island Tours
            </Typography>
          </Box>

          {/* DESKTOP LINKS */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              alignItems: "center",
            }}
          >
            {navLinks.map((link) => (
              <Box
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  pb: "4px",
                  // Active underline
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: isActive(link.path) ? "100%" : "0%",
                    height: "2px",
                    background: "#c9860a",
                    borderRadius: "2px",
                    transition: "width 0.25s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                <Typography
                  sx={{
                    color: isActive(link.path) ? "#f0a500" : "#ffffffcc",
                    fontSize: 13,
                    fontWeight: isActive(link.path) ? 600 : 400,
                    transition: "color 0.2s",
                    "&:hover": { color: "#f0a500" },
                  }}
                >
                  {link.label}
                </Typography>
              </Box>
            ))}

            <IconButton
              onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
              sx={{
                background: "#25D366",
                color: "#fff",
                width: 36,
                height: 36,
                "&:hover": { background: "#1ebe5d" }
              }}
            >
              <WhatsAppIcon fontSize="small" />
            </IconButton>

            <Button
              onClick={() => router.push("/bookingSection")}
              sx={{
                background: "#c9860a",
                color: "#0d1b2a",
                borderRadius: "20px",
                px: 2.5,
                fontSize: 13,
                fontWeight: 500,
                textTransform: "none",
                "&:hover": { background: "#f0a500" },
              }}
            >
              Book Now
            </Button>
          </Box>
          {/* MOBILE: WhatsApp + MENU ICON */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
              sx={{
                background: "#25D366",
                color: "#fff",
                width: 34,
                height: 34,
                "&:hover": { background: "#1ebe5d" }
              }}
            >
              <WhatsAppIcon fontSize="small" />
            </IconButton>

            <IconButton
              sx={{ color: "#fff" }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 220,
            background: "#0d1b2a",
            height: "100%",
            pt: 2,
          }}
        >
          {/* Close Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              mb: 1,
            }}
          >
            <Typography sx={{ color: "#f0a500", fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>
              Menu Box
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ px: 1 }}>
            {navLinks.map((link) => (
              <ListItem
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                sx={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  mb: 0.5,
                  px: 2,
                  py: 1,
                  background: isActive(link.path) ? "rgba(201,134,10,0.15)" : "transparent",
                  borderLeft: isActive(link.path) ? "3px solid #c9860a" : "3px solid transparent",
                  transition: "all 0.2s",
                  "&:hover": {
                    background: "rgba(240,165,0,0.1)",
                  },
                }}
              >
                <Typography
                  sx={{
                    color: isActive(link.path) ? "#f0a500" : "#ffffffcc",
                    fontSize: 14,
                    fontWeight: isActive(link.path) ? 600 : 400,
                  }}
                >
                  {link.label}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Box sx={{ px: 2, mt: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
            {/* Book Now Button */}
            <Button
              onClick={() => { router.push("/bookingSection"); setDrawerOpen(false); }}
              sx={{
                background: "#c9860a",
                color: "#0d1b2a",
                borderRadius: "20px",
                px: 2.5,
                fontSize: 13,
                fontWeight: 700,
                textTransform: "none",
                justifyContent: "center",
                "&:hover": { background: "#f0a500" },
              }}
            >
              Book Now
            </Button>

          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
