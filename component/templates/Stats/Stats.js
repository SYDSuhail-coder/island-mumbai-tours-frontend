"use client";
import { Box, Typography, Grid } from "@mui/material";

const stats = [
  { value: "5000+", label: "Happy Tourists" },
  { value: "12+", label: "Island Destinations" },
  { value: "4.9★", label: "Average Rating" },
  { value: "6yr", label: "Experience" },
];

const Stats = () => {
  return (
    <Box sx={{ background: "white", position: "relative", top: -20 }}>
      <Grid container>
        {stats.map((item, i) => (
          <Grid
            key={i}
            size={{ xs: 6, sm: 3 }}
            sx={{
              textAlign: "center",
              py: 2.5,
              px: 1,

              borderRight: {
                sm: i < stats.length - 1 ? "0.5px solid #eee" : "none",
                xs: "none",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: 18, sm: 22 },
                fontWeight: 700,
                color: "#0a5c7a",
              }}
            >
              {item.value}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 10, sm: 11 },
                color: "#888",
                mt: 0.3,
                letterSpacing: 0.5,
              }}
            >
              {item.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Stats;