"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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
const cardsPerPage = 2;
const MumbaiPrivateTour = () => {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // GET TOURS API
  useEffect(() => {
    getTours();
  }, []);

  const getTours = async () => {
    try {
      const response = await fetch("/api/get-private-tours", {
        method: "GET",
        cache: "no-store"
      });
      const result = await response.json();
      setTours(result.data || []);
    } catch (error) {
      console.log("Tours Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // TOTAL DOTS
  const totalDots = Math.ceil(tours.length / cardsPerPage);
  // SCROLL FUNCTIONS
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth"
    });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth"
    });
  };
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
    el.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const goToPage = (pageIdx) => {

    if (!scrollRef.current) return;

    const el = scrollRef.current;

    const cardWidth = el.scrollWidth / tours.length;

    const pageWidth = cardWidth * cardsPerPage;

    el.scrollTo({
      left: pageIdx * pageWidth,
      behavior: "smooth"
    });

    setActiveDot(pageIdx);
  };

  return (

    <Box sx={{ py: 6, background: "#fdf6ec", pt: -3 }}>

      <Container maxWidth="lg">

        <Typography sx={{
          fontFamily: "'Playfair Display', serif",
          fontSize: { xs: 24, md: 32 },
          fontWeight: 700,
          mb: 3
        }}
        >
          Mumbai Private Tour
        </Typography>

        <Box sx={{ position: "relative" }}>

          {/* LEFT BUTTON */}

          <Button
            onClick={scrollLeft}
            sx={{
              display: { xs: "none", sm: "flex" },
              position: "absolute",
              left: -10,
              top: "40%",
              zIndex: 2,
              minWidth: 36,
              height: 36,
              borderRadius: "50%",
              background: "#0a5c7a",
              color: "#fff"
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
          </Button>

          {/* RIGHT BUTTON */}

          <Button
            onClick={scrollRight}
            sx={{
              display: { xs: "none", sm: "flex" },
              position: "absolute",
              right: -10,
              top: "40%",
              zIndex: 2,
              minWidth: 36,
              height: 36,
              borderRadius: "50%",
              background: "#0a5c7a",
              color: "#fff"
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
          </Button>

          {/* SCROLL AREA */}

          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": {
                display: "none"
              }
            }}
          >

            {tours.map((tour) => (

              <Box
                key={tour._id}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: "80%", sm: "48%", md: "23%" },
                  scrollSnapAlign: "start"
                }}
              >

                <Card
                  sx={{
                    borderRadius: 3,
                    transition: "0.3s",

                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
                    }
                  }}
                >

                  {/* IMAGE */}

                  <Box
                    sx={{
                      height: 180,
                      backgroundImage: `url(${tour.coverImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative"
                    }}
                  >

                    {tour.badge && (

                      <Chip
                        label={tour.badge}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          background: "#c9860a",
                          color: "#fff",
                          fontSize: 10
                        }}
                      />
                    )}

                  </Box>

                  {/* CONTENT */}

                  <CardContent sx={{ p: 2 }}>

                    <Typography fontWeight={700}>
                      {tour.title}
                    </Typography>

                    {/* RATING */}

                    <Typography sx={{ fontSize: 12 }}>

                      ⭐ {tour.rating} ({tour.reviewsCount})

                    </Typography>

                    {/* INFO */}

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#777",
                        mb: 1
                      }}
                    >
                      ⏱ {tour.duration} | 🚘 {tour.transport}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 11,
                        mt: 1,
                        minHeight: 40
                      }}
                    >

                      {tour.description?.slice(0, 70)}...

                    </Typography>

                    {/* FREE CANCEL */}

                    {tour.freeCancellation && (

                      <Typography
                        sx={{
                          fontSize: 11,
                          color: "green",
                          mt: 1
                        }}
                      >

                        ✔ Free cancellation

                      </Typography>
                    )}

                    {/* PRICE */}

                    <Box sx={{ mt: 1.5 }}>

                      <Typography
                        fontWeight={600}
                        color="#0a5c7a"
                      >

                        From ₹{tour.pricePerPerson}

                        <span style={{ fontSize: 10 }}>
                          {" "}per person
                        </span>

                      </Typography>

                      {/* BUTTON */}

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mt: 1
                        }}
                      >

                        <Button
                          fullWidth
                          onClick={() =>
                            router.push(`/tours/${tour.slug}`)
                          }
                          sx={{
                            background: "#0a5c7a",
                            color: "#fff",
                            fontSize: 12
                          }}
                        >
                          Book
                        </Button>

                      </Box>

                    </Box>

                  </CardContent>

                </Card>

              </Box>

            ))}

          </Box>

          {/* DOTS */}

          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              justifyContent: "center",
              gap: 1,
              mt: 2
            }}
          >

            {Array.from({
              length: totalDots
            }).map((_, i) => (

              <Box
                key={i}
                onClick={() => goToPage(i)}
                sx={{
                  height: 8,
                  width: activeDot === i ? 24 : 8,
                  borderRadius: 10,
                  background:
                    activeDot === i
                      ? "#c9860a"
                      : "#ccc",
                  cursor: "pointer"
                }}
              />

            ))}

          </Box>

        </Box>

      </Container>

    </Box>
  );
};

export default MumbaiPrivateTour;
