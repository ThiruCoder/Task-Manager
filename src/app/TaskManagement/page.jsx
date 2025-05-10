'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    AppBar,
    Toolbar,
    Paper,
    Tabs,
    Tab,
    useMediaQuery,
    useTheme,
    ThemeProvider,
    CssBaseline
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PlusCircle,
    KanbanSquare,
    ListTodo,
    BarChart4,
    SunMoon,
    Menu
} from 'lucide-react';

import { AxiosInstance } from '../Middlewares/GlobalUrlErrorHandler';
import TaskAssign from './TaskComponent/TaskAssign';
import TaskFilter from './TaskComponent/TaskFilter';
import TaskForm from './TaskComponent/TaskForm';
import TaskStats from './TaskComponent/TaskStats';
import TaskCurrent from './TaskComponent/TaskCurrent';
import TaskViewPage from './TaskComponent/TaskViewPage';
import { Grid } from '@mui/system';
import Header from '../Components/Header';


const TaskContent = () => {
    const [currentView, setCurrentView] = useState('task');
    const [formOpen, setFormOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [getCurrentTask, setGetCurrentTask] = useState([])
    const [getAssignTask, setGetAssignTask] = useState([])
    const [getUpdatedId, setGetUpdatedId] = useState(null)
    const [deleteTaskId, setDeleteTaskId] = useState(null)
    const [taskView, setTaskView] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false);
    const [taskData, setTaskData] = React.useState(null);
    // console.log('taskView', taskView);

    const [filters, setFilters] = useState({
        search: '',
        priority: '',
        status: '',
    });

    const handleViewChange = (event, newValue) => {
        setCurrentView(newValue);
    };

    const handleFormSubmit = () => {
        setFormOpen(false);
    };



    useEffect(() => {
        if (typeof window !== 'undefined') {
            const localStorageData = JSON.parse(localStorage.getItem('LocalUser'));
            const username = localStorageData?.username;
            setUsername(username)
        }
    }, [refresh]);

    // Current Data
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const localStorageData = JSON.parse(localStorage.getItem('LocalUser'));
                const username = localStorageData?.username
                const token = localStorage.getItem('token')
                if (!username || !token) {
                    return;
                }
                const res = await AxiosInstance.post('/task/GetCurrentTaskData', { username }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                if (res) {
                    setGetCurrentTask(res.data);
                    setRefresh(!refresh)
                }
            } catch (err) {
                console.log('Fetch failed:', err);
            }
        };
        fetchTasks();
    }, [refresh]);

    // Assign Data
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const localStorageData = JSON.parse(localStorage.getItem('LocalUser'));
                const username = localStorageData?.username;
                const token = localStorage.getItem('token');

                if (!username || !token) {
                    return;
                }
                const res = await AxiosInstance.post('/task/GetAssignTaskData', { username }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                if (res) {
                    setGetAssignTask(res.data);
                    setRefresh(!refresh)
                }
            } catch (err) {
                console.error('Fetch failed:', err);
            }
        };

        fetchTasks();
    }, [refresh]);

    // Delete Data
    useEffect(() => {
        const deleteTask = async () => {
            try {
                const localStorageData = JSON.parse(localStorage.getItem('LocalUser'));
                const username = localStorageData?.username;
                const token = localStorage.getItem('token');

                if (!username || !token || !deleteTaskId) return;

                const res = await AxiosInstance.delete(`/task/DeleteTaskById/${deleteTaskId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                if (res) {
                    setDeleteTaskId(null)
                    setRefresh(!refresh)
                    setTaskData(null)
                    setRefresh(!refresh)
                }
            } catch (err) {
                console.error('Deletion failed:', err);
            }
        };

        if (deleteTaskId) {
            deleteTask();
        }
    }, [deleteTaskId, refresh]);

    // Current Data filtering
    const filteringCurrentData = useMemo(() => {
        const searchTerm = filters?.search?.toLowerCase().trim() || '';

        return getCurrentTask.filter((task) => {
            const title = task?.title?.toLowerCase() || '';
            const description = task?.description?.toLowerCase() || '';

            const searchFilter = title.includes(searchTerm) || description.includes(searchTerm);
            const priorityFilter = !filters.priority || task?.priority === filters.priority;
            const statusFilter = !filters.status || task?.status === filters.status;

            const isMatch = searchFilter && priorityFilter && statusFilter;

            return isMatch;
        });
    }, [getCurrentTask, filters]);

    // Assign Data filtering
    const filteringAssignData = useMemo(() => {
        const searchTerm = filters?.search?.toLowerCase().trim() || '';

        return getAssignTask.filter((task) => {
            const title = task?.title?.toLowerCase() || '';
            const description = task?.description?.toLowerCase() || '';

            const searchFilter = title.includes(searchTerm) || description.includes(searchTerm);
            const priorityFilter = !filters.priority || task?.priority === filters.priority;
            const statusFilter = !filters.status || task?.status === filters.status;

            const isMatch = searchFilter && priorityFilter && statusFilter;

            return isMatch;
        });
    }, [getAssignTask, filters]);

    const handleClickOpen = () => {
        setOpen(true);
    };


    // console.log(getUpdatedId);

    const handleClose = () => {
        setOpen(false);
        setTaskView(null)
    };

    useEffect(() => {
        if (formOpen) {
            setOpen(false);
        }
    }, [formOpen]);


    // console.log(formOpen);


    // console.log('getUpdatedId', getUpdatedId);

    // localStorage.setItem('LocalUser', JSON.stringify(err.data.message))
    return (
        <Container>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" fontWeight="bold">
                            {currentView === 'task' || currentView === 'assign' ? 'Task Board' : 'Task Analytics'} {username === 'Token is required.' ? `(${username})` : null}
                        </Typography>
                        {username ?
                            <Button
                                variant="contained"
                                disableElevation
                                startIcon={<PlusCircle size={18} />}
                                onClick={() => setFormOpen(true)}
                                sx={{ borderRadius: 28, px: 3 }}
                            >
                                Add Task
                            </Button>
                            : null}
                    </Box>

                    {/* For current Task */}
                    {currentView === 'task' && (
                        <TaskFilter
                            source="task"
                            getCurrentTask={getCurrentTask}
                            filters={filters}
                            setFilters={setFilters}
                            filteringCurrentData={filteringCurrentData}
                        />
                    )}
                    {/* For assign Task */}
                    {currentView === 'assign' && (
                        <TaskFilter
                            source="assign"
                            getAssignTask={getAssignTask}
                            filters={filters}
                            setFilters={setFilters}
                            filteringAssignData={filteringAssignData}
                        />
                    )}

                    {/* For Tabs */}
                    <Paper sx={{ mb: 3 }}>
                        <Tabs
                            value={currentView}
                            onChange={handleViewChange}
                            sx={{
                                '& .MuiTabs-indicator': {
                                    height: 3,
                                    borderRadius: 1.5,
                                },
                            }}
                        >
                            <Tab
                                value="task"
                                label="Task View"
                                icon={<KanbanSquare size={10} />}
                                iconPosition="start"
                            />
                            <Tab
                                value="assign"
                                label="Assign View"
                                icon={<KanbanSquare size={10} />}
                                iconPosition="start"
                            />
                            <Tab
                                value="stats"
                                label="Analytics"
                                icon={<BarChart4 size={10} />}
                                iconPosition="start"
                            />
                        </Tabs>
                    </Paper>
                </Box>

                <Box sx={{ px: 3, flex: 1, overflowY: 'auto', height: '100%' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentView}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            style={{ height: '100%' }}
                        >
                            {/* Current Task Data */}
                            {currentView === 'task' && <TaskCurrent
                                getCurrentTask={getCurrentTask}
                                setGetUpdatedId={setGetUpdatedId}
                                setFormOpen={setFormOpen}
                                filteringCurrentData={filteringCurrentData}
                                setDeleteTaskId={setDeleteTaskId}
                                setTaskView={setTaskView}
                                handleClickOpen={handleClickOpen}
                            />}

                            {/* Assign Task Data */}
                            {currentView === 'assign' && <TaskAssign
                                getAssignTask={getAssignTask}
                                getCurrentTask={getCurrentTask}
                                setGetUpdatedId={setGetUpdatedId}
                                setFormOpen={setFormOpen}
                                filteringAssignData={filteringAssignData}
                                setDeleteTaskId={setDeleteTaskId}
                                setTaskView={setTaskView}
                                handleClickOpen={handleClickOpen}
                            />}

                            {/* Stats Task Data */}
                            {currentView === 'stats' && <TaskStats
                                getCurrentTask={getCurrentTask}
                                getAssignTask={getAssignTask} />}
                        </motion.div>
                    </AnimatePresence>
                </Box>

                {/* Form */}
                {username ?
                    <TaskForm
                        open={formOpen}
                        onClose={() => setFormOpen(false)}
                        onSubmit={handleFormSubmit}
                        getUpdatedId={getUpdatedId}
                        setGetUpdatedId={setGetUpdatedId}
                        setFormOpen={setFormOpen}
                    />
                    : null}

                {/* Task View Page */}
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <React.Fragment>
                            {open ?
                                <TaskViewPage
                                    handleClose={handleClose}
                                    handleClickOpen={handleClickOpen}
                                    taskView={taskView}
                                    open={open}
                                    setOpen={setOpen}
                                    getAssignTask={getAssignTask}
                                    getCurrentTask={getCurrentTask}
                                    currentView={currentView}
                                    setDeleteTaskId={setDeleteTaskId}
                                    taskData={taskData}
                                    setTaskData={setTaskData}
                                    getUpdatedId={getUpdatedId}
                                    setGetUpdatedId={setGetUpdatedId}
                                    setFormOpen={setFormOpen}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                                : null}
                        </React.Fragment>
                    </Grid>
                    {/* <Grid size={{ xs: 12, md: 6 }}></Grid> */}
                </Grid>
            </Box>
        </Container>
    );
};

const TaskManagement = () => {
    const [tokenExisted, setTokenExisted] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header tokenExisted={tokenExisted} setTokenExisted={setTokenExisted} />
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 10 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                    <TaskContent />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default TaskManagement;