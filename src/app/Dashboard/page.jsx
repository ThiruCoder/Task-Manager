'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { ActivityMetrics } from './ActivityMatrix/page';
import { RecentActivity } from './RecentActivities/page';
import { ProjectList } from './ProjectList/page';
import { MembersList } from './MembersList/page';
import { TodoList } from './TodoList/page';
import { Container, Grid } from '@mui/system';
import { DashboardHeader } from './DashboardHeader/page';
import DashboardTaskForm from './AddTaskForm/AddTaskForm';
import { AxiosInstance } from '@taskManager/app/Middlewares/GlobalUrlErrorHandler';
import TaskView from './TaskViewPage/page';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskData } from '@taskManager/app/ReduxSection/TaskReducer/TaskReducer';
import Footer from '../Components/Footer';
import { Header } from '../Components/Header';
import UpdateRoleForm from './UpdateRole/page';
import ProtectedRoute from '../ProtectedRoute';

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [getTask, setGetTask] = useState([]);
  const [updateFormData, setUpdateFormData] = useState(null)
  const [viewData, setViewData] = useState(false)
  const [viewSingleData, setViewSingleData] = useState(false)
  const [headerColor, setHeaderColor] = useState('white');
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.TaskData);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHeaderColor(scrollY > 50 ? 'black' : 'white')
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    async function GetUserData() {
      await AxiosInstance.get('/user/getAllUsers')
        .then((res) => setUserData(res.data))
        .catch((err) => console.log(err))
    }
    GetUserData();
  }, [])

  useEffect(() => {
    let isMounted = true;
    const fetchTasks = async () => {
      try {
        const res = await AxiosInstance.get('/task/getAllTasks');
        if (isMounted) {
          setGetTask(res.data);
          dispatch(getTaskData(res.data));
        }
      } catch (err) {
        console.log('Fetch failed:', err);
      } finally {
        if (isMounted) {
          setTimeout(fetchTasks, 5000);
        }
      }
    };
    fetchTasks();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ProtectedRoute>
      <Box sx={{ bgcolor: '#e8e6e6' }}>
        {/* <DashboardHeader headerColor={headerColor} /> */}
        <Header headerColor={headerColor} />
        <Container sx={{ pt: 12, mb: 4 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ActivityMetrics
                title="No. of Users"
                value={userData.length > 10 ? userData.length : `0${userData.length}`}
                icon="flame"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ActivityMetrics
                title="Worked This Week"
                value="40:00:05"
                icon="clock"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ActivityMetrics
                title="Task Worked"
                value={data.length > 10 ? data.length : `0${data.length}`}
                icon="folder"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <MembersList getTask={getTask} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TodoList />
            </Grid>
          </Grid>
          <DashboardTaskForm userData={userData} updateFormData={updateFormData} setUpdateFormData={setUpdateFormData} />
          <UpdateRoleForm userData={userData} />
          {viewData ? (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 12 }}>
                {viewSingleData ? (
                  <MembersList />
                ) : (
                  <TaskView viewData={viewData} viewSingleData={viewSingleData} setViewSingleData={setViewSingleData} setViewData={setViewData} getTask={getTask} setUpdateFormData={setUpdateFormData} />
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 12 }} sx={{ mb: 4 }}>
                <ProjectList getTask={data} viewData={viewData} setViewData={setViewData} />
              </Grid>
            </Grid>
          )}
        </Container>
        <Footer />
      </Box>
    </ProtectedRoute>
  );
}
export default Dashboard;