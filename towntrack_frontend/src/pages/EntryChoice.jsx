import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { useNavigate } from "react-router-dom";

const EntryChoice = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)", 
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
        px: 2
      }}
    >
      <Grid container spacing={4} maxWidth="md">
        <Grid item xs={12}>
          <Typography variant="h3" fontWeight="bold" align="center" color="#134E5E" mb={1} fontFamily="Poppins">
            Welcome to TownTrack
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" mb={6} fontFamily="Poppins">
            Select an option to get started
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            onClick={() => navigate("/problem-home")}
            elevation={0}
            sx={{
              height: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              cursor: "pointer",
              transition: "0.4s",
              border: '1px solid transparent',
              "&:hover": {
                boxShadow: '0 20px 40px rgba(19, 78, 94, 0.15)',
                transform: "translateY(-8px)",
                borderColor: '#134E5E'
              },
            }}
          >
            <Box
              sx={{
                p: 3,
                borderRadius: '50%',
                bgcolor: 'rgba(19, 78, 94, 0.1)',
                mb: 3,
                color: '#134E5E'
              }}
            >
              <ReportProblemIcon sx={{ fontSize: 60 }} />
            </Box>
            <Typography variant="h5" fontWeight="600" color="#134E5E" fontFamily="Poppins">
              Report a Problem
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1} fontFamily="Poppins">
              Roads, Water, Waste & more
            </Typography>
          </Card>
        </Grid>

      
        <Grid item xs={12} md={6}>
          <Card
            onClick={() => navigate("/services-home")}
            elevation={0}
            sx={{
              height: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              cursor: "pointer",
              transition: "0.4s",
              border: '1px solid transparent',
              "&:hover": {
                boxShadow: '0 20px 40px rgba(255, 127, 80, 0.2)',
                transform: "translateY(-8px)",
                borderColor: '#FF7F50'
              },
            }}
          >
            <Box
              sx={{
                p: 3,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 127, 80, 0.1)',
                mb: 3,
                color: '#FF7F50'
              }}
            >
              <MiscellaneousServicesIcon sx={{ fontSize: 60 }} />
            </Box>
            <Typography variant="h5" fontWeight="600" color="#134E5E" fontFamily="Poppins">
              Municipal Services
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1} fontFamily="Poppins">
              Applications, Certificates & more
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EntryChoice;
