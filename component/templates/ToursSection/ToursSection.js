"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Container
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const tours = [
  {
    id: 1,
    title: "Elephanta Island Tour",
    image: "/image4.webp",
    bg: "linear-gradient(135deg,#0a5c7a,#1a8aad)",
    badge: "Bestseller", badgeColor: "#c9860a",
    duration: "6 hrs", transport: "Ferry included", group: "Group",
    desc: "UNESCO World Heritage caves, ancient Shiva sculptures & stunning sea views.",
    price: 999,
  },
  {
    id: 2,
    title: "Alibaug Beach Tour",
    emoji: "🏖️",
    bg: "linear-gradient(135deg,#8B4513,#c9860a)",
    badge: "Popular", badgeColor: "#c9860a",
    duration: "Full Day", transport: "Ferry + Bus", group: "All Ages",
    desc: "Pristine beaches, Kulaba Fort, local seafood & sunset.",
    price: 1499,
  },
  {
    id: 3,
    title: "Mandwa Coastal Getaway",
    emoji: "🌊",
    bg: "linear-gradient(135deg,#116655,#1a9a7a)",
    duration: "5 hrs", transport: "Ferry", group: "Couples",
    desc: "Peaceful coastal village & fresh seafood.",
    price: 799,
  },
  {
    id: 4,
    title: "Sunset Harbour Cruise",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India sunset view from sea.",
    price: 1199,
  },
  {
    id: 5,
    title: "Dharavi Slum Tour",
    image: "/image4.webp",
    bg: "linear-gradient(135deg,#0a5c7a,#1a8aad)",
    badge: "Bestseller", badgeColor: "#c9860a",
    duration: "6 hrs", transport: "Ferry included", group: "Group",
    desc: "UNESCO World Heritage caves, ancient Shiva sculptures & stunning sea views.",
    price: 999,
  },
  {
    id: 6,
    title: "Mumbai Heritage Tour",
    emoji: "🏖️",
    bg: "linear-gradient(135deg,#8B4513,#c9860a)",
    badge: "Popular", badgeColor: "#c9860a",
    duration: "Full Day", transport: "Ferry + Bus", group: "All Ages",
    desc: "Pristine beaches, Kulaba Fort, local seafood & sunset.",
    price: 1499,
  },
  {
    id: 7,
    title: "Mumbai Street Food Tour",
    emoji: "🌊",
    bg: "linear-gradient(135deg,#116655,#1a9a7a)",
    duration: "5 hrs", transport: "Ferry", group: "Couples",
    desc: "Peaceful coastal village & fresh seafood.",
    price: 799,
  },
  {
    id: 8,
    title: "Mumbai Dhobi Ghat Tour",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India sunset view from sea.",
    price: 1199,
  },
  {
    id: 9,
    title: "Mumbai Dabbawalla Tour",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India sunset view from sea.",
    price: 1199,
  },
  {
    id: 10,
    title: "Elephanta Caves Tour",
    image: "/image4.webp",
    bg: "linear-gradient(135deg,#0a5c7a,#1a8aad)",
    badge: "Bestseller", badgeColor: "#c9860a",
    duration: "6 hrs", transport: "Ferry included", group: "Group",
    desc: "UNESCO World Heritage caves, ancient Shiva sculptures & stunning sea views.",
    price: 999,
  },
  {
    id: 11,
    title: "Kanheri Caves & Golden Pagoda",
    emoji: "🏖️",
    bg: "linear-gradient(135deg,#8B4513,#c9860a)",
    badge: "Popular", badgeColor: "#c9860a",
    duration: "Full Day", transport: "Ferry + Bus", group: "All Ages",
    desc: "Pristine beaches, Kulaba Fort, local seafood & sunset.",
    price: 1499,
  },
  {
    id: 12,
    title: "Mumbai Bollywood Tour",
    emoji: "🌊",
    bg: "linear-gradient(135deg,#116655,#1a9a7a)",
    duration: "5 hrs", transport: "Ferry", group: "Couples",
    desc: "Peaceful coastal village & fresh seafood.",
    price: 799,
  },
  {
    id: 13,
    title: "Mumbai Night Tour",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India sunset view from sea.",
    price: 1199,
  },
  {
    id: 14,
    title: "Mumbai Dawn Tour",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India sunset view from sea.",
    price: 1199,
  },
  {
    id: 15,
    title: "Mumbai Shore Excursion Tour",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India sunset view from sea.",
    price: 1199,
  },
  {
    id: 16,
    title: "Mumbai Sightseeing Tour",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India sunset view from sea.",
    price: 1199,
  },
  {
    id: 17,
    title: "Full Day Sightseeing Mumbai Tour",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India sunset view from sea.",
    price: 1199,
  },
];

