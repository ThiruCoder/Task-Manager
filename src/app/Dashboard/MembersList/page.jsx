'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Avatar, Tabs, Tab, styled } from '@mui/material';
import { LucideChartNoAxesColumnIncreasing, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`member-tabpanel-${index}`}
      aria-labelledby={`member-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const StyledTabs = styled(Tabs)({
  minHeight: 'unset',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const StyledTab = styled(Tab)({
  textTransform: 'none',
  minHeight: 'unset',
  padding: '8px 16px',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'rgba(0, 0, 0, 0.6)',
  '&.Mui-selected': {
    color: '#1976d2',
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
    borderRadius: 8,
  },
});

const MotionBox = motion(Box);

export function MembersList({ getTask }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const members = [
    {
      id: 1,
      name: 'John Foster',
      role: 'Lead Dashboard Design',
      designation: 'Graphic and UI/UX Designer',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      today: '04:00',
      week: '08:00',
    },
    {
      id: 2,
      name: 'Rubik Sans',
      role: 'Project Name',
      designation: 'Creating XYZ Research',
      avatar: 'https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      today: '04:00',
      week: '08:00',
    },
  ];

  const today = new Date().toISOString().split('T')[0];

  const getTodayTasks = useCallback(() => {
    return getTask.filter(item => item?.createAt?.split('T')[0] === today);
  }, [getTask, today]);
  const todayTasks = useMemo(() => getTodayTasks(), [getTodayTasks]);
  // console.log(todayTasks);

  const date = new Date('2025-05-08T07:51:28.440Z');

  // // Get the week number of the year
  // const getWeekNumber = (d) => {
  //   const firstJan = new Date(d.getFullYear(), 0, 1);
  //   const pastDays = Math.floor((d - firstJan) / (24 * 60 * 60 * 1000));
  //   return Math.ceil((pastDays + firstJan.getDay() + 1) / 7);
  // };

  // Get day of the week (e.g., Monday)
  const getWeekdayName = (d) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[d.getDay()];
  };

  // const weekNumber = getWeekNumber(date);
  // const weekday = getWeekdayName(date);

  // console.log(`Week ${weekNumber}, Day: ${weekday}`);

  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={500}>
            Members
          </Typography>

          <IconButton size="small">
            <MoreVertical size={18} />
          </IconButton>
        </Box>

        <StyledTabs value={value} onChange={handleChange} aria-label="member tabs">
          <StyledTab label="Member Info" id="member-tab-0" aria-controls="member-tabpanel-0" />
          <StyledTab label="Today" id="member-tab-1" aria-controls="member-tabpanel-1" />
          <StyledTab label="This Week" id="member-tab-2" aria-controls="member-tabpanel-2" />
        </StyledTabs>

        <TabPanel value={value} index={0}>
          {getTask.slice(0, 4).map((member, index) => (
            <MotionBox
              key={member.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              sx={{
                display: 'flex',
                py: 2,
                borderBottom: index < members.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <Avatar src={member.avatar} alt={member.name} sx={{ width: 40, height: 40 }} />
              <Box sx={{ ml: 2, overflow: 'hidden' }}>
                <Typography variant="body2" fontWeight={500} noWrap>
                  {member.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {member.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }} noWrap>
                  {member.priority}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }} noWrap>
                  {member.status}
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto', textAlign: 'right' }}>
                <Typography variant="body2" fontWeight={500}>
                  {member.createAt.split('T')[0]}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {getWeekdayName(new Date(member.createAt))}
                </Typography>
              </Box>
            </MotionBox>
          )).splice(2)}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {todayTasks.map((member, index) => (
            <Box
              key={member.id}
              sx={{
                display: 'flex',
                py: 2,
                borderBottom: index < members.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <Avatar src={member.avatar} alt={member.name} sx={{ width: 40, height: 40 }} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2" fontWeight={500}>
                  {member.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {member.description}
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto', textAlign: 'right' }}>
                <Typography variant="body2" fontWeight={500}>
                  {today}
                </Typography>
              </Box>
            </Box>
          ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {members.map((member, index) => (
            <Box
              key={member.id}
              sx={{
                display: 'flex',
                py: 2,
                borderBottom: index < members.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <Avatar src={member.avatar} alt={member.name} sx={{ width: 40, height: 40 }} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2" fontWeight={500}>
                  {member.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {member.role}
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto', textAlign: 'right' }}>
                <Typography variant="body2" fontWeight={500}>
                  {member.week}
                </Typography>
              </Box>
            </Box>
          ))}
        </TabPanel>
      </CardContent>
    </Card>
  );
}