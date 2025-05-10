import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Typography, Stack, Tooltip, styled, Button } from '@mui/material';
import { Menu, Home, LayoutDashboard, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
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


function useScrollDirection() {
    const [scrollUp, setScrollUp] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setScrollUp(currentY < 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollUp;
}
const SideNavbar = ({ setOpen, open, tokenExisted, setTokenExisted }) => {
    const scrollUp = useScrollDirection();

    return (
        <>
            <motion.div
                animate={{ width: open ? 200 : 60 }}
                transition={{ type: 'spring', stiffness: 140 }}

                style={{
                    height: '100vh',
                    backgroundColor: '#fff',
                    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
                    overflowX: 'hidden',
                    borderRight: '1px solid #eee',
                    position: 'fixed',
                    left: 2,
                    zIndex: 2,
                    display: open ? 'block' : 'none',
                }}
            >
                <Stack spacing={2} px={1} pt={3} sx={{ justifyContent: 'start' }}>
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
                        return (
                            <NavButton
                                href={item?.link}
                                display="flex"
                                gap={open ? 2 : 0}
                                px={2}
                                py={1}
                                key={`Item-${index}`}
                                sx={{
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                    },
                                }}
                            >
                                {item.icon}
                                {open && <Typography>{item.title}</Typography>}
                            </NavButton>
                        )
                    })}
                </Stack>
            </motion.div>
        </>
    );
};

export default SideNavbar;
