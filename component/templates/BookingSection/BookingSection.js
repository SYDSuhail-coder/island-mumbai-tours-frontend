"use client";
import {
  forwardRef, useImperativeHandle, useState, useEffect, Fragment
} from "react";
import {
  Box, Typography, Container, Grid,
  MenuItem, Select, TextField,
  Button, FormControl, InputLabel,
  Chip, InputAdornment, Divider
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import toast, { Toaster } from "react-hot-toast";

// ── Brand theme (from logo) ──
const GOLD = "#F0A500";
const GOLD_HOVER = "#FFB92E";
const NAVY = "#0D1B2A";
const NAVY_SOFT = "#1B3A57";
const NAVY_GRADIENT = "linear-gradient(135deg, #0D1B2A 0%, #1B3A57 100%)";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "#fdfaf3",
    fontSize: 14,
    transition: "box-shadow 0.2s, border-color 0.2s",
    "& fieldset": { borderColor: "#e6ddcb" },
    "&:hover fieldset": { borderColor: GOLD },
    "&.Mui-focused": { boxShadow: "0 0 0 3px rgba(240,165,0,0.16)" },
    "&.Mui-focused fieldset": { borderColor: GOLD, borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": { fontSize: 14 },
  "& .MuiInputLabel-root.Mui-focused": { color: NAVY },
};

const STEPS = [
  { label: "Tour", icon: <PlaceOutlinedIcon sx={{ fontSize: 18 }} /> },
  { label: "Travellers", icon: <GroupsOutlinedIcon sx={{ fontSize: 18 }} /> },
  { label: "Details", icon: <PersonOutlineIcon sx={{ fontSize: 18 }} /> },
];

// Primary gold CTA button style
const ctaSx = {
  background: GOLD,
  color: NAVY,
  borderRadius: "14px",
  py: 1.7, fontSize: 15.5, fontWeight: 700, textTransform: "none",
  boxShadow: "0 8px 22px rgba(240,165,0,0.35)",
  transition: "transform 0.15s, box-shadow 0.2s, background 0.2s",
  "&:hover": {
    background: GOLD_HOVER,
    transform: "translateY(-2px)",
    boxShadow: "0 12px 28px rgba(240,165,0,0.45)",
  },
};

// Secondary (Back / Book Another) button style
const secondarySx = {
  color: NAVY,
  background: "#fdf8ef",
  border: "1.5px solid rgba(240,165,0,0.45)",
  borderRadius: "14px",
  fontWeight: 700, textTransform: "none",
  "&:hover": { background: "#faf1dd", borderColor: GOLD },
};

// One line inside the booking summary (label left, value right)
const SummaryRow = ({ label, value, strong }) => (
  <Box sx={{
    display: "flex", justifyContent: "space-between", alignItems: "baseline",
    py: 0.5,
  }}>
    <Typography sx={{ fontSize: strong ? 15 : 13, color: strong ? NAVY : "#5a6672", fontWeight: strong ? 700 : 500 }}>
      {label}
    </Typography>
    <Typography sx={{ fontSize: strong ? 20 : 13.5, color: strong ? NAVY : "#1f2a33", fontWeight: strong ? 800 : 600 }}>
      {value}
    </Typography>
  </Box>
);

const BookingSection = forwardRef((props, ref) => {
  const today = new Date().toISOString().split("T")[0];

  const [tours, setTours] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [bookingResponse, setBookingResponse] = useState(null);  //backend response
  const [activeStep, setActiveStep] = useState(0);

  const [form, setForm] = useState({
    tour: "",
    date: "",
    adults: 1,
    children: 0,
    name: "",
    mobile: "",
    email: "",
    duration: "",
    selectedHighlights: [],
    timeslot: "",
  });

  useEffect(() => {
    fetch("/api/booking-section")
      .then((res) => res.json())
      .then((data) => {
        setTours(data.data || []);
      })
      .catch((err) => {
        console.error("Tours fetch error:", err);
      });
  }, []);

  useImperativeHandle(ref, () => ({
    setTour: (tourName) => {
      const match = tours.find((tour) => tour.tourName === tourName);
      if (match) {
        setActiveStep(0);
        setForm((prev) => ({
          ...prev,
          tour: match.tourName,
          duration: "",
          selectedHighlights: [],
          timeslot: "",
        }));
      }
    },
  }));

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleTourChange = (e) => {
    setForm((prev) => ({
      ...prev,
      tour: e.target.value,
      duration: "",
      selectedHighlights: [],
      timeslot: "",
    }));
  };

  const handleHighlightToggle = (highlight) => {
    setForm((prev) => {
      const already = prev.selectedHighlights.includes(highlight);
      return {
        ...prev,
        selectedHighlights: already
          ? prev.selectedHighlights.filter((h) => h !== highlight)
          : [...prev.selectedHighlights, highlight],
      };
    });
  };

  const selectedTour = tours.find((tour) => tour.tourName === form.tour);

  const totalAmount = selectedTour
    ? selectedTour.adultPrice * Number(form.adults) +
    selectedTour.childPrice * Number(form.children)
    : 0;

  // Validate only the fields that belong to the current step
  const validateStep = (step) => {
    if (step === 0) {
      if (!form.tour) { toast.error("Please select a tour."); return false; }
      if (!form.timeslot) { toast.error("Please select a time."); return false; }
      if (!form.duration) { toast.error("Please select a duration."); return false; }
      if (!form.date) { toast.error("Please choose a date."); return false; }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(activeStep)) return;
    setActiveStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const handleBack = () => {
    setActiveStep((s) => Math.max(0, s - 1));
  };

  const handleBookAnother = () => {
    setSubmitted(false);
    setBookingResponse(null);
    setActiveStep(0);
  };

  const handleSubmit = async () => {
    if (!form.tour) { toast.error("Please select a tour."); return; }
    if (!form.duration) { toast.error("Please select a duration."); return; }
    if (!form.date) { toast.error("Please choose a date."); return; }
    if (!form.timeslot) { toast.error("Please select a time."); return; }
    if (!form.name.trim()) { toast.error("Please enter your name."); return; }
    if (!form.mobile.trim()) { toast.error("Please enter your mobile number."); return; }
    if (!/^\d{10}$/.test(form.mobile)) { toast.error("Please enter a valid 10 digit mobile number."); return; }

    try {
      const response = await fetch("/api/create-booking-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingType: selectedTour.bookingType,
          tour: form.tour,
          date: form.date,
          adults: form.adults,
          children: form.children,
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          duration: form.duration,
          highlights: form.selectedHighlights,
          timeslot: form.timeslot,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBookingResponse(data.result.data);   // ✅ backend data store karo
        setSubmitted(true);
        toast.success("Booking confirmed! We'll contact you on WhatsApp.");
        setForm({
          tour: "",
          date: "",
          adults: 1,
          children: 0,
          name: "",
          mobile: "",
          email: "",
          duration: "",
          selectedHighlights: [],
          timeslot: "",
        });
      } else if (response.status === 409) {
        toast.error("You've already booked this tour for the selected date.");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Server error, please try again.");
    }
  };

  const showSuccess = submitted && bookingResponse;

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 4000,
            style: {
              background: NAVY,
              color: "white",
              fontSize: "14px",
              borderRadius: "10px",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#d32f2f",
              color: "white",
              fontSize: "14px",
              borderRadius: "10px",
            },
          },
        }}
      />
      <Navbar />
      <Box
        id="book-now"
        sx={{
          mt: "40px",
          py: { xs: 5, md: 7 },
          px: { xs: 2, md: 4 },
          background: "linear-gradient(180deg, #fdf6ec 0%, #f7efe0 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative glow */}
        <Box sx={{
          position: "absolute", top: -120, right: -80,
          width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,165,0,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <Box sx={{
            display: "inline-flex", alignItems: "center", gap: 0.8,
            background: "rgba(13,27,42,0.05)",
            border: "1px solid rgba(240,165,0,0.35)",
            borderRadius: "999px", px: 1.6, py: 0.5, mb: 1.5,
          }}>
            <Box sx={{ width: 7, height: 7, borderRadius: "50%", background: GOLD }} />
            <Typography sx={{ fontSize: 11, letterSpacing: 2.5, color: NAVY, fontWeight: 700 }}>
              EASY BOOKING
            </Typography>
          </Box>

          <Typography sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: { xs: 26, md: 34 }, fontWeight: 700, mb: 1, color: NAVY, lineHeight: 1.15
          }}>
            Book Your Tour in 2 Minutes
          </Typography>
          <Typography sx={{ fontSize: 14.5, color: "#667", mb: 3, lineHeight: 1.6 }}>
            No hidden charges. Instant WhatsApp confirmation sent to your number.
          </Typography>

          <Box sx={{
            background: "white", borderRadius: "20px", p: { xs: 2.5, md: 4 },
            border: "1px solid #efe7d6",
            boxShadow: "0 10px 40px rgba(18,51,63,0.08)"
          }}>

            {showSuccess ? (
              /* ─────────── SUCCESS SCREEN ─────────── */
              <Box sx={{
                textAlign: "center",
                animation: "fadeUp 0.4s ease",
                "@keyframes fadeUp": {
                  from: { opacity: 0, transform: "translateY(10px)" },
                  to: { opacity: 1, transform: "none" },
                },
              }}>
                <Box sx={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "rgba(46,158,91,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  mx: "auto", mb: 2,
                }}>
                  <CheckCircleIcon sx={{ fontSize: 44, color: "#2e9e5b" }} />
                </Box>
                <Typography sx={{ fontSize: 22, fontWeight: 800, color: NAVY, mb: 0.5 }}>
                  Booking Confirmed!
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: "#667", mb: 2.5 }}>
                  We&apos;ll contact you shortly on WhatsApp with the details.
                </Typography>

                <Box sx={{
                  textAlign: "left", borderRadius: "16px",
                  border: "1px solid #ece4d3", overflow: "hidden",
                  boxShadow: "0 6px 20px rgba(13,27,42,0.06)",
                }}>
                  <Box sx={{
                    background: NAVY_GRADIENT,
                    px: 2.5, py: 1.5,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <Typography sx={{ fontWeight: 700, color: "#fff", fontSize: 13.5 }}>
                      Booking ID
                    </Typography>
                    <Typography sx={{ fontWeight: 800, color: GOLD, fontSize: 14, letterSpacing: 0.5 }}>
                      {bookingResponse.bookingId}
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2.5, py: 2, background: "#fdfbf6" }}>
                    <SummaryRow label="Tour" value={bookingResponse.tour} />
                    <SummaryRow label="Date" value={bookingResponse.date?.split("T")[0]} />
                    <SummaryRow label="Time" value={bookingResponse.timeslot} />
                    <SummaryRow label="Duration" value={bookingResponse.duration} />
                    <Divider sx={{ my: 1.2, borderColor: "#f0eadb" }} />
                    <SummaryRow label="Total Amount" value={`₹${bookingResponse.totalAmount}`} strong />
                  </Box>
                </Box>

                <Button
                  fullWidth onClick={handleBookAnother}
                  sx={{ ...secondarySx, mt: 3, py: 1.5, fontSize: 14.5 }}
                >
                  Book Another Tour
                </Button>
              </Box>
            ) : (
              /* ─────────── WIZARD ─────────── */
              <>
                {/* Stepper */}
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3.5, px: { xs: 0, sm: 1 } }}>
                  {STEPS.map((step, i) => {
                    const done = i < activeStep;
                    const active = i === activeStep;
                    return (
                      <Fragment key={step.label}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.7, flexShrink: 0 }}>
                          <Box sx={{
                            width: 40, height: 40, borderRadius: "50%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 700, fontSize: 15,
                            background: done || active ? NAVY_GRADIENT : "#f1eee6",
                            color: done || active ? "#fff" : "#a9b0b8",
                            border: active ? "3px solid rgba(240,165,0,0.35)" : "3px solid transparent",
                            boxShadow: active ? "0 4px 12px rgba(13,27,42,0.25)" : "none",
                            transition: "all 0.25s",
                          }}>
                            {done ? "✓" : step.icon}
                          </Box>
                          <Typography sx={{
                            fontSize: 12, fontWeight: active ? 700 : 500,
                            color: active ? NAVY : done ? "#5a6672" : "#a9b0b8",
                            transition: "color 0.2s",
                          }}>
                            {step.label}
                          </Typography>
                        </Box>
                        {i < STEPS.length - 1 && (
                          <Box sx={{
                            flex: 1, height: 3, borderRadius: 2, mt: "18px", mx: 0.5,
                            background: i < activeStep ? GOLD : "#eae6dc",
                            transition: "background 0.3s",
                          }} />
                        )}
                      </Fragment>
                    );
                  })}
                </Box>

                {/* Step content (re-mounts per step for a soft fade) */}
                <Box
                  key={activeStep}
                  sx={{
                    animation: "stepIn 0.3s ease",
                    "@keyframes stepIn": {
                      from: { opacity: 0, transform: "translateY(8px)" },
                      to: { opacity: 1, transform: "none" },
                    },
                  }}
                >
                  {/* ── STEP 0 : TOUR ── */}
                  {activeStep === 0 && (
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth sx={inputSx}>
                          <InputLabel sx={{ fontSize: 14 }}>Select Tour</InputLabel>
                          <Select value={form.tour} label="Select Tour" onChange={handleTourChange}>
                            {tours.map((tour) => (
                              <MenuItem key={tour._id} value={tour.tourName}>
                                {tour.tourName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth label="Tour Date" type="date"
                          value={form.date} onChange={handleChange("date")}
                          slotProps={{
                            htmlInput: { min: today },
                            inputLabel: { shrink: true },
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CalendarMonthOutlinedIcon sx={{ fontSize: 18, color: "#9aa" }} />
                                </InputAdornment>
                              ),
                            },
                          }}
                          sx={inputSx}
                        />
                      </Grid>

                      {selectedTour && (
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormControl fullWidth sx={inputSx}>
                            <InputLabel sx={{ fontSize: 14 }}>Select Time</InputLabel>
                            <Select value={form.timeslot} label="Select Time" onChange={handleChange("timeslot")}>
                              {selectedTour.timeslots?.map((slot) => (
                                <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      )}

                      {selectedTour && (
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormControl fullWidth sx={inputSx}>
                            <InputLabel sx={{ fontSize: 14 }}>Select Duration</InputLabel>
                            <Select value={form.duration} label="Select Duration" onChange={handleChange("duration")}>
                              {selectedTour.duration.map((d) => (
                                <MenuItem key={d} value={d}>{d}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      )}

                      {!selectedTour && (
                        <Grid size={12}>
                          <Typography sx={{ fontSize: 12.5, color: "#98a2ac", textAlign: "center", py: 1 }}>
                            Select a tour to pick your time & duration.
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  )}

                  {/* ── STEP 1 : TRAVELLERS ── */}
                  {activeStep === 1 && (
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth sx={inputSx}>
                          <InputLabel sx={{ fontSize: 14 }}>Number of Adults</InputLabel>
                          <Select value={form.adults} label="Number of Adults" onChange={handleChange("adults")}>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <MenuItem key={num} value={num}>{num} Adult{num > 1 ? "s" : ""}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth sx={inputSx}>
                          <InputLabel sx={{ fontSize: 14 }}>Children (below 12)</InputLabel>
                          <Select value={form.children} label="Children (below 12)" onChange={handleChange("children")}>
                            {[0, 1, 2, 3, 4, 5].map((num) => (
                              <MenuItem key={num} value={num}>{num} Child{num !== 1 ? "ren" : ""}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {selectedTour && selectedTour.highlights?.length > 0 && (
                        <Grid size={12}>
                          <Typography sx={{ fontSize: 13, color: "#667", mb: 1.2, fontWeight: 500 }}>
                            Select Highlights <Box component="span" sx={{ color: "#aab" }}>(optional)</Box>
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {selectedTour.highlights.map((highlight) => {
                              const isSelected = form.selectedHighlights.includes(highlight);
                              return (
                                <Chip
                                  key={highlight}
                                  label={highlight}
                                  onClick={() => handleHighlightToggle(highlight)}
                                  sx={{
                                    fontSize: 12.5,
                                    fontWeight: isSelected ? 600 : 500,
                                    cursor: "pointer",
                                    height: 34,
                                    borderRadius: "10px",
                                    background: isSelected ? NAVY : "#f6f4ef",
                                    color: isSelected ? "white" : "#4a5560",
                                    border: isSelected ? `1px solid ${NAVY}` : "1px solid #e6ddcb",
                                    transition: "all 0.15s",
                                    "&:hover": {
                                      background: isSelected ? NAVY_SOFT : "#efeae0",
                                      transform: "translateY(-1px)",
                                    },
                                  }}
                                />
                              );
                            })}
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  )}

                  {/* ── STEP 2 : DETAILS + SUMMARY ── */}
                  {activeStep === 2 && (
                    <Grid container spacing={2}>
                      <Grid size={12}>
                        <TextField
                          fullWidth label="Full Name" placeholder="Your full name"
                          value={form.name} onChange={handleChange("name")} sx={inputSx}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonOutlineIcon sx={{ fontSize: 18, color: "#9aa" }} />
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth label="Mobile Number" placeholder="9876543210"
                          value={form.mobile} onChange={handleChange("mobile")} sx={inputSx}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PhoneIphoneIcon sx={{ fontSize: 18, color: "#9aa" }} />
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth label="Email Address" placeholder="you@email.com"
                          value={form.email} onChange={handleChange("email")} sx={inputSx}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailOutlinedIcon sx={{ fontSize: 18, color: "#9aa" }} />
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Grid>

                      {selectedTour && (
                        <Grid size={12}>
                          <Box sx={{
                            borderRadius: "16px", overflow: "hidden",
                            border: "1px solid #ece4d3",
                            boxShadow: "0 6px 20px rgba(13,27,42,0.06)",
                            mt: 1,
                          }}>
                            <Box sx={{
                              background: NAVY_GRADIENT,
                              px: 2.5, py: 1.5,
                              display: "flex", alignItems: "center", gap: 1,
                            }}>
                              <EventAvailableOutlinedIcon sx={{ fontSize: 18, color: GOLD }} />
                              <Typography sx={{ fontWeight: 700, color: "#fff", fontSize: 14.5, letterSpacing: 0.3 }}>
                                Booking Summary
                              </Typography>
                            </Box>
                            <Box sx={{ px: 2.5, py: 2, background: "#fdfbf6" }}>
                              <SummaryRow label="Tour" value={selectedTour.tourName} />
                              {form.duration && <SummaryRow label="Duration" value={form.duration} />}
                              {form.timeslot && <SummaryRow label="Time" value={form.timeslot} />}
                              {form.date && <SummaryRow label="Date" value={form.date} />}
                              {form.selectedHighlights.length > 0 && (
                                <SummaryRow label="Highlights" value={form.selectedHighlights.join(", ")} />
                              )}
                              <Divider sx={{ my: 1.2, borderColor: "#f0eadb" }} />
                              <SummaryRow
                                label={`Adults × ${form.adults}`}
                                value={`₹${selectedTour.adultPrice * Number(form.adults)}`}
                              />
                              <SummaryRow
                                label={`Children × ${form.children}`}
                                value={`₹${selectedTour.childPrice * Number(form.children)}`}
                              />
                              <Divider sx={{ my: 1.2, borderColor: "#f0eadb" }} />
                              <SummaryRow label="Total Amount" value={`₹${totalAmount}`} strong />
                            </Box>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  )}
                </Box>

                {/* Navigation buttons */}
                <Box sx={{ display: "flex", gap: 1.5, mt: 3.5 }}>
                  {activeStep > 0 && (
                    <Button
                      onClick={handleBack}
                      startIcon={<ArrowBackIcon />}
                      sx={{
                        ...secondarySx,
                        flex: { xs: 1, sm: "0 0 auto" },
                        px: 3, py: 1.6, fontSize: 14.5,
                      }}
                    >
                      Back
                    </Button>
                  )}

                  {activeStep < STEPS.length - 1 ? (
                    <Button fullWidth onClick={handleNext} endIcon={<ArrowForwardIcon />} sx={ctaSx}>
                      Next
                    </Button>
                  ) : (
                    <Button fullWidth onClick={handleSubmit} endIcon={<ArrowForwardIcon />} sx={ctaSx}>
                      Confirm Booking
                    </Button>
                  )}
                </Box>

                {/* Trust badges */}
                <Box sx={{
                  display: "flex", flexWrap: "wrap", justifyContent: "center",
                  gap: { xs: 1, sm: 2.5 }, mt: 2.5,
                }}>
                  {[
                    { icon: <LockIcon sx={{ fontSize: 15 }} />, text: "Secure booking" },
                    { icon: <WhatsAppIcon sx={{ fontSize: 15 }} />, text: "Instant WhatsApp confirm" },
                    { icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 15 }} />, text: "Free cancellation 24hr" },
                  ].map((item) => (
                    <Box key={item.text} sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#8a949e" }}>
                      {item.icon}
                      <Typography sx={{ fontSize: 11.5, fontWeight: 500 }}>{item.text}</Typography>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
});

BookingSection.displayName = "BookingSection";
export default BookingSection;
