import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { useNavigate } from "react-router-dom";

const EntryChoice = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 600,
          padding: 5,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={4}>
          How would you like to use the platform?
        </Typography>

        <Grid container spacing={4}>
          {/* Option 1 */}
          <Grid item xs={12} md={6}>
            <Box
              onClick={() => navigate("/problem-home")}
              sx={{
                padding: 4,
                border: "2px solid #1976d2",
                borderRadius: 3,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                  transform: "scale(1.05)",
                },
              }}
            >
              <ReportProblemIcon sx={{ fontSize: 50, color: "#1976d2" }} />
              <Typography variant="h6" mt={2}>
                Report a Local Problem
              </Typography>
            </Box>
          </Grid>

          {/* Option 2 */}
          <Grid item xs={12} md={6}>
            <Box
              onClick={() => navigate("/services-home")}
              sx={{
                padding: 4,
                border: "2px solid #2e7d32",
                borderRadius: 3,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#e8f5e9",
                  transform: "scale(1.05)",
                },
              }}
            >
              <MiscellaneousServicesIcon sx={{ fontSize: 50, color: "#2e7d32" }} />
              <Typography variant="h6" mt={2}>
                View Municipality Services
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EntryChoice;
