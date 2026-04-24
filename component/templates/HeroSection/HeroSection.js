"use client"
import { Box, Typography, Button, Container } from "@mui/material";
import { useState, useEffect } from "react";
const images = [
  "https://res.cloudinary.com/drjders4g/image/upload/v1777012345/getway4_ywewva.jpg",
  "https://res.cloudinary.com/drjders4g/image/upload/v1777013940/marineline1_1_gdv1xy.jpg",
  "https://res.cloudinary.com/drjders4g/image/upload/v1777012320/getway5_mw13tx.jpg",
  "https://res.cloudinary.com/drjders4g/image/upload/v1777015944/pexels-xharsh-6071476_hf1uhk.jpg",
 " https://res.cloudinary.com/drjders4g/image/upload/v1777015009/pexels-shuttersangam-33350001_paw5yo.jpg",

];
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
            transition: "opacity 1s ease-in-out",
            zIndex: 0,
          }}
        />
      ))}

      {/* DARK OVERLAY - optional, text readability ke liye */}
      <Box sx={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.35)",
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
            backgroundColor: "rgba(201,134,10,0.2)",
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
            color: "white", fontSize: { xs: 28, sm: 40, md: 52 }, lineHeight: 1.15
          }}>
          Discover the{" "}
          <Box component="span" sx={{ color: "#f0a500" }}>Hidden Islands</Box>
          <br />of Mumbai
        </Typography>

        {/* BUTTONS */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mt: 3 }}>
          <Button onClick={() => scrollTo("book-now")}
            sx={{
              background: "#c9860a", color: "#0d1b2a",
              borderRadius: "25px", px: 4, py: 1.5,
              fontSize: 14, fontWeight: 500, textTransform: "none",
              "&:hover": { background: "#f0a500", transform: "scale(1.04)" },
              transition: "all 0.2s"
            }}>
            Book Now
          </Button>
          <Button onClick={() => scrollTo("tours")}
            sx={{
              backgroundColor: "rgba(201,134,10,0.2)",
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
