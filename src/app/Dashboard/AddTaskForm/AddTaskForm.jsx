'use client';

import React, { useState, useEffect, use } from 'react';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    Paper,
    SelectChangeEvent,
    Card,
    Autocomplete,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { styled } from '@mui/material/styles';
import { Save, X } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { AxiosInstance } from '@taskManager/app/Middlewares/GlobalUrlErrorHandler';
import { Grid } from '@mui/system';


const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
}));

const Priority = {
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    CRITICAL: 'Critical'
}
const Status = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    ARCHIVED: 'Archived'
}

const DatePicker = dynamic(
    () => import('@mui/x-date-pickers/DatePicker').then((mod) => mod.DatePicker),
    {
        ssr: false,
        loading: () => <TextField label="Due Date" fullWidth />
    }
);

const FormActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

const DashboardTaskForm = ({
    isEditing,
    updateFormData,
    setUpdateFormData,
    userData, getUpdatedId, setGetUpdatedId, setFormOpen
}) => {
    const [title, setTitle] = useState('');
    const [assignedTo, setAssignedTo] = useState('')
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [priority, setPriority] = useState(Priority.MEDIUM);
    const [status, setStatus] = useState(Status.IN_PROGRESS);
    const [errors, setErrors] = useState({});
    const [getTask, setGetTask] = useState([])
    const [loading, setLoading] = useState(false);
    const [filterTheUser, setFilterTheUser] = useState([])

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem('LocalUser'));
        const filterTheUser = userData?.filter((item) => item?.username !== localStorageData?.username);
        setFilterTheUser(filterTheUser)
    }, [userData])

    const UpdatedId = updateFormData || getUpdatedId

    const validate = () => {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = 'Title is required.';
        } else if (title.trim().length < 3) {
            newErrors.title = 'Title must be at least 3 characters.';
        } else if (title.trim().length > 100) {
            newErrors.title = 'Title must not exceed 100 characters.';
        }

        if (!description.trim()) {
            newErrors.description = 'Description is required.';
        } else if (description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters.';
        } else if (description.trim().length > 1000) {
            newErrors.description = 'Description must not exceed 1000 characters.';
        }

        if (!priority || !priority.trim()) {
            newErrors.priority = 'Priority is required.';
        }

        if (!dueDate || !(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
            newErrors.dueDate = 'Valid due date is required.';
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (dueDate < today) {
                newErrors.dueDate = 'Due date must be in the future.';
            }
        }

        const assignFilter = typeof assignedTo === 'string' ? assignedTo.trim() : '';

        if (assignFilter) {
            setAssignedTo(assignFilter); // this should ideally happen inside Autocomplete change handlers
        }

        // Find user by username match
        const filterAssignUser = filterTheUser.findIndex(user => user.username === assignFilter);

        // Validation
        if (!assignFilter) {
            newErrors.assignedTo = 'Assigned value is required.';
        } else if (filterAssignUser === -1) {
            newErrors.assignedTo = 'Username is not matched. Please select a valid username.';
        }

        console.log('assignFilter:', assignFilter, 'index:', filterAssignUser);

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // task/CreateTask

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        console.log(errors)
        if (!validate()) return;

        const formData = {
            title,
            description,
            status,
            dueDate: dueDate.toISOString().split('T')[0],
            priority,
            assignedTo
        };

        try {
            console.log(formData);

            await AxiosInstance.post('/task/CreateTask', formData)
                .then((res) => {
                    console.log(res)
                    setTitle('');
                    setDescription('');
                    setDueDate(null);
                    setPriority(Priority.MEDIUM);
                    setStatus(Status.IN_PROGRESS);
                    setAssignedTo('')
                })
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const id = UpdatedId;
        if (!validate()) return;

        const formData = {
            title,
            description,
            status,
            dueDate: dueDate.toISOString().split('T')[0],
            priority
        };
        try {
            await AxiosInstance.put(`/task/UpdateTaskById/${id}`, formData)
                .then((res) => {
                    console.log(res);
                    setTitle('');
                    setDescription('');
                    setDueDate(null);
                    setPriority(Priority.MEDIUM);
                    setStatus(Status.IN_PROGRESS);
                    setUpdateFormData(null)
                    setGetUpdatedId(null)
                })
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    // Get all data
    useEffect(() => {
        async function GetUserData() {
            if (!UpdatedId) return;
            const token = localStorage.getItem('token')

            if (token) {
                try {
                    const response = await AxiosInstance.get('/task/getAllTasks', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const filtering = Array.isArray(response?.data)
                        ? response?.data.filter((item) => item.id === UpdatedId)
                        : [response?.data].filter((item) => item.id === UpdatedId);

                    if (filtering?.length > 0) {
                        const task = filtering[0];
                        setGetTask(filtering);
                        setTitle(task.title);
                        setDescription(task.description);
                        setDueDate(new Date(task.dueDate));
                        setPriority(task.priority);
                        setStatus(task.status);
                    }
                } catch (error) {
                    // Handle request errors
                    console.error('Error fetching tasks:', error);
                }
            } else {
                console.warn('No token found in localStorage');
            }
        }
        GetUserData();
    }, [UpdatedId]);


    // Reset form
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setDueDate(null);
        setPriority(Priority.MEDIUM);
        setStatus(Status.TODO);
        setErrors({});
        setUpdateFormData(null);
        setGetUpdatedId(null);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginTop: 15 }}
        >
            <FormContainer elevation={2}>
                <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 700, color: 'inherit', fontSize: '2.2em' }} gutterBottom>
                    {UpdatedId ? 'Edit Task' : 'Create New Task'}
                </Typography>
                <form onSubmit={UpdatedId ? handleUpdateSubmit : handleCreateSubmit}>

                    <Grid spacing={2} container>
                        <Grid size={{ xs: 12, md: 6 }} sx={{ position: 'relative' }}>
                            <TextField
                                label="Title"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                margin="normal"
                                variant="outlined"
                                error={!!errors.title}
                                helperText={errors.title}
                                required
                            />

                            <Autocomplete
                                options={filterTheUser}
                                getOptionLabel={(option) => option.username || ''}
                                value={filterTheUser.find((user) => user.username === assignedTo) || null}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        setAssignedTo(newValue.username); // store just the username
                                    }
                                }}
                                onInputChange={(event, newInputValue) => {
                                    setAssignedTo(newInputValue); // also handle free text typing
                                }}
                                loading={loading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Assigned To"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mt: 2.2 }}
                                        error={!!errors.assignedTo}
                                        helperText={errors.assignedTo}
                                    />
                                )}
                            />

                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Description"
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                margin="normal"
                                variant="outlined"
                                error={!!errors.description}
                                helperText={errors.description}
                                multiline
                                rows={4.5}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Due Date"
                                value={dueDate}
                                minDate={new Date().toISOString().split('T')[0]}
                                onChange={(newDate) => setDueDate(newDate)}
                                slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                                onError={!!errors.dueDate}
                                required

                            />
                        </LocalizationProvider>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="priority-label">Priority</InputLabel>
                            <Select
                                labelId="priority-label"
                                id="priority"
                                value={priority}
                                onChange={handlePriorityChange}
                                error={!!errors.priority}
                                label="Priority"
                            >
                                <MenuItem value={Priority.LOW}>{Priority.LOW}</MenuItem>
                                <MenuItem value={Priority.MEDIUM}>{Priority.MEDIUM}</MenuItem>
                                <MenuItem value={Priority.HIGH}>{Priority.HIGH}</MenuItem>
                                <MenuItem value={Priority.CRITICAL}>{Priority.CRITICAL}</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                id="status"
                                value={status}
                                label="Status"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value={Status.PENDING}>{Status.PENDING}</MenuItem>
                                <MenuItem value={Status.IN_PROGRESS}>{Status.IN_PROGRESS}</MenuItem>
                                <MenuItem value={Status.ARCHIVED}>{Status.ARCHIVED}</MenuItem>
                                <MenuItem value={Status.COMPLETED}>{Status.COMPLETED}</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Box sx={{ mt: 3, color: 'red' }}>
                            <Typography>&rarr; {errors.title || errors.description || errors.dueDate || errors.status || errors.priority}</Typography>
                        </Box>

                        <FormActions>
                            <Button
                                variant="outlined"
                                color="inherit"
                                startIcon={<X size={18} />}
                                onClick={resetForm}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<Save size={18} />}
                                onClick={() => {
                                    setFormOpen(false)
                                }}
                            >
                                {updateFormData ? 'Update Task' : 'Create Task'}
                            </Button>
                        </FormActions>
                    </Box>
                </form>
            </FormContainer>
        </motion.div>
    );
};

export default DashboardTaskForm;