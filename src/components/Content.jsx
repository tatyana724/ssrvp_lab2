import React from 'react';
import { Typography } from '@mui/material';

const Content = ({ lab }) => {
  return (
    <div>
      <Typography variant="h4">{lab.title}</Typography>
      <Typography variant="body1">{lab.content}</Typography>
    </div>
  );
};

export default Content;
