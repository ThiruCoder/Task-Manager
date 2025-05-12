'use client';
import React, { useState } from 'react'
import { Box, Grid, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import HeroSection from './AboutSection/HeroSection';
import SkillSection from './AboutSection/SkillSection';
import ProjectSection from './AboutSection/ProjectSection';
import img1 from '../../../public/Screenshot 2025-04-06 155331.png'
import img2 from '../../../public/Screenshot 2025-04-16 163739.png'
import img3 from '../../../public/Screenshot 2025-04-06 140736.png'
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SideNavbar from '../Components/SideNavbar';


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

const ProjectCard = styled(Paper)(({ theme }) => ({
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
}));

const ContactForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

export default function About() {
    const [tokenExisted, setTokenExisted] = useState([]);
    const [open, setOpen] = useState(false);
    const skills = [
        {
            category: 'Frontend',
            items: [
                { name: 'HTML5/CSS3', level: 95 },
                { name: 'JavaScript (ES6+)', level: 90 },
                { name: 'React.js', level: 85 },
                { name: 'Next.js', level: 70 },
                { name: 'Material-UI', level: 70 },
            ],
        },
        {
            category: 'Backend',
            items: [
                { name: 'Node.js', level: 80 },
                { name: 'Express', level: 75 },
                { name: 'MongoDB', level: 70 },
                { name: 'RESTful APIs', level: 70 },
                { name: 'Firebase', level: 70 },
            ],
        },
        {
            category: 'Tools',
            items: [
                { name: 'Problem Solving', level: 90 },
                { name: 'Communication', level: 65 },
                { name: 'Collaboration', level: 75 },
                { name: 'Time Management', level: 75 },
                { name: 'Continuous Learning', level: 75 },
            ],
        },
    ];

    const projects = [
        {
            title: 'E-commerce Platform',
            description: 'A full-featured online shopping platform built with React and Node.js',
            tags: ['React', 'Node.js', 'MongoDB', 'Expreess.js'],
            image: img2,
            link: 'https://devstore-taa6.onrender.com/'
        },
        {
            title: 'Portfolio website',
            description: 'A fully responsive and dynamic personal portfolio built using React.js ',
            tags: ['React', 'Node.js', 'Material UI', 'Express.js'],
            image: img1,
            link: 'https://portfolio-frontend-92nm.onrender.com/'
        },
        {
            title: 'Real-Time Chatbot',
            description: 'A real-time chatbot application built with Socket.IO, Express, and Node.js',
            tags: ['React', 'Socket.io', 'MongoDB', 'Express.js'],
            image: img3,
            link: 'https://chatbot-frontend-de18.onrender.com/'
        },
    ];

    const matches = useMediaQuery('(min-width:600px)');
    const styles = {
        pt: 11
    }
    return (

        <Box sx={{ bgcolor: 'white', color: 'text.primary' }}>
            <Header setOpen={setOpen} open={open} setTokenExisted={setTokenExisted} tokenExisted={tokenExisted} />
            <SideNavbar setOpen={setOpen} styles={styles} open={open} tokenExisted={tokenExisted} setTokenExisted={setTokenExisted} />
            <Box component={'main'} onClick={() => setOpen(false)}>
                {/* Hero Section */}
                <HeroSection />

                {/* Skills Section */}
                <SkillSection skills={skills} />

                {/* Experience Section */}
                {/* <ExperienceSection experiences={experiences} /> */}

                {/* Projects Section */}
                <ProjectSection projects={projects} />

                {/* Testimonials Section */}
                {/* <TestimonialSection testimonials={testimonials} /> */}

                {/* Contact Section */}
                {/* <ContactSection /> */}

                {/* Footer */}
                <Footer />
            </Box>
        </Box>
    );
}