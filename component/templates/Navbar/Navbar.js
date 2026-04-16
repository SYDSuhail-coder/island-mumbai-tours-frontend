"use client";
import { useState } from "react";
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navLinks = ["Home", "Contact","Blogs", "Reviews", "About"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0}
        sx={{ background: "#0d1b2a", height: 64 }}>
        <Toolbar sx={{ height: "100%", px: { xs: 2, md: 6 }, justifyContent: "space-between" }}>
          
          {/* LOGO */}
          <Box>
            <Typography sx={{
              fontFamily: "'Playfair Display', serif",
              color: "#f0a500", fontSize: 20, fontWeight: 700, lineHeight: 1.1
            }}>
              Mumbai Island Tours
            </Typography>
            <Typography sx={{ fontSize: 10, color: "#aaa", letterSpacing: 2 }}>
              EST. 2018 · MUMBAI
            </Typography>
          </Box>

          {/* DESKTOP LINKS */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>
            {navLinks.map((link) => (
              <Typography key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(" ", "-"))}
                sx={{ color: "#ccc", fontSize: 13, cursor: "pointer",
                  "&:hover": { color: "#f0a500" }, transition: "color 0.2s" }}>
                {link}
              </Typography>
            ))}
            <Button onClick={() => scrollTo("book-now")}
              sx={{
                background: "#c9860a", color: "#0d1b2a", borderRadius: "20px",
                px: 2.5, fontSize: 13, fontWeight: 500, textTransform: "none",
                "&:hover": { background: "#f0a500" }
              }}>
              Book Now
            </Button>
          </Box>

          {/* MOBILE MENU */}
          <IconButton sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
            onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220, background: "#0d1b2a", height: "100%", pt: 4 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link} onClick={() => scrollTo(link.toLowerCase().replace(" ", "-"))}
                sx={{ cursor: "pointer", color: "#ccc",
                  "&:hover": { color: "#f0a500" } }}>
                {link}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;