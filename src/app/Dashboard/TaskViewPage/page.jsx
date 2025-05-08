'use client';
import { Box, Button, Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, styled, TextField, Typography } from '@mui/material'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Filter, Info, PackageCheck, Pencil, Search, Trash2 } from 'lucide-react';
import { AxiosInstance } from '@taskManager/app/Middlewares/GlobalUrlErrorHandler';
import { motion } from 'framer-motion'

const TaskView = ({ viewData, setViewData, getTask, setUpdateFormData, viewSingleData, setViewSingleData }) => {
    return (
        <Card sx={{ height: '100%', borderRadius: 3, display: viewSingleData ? 'none' : 'block' }}>
            <Button startIcon={<PackageCheck />} sx={{ zIndex: 2, position: 'relative', top: 30, left: 30 }} onClick={() => setViewData(false)}>Back</Button>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ textAlign: 'center', position: 'relative', bottom: 30 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 20 }}>Task Data</Typography>
                </Box>
                <BasicTable getTask={getTask} setUpdateFormData={setUpdateFormData} setViewSingleData={setViewSingleData} />
            </CardContent>
        </Card>
    );
};

export default TaskView

const ListHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
}));
const SearchFilterContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
        marginTop: 0,
        flexDirection: 'row',
        width: 'auto',
    },
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


function BasicTable({ getTask, setUpdateFormData, setViewSingleData }) {
    const [searchTerm, setSearchTerm] = React.useState('')
    const [filterPriority, setFilterPriority] = React.useState('All');
    const [filterStatus, setFilterStatus] = React.useState('All');

    const handlePriorityFilterChange = (event) => {
        setFilterPriority(event.target.value);
    };

    const handleStatusFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await AxiosInstance.delete(`/task/DeleteTaskById/${id}`)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    const filteredTasks = React.useMemo(() => {
        if (!getTask) return [];

        return getTask.filter((task) => {
            const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
            const matchesStatus = filterStatus === 'All' || task.status === filterStatus;

            return matchesSearch && matchesPriority && matchesStatus;
        });
    }, [getTask, searchTerm, filterPriority, filterStatus]);

    // Debounce logic
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const handleSearch = debounce((value) => {
        setSearchTerm(value);
    }, 300);

    const EmptyState = styled(Box)(({ theme }) => ({
        textAlign: 'center',
        padding: theme.spacing(4),
        marginTop: theme.spacing(2),
    }));


    return (
        <>
            <ListHeader>
                <Typography variant="h5" fontWeight={600} >
                    My Tasks ({filteredTasks.length})
                </Typography>

                <SearchFilterContainer>
                    <TextField
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ width: { xs: '100%', sm: '200px' } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={18} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: '120px' } }}>
                        <InputLabel id="priority-filter-label">Priority</InputLabel>
                        <Select
                            labelId="priority-filter-label"
                            id="priority-filter"
                            value={filterPriority}
                            label="Priority"
                            onChange={handlePriorityFilterChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Filter size={16} />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value={Priority.LOW}>{Priority.LOW}</MenuItem>
                            <MenuItem value={Priority.MEDIUM}>{Priority.MEDIUM}</MenuItem>
                            <MenuItem value={Priority.HIGH}>{Priority.HIGH}</MenuItem>
                            <MenuItem value={Priority.CRITICAL}>{Priority.CRITICAL}</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: '140px' } }}>
                        <InputLabel id="status-filter-label">Status</InputLabel>
                        <Select
                            labelId="status-filter-label"
                            id="status-filter"
                            value={filterStatus}
                            label="Status"
                            onChange={handleStatusFilterChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Filter size={16} />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value={Status.PENDING}>{Status.PENDING}</MenuItem>
                            <MenuItem value={Status.IN_PROGRESS}>{Status.IN_PROGRESS}</MenuItem>
                            <MenuItem value={Status.ARCHIVED}>{Status.ARCHIVED}</MenuItem>
                            <MenuItem value={Status.COMPLETED}>{Status.COMPLETED}</MenuItem>
                        </Select>
                    </FormControl>
                </SearchFilterContainer>
            </ListHeader>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <div style={{ height: 280, width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'black', fontWeight: 700 }}>Title</TableCell>
                                <TableCell align="left" sx={{ width: 400, color: 'black', fontWeight: 700 }}>Description</TableCell>
                                <TableCell align="left" sx={{ color: 'black', fontWeight: 500 }}>Due Date</TableCell>
                                <TableCell align="left" sx={{ color: 'black', fontWeight: 500 }}>Priority</TableCell>
                                <TableCell align="left" sx={{ color: 'black', fontWeight: 500 }}>Status</TableCell>
                                <TableCell align="left" sx={{ color: 'black', fontWeight: 500 }}>Edit</TableCell>
                                <TableCell align="left" sx={{ color: 'black', fontWeight: 500 }}>Delete</TableCell>
                                <TableCell align="left" sx={{ color: 'black', fontWeight: 500 }}>Info</TableCell>
                            </TableRow>
                        </TableHead>
                        {(filteredTasks?.length > 0 ? filteredTasks : Array.isArray(getTask) && getTask)?.length > 0 ? (
                            <TableBody>
                                {(filteredTasks?.length > 0 ? filteredTasks : Array.isArray(getTask) && getTask).map((row, index) => (
                                    <TableRow
                                        key={`${row.title}-${index}`}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                                            {row.title}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 2,
                                                textOverflow: 'ellipsis',
                                                width: 400,
                                            }}
                                        >
                                            {row.description}
                                        </TableCell>
                                        <TableCell align="left">{row.dueDate?.split('T')[0]}</TableCell>
                                        <TableCell align="left">{row.priority}</TableCell>
                                        <TableCell align="left">{row.status}</TableCell>
                                        <TableCell align="left">
                                            <IconButton onClick={() => {
                                                setUpdateFormData(row?.id)
                                            }}>
                                                <Pencil color="green" />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="left">
                                            <IconButton onClick={() => handleDelete(row?.id)}>
                                                <Trash2 color="red" />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="left">
                                            <IconButton onClick={() => setViewSingleData(true)}>
                                                <Info color='blue' />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        ) : (
                            <TableBody >
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <EmptyState>
                                                <Typography variant="body1" color="text.secondary">
                                                    {Array.isArray(getTask) && getTask?.length === 0
                                                        ? "You don't have any tasks yet. Create your first task!"
                                                        : "No tasks match your search or filters."}
                                                </Typography>
                                            </EmptyState>
                                        </motion.div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </div>
                </Table>
            </TableContainer>
        </>
    );
}
