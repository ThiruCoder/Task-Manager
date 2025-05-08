'use client';
import React from 'react'
import { Box, Button, Container, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { styled } from '@mui/material/styles';

const ContactForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

const ContactSection = () => {
    return (
        <Box id="contact" py={10} sx={{ bgcolor: 'grey.900' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" component="h2" textAlign="center" mb={6}>
                    Get in Touch
                </Typography>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" component="h3" mb={3}>
                            Contact Information
                        </Typography>
                        <Stack spacing={2}>
                            <Box display="flex" alignItems="center">
                                <Mail style={{ marginRight: 16, color: 'primary.main' }} />
                                <Typography>john.smith@example.com</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Phone style={{ marginRight: 16, color: 'primary.main' }} />
                                <Typography>+1 (555) 123-4567</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <MapPin style={{ marginRight: 16, color: 'primary.main' }} />
                                <Typography>San Francisco, CA</Typography>
                            </Box>
                        </Stack>
                        <Box mt={4} display="flex" gap={2}>
                            <IconButton color="primary">
                                <Github />
                            </IconButton>
                            <IconButton color="primary">
                                <Linkedin />
                            </IconButton>
                            <IconButton color="primary">
                                <Twitter />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ContactForm>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{ sx: { color: 'text.secondary' } }}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{ sx: { color: 'text.secondary' } }}
                            />
                            <TextField
                                label="Message"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                InputLabelProps={{ sx: { color: 'text.secondary' } }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                            >
                                Send Message
                            </Button>
                        </ContactForm>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default ContactSection