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
  CreditCard,
  PhoneAndroid,
  AccountBalance,
  Lock,
  LocalOffer,
  Star,
  ChildCare,
} from "@mui/icons-material";

import { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

// Shimmer Skeleton 
const Sk = ({ w = "100%", h = 16, r = 8, mb = 0 }) => (
  <Box
    sx={{
      width: w,
      height: h,
      borderRadius: `${r}px`,
      background:
        "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s infinite",
      marginBottom: `${mb}px`,
    }}
  />
);

const CHILD_PRICE = 500;

const Tours = ({ slug }) => {
  const [tour, setTour] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Map section ka ref
  const mapRef = useRef(null);

  const [form, setForm] = useState({
    tourTitle: "",
    tourId: "",
    name: "",
    email: "",
    phone: "",
    guests: 1,
    children: 0,
    date: "",
    time: "",
    specialRequest: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState("");
  const [bank, setBank] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/get-tour/${slug}`);
        const json = await res.json();
        if (!cancelled) setTour(json?.result?.data || null);
      } catch {
        if (!cancelled) setError("Tour load karne mein dikkat hui.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!tour) return;
    setForm((prev) => ({
      ...prev,
      tourTitle: tour.title || "",
      tourId: tour._id || tour.id || slug || "",
    }));
  }, [tour, slug]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const formatCard = (v) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v) => {
    const c = v.replace(/\D/g, "").slice(0, 4);
    return c.length >= 3 ? `${c.slice(0, 2)}/${c.slice(2)}` : c;
  };

  const adultsTotal = tour ? tour.pricePerPerson * Number(form.guests) : 0;
  const childrenTotal = Number(form.children) * CHILD_PRICE;
  const total = adultsTotal + childrenTotal;

  const mapUrl = (loc) =>
    `https://maps.google.com/maps?q=${encodeURIComponent(loc)}&output=embed&z=14`;

  // ✅ Location chip click hone par map tak smooth scroll
  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const bookingPayload = {
      tourTitle: tour?.title || form.tourTitle,
      tourId: tour?._id || tour?.id || form.tourId || slug,
      slug,
      name: form.name,
      email: form.email,
      phone: form.phone,
      guests: Number(form.guests),
      children: Number(form.children),
      date: form.date,
      time: form.time,
      specialRequest: form.specialRequest,
      total,
      paymentMethod,
      ...(paymentMethod === "card" && { cardLast4: card.number.slice(-4) }),
      ...(paymentMethod === "upi" && { upi }),
      ...(paymentMethod === "netbanking" && { bank }),
    };

    try {
      await new Promise((r) => setTimeout(r, 1500));
      setSubmitted(true);
    } catch {
      setError("Booking submit karne mein dikkat hui.");
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
      "&:hover fieldset": { borderColor: "#1D9E75" },
      "&.Mui-focused fieldset": { borderColor: "#1D9E75", borderWidth: "1.5px" },
      "&.Mui-focused": { background: "#fff" },
    },
    "& .MuiOutlinedInput-root.MuiInputBase-multiline": {
      alignItems: "stretch",
    },
    "& .MuiInputLabel-root": { fontSize: 13 },
    "& .MuiInputLabel-root.Mui-focused": { color: "#1D9E75" },
    "& .MuiInputBase-input": {
      padding: "12px 14px",
      lineHeight: 1.45,
    },
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
      <>
        <Box sx={{ minHeight: "100vh", background: "#F5F4F0", p: { xs: "20px 14px", sm: "32px 20px" } }}>
          <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
          <Box sx={{ maxWidth: 1160, mx: "auto" }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Stack spacing={2}>
                  <Sk h={40} r={10} mb={6} />
                  <Sk w="55%" h={22} mb={12} />
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <Sk h={180} r={14} />
                    <Sk h={180} r={14} />
                  </Box>
                  <Sk h={110} r={14} />
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }}>
                    {[...Array(6)].map((_, i) => (
                      <Sk key={i} h={80} r={12} />
                    ))}
                  </Box>
                  <Sk h={280} r={14} />
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Sk h={640} r={18} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
        <Box sx={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "14px", p: "20px 28px", color: "#991B1B", fontSize: 14 }}>
          ⚠️ {error}
        </Box>
      </Box>
    );
  }

  if (!tour) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
        <Box sx={{ background: "#F9F8F5", border: "1px solid #EBEBEB", borderRadius: "14px", p: "20px 28px", color: "#52525B", fontSize: 14, textAlign: "center" }}>
          Is slug ke liye tour nahi mila.
        </Box>
      </Box>
    );
  }

  const details = [
    { icon: <AccessTime sx={{ fontSize: 16, color: "#6B7280" }} />, label: "Duration", val: tour.duration },
    { icon: <DirectionsCar sx={{ fontSize: 16, color: "#6B7280" }} />, label: "Transport", val: tour.transport },
    { icon: <Groups sx={{ fontSize: 16, color: "#6B7280" }} />, label: "Max Guests", val: `${tour.maxGuests} Guests` },
    { icon: <CurrencyRupee sx={{ fontSize: 16, color: "#6B7280" }} />, label: "Price/person", val: `₹${tour.pricePerPerson?.toLocaleString()}` },
    { icon: <CheckCircle sx={{ fontSize: 16, color: tour.freeCancellation ? "#1D9E75" : "#6B7280" }} />, label: "Cancellation", val: tour.freeCancellation ? "Free" : "No", green: tour.freeCancellation },
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
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "#F5F4F0",
          fontFamily: "'Inter', -apple-system, sans-serif",
          py: { xs: 2.5, sm: 4 },
          px: { xs: 1.5, sm: 2 },
          pt: { xs: 10, sm: 12 },
        }}
      >
        <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        <Box sx={{ maxWidth: 1160, mx: "auto" }}>

          {/* ✅ TITLE SECTION - full width, sabse upar, Grid ke bahar */}
          <Box sx={{ mb: 2.5 }}>

            {/* Title sabse pehle */}
            <Typography
              sx={{
                fontSize: { xs: 24, sm: 30, md: 34 },
                fontWeight: 800,
                color: "#18181B",
                lineHeight: 1.2,
                mb: "12px",
                letterSpacing: "-0.5px",
              }}
            >
              {tour.title}
            </Typography>

            {/* ✅ Badge + Rating + Location — sab ek hi line mein */}
            <Box sx={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>

              {/* Badge */}
              {tour.badge && (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "#FFF3E0",
                    color: "#854F0B",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "5px 13px",
                    borderRadius: "20px",
                    border: "1px solid #EF9F27",
                  }}
                >
                  <LocalOffer sx={{ fontSize: 13 }} /> {tour.badge}
                </Box>
              )}

              {/* Rating chip */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: "1px solid #F0D893",
                  background: "#FFFDE7",
                  color: "#795548",
                }}
              >
                <Star sx={{ fontSize: 15 }} /> {tour.rating} · {tour.reviewsCount} Reviews
              </Box>

              {/* Location chip — click karo to map pe scroll ho */}
              <Box
                onClick={scrollToMap}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: "1px solid #A5D6A7",
                  background: "#E8F5E9",
                  color: "#2E7D32",
                  cursor: "pointer",
                  transition: "all .2s",
                  "&:hover": {
                    background: "#C8E6C9",
                    borderColor: "#66BB6A",
                    transform: "translateY(-1px)",
                    boxShadow: "0 3px 10px rgba(46,125,50,0.2)",
                  },
                  "&:active": { transform: "translateY(0px)" },
                }}
              >
                <LocationOn sx={{ fontSize: 15 }} /> {tour.location}
              </Box>

            </Box>
          </Box>

          {/* ✅ MAIN GRID — Images left, Payment right, side by side */}
          <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: "flex-start" }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2}>
                {tour.images?.length > 0 && (
                  <Card sx={cardSx}>
                    <CardContent sx={{ p: "18px 20px !important" }}>
                      <Box sx={secLabelSx}>
                        <Photo sx={{ fontSize: 14 }} /> Tour Images
                      </Box>
                      {renderImages()}
                    </CardContent>
                  </Card>
                )}

                <Card sx={cardSx}>
                  <CardContent sx={{ p: "18px 20px !important" }}>
                    <Box sx={secLabelSx}>Tour ke baare mein</Box>
                    <Typography sx={{ fontSize: 14, color: "#52525B", lineHeight: 1.85 }}>{tour.description}</Typography>
                  </CardContent>
                </Card>

                <Card sx={cardSx}>
                  <CardContent sx={{ p: "18px 20px !important" }}>
                    <Box sx={secLabelSx}>Tour Details</Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3,1fr)" }, gap: "10px" }}>
                      {details.map(({ icon, label, val, green }, i) => (
                        <Box
                          key={i}
                          sx={{
                            background: "#F9F8F5",
                            border: "1px solid #EBEBEB",
                            borderRadius: "12px",
                            p: "14px 16px",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mb: "8px" }}>
                            {icon}
                            <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#9B9590", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                              {label}
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: 14, fontWeight: 700, color: green ? "#0F6E56" : "#18181B" }}>
                            {val}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>

                {/* ✅ ref yahan lagaya — is Card pe scroll hoga */}
                <Card ref={mapRef} sx={{ ...cardSx, overflow: "hidden" }}>
                  <CardContent sx={{ p: "18px 20px !important" }}>
                    <Box sx={secLabelSx}>
                      <Map sx={{ fontSize: 14 }} /> Location Map
                    </Box>
                  </CardContent>
                  <Box
                    component="iframe"
                    src={mapUrl(tour.location)}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Tour location"
                    sx={{ width: "100%", height: { xs: 220, sm: 280 }, border: "none", display: "block" }}
                  />
                  <Box
                    sx={{
                      fontSize: 12,
                      color: "#A1A1AA",
                      textAlign: "center",
                      p: "10px 0 6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                    }}
                  >
                    <LocationOn sx={{ fontSize: 14 }} /> {tour.location}
                  </Box>
                </Card>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ position: { md: "sticky" }, top: 24 }}>
                <Box
                  sx={{
                    background: "#fff",
                    border: "1px solid #E4E4E7",
                    borderRadius: "20px",
                    p: { xs: "18px 16px", sm: "24px 22px" },
                    boxShadow: "0 4px 24px rgba(0,0,0,.08)",
                  }}
                >
                  {submitted ? (
                    <Box sx={{ textAlign: "center", py: 1 }}>
                      <CheckCircle sx={{ fontSize: 58, color: "#1D9E75" }} />
                      <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#18181B", mt: "14px", mb: "8px" }}>
                        Booking Confirm! 🎉
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: "#71717A", lineHeight: 1.7, mb: "20px" }}>
                        {form.name}, aapki booking confirm hai.
                        <br />
                        Confirmation <strong>{form.email}</strong> par bheja jayega.
                      </Typography>
                      <Box sx={{ background: "#F9F8F5", border: "1px solid #EBEBEB", borderRadius: "12px", p: "14px 16px", textAlign: "left", mb: "16px" }}>
                        {[
                          ["Tour", tour.title],
                          ["Date", form.date],
                          ["Time", form.time],
                          ["Adults", `${form.guests}`],
                          ["Children", `${form.children}`],
                        ].map(([k, v]) => (
                          <Box key={k} sx={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#71717A", mb: "8px" }}>
                            <span>{k}</span>
                            <span style={{ color: "#18181B", fontWeight: 600 }}>{v}</span>
                          </Box>
                        ))}
                        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800, color: "#0F6E56", pt: "10px", mt: "6px", borderTop: "1px solid #E4E4E7" }}>
                          <span>Total Paid</span>
                          <span>₹{total.toLocaleString()}</span>
                        </Box>
                      </Box>
                      <Button
                        fullWidth
                        onClick={() => {
                          setSubmitted(false);
                          setForm({
                            tourTitle: tour.title || "",
                            tourId: tour._id || tour.id || slug || "",
                            name: "",
                            email: "",
                            phone: "",
                            guests: 1,
                            children: 0,
                            date: "",
                            specialRequest: "",
                          });
                        }}
                        sx={{
                          p: "11px",
                          background: "transparent",
                          color: "#1D9E75",
                          border: "1.5px solid #1D9E75",
                          borderRadius: "12px",
                          fontSize: 13,
                          fontWeight: 600,
                          textTransform: "none",
                          "&:hover": { background: "#E1F5EE" },
                        }}
                      >
                        Nayi Booking Karo
                      </Button>
                    </Box>
                  ) : (
                    <Box component="form" onSubmit={handleSubmit}>
                      <Box sx={{ pb: "16px", mb: "18px", borderBottom: "1px dashed #E4E4E7" }}>
                        <Box sx={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                          <Typography sx={{ fontSize: 32, fontWeight: 900, color: "#0F6E56", letterSpacing: "-1px", lineHeight: 1 }}>
                            ₹{tour.pricePerPerson?.toLocaleString()}
                          </Typography>
                          <Typography sx={{ fontSize: 13, color: "#A1A1AA", fontWeight: 500 }}>/ adult</Typography>
                        </Box>
                        <Typography sx={{ fontSize: 12, color: "#9B9590", mt: "4px" }}>
                          + ₹{CHILD_PRICE.toLocaleString()} per child (below 12)
                        </Typography>
                      </Box>

                      <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.07em", mb: "10px" }}>
                        👤 Your Details
                      </Typography>

                      <Stack spacing={1.2}>
                        <TextField
                          label="Tour Name"
                          name="tourTitle"
                          value={form.tourTitle || tour.title || ""}
                          fullWidth
                          slotProps={{ input: { readOnly: true } }}
                          sx={{
                            ...inpSx,
                            "& .MuiInputBase-input": { cursor: "default", color: "#18181B", fontWeight: 600 },
                            "& .MuiOutlinedInput-root": { background: "#F0FBF7" },
                          }}
                        />
                        <input type="hidden" name="tourId" value={form.tourId || tour._id || tour.id || slug || ""} />
                        <TextField label="Full Name" name="name" value={form.name} onChange={handleChange} fullWidth required sx={inpSx} />
                        <TextField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} fullWidth required sx={inpSx} />
                        <TextField label="Phone Number (+91...)" name="phone" value={form.phone} onChange={handleChange} fullWidth required sx={inpSx} />

                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                          <TextField
                            select
                            label="Adults"
                            name="guests"
                            value={form.guests}
                            onChange={(e) => setForm((p) => ({ ...p, guests: e.target.value }))}
                            fullWidth
                            required
                            sx={inpSx}
                          >
                            {Array.from({ length: tour.maxGuests }, (_, i) => i + 1).map((n) => (
                              <MenuItem key={n} value={n}>
                                {n} {n === 1 ? "Adult" : "Adults"}
                              </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            fullWidth
                            required
                            label="Tour Date"
                            slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: new Date().toISOString().split("T")[0] } }}
                            sx={inpSx}
                          />
                          <TextField
                            type="time"
                            label="Tour Time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            fullWidth
                            required
                            slotProps={{ inputLabel: { shrink: true } }}
                            sx={inpSx}
                          />
                        </Box>

                        <TextField
                          select
                          label={`Children (₹${CHILD_PRICE}/child)`}
                          name="children"
                          value={form.children}
                          onChange={(e) => setForm((p) => ({ ...p, children: e.target.value }))}
                          fullWidth
                          sx={inpSx}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <ChildCare sx={{ fontSize: 18, color: "#9B9590" }} />
                                </InputAdornment>
                              ),
                            },
                          }}
                        >
                          {[0, 1, 2, 3, 4, 5].map((n) => (
                            <MenuItem key={n} value={n}>
                              {n === 0 ? "No Children" : `${n} ${n === 1 ? "Child" : "Children"}`}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          multiline
                          rows={2}
                          label="Special Request (optional)"
                          name="specialRequest"
                          value={form.specialRequest}
                          onChange={handleChange}
                          fullWidth
                          slotProps={{ inputLabel: { shrink: true } }}
                          sx={{ ...inpSx, "& .MuiInputBase-input": { padding: "12px 14px", resize: "none" } }}
                        />
                      </Stack>

                      <Box sx={{ background: "#F9F8F5", border: "1px solid #EBEBEB", borderRadius: "12px", p: "14px 16px", mt: "16px", mb: "4px" }}>
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
                          <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#0F6E56", mb: "6px" }}>
                            <span>✓ Free cancellation</span>
                            <span>Included</span>
                          </Box>
                        )}
                        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800, color: "#0F6E56", pt: "10px", mt: "6px", borderTop: "1px solid #E4E4E7" }}>
                          <span style={{ color: "#18181B" }}>Total</span>
                          <span>₹{total.toLocaleString()}</span>
                        </Box>
                      </Box>

                      <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.07em", mt: "16px", mb: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <CreditCard sx={{ fontSize: 14 }} /> Payment Method
                      </Typography>

                      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", mb: "14px" }}>
                        {[
                          { id: "card", icon: <CreditCard sx={{ fontSize: 14 }} />, label: "Card" },
                          { id: "upi", icon: <PhoneAndroid sx={{ fontSize: 14 }} />, label: "UPI" },
                          { id: "netbanking", icon: <AccountBalance sx={{ fontSize: 14 }} />, label: "Bank" },
                        ].map(({ id, icon, label }) => (
                          <Box
                            key={id}
                            component="button"
                            type="button"
                            onClick={() => setPaymentMethod(id)}
                            sx={{
                              p: "9px 4px",
                              fontSize: 11,
                              fontWeight: 700,
                              border: paymentMethod === id ? "2px solid #1D9E75" : "1.5px solid #E4E4E7",
                              borderRadius: "10px",
                              background: paymentMethod === id ? "#E1F5EE" : "#FAFAF9",
                              color: paymentMethod === id ? "#085041" : "#71717A",
                              cursor: "pointer",
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "5px",
                              transition: "all .15s",
                              fontFamily: "inherit",
                              "&:hover": { borderColor: "#1D9E75", color: "#085041", background: "#F0FBF7" },
                            }}
                          >
                            {icon} {label}
                          </Box>
                        ))}
                      </Box>

                      {paymentMethod === "card" && (
                        <Stack spacing={1.2} mb={1.5}>
                          <TextField
                            label="Card Number"
                            value={card.number}
                            onChange={(e) => setCard((p) => ({ ...p, number: formatCard(e.target.value) }))}
                            slotProps={{ htmlInput: { maxLength: 19 } }}
                            fullWidth
                            required
                            sx={inpSx}
                          />
                          <TextField
                            label="Name on Card"
                            value={card.name}
                            onChange={(e) => setCard((p) => ({ ...p, name: e.target.value }))}
                            fullWidth
                            required
                            sx={inpSx}
                          />
                          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                            <TextField
                              label="MM/YY"
                              value={card.expiry}
                              onChange={(e) => setCard((p) => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                              slotProps={{ htmlInput: { maxLength: 5 } }}
                              fullWidth
                              required
                              sx={inpSx}
                            />
                            <TextField
                              label="CVV"
                              type="password"
                              value={card.cvv}
                              onChange={(e) => setCard((p) => ({ ...p, cvv: e.target.value }))}
                              slotProps={{ htmlInput: { maxLength: 4 } }}
                              fullWidth
                              required
                              sx={inpSx}
                            />
                          </Box>
                        </Stack>
                      )}

                      {paymentMethod === "upi" && (
                        <Box mb={1.5}>
                          <TextField
                            label="UPI ID (e.g. rahul@okaxis)"
                            value={upi}
                            onChange={(e) => setUpi(e.target.value)}
                            fullWidth
                            required
                            sx={inpSx}
                          />
                          <Typography sx={{ fontSize: 11, color: "#A1A1AA", mt: "6px" }}>
                            e.g. 9876543210@ybl · name@paytm · upi@hdfc
                          </Typography>
                        </Box>
                      )}

                      {paymentMethod === "netbanking" && (
                        <TextField
                          select
                          label="Select Your Bank"
                          value={bank}
                          onChange={(e) => setBank(e.target.value)}
                          fullWidth
                          required
                          sx={{ ...inpSx, mb: 1.5 }}
                        >
                          {["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Bank of Baroda", "Punjab National Bank"].map((b) => (
                            <MenuItem key={b} value={b}>{b}</MenuItem>
                          ))}
                        </TextField>
                      )}

                      <Button
                        type="submit"
                        fullWidth
                        disabled={submitting}
                        sx={{
                          mt: "6px",
                          p: "14px",
                          background: "linear-gradient(135deg, #1D9E75 0%, #0F7A5A 100%)",
                          color: "#fff",
                          borderRadius: "12px",
                          fontSize: 14,
                          fontWeight: 700,
                          textTransform: "none",
                          letterSpacing: "0.02em",
                          boxShadow: "0 4px 14px rgba(29,158,117,0.35)",
                          opacity: submitting ? 0.7 : 1,
                          transition: "all .2s",
                          "&:hover": {
                            background: "linear-gradient(135deg, #1D9E75 0%, #0F7A5A 100%)",
                            opacity: submitting ? 0.7 : 0.9,
                            boxShadow: "0 6px 18px rgba(29,158,117,0.4)",
                          },
                          "&.Mui-disabled": {
                            background: "linear-gradient(135deg, #1D9E75 0%, #0F7A5A 100%)",
                            color: "#fff",
                            opacity: 0.6,
                          },
                        }}
                      >
                        {submitting ? "Processing..." : `Pay ₹${total.toLocaleString()} & Book Now`}
                      </Button>

                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", fontSize: 11, color: "#9B9590", mt: "12px" }}>
                        <Lock sx={{ fontSize: 13 }} /> Secure & encrypted payment
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
