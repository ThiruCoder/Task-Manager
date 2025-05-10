'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import { PenBoxIcon, Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import { Grid } from '@mui/system';



const TaskCurrent = ({
    getCurrentTask,
    setGetUpdatedId,
    setFormOpen,
    filteringCurrentData,
    setDeleteTaskId,
    setTaskView,
    handleClickOpen,
}) => {

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


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <Grid container spacing={2} sx={{ mb: 8 }}>

                {(filteringCurrentData && filteringCurrentData.length > 0) ? (
                    filteringCurrentData.map((item, index) => (
                        <Grid key={`${item?.id}-${index}`} size={{ xs: 12, md: 4 }} sx={{ height: { md: 220 }, bgcolor: `${Progress(item?.status)}`, mb: 3 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    bgcolor: `${Progress(item?.status)}`,
                                    borderRadius: 2,
                                    p: 2,
                                    flexDirection: 'column',
                                    height: 220
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 2,
                                    pb: 1,
                                    borderBottom: '1px solid',
                                    borderColor: `${<Progress progress={item?.status} />}80`,
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight="600"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {item.title}
                                            <Box
                                                component="span"
                                                sx={{
                                                    ml: 1,
                                                    backgroundColor: `${<Progress progress={item?.status} />}80`,
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    borderRadius: '50%',
                                                    width: 24,
                                                    height: 24,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                {/* {getTask.length} */}
                                            </Box>
                                        </Typography>
                                    </Box>

                                    <IconButton
                                        size="small"
                                        onClick={() => setFormOpen(true)}
                                        sx={{
                                            bgcolor: `${<Progress progress={item?.status} />}80`,
                                            '&:hover': {
                                                bgcolor: `${<Progress progress={item?.status} />}`,
                                            }
                                        }}
                                    >
                                        <Plus size={16} />
                                    </IconButton>
                                </Box>

                                <Box sx={{
                                    overflowY: 'auto',
                                    flex: 1,
                                    '&::-webkit-scrollbar': {
                                        width: '4px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        background: 'transparent',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: `${<Progress progress={item?.status} />}90`,
                                        borderRadius: '10px',
                                    },

                                }}>
                                    <motion.div layout>
                                        <TaskCard
                                            task={item}
                                            setGetUpdatedId={setGetUpdatedId}
                                            setFormOpen={setFormOpen}
                                            setDeleteTaskId={setDeleteTaskId}
                                            setTaskView={setTaskView}
                                            handleClickOpen={handleClickOpen}
                                        />
                                    </motion.div>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                ) : (getCurrentTask && getCurrentTask.length > 0 ? (
                    getCurrentTask.map((item, index) => (
                        <Grid key={`${item?.id}-${index}`} size={{ xs: 12, md: 4 }} sx={{ height: { md: 220 }, bgcolor: `${Progress(item?.status)}`, mb: 3 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    bgcolor: `${Progress(item?.status)}`,
                                    borderRadius: 2,
                                    flexDirection: 'column',
                                    height: 220,
                                    p: 2,
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 2,
                                    pb: 1,
                                    borderBottom: '1px solid',
                                    borderColor: `${<Progress progress={item?.status} />}80`,
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight="600"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {item.title}
                                            <Box
                                                component="span"
                                                sx={{
                                                    ml: 1,
                                                    backgroundColor: `${<Progress progress={item?.status} />}80`,
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    borderRadius: '50%',
                                                    width: 24,
                                                    height: 24,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                {/* {getTask.length} */}
                                            </Box>
                                        </Typography>
                                    </Box>

                                    <IconButton
                                        size="small"
                                        onClick={() => setFormOpen(true)}
                                        sx={{
                                            bgcolor: `${<Progress progress={item?.status} />}80`,
                                            '&:hover': {
                                                bgcolor: `${<Progress progress={item?.status} />}`,
                                            }
                                        }}
                                    >
                                        <Plus size={16} />
                                    </IconButton>
                                </Box>

                                <Box sx={{
                                    overflowY: 'auto',
                                    flex: 1,
                                    '&::-webkit-scrollbar': {
                                        width: '4px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        background: 'transparent',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: `${<Progress progress={item?.status} />}90`,
                                        borderRadius: '10px',
                                    },
                                }}>
                                    <motion.div layout>
                                        <TaskCard task={item} setGetUpdatedId={setGetUpdatedId} setFormOpen={setFormOpen} />
                                    </motion.div>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Grid size={{ xs: 12, md: 4 }} sx={{ height: { md: 'calc(100vh - 200px)' } }}>
                        <Box
                            sx={{
                                height: '100px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px dashed',
                                borderColor: `#ffc3c5`,
                                borderRadius: 2,
                                p: 2,
                                mt: 1
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                No tasks yet
                            </Typography>
                        </Box>
                    </Grid>
                ))}

            </Grid>
        </motion.div>
    );
};

export default TaskCurrent;



