"use client";
import { useRef, useState, useEffect, useCallback } from "react";
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

const tours = [
  {
    id: 1,
    title: "Elephanta Caves Tour",
    image: "/Elephanta1.png",
    badge: "🔥 Bestseller",
    badgeColor: "#c9860a",
    duration: "5–6 hrs",
    transport: "Ferry included",
    group: "Group",
    rating: 4.8,
    reviews: 324,
    highlights: ["UNESCO caves", "Boat ride", "Shiva sculptures"],
    price: 999,
  },
  {
    id: 2,
    title: "Kanheri Caves & Golden Pagoda",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200",
    badge: "⭐ Popular",
    badgeColor: "#c9860a",
    duration: "Full Day",
    transport: "AC Bus",
    group: "All Ages",
    rating: 4.7,
    reviews: 210,
    highlights: ["Kanheri caves", "Forest ride", "Golden Pagoda"],
    price: 1499,
  },
  {
    id: 3,
    title: "Mumbai Bollywood Tour",
    image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=1200",
    duration: "4–5 hrs",
    transport: "Car",
    group: "Couples",
    rating: 4.9,
    reviews: 410,
    highlights: ["Film studios", "Celebrity homes", "Live shoots"],
    price: 1799,
  },
  {
    id: 4,
    title: "Mumbai Night Tour",
    image: "/marine2.jpg",
    badge: "🆕 New",
    badgeColor: "#c9860a",
    duration: "2–3 hrs",
    transport: "Private Car",
    group: "Small Group",
    rating: 4.6,
    reviews: 85,
    highlights: ["Marine Drive lights", "Night skyline", "Sea breeze"],
    price: 1199,
  },
];

const cardsPerPage = 2;
const totalDots = Math.ceil(tours.length / cardsPerPage);