const ToursSection = ({ onSelectTour }) => {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // On mobile: 2 cards visible at once → group into pages of 2
  // On desktop: arrows scroll freely, dots not shown
  const cardsPerPage = 2;
  const totalDots = Math.ceil(tours.length / cardsPerPage);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Update active dot on scroll (mobile only)
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.scrollWidth / tours.length;
    const pageWidth = cardWidth * cardsPerPage;
    const idx = Math.round(el.scrollLeft / pageWidth);
    setActiveDot(Math.min(idx, totalDots - 1));
  }, [totalDots]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Click dot → scroll to that page
  const goToPage = (pageIdx) => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.scrollWidth / tours.length;
    const pageWidth = cardWidth * cardsPerPage;
    el.scrollTo({ left: pageIdx * pageWidth, behavior: "smooth" });
    setActiveDot(pageIdx);
  };

  return (
    <Box sx={{ py: 6, background: "#fdf6ec", mt: -3 }}>
      <Container maxWidth="lg">

        <Typography sx={{
          fontFamily: "'Playfair Display', serif",
          fontSize: { xs: 24, md: 32 },
          fontWeight: 700,
          mb: 3
        }}>
          Popular Island Tours
        </Typography>

        <Box sx={{ position: "relative" }}>

          {/* LEFT BUTTON */}
          <Button onClick={scrollLeft} sx={{
            display: { xs: "none", sm: "flex" },
            position: "absolute",
            left: -10,
            top: "40%",
            zIndex: 2,
            minWidth: "36px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#0a5c7a",
            color: "#fff",
            "&:hover": { background: "#1a8aad" }
          }}>
            <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
          </Button>

          {/* RIGHT BUTTON */}
          <Button onClick={scrollRight} sx={{
            display: { xs: "none", sm: "flex" },
            position: "absolute",
            right: -10,
            top: "40%",
            zIndex: 2,
            minWidth: "36px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#0a5c7a",
            color: "#fff",
            "&:hover": { background: "#1a8aad" }
          }}>
            <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
          </Button>

          {/* SCROLL CONTAINER */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollBehavior: "smooth",
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { display: "none" }
            }}
          >
            {tours.map((tour) => (
              <Box
                key={tour.id}
                sx={{
                  flex: "0 0 auto",
                  width: {
                    xs: "48%",
                    sm: "48%",
                    md: "23%",
                  },
                  scrollSnapAlign: "start",
                }}
              >
                <Card sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "0.5px solid #e8e8e8",
                  height: "100%",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.12)"
                  }
                }}>

                  {/* IMAGE */}
                  <Box sx={{
                    height: 180,
                    backgroundImage: tour.image
                      ? `url(${tour.image})`
                      : tour.bg,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}>
                    {!tour.image && (
                      <Typography sx={{ fontSize: 44 }}>
                        {tour.emoji}
                      </Typography>
                    )}
                    {tour.badge && (
                      <Chip label={tour.badge} size="small" sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: tour.badgeColor,
                        color: "#0d1b2a",
                        fontSize: 10,
                        fontWeight: 600
                      }} />
                    )}
                  </Box>

                  <CardContent sx={{ p: 2 }}>
                    <Typography fontWeight={700} sx={{ mb: 1 }}>
                      {tour.title}
                    </Typography>

                    <Typography sx={{ fontSize: 12, mb: 1, color: "#777" }}>
                      ⏱ {tour.duration} | ⛵ {tour.transport} | 👥 {tour.group}
                    </Typography>

                    <Typography sx={{ fontSize: 12, color: "#666", mb: 2 }}>
                      {tour.desc}
                    </Typography>

                    <Box sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <Typography fontWeight={600} color="#0a5c7a">
                        ₹{tour.price}
                      </Typography>

                      <Button
                        onClick={() => onSelectTour?.(tour.title)}
                        sx={{
                          background: "#0a5c7a",
                          color: "#fff",
                          borderRadius: "20px",
                          fontSize: 12,
                          px: 2,
                          textTransform: "none",
                          "&:hover": { background: "#1a8aad" }
                        }}
                      >
                        Book
                      </Button>
                    </Box>
                  </CardContent>

                </Card>
              </Box>
            ))}
          </Box>

          {/* DOTS — mobile only */}
          <Box sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "center",
            alignItems: "center",
            gap: "6px",
            mt: 2,
          }}>
            {Array.from({ length: totalDots }).map((_, i) => (
              <Box
                key={i}
                onClick={() => goToPage(i)}
                sx={{
                  height: "10px",
                  width: activeDot === i ? "28px" : "10px",
                  borderRadius: "10px",
                  background: activeDot === i ? "#c9860a" : "#b0b0b0",
                  cursor: "pointer",
                  transition: "width 0.35s cubic-bezier(.4,0,.2,1), background 0.35s",
                }}
              />
            ))}
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default ToursSection;
