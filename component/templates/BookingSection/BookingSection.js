"use client";
import {
  forwardRef, useImperativeHandle, useState, useEffect
} from "react";
import {
  Box, Typography, Container, Grid,
  MenuItem, Select, TextField,
  Button, Alert, FormControl, InputLabel,
  Chip
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import toast, { Toaster } from "react-hot-toast";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    background: "#fdf6ec",
    fontSize: 13,
    "& fieldset": { borderColor: "#ddd" },
    "&:hover fieldset": { borderColor: "#0a5c7a" },
    "&.Mui-focused fieldset": { borderColor: "#0a5c7a" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0a5c7a" },
};

const BookingSection = forwardRef((props, ref) => {
  const today = new Date().toISOString().split("T")[0];

  const [tours, setTours] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [bookingResponse, setBookingResponse] = useState(null);  //backend response

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
    fetch("api/booking-section")
      .then((res) => res.json())
      .then((data) => {
        setTours(data.result.data);
      })
      .catch((err) => {
        console.error("Tours fetch error:", err);
      });
  }, []);

  useImperativeHandle(ref, () => ({
    setTour: (tourName) => {
      const match = tours.find((tour) => tour.tourName === tourName);
      if (match) {
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
    setSubmitted(false);
  };

  const handleTourChange = (e) => {
    setForm((prev) => ({
      ...prev,
      tour: e.target.value,
      duration: "",
      selectedHighlights: [],
      timeslot: "",
    }));
    setSubmitted(false);
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

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 4000,
            style: {
              background: "#0a5c7a",
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
      <Box id="book-now" sx={{ py: 6, px: { xs: 2, md: 4 }, background: "#fdf6ec" }}>
        <Container maxWidth="sm">
          <Typography sx={{ fontSize: 11, letterSpacing: 3, color: "#1a8aad", mb: 1 }}>
            EASY BOOKING
          </Typography>
          <Typography sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: { xs: 24, md: 32 }, fontWeight: 700, mb: 1
          }}>
            Book Your Tour in 2 Minutes
          </Typography>
          <Typography sx={{ fontSize: 14, color: "#666", mb: 4 }}>
            No hidden charges. Instant WhatsApp confirmation sent to your number.
          </Typography>

          <Box sx={{
            background: "white", borderRadius: 4, p: { xs: 3, md: 4 },
            border: "0.5px solid #e8e8e8",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)"
          }}>
            <Grid container spacing={2}>

              {/* TOUR SELECT */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth sx={inputSx}>
                  <InputLabel sx={{ fontSize: 13 }}>Select Tour</InputLabel>
                  <Select value={form.tour} label="Select Tour" onChange={handleTourChange}>
                    {tours.map((tour) => (
                      <MenuItem key={tour._id} value={tour.tourName}>
                        {tour.tourName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* DATE */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth label="Tour Date" type="date"
                  value={form.date} onChange={handleChange("date")}
                  slotProps={{ htmlInput: { min: today }, inputLabel: { shrink: true } }}
                  sx={inputSx}
                />
              </Grid>

              {/* TIMESLOT */}
              {selectedTour && (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth sx={inputSx}>
                    <InputLabel sx={{ fontSize: 13 }}>Select Time</InputLabel>
                    <Select value={form.timeslot} label="Select Time" onChange={handleChange("timeslot")}>
                      {selectedTour.timeslots?.map((slot) => (
                        <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              {/* DURATION */}
              {selectedTour && (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth sx={inputSx}>
                    <InputLabel sx={{ fontSize: 13 }}>Select Duration</InputLabel>
                    <Select value={form.duration} label="Select Duration" onChange={handleChange("duration")}>
                      {selectedTour.duration.map((d) => (
                        <MenuItem key={d} value={d}>{d}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              {/* ADULTS */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth sx={inputSx}>
                  <InputLabel sx={{ fontSize: 13 }}>Number of Adults</InputLabel>
                  <Select value={form.adults} label="Number of Adults" onChange={handleChange("adults")}>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <MenuItem key={num} value={num}>{num} Adult{num > 1 ? "s" : ""}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* CHILDREN */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth sx={inputSx}>
                  <InputLabel sx={{ fontSize: 13 }}>Children (below 12)</InputLabel>
                  <Select value={form.children} label="Children (below 12)" onChange={handleChange("children")}>
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <MenuItem key={num} value={num}>{num} Child{num !== 1 ? "ren" : ""}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* HIGHLIGHTS */}
              {selectedTour && selectedTour.highlights?.length > 0 && (
                <Grid size={12}>
                  <Typography sx={{ fontSize: 13, color: "#666", mb: 1 }}>
                    Select Highlights (optional)
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
                            fontSize: 12,
                            cursor: "pointer",
                            background: isSelected ? "#0a5c7a" : "#f0f0f0",
                            color: isSelected ? "white" : "#333",
                            border: isSelected ? "1px solid #0a5c7a" : "1px solid #ddd",
                            "&:hover": { background: isSelected ? "#1a8aad" : "#e0e0e0" },
                          }}
                        />
                      );
                    })}
                  </Box>
                </Grid>
              )}

              {/* NAME */}
              <Grid size={12}>
                <TextField fullWidth label="Full Name" placeholder="Your full name"
                  value={form.name} onChange={handleChange("name")} sx={inputSx} />
              </Grid>

              {/* MOBILE */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Mobile Number" placeholder="+91 9876543210"
                  value={form.mobile} onChange={handleChange("mobile")} sx={inputSx} />
              </Grid>

              {/* EMAIL */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Email Address" placeholder="you@email.com"
                  value={form.email} onChange={handleChange("email")} sx={inputSx} />
              </Grid>

              {/* BOOKING SUMMARY */}
              {selectedTour && (
                <Grid size={12}>
                  <Box sx={{ p: 2, borderRadius: 2, background: "#f8f8f8", border: "1px solid #e0e0e0" }}>
                    <Typography sx={{ fontWeight: 700, mb: 1, color: "#0a5c7a" }}>
                      Booking Summary
                    </Typography>
                    <Typography>Tour: {selectedTour.tourName}</Typography>
                    {form.duration && <Typography>Duration: {form.duration}</Typography>}
                    {form.timeslot && <Typography>Time: {form.timeslot}</Typography>}
                    {form.selectedHighlights.length > 0 && (
                      <Typography>Highlights: {form.selectedHighlights.join(", ")}</Typography>
                    )}
                    <Typography>Adult Price: ₹{selectedTour.adultPrice}</Typography>
                    <Typography>Child Price: ₹{selectedTour.childPrice}</Typography>
                    <Typography>Adults: {form.adults}</Typography>
                    <Typography>Children: {form.children}</Typography>
                    <Typography sx={{ mt: 1, fontWeight: 700, fontSize: 18, color: "#0a5c7a" }}>
                      Total Amount: ₹{totalAmount}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {/* SUBMIT */}
              <Grid size={12}>
                <Button
                  fullWidth onClick={handleSubmit} disabled={submitted}
                  sx={{
                    background: submitted ? "#4caf50" : "#0a5c7a",
                    color: "white", borderRadius: "12px",
                    py: 1.6, fontSize: 15, fontWeight: 500,
                    textTransform: "none",
                    "&:hover": { background: submitted ? "#4caf50" : "#1a8aad" },
                    "&:disabled": { background: "#4caf50", color: "white" },
                    transition: "background 0.3s"
                  }}
                >
                  {submitted ? "Booking Confirmed!" : "Confirm Booking & Pay →"}
                </Button>
              </Grid>

              {/* NOTE */}
              <Grid size={12}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                  <LockIcon sx={{ fontSize: 14, color: "#888" }} />
                  <Typography sx={{ fontSize: 11, color: "#999" }}>
                    Secure payment · Instant WhatsApp confirmation · Free cancellation 24hr before
                  </Typography>
                </Box>
              </Grid>

              {/* SUCCESS MESSAGE */}
              {submitted && bookingResponse && (
                <Grid size={12}>
                  <Alert
                    icon={<CheckCircleIcon fontSize="inherit" />}
                    severity="success"
                    sx={{ borderRadius: 2, fontSize: 13 }}
                  >
                    Booking request received!<br />
                    <strong>Booking ID: {bookingResponse.bookingId}</strong><br />
                    Tour: {bookingResponse.tour}<br />
                    Date: {bookingResponse.date?.split("T")[0]}<br />
                    Time: {bookingResponse.timeslot}<br />
                    Duration: {bookingResponse.duration}<br />
                    Total Amount: ₹{bookingResponse.totalAmount}<br />
                    Well contact you shortly on WhatsApp.
                  </Alert>
                </Grid>
              )}

            </Grid>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
});

BookingSection.displayName = "BookingSection";
export default BookingSection;