const MumbaiPrivateTour = ({ onSelectTour }) => {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.scrollWidth / tours.length;
    const pageWidth = cardWidth * cardsPerPage;
    const idx = Math.round(el.scrollLeft / pageWidth);
    setActiveDot(Math.min(idx, totalDots - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const goToPage = (pageIdx) => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.scrollWidth / tours.length;
    const pageWidth = cardWidth * cardsPerPage;
    el.scrollTo({ left: pageIdx * pageWidth, behavior: "smooth" });
    setActiveDot(pageIdx);
  };

  return (
    <Box sx={{ py: 6, background: "#fdf6ec" ,pt:-4 }}>
      <Container maxWidth="lg">

        <Typography sx={{
          fontSize: { xs: 24, md: 32 },
          fontWeight: 700,
          mb: 3
        }}>
          Mumbai Private Tours
        </Typography>

        <Box sx={{ position: "relative" }}>

          {/* LEFT */}
          <Button onClick={scrollLeft} sx={{
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
          }}>
            <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
          </Button>

          {/* RIGHT */}
          <Button onClick={scrollRight} sx={{
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
          }}>
            <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
          </Button>

          {/* SCROLL */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { display: "none" }
            }}
          >
            {tours.map((tour) => (
              <Box
                key={tour.id}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: "80%", sm: "48%", md: "23%" },
                  display: "flex"
                }}
              >
                <Card sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  height: "100%"
                }}>

                  {/* IMAGE */}
                  <Box sx={{
                    height: 180,
                    backgroundImage: `url(${tour.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative"
                  }}>
                    {tour.badge && (
                      <Chip label={tour.badge} size="small" sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: tour.badgeColor,
                        fontSize: 10
                      }} />
                    )}
                  </Box>

                  <CardContent sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}>

                    <Box>
                      <Typography fontWeight={700} sx={{ minHeight: 40 }}>
                        {tour.title}
                      </Typography>

                      <Typography sx={{ fontSize: 12 }}>
                        ⭐ {tour.rating} ({tour.reviews})
                      </Typography>

                      <Typography sx={{ fontSize: 12, color: "#777", mb: 1 }}>
                        ⏱ {tour.duration} | 🚗 {tour.transport}
                      </Typography>

                      {/* FIXED HEIGHT */}
                      <Box sx={{ minHeight: 40 }}>
                        {tour.highlights?.slice(0, 2).map((h, i) => (
                          <Typography key={i} sx={{ fontSize: 11 }}>
                            ✔ {h}
                          </Typography>
                        ))}
                      </Box>

                      <Typography sx={{ fontSize: 11, color: "green", mt: 1 }}>
                        ✔ Free cancellation
                      </Typography>
                    </Box>

                    {/* PRICE */}
                    <Box sx={{ mt: 1.5 }}>
                      <Typography fontWeight={600} color="#0a5c7a">
                        ₹{tour.price}
                      </Typography>

                      <Button
                        fullWidth
                        onClick={() => onSelectTour?.(tour.title)}
                        sx={{
                          mt: 1,
                          background: "#0a5c7a",
                          color: "#fff",
                          fontSize: 12
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

          {/* DOTS */}
          <Box sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "center",
            gap: 1,
            mt: 2
          }}>
            {Array.from({ length: totalDots }).map((_, i) => (
              <Box
                key={i}
                onClick={() => goToPage(i)}
                sx={{
                  height: 8,
                  width: activeDot === i ? 24 : 8,
                  borderRadius: 10,
                  background: activeDot === i ? "#c9860a" : "#ccc",
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

// "use client";

// import { useRef, useState, useEffect, useCallback } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   Chip,
//   Container
// } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// const cardsPerPage = 2;
// const MumbaiPrivateTour = ({ onSelectTour }) => {
//   const scrollRef = useRef(null);
//   const [activeDot, setActiveDot] = useState(0);
//   const [tours, setTours] = useState([]);
//   const [loading, setLoading] = useState(true);


//   // GET TOURS API
//   useEffect(() => {
//     getTours();
//   }, []);

//   const getTours = async () => {
//     try {
//       const response = await fetch("/api/get-toures-section", {
//         method: "GET",
//         cache: "no-store"
//       });
//       const result = await response.json();
//       setTours(result.data || []);
//     } catch (error) {
//       console.log("Tours Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // TOTAL DOTS
//   const totalDots = Math.ceil(tours.length / cardsPerPage);
//   // SCROLL FUNCTIONS
//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({
//       left: -300,
//       behavior: "smooth"
//     });
//   };
//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({
//       left: 300,
//       behavior: "smooth"
//     });
//   };
//   const handleScroll = useCallback(() => {
//     if (!scrollRef.current) return;
//     const el = scrollRef.current;
//     const cardWidth = el.scrollWidth / tours.length;
//     const pageWidth = cardWidth * cardsPerPage;
//     const idx = Math.round(el.scrollLeft / pageWidth);
//     setActiveDot(Math.min(idx, totalDots - 1));
//   }, [tours.length, totalDots]);

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;
//     el.addEventListener("scroll", handleScroll, {
//       passive: true
//     });
//     return () => {
//       el.removeEventListener("scroll", handleScroll);
//     };
//   }, [handleScroll]);

//   const goToPage = (pageIdx) => {

//     if (!scrollRef.current) return;

//     const el = scrollRef.current;

//     const cardWidth = el.scrollWidth / tours.length;

//     const pageWidth = cardWidth * cardsPerPage;

//     el.scrollTo({
//       left: pageIdx * pageWidth,
//       behavior: "smooth"
//     });

//     setActiveDot(pageIdx);
//   };
  
//   return (

//     <Box sx={{ py: 6, background: "#fdf6ec", pt: -3 }}>

//       <Container maxWidth="lg">

//         <Typography sx={{
//           fontFamily: "'Playfair Display', serif",
//             fontSize: { xs: 24, md: 32 },
//             fontWeight: 700,
//             mb: 3
//           }}
//         >
//           Popular Island Tours
//         </Typography>

//         <Box sx={{ position: "relative" }}>

//           {/* LEFT BUTTON */}

//           <Button
//             onClick={scrollLeft}
//             sx={{
//               display: { xs: "none", sm: "flex" },
//               position: "absolute",
//               left: -10,
//               top: "40%",
//               zIndex: 2,
//               minWidth: 36,
//               height: 36,
//               borderRadius: "50%",
//               background: "#0a5c7a",
//               color: "#fff"
//             }}
//           >
//             <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
//           </Button>

//           {/* RIGHT BUTTON */}

//           <Button
//             onClick={scrollRight}
//             sx={{
//               display: { xs: "none", sm: "flex" },
//               position: "absolute",
//               right: -10,
//               top: "40%",
//               zIndex: 2,
//               minWidth: 36,
//               height: 36,
//               borderRadius: "50%",
//               background: "#0a5c7a",
//               color: "#fff"
//             }}
//           >
//             <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
//           </Button>

//           {/* SCROLL AREA */}

//           <Box
//             ref={scrollRef}
//             sx={{
//               display: "flex",
//               gap: 2,
//               overflowX: "auto",
//               scrollSnapType: "x mandatory",
//               "&::-webkit-scrollbar": {
//                 display: "none"
//               }
//             }}
//           >

//             {tours.map((tour) => (

//               <Box
//                 key={tour._id}
//                 sx={{
//                   flex: "0 0 auto",
//                   width: { xs: "80%", sm: "48%", md: "23%" },
//                   scrollSnapAlign: "start"
//                 }}
//               >

//                 <Card
//                   sx={{
//                     borderRadius: 3,
//                     transition: "0.3s",

//                     "&:hover": {
//                       transform: "translateY(-6px)",
//                       boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
//                     }
//                   }}
//                 >

//                   {/* IMAGE */}

//                   <Box
//                     sx={{
//                       height: 180,
//                       backgroundImage: `url(${tour.coverImage})`,
//                       backgroundSize: "cover",
//                       backgroundPosition: "center",
//                       position: "relative"
//                     }}
//                   >

//                     {tour.badge && (

//                       <Chip
//                         label={tour.badge}
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: 10,
//                           right: 10,
//                           background: "#c9860a",
//                           color: "#fff",
//                           fontSize: 10
//                         }}
//                       />
//                     )}

//                   </Box>

//                   {/* CONTENT */}

//                   <CardContent sx={{ p: 2 }}>

//                     <Typography fontWeight={700}>
//                       {tour.title}
//                     </Typography>

//                     {/* RATING */}

//                     <Typography sx={{ fontSize: 12 }}>

//                       ⭐ {tour.rating} ({tour.reviewsCount})

//                     </Typography>

//                     {/* INFO */}

//                     <Typography
//                       sx={{
//                         fontSize: 12,
//                         color: "#777",
//                         mb: 1
//                       }}
//                     >
//                       ⏱ {tour.duration} | 🚘 {tour.transport}
//                     </Typography>

//                     <Typography
//                       sx={{
//                         fontSize: 11,
//                         mt: 1,
//                         minHeight: 40
//                       }}
//                     >

//                       {tour.description?.slice(0, 70)}...

//                     </Typography>

//                     {/* FREE CANCEL */}

//                     {tour.freeCancellation && (

//                       <Typography
//                         sx={{
//                           fontSize: 11,
//                           color: "green",
//                           mt: 1
//                         }}
//                       >

//                         ✔ Free cancellation

//                       </Typography>
//                     )}

//                     {/* PRICE */}

//                     <Box sx={{ mt: 1.5 }}>

//                       <Typography
//                         fontWeight={600}
//                         color="#0a5c7a"
//                       >

//                         From ₹{tour.pricePerPerson}

//                         <span style={{ fontSize: 10 }}>
//                           {" "}per person
//                         </span>

//                       </Typography>

//                       {/* BUTTON */}

//                       <Box
//                         sx={{
//                           display: "flex",
//                           gap: 1,
//                           mt: 1
//                         }}
//                       >

//                         <Button
//                           fullWidth
//                           onClick={() =>
//                             onSelectTour?.(tour.title)
//                           }
//                           sx={{
//                             background: "#0a5c7a",
//                             color: "#fff",
//                             fontSize: 12
//                           }}
//                         >
//                           Book
//                         </Button>

//                       </Box>

//                     </Box>

//                   </CardContent>

//                 </Card>

//               </Box>

//             ))}

//           </Box>

//           {/* DOTS */}

//           <Box
//             sx={{
//               display: { xs: "flex", sm: "none" },
//               justifyContent: "center",
//               gap: 1,
//               mt: 2
//             }}
//           >

//             {Array.from({
//               length: totalDots
//             }).map((_, i) => (

//               <Box
//                 key={i}
//                 onClick={() => goToPage(i)}
//                 sx={{
//                   height: 8,
//                   width: activeDot === i ? 24 : 8,
//                   borderRadius: 10,
//                   background:
//                     activeDot === i
//                       ? "#c9860a"
//                       : "#ccc",
//                   cursor: "pointer"
//                 }}
//               />

//             ))}

//           </Box>

//         </Box>

//       </Container>

//     </Box>
//   );
// };

// export default MumbaiPrivateTour;
