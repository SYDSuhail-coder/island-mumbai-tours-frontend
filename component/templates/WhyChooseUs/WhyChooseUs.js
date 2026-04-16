import { Box, Typography, Container, Grid } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ReplayIcon from "@mui/icons-material/Replay";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const reasons = [
  { icon: <SecurityIcon />, title: "Safe & Certified Boats", desc: "All vessels are coast guard certified with life jackets provided" },
  { icon: <RecordVoiceOverIcon />, title: "Expert Guides", desc: "Hindi, English & Marathi speaking guides with 5+ years experience" },
  { icon: <RestaurantIcon />, title: "Meals Included", desc: "Fresh local seafood meals included in select packages" },
  { icon: <CreditCardIcon />, title: "Easy Online Booking", desc: "Instant confirmation, UPI & card payments accepted" },
  { icon: <ReplayIcon />, title: "Free Cancellation", desc: "Cancel up to 24 hours before your tour for a full refund" },
  { icon: <SupportAgentIcon />, title: "24/7 Support", desc: "WhatsApp & call support before and during your tour" },
];

const WhyChooseUs = () => {
  return (
    <Box sx={{ background: "#f0f7fc", py: 6, px: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        <Typography sx={{ fontSize: 11, letterSpacing: 3, color: "#1a8aad", mb: 1 }}>
          WHY CHOOSE US
        </Typography>
        <Typography sx={{
          fontFamily: "'Playfair Display', serif",
          fontSize: { xs: 24, md: 32 }, fontWeight: 700, mb: 4
        }}>
          The Mumbai Island Tours Difference
        </Typography>

        <Grid container spacing={2}>
          {reasons.map((item, i) => (
            <Grid size={6} sm={4} md={4} key={i}>
              <Box sx={{
                background: "white", borderRadius: 3,
                p: { xs: 2, md: 3 }, textAlign: "center",
                border: "0.5px solid #eee", height: "100%",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
                }
              }}>
                <Box sx={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "#e8f4f8",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", mx: "auto", mb: 1.5,
                  color: "#0a5c7a"
                }}>
                  {item.icon}
                </Box>
                <Typography fontWeight={500} fontSize={14} mb={0.5}>
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;