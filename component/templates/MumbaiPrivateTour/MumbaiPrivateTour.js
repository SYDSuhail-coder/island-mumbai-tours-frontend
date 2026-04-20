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
    title: "Elephanta Caves Tour",
    image: "/image4.webp",
    bg: "linear-gradient(135deg,#0a5c7a,#1a8aad)",
    badge: "Bestseller", badgeColor: "#c9860a",
    duration: "6 hrs", transport: "Ferry included", group: "Group",
    desc: "UNESCO World Heritage caves, ancient Shiva sculptures & stunning sea views.",
    price: 999,
  },
  {
    id: 2,
    title: "Kanheri Caves & Golden Pagoda",
    emoji: "🏖️",
    bg: "linear-gradient(135deg,#8B4513,#c9860a)",
    badge: "Popular", badgeColor: "#c9860a",
    duration: "Full Day", transport: "Ferry + Bus", group: "All Ages",
    desc: "Pristine beaches, Kulaba Fort, local seafood & sunset.",
    price: 1499,
  },
  {
    id: 3,
    title: "Mumbai Bollywood Tour",
    emoji: "🌊",
    bg: "linear-gradient(135deg,#116655,#1a9a7a)",
    duration: "5 hrs", transport: "Ferry", group: "Couples",
    desc: "Peaceful coastal village & fresh seafood.",
    price: 799,
  },
  {
    id: 4,
    title: "Mumbai Night Tour",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India sunset view from sea.",
    price: 1199,
  },
  {
    id: 5,
    title: "Mumbai Dawn Tour",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India sunset view from sea.",
    price: 1199,
  },
  {
    id: 6,
    title: "Mumbai Shore Excursion Tour",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India sunset view from sea.",
    price: 1199,
  },
  {
    id: 7,
    title: "Mumbai Sightseeing Tour",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India sunset view from sea.",
    price: 1199,
  },
  {
    id: 8,
    title: "Full Day Sightseeing Mumbai Tour",
    emoji: "🌅",
    bg: "linear-gradient(135deg,#4a1c6e,#7a3db8)",
    badge: "New", badgeColor: "#c9860a",
    duration: "2 hrs", transport: "Private Boat", group: "Small Group",
    desc: "Gateway of India sunset view from sea.",
    price: 1199,
  },
];

const MumbaiPrivateTour = ({ onSelectTour }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <Box sx={{ py: 6, background: "#fdf6ec", mt: -6 }}>
      <Container maxWidth="lg">

        <Typography sx={{
          fontFamily: "'Playfair Display', serif",
          fontSize: { xs: 24, md: 32 },
          fontWeight: 700,
          mb: 3
        }}>
          Mumbai Private Tour
        </Typography>

        <Box sx={{ position: "relative" }}>

          {/* LEFT BUTTON */}
          <Button onClick={scrollLeft} sx={{
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
                    xs: "90%",   // 📱 mobile → 1 card
                    sm: "48%",   // tablet → 2 cards
                    md: "32%",   // 💻 laptop → 3 cards
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

        </Box>
      </Container>
    </Box>
  );
};

export default MumbaiPrivateTour;