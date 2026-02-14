import React, { useEffect, useState } from 'react';
import {
    Container, Typography, Grid, Card, CardContent, CardMedia,
    Chip, Button, Select, MenuItem, FormControl, InputLabel, Box
} from '@mui/material';
import axiosInstance from '../api/axiosInstance';

const AdminComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [filter, setFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const res = await axiosInstance.get('/admin/complaints');
            setComplaints(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axiosInstance.put(`/admin/complaint/${id}`, { status: newStatus });
            fetchComplaints(); // Refresh
        } catch (err) {
            console.error(err);
        }
    };

    const filteredComplaints = complaints.filter(c => {
        const categoryMatch = filter === 'All' || c.category === filter;
        const statusMatch = statusFilter === 'All' || c.status === statusFilter;
        return categoryMatch && statusMatch;
    });

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Manage Complaints</Typography>

            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Category</InputLabel>
                    <Select value={filter} label="Category" onChange={(e) => setFilter(e.target.value)}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Water">Water</MenuItem>
                        <MenuItem value="Road">Road</MenuItem>
                        <MenuItem value="Waste">Waste</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Status</InputLabel>
                    <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Solved">Solved</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={3}>
                {filteredComplaints.map((complaint) => (
                    <Grid item xs={12} md={6} lg={4} key={complaint._id}>
                        <Card>
                            {complaint.image && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={complaint.image}
                                    alt={complaint.title}
                                />
                            )}
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {complaint.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {complaint.description}
                                </Typography>
                                <Box mt={1}>
                                    <Chip label={complaint.category} size="small" sx={{ mr: 1 }} />
                                    <Chip
                                        label={complaint.status}
                                        color={complaint.status === 'Solved' ? 'success' : complaint.status === 'In Progress' ? 'warning' : 'error'}
                                        size="small"
                                    />
                                    <Chip label={complaint.priority} size="small" sx={{ ml: 1 }} variant="outlined" />
                                </Box>

                                <Box mt={2}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Update Status</InputLabel>
                                        <Select
                                            value={complaint.status}
                                            label="Update Status"
                                            onChange={(e) => handleStatusUpdate(complaint._id, e.target.value)}
                                        >
                                            <MenuItem value="Pending">Pending</MenuItem>
                                            <MenuItem value="In Progress">In Progress</MenuItem>
                                            <MenuItem value="Solved">Solved</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AdminComplaints;
