'use client';

import { AppBar, Button, styled, Toolbar, Typography, Container } from '@mui/material';
import { Box } from '@mui/system';
import { AxiosInstance } from '@taskManager/app/Middlewares/GlobalUrlErrorHandler';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

export const DashboardHeader = ({ headerColor }) => {
  const [tokenExisted, setTokenExisted] = useState([])
  const [load, setLoad] = useState(false)
  const router = useRouter();

  const navItems = [
    { title: 'Home', link: '/' },
    { title: 'Task Manager', link: '/Home_Depart/TaskManagement' },
    { title: 'About', link: '#' },
    { title: 'Dashboard', link: '/Dashboard/Dashboard' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const VerifyToken = async () => {
        const token = localStorage.getItem('token')
        await AxiosInstance.post('/user/VerifyToken', { token: token })
          .then((res) => setTokenExisted(res))
          .catch((err) => console.log(err))
      }
      VerifyToken();
    }, 2000)
    return () => clearInterval(interval);
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/Home_Depart/Pages/Auth')
  }


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
          <Typography variant="h5" fontWeight="bold" sx={{ flexGrow: 1, color: headerColor }}>
            LOGO
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item, index) => (
              <NavButton href={item?.link} key={`Item-${index}`} sx={{ fontWeight: 700, color: headerColor }}>
                {item?.title}
              </NavButton>
            ))}
          </Box>

          {/* // message: "Token is active." */}
          {tokenExisted?.message === 'Token is active.' ?
            (<StyledButton
              variant="contained"
              color="primary"
              endIcon={<ArrowRight size={16} />}
              sx={{ ml: 3 }}
              onClick={handleLogout}
            >
              LOG OUT
            </StyledButton>)
            : (
              <StyledButton
                variant="contained"
                color="primary"
                endIcon={<ArrowRight size={16} />}
                sx={{ ml: 3 }}
                onClick={() => router.push('/Home_Depart/Pages/Auth')}
              >
                SIGN IN
              </StyledButton>
            )
          }

        </Toolbar>
      </Container>
    </AppBar>
  );
};