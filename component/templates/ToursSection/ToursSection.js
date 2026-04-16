"use client";
import { useRef } from "react";
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
    // emoji: "🏛️",
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
    desc: "Pristine beaches, Kulaba Fort, local seafood & the famous Alibaug sunset.",
    price: 1499,
  },
  {
    id: 3,
    title: "Mandwa Coastal Getaway",
    emoji: "🌊",
    bg: "linear-gradient(135deg,#116655,#1a9a7a)",
    badge: null,
    duration: "5 hrs", transport: "Ferry", group: "Couples",
    desc: "Peaceful coastal village, mangroves, and fresh fish thali — a hidden gem.",
    price: 799,
  },
  {
    id: 4,
    title: "Sunset Harbour Cruise",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India views, Marine Drive from the sea & golden hour photography.",
    price: 1199,
  },
];

const ToursSection = ({ onSelectTour }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <Box sx={{ py: 6, background: "#fdf6ec", mt:-3}}>
      <Container maxWidth="lg">
        {/* HEADING */}
        <Typography sx={{ fontSize: 11, letterSpacing: 3, color: "#1a8aad", mb: 1 }}>
          OUR PACKAGES
        </Typography>

        <Typography sx={{
          fontFamily: "'Playfair Display', serif",
          fontSize: { xs: 24, md: 32 },
          fontWeight: 700,
          mb: 1
        }}>
          Popular Island Tours
        </Typography>

        <Typography sx={{ fontSize: 14, color: "#666", mb: 4 }}>
          Handpicked experiences for every type of traveller — solo, family, or group.
        </Typography>

        {/* SCROLL SECTION */}
        <Box sx={{ position: "relative" }}>

          {/* LEFT BUTTON */}
          <Button
            onClick={scrollLeft}
            sx={{
              position: "absolute",
              left: -10,
              top: "40%",
              zIndex: 2,
              minWidth: "40px",
              borderRadius: "50%",
              background: "#0a5c7a",
              color: "#fff",
              "&:hover": { background: "#1a8aad" }
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </Button>

          {/* RIGHT BUTTON */}
          <Button
            onClick={scrollRight}
            sx={{
              position: "absolute",
              right: -10,
              top: "40%",
              zIndex: 2,
              minWidth: "40px",
              borderRadius: "50%",
              background: "#0a5c7a",
              color: "#fff",
              "&:hover": { background: "#1a8aad" }
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </Button>

          {/* SCROLL CARDS */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": { display: "none" }
            }}
          >
            {tours.map((tour) => (
              <Box key={tour.id} sx={{ minWidth: 280, flex: "0 0 auto" }}>
                <Card sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "0.5px solid #e8e8e8",
                  height: "100%"
                }}>

                  {/* IMAGE */}
                  {/* <Box sx={{
                    height: 160,
                    background: tour.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative"
                  }}> */}
                  <Box
                    sx={{
                      height: 180,
                      backgroundImage: tour.image
                        ? `url(${tour.image})`
                        : tour.bg, // fallback gradient
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                    }}
                  >
                    <Typography sx={{ fontSize: 48 }}>{tour.emoji}</Typography>

                    {tour.badge && (
                      <Chip label={tour.badge} size="small" sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: tour.badgeColor,
                        color: "#0d1b2a",
                        fontSize: 10
                      }} />
                    )}
                  </Box>

                  <CardContent>
                    <Typography fontWeight={700} sx={{ mb: 1 }}>
                      {tour.title}
                    </Typography>

                    <Typography sx={{ fontSize: 12, mb: 1 }}>
                      ⏱ {tour.duration} | 🚤 {tour.transport} | 👥 {tour.group}
                    </Typography>

                    <Typography sx={{ fontSize: 12, color: "#666", mb: 2 }}>
                      {tour.desc}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography fontWeight={600}>₹{tour.price}</Typography>

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

        </Box>
      </Container>
    </Box>
  );
};

export default ToursSection;