'use client';

import { AppBar, Button, styled, Toolbar, Typography, Container } from '@mui/material';
import { Box } from '@mui/system';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AxiosInstance } from '../Middlewares/GlobalUrlErrorHandler';

const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    textTransform: 'none',
    fontWeight: 500,
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    borderRadius: '50px',
    padding: '8px 24px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
}));

export const Header = ({ headerColor }) => {
    const [tokenExisted, setTokenExisted] = useState([]);
    const [role, setRole] = useState('')
    const router = useRouter();
    const navItems = [
        { title: 'Home', link: '/' },
        { title: 'Task Manager', link: '/TaskManagement' },
        { title: 'About', link: '/About' },
        { title: 'Dashboard', link: '/Dashboard' }
    ];

    useEffect(() => {
        const VerifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                localStorage.clear();
            };

            try {
                const res = await AxiosInstance.post('/user/VerifyToken', { token });
                setTokenExisted(res);
            } catch (err) {
                if (err?.response?.data?.message === "Token is required.") {
                    const username = err.response.data.message;
                    localStorage.setItem('LocalUser', JSON.stringify({ username }));
                }
            }
        };
        VerifyToken();
    }, []);


    const handleLogout = () => {
        localStorage.clear();
        router.push('/Auth')
    }

    useEffect(() => {
        const getRole = JSON.parse(localStorage.getItem('role'))
        setRole(getRole)
    }, [])

    return (
        <AppBar position="fixed" color="transparent" elevation={0} sx={{
            py: 0.8,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            top: 4,
            left: 4,
            right: 4
        }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography variant="h5" fontWeight="bold" sx={{ flexGrow: 1, color: 'black' }}>
                        Task Manager
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {navItems.map((item, index) => {
                            if (item?.title === 'Dashboard') {
                                return tokenExisted?.data?.role === 'admin' ? (
                                    <NavButton href={item?.link} key={`Item-${index}`} sx={{ fontWeight: 700, color: 'black' }}>
                                        {item?.title}
                                    </NavButton>
                                ) : null
                            }
                            // For other items
                            return (
                                <NavButton href={item?.link} key={`Item-${index}`} sx={{ fontWeight: 700 }}>
                                    {item?.title}
                                </NavButton>
                            );
                        })}
                    </Box>

                    {/* // message: "Token is active." */}
                    {tokenExisted?.message === 'Token is active.' ?
                        (<Link href="/Auth" passHref>
                            <StyledButton
                                variant="contained"
                                color="primary"
                                endIcon={<ArrowRight size={16} />}
                                sx={{ ml: 3 }}
                                onClick={handleLogout}
                            >
                                LOG OUT
                            </StyledButton>
                        </Link>
                        ) : (
                            <Link href="/Auth" passHref>
                                <StyledButton
                                    variant="contained"
                                    color="primary"
                                    endIcon={<ArrowRight size={16} />}
                                    sx={{ ml: 3 }}
                                >
                                    SIGN IN
                                </StyledButton>
                            </Link>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};