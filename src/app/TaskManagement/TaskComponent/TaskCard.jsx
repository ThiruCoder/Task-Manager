'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, Chip, Box, IconButton, Checkbox, CardHeader, Button } from '@mui/material';
import {
    Clock,
    Trash2,
    Edit,
    TableOfContents,
} from 'lucide-react';
import { PRIORITY_COLORS } from './TaskForm';

const TaskCard = ({ task, setGetUpdatedId, setFormOpen, setDeleteTaskId, setTaskView, handleClickOpen }) => {

    const Progress = (status) => {
        switch (status) {
            case 'Pending': return '#ffc3c5';
            case 'In Progress': return '#a7faf6';
            case 'Archived': return '#dcf9a6';
            case 'Completed': return '#6ee7b7';
            default: return '#e0e0e0';
        }
    };

    const Priority = (priority) => {
        switch (priority) {
            case 'Low': return '#ffc3c5';
            case 'Medium': return '#a7faf6';
            case 'High': return '#dcf9a6';
            case 'Critical': return '#6ee7b7';
            default: return '#e0e0e0';
        }
    };

    return (
        <Card
            sx={{
                position: 'relative',
                opacity: task.status === 'Completed' ? 0.8 : 1,
                borderLeft: `4px solid ${PRIORITY_COLORS[task.priority]}`,
            }}
            key={`Index-${task?.title}`}
        >
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} >

                    <CardHeader
                        sx={{ p: 0 }}
                        title={
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{task?.title}</Typography>
                        } subheader={
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    lineHeight: '1.5em',
                                    height: '3em',
                                }}
                            >
                                {task?.description}
                            </Typography>
                        }
                        action={
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box>
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
                        }

                    />

                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', position: 'relative', top: 14, alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                            icon={<Clock size={14} />}
                            label={task?.status}
                            size="small"
                            color={Progress(task?.status)}
                            sx={{
                                height: '24px',
                                '& .MuiChip-label': { px: 1, fontSize: '0.75rem' },
                                '& .MuiChip-icon': { ml: 0.5 },
                                bgcolor: Progress(task?.status)
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
                                '& .MuiChip-icon': { ml: 0.5 },
                                bgcolor: Progress(task?.status)
                            }}
                        />
                    </Box>
                    <Box sx={{}}>
                        <Button sx={{
                        }} startIcon={<TableOfContents size={15} />}
                            onClick={() => {
                                setTaskView(task?.id);
                                handleClickOpen()
                            }}
                        >View</Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskCard;