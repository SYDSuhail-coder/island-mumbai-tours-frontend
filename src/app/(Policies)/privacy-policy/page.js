"use client";
import PolicyPage from "@/component/templates/PolicyPage/PolicyPage";

const sections = [
  {
    heading: "Introduction",
    paragraphs: [
      "Mumbai Island Tours (“we”, “us”, “our”) respects your privacy. This Privacy Policy explains what information we collect when you use our website or book a tour, how we use it, and the choices you have.",
    ],
  },
  {
    heading: "Information We Collect",
    paragraphs: [
      "We only collect the information needed to process your booking and provide support:",
    ],
    bullets: [
      "Your name, mobile number, and email address.",
      "Booking details such as the tour, date, time, number of travellers, and selected highlights.",
      "Communication you send us via WhatsApp, call, or email.",
    ],
  },
  {
    heading: "How We Use Your Information",
    paragraphs: [
      "Your information is used strictly to serve you better:",
    ],
    bullets: [
      "To confirm, manage, and deliver your tour booking.",
      "To send booking confirmations and updates, primarily over WhatsApp.",
      "To respond to your enquiries and provide customer support.",
      "To improve our tours and website experience.",
    ],
  },
  {
    heading: "WhatsApp & Communication",
    paragraphs: [
      "When you book with us, you agree to receive booking-related messages (such as confirmations and reminders) on the mobile number you provide, primarily through WhatsApp. You can ask us to stop non-essential messages at any time.",
    ],
  },
  {
    heading: "Data Sharing",
    paragraphs: [
      "We do not sell or rent your personal information. We may share limited details with trusted tour operators and boat partners only where necessary to deliver the tour you booked, and with payment providers to process your transaction.",
    ],
  },
  {
    heading: "Data Security",
    paragraphs: [
      "We take reasonable technical and organisational measures to protect your information against unauthorised access, loss, or misuse. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Your Rights",
    paragraphs: [
      "You may request access to, correction of, or deletion of the personal information we hold about you. To make such a request, contact us using the details below and we will respond within a reasonable time.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "Our website may use basic cookies and similar technologies to keep the site working smoothly and to understand how it is used. You can control cookies through your browser settings.",
    ],
  },
  {
    heading: "Contact Us",
    paragraphs: [
      "If you have any questions about this Privacy Policy or how your data is handled, contact us on WhatsApp at +91 70545 30763 or email hello@mumbaiislandtours.in.",
    ],
  },
];

export default function Page() {
  return (
    <PolicyPage
      title="Privacy Policy"
      updated="Last updated: July 2026"
      intro="This policy describes how Mumbai Island Tours collects, uses, and protects your personal information when you use our services."
      sections={sections}
    />
  );
}
