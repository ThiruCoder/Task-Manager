'use client';
import { Paper, Typography } from '@mui/material'
import { Box, Container, Grid, Stack } from '@mui/system'
import React from 'react'
import { styled } from '@mui/material/styles';
const SkillBar = styled(Box)(({ theme }) => ({
    height: 8,
    backgroundColor: theme.palette.grey[800],
    borderRadius: 4,
    marginBottom: theme.spacing(1),
}));

const SkillProgress = styled(Box)(({ theme }) => ({
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
}));

const SkillSection = ({ skills }) => {
    return (
        <Box id="skills" py={4} sx={{ bgcolor: '#ecfdf5', mt: 6 }}>
            <Container maxWidth="lg">
                <Typography variant="h3" component="h2" textAlign="center" color='#065f46' sx={{ fontWeight: 700 }} mb={6}>
                    Technical Skills
                </Typography>
                <Grid container spacing={4}>
                    {skills.map((skillCategory) => (
                        <Grid size={{ xs: 12, sm: 4, lg: 4 }} key={skillCategory.category}>
                            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                                <Typography variant="h5" component="h3" color='#065f46' mb={3}>
                                    {skillCategory.category}
                                </Typography>
                                <Stack spacing={2}>
                                    {skillCategory.items.map((skill) => (
                                        <Box key={skill.name}>
                                            <Box display="flex" justifyContent="space-between" mb={0.5}>
                                                <Typography variant="body2" color='#065f46' >{skill.name}</Typography>
                                                <Typography variant="body2" color='#065f46' >{skill.level}%</Typography>
                                            </Box>
                                            <SkillBar>
                                                <SkillProgress sx={{ width: `${skill.level}%` }} />
                                            </SkillBar>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default SkillSection