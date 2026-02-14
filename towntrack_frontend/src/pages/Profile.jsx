import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Chip,
  Divider,
  Container,
  CircularProgress
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/profile");
      setUser(res.data);
    } catch (err) {
      console.error(err);
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress sx={{ color: '#134E5E' }} /></Box>;
  if (!user) return <Box display="flex" justifyContent="center" mt={10}><Typography fontFamily="Poppins">No user data found.</Typography></Box>;

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>

   
      <Paper
        elevation={0}
        sx={{
          p: 6,
          borderRadius: 6,
          mb: 4,
          display: "flex",
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: "center",
          gap: 4,
          background: 'linear-gradient(135deg, #134E5E 0%, #2B7A8E 100%)',
          color: 'white',
          boxShadow: '0 10px 40px rgba(19, 78, 94, 0.3)'
        }}
      >
        <Avatar
          sx={{
            width: 120,
            height: 120,
            fontSize: 48,
            bgcolor: "white",
            color: '#134E5E',
            fontWeight: 'bold',
            fontFamily: 'Poppins',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}
        >
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </Avatar>

        <Box textAlign={{ xs: 'center', sm: 'left' }}>
          <Typography variant="h3" fontWeight="bold" fontFamily="Poppins">
            {user.name}
          </Typography>

          <Typography sx={{ opacity: 0.9, fontFamily: 'Poppins', fontSize: '1.1rem', mt: 0.5 }}>
            {user.email}
          </Typography>

          <Chip
            label={user.role ? user.role.toUpperCase() : "CITIZEN"}
            sx={{
              mt: 2,
              bgcolor: '#FF7F50',
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'Poppins',
              px: 1
            }}
          />
        </Box>
      </Paper>

   
      <Grid container spacing={4}>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, height: '100%', border: '1px solid #eee' }}>
            <Typography variant="h6" mb={3} color="#134E5E" fontWeight="bold" fontFamily="Poppins">
              Personal Information
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box mb={3}>
              <Typography variant="caption" color="text.secondary" fontFamily="Poppins">PHONE</Typography>
              <Typography variant="body1" fontWeight="500" fontFamily="Poppins">{user.phone}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="caption" color="text.secondary" fontFamily="Poppins">ROLE</Typography>
              <Typography variant="body1" sx={{ textTransform: 'capitalize', fontWeight: '500', fontFamily: 'Poppins' }}>{user.role}</Typography>
            </Box>
          </Paper>
        </Grid>

      
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, height: '100%', border: '1px solid #eee' }}>
            <Typography variant="h6" mb={3} color="#134E5E" fontWeight="bold" fontFamily="Poppins">
              Address Details
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {user.address ? (
              <Box sx={{ '& > p': { fontFamily: 'Poppins', mb: 1 } }}>
                <Typography variant="body1" fontWeight="500" gutterBottom>{user.address.houseName}</Typography>
                <Typography variant="body2" color="text.secondary">Ward No: {user.address.wardNumber}</Typography>
                <Typography variant="body2" color="text.secondary">{user.address.postOffice} PO</Typography>
                <Typography variant="body2" color="text.secondary">{user.address.city}, {user.address.district}</Typography>
                <Typography variant="body2" color="text.secondary">{user.address.state} - {user.address.pinCode}</Typography>
              </Box>
            ) : (
              <Typography color="text.secondary" fontFamily="Poppins">No address details provided</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
