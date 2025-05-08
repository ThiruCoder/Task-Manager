'use client';
import { Box, Typography } from '@mui/material'
import { Container, Grid, Stack } from '@mui/system'
import React from 'react'
import { styled } from '@mui/material/styles';

const ExperienceSection = ({ experiences }) => {
    return (
        <Box id="experience" py={10}>
            <Container maxWidth="lg">
                <Typography variant="h3" component="h2" textAlign="center" mb={6}>
                    Experience
                </Typography>
                <Stack spacing={6}>
                    {experiences.map((exp, index) => (
                        <Grid container key={index} spacing={4}>
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <Typography color="primary">{exp.period}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 9 }}>
                                <Typography variant="h5" component="h3" mb={1}>
                                    {exp.title}
                                </Typography>
                                <Typography color="text.secondary" mb={2}>
                                    {exp.company}
                                </Typography>
                                <ul style={{ paddingLeft: 20 }}>
                                    {exp.points.map((point, i) => (
                                        <li key={i}>
                                            <Typography color="text.secondary">{point}</Typography>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                        </Grid>
                    ))}
                </Stack>
            </Container>
        </Box>
    )
}

export default ExperienceSection