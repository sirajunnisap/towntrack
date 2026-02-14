import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Chip,
  Divider,
} from "@mui/material";

const Profile = () => {
  // Temporary dummy data (later fetch from backend)
  const user = {
    name: "Muhammed Kasim",
    email: "kasim@gmail.com",
    phone: "9876543210",
    role: "citizen",
    address: {
      houseName: "Green Villa",
      wardNumber: "12",
      postOffice: "Pookottoor",
      pinCode: "676517",
      city: "Malappuram",
      district: "Malappuram",
      state: "Kerala",
    },
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", p: 4 }}>
      
      {/* Header Section */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          mb: 4,
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            fontSize: 40,
            bgcolor: "#1976d2",
          }}
        >
          {user.name.charAt(0)}
        </Avatar>

        <Box>
          <Typography variant="h4" fontWeight="bold">
            {user.name}
          </Typography>

          <Typography color="text.secondary">
            {user.email}
          </Typography>

          <Chip
            label={user.role.toUpperCase()}
            color={user.role === "admin" ? "error" : "primary"}
            sx={{ mt: 1 }}
          />
        </Box>
      </Paper>

      {/* Details Section */}
      <Grid container spacing={4}>
        
        {/* Personal Info */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" mb={2}>
              Personal Information
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography><strong>Phone:</strong> {user.phone}</Typography>
            <Typography mt={1}>
              <strong>Role:</strong> {user.role}
            </Typography>
          </Paper>
        </Grid>

        {/* Address Info */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" mb={2}>
              Address Information
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography>{user.address.houseName}</Typography>
            <Typography>Ward No: {user.address.wardNumber}</Typography>
            <Typography>{user.address.postOffice}</Typography>
            <Typography>{user.address.city}</Typography>
            <Typography>{user.address.district}</Typography>
            <Typography>
              {user.address.state} - {user.address.pinCode}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
