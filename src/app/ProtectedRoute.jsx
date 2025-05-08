'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const role = JSON.parse(localStorage.getItem('role'));
        if (!role) {
            router.push('/');
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return null;
    return <>{children}</>;
};

export default ProtectedRoute;
