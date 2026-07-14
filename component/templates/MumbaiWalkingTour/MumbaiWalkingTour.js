"use client";
import TourCarousel from "../TourCarousel/TourCarousel";

const MumbaiWalkingTour = () => (
  <TourCarousel
    eyebrow="ON FOOT"
    title="Mumbai Walking Tour"
    apiUrl="/api/get-walking-tours"
  />
);

export default MumbaiWalkingTour;
