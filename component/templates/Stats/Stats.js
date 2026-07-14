"use client";
import { Box, Typography, Grid, Container } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const stats = [
  { value: "5000+", label: "Happy Tourists", icon: <GroupsIcon /> },
  { value: "12+", label: "Island Destinations", icon: <BeachAccessIcon /> },
  { value: "4.9★", label: "Average Rating", icon: <StarIcon /> },
  { value: "6yr", label: "Experience", icon: <WorkspacePremiumIcon /> },
];

const Stats = () => {
  return (
    <Box sx={{ position: "relative", zIndex: 4, px: { xs: 2, md: 4 }, mt: { xs: -5, md: -7 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            background: "#fff",
            borderRadius: "20px",
            border: "1px solid #efe7d6",
            boxShadow: "0 16px 44px rgba(18,51,63,0.12)",
            py: { xs: 2.5, md: 3 },
            px: { xs: 1, md: 2 },
          }}
        >
          <Grid container>
            {stats.map((item, i) => (
              <Grid
                key={i}
                size={{ xs: 3 }}
                sx={{
                  textAlign: "center",
                  py: { xs: 1.5, md: 1.2 },
                  px: { xs: 0.3, md: 1 },
                  borderRight: i < stats.length - 1 ? "1px solid #f0ebe0" : "none",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-3px)" },
                  "&:hover .statNum": { color: "#F0A500" },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 32, md: 42 },
                    height: { xs: 32, md: 42 },
                    borderRadius: "12px",
                    background: "rgba(240,165,0,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#F0A500",
                    mx: "auto",
                    mb: { xs: 0.6, md: 1 },
                    "& svg": { fontSize: { xs: 17, md: 22 } },
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  className="statNum"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: { xs: 16, sm: 26 },
                    fontWeight: 700,
                    color: "#0D1B2A",
                    lineHeight: 1.1,
                    transition: "color 0.2s",
                  }}
                >
                  {item.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 9, sm: 12 },
                    color: "#8a949e",
                    mt: 0.4,
                    fontWeight: 500,
                    letterSpacing: 0.3,
                  }}
                >
                  {item.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Stats;
