import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  CircularProgress,
  Container
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const ProblemsPage = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axiosInstance.get("/complaints/all");
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = complaints
    .filter((c) => (category === "All" ? true : c.category === category))
    .filter((c) => (status === "All" ? true : c.status === status))
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sort === "latest" ? dateB - dateA : dateA - dateB;
    });

  const getStatusColor = (status) => {
    if (status === "Pending") return "warning";
    if (status === "In Progress") return "info";
    if (status === "Solved") return "success";
    return "default";
  };

 
  const getChipStyle = (status) => ({
    borderRadius: '8px',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: '0.75rem',
  });

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", py: 5 }}>
      <Typography variant="h4" fontWeight="bold" mb={4} color="#134E5E" fontFamily="Poppins">
        Community Problems
      </Typography>

  
      <Box sx={{
        display: "flex",
        gap: 2,
        mb: 5,
        flexWrap: "wrap",
        p: 3,
        bgcolor: 'white',
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}>
        <FormControl size="small" sx={{ minWidth: 150 }} variant="standard">
          <InputLabel sx={{ fontFamily: 'Poppins' }}>Category</InputLabel>
          <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)} sx={{ fontFamily: 'Poppins' }}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Water">Water</MenuItem>
            <MenuItem value="Road">Road</MenuItem>
            <MenuItem value="Waste">Waste</MenuItem>
            <MenuItem value="Electricity">Electricity</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }} variant="standard">
          <InputLabel sx={{ fontFamily: 'Poppins' }}>Status</InputLabel>
          <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)} sx={{ fontFamily: 'Poppins' }}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Solved">Solved</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }} variant="standard">
          <InputLabel sx={{ fontFamily: 'Poppins' }}>Sort</InputLabel>
          <Select value={sort} label="Sort" onChange={(e) => setSort(e.target.value)} sx={{ fontFamily: 'Poppins' }}>
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress sx={{ color: '#134E5E' }} />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredData.map((complaint) => (
            <Grid item xs={12} md={6} lg={4} key={complaint._id}>
              <Card
                elevation={0}
                sx={{
                  cursor: "pointer",
                  borderRadius: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #f0f0f0',
                  transition: "0.3s",
                  overflow: 'hidden',
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: '0 12px 30px rgba(19, 78, 94, 0.1)',
                    borderColor: '#134E5E'
                  },
                }}
                onClick={() => navigate(`/complaint/${complaint._id}`)}
              >
                {complaint.image ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={complaint.image}
                    alt="Complaint Image"
                  />
                ) : (
                  <Box height="200px" bgcolor="#e0f2f1" display="flex" alignItems="center" justifyContent="center">
                    <Typography color="#00695c" fontFamily="Poppins">No Image</Typography>
                  </Box>
                )}

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box mb={2} display="flex" justifyContent="space-between">
                    <Chip
                      label={complaint.category}
                      size="small"
                      sx={{ bgcolor: '#e0f7fa', color: '#006064', fontFamily: 'Poppins', fontWeight: 600, borderRadius: 1 }}
                    />
                    <Chip
                      label={complaint.status}
                      color={getStatusColor(complaint.status)}
                      size="small"
                      sx={getChipStyle(complaint.status)}
                    />
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight="700" fontFamily="Poppins" color="#333">
                    {complaint.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph fontFamily="Poppins">
                    {complaint.description.substring(0, 100)}...
                  </Typography>

                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Chip
                      label={complaint.priority}
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: '#FF7F50', color: '#FF7F50', fontFamily: 'Poppins', fontWeight: 600 }}
                    />
                    <Typography variant="caption" color="text.secondary" fontFamily="Poppins">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {filteredData.length === 0 && (
            <Box width="100%" textAlign="center" mt={4}>
              <Typography color="text.secondary" fontFamily="Poppins">No complaints found matching your filters.</Typography>
            </Box>
          )}
        </Grid>
      )}

      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 40,
          right: 40,
          bgcolor: '#FF7F50',
          '&:hover': { bgcolor: '#ff6347' }
        }}
        onClick={() => navigate("/add-complaint")}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default ProblemsPage;
