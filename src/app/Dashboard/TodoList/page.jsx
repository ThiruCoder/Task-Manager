'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, Tabs, Tab, styled, LinearProgress } from '@mui/material';
import { MoreVertical, Folder } from 'lucide-react';
import { motion } from 'framer-motion';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`todo-tabpanel-${index}`}
      aria-labelledby={`todo-tab-${index}`}
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

const StyledLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(0, 0, 0, 0.08)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    backgroundColor: value && value >= 70 ? '#4CAF50' :
      value && value >= 30 ? '#FFC107' : '#FF9800',
  },
}));


const MotionBox = motion(Box);

function TodoItem({ name, progress, time, index }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      sx={{ mb: 2.5 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          mr: 1.5,
        }}>
          <Folder size={16} color="#FFC107" />
        </Box>
        <Typography variant="body2" fontWeight={500}>
          {name}
        </Typography>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
            {time}
          </Typography>
        </Box>
      </Box>
      <StyledLinearProgress variant="determinate" value={progress} value-prop={progress} />
    </MotionBox>
  );
}

export function TodoList() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const todos = [
    { id: 1, name: 'Creating Wireframe', progress: 65, time: '01:45:00' },
    { id: 2, name: 'Research Development', progress: 35, time: '03:30:00' },
  ];

  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={500}>
            To Do
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="a"
              href="#"
              sx={{
                fontSize: '0.75rem',
                color: 'primary.main',
                mr: 2,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              View Reports
            </Box>
            <IconButton size="small">
              <MoreVertical size={18} />
            </IconButton>
          </Box>
        </Box>

        <StyledTabs value={value} onChange={handleChange} aria-label="todo tabs">
          <StyledTab label="To Dos" id="todo-tab-0" aria-controls="todo-tabpanel-0" />
          <StyledTab label="Time" id="todo-tab-1" aria-controls="todo-tabpanel-1" />
        </StyledTabs>

        <TabPanel value={value} index={0}>
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              name={todo.name}
              progress={todo.progress}
              time={todo.time}
              index={index}
            />
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              name={todo.name}
              progress={todo.progress}
              time={todo.time}
              index={index}
            />
          ))}
        </TabPanel>
      </CardContent>
    </Card>
  );
}