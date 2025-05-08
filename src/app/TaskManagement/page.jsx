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

import { Header } from '../Components/Header';
import { AxiosInstance } from '../Middlewares/GlobalUrlErrorHandler';
import TaskAssign from './TaskComponent/TaskBoard';
import TaskColumn from './TaskComponent/TaskColumn';
import TaskFilter from './TaskComponent/TaskFilter';
import TaskForm from './TaskComponent/TaskForm';
import TaskStats from './TaskComponent/TaskStats';


const TaskContent = () => {
    const [currentView, setCurrentView] = useState('task');
    const [formOpen, setFormOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [getCurrentTask, setGetCurrentTask] = useState([])
    const [getAssignTask, setGetAssignTask] = useState([])
    const [getUpdatedId, setGetUpdatedId] = useState(null)

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
    }, []);

    // Current Data
    useEffect(() => {
        let isMounted = true;
        let timeoutId;

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

                if (isMounted) {
                    setGetCurrentTask(res.data);
                }
            } catch (err) {
                console.log('Fetch failed:', err);
            } finally {
                if (isMounted) {
                    timeoutId = setTimeout(fetchTasks, 5000);
                }
            }
        };

        fetchTasks();
        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        let timeoutId;

        const fetchTasks = async () => {
            try {
                const localStorageData = JSON.parse(localStorage.getItem('LocalUser'));
                const username = localStorageData?.username;
                const token = localStorage.getItem('token');

                // Stop execution if token or username is missing
                if (!username || !token) {
                    return;
                }

                const res = await AxiosInstance.post('/task/GetAssignTaskData', { username }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                if (isMounted) {
                    setGetAssignTask(res.data);
                }
            } catch (err) {
                console.error('Fetch failed:', err);
            } finally {
                if (isMounted) {
                    timeoutId = setTimeout(fetchTasks, 5000);
                }
            }
        };

        fetchTasks();
        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, []);


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

    // localStorage.setItem('LocalUser', JSON.stringify(err.data.message))
    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ px: 3, py: 2 }}>
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

                {currentView === 'task' && (
                    <TaskFilter
                        source="task"
                        getCurrentTask={getCurrentTask}
                        filters={filters}
                        setFilters={setFilters}
                        filteringCurrentData={filteringCurrentData}
                    />
                )}
                {currentView === 'assign' && (
                    <TaskFilter
                        source="assign"
                        getAssignTask={getAssignTask}
                        filters={filters}
                        setFilters={setFilters}
                        filteringAssignData={filteringAssignData}
                    />
                )}

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
                        {currentView === 'task' && <TaskColumn getCurrentTask={getCurrentTask} setGetUpdatedId={setGetUpdatedId} setFormOpen={setFormOpen} filteringCurrentData={filteringCurrentData} />}
                        {currentView === 'assign' && <TaskAssign getAssignTask={getAssignTask} getCurrentTask={getCurrentTask} setGetUpdatedId={setGetUpdatedId} setFormOpen={setFormOpen} filteringAssignData={filteringAssignData} />}
                        {currentView === 'stats' && <TaskStats getCurrentTask={getCurrentTask} getAssignTask={getAssignTask} />}
                    </motion.div>
                </AnimatePresence>
            </Box>
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
        </Box>
    );
};

const TaskManagement = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 10 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                    <TaskContent />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default TaskManagement;