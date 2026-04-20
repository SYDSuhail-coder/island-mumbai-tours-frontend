"use client";
import { useRef } from "react";
import { Box } from "@mui/material";
import HeroSection from "../HeroSection/HeroSection";
import Stats from "../Stats/Stats";
import ToursSection from "../ToursSection/ToursSection";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import Testimonials from "../Testimonials/Testimonials";
import Footer from "../Footer/Footer";
import MumbaiWalkingTour from "../MumbaiWalkingTour/MumbaiWalkingTour";
import MumbaiPrivateTour from "../MumbaiPrivateTour/MumbaiPrivateTour";

const HomePage = () => {
  const bookingRef = useRef(null);

  const handleSelectTour = (tourName) => {
    bookingRef.current?.setTour(tourName);
    document.getElementById("book-now")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ background: "#fdf6ec", minHeight: "100vh" }}>
      <HeroSection />
      <Stats />
      <ToursSection onSelectTour={handleSelectTour} />
      <MumbaiWalkingTour/>
      <MumbaiPrivateTour/>
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </Box>
  );
};

export default HomePage;