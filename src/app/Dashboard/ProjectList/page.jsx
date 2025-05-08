'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, LinearProgress, styled, Button } from '@mui/material';
import { MoreVertical, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { Stack } from '@mui/system';

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

function ProjectItem({ name, progress, dueDate, index }) {
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
            Due date: {dueDate}
          </Typography>
        </Box>
      </Box>

      <Progress progress={progress} />
    </MotionBox>
  );
}


export function ProjectList({ getTask, viewData, setViewData }) {

  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} fontSize={17}>
            Projects
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={() => setViewData(true)}
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
              View All
            </Button>
            <IconButton size="small">
              <MoreVertical size={18} />
            </IconButton>
          </Box>
        </Box>

        <Stack sx={{ height: 400, overflowY: 'auto' }}>
          {getTask.map((task, index) => (
            <ProjectItem
              key={task?.id}
              name={task?.title}
              progress={task?.status}
              dueDate={task?.dueDate?.split('T')[0]}
              index={index}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}


const Progress = ({ progress }) => {
  let progressValue;
  switch (progress) {
    case 'Pending':
      progressValue = 25;
      break;
    case 'In Progress':
      progressValue = 50;
      break;
    case 'Archived':
      progressValue = 75;
      break;
    case 'Completed':
      progressValue = 100;
      break;
    default:
      progressValue = 25;
  }

  return (
    <StyledLinearProgress variant="determinate" value={progressValue} />
  );
};