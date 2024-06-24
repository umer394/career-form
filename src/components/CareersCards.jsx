import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { padding } from '@mui/system';
import { Padding } from '@mui/icons-material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
  >
    •
  </Box>
);

function CardContentComponent({category, role, status}) {
  return (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14,textDecoration:'none',color:'white'}} color="text.secondary" gutterBottom>
          {category}
        </Typography>
        <Typography variant="h5" component="div" sx={{ color:'white',textAlign: 'center' ,fontSize:18,paddingTop:'40px'}}>
          {role}
        </Typography>
        <Typography variant="body2" sx={{paddingTop:'45px',color:'white'}}>
          Start:<br />
          {status}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
}

export default function CareersCard({ category, role, status }) {
  return (
    <Box sx={{ minWidth:{xs:225} ,textDecoration:'none',backgroundColor:'#1C2025'}}>
      <Link style={{textDecoration:'none'}}  href='/careers-form' passHref>
        <Card variant="outlined"sx={{
              textDecoration: 'none',
              border: 'none',
              height:{sm:"none",xs:"none"},
              backgroundColor: '#1C2025',
              transition: 'background-color 0.3s ease, border 0.3s ease',
              '&:hover': {
                backgroundColor: '#d0140f',
                border: 'none'
              }
            }} >
          <CardContentComponent category={category} role={role} status={status} />
        </Card>
      </Link>
    </Box>
  );
}
