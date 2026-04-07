"use client";
import React, { useState } from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import EastIcon from "@mui/icons-material/East";

/* ── Dummy Data ── */
const stays = [
  {
    id: 1,
    title: "Home in Lonavala",
    price: 28188,
    nights: 2,
    rating: 4.88,
    badge: null,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Villa in Mahagaon",
    price: 82165,
    nights: 2,
    rating: 5.0,
    badge: "Guest favourite",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Home in Mulshi",
    price: 43365,
    nights: 2,
    rating: 4.92,
    badge: "Guest favourite",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Cabin in Nadhal",
    price: 15748,
    nights: 2,
    rating: 4.83,
    badge: null,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Hotel in Panshet",
    price: 11869,
    nights: 2,
    rating: 4.92,
    badge: "Guest favourite",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    title: "Cabin in Phagane",
    price: 21850,
    nights: 2,
    rating: 4.88,
    badge: null,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    title: "Villa in Khandala",
    price: 35000,
    nights: 2,
    rating: 4.95,
    badge: "Guest favourite",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    title: "Home in Alibaug",
    price: 19500,
    nights: 2,
    rating: 4.79,
    badge: null,
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=400&h=300&fit=crop",
  },
];

const CARD_WIDTH = 240;
const CARD_GAP = 16;
const VISIBLE = 5;

/* ── Single Stay Card ── */
const StayCard = ({ stay }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Box sx={{ width: CARD_WIDTH, flexShrink: 0, cursor: "pointer" }}>
      {/* Image Container */}
      <Box sx={{
        position: "relative",
        width: "100%",
        height: 210,
        borderRadius: "16px",
        overflow: "hidden",
        "&:hover img": { transform: "scale(1.05)" },
      }}>
        <img
          src={stay.image}
          alt={stay.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
        />

        {/* Guest Favourite Badge */}
        {stay.badge && (
          <Chip
            label={stay.badge}
            size="small"
            sx={{
              position: "absolute", top: 12, left: 12,
              bgcolor: "rgba(255,255,255,0.92)",
              fontWeight: 600, fontSize: "12px", height: 28,
              backdropFilter: "blur(4px)",
            }}
          />
        )}

        {/* Heart Button */}
        <IconButton
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          sx={{
            position: "absolute", top: 6, right: 6,
            color: liked ? "#FF385C" : "#fff",
            p: 0.5,
            filter: liked ? "none" : "drop-shadow(0 1px 3px rgba(0,0,0,0.5))",
            "&:hover": { transform: "scale(1.15)" },
            transition: "transform 0.2s",
          }}
        >
          {liked
            ? <FavoriteIcon sx={{ fontSize: 22 }} />
            : <FavoriteBorderIcon sx={{ fontSize: 22 }} />
          }
        </IconButton>
      </Box>

      {/* Card Info */}
      <Box sx={{ mt: 1.2, px: 0.2 }}>
        {/* Title + Rating row */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Typography sx={{
            fontSize: "14px", fontWeight: 500, color: "#222",
            flex: 1, pr: 1, lineHeight: 1.3,
          }}>
            {stay.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, flexShrink: 0 }}>
            <StarIcon sx={{ fontSize: 13, color: "#222" }} />
            <Typography sx={{ fontSize: "13px", fontWeight: 500, color: "#222" }}>
              {stay.rating.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Price */}
        <Typography sx={{ fontSize: "13px", color: "#555", mt: 0.5 }}>
          <Box component="span" sx={{ fontWeight: 600, color: "#222" }}>
            ₹{stay.price.toLocaleString("en-IN")}
          </Box>
          {" "}for {stay.nights} nights
        </Typography>
      </Box>
    </Box>
  );
};

/* ── Main HomePage ── */
export default function HomePage() {
  const [scrollIndex, setScrollIndex] = useState(0);
  const maxIndex = Math.max(0, stays.length - VISIBLE);

  const handlePrev = () => setScrollIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setScrollIndex((i) => Math.min(maxIndex, i + 1));

  const translateX = scrollIndex * (CARD_WIDTH + CARD_GAP);

  return (
    <Box sx={{bgcolor: "#fff" }}>

      {/* ── Section Header ── */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>

        {/* Title with Arrow icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer",
          "&:hover .arrow-icon": { transform: "translateX(4px)" } }}>
          <Typography sx={{ fontSize: { xs: "20px", md: "26px" }, fontWeight: 700, color: "#222" }}>
            Stay near Pavana Lake
          </Typography>
          <Box className="arrow-icon"
            sx={{ display: "flex", alignItems: "center", transition: "transform 0.2s" }}>
            <EastIcon sx={{ fontSize: 22, color: "#222" }} />
          </Box>
        </Box>

        {/* Prev / Next Arrows */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={handlePrev} disabled={scrollIndex === 0}
            sx={{
              width: 36, height: 36, border: "1px solid #ddd", bgcolor: "#fff",
              color: scrollIndex === 0 ? "#ccc" : "#222",
              "&:hover": { bgcolor: scrollIndex === 0 ? "#fff" : "#f5f5f5" },
              transition: "all 0.2s",
            }}>
            <ChevronLeftIcon fontSize="small" />
          </IconButton>

          <IconButton onClick={handleNext} disabled={scrollIndex >= maxIndex}
            sx={{
              width: 36, height: 36, border: "1px solid #ddd", bgcolor: "#fff",
              color: scrollIndex >= maxIndex ? "#ccc" : "#222",
              "&:hover": { bgcolor: scrollIndex >= maxIndex ? "#fff" : "#f5f5f5" },
              transition: "all 0.2s",
            }}>
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* ── Carousel ── */}
      <Box sx={{ overflow: "hidden" }}>
        <Box sx={{
          display: "flex",
          gap: `${CARD_GAP}px`,
          transform: `translateX(-${translateX}px)`,
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}>
          {stays.map((stay) => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
