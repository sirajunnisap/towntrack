import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Grid,
  InputAdornment,
  Link
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    // 1️⃣ Login: get token
    const res = await axiosInstance.post("/login", { email, password });
    const { token } = res.data; // only token comes from backend
    localStorage.setItem("token", token); // save token

    // 2️⃣ Fetch profile to get role
    const profileRes = await axiosInstance.get("/profile"); // uses token automatically
    const user = profileRes.data;
    localStorage.setItem("user", JSON.stringify(user)); // save user info

    // 3️⃣ Navigate based on role
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/choose");
    }

  } catch (err) {
    console.error(err);
    if (!err.response) {
      setError("Network Error: Cannot connect to backend.");
    } else {
      setError(err.response.data.msg || "Login failed.");
    }
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f4f6f8"
      }}
    >
      <Grid container sx={{ maxWidth: 900, boxShadow: 3, borderRadius: 3, overflow: 'hidden' }}>
        {/* Left Form */}
        <Grid item xs={12} md={6} sx={{ p: 5, bgcolor: "white" }}>
          <Typography variant="h4" mb={1} fontWeight="bold">TownTrack</Typography>
          <Typography variant="body2" mb={3}>Login to continue</Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><EmailIcon /></InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><LockIcon /></InputAdornment>
                )
              }}
            />
            <Box mt={2} mb={2}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Box>
            <Typography variant="body2">
              Not registered?{" "}
              <Link component="button" onClick={() => navigate("/signup")}>Create account</Link>
            </Typography>
          </form>
        </Grid>

        {/* Right Illustration */}
        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center", bgcolor: "#e6f0f3" }}>
          <Box
            component="img"
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
            alt="Login Illustration"
            sx={{ width: "80%", height: "80%" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
