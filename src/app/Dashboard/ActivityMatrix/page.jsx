'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import { MoreVertical, Flame, Clock, Folder } from 'lucide-react';
import { motion } from 'framer-motion';


const MotionBox = motion(Box);

export function ActivityMetrics({ title, value, icon }) {
  const getIcon = () => {
    switch (icon) {
      case 'flame':
        return <Flame size={28} color="#FFB74D" />
      case 'clock':
        return <Clock size={28} color="#42A5F5" />;
      case 'folder':
        return <Folder size={28} color="#FFA726" />;
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight={500}>
            {title}
          </Typography>
          <IconButton size="small">
            <MoreVertical size={18} />
          </IconButton>
        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 3
        }}>
          <Typography variant="h4" fontWeight={600}>
            {value}
          </Typography>

          <MotionBox
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 235, 182, 0.3)',
            }}
          >
            {getIcon()}
          </MotionBox>
        </Box>
      </CardContent>
    </Card>
  );
}