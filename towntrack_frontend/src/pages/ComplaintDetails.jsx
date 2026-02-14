import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container, Typography, Box, Card, CardContent, CardMedia, Chip,
    Button, CircularProgress, Divider, Paper, FormControl, Select, MenuItem, InputLabel
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import axiosInstance from '../api/axiosInstance';

const ComplaintDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            return null;
        }
    });

    useEffect(() => {
        fetchComplaint();
    }, [id]);

    const fetchComplaint = async () => {
        try {
            const res = await axiosInstance.get(`/complaints/${id}`);

            setComplaint(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async () => {

        alert("Upvoted! (Logic to be implemented in backend)");
    };

    const handleStatusUpdate = async (newStatus) => {
        try {
            await axiosInstance.put(`/admin/complaint/${id}`, { status: newStatus });
            setComplaint({ ...complaint, status: newStatus });
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    if (loading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;
    if (!complaint) return <Box display="flex" justifyContent="center" mt={10}><Typography>Complaint not found.</Typography></Box>;

    const isAdmin = user && user.role === 'admin';


    const getStatusColor = (s) => s === 'Solved' ? 'success' : s === 'In Progress' ? 'warning' : 'error';

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                Back
            </Button>

            <Card elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                {complaint.image && (
                    <CardMedia
                        component="img"
                        height="300"
                        image={complaint.image}
                        alt={complaint.title}
                    />
                )}

                <CardContent sx={{ p: 4 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {complaint.title}
                        </Typography>
                        <Chip
                            label={complaint.status}
                            color={getStatusColor(complaint.status)}
                            sx={{ fontWeight: 'bold', px: 1 }}
                        />
                    </Box>

                    <Box display="flex" gap={1} mb={3}>
                        <Chip label={complaint.category} variant="outlined" />
                        <Chip label={`Priority: ${complaint.priority || 'Low'}`} color="secondary" size="small" />
                    </Box>

                    <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                        {complaint.description}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" color="text.secondary">
                                Posted on {new Date(complaint.createdAt).toLocaleDateString()}
                            </Typography>

                            {complaint.userId && (
                                <Typography variant="body2" color="text.secondary">
                                    by {complaint.userId.name || "Citizen"}
                                </Typography>
                            )}
                        </Box>

                        <Button
                            variant="outlined"
                            startIcon={<ThumbUpIcon />}
                            onClick={handleVote}
                        >
                            {complaint.votes || 0} Votes
                        </Button>
                    </Box>

                    {isAdmin && (
                        <Box mt={4} p={3} bgcolor="#f5f5f5" borderRadius={2}>
                            <Typography variant="h6" gutterBottom>Admin Controls</Typography>
                            <FormControl size="small" sx={{ minWidth: 200 }}>
                                <InputLabel>Update Status</InputLabel>
                                <Select
                                    value={complaint.status}
                                    label="Update Status"
                                    onChange={(e) => handleStatusUpdate(e.target.value)}
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Solved">Solved</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default ComplaintDetails;
