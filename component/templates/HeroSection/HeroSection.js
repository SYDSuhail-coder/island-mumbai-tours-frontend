"use client"
import { Box, Typography, Button, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const images = [
  "https://res.cloudinary.com/drjders4g/image/upload/v1780987876/mumbai-tours/oyqblcdttfyvvqgnpleo.jpg",
  "https://res.cloudinary.com/drjders4g/image/upload/f_auto,q_auto/v1777013940/marineline1_1_gdv1xy.jpg",
  "https://res.cloudinary.com/drjders4g/image/upload/f_auto,q_auto/v1777012320/getway5_mw13tx.jpg",
  "https://res.cloudinary.com/drjders4g/image/upload/f_auto,q_auto/v1777015944/pexels-xharsh-6071476_hf1uhk.jpg",
  "https://res.cloudinary.com/drjders4g/image/upload/f_auto,q_auto/v1777015009/pexels-shuttersangam-33350001_paw5yo.jpg",

];
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <Box sx={{
      position: "relative",
      pt: { xs: 14, md: 16 },
      pb: { xs: 10, md: 12 },
      textAlign: "center",
      overflow: "hidden"
    }}>

      {/* BACKGROUND IMAGES - fade transition ke saath */}
      {images.map((img, index) => (
        <Box
          key={img}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${img}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: index === currentIndex ? 1 : 0,
            transform: index === currentIndex ? "scale(1.08)" : "scale(1)",
            transition: "opacity 1.2s ease-in-out, transform 6s ease-out",
            zIndex: 0,
          }}
        />
      ))}

      {/* DARK OVERLAY - navy-tinted gradient for readability */}
      <Box sx={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(10,20,32,0.35) 0%, rgba(10,20,32,0.62) 100%)",
        zIndex: 1,
      }} />

      {/* BOTTOM CURVE */}
      <Box sx={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 60,
        background: "#fdf6ec",
        clipPath: "ellipse(55% 100% at 50% 100%)",
        zIndex: 2,
      }} />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 3 }}>
        {/* BADGE */}
        <Typography
          sx={{
            display: "inline-block",
            border: "1px solid rgba(255,255,255,0.4)",
            backgroundColor: "rgba(240,165,0,0.2)",
            color: "white",
            px: 2,
            py: 0.5,
            borderRadius: "20px",
            fontSize: 11,
            letterSpacing: 2,
            mb: 2,
          }}
        >
          MUMBAI'S #1 ISLAND TOUR
        </Typography>

        {/* HEADING */}
        <Typography variant="h3" fontWeight={900} mb={1.5}
          sx={{
            fontFamily: "'Playfair Display', serif",
            color: "white", fontSize: { xs: 28, sm: 40, md: 52 }, lineHeight: 1.15,
            textShadow: "0 2px 24px rgba(0,0,0,0.45)"
          }}>
          Discover the{" "}
          <Box component="span" sx={{ color: "#f0a500" }}>Hidden Islands</Box>
          <br />of Mumbai
        </Typography>

        {/* SUBTITLE */}
        <Typography sx={{
          color: "rgba(255,255,255,0.9)", fontSize: { xs: 13.5, md: 16 },
          maxWidth: 520, mx: "auto", lineHeight: 1.6,
          textShadow: "0 1px 12px rgba(0,0,0,0.4)"
        }}>
          Ferry rides, ancient caves, sunset cruises & hidden beaches — book unforgettable island experiences around Mumbai.
        </Typography>

        {/* BUTTONS */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mt: 3 }}>
          <Button onClick={() => router.push("/bookingSection")}
            sx={{
              background: "#F0A500", color: "#0d1b2a",
              borderRadius: "25px", px: 4, py: 1.5,
              fontSize: 14, fontWeight: 600, textTransform: "none",
              "&:hover": { background: "#FFB92E", transform: "scale(1.04)" },
              transition: "all 0.2s"
            }}>
            Book Now
          </Button>
          <Button onClick={() => router.push("/tours")}
            sx={{
              backgroundColor: "rgba(240,165,0,0.2)",
              color: "white", border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: "25px", px: 4, py: 1.5,
              fontSize: 14, textTransform: "none",
              "&:hover": { borderColor: "white" }
            }}>
            Explore Tours
          </Button>
        </Box>

        {/* DOT INDICATORS */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 4 }}>
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: index === currentIndex ? 24 : 8,
                height: 8,
                borderRadius: "4px",
                backgroundColor: index === currentIndex ? "#f0a500" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
