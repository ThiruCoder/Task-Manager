'use client';

import { AppBar, Button, styled, Toolbar, Typography, Container, IconButton, Menu, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import { ArrowRight, BadgeInfo, CircleEllipsis, CirclePlus, Home, LayoutDashboard, LayoutList, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AxiosInstance } from '../Middlewares/GlobalUrlErrorHandler';
import { navItems } from './NavData';

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

const Header = ({ setOpen, open, tokenExisted, setTokenExisted }) => {


    const [role, setRole] = useState('')
    const router = useRouter();

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
                    <Tooltip title='Menu'>
                        {open ?
                            <IconButton
                                onClick={() => setOpen(!open)}
                                size="small" sx={{ mr: 3, display: { xs: 'block', md: 'none' } }}>
                                <CirclePlus size={25} color="black" style={{ rotate: '45deg' }} />
                            </IconButton>
                            : <IconButton
                                onClick={() => setOpen(!open)}
                                size="small" sx={{ mr: 3, display: { xs: 'block', md: 'none' } }}>
                                <CircleEllipsis size={25} color="black" />
                            </IconButton>
                        }
                    </Tooltip>
                    <Typography component={'a'} href='/' variant="h5" fontWeight="bold" sx={{ flexGrow: 1, color: 'black', textAlign: { xs: 'center', md: 'start' } }}>
                        Task Manager
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>

                        {navItems.map((item, index) => {
                            if (item?.title === 'Dashboard') {
                                return tokenExisted?.data?.role === 'admin' ? (
                                    <Tooltip title={item?.tool}>
                                        <NavButton href={item?.link} key={s`Item-${index}`} sx={{ fontWeight: 700, color: 'black' }}>
                                            {item?.title}
                                        </NavButton>
                                    </Tooltip>
                                ) : null
                            }
                            // For other items
                            return (
                                <Tooltip title={item?.tool} key={`Tooltip-${item?.id || index}`}>
                                    <NavButton href={item?.link} sx={{ fontWeight: 700 }}>
                                        {item?.title}
                                    </NavButton>
                                </Tooltip>
                            );
                        })}
                    </Box>

                    {/* // message: "Token is active." */}
                    {tokenExisted?.message === 'Token is active.' ?
                        (<Link href="/Auth" passHref>
                            <Tooltip title='LogOut'>
                                <IconButton size="small" sx={{ mr: 3, display: { xs: 'block', md: 'none' } }} onClick={handleLogout}>
                                    <LogOut size={25} color='black' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='LogOut'>
                                <StyledButton
                                    variant="contained"
                                    color="primary"
                                    endIcon={<ArrowRight size={16} />}
                                    sx={{ ml: 3, display: { xs: 'none', md: 'flex' } }}
                                    onClick={handleLogout}
                                >
                                    LOG OUT
                                </StyledButton>
                            </Tooltip>
                        </Link>
                        ) : (
                            <Link href="/Auth" passHref>
                                <Tooltip title='LogIn'>
                                    <IconButton size="small" sx={{ mr: 3, display: { xs: 'block', md: 'none' } }}>
                                        <LogIn size={25} color='black' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='LogIn'>
                                    <StyledButton
                                        variant="contained"
                                        color="primary"
                                        endIcon={<ArrowRight size={16} />}
                                        sx={{ ml: 3, display: { xs: 'none', md: 'flex' } }}
                                    >
                                        SIGN IN
                                    </StyledButton>
                                </Tooltip>
                            </Link>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;