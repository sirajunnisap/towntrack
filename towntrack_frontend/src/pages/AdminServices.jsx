import React, { useEffect, useState } from 'react';
import {
    Container, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle,
    DialogContent, TextField, DialogActions, Switch, FormControlLabel, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import axiosInstance from '../api/axiosInstance';

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [open, setOpen] = useState(false);
    const [newService, setNewService] = useState({
        name: '',
        description: '',
        eligibility: '',
        isAvailable: true
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {

            const res = await axiosInstance.get('/services');
            setServices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setNewService({ ...newService, [e.target.name]: e.target.value });
    };

    const handleToggleChange = (e) => {
        setNewService({ ...newService, isAvailable: e.target.checked });
    };

    const handleSubmit = async () => {
        try {
            await axiosInstance.post('/services', newService);
            setOpen(false);
            setNewService({ name: '', description: '', eligibility: '', isAvailable: true });
            fetchServices();
        } catch (err) {
            console.error(err);
            alert("Failed to add service");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            try {
                await axiosInstance.delete(`/services/${id}`);
                fetchServices();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleAvailabilityToggle = async (id, currentStatus) => {
        try {
            await axiosInstance.put(`/services/${id}`, { isAvailable: !currentStatus });
            fetchServices();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Manage Services</Typography>
                <Button variant="contained" onClick={() => setOpen(true)}>Add New Service</Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Eligibility</TableCell>
                            <TableCell>Availability</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((service) => (
                            <TableRow key={service._id}>
                                <TableCell>{service.name}</TableCell>
                                <TableCell>{service.description}</TableCell>
                                <TableCell>{service.eligibility}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={service.isAvailable}
                                        onChange={() => handleAvailabilityToggle(service._id, service.isAvailable)}
                                    />
                                    {service.isAvailable ? "Available" : "Unavailable"}
                                </TableCell>
                                <TableCell>
                                    <IconButton color="error" onClick={() => handleDelete(service._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Service Name"
                        type="text"
                        fullWidth
                        value={newService.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={3}
                        value={newService.description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="eligibility"
                        label="Eligibility Criteria"
                        type="text"
                        fullWidth
                        value={newService.eligibility}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Switch checked={newService.isAvailable} onChange={handleToggleChange} />}
                        label="Available Immediately"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminServices;
