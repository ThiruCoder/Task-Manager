'use client';
import { Box, Container, Grid, Typography, Link, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import {
    Facebook, Twitter, Instagram, Linkedin,
    MapPin, Phone, Mail,
    Home, Users, Settings, BookOpen, Contact,
    Link2
} from 'lucide-react';
import { AxiosInstance } from '../Middlewares/GlobalUrlErrorHandler';
import { useState } from 'react';

const Footer = () => {
    const [email, setEmail] = useState('')

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await AxiosInstance.post('/task/sendMail', { email })
            .then((res) => {
                alert('Successfully send message.')
                setEmail('')
            })
            .catch((err) => console.log('err', err))
    }

    return (
        <Box
            component="footer"
            sx={{
                background: '#ecfdf5',
                color: '#065f46',
                // Optional animated border top
                borderTop: '1px solid',
                borderImage: 'linear-gradient(90deg, rgba(0,212,255,0) 0%, #00d4ff 50%, rgba(0,212,255,0) 100%) 1',
                py: 5
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={4}
                    component={motion.div}
                    initial="hidden"
                    whileInView="visible"
                    variants={staggerContainer}
                    viewport={{ once: true }}
                >
                    {/* Brand Info */}
                    <Grid size={{ xs: 6, md: 3 }}>
                        <motion.div variants={fadeInUp}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Tesk Manager
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                                Organize your tasks, set priorities, and stay productive. Your day made simpler with our smart Task Manager.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link href="#" color="inherit">
                                            <Icon size={20} />
                                        </Link>
                                    </motion.div>
                                ))}
                            </Box>
                        </motion.div>
                    </Grid>

                    {/* Quick Links */}
                    <Grid size={{ xs: 6, md: 3 }}>
                        <motion.div variants={fadeInUp}>
                            <Typography variant="h6" gutterBottom>
                                Quick Links
                            </Typography>
                            <Box component="ul" sx={{ listStyle: 'none', pl: 0 }}>
                                {[
                                    { icon: Home, label: 'Home', href: '/' },
                                    { icon: Users, label: 'Task Manager', href: '/TaskManagement' },
                                    { icon: Settings, label: 'Services', href: 'About' },
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Link
                                            href={item.href}
                                            color="inherit"
                                            underline="none"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                py: 0.5,
                                                '&:hover': { color: 'secondary.main' }
                                            }}
                                        >
                                            <item.icon size={16} />
                                            {item.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </Box>
                        </motion.div>
                    </Grid>

                    {/* Contact Info */}
                    <Grid size={{ xs: 6, md: 3 }}>
                        <motion.div variants={fadeInUp}>
                            <Typography variant="h6" gutterBottom>
                                Contact Us
                            </Typography>
                            <Box component="ul" sx={{ listStyle: 'none', pl: 0 }}>
                                {[
                                    { icon: Phone, label: 'Phone', href: 'tel:7569583293' },
                                    { icon: Mail, label: 'Mail', href: 'thiruthedeveloper@gmail.com' },
                                    { icon: Link2, label: 'Portfolio', href: 'https://portfolio-frontend-92nm.onrender.com' },
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Link
                                            href={item.href}
                                            color="inherit"
                                            underline="none"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                py: 0.5,
                                                '&:hover': { color: 'secondary.main' }
                                            }}
                                        >
                                            <item.icon size={16} />
                                            {item.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </Box>
                        </motion.div>
                    </Grid>

                    {/* Newsletter */}
                    <Grid size={{ xs: 6, md: 3 }}>
                        <motion.div variants={fadeInUp}>
                            <Typography variant="h6" gutterBottom>
                                Get in Touch
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                                Feel free to contact me via email for any inquiries or collaboration opportunities.
                            </Typography>
                            <Box
                                component="form"
                                sx={{ display: 'flex', gap: 1 }}
                                onSubmit={handleSubmit}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Your Email"
                                    variant="outlined"
                                    InputProps={{
                                        sx: {
                                            bgcolor: 'background.paper',
                                            borderRadius: 1,
                                        }
                                    }}
                                    required
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    type='submit'
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        px: 3,
                                    }}
                                >
                                    Send
                                </Button>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    sx={{
                        mt: 6,
                        pt: 3,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="body2">
                        © {new Date().getFullYear()} Tesk Manager. All rights reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                            <Link
                                key={index}
                                href="#"
                                color="inherit"
                                variant="body2"
                                underline="hover"
                                component={motion.div}
                                whileHover={{ scale: 1.05 }}
                            >
                                {item}
                            </Link>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;