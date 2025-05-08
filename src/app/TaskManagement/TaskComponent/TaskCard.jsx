'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, Chip, Box, IconButton, Checkbox } from '@mui/material';
import {
    Clock,
    Trash2,
    Edit,
} from 'lucide-react';
import { PRIORITY_COLORS } from './TaskForm';

const TaskCard = ({ task, setGetUpdatedId, setFormOpen, setDeleteTaskId }) => {

    const Progress = ({ progress }) => {
        let progressValue;
        switch (progress) {
            case 'Pending':
                return progressValue = '#ffc3c5';
            case 'In Progress':
                return progressValue = '#a7faf6';
            case 'Archived':
                return progressValue = '#dcf9a6';
            case 'Completed':
                return progressValue = '#6ee7b7';
            default:
                return progressValue = '#ffc3c5';
        }
    };

    const Priority = ({ progress }) => {
        let progressValue;
        switch (progress) {
            case 'Low':
                return progressValue = '#ffc3c5';
            case 'Medium':
                return progressValue = '#a7faf6';
            case 'High':
                return progressValue = '#dcf9a6';
            case 'Critical':
                return progressValue = '#6ee7b7';
            default:
                return progressValue = '#ffc3c5';
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%', marginBottom: '12px' }}
        >
            {/* {task && task?.length > 0 ? task.map((item, index) => ( */}
            <Card
                sx={{
                    position: 'relative',
                    opacity: task.status === 'Completed' ? 0.8 : 1,
                    borderLeft: `4px solid ${PRIORITY_COLORS[task.priority]}`,
                }}
                key={`Index-${task?.title}`}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                            <Checkbox
                                checked={task.status === 'Completed'}
                                sx={{ mt: -0.5, mr: 1 }}
                            />
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textDecoration: task.status === 'Completed' ? 'line-through' : 'none',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        mb: 0.5,
                                        width: 240,
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 1,
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {task.title}
                                </Typography>
                                {task.description && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mb: 1.5,
                                            width: 240,
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {task.description}
                                    </Typography>

                                )}
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <IconButton size="small" onClick={() => {
                                setGetUpdatedId(task?.id)
                                setFormOpen(true)
                            }}>
                                <Edit size={16} />
                            </IconButton>
                            <IconButton size="small" onClick={() => {
                                setDeleteTaskId(task?.id)
                            }}>
                                <Trash2 size={16} />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>

                        <Chip
                            icon={<Clock size={14} />}
                            label={task?.status}
                            size="small"
                            color={Progress(task?.status)}
                            sx={{
                                height: '24px',
                                '& .MuiChip-label': { px: 1, fontSize: '0.75rem' },
                                '& .MuiChip-icon': { ml: 0.5 }
                            }}
                        />
                        <Chip
                            icon={<Clock size={14} />}
                            label={task?.priority}
                            size="small"
                            color={Priority(task?.priority)}
                            sx={{
                                height: '24px',
                                '& .MuiChip-label': { px: 1, fontSize: '0.75rem' },
                                '& .MuiChip-icon': { ml: 0.5 }
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default TaskCard;