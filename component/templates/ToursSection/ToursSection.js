"use client";
import TourCarousel from "../TourCarousel/TourCarousel";

const ToursSection = () => (
  <TourCarousel
    eyebrow="POPULAR TOURS"
    title="Popular Island Tours"
    apiUrl="/api/get-toures-section"
  />
);

export default ToursSection;
