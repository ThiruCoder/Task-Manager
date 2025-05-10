'use client';

import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
    CheckCircle,
    AlertCircle,
    Clock,
    Activity
} from 'lucide-react';
import { Grid } from '@mui/system';

const StatCard = ({ title, value, icon, color, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay }}
            style={{ height: '100%' }}
        >
            <Paper
                elevation={1}
                sx={{
                    p: 2,
                    height: '100%',
                    borderTop: `4px solid ${color}`,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            {value}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: `${color}20`,
                            p: 1,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </Box>
                </Box>
            </Paper>
        </motion.div>
    );
};

const TaskStats = ({ getCurrentTask, getAssignTask }) => {

    const completedTask = getCurrentTask.filter(item => item.status === 'Completed');
    const pendingTask = getCurrentTask.filter(item => item.status === 'Pending');
    const inProgressTask = getCurrentTask.filter(item => item.status === 'In Progress');
    const archivedTask = getCurrentTask.filter(item => item.status === 'Archived');

    // getCurrentTask={getCurrentTask} getAssignTask={getAssignTask}
    return (
        <Box sx={{ mb: 4 }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Total Tasks"
                        value={getCurrentTask.length}
                        icon={<Activity size={24} color="#3b82f6" />}
                        color="#3b82f6"
                        delay={0.1}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Completion Rate"
                        value={getAssignTask.length}
                        icon={<CheckCircle size={24} color="#10b981" />}
                        color="#10b981"
                        delay={0.2}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Pending Tasks"
                        value={pendingTask.length || 0}
                        icon={<AlertCircle size={24} color="#ef4444" />}
                        color="#ef4444"
                        delay={0.3}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="In Progress Tasks"
                        value={inProgressTask.length || 0}
                        icon={<Clock size={24} color="#f59e0b" />}
                        color="#f59e0b"
                        delay={0.4}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Archived Tasks"
                        value={archivedTask.length || 0}
                        icon={<Clock size={24} color="#f59e0b" />}
                        color="#f59e0b"
                        delay={0.4}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Completed Tasks"
                        value={completedTask.length || 0}
                        icon={<Clock size={24} color="#f59e0b" />}
                        color="#f59e0b"
                        delay={0.4}
                    />
                </Grid>

                {/* <Grid item xs={12}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                    >
                        <Paper sx={{ p: 3, mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Task Priority Distribution
                            </Typography>

                            <Box sx={{ mt: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Low Priority</Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {getPriorityPercentage('low')}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={getPriorityPercentage('low')}
                                    sx={{
                                        mb: 2,
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: '#d1fae5',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: '#10b981',
                                        }
                                    }}
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Medium Priority</Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {getPriorityPercentage('medium')}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={getPriorityPercentage('medium')}
                                    sx={{
                                        mb: 2,
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: '#fef3c7',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: '#f59e0b',
                                        }
                                    }}
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">High Priority</Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {getPriorityPercentage('high')}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={getPriorityPercentage('high')}
                                    sx={{
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: '#fee2e2',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: '#ef4444',
                                        }
                                    }}
                                />
                            </Box>
                        </Paper>
                    </motion.div>
                </Grid> */}
            </Grid>
        </Box>
    );
};

export default TaskStats;