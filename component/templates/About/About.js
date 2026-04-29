"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Container, Chip, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import StarIcon from "@mui/icons-material/Star";
import GroupsIcon from "@mui/icons-material/Groups";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

// ── Fade-in on scroll hook
const useFadeIn = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const FadeBox = ({ children, delay = 0, sx = {} }) => {
  const [ref, visible] = useFadeIn();
  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

// ── Pill label
const SectionLabel = ({ children }) => (
  <Typography sx={{
    display: "inline-block",
    border: "1px solid rgba(212,168,71,0.4)",
    backgroundColor: "rgba(212,168,71,0.09)",
    color: "#D4A847",
    px: 2, py: 0.5,
    borderRadius: "20px",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: 2.5,
    mb: 1.5,
    textTransform: "uppercase",
  }}>
    {children}
  </Typography>
);

// ── Section heading block (reusable)
const SectionHeading = ({ label, title, highlight, subtitle, dark = false }) => (
  <Box sx={{ textAlign: "center", mb: 6 }}>
    <SectionLabel>{label}</SectionLabel>
    <Typography sx={{
      fontFamily: "'Playfair Display', serif",
      fontSize: { xs: 28, md: 40 },
      fontWeight: 700,
      color: dark ? "#fff" : "#0d1b2a",
      lineHeight: 1.2,
      mb: 1,
    }}>
      {title}{" "}
      <Box component="span" sx={{ color: "#D4A847" }}>{highlight}</Box>
    </Typography>
    {subtitle && (
      <Typography sx={{
        color: dark ? "rgba(232,237,242,0.45)" : "#718096",
        fontSize: 14,
        maxWidth: 460,
        mx: "auto",
        lineHeight: 1.7,
      }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

// ── Data
const features = [
  { emoji: "🧭", title: "Local Experts",    desc: "Born-and-bred Mumbaikars who know every creek, jetty, and island story." },
  { emoji: "🛟", title: "Safe Tours",       desc: "All trips are coast-guard certified and completely safe for families." },
  { emoji: "💰", title: "Affordable Price", desc: "Transparent, fair pricing — no hidden charges, ever." },
  { emoji: "📞", title: "24/7 Support",     desc: "WhatsApp us anytime — we're always just a message away." },
];

const team = [
  { name: "Demo 1", role: "Founder & Head Guide",      exp: "12 yrs experience", emoji: "⛵", bg: "linear-gradient(135deg,#0d1b2a,#1a3a5c)" },
  { name: "Demo 2", role: "Tour Operations Manager",   exp: "8 yrs experience",  emoji: "🗺️", bg: "linear-gradient(135deg,#1a2a1a,#2a4a2a)" },
  { name: "Demo 3", role: "Marine Safety Officer",     exp: "10 yrs experience", emoji: "🛟", bg: "linear-gradient(135deg,#2a1a0a,#4a3010)" },
];

const tours = [
  { title: "Elephanta Island",     desc: "UNESCO World Heritage caves with ancient rock-cut sculptures of Lord Shiva dating back to the 5th–8th century. A 1-hour ferry from Gateway of India — a must for history lovers.",  duration: "4–5 hrs",   icon: "🏛️", tag: "Heritage",   tagColor: "#D4A847" },
  { title: "Alibaug Beach Tour",   desc: "Pristine golden beaches, the iconic Kolaba Fort in the sea, fresh coastal seafood — a perfect escape from Mumbai's chaos. Best visited Oct–March.",                               duration: "Full Day",  icon: "🏖️", tag: "Beach",      tagColor: "#378ADD" },
  { title: "Mandwa Ferry Ride",    desc: "A scenic 45-minute catamaran across the Arabian Sea with breathtaking views of Mumbai's skyline. Gateway to the Konkan coast.",                                                   duration: "45 min",    icon: "⛴️", tag: "Scenic",     tagColor: "#1D9E75" },
  { title: "Kihim & Revdanda",     desc: "Hidden gem beaches with Portuguese forts, dense mangroves, migratory birds, and peaceful village life far from city crowds.",                                                     duration: "Full Day",  icon: "🌿", tag: "Hidden Gem", tagColor: "#9B59B6" },
  { title: "Gateway of India",     desc: "The iconic 26-metre basalt arch built in 1924. Heart of Mumbai's waterfront — all our island tours depart from this historic jetty on Apollo Bunder.",                           duration: "30–45 min", icon: "🏯", tag: "Landmark",   tagColor: "#E74C3C" },
  { title: "Murud-Janjira Fort",   desc: "One of India's strongest sea forts — never conquered by Marathas, Mughals, or British. A thrilling 2-hour boat ride through coastal villages and open sea.",                    duration: "Full Day",  icon: "⚓", tag: "Fort",       tagColor: "#C0392B" },
  { title: "Versova & Madh Island",desc: "Mumbai's best-kept secret — pristine Madh Island beach, charming Versova fishing village, and stunning sunset views over the creek.",                                            duration: "Half Day",  icon: "🌅", tag: "Sunset",     tagColor: "#E67E22" },
  { title: "Marve to Manori Creek",desc: "A magical hand-pulled rope ferry across Manori Creek leads to coconut groves, Portuguese-era churches, and Mumbai's most untouched beaches.",                                    duration: "2–3 hrs",   icon: "🛶", tag: "Off-beat",   tagColor: "#16A085" },
];

const stats = [
  { value: "5000+", label: "Happy Tourists",      icon: <GroupsIcon sx={{ fontSize: 26, color: "#D4A847" }} /> },
  { value: "12+",   label: "Island Destinations", icon: <DirectionsBoatIcon sx={{ fontSize: 26, color: "#D4A847" }} /> },
  { value: "4.9★",  label: "Average Rating",      icon: <StarIcon sx={{ fontSize: 26, color: "#D4A847" }} /> },
  { value: "6yr",   label: "Of Experience",       icon: <EmojiNatureIcon sx={{ fontSize: 26, color: "#D4A847" }} /> },
];

// ════════════════════════════════════════
const About = () => {
  return (
    <>
      <Navbar />

      {/* ══════════ HERO ══════════ */}
      <Box sx={{
        background: "linear-gradient(160deg, #0b1520 60%, #0f2035 100%)",
        pt: { xs: 14, md: 16 }, pb: { xs: 10, md: 14 },
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative glows */}
        <Box sx={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", top: -220, right: -160, background: "radial-gradient(circle,rgba(212,168,71,0.07) 0%,transparent 65%)", pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", bottom: -120, left: -100, background: "radial-gradient(circle,rgba(26,58,92,0.45) 0%,transparent 70%)", pointerEvents: "none" }} />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <FadeBox>
            <SectionLabel>Est. 2018 · Mumbai</SectionLabel>
          </FadeBox>

          <FadeBox delay={0.1}>
            <Typography sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: 36, md: 56 }, fontWeight: 800,
              color: "#fff", lineHeight: 1.12, mb: 2.5,
            }}>
              Our Story of{" "}
              <Box component="span" sx={{ color: "#D4A847" }}>Island Adventures</Box>
            </Typography>
          </FadeBox>

          <FadeBox delay={0.2}>
            <Typography sx={{
              fontSize: { xs: 14, md: 16 },
              color: "rgba(232,237,242,0.5)",
              maxWidth: 520, mx: "auto", lineHeight: 1.9,
            }}>
              Born from a love of Mumbai's hidden coastline, we've been connecting curious travellers
              with the magic of the Arabian Sea since 2018. Every tour is a story waiting to be lived.
            </Typography>
          </FadeBox>

          {/* Stats strip */}
          <FadeBox delay={0.32}>
            <Box sx={{
              display: "flex", gap: { xs: 3, md: 6 },
              justifyContent: "center", flexWrap: "wrap",
              mt: 7, pt: 5,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}>
              {stats.map((s, i) => (
                <Box key={i} sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800, color: "#D4A847", lineHeight: 1 }}>
                    {s.value}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: "rgba(232,237,242,0.38)", letterSpacing: 1.5, textTransform: "uppercase", mt: 0.5 }}>
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </FadeBox>
        </Container>
      </Box>

      {/* ══════════ TEAM ══════════ */}
      <Box sx={{ background: "#fdf6ec", py: { xs: 8, md: 11 } }}>
        <Container maxWidth="lg">
          <FadeBox>
            <SectionHeading
              label="Our People"
              title="Meet the"
              highlight="Team"
              subtitle="The passionate people behind every unforgettable journey"
            />
          </FadeBox>

          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {team.map((member, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <FadeBox delay={i * 0.12}>
                  <Box sx={{
                    background: "#fff",
                    border: "1px solid rgba(212,168,71,0.15)",
                    borderRadius: "20px", p: 4, textAlign: "center",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                    transition: "transform 0.25s, box-shadow 0.25s",
                    "&:hover": { transform: "translateY(-6px)", boxShadow: "0 16px 48px rgba(0,0,0,0.09)" },
                  }}>
                    <Box sx={{
                      width: 80, height: 80, borderRadius: "50%", background: member.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 34, mx: "auto", mb: 2.5,
                      border: "2px solid rgba(212,168,71,0.3)",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
                    }}>
                      {member.emoji}
                    </Box>
                    <Typography sx={{ fontSize: 17, fontWeight: 700, color: "#0d1b2a", mb: 0.4 }}>
                      {member.name}
                    </Typography>
                    {member.role && (
                      <Typography sx={{ fontSize: 13, color: "#D4A847", fontWeight: 600, mb: 1 }}>
                        {member.role}
                      </Typography>
                    )}
                    <Typography sx={{
                      fontSize: 11, color: "#a0aec0",
                      display: "inline-block",
                      background: "rgba(212,168,71,0.08)",
                      border: "1px solid rgba(212,168,71,0.18)",
                      borderRadius: "12px", px: 1.5, py: 0.5,
                      letterSpacing: 0.5,
                    }}>
                      {member.exp}
                    </Typography>
                  </Box>
                </FadeBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <Box sx={{ background: "#fdf6ec", pb: { xs: 8, md: 11 } }}>
        <Container maxWidth="lg">
          {/* Top divider */}
          <Divider sx={{ borderColor: "rgba(212,168,71,0.15)", mb: 8 }} />

          <FadeBox>
            <SectionHeading
              label="Why Us"
              title="Why Choose"
              highlight="Mumbai Island Tours"
              subtitle="Trusted by 5,000+ travellers — here's what sets us apart"
            />
          </FadeBox>

          <Grid container spacing={3}>
            {features.map((item, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <FadeBox delay={i * 0.1}>
                  <Box sx={{
                    p: 3.5, textAlign: "center", height: "100%",
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.07)",
                    borderRadius: "18px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
                      borderColor: "rgba(212,168,71,0.25)",
                    },
                  }}>
                    <Box sx={{
                      fontSize: 28, mb: 2,
                      width: 58, height: 58,
                      background: "rgba(212,168,71,0.1)",
                      border: "1px solid rgba(212,168,71,0.25)",
                      borderRadius: "14px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      mx: "auto",
                    }}>
                      {item.emoji}
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#0d1b2a", mb: 0.8 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "#6b7280", lineHeight: 1.8 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </FadeBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══════════ TOURS ══════════ */}
      <Box sx={{ background: "#fdf6ec", pb: { xs: 8, md: 11 } }}>
        <Container maxWidth="lg">
          <Divider sx={{ borderColor: "rgba(212,168,71,0.15)", mb: 8 }} />

          <FadeBox>
            <SectionHeading
              label="Explore"
              title="Mumbai's"
              highlight="Famous Destinations"
              subtitle="Iconic landmarks, hidden beaches, and ancient forts — all just a ferry ride away"
            />
          </FadeBox>

          <Grid container spacing={3}>
            {tours.map((tour, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <FadeBox delay={(i % 4) * 0.08}>
                  <Box sx={{
                    background: "#fff",
                    border: "1px solid rgba(212,168,71,0.1)",
                    borderRadius: "18px", p: 3, height: "100%",
                    boxShadow: "0 2px 14px rgba(0,0,0,0.04)",
                    transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 14px 40px rgba(0,0,0,0.08)",
                      borderColor: "rgba(212,168,71,0.28)",
                    },
                  }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                      <Box sx={{
                        fontSize: 24, lineHeight: 1,
                        width: 50, height: 50,
                        background: `${tour.tagColor}12`,
                        border: `1px solid ${tour.tagColor}28`,
                        borderRadius: "13px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        {tour.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.6, flexWrap: "wrap" }}>
                          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#0d1b2a" }}>
                            {tour.title}
                          </Typography>
                          <Chip label={tour.tag} size="small" sx={{
                            height: 19, fontSize: 10, fontWeight: 600,
                            color: tour.tagColor,
                            background: `${tour.tagColor}13`,
                            border: `1px solid ${tour.tagColor}38`,
                            borderRadius: "6px",
                          }} />
                        </Box>
                        <Typography sx={{ fontSize: 11, color: "#a0aec0", mb: 0.8, letterSpacing: 0.3 }}>
                          ⏱ {tour.duration}
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: "#6b7280", lineHeight: 1.8 }}>
                          {tour.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </FadeBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/*CTA */}
      <Box sx={{
        background: "#fdf6ec",
        pb: { xs: 10, md: 14 },
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <Divider sx={{ borderColor: "rgba(212,168,71,0.15)", mb: 10 }} />

        {/* Soft glow */}
        <Box sx={{
          position: "absolute", width: 480, height: 480, borderRadius: "50%",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle,rgba(212,168,71,0.1) 0%,transparent 70%)",
          pointerEvents: "none",
        }} />

        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          <FadeBox>
            <SectionLabel>Ready to Go?</SectionLabel>

            <Typography sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: 32, md: 44 }, fontWeight: 800,
              color: "#0d1b2a", lineHeight: 1.18, mb: 2,
            }}>
              Ready to Explore{" "}
              <Box component="span" sx={{ color: "#D4A847" }}>Mumbai Islands?</Box>
            </Typography>

            <Typography sx={{
              color: "#6b7280",
              fontSize: { xs: 14, md: 15 },
              mb: 5, lineHeight: 1.8, maxWidth: 380, mx: "auto",
            }}>
              Book your unforgettable journey today — seats fill up fast on weekends!
            </Typography>

            <Box
              component="a"
              href="/bookingSection"
              sx={{
                display: "inline-block",
                background: "linear-gradient(135deg, #D4A847 0%, #c9860a 100%)",
                color: "#0d1b2a",
                fontWeight: 700, fontSize: 15,
                px: 6, py: 1.9,
                borderRadius: "50px",
                textDecoration: "none",
                boxShadow: "0 8px 28px rgba(212,168,71,0.28)",
                transition: "all 0.25s ease",
                letterSpacing: 0.5,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 14px 40px rgba(212,168,71,0.42)",
                },
              }}
            >
              Book Now →
            </Box>

            <Typography sx={{ fontSize: 12, color: "#9ca3af", mt: 2.5 }}>
              No advance payment required · Free cancellation 24hrs before
            </Typography>
          </FadeBox>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default About;