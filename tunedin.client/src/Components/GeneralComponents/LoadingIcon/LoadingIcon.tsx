import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingIconProps {
  size?: number;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ size = 100 }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 50,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default LoadingIcon;