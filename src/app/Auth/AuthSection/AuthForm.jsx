'use client';

import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Link,
    InputAdornment,
    IconButton,
    Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Grid } from '@mui/system';
import './AuthForm.css'

const FormContainer = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: '450px',
    padding: theme.spacing(4),
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

const FormHeader = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(3),
}));

const SwitchModeLink = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginTop: theme.spacing(2),
}));

export default function AuthForm({ onSubmit, clear, formErrors, setLoading, loading }) {
    const [mode, setMode] = useState('login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter()

    useEffect(() => {
        setEmail('')
        setPassword('')
        setUsername('')
    }, [clear])

    const validate = () => {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (username.trim().length < 4) {
            newErrors.username = 'The username must be in 4 characters'
        } else if (username.trim().length > 50) {
            newErrors.username = 'The username exceed of 50 characters'
        }

        if (mode === 'register' && !email.trim()) {
            newErrors.email = 'Email is required';
        } else if (mode === 'register' && !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 4) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        console.log('Validation errors:', newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!validate()) {
            return;
        }
        try {
            onSubmit({ username, email, password }, mode);
        } catch (error) {
            console.error(error)
        }
    };

    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        setErrorMessage(null);
        setErrors({});
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <AnimatePresence mode="wait">
            <FormContainer elevation={3}>
                <FormHeader>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        {mode === 'login' ? 'Login' : 'Register'}
                    </Typography>
                    {loading ? null :
                        <Typography variant="body2" color="text.secondary">
                            {mode === 'login'
                                ? 'Sign in to access your tasks'
                                : 'Create a new account to get started'}
                        </Typography>
                    }
                </FormHeader>

                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMessage}
                    </Alert>
                )}
                {loading ? (<div className="banter-loader">
                    <div className="banter-loader__box"></div>
                    <div className="banter-loader__box"></div>
                    <div className="banter-loader__box"></div>
                    <div className="banter-loader__box"></div>
                    <div className="banter-loader__box"></div>
                    <div className="banter-loader__box"></div>
                    <div className="banter-loader__box"></div>
                    <div className="banter-loader__box"></div>
                    <div className="banter-loader__box"></div>
                </div>) : (
                    <div>
                        <form onSubmit={handleSubmit}>

                            <TextField
                                label="Username"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                margin="normal"
                                error={!!errors.username}
                                helperText={errors.username}
                            />

                            {mode === 'register' && (
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    margin="normal"
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            )}
                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={toggleShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Typography sx={{ color: 'red', fontWeight: 500, fontSize: 12 }}>{formErrors}</Typography>
                            <Grid spacing={2} container>
                                <Grid size={{ md: 4, xs: 6 }}>
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{ mt: 2 }}
                                        onClick={() => router.back()}
                                    >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid size={{ md: 8, xs: 6 }}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{ mt: 2 }}
                                        startIcon={mode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
                                    >
                                        {mode === 'login' ? 'Sign In' : 'Sign Up'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>

                        <SwitchModeLink>
                            <Typography variant="body2">
                                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={toggleMode}
                                    underline="hover"
                                    color="primary"
                                >
                                    {mode === 'login' ? 'Sign Up' : 'Sign In'}
                                </Link>
                            </Typography>
                        </SwitchModeLink>
                    </div>
                )}
            </FormContainer>
        </AnimatePresence>
    );
};
