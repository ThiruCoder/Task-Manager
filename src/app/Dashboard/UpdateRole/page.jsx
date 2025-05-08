'use client';
import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    MenuItem,
    Typography,
    Box,
    Paper,
    Autocomplete,
} from '@mui/material';
import { AxiosInstance } from '@taskManager/app/Middlewares/GlobalUrlErrorHandler';

const roles = ['user', 'admin'];

const UpdateRoleForm = ({ userId, currentRole, onUpdate, userData }) => {
    const [role, setRole] = useState(currentRole || '');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('')
    const [filterTheUser, setFilterTheUser] = useState([])
    const [username, setUsername] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        try {
            await new Promise((res) => setTimeout(res, 1000));
            const formData = {
                username: username,
                role: role
            }
            if (!username || !role) {
                return setErrors('Username or role is required.');
            }
            await AxiosInstance.post('/user/UpdateUser', formData)
                .then((res) => {
                    setUsername('');
                    setRole('')
                    alert('Role updated successfully!');
                })
                .catch((err) => console.log(err))

        } catch (error) {
            alert('Failed to update role.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem('LocalUser'));
        const filterTheUser = userData?.filter((item) => item?.username !== localStorageData?.username);
        setFilterTheUser(filterTheUser)
    }, [userData])

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }} gutterBottom>
                Update User Role
            </Typography>
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    options={filterTheUser}
                    getOptionLabel={(option) => option.username || ''}
                    value={filterTheUser.find((user) => user.username === username) || null}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setUsername(newValue.username); // store just the username
                        }
                    }}
                    onInputChange={(event, newInputValue) => {
                        setUsername(newInputValue); // also handle free text typing
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
                <TextField
                    select
                    label="Select Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                >
                    {roles.map((r) => (
                        <MenuItem key={r} value={r}>
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                        </MenuItem>
                    ))}
                </TextField>
                <Box mt={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Role'}
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default UpdateRoleForm;
