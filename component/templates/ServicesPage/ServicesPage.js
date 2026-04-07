"use client";
import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const services = [
  {
    id: 1,
    title: "Photography",
    status: "2 available",
    available: true,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Chefs",
    status: "Coming soon",
    available: false,
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Massage",
    status: "Coming soon",
    available: false,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Prepared meals",
    status: "Coming soon",
    available: false,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Training",
    status: "Coming soon",
    available: false,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    title: "Make-up",
    status: "Coming soon",
    available: false,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    title: "Hair",
    status: "Coming soon",
    available: false,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    title: "Spa treatments",
    status: "Coming soon",
    available: false,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop",
  },
];

const CARD_WIDTH = 190;
const CARD_GAP = 16;
const VISIBLE = 7;

const ServiceCard = ({ service }) => (
  <Box sx={{ width: CARD_WIDTH, flexShrink: 0, cursor: "pointer" }}>
    {/* Image */}
    <Box sx={{
      width: "100%",
      height: 180,
      borderRadius: "16px",
      overflow: "hidden",
      "&:hover img": { transform: "scale(1.05)" },
    }}>
      <img
        src={service.image}
        alt={service.title}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transition: "transform 0.4s ease",
          filter: service.available ? "none" : "brightness(0.92)",
        }}
      />
    </Box>

    {/* Text */}
    <Box sx={{ mt: 1.2, px: 0.2 }}>
      <Typography sx={{ fontSize: "15px", fontWeight: 500, color: "#222" }}>
        {service.title}
      </Typography>
      <Typography sx={{
        fontSize: "13px",
        color: service.available ? "#222" : "#717171",
        mt: 0.2,
      }}>
        {service.status}
      </Typography>
    </Box>
  </Box>
);

export default function ServicesPage() {
  const [scrollIndex, setScrollIndex] = useState(0);
  const maxIndex = Math.max(0, services.length - VISIBLE);

  const handlePrev = () => setScrollIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setScrollIndex((i) => Math.min(maxIndex, i + 1));

  const translateX = scrollIndex * (CARD_WIDTH + CARD_GAP);

  return (
    <Box sx={{ bgcolor: "#fff" }}>

      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography sx={{ fontSize: { xs: "20px", md: "26px" }, fontWeight: 700, color: "#222" }}>
          Services in Mumbai
        </Typography>

        {/* Arrow Buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={handlePrev}
            disabled={scrollIndex === 0}
            sx={{
              width: 36, height: 36,
              border: "1px solid #ddd", bgcolor: "#fff",
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
              width: 36, height: 36,
              border: "1px solid #ddd", bgcolor: "#fff",
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
        <Box sx={{
          display: "flex",
          gap: `${CARD_GAP}px`,
          transform: `translateX(-${translateX}px)`,
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
