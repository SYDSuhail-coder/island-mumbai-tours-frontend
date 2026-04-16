import { Box, Typography, Button, Container } from "@mui/material";

const HeroSection = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // <Box sx={{
    //   background: "linear-gradient(160deg, #0d1b2a 0%, #0a5c7a 50%, #1a8aad 100%)",
    //   pt: { xs: 14, md: 16 }, pb: { xs: 10, md: 12 },
    //   textAlign: "center", position: "relative", overflow: "hidden"
    // }}>
    <Box sx={{
      backgroundImage: "url('/image (2).png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      pt: { xs: 14, md: 16 },
      pb: { xs: 10, md: 12 },
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* BOTTOM CURVE */}
      <Box sx={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 60,
        background: "#fdf6ec",
        clipPath: "ellipse(55% 100% at 50% 100%)"
      }} />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        {/* BADGE */}
        <Typography
          sx={{
            display: "inline-block",
            border: "1px solid #c9860a",
            backgroundColor: "rgba(201,134,10,0.2)",  // 👈 yeh add karo
            color: "#f0a500",
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
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mt:3}}>
          <Button onClick={() => scrollTo("book-now")}
            sx={{
              background: "#c9860a", color: "#0d1b2a",
              borderRadius: "25px", px: 4, py: 1.5,
              fontSize: 14, fontWeight: 500, textTransform: "none",
              "&:hover": { background: "#f0a500", transform: "scale(1.04)" },
              transition: "all 0.2s"
            }}>
            Book a Tour
          </Button>
          <Button onClick={() => scrollTo("tours")}
            sx={{
              color: "white", border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: "25px", px: 4, py: 1.5,
              fontSize: 14, textTransform: "none",
              "&:hover": { borderColor: "white" }
            }}>
            Explore Tours
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;