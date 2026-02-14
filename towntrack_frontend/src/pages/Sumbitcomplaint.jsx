import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Container, Paper, Typography, TextField, Button, MenuItem, Box, Alert, Grid, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function AddComplaint() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // Compress to 70% quality
          setImage(dataUrl);
        };
        img.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !description || !category) {
        setError("Please fill in all required fields (Image is optional)");
        return;
      }

      await axiosInstance.post("/complaints", {
        title,
        description,
        category,
        image // Sending Base64 string
      });

      alert("Complaint Submitted Successfully");
      navigate("/problem-home");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.msg || "Error submitting complaint. Payload might be too large.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, width: '100%', maxWidth: 800 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" align="center" color="#134E5E" fontFamily="Poppins">
          Report an Issue
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" mb={4} fontFamily="Poppins">
          Help us improve the community by reporting problems.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Complaint Title"
                variant="outlined"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Category"
                variant="outlined"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
              >
                <MenuItem value="Water" sx={{ fontFamily: 'Poppins' }}>Water</MenuItem>
                <MenuItem value="Waste" sx={{ fontFamily: 'Poppins' }}>Waste Management</MenuItem>
                <MenuItem value="Road" sx={{ fontFamily: 'Poppins' }}>Road & Infrastructure</MenuItem>
                <MenuItem value="Electricity" sx={{ fontFamily: 'Poppins' }}>Electricity</MenuItem>
                <MenuItem value="Health" sx={{ fontFamily: 'Poppins' }}>Health & Sanitation</MenuItem>
                <MenuItem value="Others" sx={{ fontFamily: 'Poppins' }}>Others</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{ height: '100%', fontFamily: 'Poppins', borderColor: '#134E5E', color: '#134E5E' }}
              >
                Upload Image
                <Input type="file" accept="image/*" onChange={handleImageChange} sx={{ display: 'none' }} />
              </Button>
              {image && <Typography variant="caption" display="block" align="center" mt={1}>Image Selected</Typography>}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
              />
            </Grid>
          </Grid>

          <Box mt={4} display="flex" gap={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                bgcolor: '#134E5E',
                color: 'white',
                fontFamily: 'Poppins',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#0e3b47' }
              }}
            >
              Submit Complaint
            </Button>
            <Button
              onClick={() => navigate("/problem-home")}
              fullWidth
              variant="outlined"
              size="large"
              sx={{ fontFamily: 'Poppins', color: '#666', borderColor: '#ccc' }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddComplaint;
