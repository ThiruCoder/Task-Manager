'use client';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Typography,
    Container,
    Box,
    Stack,
    styled,
    alpha,
    useMediaQuery,
} from '@mui/material';
import {
    Clock,
    BarChart2,
    CalendarClock,
    FolderKanban,
    UserCircle,
    Code,
    ArrowRight
} from "lucide-react";
import { motion } from 'framer-motion';
import Footer from '../Components/Footer';
import SideNavbar from '../Components/SideNavbar';
import Header from '../Components/Header';

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
    const [open, setOpen] = useState(false);
    const [tokenExisted, setTokenExisted] = useState([]);

    const features = [
        { icon: <Clock size={24} />, title: 'Status' },
        { icon: <BarChart2 size={24} />, title: 'Priority' },
        { icon: <CalendarClock size={24} />, title: 'Time-Based' },
        { icon: <FolderKanban size={24} />, title: 'Category or Department' },
        { icon: <UserCircle size={24} />, title: 'Role or Ownership' },
        { icon: <Code size={24} />, title: 'Tool or Technology' },
    ];
    const matches = useMediaQuery('(min-width:600px)');
    useEffect(() => {
        if (matches) {
            setOpen(false)
        }
    }, [matches])
    const styles = {
        pt: 2.5
    }
    return (
        <>
            <Box sx={{ mb: 4 }} component={'main'}>
                {/* Header */}
                <Header setOpen={setOpen} open={open} tokenExisted={tokenExisted} setTokenExisted={setTokenExisted} />
                <SideNavbar styles={styles} setOpen={setOpen} open={open} tokenExisted={tokenExisted} setTokenExisted={setTokenExisted} />
                {/* Hero Section */}
                <HeroSection sx={{ mt: 10, pt: 1 }} onClick={() => {
                    setOpen(false)
                }}>
                    <Container maxWidth="lg" component={'main'} onClick={() => setOpen(false)}>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <Stack spacing={4} sx={{ pt: matches ? 0 : 4 }}>
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
                                    <Box mt={4}>
                                        <Stack
                                            direction="row"
                                            flexWrap="wrap"
                                            gap={1}
                                            justifyContent="flex-start"
                                            alignItems="center"
                                        >
                                            {features.map((feature, index) => (
                                                <motion.div
                                                    key={index}
                                                    whileHover={{ y: -5 }}
                                                    transition={{ type: 'spring', stiffness: 300 }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        spacing={1}
                                                        sx={{
                                                            px: 2,
                                                            py: 1,
                                                            borderRadius: 2,
                                                            borderColor: 'divider',
                                                            minWidth: 180,
                                                        }}
                                                    >
                                                        <Box color="primary.main">{feature.icon}</Box>
                                                        <Typography>{feature.title}</Typography>
                                                    </Stack>
                                                </motion.div>
                                            ))}
                                        </Stack>
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
