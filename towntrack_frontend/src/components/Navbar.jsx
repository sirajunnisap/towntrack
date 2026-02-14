import React, { useState } from 'react';
import {
    AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, Container, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
        console.error("Failed to parse user from local storage", e);
        localStorage.removeItem('user'); // Clear corrupted data
    }
    const isLoggedIn = !!user;
    const isAdmin = user?.role === 'admin';

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        handleCloseUserMenu();
    };

    const navLinks = isLoggedIn ? (
        isAdmin ? [
            { name: 'Dashboard', path: '/admin/dashboard' },
            { name: 'Complaints', path: '/admin/complaints' },
            { name: 'Services', path: '/admin/services' },
            { name: 'Users', path: '/admin/users' },
        ] : [
            { name: 'Home', path: '/problem-home' },
            { name: 'Problems', path: '/problems' },
            { name: 'Services', path: '/services-home' },
        ]
    ) : [];

    if (!isLoggedIn) return null;

    return (
        <AppBar position="sticky" elevation={0} sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            color: '#134E5E'
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/problem-home')}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Poppins',
                            fontWeight: 700,
                            letterSpacing: '-0.5px',
                            color: '#134E5E',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        TownTrack
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {navLinks.map((link) => (
                                <MenuItem key={link.name} onClick={() => { navigate(link.path); handleCloseNavMenu(); }}>
                                    <Typography textAlign="center" fontFamily="Poppins">{link.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>


                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Poppins',
                            fontWeight: 700,
                            color: '#134E5E',
                            textDecoration: 'none',
                        }}
                    >
                        TT
                    </Typography>


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 4 }}>
                        {navLinks.map((link) => (
                            <Button
                                key={link.name}
                                onClick={() => navigate(link.path)}
                                sx={{
                                    my: 2,
                                    color: '#555',
                                    display: 'block',
                                    fontWeight: 500,
                                    fontFamily: 'Poppins',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        color: '#134E5E',
                                        bgcolor: 'transparent'
                                    }
                                }}
                            >
                                {link.name}
                            </Button>
                        ))}
                    </Box>


                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar sx={{ bgcolor: '#FF7F50', fontFamily: 'Poppins', fontWeight: 'bold' }}>
                                {user?.name?.charAt(0).toUpperCase() || <AccountCircle />}
                            </Avatar>
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            PaperProps={{
                                elevation: 4,
                                sx: { borderRadius: 2, minWidth: 150 }
                            }}
                        >
                            <MenuItem onClick={() => { navigate('/profile'); handleCloseUserMenu(); }}>
                                <Typography textAlign="center" fontFamily="Poppins">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center" color="error" fontFamily="Poppins">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
