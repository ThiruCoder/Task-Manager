'use client';
import React, { useState } from 'react';
import {
    Button,
    Typography,
    Container,
    Box,
    Stack,
    styled,
    alpha,
} from '@mui/material';
import {
    ArrowRight,
    Clock,
    BarChart2,
    DollarSign,
    LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';

// Styled Components
const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    borderRadius: '50px',
    padding: '8px 24px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    textTransform: 'none',
    fontWeight: 500,
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
    },
}));

const HeroSection = styled(Box)(({ theme }) => ({
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
    borderRadius: '0 0 40px 40px',
    position: 'relative',
    overflow: 'hidden',
}));

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

export const HomePage = () => {
    const features = [
        { icon: <Clock size={24} />, title: 'Time Tracking' },
        { icon: <BarChart2 size={24} />, title: 'Analytics' },
        { icon: <DollarSign size={24} />, title: 'Finance Tools' },
        { icon: <LayoutDashboard size={24} />, title: 'Dashboard' },
    ];
    return (
        <>
            <Box sx={{ mb: 4 }}>
                {/* Header */}
                <Header />
                {/* Hero Section */}
                <HeroSection sx={{ mt: 10 }}>
                    <Container maxWidth="lg">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <Stack spacing={4}>
                                <motion.div variants={itemVariants}>
                                    <Typography
                                        variant="h2"
                                        fontWeight="bold"
                                        sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
                                    >
                                        All-in-One Task & <Box component="span" color="primary.main">Project Management</Box>
                                    </Typography>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <Typography variant="h6" color="text.secondary" maxWidth="md">
                                        Manage tasks, projects, and teams all in one place. Collaborate in real time, set priorities, and hit your goals faster than ever.
                                    </Typography>
                                </motion.div>

                                <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <StyledButton
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        href={`/TaskManagement`}
                                        endIcon={<ArrowRight size={20} />}
                                    >
                                        START NOW
                                    </StyledButton>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <Box display="flex" gap={4} mt={4}>
                                        {features.map((feature, index) => (
                                            <motion.div
                                                key={index}
                                                whileHover={{ y: -5 }}
                                                transition={{ type: 'spring', stiffness: 300 }}
                                            >
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <Box color="primary.main">{feature.icon}</Box>
                                                    <Typography>{feature.title}</Typography>
                                                </Stack>
                                            </motion.div>
                                        ))}
                                    </Box>
                                </motion.div>
                            </Stack>
                        </motion.div>
                    </Container>

                    {/* Background Animation */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: '-50%',
                            right: '-30%',
                            width: '800px',
                            height: '800px',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, rgba(98, 0, 238, 0.1) 0%, rgba(0, 188, 212, 0.1) 100%)`,
                            zIndex: -1,
                        }}
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                </HeroSection>

            </Box>
            <Footer />
        </>
    );
};
