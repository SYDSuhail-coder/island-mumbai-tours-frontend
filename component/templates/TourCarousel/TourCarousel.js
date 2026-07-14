"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Card, CardContent, Button, Chip, Container } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const cardsPerPage = 2;

// Reusable premium tour carousel. Props: eyebrow, title, apiUrl
const TourCarousel = ({ eyebrow = "TOURS", title, apiUrl }) => {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [tours, setTours] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(apiUrl, { method: "GET", cache: "no-store" });
        const result = await res.json();
        setTours(result.data || []);
      } catch (err) {
        console.log("Tours Fetch Error:", err);
      }
    })();
  }, [apiUrl]);

  const totalDots = Math.ceil(tours.length / cardsPerPage);

  const scrollByDir = (dir) =>
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.scrollWidth / tours.length;
    const pageWidth = cardWidth * cardsPerPage;
    const idx = Math.round(el.scrollLeft / pageWidth);
    setActiveDot(Math.min(idx, totalDots - 1));
  }, [tours.length, totalDots]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const goToPage = (i) => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.scrollWidth / tours.length;
    el.scrollTo({ left: i * cardWidth * cardsPerPage, behavior: "smooth" });
    setActiveDot(i);
  };

  const navBtnSx = (side) => ({
    display: { xs: "none", sm: "flex" },
    position: "absolute", [side]: -14, top: "42%", zIndex: 3,
    minWidth: 40, width: 40, height: 40, borderRadius: "50%",
    background: "#fff", color: "#0D1B2A",
    border: "1px solid #efe7d6",
    boxShadow: "0 6px 18px rgba(18,51,63,0.14)",
    transition: "all 0.2s",
    "&:hover": { background: "#0D1B2A", color: "#fff" },
  });

  return (
    <Box sx={{ py: 6, background: "#fdf6ec" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography sx={{ fontSize: 11, letterSpacing: 3, color: "#D99400", fontWeight: 700, mb: 0.5 }}>
          {eyebrow}
        </Typography>
        <Typography sx={{
          fontFamily: "'Playfair Display', serif",
          fontSize: { xs: 24, md: 32 }, fontWeight: 700, color: "#0D1B2A", mb: 3,
        }}>
          {title}
        </Typography>

        <Box sx={{ position: "relative" }}>
          {/* Nav buttons */}
          <Button onClick={() => scrollByDir(-1)} sx={navBtnSx("left")}>
            <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
          </Button>
          <Button onClick={() => scrollByDir(1)} sx={navBtnSx("right")}>
            <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
          </Button>

          {/* Scroll area */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex", gap: 2.5, overflowX: "auto",
              scrollSnapType: "x mandatory", alignItems: "stretch", pb: 1,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {tours.map((tour) => (
              <Box
                key={tour._id}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: "82%", sm: "46%", md: "31%" },
                  scrollSnapAlign: "start", display: "flex",
                }}
              >
                <Card
                  onClick={() => router.push(`/tours/${tour.slug}`)}
                  sx={{
                    borderRadius: "18px", width: "100%", cursor: "pointer",
                    display: "flex", flexDirection: "column", overflow: "hidden",
                    border: "1px solid #efe7d6",
                    boxShadow: "0 6px 20px rgba(18,51,63,0.06)",
                    transition: "transform .25s, box-shadow .25s",
                    "&:hover": { transform: "translateY(-6px)", boxShadow: "0 18px 40px rgba(18,51,63,0.16)" },
                    "&:hover .tourImg": { transform: "scale(1.08)" },
                  }}
                >
                  {/* Image */}
                  <Box sx={{ position: "relative", height: 190, flexShrink: 0, overflow: "hidden" }}>
                    <Box
                      className="tourImg"
                      sx={{
                        position: "absolute", inset: 0,
                        backgroundImage: `url(${tour.coverImage})`,
                        backgroundSize: "cover", backgroundPosition: "center",
                        transition: "transform .4s ease",
                      }}
                    />
                    <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(13,27,42,0.5) 100%)" }} />

                    {/* rating pill */}
                    <Box sx={{
                      position: "absolute", top: 10, left: 10,
                      display: "flex", alignItems: "center", gap: 0.4,
                      background: "rgba(255,255,255,0.92)", borderRadius: "20px", px: 1, py: 0.3,
                    }}>
                      <StarIcon sx={{ fontSize: 13, color: "#F0A500" }} />
                      <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#0D1B2A" }}>{tour.rating}</Typography>
                      <Typography sx={{ fontSize: 10.5, color: "#8a949e" }}>({tour.reviewsCount})</Typography>
                    </Box>

                    {/* badge */}
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
                    <Typography sx={{ fontWeight: 700, fontSize: 15.5, color: "#0D1B2A", mb: 0.8, lineHeight: 1.3 }}>
                      {tour.title}
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, color: "#667" }}>
                        <AccessTimeIcon sx={{ fontSize: 14 }} />
                        <Typography sx={{ fontSize: 12 }}>{tour.duration}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, color: "#667" }}>
                        <DirectionsCarIcon sx={{ fontSize: 14 }} />
                        <Typography sx={{ fontSize: 12 }}>{tour.transport}</Typography>
                      </Box>
                    </Box>

                    <Typography sx={{ fontSize: 12, color: "#52525B", lineHeight: 1.55, mb: 1, minHeight: 34 }}>
                      {tour.description?.slice(0, 70)}…
                    </Typography>

                    {tour.freeCancellation && (
                      <Typography sx={{ fontSize: 11, color: "#2E9E5B", mb: 1 }}>✔ Free cancellation</Typography>
                    )}

                    <Box sx={{ mt: "auto", pt: 1, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 1 }}>
                      <Box>
                        <Typography sx={{ fontSize: 10.5, color: "#98a2ac" }}>From</Typography>
                        <Typography sx={{ fontWeight: 800, color: "#0D1B2A", fontSize: 18, lineHeight: 1 }}>
                          ₹{tour.pricePerPerson?.toLocaleString()}
                        </Typography>
                      </Box>
                      <Button
                        onClick={(e) => { e.stopPropagation(); router.push(`/tours/${tour.slug}`); }}
                        sx={{
                          background: "#F0A500", color: "#0D1B2A",
                          fontSize: 12.5, fontWeight: 700, textTransform: "none",
                          borderRadius: "10px", px: 2, py: 0.8,
                          "&:hover": { background: "#FFB92E" },
                        }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          {/* Dots (mobile) */}
          {totalDots > 1 && (
            <Box sx={{ display: { xs: "flex", sm: "none" }, justifyContent: "center", gap: 1, mt: 2 }}>
              {Array.from({ length: totalDots }).map((_, i) => (
                <Box
                  key={i}
                  onClick={() => goToPage(i)}
                  sx={{
                    height: 8, width: activeDot === i ? 24 : 8, borderRadius: 10,
                    background: activeDot === i ? "#F0A500" : "#e0d8c8",
                    cursor: "pointer", transition: "all .3s",
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default TourCarousel;
