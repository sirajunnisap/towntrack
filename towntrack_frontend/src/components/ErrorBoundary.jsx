import React from 'react';
import { Box, Typography } from '@mui/material';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box sx={{ p: 4, bgcolor: '#fff', height: '100vh' }}>
                    <Typography variant="h4" color="error" gutterBottom>
                        Something went wrong.
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold' }}>
                        {this.state.error && this.state.error.toString()}
                    </Typography>
                    <pre style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', overflow: 'auto' }}>
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </pre>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
