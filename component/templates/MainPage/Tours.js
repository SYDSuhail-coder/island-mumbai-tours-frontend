"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  AccessTime,
  DirectionsCar,
  Groups,
  CurrencyRupee,
  CheckCircle,
  LocationOn,
  Photo,
  Map,
  Lock,
  LocalOffer,
  Star,
  ChildCare,
} from "@mui/icons-material";

import { useEffect, useRef, useState, Fragment } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Sk = ({ w = "100%", h = 16, r = 8, mb = 0 }) => (
  <Box
    sx={{
      width: w,
      height: h,
      borderRadius: `${r}px`,
      background: "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s infinite",
      marginBottom: `${mb}px`,
    }}
  />
);

const CHILD_PRICE = 500;
const TOUR_STEPS = ["Tour", "Travellers", "Details"];

const Tours = ({ slug }) => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingResponse, setBookingResponse] = useState(null);
  const [step, setStep] = useState(0);

  const mapRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    guests: 1,
    children: 0,
    date: "",
    time: "",
  });

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/get-tour/${slug}`);
        const json = await res.json();
        if (!cancelled) setTour(json?.result?.data || null);
      } catch {
        if (!cancelled) toast.error("Something went wrong loading the tour.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Per-step validation for the booking wizard
  const validateStep = (s) => {
    if (s === 0) {
      if (!form.date) { toast.error("Please choose a date."); return false; }
      if (!form.time) { toast.error("Please choose a time."); return false; }
    }
    return true;
  };

  const handleNext = () => { if (validateStep(step)) setStep((s) => Math.min(2, s + 1)); };
  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const adultsTotal = tour ? tour.pricePerPerson * Number(form.guests) : 0;
  const childrenTotal = Number(form.children) * CHILD_PRICE;
  const total = adultsTotal + childrenTotal;

  const mapUrl = (loc) =>
    `https://maps.google.com/maps?q=${encodeURIComponent(loc)}&output=embed&z=14`;

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!form.name.trim()) { toast.error("Please enter your name."); return; }
    if (!form.email.trim()) { toast.error("Please enter your email."); return; }
    if (!form.mobile.trim()) { toast.error("Please enter your mobile number."); return; }
    if (!/^\d{10}$/.test(form.mobile)) { toast.error("Please enter a valid 10 digit mobile number."); return; }
    if (!form.date) { toast.error("Please choose a date."); return; }
    if (!form.time) { toast.error("Please choose a time."); return; }
    setSubmitting(true);
    try {
      const response = await fetch("/api/create-booking-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingType: tour.bookingType,
          tour: tour.title,
          slug,
          date: form.date,
          adults: Number(form.guests),
          children: Number(form.children),
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          time: form.time,
          duration: tour.duration,
          highlights: [tour.transport]
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setBookingResponse(data.result.data);
        setSubmitted(true);
        toast.success("Booking confirmed! We'll contact you on WhatsApp.");
      } else if (response.status === 409) {
        toast.error("You've already booked this tour for the selected date.");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch {
      toast.error("Server error, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inpSx = {
    "& .MuiOutlinedInput-root": {
      fontSize: 13,
      borderRadius: "10px",
      background: "#FAFAF9",
      alignItems: "center",
      "& fieldset": { borderColor: "#E4E4E7", borderWidth: "1.5px" },
      "&:hover fieldset": { borderColor: "#F0A500" },
      "&.Mui-focused fieldset": { borderColor: "#F0A500", borderWidth: "1.5px" },
      "&.Mui-focused": { background: "#fff" },
    },
    "& .MuiOutlinedInput-root.MuiInputBase-multiline": { alignItems: "stretch" },
    "& .MuiInputLabel-root": { fontSize: 13 },
    "& .MuiInputLabel-root.Mui-focused": { color: "#0D1B2A" },
    "& .MuiInputBase-input": { padding: "12px 14px", lineHeight: 1.45 },
    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      padding: "12px 14px !important",
      minHeight: "unset !important",
      lineHeight: 1.45,
    },
  };

  const cardSx = {
    background: "#fff",
    border: "1px solid #EBEBEB",
    borderRadius: "16px",
    boxShadow: "0 1px 4px rgba(0,0,0,.05)",
    overflow: "hidden",
  };

  const secLabelSx = {
    fontSize: 11,
    fontWeight: 700,
    color: "#9B9590",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    mb: 1.5,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", background: "#F5F4F0", p: { xs: "20px 14px", sm: "32px 20px" } }}>
        <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        <Box sx={{ maxWidth: 1160, mx: "auto" }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2}>
                <Sk h={40} r={10} mb={6} />
                <Sk w="55%" h={22} mb={12} />
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <Sk h={180} r={14} /><Sk h={180} r={14} />
                </Box>
                <Sk h={110} r={14} />
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }}>
                  {[...Array(6)].map((_, i) => <Sk key={i} h={80} r={12} />)}
                </Box>
                <Sk h={280} r={14} />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}><Sk h={640} r={18} /></Grid>
          </Grid>
        </Box>
      </Box>
    );
  }

  if (!tour) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
        <Box sx={{ background: "#F9F8F5", border: "1px solid #EBEBEB", borderRadius: "14px", p: "20px 28px", color: "#52525B", fontSize: 14, textAlign: "center" }}>
          Sorry, we couldn&apos;t find this tour.
        </Box>
      </Box>
    );
  }

  const details = [
    { icon: <AccessTime sx={{ fontSize: 16, color: "#6B7280" }} />, label: "Duration", val: tour.duration },
    { icon: <DirectionsCar sx={{ fontSize: 16, color: "#6B7280" }} />, label: "Transport", val: tour.transport },
    { icon: <Groups sx={{ fontSize: 16, color: "#6B7280" }} />, label: "Max Guests", val: `${tour.maxGuests} Guests` },
    { icon: <CurrencyRupee sx={{ fontSize: 16, color: "#6B7280" }} />, label: "Price/person", val: `₹${tour.pricePerPerson?.toLocaleString()}` },
    { icon: <CheckCircle sx={{ fontSize: 16, color: tour.freeCancellation ? "#2E9E5B" : "#6B7280" }} />, label: "Cancellation", val: tour.freeCancellation ? "Free" : "No", green: tour.freeCancellation },
    { icon: <LocationOn sx={{ fontSize: 16, color: "#6B7280" }} />, label: "Location", val: tour.location },
  ];

  const renderImages = () => {
    const imgs = tour.images;
    if (!imgs?.length) return null;

    if (imgs.length === 1) {
      return (
        <Box sx={{ borderRadius: "12px", overflow: "hidden", height: { xs: 200, sm: 280 } }}>
          <Box component="img" src={imgs[0]} alt="tour-0" sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .35s", "&:hover": { transform: "scale(1.04)" } }} />
        </Box>
      );
    }

    if (imgs.length === 2) {
      return (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {imgs.map((img, i) => (
            <Box key={i} sx={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3" }}>
              <Box component="img" src={img} alt={`tour-${i}`} sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .35s", "&:hover": { transform: "scale(1.04)" } }} />
            </Box>
          ))}
        </Box>
      );
    }

    if (imgs.length === 3) {
      return (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto", gap: "10px" }}>
          <Box sx={{ borderRadius: "12px", overflow: "hidden", gridRow: "1 / 3", aspectRatio: "3/4" }}>
            <Box component="img" src={imgs[0]} alt="tour-0" sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .35s", "&:hover": { transform: "scale(1.04)" } }} />
          </Box>
          {imgs.slice(1).map((img, i) => (
            <Box key={i} sx={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "16/9" }}>
              <Box component="img" src={img} alt={`tour-${i + 1}`} sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .35s", "&:hover": { transform: "scale(1.04)" } }} />
            </Box>
          ))}
        </Box>
      );
    }

    return (
      <Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", mb: "10px" }}>
          {imgs.slice(0, 2).map((img, i) => (
            <Box key={i} sx={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "16/10" }}>
              <Box component="img" src={img} alt={`tour-${i}`} sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .35s", "&:hover": { transform: "scale(1.04)" } }} />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(imgs.length - 2, 3)}, 1fr)`, gap: "10px" }}>
          {imgs.slice(2, 5).map((img, i) => (
            <Box key={i} sx={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "1/1", position: "relative" }}>
              <Box component="img" src={img} alt={`tour-${i + 2}`} sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .35s", "&:hover": { transform: "scale(1.04)" } }} />
              {i === 2 && imgs.length > 5 && (
                <Box sx={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px" }}>
                  <Typography sx={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>+{imgs.length - 5}</Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 4000,
            style: { background: "#0D1B2A", color: "white", fontSize: "14px", borderRadius: "10px" },
          },
          error: {
            duration: 4000,
            style: { background: "#d32f2f", color: "white", fontSize: "14px", borderRadius: "10px" },
          },
        }}
      />
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "#F5F4F0",
          fontFamily: "'Poppins', -apple-system, sans-serif",
          py: { xs: 2.5, sm: 4 },
          px: { xs: 1.5, sm: 2 },
          pt: { xs: 10, sm: 12 },
        }}
      >
        <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        <Box sx={{ maxWidth: 1160, mx: "auto" }}>

          {/* TITLE */}
          <Box sx={{ mb: 2.5 }}>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: 26, sm: 32, md: 38 }, fontWeight: 700, color: "#0D1B2A", lineHeight: 1.15, mb: "12px" }}>
              {tour.title}
            </Typography>
            <Box sx={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              {tour.badge && (
                <Box sx={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#FFF3E0", color: "#854F0B", fontSize: 11, fontWeight: 700, padding: "5px 13px", borderRadius: "20px", border: "1px solid #EF9F27" }}>
                  <LocalOffer sx={{ fontSize: 13 }} /> {tour.badge}
                </Box>
              )}
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: 13, fontWeight: 600, padding: "6px 14px", borderRadius: "20px", border: "1px solid #F0D893", background: "#FFFDE7", color: "#795548" }}>
                <Star sx={{ fontSize: 15 }} /> {tour.rating} · {tour.reviewsCount} Reviews
              </Box>
              <Box onClick={scrollToMap} sx={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: 13, fontWeight: 600, padding: "6px 14px", borderRadius: "20px", border: "1px solid rgba(13,27,42,0.15)", background: "rgba(13,27,42,0.05)", color: "#0D1B2A", cursor: "pointer", transition: "all .2s", "&:hover": { background: "rgba(13,27,42,0.09)", borderColor: "rgba(13,27,42,0.3)", transform: "translateY(-1px)" }, "&:active": { transform: "translateY(0px)" } }}>
                <LocationOn sx={{ fontSize: 15 }} /> {tour.location}
              </Box>
            </Box>
          </Box>

          <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: "flex-start" }}>

            {/* LEFT — Images + Details */}
            <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
              <Stack spacing={2}>
                {tour.images?.length > 0 && (
                  <Card sx={cardSx}>
                    <CardContent sx={{ p: "18px 20px !important" }}>
                      <Box sx={secLabelSx}><Photo sx={{ fontSize: 14 }} /> Tour Images</Box>
                      {renderImages()}
                    </CardContent>
                  </Card>
                )}

                <Card sx={cardSx}>
                  <CardContent sx={{ p: "18px 20px !important" }}>
                    <Box sx={secLabelSx}>About This Tour</Box>
                    <Typography sx={{ fontSize: 14, color: "#52525B", lineHeight: 1.85 }}>{tour.description}</Typography>
                  </CardContent>
                </Card>

                <Card sx={cardSx}>
                  <CardContent sx={{ p: "18px 20px !important" }}>
                    <Box sx={secLabelSx}>Tour Details</Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3,1fr)" }, gap: "10px" }}>
                      {details.map(({ icon, label, val, green }, i) => (
                        <Box key={i} sx={{ background: "#F9F8F5", border: "1px solid #EBEBEB", borderRadius: "12px", p: "14px 16px" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mb: "8px" }}>
                            {icon}
                            <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#9B9590", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</Typography>
                          </Box>
                          <Typography sx={{ fontSize: 14, fontWeight: 700, color: green ? "#2E9E5B" : "#18181B" }}>{val}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>

                <Card ref={mapRef} sx={{ ...cardSx, overflow: "hidden" }}>
                  <CardContent sx={{ p: "18px 20px !important" }}>
                    <Box sx={secLabelSx}><Map sx={{ fontSize: 14 }} /> Location Map</Box>
                  </CardContent>
                  <Box component="iframe" src={mapUrl(tour.location)} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" title="Tour location" sx={{ width: "100%", height: { xs: 220, sm: 280 }, border: "none", display: "block" }} />
                  <Box sx={{ fontSize: 12, color: "#A1A1AA", textAlign: "center", p: "10px 0 6px", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                    <LocationOn sx={{ fontSize: 14 }} /> {tour.location}
                  </Box>
                </Card>
              </Stack>
            </Grid>

            {/* RIGHT — Booking Form */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
              <Box sx={{ position: { md: "sticky" }, top: 84 }}>
                <Box sx={{ background: "#fff", border: "1px solid #E4E4E7", borderRadius: "20px", p: { xs: "18px 16px", sm: "24px 22px" }, boxShadow: "0 4px 24px rgba(0,0,0,.08)" }}>

                  {/* SUCCESS */}
                  {submitted && bookingResponse ? (
                    <Box sx={{ textAlign: "center", py: 1 }}>
                      <CheckCircle sx={{ fontSize: 58, color: "#2E9E5B" }} />
                      <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#18181B", mt: "14px", mb: "8px" }}>
                        Booking Confirmed! 🎉
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: "#71717A", lineHeight: 1.7, mb: "20px" }}>
                        {bookingResponse.name}, your booking is confirmed.
                        <br />
                        We&apos;ll contact you on <strong>{bookingResponse.mobile}</strong>.
                      </Typography>
                      <Box sx={{ background: "#F9F8F5", border: "1px solid #EBEBEB", borderRadius: "12px", p: "14px 16px", textAlign: "left", mb: "16px" }}>
                        {[
                          ["Booking ID", bookingResponse.bookingId],
                          ["Tour", bookingResponse.tour],
                          ["Date", bookingResponse.date?.split("T")[0]],
                          ["Time", bookingResponse.time],
                          ["Adults", bookingResponse.adults],
                          ["Children", bookingResponse.children],
                        ].map(([k, v]) => (
                          <Box key={k} sx={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#71717A", mb: "8px" }}>
                            <span>{k}</span>
                            <span style={{ color: "#18181B", fontWeight: 600 }}>{v}</span>
                          </Box>
                        ))}
                        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800, color: "#0D1B2A", pt: "10px", mt: "6px", borderTop: "1px solid #E4E4E7" }}>
                          <span>Total</span>
                          <span>₹{bookingResponse.totalAmount?.toLocaleString()}</span>
                        </Box>
                      </Box>
                      <Button
                        fullWidth
                        onClick={() => {
                          setSubmitted(false);
                          setBookingResponse(null);
                          setStep(0);
                          setForm({ name: "", email: "", mobile: "", guests: 1, children: 0, date: "", time: "" });
                        }}
                        sx={{ p: "11px", background: "#FDF8EF", color: "#0D1B2A", border: "1.5px solid rgba(240,165,0,0.45)", borderRadius: "12px", fontSize: 13, fontWeight: 700, textTransform: "none", "&:hover": { background: "#FAF1DD", borderColor: "#F0A500" } }}
                      >
                        Book Another Tour
                      </Button>
                    </Box>

                  ) : (

                    // FORM (multi-step wizard)
                    <Box>
                      {/* Price header — premium navy + gold band */}
                      <Box sx={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1B3A57 100%)", borderRadius: "16px", p: "16px 18px", mb: "18px" }}>
                        <Box sx={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                          <Typography sx={{ fontSize: 34, fontWeight: 900, color: "#F0A500", letterSpacing: "-1px", lineHeight: 1 }}>
                            ₹{tour.pricePerPerson?.toLocaleString()}
                          </Typography>
                          <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>/ adult</Typography>
                        </Box>
                        <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.55)", mt: "5px" }}>
                          + ₹{CHILD_PRICE.toLocaleString()} per child (below 12)
                        </Typography>
                      </Box>

                      {/* Stepper */}
                      <Box sx={{ display: "flex", alignItems: "flex-start", mb: "18px" }}>
                        {TOUR_STEPS.map((label, i) => {
                          const done = i < step;
                          const active = i === step;
                          return (
                            <Fragment key={label}>
                              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", flexShrink: 0 }}>
                                <Box sx={{
                                  width: 32, height: 32, borderRadius: "50%",
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  fontWeight: 700, fontSize: 13,
                                  background: done || active ? "linear-gradient(135deg, #0D1B2A 0%, #1B3A57 100%)" : "#F1EEE6",
                                  color: done || active ? "#fff" : "#A9B0B8",
                                  border: active ? "3px solid rgba(240,165,0,0.35)" : "3px solid transparent",
                                  transition: "all .25s",
                                }}>
                                  {done ? "✓" : i + 1}
                                </Box>
                                <Typography sx={{ fontSize: 10.5, fontWeight: active ? 700 : 500, color: active ? "#0D1B2A" : done ? "#52525B" : "#A9B0B8" }}>
                                  {label}
                                </Typography>
                              </Box>
                              {i < TOUR_STEPS.length - 1 && (
                                <Box sx={{ flex: 1, height: 3, borderRadius: 2, mt: "15px", mx: "4px", background: i < step ? "#F0A500" : "#EAE6DC", transition: "background .3s" }} />
                              )}
                            </Fragment>
                          );
                        })}
                      </Box>

                      {/* Step content (fade on change) */}
                      <Box key={step} sx={{ animation: "stepIn .3s ease", "@keyframes stepIn": { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "none" } } }}>

                        {/* STEP 0 — Tour */}
                        {step === 0 && (
                          <Stack spacing={1.2}>
                            <TextField
                              label="Tour Name"
                              value={tour.title}
                              fullWidth
                              slotProps={{ input: { readOnly: true } }}
                              sx={{ ...inpSx, "& .MuiInputBase-input": { cursor: "default", color: "#18181B", fontWeight: 600 }, "& .MuiOutlinedInput-root": { background: "#FDF8EF" } }}
                            />
                            <TextField
                              type="date" name="date" value={form.date} onChange={handleChange}
                              fullWidth required label="Tour Date"
                              slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: new Date().toISOString().split("T")[0] } }}
                              sx={inpSx}
                            />
                            <TextField
                              type="time" label="Tour Time" name="time" value={form.time}
                              onChange={handleChange} fullWidth required
                              slotProps={{ inputLabel: { shrink: true } }}
                              sx={inpSx}
                            />
                          </Stack>
                        )}

                        {/* STEP 1 — Travellers */}
                        {step === 1 && (
                          <Stack spacing={1.2}>
                            <TextField
                              select label="Adults" name="guests" value={form.guests}
                              onChange={(e) => setForm((p) => ({ ...p, guests: e.target.value }))}
                              fullWidth required sx={inpSx}
                              slotProps={{ input: { startAdornment: <InputAdornment position="start"><Groups sx={{ fontSize: 18, color: "#9B9590" }} /></InputAdornment> } }}
                            >
                              {Array.from({ length: tour.maxGuests }, (_, i) => i + 1).map((n) => (
                                <MenuItem key={n} value={n}>{n} {n === 1 ? "Adult" : "Adults"}</MenuItem>
                              ))}
                            </TextField>

                            <TextField
                              select label="Children" name="children"
                              value={form.children}
                              onChange={(e) => setForm((p) => ({ ...p, children: e.target.value }))}
                              fullWidth sx={inpSx}
                              slotProps={{ input: { startAdornment: <InputAdornment position="start"><ChildCare sx={{ fontSize: 18, color: "#9B9590" }} /></InputAdornment> } }}
                            >
                              {[0, 1, 2, 3, 4, 5].map((n) => (
                                <MenuItem key={n} value={n}>{n === 0 ? "No Children" : `${n} ${n === 1 ? "Child" : "Children"}`}</MenuItem>
                              ))}
                            </TextField>
                            <Typography sx={{ fontSize: 11, color: "#9B9590" }}>
                              Children below 12 · ₹{CHILD_PRICE.toLocaleString()} per child
                            </Typography>
                          </Stack>
                        )}

                        {/* STEP 2 — Details */}
                        {step === 2 && (
                          <Stack spacing={1.2}>
                            <TextField label="Full Name" name="name" value={form.name} onChange={handleChange} fullWidth required sx={inpSx} />
                            <TextField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} fullWidth required sx={inpSx} />
                            <TextField label="Mobile Number (+91...)" name="mobile" value={form.mobile} onChange={handleChange} fullWidth required sx={inpSx} />

                            {/* Price Summary */}
                            <Box sx={{ background: "#F9F8F5", border: "1px solid #EBEBEB", borderRadius: "12px", p: "14px 16px", mt: "4px" }}>
                              <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#71717A", mb: "6px" }}>
                                <span>₹{tour.pricePerPerson?.toLocaleString()} × {form.guests} {Number(form.guests) === 1 ? "adult" : "adults"}</span>
                                <span>₹{adultsTotal.toLocaleString()}</span>
                              </Box>
                              {Number(form.children) > 0 && (
                                <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#71717A", mb: "6px" }}>
                                  <span>₹{CHILD_PRICE} × {form.children} {Number(form.children) === 1 ? "child" : "children"}</span>
                                  <span>₹{childrenTotal.toLocaleString()}</span>
                                </Box>
                              )}
                              {tour.freeCancellation && (
                                <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#2E9E5B", mb: "6px" }}>
                                  <span>✓ Free cancellation</span><span>Included</span>
                                </Box>
                              )}
                              <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800, color: "#0D1B2A", pt: "10px", mt: "6px", borderTop: "1px solid #E4E4E7" }}>
                                <span style={{ color: "#18181B" }}>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                              </Box>
                            </Box>
                          </Stack>
                        )}
                      </Box>

                      {/* Nav buttons */}
                      <Box sx={{ display: "flex", gap: "10px", mt: "16px" }}>
                        {step > 0 && (
                          <Button
                            onClick={handleBack}
                            sx={{ px: "18px", py: "13px", flexShrink: 0, background: "#FDF8EF", color: "#0D1B2A", border: "1.5px solid rgba(240,165,0,0.45)", borderRadius: "12px", fontSize: 13, fontWeight: 700, textTransform: "none", "&:hover": { background: "#FAF1DD", borderColor: "#F0A500" } }}
                          >
                            ← Back
                          </Button>
                        )}
                        <Button
                          fullWidth disabled={submitting}
                          onClick={step < 2 ? handleNext : handleSubmit}
                          sx={{
                            p: "14px",
                            background: "linear-gradient(135deg, #F0A500 0%, #E09600 100%)",
                            color: "#0D1B2A", borderRadius: "12px", fontSize: 14, fontWeight: 700,
                            textTransform: "none", letterSpacing: "0.02em",
                            boxShadow: "0 4px 14px rgba(240,165,0,0.40)",
                            opacity: submitting ? 0.7 : 1, transition: "all .2s",
                            "&:hover": { opacity: submitting ? 0.7 : 0.9 },
                            "&.Mui-disabled": { background: "linear-gradient(135deg, #F0A500 0%, #E09600 100%)", color: "#0D1B2A", opacity: 0.6 },
                          }}
                        >
                          {step < 2 ? "Next →" : (submitting ? "Processing..." : `Confirm ₹${total.toLocaleString()} →`)}
                        </Button>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", fontSize: 11, color: "#9B9590", mt: "12px" }}>
                        <Lock sx={{ fontSize: 13 }} /> Secure & encrypted booking
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Tours;