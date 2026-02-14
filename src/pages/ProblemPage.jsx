import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const ProblemsPage = () => {
  const navigate = useNavigate();

  // Dummy Data (Replace with backend later)
  const complaintsData = [
    {
      _id: "1",
      title: "Water Leakage in Ward 12",
      category: "Water",
      status: "Pending",
      priority: "High",
      votes: 12,
      createdAt: "2026-02-14",
      image: "https://via.placeholder.com/400x200",
    },
    {
      _id: "2",
      title: "Road Damage near School",
      category: "Road",
      status: "In Progress",
      priority: "Medium",
      votes: 5,
      createdAt: "2026-02-13",
      image: "https://via.placeholder.com/400x200",
    },
  ];

  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("latest");

  const filteredData = complaintsData
    .filter((c) => (category ? c.category === category : true))
    .filter((c) => (status ? c.status === status : true))
    .sort((a, b) =>
      sort === "latest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const getStatusColor = (status) => {
    if (status === "Pending") return "warning";
    if (status === "In Progress") return "info";
    if (status === "Solved") return "success";
  };

  const getPriorityColor = (priority) => {
    if (priority === "High") return "error";
    if (priority === "Medium") return "warning";
    if (priority === "Low") return "success";
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 4, backgroundColor: "#f4f6f8" }}>
      
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Current Problems in Your Area
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Water">Water</MenuItem>
            <MenuItem value="Road">Road</MenuItem>
            <MenuItem value="Electricity">Electricity</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Solved">Solved</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sort}
            label="Sort"
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Complaint Cards */}
      <Grid container spacing={3}>
        {filteredData.map((complaint) => (
          <Grid item xs={12} md={6} lg={4} key={complaint._id}>
            <Card
              sx={{
                cursor: "pointer",
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate(`/complaint/${complaint._id}`)}
            >
              <CardMedia
                component="img"
                height="160"
                image={complaint.image}
                alt="Complaint Image"
              />

              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {complaint.title}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                  <Chip
                    label={complaint.category}
                    size="small"
                  />
                  <Chip
                    label={complaint.status}
                    color={getStatusColor(complaint.status)}
                    size="small"
                  />
                  <Chip
                    label={complaint.priority}
                    color={getPriorityColor(complaint.priority)}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary">
                  👍 {complaint.votes} Votes
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {complaint.createdAt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Floating Add Button */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 40, right: 40 }}
        onClick={() => navigate("/add-complaint")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default ProblemsPage;
