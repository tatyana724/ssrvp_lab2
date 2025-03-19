import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ mt: 'auto', p: 2, bgcolor: '#342e57', color: 'white' }}>
      <Typography variant="body2" align="center">
        © 2025 laboratory work
      </Typography>
    </Box>
  );
};

export default Footer;
