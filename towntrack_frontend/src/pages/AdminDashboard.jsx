import React, { useEffect, useState } from "react";
import {
    Container, Grid, Paper, Typography, Box, CircularProgress,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, IconButton
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [complaintsRes, servicesRes] = await Promise.all([
                    axiosInstance.get("/complaints/all"),
                    axiosInstance.get("/services")
                ]);
                setComplaints(complaintsRes.data);
                setServices(servicesRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getStatusColor = (status) => {
        if (status === "Solved") return "success";
        if (status === "In Progress") return "warning";
        return "error";
    };

    const handleUpdateStatus = async (id, newStatus) => {
        if (window.confirm(`Mark this complaint as ${newStatus}?`)) {
            try {
                await axiosInstance.put(`/complaints/${id}/status`, { status: newStatus });
                // Optimistic update
                setComplaints(complaints.map(c => c._id === id ? { ...c, status: newStatus } : c));
            } catch (err) {
                console.error(err);
                alert("Update failed");
            }
        }
    };

    if (loading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress sx={{ color: '#134E5E' }} /></Box>;

    const pendingCount = complaints.filter(c => c.status === "Pending").length;
    const solvedCount = complaints.filter(c => c.status === "Solved").length;

    return (
        <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" color="#134E5E" fontFamily="Poppins">
                Admin Dashboard {user && <span style={{ fontSize: '1rem', color: '#666' }}>(Welcome, {user.name})</span>}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={4} fontFamily="Poppins">
                Overview of municipal activities and citizen reports.
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} mb={5}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: '#e0f7fa', color: '#006064', textAlign: 'center' }}>
                        <AssignmentIcon sx={{ fontSize: 40, mb: 1, opacity: 0.8 }} />
                        <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">{complaints.length}</Typography>
                        <Typography variant="body2" fontWeight="600" fontFamily="Poppins">Total Complaints</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: '#ffebee', color: '#b71c1c', textAlign: 'center' }}>
                        <PendingIcon sx={{ fontSize: 40, mb: 1, opacity: 0.8 }} />
                        <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">{pendingCount}</Typography>
                        <Typography variant="body2" fontWeight="600" fontFamily="Poppins">Pending Actions</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: '#e8f5e9', color: '#1b5e20', textAlign: 'center' }}>
                        <CheckCircleIcon sx={{ fontSize: 40, mb: 1, opacity: 0.8 }} />
                        <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">{solvedCount}</Typography>
                        <Typography variant="body2" fontWeight="600" fontFamily="Poppins">Problems Solved</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: '#fff3e0', color: '#e65100', textAlign: 'center' }}>
                        <AssignmentIcon sx={{ fontSize: 40, mb: 1, opacity: 0.8 }} />
                        <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">{services.length}</Typography>
                        <Typography variant="body2" fontWeight="600" fontFamily="Poppins">Active Services</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Recent Problems Section */}
            <Typography variant="h5" gutterBottom fontWeight="bold" color="#134E5E" fontFamily="Poppins" mb={3}>
                Recent Citizen Reports
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #eee' }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                        <TableRow>
                            <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Title</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Category</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Date</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {complaints.slice(0, 5).map((complaint) => (
                            <TableRow key={complaint._id} hover>
                                <TableCell sx={{ fontFamily: 'Poppins' }}>{complaint.title}</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppins' }}>{complaint.category}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={complaint.status}
                                        color={getStatusColor(complaint.status)}
                                        size="small"
                                        sx={{ fontFamily: 'Poppins', fontWeight: 600, borderRadius: 1 }}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontFamily: 'Poppins' }}>{new Date(complaint.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => navigate(`/complaint/${complaint._id}`)} size="small">
                                        <VisibilityIcon />
                                    </IconButton>
                                    {complaint.status !== 'Solved' && (
                                        <Button
                                            size="small"
                                            color="success"
                                            onClick={() => handleUpdateStatus(complaint._id, 'Solved')}
                                            sx={{ ml: 1, textTransform: 'none', fontFamily: 'Poppins' }}
                                        >
                                            Mark Solved
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {complaints.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 3, fontFamily: 'Poppins' }}>No complaints found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box mt={3} textAlign="right">
                <Button onClick={() => navigate('/admin/complaints')} sx={{ fontFamily: 'Poppins' }}>View All Complaints &rarr;</Button>
            </Box>

        </Container>
    );
};

export default AdminDashboard;
