'use client';

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    Box,
    Typography,
    IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { AxiosInstance } from '@taskManager/app/Middlewares/GlobalUrlErrorHandler';
import DashboardTaskForm from '@taskManager/app/Dashboard/AddTaskForm/AddTaskForm';

const TaskForm = ({
    open,
    onClose,
    initialTask,
    updateFormData, setUpdateFormData, getUpdatedId, setGetUpdatedId, setFormOpen
}) => {
    const isEditing = !!initialTask;
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        async function GetUserData() {
            await AxiosInstance.get('/user/getAllUsers')
                .then((res) => setUserData(res.data))
                .catch((err) => console.log(err))
        }
        GetUserData();
    }, [])
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperComponent={motion.div}

            PaperProps={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 },
                transition: { duration: 0.2 }
            }}
        >
            <DialogTitle sx={{ bgcolor: 'blueviolet' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 700, color: 'white' }}>{isEditing ? 'Edit Task' : 'Create New Task'}</Typography>
                    <IconButton onClick={onClose} size="small">
                        <X size={18} fontWeight={700} color='white' />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DashboardTaskForm userData={userData} setFormOpen={setFormOpen} getUpdatedId={getUpdatedId} updateFormData={updateFormData} setUpdateFormData={setUpdateFormData} setGetUpdatedId={setGetUpdatedId} />
        </Dialog>
    );
};

export default TaskForm;



export const PRIORITY_COLORS = {
    low: '#10b981',   // success.main
    medium: '#f59e0b', // warning.main
    high: '#ef4444',   // error.main
};

export const PRIORITY_LABELS = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
};

export const COLUMN_COLORS = {
    todo: '#e5e7eb',      // light gray
    inProgress: '#93c5fd', // light blue
    completed: '#6ee7b7',  // light green
};
