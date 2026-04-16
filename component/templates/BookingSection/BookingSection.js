"use client";
import {
  forwardRef, useImperativeHandle, useState
} from "react";
import {
  Box, Typography, Container, Grid,
  MenuItem, Select, TextField,
  Button, Alert, FormControl, InputLabel
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const tours = [
  "Elephanta Island Tour — ₹999",
  "Alibaug Beach Tour — ₹1,499",
  "Mandwa Coastal Getaway — ₹799",
  "Sunset Harbour Cruise — ₹1,199",
];

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

  const [form, setForm] = useState({
    tour: "", date: "", adults: "1 Adult",
    children: "0 Children", name: "", mobile: "", email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useImperativeHandle(ref, () => ({
    setTour: (tourName) => {
      const match = tours.find((t) => t.includes(tourName.split(" ")[0]));
      if (match) setForm((prev) => ({ ...prev, tour: match }));
    },
  }));

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  const handleSubmit = () => {
    if (!form.tour) { setError("Please select a tour."); return; }
    if (!form.date) { setError("Please choose a date."); return; }
    if (!form.name.trim()) { setError("Please enter your name."); return; }
    if (!form.mobile.trim()) { setError("Please enter your mobile number."); return; }
    setSubmitted(true);
  };

  return (
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
                <Select
                  value={form.tour}
                  label="Select Tour"
                  onChange={handleChange("tour")}
                  sx={{ borderRadius: "10px", fontSize: 13 }}
                >
                  {tours.map((t) => (
                    <MenuItem key={t} value={t} sx={{ fontSize: 13 }}>{t}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* DATE */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth label="Tour Date" type="date"
                value={form.date} onChange={handleChange("date")}
                slotProps={{
                  htmlInput: { min: today },
                  inputLabel: { shrink: true }
                }}
                sx={inputSx}
              />
            </Grid>

            {/* ADULTS */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth sx={inputSx}>
                <InputLabel sx={{ fontSize: 13 }}>Number of Adults</InputLabel>
                <Select
                  value={form.adults}
                  label="Number of Adults"
                  onChange={handleChange("adults")}
                  sx={{ borderRadius: "10px", fontSize: 13 }}
                >
                  {["1 Adult","2 Adults","3 Adults","4 Adults","5+ Adults"].map((o) => (
                    <MenuItem key={o} value={o} sx={{ fontSize: 13 }}>{o}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* CHILDREN */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth sx={inputSx}>
                <InputLabel sx={{ fontSize: 13 }}>Children (below 12)</InputLabel>
                <Select
                  value={form.children}
                  label="Children (below 12)"
                  onChange={handleChange("children")}
                  sx={{ borderRadius: "10px", fontSize: 13 }}
                >
                  {["0 Children","1 Child","2 Children","3+ Children"].map((o) => (
                    <MenuItem key={o} value={o} sx={{ fontSize: 13 }}>{o}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* NAME */}
            <Grid size={12}>
              <TextField
                fullWidth label="Full Name"
                placeholder="Your full name"
                value={form.name} onChange={handleChange("name")}
                sx={inputSx}
              />
            </Grid>

            {/* MOBILE */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth label="Mobile Number"
                placeholder="+91 9876543210"
                value={form.mobile} onChange={handleChange("mobile")}
                sx={inputSx}
              />
            </Grid>

            {/* EMAIL */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth label="Email Address"
                placeholder="you@email.com"
                value={form.email} onChange={handleChange("email")}
                sx={inputSx}
              />
            </Grid>

            {/* ERROR */}
            {error && (
              <Grid size={12}>
                <Alert severity="error" sx={{ borderRadius: 2, fontSize: 13 }}>
                  {error}
                </Alert>
              </Grid>
            )}

            {/* SUBMIT */}
            <Grid size={12}>
              <Button
                fullWidth onClick={handleSubmit}
                disabled={submitted}
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
                {submitted ? "✅ Booking Confirmed!" : "Confirm Booking & Pay →"}
              </Button>
            </Grid>

            {/* NOTE */}
            <Grid size={12}>
              <Box sx={{
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: 0.5
              }}>
                <LockIcon sx={{ fontSize: 14, color: "#888" }} />
                <Typography sx={{ fontSize: 11, color: "#999" }}>
                  Secure payment · Instant WhatsApp confirmation · Free cancellation 24hr before
                </Typography>
              </Box>
            </Grid>

            {/* SUCCESS MESSAGE */}
            {submitted && (
              <Grid size={12}>
                <Alert
                  icon={<CheckCircleIcon fontSize="inherit" />}
                  severity="success"
                  sx={{ borderRadius: 2, fontSize: 13 }}
                >
                  Booking request sent! You'll receive a WhatsApp confirmation within 15 minutes. Thank you!
                </Alert>
              </Grid>
            )}

          </Grid>
        </Box>
      </Container>
    </Box>
  );
});

BookingSection.displayName = "BookingSection";
export default BookingSection;