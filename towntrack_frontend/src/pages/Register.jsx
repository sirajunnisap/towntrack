import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Alert,
  InputAdornment,
  MenuItem,
  Link
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "citizen",
    houseName: "",
    wardNumber: "",
    postOffice: "",
    pinCode: "",
    city: "",
    district: "",
    state: "Kerala"
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
      address: {
        houseName: formData.houseName,
        wardNumber: formData.wardNumber,
        postOffice: formData.postOffice,
        pinCode: formData.pinCode,
        city: formData.city,
        district: formData.district,
        state: formData.state
      }
    };

    try {
      await axiosInstance.post("/signup", payload);
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", py: 4 }}>
      <Grid container sx={{ maxWidth: 1100, boxShadow: 3, borderRadius: 4, overflow: 'hidden' }}>

      
        <Grid item xs={12} md={7} sx={{ p: 5, bgcolor: 'white' }}>
          <Typography variant="h4" fontWeight="bold" color="#134E5E" sx={{ mb: 1, fontFamily: 'Poppins' }}>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Join TownTrack to connect with your community
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  placeholder="Full Name"
                  name="name"
                  fullWidth
                  variant="standard"
                  required
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: 'action.active' }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Email"
                  name="email"
                  type="email"
                  fullWidth
                  variant="standard"
                  required
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: 'action.active' }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Phone"
                  name="phone"
                  fullWidth
                  variant="standard"
                  required
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: 'action.active' }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Password"
                  name="password"
                  type="password"
                  fullWidth
                  variant="standard"
                  required
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: 'action.active' }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                  <HomeIcon sx={{ color: '#134E5E' }} />
                  <Typography variant="subtitle2" color="#134E5E" fontWeight="bold">Address Details</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField label="House Name" variant="standard" name="houseName" fullWidth required onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Ward No" variant="standard" name="wardNumber" fullWidth required onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Post Office" variant="standard" name="postOffice" fullWidth required onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Pin Code" variant="standard" name="pinCode" fullWidth required onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="City" variant="standard" name="city" fullWidth required onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="District" variant="standard" name="district" fullWidth required onChange={handleChange} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  label="Register as"
                  name="role"
                  fullWidth
                  variant="standard"
                  value={formData.role}
                  onChange={handleChange}
                  sx={{ mt: 1 }}
                >
                  <MenuItem value="citizen">Citizen</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                bgcolor: '#134E5E',
                color: 'white',
                mt: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#0e3b47'
                }
              }}
            >
              SIGN UP
            </Button>

            <Box mt={3} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Already a member? {' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/")}
                  underline="hover"
                  sx={{ color: '#134E5E', fontWeight: 'bold' }}
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Side - Illustration */}
        <Grid item xs={12} md={5} sx={{
          bgcolor: '#f0f4f8',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4
        }}>
          <Box
            component="img"
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-797.jpg"
            alt="Signup Illustration"
            sx={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', mixBlendMode: 'multiply' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Register;
