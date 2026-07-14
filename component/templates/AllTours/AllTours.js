"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Container, Grid, Card, CardContent, Button, Chip } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

// Fetch a tours API and return its data array (safe on error)
const fetchTours = async (url) => {
  try {
    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
};

const AllTours = () => {
  const router = useRouter();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [island, walking, priv] = await Promise.all([
        fetchTours("/api/get-toures-section"),
        fetchTours("/api/get-walking-tours"),
        fetchTours("/api/get-private-tours"),
      ]);
      // Merge all categories, de-duplicate by _id
      const map = new Map();
      [...island, ...walking, ...priv].forEach((t) => t?._id && map.set(t._id, t));
      setTours([...map.values()]);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero band */}
      <Box sx={{
        mt: "64px",
        background: "linear-gradient(135deg, #0D1B2A 0%, #1B3A57 100%)",
        px: { xs: 2, md: 4 }, py: { xs: 5, md: 7 },
        position: "relative", overflow: "hidden",
      }}>
        <Box sx={{
          position: "absolute", top: -100, right: -60,
          width: 340, height: 340, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,165,0,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{
            display: "inline-flex", alignItems: "center", gap: 0.8,
            background: "rgba(240,165,0,0.12)",
            border: "1px solid rgba(240,165,0,0.35)",
            borderRadius: "999px", px: 1.6, py: 0.5, mb: 1.8,
          }}>
            <Box sx={{ width: 7, height: 7, borderRadius: "50%", background: "#F0A500" }} />
            <Typography sx={{ fontSize: 11, letterSpacing: 2.5, color: "#F0A500", fontWeight: 700 }}>
              EXPLORE TOURS
            </Typography>
          </Box>
          <Typography sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: { xs: 30, md: 44 }, fontWeight: 700, color: "#fff", lineHeight: 1.1, mb: 1,
          }}>
            Discover All Our Tours
          </Typography>
          <Typography sx={{ fontSize: 14.5, color: "rgba(232,237,242,0.6)", maxWidth: 560 }}>
            Handpicked island, walking and private tours across Mumbai — pick your next adventure.
          </Typography>
        </Container>
      </Box>

      {/* Tours grid */}
      <Box sx={{ background: "#fdf6ec", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 }, minHeight: "40vh" }}>
        <Container maxWidth="lg">
          {loading ? (
            <Typography sx={{ textAlign: "center", color: "#98a2ac", py: 6 }}>
              Loading tours…
            </Typography>
          ) : tours.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "#98a2ac", py: 6 }}>
              No tours available right now. Please check back soon.
            </Typography>
          ) : (
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {tours.map((tour) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tour._id}>
                  <Card
                    onClick={() => router.push(`/tours/${tour.slug}`)}
                    sx={{
                      borderRadius: "16px", height: "100%",
                      display: "flex", flexDirection: "column",
                      border: "1px solid #efe7d6", cursor: "pointer",
                      boxShadow: "0 4px 18px rgba(18,51,63,0.06)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": { transform: "translateY(-6px)", boxShadow: "0 16px 36px rgba(18,51,63,0.14)" },
                    }}
                  >
                    {/* Image */}
                    <Box sx={{
                      height: 170, flexShrink: 0, position: "relative",
                      backgroundImage: `url(${tour.coverImage})`,
                      backgroundSize: "cover", backgroundPosition: "center",
                    }}>
                      {tour.badge && (
                        <Chip
                          label={tour.badge}
                          size="small"
                          sx={{ position: "absolute", top: 10, right: 10, background: "#c9860a", color: "#fff", fontSize: 10, fontWeight: 700 }}
                        />
                      )}
                    </Box>

                    {/* Content */}
                    <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#0D1B2A", mb: 0.3 }}>
                        {tour.title}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: "#667", mb: 0.5 }}>
                        ⭐ {tour.rating} ({tour.reviewsCount})
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: "#777", mb: 1 }}>
                        ⏱ {tour.duration} · 🚘 {tour.transport}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: "#52525B", mb: 1.5, lineHeight: 1.5 }}>
                        {tour.description?.slice(0, 72)}…
                      </Typography>

                      {tour.freeCancellation && (
                        <Typography sx={{ fontSize: 11, color: "#2E9E5B", mb: 1 }}>
                          ✔ Free cancellation
                        </Typography>
                      )}

                      <Box sx={{ mt: "auto", pt: 1 }}>
                        <Typography sx={{ fontWeight: 800, color: "#0D1B2A", fontSize: 16 }}>
                          From ₹{tour.pricePerPerson?.toLocaleString()}
                          <Box component="span" sx={{ fontSize: 10, fontWeight: 500, color: "#98a2ac" }}> / person</Box>
                        </Typography>
                        <Button
                          fullWidth
                          onClick={(e) => { e.stopPropagation(); router.push(`/tours/${tour.slug}`); }}
                          sx={{
                            mt: 1.2, background: "#F0A500", color: "#0D1B2A",
                            fontSize: 13, fontWeight: 700, textTransform: "none",
                            borderRadius: "10px", py: 1,
                            "&:hover": { background: "#FFB92E" },
                          }}
                        >
                          Book Now
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default AllTours;
