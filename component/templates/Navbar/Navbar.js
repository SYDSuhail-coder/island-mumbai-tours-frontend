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
import { useRouter } from "next/navigation";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

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
          <Box>
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
              <Typography
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                sx={{
                  color: "#f0a500",
                  fontSize: 13,
                  cursor: "pointer",
                  "&:hover": { color: "#f0a500" },
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </Typography>
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

          {/* MOBILE MENU */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
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
          {/*Close Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              px: 2,
              mb: 1,
            }}
          >
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                sx={{
                  cursor: "pointer",
                  color: "#f0a500",
                  "&:hover": { color: "#f0a500" },
                }}
              >
                {link.label}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;