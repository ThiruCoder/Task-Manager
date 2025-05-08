'use client';
import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';
import AuthForm from './AuthSection/AuthForm';
import { AxiosInstance } from '../Middlewares/GlobalUrlErrorHandler';


const PageContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 200px)',
    padding: theme.spacing(3),
}));

const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
}));

const Logo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
}));

const Auth = () => {
    const [clear, setClear] = useState(false)
    const [errors, setErrors] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const handleAuth = async (
        data,
        mode
    ) => {
        const { username, email, password } = data;
        console.log(`${mode} request with:`, {
            username: username,
            email: email,
            password: password,
        });
        const loginData = { username: username, password: password }
        try {
            setLoading(true)
            if (mode === 'login') {
                const response = await AxiosInstance.post('/user/login', loginData)

                if (response) {
                    localStorage.setItem('token', response.token)
                    setClear(!clear)
                    const checkIsAdmin = await AxiosInstance.get('/admin/log', {
                        headers: {
                            Authorization: `Bearer ${response.token}`
                        },
                    })
                    if (checkIsAdmin) {
                        const username = checkIsAdmin?.data?.username
                        localStorage.setItem('LocalUser', JSON.stringify({ username: username }))
                    }
                    setLoading(false)
                    if (checkIsAdmin.data.role === 'admin') {
                        localStorage.setItem('role', JSON.stringify(checkIsAdmin.data.role))
                        router.push('/Dashboard')
                    } else {
                        router.push('/')
                    }
                }
            } else {
                setLoading(true)
                const registerData = { username: username, email: email, password: password }
                const regResponse = await AxiosInstance.post('/user/register', registerData)
                if (regResponse) {
                    setLoading(false)
                    localStorage.setItem('token', regResponse.token)
                    setClear(!clear)
                    router.push('/')
                }
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            setErrors(error?.data?.message || error?.message)
        }
    };

    return (
        <PageContainer maxWidth="sm">
            <LogoContainer>
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                    TaskMaster
                </Typography>
            </LogoContainer>
            <AuthForm onSubmit={handleAuth} formErrors={errors} clear={clear} loading={loading} setLoading={setLoading} />
        </PageContainer>
    );
};

export default Auth;