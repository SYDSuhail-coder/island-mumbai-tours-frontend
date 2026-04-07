"use client";
import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";

/* ── Dummy Tours Data (later replace with API call) ── */
const tours = [
  {
    id: 1,
    title: "Dharavi Slum Tour with Optional Dhobi Ghat Laundry",
    price: 950,
    rating: 4.96,
    badge: "Popular",
    image: "https://dynamic-media.tacdn.com/media/attractions-content--1x-1/0d/73/91/17.jpg",
  },
  {
    id: 2,
    title: "Mumbai Street Food and Local Market Tour",
    price: 1400,
    rating: 4.98,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Mumbai Morning Markets: Flowers, Fish, and More",
    price: 1400,
    rating: 4.94,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Explore the Ancient Elephanta Caves All Inclusive",
    price: 4999,
    rating: 4.93,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Explore Iconic Sights Of Mumbai in Four Hours",
    price: 3500,
    rating: 4.99,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    title: "Experience the Offbeat Mumbai",
    price: 3200,
    rating: 4.99,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    title: "Gateway of India & Colaba Heritage Walk",
    price: 1200,
    rating: 4.95,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    title: "Bollywood Studio Tour & Behind The Scenes",
    price: 2800,
    rating: 4.91,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1524230659092-07f99a75c013?w=400&h=300&fit=crop",
  },
];

const CARD_WIDTH = 240;
const CARD_GAP = 16;
const VISIBLE = 5;

/* ── Tour Card ── */
const TourCard = ({ tour }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Box
      sx={{
        width: CARD_WIDTH,
        flexShrink: 0,
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 200,
          borderRadius: "14px",
          overflow: "hidden",
          "&:hover img": { transform: "scale(1.05)" },
        }}
      >
        <img
          src={tour.image}
          alt={tour.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
        />

        {/* Popular Badge */}
        {tour.badge && (
          <Chip
            label={tour.badge}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: "rgba(255,255,255,0.92)",
              fontWeight: 700,
              fontSize: "11px",
              height: 26,
              backdropFilter: "blur(4px)",
            }}
          />
        )}

        {/* Heart Button */}
        <IconButton
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            color: liked ? "#FF385C" : "#fff",
            p: 0.5,
            "&:hover": { transform: "scale(1.15)" },
            transition: "transform 0.2s",
            filter: liked ? "none" : "drop-shadow(0 1px 3px rgba(0,0,0,0.5))",
          }}
        >
          {liked ? <FavoriteIcon sx={{ fontSize: 22 }} /> : <FavoriteBorderIcon sx={{ fontSize: 22 }} />}
        </IconButton>
      </Box>

      {/* Info */}
      <Box sx={{ mt: 1.2, px: 0.2 }}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#222",
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {tour.title}
        </Typography>

        {/* Price + Rating */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 0.8 }}>
          <Typography sx={{ fontSize: "13px", color: "#555" }}>
            From{" "}
            <Box component="span" sx={{ fontWeight: 600, color: "#222" }}>
              ₹{tour.price.toLocaleString("en-IN")}
            </Box>
            {" "}/ guest
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
            <StarIcon sx={{ fontSize: 13, color: "#222" }} />
            <Typography sx={{ fontSize: "13px", fontWeight: 500, color: "#222" }}>
              {tour.rating}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

/* ── Main Carousel ── */
export default function ExperiencesPage() {
  const [scrollIndex, setScrollIndex] = useState(0);
  const maxIndex = tours.length - VISIBLE;

  const handlePrev = () => setScrollIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setScrollIndex((i) => Math.min(maxIndex, i + 1));

  const translateX = scrollIndex * (CARD_WIDTH + CARD_GAP);

  return (
    <Box sx={{ bgcolor: "#fff" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography
          sx={{
            fontSize: { xs: "20px", md: "26px" },
            fontWeight: 700,
            color: "#222",
          }}
        >
          Popular experiences in Mumbai
        </Typography>

        {/* Arrow Buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={handlePrev}
            disabled={scrollIndex === 0}
            sx={{
              width: 36,
              height: 36,
              border: "1px solid #ddd",
              bgcolor: "#fff",
              color: scrollIndex === 0 ? "#ccc" : "#222",
              "&:hover": { bgcolor: scrollIndex === 0 ? "#fff" : "#f5f5f5" },
              transition: "all 0.2s",
            }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={scrollIndex >= maxIndex}
            sx={{
              width: 36,
              height: 36,
              border: "1px solid #ddd",
              bgcolor: "#fff",
              color: scrollIndex >= maxIndex ? "#ccc" : "#222",
              "&:hover": { bgcolor: scrollIndex >= maxIndex ? "#fff" : "#f5f5f5" },
              transition: "all 0.2s",
            }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Carousel Track */}
      <Box sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            transform: `translateX(-${translateX}px)`,
            transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
