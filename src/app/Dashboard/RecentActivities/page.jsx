'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, Avatar, Grid, CardMedia, styled } from '@mui/material';
import { MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 120,
  borderRadius: theme.shape.borderRadius,
}));

const MotionCardMedia = motion(StyledCardMedia);

export function RecentActivity() {
  const activities = [
    { id: 1, img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 2, img: "https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 3, img: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 4, img: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 5, img: "https://images.pexels.com/photos/7432003/pexels-photo-7432003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  ];

  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={500}>
            Recent Activity
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
              View All
            </Box>
            <IconButton size="small">
              <MoreVertical size={18} />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            alt="Rubik Sans"
            src="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            sx={{ width: 32, height: 32, mr: 1.5 }}
          />
          <Typography variant="body2" fontWeight={500}>
            Rubik Sans
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {activities.map((activity) => (
            <Grid item xs={6} sm={4} key={activity.id}>
              <MotionCardMedia
                image={activity.img}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}