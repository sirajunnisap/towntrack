import React, { useEffect, useState } from 'react';
import {
    Container, Grid, Card, CardContent, Typography, Button, Box, Chip, CircularProgress
} from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import VerifiedIcon from '@mui/icons-material/Verified';

const ServicesHome = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await axiosInstance.get('/services');
            setServices(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRequest = (serviceName) => {
        alert(`Request for ${serviceName} initiated!`);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" color="#134E5E" fontFamily="Poppins">
                Municipal Services
            </Typography>
            <Typography variant="subtitle1" gutterBottom color="text.secondary" sx={{ mb: 5 }} fontFamily="Poppins">
                Access various services provided by your local municipality.
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress sx={{ color: '#134E5E' }} />
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {services.filter(s => s.isAvailable).map((service) => (
                        <Grid item xs={12} md={6} lg={4} key={service._id}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 4,
                                    border: '1px solid #f0f0f0',
                                    transition: '0.3s',
                                    '&:hover': {
                                        boxShadow: '0 12px 30px rgba(19, 78, 94, 0.1)',
                                        transform: 'translateY(-5px)',
                                        borderColor: '#134E5E'
                                    }
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                        <Typography gutterBottom variant="h5" component="div" fontWeight="bold" fontFamily="Poppins" color="#333">
                                            {service.name}
                                        </Typography>
                                        <VerifiedIcon sx={{ color: '#4caf50' }} />
                                    </Box>

                                    <Chip
                                        label={service.eligibility || "All Citizens"}
                                        size="small"
                                        sx={{
                                            mb: 2,
                                            borderRadius: 1,
                                            bgcolor: '#e3f2fd',
                                            color: '#1565c0',
                                            fontWeight: 600,
                                            fontFamily: 'Poppins'
                                        }}
                                    />
                                    <Typography variant="body2" color="text.secondary" fontFamily="Poppins" lineHeight={1.6}>
                                        {service.description}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ p: 3, pt: 0 }}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => handleRequest(service.name)}
                                        sx={{
                                            bgcolor: '#134E5E',
                                            color: 'white',
                                            borderRadius: 2,
                                            fontFamily: 'Poppins',
                                            textTransform: 'none',
                                            fontWeight: '600',
                                            padding: '10px 0',
                                            '&:hover': { bgcolor: '#0e3b47' }
                                        }}
                                    >
                                        Request Service
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                    {services.length === 0 && (
                        <Typography variant="h6" color="text.secondary" sx={{ mt: 4, width: '100%', textAlign: 'center', fontFamily: 'Poppins' }}>
                            No services currently available.
                        </Typography>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default ServicesHome;
