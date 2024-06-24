import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CareersCard from './CareersCards';
import { Typography, useMediaQuery, useTheme } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
//   textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('sm','md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box  sx={{ width: '70vw',marginX:"auto",marginBottom:"10px" ,textDecoration: 'none'}}>
      <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid xs={12} sm={6} md={4}>
          <CareersCard category="Development" role="FrontEnd Developer" status="Immediately"/>
        </Grid >
        <Grid xs={12} sm={6} md={4}>
          <CareersCard category="Development" role="BackEnd Developer" status="Immediately" />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <CareersCard category="Testing" role="DevOps" status="Immediately"/>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <CareersCard category="Designer" role="UI/UX" status="Immediately"/>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <CareersCard category="Marketting" role="Sales" status="Immediately"/>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <CareersCard category="HR" role="Project Manager" status="Immediately"/>
        </Grid>
      </Grid>
    </Box>
  );
}
