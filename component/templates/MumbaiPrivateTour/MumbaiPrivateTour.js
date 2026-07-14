"use client";
import TourCarousel from "../TourCarousel/TourCarousel";

const MumbaiPrivateTour = () => (
  <TourCarousel
    eyebrow="PRIVATE & PREMIUM"
    title="Mumbai Private Tour"
    apiUrl="/api/get-private-tours"
  />
);

export default MumbaiPrivateTour;
