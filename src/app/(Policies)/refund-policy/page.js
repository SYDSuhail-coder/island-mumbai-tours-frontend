"use client";
import PolicyPage from "@/component/templates/PolicyPage/PolicyPage";

const sections = [
  {
    heading: "Overview",
    paragraphs: [
      "At Mumbai Island Tours, we want your booking experience to be worry-free. This Refund & Cancellation Policy explains when you are eligible for a refund and how cancellations are handled for all tours booked through our website or WhatsApp.",
    ],
  },
  {
    heading: "Free Cancellation",
    paragraphs: [
      "Most of our tours come with free cancellation, so you can plan with confidence.",
    ],
    bullets: [
      "Cancel up to 24 hours before your tour start time for a 100% refund.",
      "No cancellation charges apply within the free-cancellation window.",
      "The free-cancellation window is shown on each tour at the time of booking.",
    ],
  },
  {
    heading: "Cancellation Charges",
    paragraphs: [
      "If you cancel after the free-cancellation window, the following charges apply:",
    ],
    bullets: [
      "Cancellation between 24 and 12 hours before the tour: 50% of the tour amount is refunded.",
      "Cancellation within 12 hours of the tour: no refund is available.",
      "No-shows (not arriving for your tour) are non-refundable.",
    ],
  },
  {
    heading: "Weather & Operator Cancellations",
    paragraphs: [
      "Boat and ferry tours depend on sea and weather conditions. If a tour is cancelled by us due to bad weather, safety concerns, or operational reasons, you will receive a full refund or the option to reschedule to another available date at no extra cost.",
    ],
  },
  {
    heading: "How to Cancel",
    paragraphs: [
      "To cancel or reschedule a booking, contact us on WhatsApp at +91 70545 30763 or email hello@mumbaiislandtours.in with your Booking ID. Please include the name and date used for the booking so we can locate it quickly.",
    ],
  },
  {
    heading: "Refund Timeline",
    paragraphs: [
      "Approved refunds are processed back to your original payment method within 5–7 business days. Depending on your bank, it may take a few additional days for the amount to reflect in your account.",
    ],
  },
  {
    heading: "Contact Us",
    paragraphs: [
      "For any questions about cancellations or refunds, reach us on WhatsApp at +91 70545 30763 or email hello@mumbaiislandtours.in. Our support team is available Mon–Sat, 9:00 AM – 6:00 PM, with WhatsApp support 24/7.",
    ],
  },
];

export default function Page() {
  return (
    <PolicyPage
      title="Refund & Cancellation Policy"
      updated="Last updated: July 2026"
      intro="Please read this policy carefully before booking. By making a booking with Mumbai Island Tours, you agree to the terms described below."
      sections={sections}
    />
  );
}
