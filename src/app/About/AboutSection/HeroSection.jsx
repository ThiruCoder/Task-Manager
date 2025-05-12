'use client';
import { Button, CardMedia, Typography } from '@mui/material';
import { Container, Grid, Stack } from '@mui/system';
import { Box } from '@mui/material'; // Not lucide-react
import Image from 'next/image';
import React from 'react';
import img from './3964906.jpg';

const HeroSection = () => {
    return (
        <Container maxWidth="lg" sx={{ pt: 14 }}>
            <Grid container spacing={4} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h2" sx={{ fontWeight: 700, color: '#4b2e2e' }} gutterBottom>
                        Charipalli Thirumalesh
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#3b82f6' }} gutterBottom>
                        Fullstack Developer
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Crafting beautiful and performant web experiences with modern technologies and best practices.
                    </Typography>
                    <Stack direction="row" spacing={2} mt={3}>
                        <Button href='tel:7569583293' variant="contained" color="primary" size="large">
                            Get in touch
                        </Button>
                        <Button href='https://github.com/ThiruCoder' variant="outlined" color="primary" size="large">
                            View Projects
                        </Button>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: { xs: '100%', md: '100%' },
                            borderRadius: 2,
                            overflow: 'hidden',
                            bottom: { md: 38, xs: 28 },

                        }}
                    >
                        <Image
                            src={img}
                            alt="Description of image"
                            width={570}
                            height={400}
                            sizes="(max-width: 600px) 420px, 570px"
                            placeholder="blur"
                            priority
                            style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </Box>

                </Grid>
            </Grid>
        </Container>
    );
};

export default HeroSection;
