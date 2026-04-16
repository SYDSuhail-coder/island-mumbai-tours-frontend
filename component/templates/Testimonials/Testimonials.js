"use client";
import { Box, Typography, Container, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const reviews = [
  {
    text: "The Elephanta tour was absolutely breathtaking. Our guide Raj was incredibly knowledgeable. Best ₹999 I spent in Mumbai!",
    name: "Priya Sharma", from: "Delhi · Jan 2025", initials: "PR",
  },
  {
    text: "Alibaug trip with family was magical. Kids loved it, food was great, boat was safe and comfortable. Highly recommend!",
    name: "Aarav Kumar", from: "Pune · Dec 2024", initials: "AK",
  },
  {
    text: "The sunset cruise was so romantic! Perfect for our anniversary. The views of Gateway of India from the sea were stunning.",
    name: "Sneha & Mihir", from: "Mumbai · Feb 2025", initials: "SM",
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 4 }, background: "#fdf6ec" }}>
      <Container maxWidth="lg">
        <Typography sx={{ fontSize: 11, letterSpacing: 3, color: "#1a8aad", mb: 1 }}>
          TESTIMONIALS
        </Typography>
        <Typography sx={{
          fontFamily: "'Playfair Display', serif",
          fontSize: { xs: 24, md: 32 }, fontWeight: 700, mb: 1
        }}>
          What Our Guests Say
        </Typography>
        <Typography sx={{ fontSize: 14, color: "#666", mb: 4 }}>
          Trusted by thousands of tourists from across India and the world.
        </Typography>

        <Grid container spacing={2}>
          {reviews.map((r, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Box sx={{
                background: "white", borderRadius: 3,
                p: 3, border: "0.5px solid #eee", height: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-3px)" }
              }}>
                {/* STARS */}
                <Box sx={{ display: "flex", gap: 0.3, mb: 1.5 }}>
                  {[...Array(5)].map((_, si) => (
                    <StarIcon key={si} sx={{ fontSize: 16, color: "#f0a500" }} />
                  ))}
                </Box>

                {/* TEXT */}
                <Typography sx={{
                  fontSize: 13, color: "#555",
                  lineHeight: 1.6, mb: 2, fontStyle: "italic"
                }}>
                  "{r.text}"
                </Typography>

                {/* AUTHOR */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "#0a5c7a",
                    display: "flex", alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13, fontWeight: 500, color: "white",
                    flexShrink: 0
                  }}>
                    {r.initials}
                  </Box>
                  <Box>
                    <Typography fontSize={13} fontWeight={500}>{r.name}</Typography>
                    <Typography fontSize={11} color="#999">{r.from}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;