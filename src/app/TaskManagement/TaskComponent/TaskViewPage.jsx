import * as React from 'react';
import { Box, Typography, Chip, Button, Stack, Divider, AvatarGroup, Avatar, CircularProgress, CardHeader } from '@mui/material';
import {
    CheckCircle2,
    CalendarDays,
    User,
    Flag,
    FileText,
    Paperclip
} from 'lucide-react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { AxiosInstance } from '@taskManager/app/Middlewares/GlobalUrlErrorHandler';
import { Grid } from '@mui/system';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const TaskViewPage = (
    { handleClose,
        open,
        setOpen,
        taskView,
        getAssignTask,
        getCurrentTask,
        currentView,
        setDeleteTaskId,
        taskData, setTaskData,
        getUpdatedId, setGetUpdatedId,
        setFormOpen,
        refresh, setRefresh
    }) => {


    const [isLoading, setIsLoading] = React.useState(false);
    const [viewAssignData, setViewAssignData] = React.useState([])
    React.useEffect(() => {
        const GetDataById = async () => {
            try {
                setIsLoading(true)
                if (!taskView) return;
                await AxiosInstance.get(`/task/getTaskById/${taskView}`)
                    .then((res) => {
                        setTaskData(res.data);
                        setIsLoading(false)
                    })
                    .catch((err) => console.log(err))
            } catch (error) {
                setIsLoading(true)
                console.log(error)
            }
        }
        GetDataById()
    }, [taskView])
    // console.log('taskData', taskData);

    React.useEffect(() => {
        const assignData = getAssignTask.filter((task) => {
            return task?.assignedTo === taskView
        })
        setViewAssignData(assignData)
    }, [taskView, getAssignTask])
    // console.log(getAssignTask.map((ite) => ite.assignedTo), taskData?.assignedTo)

    const handleCompleted = async (id) => {
        try {
            if (!id) return;
            await AxiosInstance.put(`/task/TaskCompleted/${id}`, { status: 'Completed' })
                .then((res) => {
                    setRefresh(refresh);
                    setOpen(false);
                })
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog
            open={open}
            slots={{
                transition: Transition,
            }}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle fontSize={20} fontWeight={700} textAlign={'center'}>{"Task Information"}</DialogTitle>

            <DialogContent>
                {open && (
                    isLoading ? (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : taskData ? (
                        <Box sx={{
                            maxWidth: 800,
                            mx: 'auto',
                            p: 4,
                            bgcolor: 'background.paper',
                            borderRadius: 4,
                            boxShadow: '0px 4px 20px rgba(0,0,0,0.08)'
                        }}>
                            {/* Header Section */}
                            <Box sx={{ mb: 4 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Chip
                                        label={taskData.status}
                                        color={taskData.status === 'Completed' ? 'success' : 'primary'}
                                        icon={<CheckCircle2 size={18} />}
                                        sx={{ borderRadius: 1 }}
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                        Created: {taskData.createAt.split('T')[0]}
                                    </Typography>
                                </Stack>
                                <CardHeader title={
                                    <Typography variant="h4" sx={{ mt: 2, fontWeight: 700 }}>
                                        {taskData.title}
                                    </Typography>
                                }
                                    subheader={
                                        <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                                            <Chip
                                                label={taskData.priority}
                                                variant="outlined"
                                                icon={<Flag size={18} />}
                                                color={
                                                    taskData.priority === 'High' ? 'error' :
                                                        taskData.priority === 'Medium' ? 'warning' : 'default'
                                                }
                                            />
                                            <Chip
                                                label={`Due: ${taskData.dueDate.split('T')[0]}`}
                                                variant="outlined"
                                                icon={<CalendarDays size={18} />}
                                            />
                                        </Stack>
                                    } />



                                <Divider />
                                <Grid size={{ xs: 12 }} sx={{ pt: 2 }}>
                                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700 }}>
                                        <FileText size={20} color="#1976d2" /> Description
                                    </Typography>
                                    <Typography sx={{
                                        p: 2,
                                        bgcolor: 'grey.50',
                                        borderRadius: 2,
                                        lineHeight: 1.7,

                                    }}>
                                        {taskData.description}
                                    </Typography>

                                    {/* Attachments Section */}
                                    {/* {taskData.attachments?.length > 0 && (
                                        <Box sx={{ mt: 4 }}>
                                            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Paperclip size={20} color="#1976d2" /> Attachments
                                            </Typography>
                                            <Stack spacing={1}>
                                                {taskData.attachments.map(file => (
                                                    <Button
                                                        key={file.name}
                                                        startIcon={<Paperclip size={16} />}
                                                        sx={{
                                                            justifyContent: 'flex-start',
                                                            textTransform: 'none',
                                                            color: 'text.primary'
                                                        }}
                                                    >
                                                        {file.name} ({file.size})
                                                    </Button>
                                                ))}
                                            </Stack>
                                        </Box>
                                    )} */}
                                </Grid>

                            </Box>

                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                                <Typography variant="subtitle2" sx={{ mb: 2, textAlign: 'center', fontWeight: 700, fontSize: 16 }}>Task Actions</Typography>
                                <Stack spacing={2}>
                                    <Button variant="contained" fullWidth
                                        startIcon={<CheckCircle2 size={18} />}
                                        onClick={() => handleCompleted(taskData?.id)}>
                                        Mark as Complete
                                    </Button>
                                    <Button variant="outlined" fullWidth
                                        onClick={() => {
                                            setGetUpdatedId(taskData?.id);
                                            setFormOpen(true)
                                        }}>
                                        Edit Task
                                    </Button>
                                    <Button variant="text" color="error"
                                        onClick={() => {
                                            setDeleteTaskId(taskData?.id)
                                        }} fullWidth>
                                        Delete Task
                                    </Button>
                                </Stack>
                            </Box>
                            {/* Main Content */}
                            <Grid container spacing={2} sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 300px' }, gap: 4 }}>
                                {/* Left Column - Description & Comments */}

                                {/* Right Column - Meta Info */}
                                <Grid size={{ xs: 12 }}>
                                    <>
                                        {/* <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <User size={20} color="#1976d2" /> Assignees
                                        </Typography>
                                        <AvatarGroup max={4}>
                                            {taskData.assignees.map(user => (
                                                <Avatar
                                                    key={user.id}
                                                    alt={user.name}
                                                    src={user.avatar}
                                                    sx={{ width: 40, height: 40 }}
                                                />
                                            ))}
                                        </AvatarGroup>
                                    </Box> */}


                                    </>
                                </Grid>
                            </Grid>
                        </Box>
                    ) : (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="h6">Task not found</Typography>
                            <Button onClick={handleClose} sx={{ mt: 2 }}>
                                Close
                            </Button>
                        </Box>
                    )
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose}>Agree</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TaskViewPage