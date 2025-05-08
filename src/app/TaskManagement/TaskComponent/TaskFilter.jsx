'use client';

import React, { useState } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Collapse,
    Button,
    IconButton,
    Typography
} from '@mui/material';
import { Search, Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Priority = [
    { title: "Low" },
    { title: "Medium" },
    { title: "High" },
    { title: 'Critical' }
]
const Status = [
    { title: "Pending" },
    { title: "In Progress" },
    { title: "Completed" },
    { title: 'Archived' }
]


const TaskFilter = ({ onFilterChange, filters, setFilters, filteringCurrentData, filteringAssignData, source }) => {
    const [expanded, setExpanded] = useState(false);
    const [visible, setVisible] = useState(false)

    const handleSearchChange = (e) => {
        const newFilters = {
            ...filters,
            search: e.target.value,
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };


    const handlePriorityChange = (e) => {
        const newFilters = {
            ...filters,
            priority: typeof e.target.value === 'string'
                && e.target.value,
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleStatusChange = (e) => {
        const newFilters = {
            ...filters,
            status: typeof e.target.value === 'string'
                && e.target.value,
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleClearFilters = () => {
        const newFilters = {
            search: '',
            priority: [],
            status: [],
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const hasActiveFilters = filters.search ||
        filters.priority.length > 0 ||
        filters.status.length > 0
    const filteredLength =
        source === 'task' ? filteringCurrentData?.length : filteringAssignData?.length;
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <TextField
                        placeholder="Search tasks..."
                        value={filters.search}
                        onChange={handleSearchChange}
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={18} />
                                </InputAdornment>
                            ),
                            endAdornment: filters.search ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            const newFilters = { ...filters, search: '' };
                                            setFilters(newFilters);
                                            onFilterChange(newFilters);
                                        }}
                                    >
                                        <X size={16} />
                                    </IconButton>
                                </InputAdornment>
                            ) : null,
                        }}
                    />

                    <Button
                        startIcon={<Filter size={18} />}
                        endIcon={expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        onClick={() => setExpanded(!expanded)}
                        variant={expanded ? "contained" : "outlined"}
                        color={hasActiveFilters ? "primary" : "inherit"}
                        sx={{
                            minWidth: '120px',
                            bgcolor: hasActiveFilters && !expanded ? 'rgba(37, 99, 235, 0.1)' : undefined,
                            color: hasActiveFilters && !expanded ? 'primary.main' : undefined,
                        }}
                    >
                        {expanded ? "Hide" : "Filter"}
                        {!expanded && hasActiveFilters && (
                            <Box
                                component="span"
                                sx={{
                                    ml: 1,
                                    backgroundColor: 'primary.main',
                                    color: '#fff',
                                    borderRadius: '50%',
                                    width: 20,
                                    height: 20,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.75rem'
                                }}
                            >
                                {(filters.priority.length + filters.status.length + (filters.search ? 1 : 0))}
                            </Box>
                        )}
                    </Button>
                </Box>

                <Collapse in={expanded}>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: { xs: 'wrap', md: 'nowrap' },
                            mb: 2
                        }}
                    >
                        <FormControl fullWidth size="small">
                            <InputLabel id="priority-filter-label">Priority</InputLabel>
                            <Select
                                labelId="priority-filter-label"
                                value={filters.priority}
                                onChange={handlePriorityChange}
                                label="Priority"
                            >
                                <MenuItem value="">All</MenuItem>
                                {Priority?.map((stat, index) => (
                                    <MenuItem key={index} value={stat?.title}>
                                        {stat?.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                            <InputLabel id="status-filter-label">Status</InputLabel>
                            <Select
                                labelId="status-filter-label"
                                value={filters.status}
                                onChange={handleStatusChange}
                                label="Status"
                            >
                                <MenuItem value="">All</MenuItem>
                                {Status?.map((stat, index) => (
                                    <MenuItem key={index} value={stat?.title}>{stat?.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {hasActiveFilters && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="text"
                                size="small"
                                onClick={handleClearFilters}
                                startIcon={<X size={14} />}
                            >
                                Clear All Filters
                            </Button>
                        </Box>
                    )}
                </Collapse>
                <Chip
                    label={`No. of filtered tasks: ${filteredLength}`}
                    size="small"
                    color="info"
                    sx={{
                        height: '34px',
                        '& .MuiChip-label': { px: 1, fontSize: '0.75rem' },
                    }}
                />
            </Box>
        </motion.div>
    );
};

export default TaskFilter;