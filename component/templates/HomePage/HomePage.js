"use client";
import { useRef } from "react";
import { Box } from "@mui/material";
import HeroSection from "../HeroSection/HeroSection";
import Stats from "../Stats/Stats";
import ToursSection from "../ToursSection/ToursSection";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import BookingSection from "../BookingSection/BookingSection";
import Testimonials from "../Testimonials/Testimonials";
import Footer from "../Footer/Footer";

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
      <WhyChooseUs />
      <BookingSection ref={bookingRef} />
      <Testimonials />
      <Footer />
    </Box>
  );
};

export default HomePage;