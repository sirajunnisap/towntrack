import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  MenuItem
} from "@mui/material";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Citizen",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/signup", formData);

      localStorage.setItem("token", res.data.token);
      alert("Signup successful");

    } catch (error) {
      alert(error.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
      <Paper elevation={4} sx={{ p: 5, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" align="center" gutterBottom>
          TownTrack Signup
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField label="Name" name="name" fullWidth margin="normal" required onChange={handleChange} />
          <TextField label="Email" name="email" fullWidth margin="normal" required onChange={handleChange} />
          <TextField label="Phone" name="phone" fullWidth margin="normal" required onChange={handleChange} />
          <TextField label="Address" name="address" fullWidth margin="normal" required onChange={handleChange} />
          <TextField label="Password" name="password" type="password" fullWidth margin="normal" required onChange={handleChange} />

          <TextField
            select
            label="Role"
            name="role"
            fullWidth
            margin="normal"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="Citizen">Citizen</MenuItem>
            <MenuItem value="Officer">Officer</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Signup
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Register;
