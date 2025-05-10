'use client';
import React, { useState } from 'react'
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import HeroSection from './AboutSection/HeroSection';
import SkillSection from './AboutSection/SkillSection';
import ProjectSection from './AboutSection/ProjectSection';
import img1 from '../../../public/Screenshot 2025-04-06 155331.png'
import img2 from '../../../public/Screenshot 2025-04-16 163739.png'
import img3 from '../../../public/Screenshot 2025-04-06 140736.png'
import Footer from '../Components/Footer';
import Header from '../Components/Header';


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

    const experiences = [
        {
            period: '2020 - Present',
            title: 'Senior Frontend Developer',
            company: 'Tech Solutions Inc.',
            points: [
                'Led frontend development for enterprise applications',
                'Implemented modern React architecture and best practices',
                'Mentored junior developers and conducted code reviews',
            ],
        },
        {
            period: '2018 - 2020',
            title: 'Frontend Developer',
            company: 'Digital Agency XYZ',
            points: [
                'Developed responsive web applications',
                'Optimized performance and accessibility',
                'Collaborated with design team on UI/UX improvements',
            ],
        },
        {
            period: '2016 - 2018',
            title: 'Junior Web Developer',
            company: 'Startup Co.',
            points: [
                'Built and maintained company website',
                'Implemented responsive designs',
                'Assisted in backend development tasks',
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

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Project Manager at Tech Solutions',
            quote: '"John is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding."',
            image: 'https://creatie.ai/ai/api/search-image?query=professional',
        },
        {
            name: 'Mike Chen',
            role: 'CTO at Digital Agency XYZ',
            quote: '"Working with John was a pleasure. His technical expertise and ability to communicate complex ideas made our projects successful."',
            image: 'https://creatie.ai/ai/api/search-image?query=professional',
        },
        {
            name: 'Emily Rodriguez',
            role: 'Lead Designer at Startup Co.',
            quote: '"John\'s ability to translate designs into pixel-perfect implementations is remarkable. He\'s a valuable asset to any development team."',
            image: 'https://creatie.ai/ai/api/search-image?query=professional',
        },
    ];

    return (

        <Box component="main" sx={{ bgcolor: 'white', color: 'text.primary' }}>
            <Header setTokenExisted={setTokenExisted} tokenExisted={tokenExisted} />
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
    );
}