'use client';
import React, { useEffect } from 'react'
import { Box, Button, Container, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { Github, Link } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { AxiosInstance } from '@taskManager/app/Middlewares/GlobalUrlErrorHandler';
import axios from 'axios';

const ProjectCard = styled(Paper)(({ theme }) => ({
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
}));

const ProjectSection = ({ projects }) => {
    useEffect(() => {
        const GetProjectData = async () => {
            try {
                await AxiosInstance.get('/project/get')
                    .then((res) => console.log('ress', res))
                    .catch((err) => console.log('ereeer', err))
            } catch (error) {
                console.log(error)
            }
        }
        GetProjectData();
    }, [])
    return (
        <Box id="projects" py={10} sx={{ bgcolor: '#fff7ed' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" component="h2" textAlign="center" mb={6}>
                    Featured Projects
                </Typography>
                <Grid container spacing={4}>
                    {projects.map((project, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <ProjectCard elevation={3}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: 200,
                                    }}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Box>
                                <Box p={2}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="h5" component="h3" mb={1}>
                                            {project.title}
                                        </Typography>
                                        <IconButton href={project?.link}>
                                            <Link height={16} />
                                        </IconButton>
                                    </Box>
                                    <Typography color="text.secondary" mb={2}>
                                        {project.description}
                                    </Typography>
                                    <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" useFlexGap>
                                        {project.tags.map((tag) => (
                                            <Typography
                                                key={tag}
                                                variant="caption"
                                                sx={{
                                                    bgcolor: 'grey.800',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    color: 'white'
                                                }}
                                            >
                                                {tag}
                                            </Typography>
                                        ))}
                                    </Stack>

                                </Box>
                            </ProjectCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default ProjectSection
