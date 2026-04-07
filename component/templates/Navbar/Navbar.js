"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Box, IconButton, InputBase, Tab, Tabs, Divider,
  Paper, Typography, Menu, MenuItem, Dialog, useMediaQuery, useTheme,
  Drawer, List, ListItem, ListItemText, CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter, usePathname } from "next/navigation";
import { useI18n } from "@/scripts/i18nContext";

const NewBadge = () => (
  <Box sx={{
    position: "absolute", top: 2, left: "50%", transform: "translateX(-50%)",
    bgcolor: "#222", color: "#fff", fontSize: "8px", fontWeight: 700,
    px: "5px", py: "1px", borderRadius: "10px", whiteSpace: "nowrap", zIndex: 1,
  }}>
    NEW
  </Box>
);

export default function Navbar() {
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { t, lang, changeLang, LANGUAGES, loading } = useI18n();

  useEffect(() => { setMounted(true); }, []);
  const isMobile = mounted ? isMobileQuery : false;
  const tabs = [
    { label: t("navbar.homes"),       icon: <HomeOutlinedIcon fontSize="small" />, isNew: false, route: "/homePage" },
    { label: t("navbar.experiences"), icon: <CardTravelIcon fontSize="small" />,   isNew: true,  route: "/experiencesPage" },
    { label: t("navbar.services"),    icon: <RoomServiceOutlinedIcon fontSize="small" />, isNew: true, route: "/servicesPage" },
  ];

  const activeTab = Math.max(0, tabs.findIndex((tab) => tab.route === pathname));
  const handleTabChange = (e, val) => router.push(tabs[val].route);

  const [where, setWhere] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalTab, setModalTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const images = [
    "https://dynamic-media.tacdn.com/media/attractions-content--1x-1/0d/73/91/17.jpg",
    "https://dynamic-media.tacdn.com/media/photo-o/31/e4/6e/9f/caption.jpg?f=webp&w=1900&h=500&s=1",
    "https://dynamic-media.tacdn.com/media/attractions-content--1x-1/0f/6f/17/81.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <Box sx={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
      <AppBar position="fixed" elevation={0} sx={{
        bgcolor: "white", color: "#222", borderBottom: "1px solid #d0ede8",
        top: 0, left: 0, width: "100%", zIndex: 1200,
      }}>
        <Toolbar sx={{
          minHeight: { xs: "64px !important", md: "76px !important" },
          px: { xs: 2, md: 5 },
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          {/* LOGO */}
          <Box onClick={() => router.push("/")}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center", minWidth: { xs: "auto", md: "160px" } }}>
            <img src="/logo2.jpg" alt="Island Mumbai Tours"
              style={{ height: isMobile ? "42px" : "52px", width: "auto", objectFit: "contain" }} />
          </Box>

          {/* CENTER TABS — desktop only */}
          {!isMobile && (
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Tabs value={activeTab} onChange={handleTabChange}
                TabIndicatorProps={{ style: { background: "#222", height: "2px", borderRadius: "2px" } }}
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none", minWidth: 90, color: "#717171", py: 1,
                    "&.Mui-selected": { color: "#222", fontWeight: 700 },
                  },
                }}>
                {tabs.map((tab, i) => (
                  <Tab key={i} label={
                    <Box sx={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      position: "relative", pt: tab.isNew ? "18px" : "6px", pb: "4px"
                    }}>
                      {tab.isNew && <NewBadge />}
                      {tab.icon}
                      <Typography fontSize={13} sx={{ mt: 0.4, fontWeight: "inherit" }}>{tab.label}</Typography>
                    </Box>
                  } />
                ))}
              </Tabs>
            </Box>
          )}

          {/* RIGHT ICONS */}
          <Box sx={{
            display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 },
            minWidth: { xs: "auto", md: "160px" }, justifyContent: "flex-end"
          }}>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ color: "#222", "&:hover": { bgcolor: "rgba(0,0,0,0.06)" } }}>
              <LanguageIcon sx={{ fontSize: { xs: 20, md: 22 } }} />
            </IconButton>

            <IconButton sx={{ color: "#222", "&:hover": { bgcolor: "rgba(0,0,0,0.06)" } }}>
              <CardGiftcardIcon sx={{ fontSize: { xs: 20, md: 22 } }} />
            </IconButton>

            <Divider orientation="vertical" flexItem
              sx={{ mx: 0.5, height: 28, alignSelf: "center", borderColor: "#bbb" }} />

            <Paper variant="outlined" onClick={() => setDrawerOpen(true)} sx={{
              display: "flex", alignItems: "center", gap: 0.5,
              pl: 0.5, pr: 1, py: 0.4, borderRadius: "22px", borderColor: "#ccc",
              cursor: "pointer", bgcolor: "transparent", boxShadow: "none",
              "&:hover": { boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }, transition: "box-shadow 0.2s",
            }}>
              <AccountCircleIcon sx={{ fontSize: 30, color: "#717171" }} />
              <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#222" }} />
            </Paper>

            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#222", ml: 0.5 }}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* MOBILE TABS */}
        {isMobile && (
          <Box sx={{ bgcolor: "#EBFAF7", pb: 0.5 }}>
            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth"
              TabIndicatorProps={{ style: { background: "#222", height: "2px" } }}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none", color: "#717171", fontSize: "12px", minHeight: 48,
                  "&.Mui-selected": { color: "#222", fontWeight: 700 },
                },
              }}>
              {tabs.map((tab, i) => (
                <Tab key={i} label={
                  <Box sx={{
                    display: "flex", alignItems: "center", gap: 0.5,
                    position: "relative", pt: tab.isNew ? "14px" : 0
                  }}>
                    {tab.isNew && <NewBadge />}
                    {tab.icon}
                    <Typography fontSize={12}>{tab.label}</Typography>
                  </Box>
                } />
              ))}
            </Tabs>
          </Box>
        )}
      </AppBar>

      {/* ═══════════ LANGUAGE DROPDOWN ═══════════ */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { borderRadius: "12px", mt: 1, minWidth: 160, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" } }}>
        <MenuItem onClick={() => { setOpenModal(true); setModalTab(0); setAnchorEl(null); }} sx={{ gap: 1, py: 1.2 }}>
          <LanguageIcon fontSize="small" />
          <Box>
            {/* ✅ Current selected language dikhayega */}
            <Typography fontSize={13} fontWeight={600}>
              {LANGUAGES.find((l) => l.code === lang)?.label || "English"}
            </Typography>
            <Typography fontSize={11} color="text.secondary">{t("navbar.language")}</Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { setOpenModal(true); setModalTab(1); setAnchorEl(null); }} sx={{ gap: 1, py: 1.2 }}>
          <Typography fontWeight={700} sx={{ fontSize: 16 }}>₹</Typography>
          <Box>
            <Typography fontSize={13} fontWeight={600}>Indian Rupee</Typography>
            <Typography fontSize={11} color="text.secondary">{t("navbar.currency")}</Typography>
          </Box>
        </MenuItem>
      </Menu>

      {/* ═══════════ LANGUAGE / CURRENCY MODAL ═══════════ */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: "16px" } }}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography fontWeight={700} fontSize={18}>{t("navbar.langAndCurrency")}</Typography>
            <IconButton onClick={() => setOpenModal(false)} size="small"><CloseIcon /></IconButton>
          </Box>
          <Tabs value={modalTab} onChange={(e, val) => setModalTab(val)}
            sx={{ borderBottom: "1px solid #eee", mb: 2 }}
            TabIndicatorProps={{ style: { background: "#222" } }}>
            <Tab label={t("navbar.langAndCountry")} sx={{ textTransform: "none", fontWeight: 600 }} />
            <Tab label={t("navbar.currency")} sx={{ textTransform: "none", fontWeight: 600 }} />
          </Tabs>

          {/* ✅ LANGUAGE TAB */}
          {modalTab === 0 && (
            <Box>
              {/* Loading indicator */}
              {loading && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, color: "#717171" }}>
                  <CircularProgress size={16} />
                  <Typography fontSize={13}>{t("common.loading")}</Typography>
                </Box>
              )}
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 1 }}>
                {LANGUAGES.map((language, i) => (
                  <Box key={i} onClick={() => {
                    changeLang(language.code);
                    setOpenModal(false);
                  }} sx={{
                    p: 1.5, borderRadius: "8px", cursor: "pointer",
                    // ✅ Selected language highlight
                    border: lang === language.code ? "2px solid #222" : "1px solid #eee",
                    bgcolor: lang === language.code ? "#f0f0f0" : "transparent",
                    "&:hover": { bgcolor: "#f5f5f5", borderColor: "#222" },
                    transition: "all 0.15s",
                    opacity: loading ? 0.6 : 1,
                  }}>
                    <Typography fontSize={13} fontWeight={lang === language.code ? 700 : 600}>
                      {language.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* CURRENCY TAB — same as before */}
          {modalTab === 1 && (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 1 }}>
              {[
                { label: "Indian Rupee", symbol: "₹ INR" }, { label: "US Dollar", symbol: "$ USD" },
                { label: "Euro", symbol: "€ EUR" }, { label: "British Pound", symbol: "£ GBP" },
                { label: "UAE Dirham", symbol: "د.إ AED" }, { label: "Japanese Yen", symbol: "¥ JPY" },
              ].map((c, i) => (
                <Box key={i} sx={{
                  p: 1.5, borderRadius: "8px", cursor: "pointer",
                  border: "1px solid #eee", "&:hover": { bgcolor: "#f5f5f5", borderColor: "#222" }, transition: "all 0.15s"
                }}>
                  <Typography fontSize={13} fontWeight={700}>{c.symbol}</Typography>
                  <Typography fontSize={11} color="text.secondary">{c.label}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Dialog>

      {/* ═══════════ MOBILE DRAWER ═══════════ */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, borderRadius: "16px 0 0 16px" } }}>
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* ✅ translated */}
          <Typography fontWeight={700}>{t("navbar.menu")}</Typography>
          <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
        </Box>
        <Divider />
        <List>
          {/* ✅ translated */}
          {[
            t("navbar.signUp"),
            t("navbar.login"),
            t("navbar.giftCards"),
            t("navbar.help"),
          ].map((item, i) => (
            <ListItem button key={i} sx={{ py: 1.5 }}>
              <ListItemText primary={item} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <Box sx={{
        mt: { xs: "64px", md: "76px" },
        height: { xs: "55vh", md: "58vh" },
        backgroundImage: `linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.42)), url(${images[currentImage]})`,
        backgroundSize: "cover", backgroundPosition: "center",
        transition: "background-image 0.8s ease-in-out",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        px: { xs: 2, md: 4 }, textAlign: "center",
      }}>
        {/* ✅ translated */}
        <Typography sx={{
          fontWeight: 800, color: "#fff",
          fontSize: { xs: "26px", sm: "36px", md: "52px" },
          lineHeight: 1.15, mb: 1, textShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}>
          {t("hero.title")}
        </Typography>
        <Typography sx={{ color: "#e0e0e0", fontSize: { xs: "14px", md: "17px" }, mb: { xs: 3, md: 4 } }}>
          {t("hero.subtitle")}
        </Typography>

        {/* SEARCH BAR */}
        <Paper elevation={3} sx={{
          width: "100%", maxWidth: 900,
          borderRadius: { xs: "16px", md: "50px" },
          p: { xs: 1.5, md: 0.8 },
          display: "flex", flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          gap: { xs: 1, md: 0 }, bgcolor: "#fff",
        }}>
          {/* WHERE ✅ */}
          <Box sx={{ flex: 1, px: { xs: 1, md: 2.5 }, py: { xs: 0.5, md: 0 } }}>
            <Typography fontSize={11} fontWeight={700} color="#222">{t("hero.whereLabel")}</Typography>
            <InputBase fullWidth placeholder={t("hero.searchPlaceholder")} value={where}
              onChange={(e) => setWhere(e.target.value)}
              sx={{ fontSize: "14px", color: "#555", mt: 0.2 }} />
          </Box>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, my: 1.2 }} />
          <Divider sx={{ display: { xs: "block", md: "none" } }} />

          {/* WHEN ✅ */}
          <Box sx={{ flex: 1, px: { xs: 1, md: 2.5 }, py: { xs: 0.5, md: 0 } }}>
            <Typography fontSize={11} fontWeight={700} color="#222">{t("hero.whenLabel")}</Typography>
            <Typography color="text.secondary" fontSize={14} sx={{ mt: 0.2 }}>{t("hero.addDates")}</Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, my: 1.2 }} />
          <Divider sx={{ display: { xs: "block", md: "none" } }} />

          {/* WHO ✅ */}
          <Box sx={{
            flex: 1, px: { xs: 1, md: 2.5 }, py: { xs: 0.5, md: 0 },
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <Box>
              <Typography fontSize={11} fontWeight={700} color="#222">{t("hero.whoLabel")}</Typography>
              <Typography color="text.secondary" fontSize={14} sx={{ mt: 0.2 }}>{t("hero.addGuests")}</Typography>
            </Box>
            <IconButton sx={{
              bgcolor: "#FF385C", color: "#fff",
              width: { xs: 44, md: 50 }, height: { xs: 44, md: 50 },
              ml: 1, flexShrink: 0,
              "&:hover": { bgcolor: "#E11D48" }, transition: "background 0.2s",
            }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* IMAGE DOTS */}
        <Box sx={{ display: "flex", gap: 1, mt: 2.5 }}>
          {images.map((_, i) => (
            <Box key={i} onClick={() => setCurrentImage(i)} sx={{
              width: i === currentImage ? 20 : 8, height: 8, borderRadius: "4px",
              bgcolor: i === currentImage ? "#fff" : "rgba(255,255,255,0.5)",
              cursor: "pointer", transition: "all 0.3s",
            }} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}